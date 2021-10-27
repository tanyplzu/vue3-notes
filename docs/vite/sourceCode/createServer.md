# createServer

[[toc]]

## createServer

```js
export async function createServer(
  inlineConfig: InlineConfig = {}
): Promise<ViteDevServer> {
  const config = await resolveConfig(inlineConfig, 'serve', 'development')
  // 项目根目录（index.html 文件所在的位置）。可以是一个绝对路径，或者一个相对于该配置文件本身的路径。
  const root = config.root
  const serverConfig = config.server
  const httpsOptions = await resolveHttpsConfig(config)
  let { middlewareMode } = serverConfig
  if (middlewareMode === true) {
    middlewareMode = 'ssr'
  }

  const middlewares = connect() as Connect.Server
  const httpServer = middlewareMode
    ? null
    : await resolveHttpServer(serverConfig, middlewares, httpsOptions)
  const ws = createWebSocketServer(httpServer, config, httpsOptions)

  const { ignored = [], ...watchOptions } = serverConfig.watch || {}

  // 使用chokidar监控root目录，忽略node_modules、.git
  const watcher = chokidar.watch(path.resolve(root), {
    ignored: [
      '**/node_modules/**',
      '**/.git/**',
      ...(Array.isArray(ignored) ? ignored : [ignored])
    ],
    ignoreInitial: true,
    ignorePermissionErrors: true,
    disableGlobbing: true,
    ...watchOptions
  }) as FSWatcher

  const plugins = config.plugins
  const container = await createPluginContainer(config, watcher)
  const moduleGraph = new ModuleGraph(container)
  const closeHttpServer = createServerCloseFn(httpServer)

  // eslint-disable-next-line prefer-const
  let exitProcess: () => void

  const server: ViteDevServer = {
    config,
    middlewares,
    get app() {
      config.logger.warn(
        `ViteDevServer.app is deprecated. Use ViteDevServer.middlewares instead.`
      )
      return middlewares
    },
    httpServer,
    watcher,
    pluginContainer: container,
    ws,
    moduleGraph,
    transformWithEsbuild,
    transformRequest(url, options) {
      return transformRequest(url, server, options)
    },
    transformIndexHtml: null!, // to be immediately set
    ssrLoadModule(url) {
      if (!server._ssrExternals) {
        server._ssrExternals = resolveSSRExternal(
          config,
          server._optimizeDepsMetadata
            ? Object.keys(server._optimizeDepsMetadata.optimized)
            : []
        )
      }
      return ssrLoadModule(url, server)
    },
    ssrFixStacktrace(e) {
      if (e.stack) {
        const stacktrace = ssrRewriteStacktrace(e.stack, moduleGraph)
        rebindErrorStacktrace(e, stacktrace)
      }
    },
    listen(port?: number, isRestart?: boolean) {
      return startServer(server, port, isRestart)
    },
    async close() {
      process.off('SIGTERM', exitProcess)

      if (!middlewareMode && process.env.CI !== 'true') {
        process.stdin.off('end', exitProcess)
      }

      await Promise.all([
        watcher.close(),
        ws.close(),
        container.close(),
        closeHttpServer()
      ])
    },
    printUrls() {
      if (httpServer) {
        printHttpServerUrls(httpServer, config)
      } else {
        throw new Error('cannot print server URLs in middleware mode.')
      }
    },
    _optimizeDepsMetadata: null,
    _ssrExternals: null,
    _globImporters: Object.create(null),
    _isRunningOptimizer: false,
    _registerMissingImport: null,
    _pendingReload: null,
    _pendingRequests: Object.create(null)
  }

  server.transformIndexHtml = createDevHtmlTransformFn(server)

  exitProcess = async () => {
    try {
      await server.close()
    } finally {
      process.exit(0)
    }
  }

  process.once('SIGTERM', exitProcess)

  if (!middlewareMode && process.env.CI !== 'true') {
    process.stdin.on('end', exitProcess)
  }

  watcher.on('change', async (file) => {
    file = normalizePath(file)
    // invalidate module graph cache on file change
    moduleGraph.onFileChange(file)
    if (serverConfig.hmr !== false) {
      try {
        await handleHMRUpdate(file, server)
      } catch (err) {
        ws.send({
          type: 'error',
          err: prepareError(err)
        })
      }
    }
  })

  watcher.on('add', (file) => {
    handleFileAddUnlink(normalizePath(file), server)
  })

  watcher.on('unlink', (file) => {
    handleFileAddUnlink(normalizePath(file), server, true)
  })

  if (!middlewareMode && httpServer) {
    httpServer.once('listening', () => {
      // update actual port since this may be different from initial value
      serverConfig.port = (httpServer.address() as AddressInfo).port
    })
  }

  // apply server configuration hooks from plugins
  const postHooks: ((() => void) | void)[] = []
  for (const plugin of plugins) {
    if (plugin.configureServer) {
      postHooks.push(await plugin.configureServer(server))
    }
  }

  // Internal middlewares ------------------------------------------------------

  // request timer
  if (process.env.DEBUG) {
    middlewares.use(timeMiddleware(root))
  }

  // cors (enabled by default)
  const { cors } = serverConfig
  if (cors !== false) {
    middlewares.use(corsMiddleware(typeof cors === 'boolean' ? {} : cors))
  }

  // proxy
  const { proxy } = serverConfig
  if (proxy) {
    // 为开发服务器配置代理自定义代理规则
    middlewares.use(proxyMiddleware(httpServer, config))
  }

  // base
  if (config.base !== '/') {
    middlewares.use(baseMiddleware(server))
  }

  // open in editor support
  middlewares.use('/__open-in-editor', launchEditorMiddleware())

  // hmr reconnect ping
  // Keep the named function. The name is visible in debug logs via `DEBUG=connect:dispatcher ...`
  middlewares.use('/__vite_ping', function viteHMRPingMiddleware(_, res) {
    res.end('pong')
  })

  // serve static files under /public
  // this applies before the transform middleware so that these files are served
  // as-is without transforms.
  if (config.publicDir) {
    middlewares.use(servePublicMiddleware(config.publicDir))
  }

  // main transform middleware
  middlewares.use(transformMiddleware(server))

  // serve static files
  middlewares.use(serveRawFsMiddleware(server))
  middlewares.use(serveStaticMiddleware(root, server))

  // spa fallback
  if (!middlewareMode || middlewareMode === 'html') {
    middlewares.use(spaFallbackMiddleware(root))
  }

  // run post config hooks
  // This is applied before the html middleware so that user middleware can
  // serve custom content instead of index.html.
  postHooks.forEach((fn) => fn && fn())

  if (!middlewareMode || middlewareMode === 'html') {
    // transform index.html
    middlewares.use(indexHtmlMiddleware(server))
    // handle 404s
    // Keep the named function. The name is visible in debug logs via `DEBUG=connect:dispatcher ...`
    middlewares.use(function vite404Middleware(_, res) {
      res.statusCode = 404
      res.end()
    })
  }

  // error handler
  middlewares.use(errorMiddleware(server, !!middlewareMode))

  const runOptimize = async () => {
    if (config.cacheDir) {
      server._isRunningOptimizer = true
      try {
        server._optimizeDepsMetadata = await optimizeDeps(config)
      } finally {
        server._isRunningOptimizer = false
      }
      server._registerMissingImport = createMissingImporterRegisterFn(server)
    }
  }

  if (!middlewareMode && httpServer) {
    let isOptimized = false
    // overwrite listen to run optimizer before server start
    const listen = httpServer.listen.bind(httpServer)
    httpServer.listen = (async (port: number, ...args: any[]) => {
      if (!isOptimized) {
        try {
          await container.buildStart({})
          await runOptimize()
          isOptimized = true
        } catch (e) {
          httpServer.emit('error', e)
          return
        }
      }
      return listen(port, ...args)
    }) as any
  } else {
    await container.buildStart({})
    await runOptimize()
  }

  return server
}
```

