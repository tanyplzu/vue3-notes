# Vue Router 源码

[[toc]]

## createRouter

```js
function createRouter(options) {
  // 定义一些辅助方法和变量

  // ...

  // 创建 router 对象
  const router = {
    // 当前路径
    currentRoute,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app) {
      // 安装路由函数
    },
  };
  return router;
}
```

## install

```js
const router = {
  install(app) {
    const router = this;

    // 注册路由组件
    app.component('RouterLink', RouterLink);
    app.component('RouterView', RouterView);

    // 全局配置定义 $router 和 $route
    app.config.globalProperties.$router = router;
    Object.defineProperty(app.config.globalProperties, '$route', {
      get: () => unref(currentRoute),
    });

    // 在浏览器端初始化导航
    if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
      // see above
      started = true;
      push(routerHistory.location).catch((err) => {
        warn('Unexpected error when starting the router:', err);
      });
    }

    // 路径变成响应式
    const reactiveRoute = {};
    for (let key in START_LOCATION_NORMALIZED) {
      reactiveRoute[key] = computed(() => currentRoute.value[key]);
    }

    // 全局注入 router 和 reactiveRoute
    app.provide(routerKey, router);
    app.provide(routeLocationKey, reactive(reactiveRoute));
    let unmountApp = app.unmount;
    installedApps.add(app);

    // 应用卸载的时候，需要做一些路由清理工作
    app.unmount = function () {
      installedApps.delete(app);
      if (installedApps.size < 1) {
        removeHistoryListener();
        currentRoute.value = START_LOCATION_NORMALIZED;
        started = false;
        ready = false;
      }
      unmountApp.call(this, arguments);
    };
  },
};
```

## currentRoute

```js
const START_LOCATION_NORMALIZED = {
  path: '/',
  name: undefined,
  params: {},
  query: {},
  hash: '',
  fullPath: '/',
  matched: [],
  meta: {},
  redirectedFrom: undefined,
};
```
