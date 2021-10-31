# rollup 配置

一个高效的 ES Modules 打包器，充分利用 ES Modules 的各项特性，构建出结构扁平，性能出众的类库。

## rollup.config.js

```js
export default {
  input: 'src/main.js',
  output:{
    banner:'',
    file:'dist/bundle.js', // 输出文件
    format: 'cjs,
    name:'A',
    sourcemap:true,
    globals: {
      'jquery':'$' //告诉rollup 全局变量$即是jquery
    },
    external: [],
    plugins: [
      buble(),
      resolve(),
      commonjs(),
      terser({ module: config.format === 'es' })],
  }
};
```

## banner

```js
const banner = `/*!
 * v${pkg.version}
 * (c) ${new Date().getFullYear()}
 * @license MIT
 */`;
```

## format

- amd – 异步模块定义，用于像 RequireJS 这样的模块加载器
- cjs – CommonJS，适用于 Node 和 Browserify/Webpack
- esm – 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type=module>` 标签引入
- iife – 一个自动执行的功能，适合作为 `<script>` 标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
- umd – 通用模块定义，以 amd，cjs 和 iife 为一体
- system - SystemJS 加载器格式

## plugins

### @rollup/plugin-buble

将 ES6 代码编译成 ES5。

### rollup-plugin-babel

`.babelrc`

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "exclude": ["transform-regenerator"]
      }
    ]
  ]
}
```

- 设置 "modules": false ，否则 Babel 会在 Rollup 做处理之前，将我们的模块转成 CommonJS。
- 将 `.babelrc` 文件放在 src 中，而不是根目录下。 这允许我们对于不同的任务有不同的 `.babelrc` 配置，比如像测试，如果我们以后需要的话 - 通常为单独的任务单独配置会更好。

### rollup/plugin-node-resolve

- @rollup/plugin-node-resolve 插件允许我们加载第三方模块
- @rollup/plugin-commons 插件将它们转换为 ES6 版本

### rollup-plugin-terser

terser 使用 terser 压缩代码

## Rollup 的优势和不足

- 输出结果更加扁平，执行效率更高；
- 自动移除未引用代码；
- 打包结果依然完全可读。
- 但是它的缺点也同样明显：

不足：

- 加载非 ESM 的第三方模块比较复杂；
- 因为模块最终都被打包到全局中，所以无法实现 HMR；
- 浏览器环境中，代码拆分功能必须使用 Require.js 这样的 AMD 库。

- [rollup.js](https://rollupjs.org)