- connect :针对 http 服务的中间件模型，类似 koa
- chokidar:精简的跨端文件监控库
- [acorn](https://github.com/acornjs/acorn): js 语法解析器
- magic-string: js 源码 string 操作 pkg

返回一个 server，具体解释在 ViteDevServer 接口中。

## ViteDevServer

vite 开发服务器

```ts
export interface ViteDevServer {
  /**
   * The resolved vite config object
   */
  config: ResolvedConfig;
  /**
   * A connect app instance.
   * - Can be used to attach custom middlewares to the dev server.
   * - Can also be used as the handler function of a custom http server
   *   or as a middleware in any connect-style Node.js frameworks
   *
   * https://github.com/senchalabs/connect#use-middleware
   */
  middlewares: Connect.Server;
  /**
   * @deprecated use `server.middlewares` instead
   */
  app: Connect.Server;
  /**
   * native Node http server instance
   * will be null in middleware mode
   */
  httpServer: http.Server | null;
  /**
   * chokidar watcher instance
   * https://github.com/paulmillr/chokidar#api
   */
  watcher: FSWatcher;
  /**
   * web socket server with `send(payload)` method
   */
  ws: WebSocketServer;
  /**
   * Rollup plugin container that can run plugin hooks on a given file
   */
  pluginContainer: PluginContainer;
  /**
   * Module graph that tracks the import relationships, url to file mapping
   * and hmr state.
   */
  moduleGraph: ModuleGraph;
  /**
   * Programmatically resolve, load and transform a URL and get the result
   * without going through the http request pipeline.
   */
  transformRequest(
    url: string,
    options?: TransformOptions
  ): Promise<TransformResult | null>;
  /**
   * Apply vite built-in HTML transforms and any plugin HTML transforms.
   */
  transformIndexHtml(
    url: string,
    html: string,
    originalUrl?: string
  ): Promise<string>;
  /**
   * Util for transforming a file with esbuild.
   * Can be useful for certain plugins.
   *
   * @deprecated import `transformWithEsbuild` from `vite` instead
   */
  transformWithEsbuild(
    code: string,
    filename: string,
    options?: EsbuildTransformOptions,
    inMap?: object
  ): Promise<ESBuildTransformResult>;
  /**
   * Load a given URL as an instantiated module for SSR.
   */
  ssrLoadModule(url: string): Promise<Record<string, any>>;
  /**
   * Fix ssr error stacktrace
   */
  ssrFixStacktrace(e: Error): void;
  /**
   * Start the server.
   */
  listen(port?: number, isRestart?: boolean): Promise<ViteDevServer>;
  /**
   * Stop the server.
   */
  close(): Promise<void>;
  /**
   * Print server urls
   */
  printUrls(): void;
  /**
   * @internal
   */
  _optimizeDepsMetadata: DepOptimizationMetadata | null;
  /**
   * Deps that are externalized
   * @internal
   */
  _ssrExternals: string[] | null;
  /**
   * @internal
   */
  _globImporters: Record<
    string,
    {
      module: ModuleNode;
      importGlobs: {
        base: string;
        pattern: string;
      }[];
    }
  >;
  /**
   * @internal
   */
  _isRunningOptimizer: boolean;
  /**
   * @internal
   */
  _registerMissingImport:
    | ((id: string, resolved: string, ssr: boolean | undefined) => void)
    | null;
  /**
   * @internal
   */
  _pendingReload: Promise<void> | null;
  /**
   * @internal
   */
  _pendingRequests: Record<string, Promise<TransformResult | null> | null>;
}
```

## 一个例子

下面是一个 createServer 的例子：

```js
const fs = require('fs');
const path = require('path');
const express = require('express');
const { createServer: createViteServer } = require('vite');

async function createServer() {
  const app = express();

  // 以中间件模式创建 vite 应用，这将禁用 Vite 自身的 HTML 服务逻辑
  // 并让上级服务器接管控制
  const vite = await createViteServer({
    server: { middlewareMode: true },
  });
  // 使用 vite 的 Connect 实例作为中间件
  app.use(vite.middlewares);

  app.use('*', async (req, res) => {
    // 服务 index.html - 下面我们来处理这个问题
  });

  app.listen(3000);
}

createServer();
```
