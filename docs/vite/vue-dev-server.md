# vue-dev-server

[[toc]]

vue-dev-server 是一个玩具 vite，以下是它的代码：

## vue-dev-server

```js
#!/usr/bin/env node

const express = require('express');
const { vueMiddleware } = require('../middleware');

const app = express();
const root = process.cwd();

app.use(vueMiddleware());

app.use(express.static(root));

app.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
```

## vueMiddleware

```js
const vueCompiler = require('@vue/component-compiler');
const fs = require('fs');
const stat = require('util').promisify(fs.stat);
const root = process.cwd();
const path = require('path');
const parseUrl = require('parseurl');
const { transformModuleImports } = require('./transformModuleImports');
const { loadPkg } = require('./loadPkg');
const { readSource } = require('./readSource');

const defaultOptions = {
  cache: true,
};

const vueMiddleware = (options = defaultOptions) => {
  let cache;
  let time = {};
  if (options.cache) {
    const LRU = require('lru-cache');

    cache = new LRU({
      max: 500,
      length: function (n, key) {
        return n * 2 + key.length;
      },
    });
  }

  const compiler = vueCompiler.createDefaultCompiler();

  function send(res, source, mime) {
    res.setHeader('Content-Type', mime);
    res.end(source);
  }

  function injectSourceMapToBlock(block, lang) {
    const map = Base64.toBase64(JSON.stringify(block.map));
    let mapInject;

    switch (lang) {
      case 'js':
        mapInject = `//# sourceMappingURL=data:application/json;base64,${map}\n`;
        break;
      case 'css':
        mapInject = `/*# sourceMappingURL=data:application/json;base64,${map}*/\n`;
        break;
      default:
        break;
    }

    return {
      ...block,
      code: mapInject + block.code,
    };
  }

  function injectSourceMapToScript(script) {
    return injectSourceMapToBlock(script, 'js');
  }

  function injectSourceMapsToStyles(styles) {
    return styles.map((style) => injectSourceMapToBlock(style, 'css'));
  }

  async function tryCache(key, checkUpdateTime = true) {
    const data = cache.get(key);

    if (checkUpdateTime) {
      const cacheUpdateTime = time[key];
      const fileUpdateTime = (
        await stat(path.resolve(root, key.replace(/^\//, '')))
      ).mtime.getTime();
      if (cacheUpdateTime < fileUpdateTime) return null;
    }

    return data;
  }

  function cacheData(key, data, updateTime) {
    const old = cache.peek(key);

    if (old != data) {
      cache.set(key, data);
      if (updateTime) time[key] = updateTime;
      return true;
    } else return false;
  }

  // bundleSFC 编译单文件组件
  async function bundleSFC(req) {
    const { filepath, source, updateTime } = await readSource(req);
    const descriptorResult = compiler.compileToDescriptor(filepath, source);
    const assembledResult = vueCompiler.assemble(compiler, filepath, {
      ...descriptorResult,
      script: injectSourceMapToScript(descriptorResult.script),
      styles: injectSourceMapsToStyles(descriptorResult.styles),
    });
    return { ...assembledResult, updateTime };
  }

  return async (req, res, next) => {
    // 对 .vue 结尾的文件进行处理
    if (req.path.endsWith('.vue')) {
      const key = parseUrl(req).pathname;
      let out = await tryCache(key);

      if (!out) {
        // Bundle Single-File Component
        const result = await bundleSFC(req);
        out = result;
        cacheData(key, out, result.updateTime);
      }

      send(res, out.code, 'application/javascript');

      // 对 .js 结尾的文件进行处理
    } else if (req.path.endsWith('.js')) {
      const key = parseUrl(req).pathname;
      let out = await tryCache(key);

      if (!out) {
        // transform import statements
        const result = await readSource(req);
        out = transformModuleImports(result.source);
        cacheData(key, out, result.updateTime);
      }

      send(res, out, 'application/javascript');

      // 对 /__modules/ 开头的文件进行处理
    } else if (req.path.startsWith('/__modules/')) {
      const key = parseUrl(req).pathname;
      const pkg = req.path.replace(/^\/__modules\//, '');

      let out = await tryCache(key, false); // Do not outdate modules
      if (!out) {
        out = (await loadPkg(pkg)).toString();
        cacheData(key, out, false); // Do not outdate modules
      }

      send(res, out, 'application/javascript');
    } else {
      next();
    }
  };
};

exports.vueMiddleware = vueMiddleware;
```

vueMiddleware 最终返回一个函数。这个函数里主要做了四件事：

- 对 .vue 结尾的文件进行处理
- 对 .js 结尾的文件进行处理
- 对 /\_\_modules/ 开头的文件进行处理
- 如果不是以上三种情况，执行 next 方法，把控制权交给下一个中间件

## transformModuleImports.js

```js
const recast = require('recast');
const isPkg = require('validate-npm-package-name');

function transformModuleImports(code) {
  const ast = recast.parse(code);
  recast.types.visit(ast, {
    visitImportDeclaration(path) {
      const source = path.node.source.value;
      if (!/^\.\/?/.test(source) && isPkg(source)) {
        path.node.source = recast.types.builders.literal(
          `/__modules/${source}`
        );
      }
      this.traverse(path);
    },
  });
  return recast.print(ast).code;
}

exports.transformModuleImports = transformModuleImports;
```

## readSource.js

```js
const path = require('path');
const fs = require('fs');
const readFile = require('util').promisify(fs.readFile);
const stat = require('util').promisify(fs.stat);
const parseUrl = require('parseurl');
const root = process.cwd();

async function readSource(req) {
  const { pathname } = parseUrl(req);
  const filepath = path.resolve(root, pathname.replace(/^\//, ''));
  return {
    filepath,
    source: await readFile(filepath, 'utf-8'),
    updateTime: (await stat(filepath)).mtime.getTime(),
  };
}

exports.readSource = readSource;
```

## loadPkg.js

目前只支持 `Vue` 文件，也就是读取路径 `vue-dev-server/node_modules/vue/dist/vue.esm.browser.js` 下的文件返回

```js
const fs = require('fs');
const path = require('path');
const readFile = require('util').promisify(fs.readFile);

async function loadPkg(pkg) {
  if (pkg === 'vue') {
    const dir = path.dirname(require.resolve('vue'));
    const filepath = path.join(dir, 'vue.esm.browser.js');
    return readFile(filepath);
  } else {
    // TODO
    // check if the package has a browser es module that can be used
    // otherwise bundle it with rollup on the fly?
    throw new Error('npm imports support are not ready yet.');
  }
}

exports.loadPkg = loadPkg;
```

资料:

- 代码地址： https://github.com/vuejs/vue-dev-server
- 代码解读：[尤雨溪写的 100 多行的“玩具 vite”，十分有助于理解 vite 原理](https://mp.weixin.qq.com/s?__biz=MzA5MjQwMzQyNw==&mid=2650758126&idx=1&sn=e506d684b281d84406689fb07d64c9dc&chksm=88665862bf11d174fbc3408338be4519ebfa4fbd609508abac2d4178fea992166aa828a30178&scene=178&cur_album_id=1342211915371675650#rd)
