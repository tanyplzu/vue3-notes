# http

```js
export async function resolveHttpServer(
  { proxy }: ServerOptions,
  app: Connect.Server,
  httpsOptions?: HttpsServerOptions
): Promise<HttpServer> {
  if (!httpsOptions) {
    return require('http').createServer(app);
  }

  if (proxy) {
    // #484 fallback to http1 when proxy is needed.
    // 如果与 Proxy/Https 一起使用，请将 ViteJS 更改为自动回退到 http1.1
    return require('https').createServer(httpsOptions, app);
  } else {
    return require('http2').createSecureServer(
      {
        ...httpsOptions,
        allowHTTP1: true,
      },
      app
    );
  }
}
```

`require('http').createServer(app)`为什么在 import 的语法能这样使用
