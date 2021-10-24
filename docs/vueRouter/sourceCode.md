---
sidebarDepth: 1
---

# Vue Router 源码解读

[[toc]]

## 目录结构

## createRouter

```js
function createRouter(options) {
  // 创建 router 对象
  const router = {
    currentRoute, // 当前路径
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

返回来一个 router 对象，通过 install 注册到 vue 根实例

### install

```js
const router = {
  install(app) {
    const router = this;

    // 注册全局路由组件
    app.component('RouterLink', RouterLink);
    app.component('RouterView', RouterView);

    // 全局配置定义 $router 和 $route
    app.config.globalProperties.$router = router;
    Object.defineProperty(app.config.globalProperties, '$route', {
      get: () => unref(currentRoute),
    });

    // 在浏览器端初始化导航
    if (
      isBrowser &&
      !started &&
      currentRoute.value === START_LOCATION_NORMALIZED
    ) {
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

### provide

```js
const PolySymbol = (name) =>
  hasSymbol ? Symbol('[vue-router]: ' + name) : '[vue-router]: ' + name;

const routerKey = /*#__PURE__*/ PolySymbol('router');
const routeLocationKey = /*#__PURE__*/ PolySymbol('route location');
const routerViewLocationKey = /*#__PURE__*/ PolySymbol('router view location');

const reactiveRoute = {};
for (const key in START_LOCATION_NORMALIZED) {
  reactiveRoute[key] = computed(() => currentRoute.value[key]);
}

app.provide(routerKey, router);
app.provide(routeLocationKey, reactive(reactiveRoute));
app.provide(routerViewLocationKey, currentRoute);
```

此处的代码是拼凑的。

## currentRoute

其实就是当前浏览器的路径信息。

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

通过 router.push、router.replace 改变当前的路由对象，它们的底层最终都是通过 pushWithRedirect 完成路径的切换。

```js
function push(to: RouteLocationRaw | RouteLocation) {
  return pushWithRedirect(to);
}

function replace(to: RouteLocationRaw | RouteLocationNormalized) {
  return push(assign(locationAsObject(to), { replace: true }));
}
```

### pushWithRedirect

```js
function pushWithRedirect(to, redirectedFrom) {
  const targetLocation = (pendingLocation = resolve(to));
  const from = currentRoute.value;
  const data = to.state;
  const force = to.force;
  const replace = to.replace === true;
  const toLocation = targetLocation;
  toLocation.redirectedFrom = redirectedFrom;
  let failure;
  if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
    failure = createRouterError(16 /* NAVIGATION_DUPLICATED */, {
      to: toLocation,
      from,
    });
    handleScroll(from, from, true, false);
  }
  return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
    .catch((error) => {
      if (
        isNavigationFailure(
          error,
          4 /* NAVIGATION_ABORTED */ |
            8 /* NAVIGATION_CANCELLED */ |
            2 /* NAVIGATION_GUARD_REDIRECT */
        )
      ) {
        return error;
      }
      return triggerError(error);
    })
    .then((failure) => {
      if (failure) {
        // 处理错误
      } else {
        failure = finalizeNavigation(toLocation, from, true, replace, data);
      }
      triggerAfterEach(toLocation, from, failure);
      return failure;
    });
}
```

- navigate 执行导航守卫函数
- finalizeNavigation 最终的路径切换

### navigate

实际上是执行路由切换过程中的一系列导航守卫函数

```js
function navigate(to, from) {
  let guards;
  const [leavingRecords, updatingRecords, enteringRecords] =
    extractChangingRecords(to, from);
  // all components here have been resolved once because we are leaving
  guards = extractComponentsGuards(
    leavingRecords.reverse(),
    'beforeRouteLeave',
    to,
    from
  );
  // leavingRecords is already reversed
  for (const record of leavingRecords) {
    record.leaveGuards.forEach((guard) => {
      guards.push(guardToPromiseFn(guard, to, from));
    });
  }
  const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(
    null,
    to,
    from
  );
  guards.push(canceledNavigationCheck);
  // run the queue of per route beforeRouteLeave guards
  return (
    runGuardQueue(guards)
      .then(() => {
        // check global guards beforeEach
        guards = [];
        for (const guard of beforeGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      })
      .then(() => {
        // check in components beforeRouteUpdate
        guards = extractComponentsGuards(
          updatingRecords,
          'beforeRouteUpdate',
          to,
          from
        );
        for (const record of updatingRecords) {
          record.updateGuards.forEach((guard) => {
            guards.push(guardToPromiseFn(guard, to, from));
          });
        }
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      })
      .then(() => {
        // check the route beforeEnter
        guards = [];
        for (const record of to.matched) {
          // do not trigger beforeEnter on reused views
          if (record.beforeEnter && !from.matched.includes(record)) {
            if (Array.isArray(record.beforeEnter)) {
              for (const beforeEnter of record.beforeEnter)
                guards.push(guardToPromiseFn(beforeEnter, to, from));
            } else {
              guards.push(guardToPromiseFn(record.beforeEnter, to, from));
            }
          }
        }
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      })
      .then(() => {
        // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
        // clear existing enterCallbacks, these are added by extractComponentsGuards
        to.matched.forEach((record) => (record.enterCallbacks = {}));
        // check in-component beforeRouteEnter
        guards = extractComponentsGuards(
          enteringRecords,
          'beforeRouteEnter',
          to,
          from
        );
        guards.push(canceledNavigationCheck);
        // run the queue of per route beforeEnter guards
        return runGuardQueue(guards);
      })
      .then(() => {
        // check global guards beforeResolve
        guards = [];
        for (const guard of beforeResolveGuards.list()) {
          guards.push(guardToPromiseFn(guard, to, from));
        }
        guards.push(canceledNavigationCheck);
        return runGuardQueue(guards);
      })
      // catch any navigation canceled
      .catch((err) =>
        isNavigationFailure(err, 8 /* NAVIGATION_CANCELLED */)
          ? err
          : Promise.reject(err)
      )
  );
}
```

```js
function runGuardQueue(guards) {
  return guards.reduce(
    (promise, guard) => promise.then(() => guard()),
    Promise.resolve()
  );
}
```

### finalizeNavigation

这里完成真正的路径切换

```js
function finalizeNavigation(toLocation, from, isPush, replace, data) {
  const error = checkCanceledNavigation(toLocation, from);
  if (error) return error;
  const isFirstNavigation = from === START_LOCATION_NORMALIZED;
  const state = !isBrowser ? {} : history.state;
  if (isPush) {
    if (replace || isFirstNavigation)
      routerHistory.replace(
        toLocation.fullPath,
        assign(
          {
            scroll: isFirstNavigation && state && state.scroll,
          },
          data
        )
      );
    else routerHistory.push(toLocation.fullPath, data);
  }
  currentRoute.value = toLocation;
  handleScroll(toLocation, from, isPush, isFirstNavigation);
  markAsReady();
}
```

主要调取了下面两个方法：

- routerHistory.push
- routerHistory.replace

```js
const routerHistory = options.history;
```

routerHistory 是 history 中的 routerHistory，history 在 createRouter 时传入。history 是 createWebHistory、createWebHashHistory、createMemoryHistory 创建的对象。

## history 的模式

### 源码中的方法

- createBaseLocation
- createCurrentLocation
- useHistoryListeners
- buildState
- useHistoryStateNavigation
  - changeLocation
  - replace
  - push
- createWebHistory（export）

::: tip 问题
每当我们切换路由的时候，会发现浏览器的 URL 发生了变化，但是页面却没有刷新，它是怎么做的呢？
:::

### createWebHistory

```js
function createWebHistory(base) {
  base = normalizeBase(base);
  const historyNavigation = useHistoryStateNavigation(base);
  const historyListeners = useHistoryListeners(
    base,
    historyNavigation.state,
    historyNavigation.location,
    historyNavigation.replace
  );
  function go(delta, triggerListeners = true) {
    if (!triggerListeners) historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign(
    {
      // it's overridden right after
      location: '',
      base,
      go,
      createHref: createHref.bind(null, base),
    },
    historyNavigation,
    historyListeners
  );
  Object.defineProperty(routerHistory, 'location', {
    get: () => historyNavigation.location.value,
  });
  Object.defineProperty(routerHistory, 'state', {
    get: () => historyNavigation.state.value,
  });
  return routerHistory;
}
```

`routerHistory` 对象而言，它有两个重要的作用，一个是路径的切换，一个是监听路径的变化。

路径切换主要通过 `historyNavigation` 来完成的，它是 `useHistoryStateNavigation` 函数的返回值。

### useHistoryStateNavigation

```js
function useHistoryStateNavigation(base) {
  const { history, location } = window;
  let currentLocation = {
    value: createCurrentLocation(base, location),
  };
  let historyState = { value: history.state };
  if (!historyState.value) {
    changeLocation(
      currentLocation.value,
      {
        back: null,
        current: currentLocation.value,
        forward: null,
        position: history.length - 1,
        replaced: true,
        scroll: null,
      },
      true
    );
  }
  function changeLocation(to, state, replace) {
    // ...
  }
  function replace(to, data) {
    const state = assign(
      {},
      history.state,
      buildState(
        historyState.value.back,
        // keep back and forward entries but override current position
        to,
        historyState.value.forward,
        true
      ),
      data,
      { position: historyState.value.position }
    );
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign({}, historyState.value, history.state, {
      forward: to,
      scroll: computeScrollPosition(),
    });
    if (!history.state) {
      warn(
        `history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:\n\n` +
          `history.replaceState(history.state, '', url)\n\n` +
          `You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`
      );
    }
    changeLocation(currentState.current, currentState, true);
    const state = assign(
      {},
      buildState(currentLocation.value, to, null),
      { position: currentState.position + 1 },
      data
    );
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace,
  };
}
```

返回的 push 和 replace 函数，会添加给 routerHistory 对象上，因此当我们调用 routerHistory.push 或者是 routerHistory.replace 方法的时候实际上就是在执行这两个函数。

push 和 replace 方法内部都是执行了 `changeLocation` 方法，该函数内部执行了浏览器底层的 `history.pushState` 或者 `history.replaceState` 方法，会向当前浏览器会话的历史堆栈中添加一个状态，这样就在不刷新页面的情况下修改了页面的 URL。

### changeLocation

```js
function changeLocation(to, state, replace) {
  const hashIndex = base.indexOf('#');
  const url =
    hashIndex > -1
      ? (location.host && document.querySelector('base')
          ? base
          : base.slice(hashIndex)) + to
      : createBaseLocation() + base + to;
  try {
    // BROWSER QUIRK
    // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
    history[replace ? 'replaceState' : 'pushState'](state, '', url);
    historyState.value = state;
  } catch (err) {
    {
      warn('Error with push/replace State', err);
    }
    // Force the navigation, this also resets the call count
    location[replace ? 'replace' : 'assign'](url);
  }
}
```

### useHistoryListeners

假设我们点击浏览器的回退按钮回到上一个 URL，这需要恢复到上一个路径以及更新路由视图，因此我们还需要监听这种 history 变化的行为，做一些相应的处理。history 变化的监听主要是通过 historyListeners 来完成的，它是 useHistoryListeners 函数的返回值，

```js
function useHistoryListeners(base, historyState, currentLocation, replace) {
  let listeners = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta
          ? delta > 0
            ? NavigationDirection.forward
            : NavigationDirection.back
          : NavigationDirection.unknown,
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners.push(callback);
    const teardown = () => {
      const index = listeners.indexOf(callback);
      if (index > -1) listeners.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history } = window;
    if (!history.state) return;
    history.replaceState(
      assign({}, history.state, { scroll: computeScrollPosition() }),
      ''
    );
  }
  function destroy() {
    for (const teardown of teardowns) teardown();
    teardowns = [];
    window.removeEventListener('popstate', popStateHandler);
    window.removeEventListener('beforeunload', beforeUnloadListener);
  }
  window.addEventListener('popstate', popStateHandler);
  window.addEventListener('beforeunload', beforeUnloadListener);
  return {
    pauseListeners,
    listen,
    destroy,
  };
}
```

数内部还监听了浏览器底层 Window 的 popstate 事件，当我们点击浏览器的回退按钮或者是执行了 history.back 方法的时候，会触发事件的回调函数 `popStateHandler`，进而遍历侦听器 listeners，执行每一个侦听器函数。

Vue Router 是如何添加这些侦听器的呢？原来在安装路由的时候，会执行一次初始化导航，执行了 push 方法进而执行了 `finalizeNavigation` 方法。

### finalizeNavigation

```js
function finalizeNavigation(toLocation, from, isPush, replace, data) {
  // only consider as push if it's not the first navigation
  const isFirstNavigation = from === START_LOCATION_NORMALIZED;
  const state = !isBrowser ? {} : history.state;
  // change URL only if the user did a push/replace and if it's not the initial navigation because
  // it's just reflecting the url
  if (isPush) {
    // on the initial navigation, we want to reuse the scroll position from
    // history state if it exists
    if (replace || isFirstNavigation)
      routerHistory.replace(
        toLocation.fullPath,
        assign(
          {
            scroll: isFirstNavigation && state && state.scroll,
          },
          data
        )
      );
    else routerHistory.push(toLocation.fullPath, data);
  }
  // accept current navigation
  currentRoute.value = toLocation;
  handleScroll(toLocation, from, isPush, isFirstNavigation);
  markAsReady();
}
```

在 finalizeNavigation 的最后，会执行 markAsReady 方法

### markAsReady

```js
/**
 * Mark the router as ready, resolving the promised returned by isReady(). Can
 * only be called once, otherwise does nothing.
 * @param err - optional error
 */
function markAsReady(err) {
  if (ready) return;
  ready = true;
  setupListeners();
  readyHandlers
    .list()
    .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
  readyHandlers.reset();
}
```

## RouterView

路由组件就是通过 RouterView 组件渲染的

```js
const RouterView = defineComponent({
  name: 'RouterView',
  props: {
    name: {
      type: String,
      default: 'default',
    },
    route: Object,
  },
  setup(props, { attrs, slots }) {
    warnDeprecatedUsage();
    // provide：app.provide(routeLocationKey, reactive(reactiveRoute));
    const injectedRoute = inject(routeLocationKey); // injectedRoute是响应式的
    const depth = inject(viewDepthKey, 0); // 0 是默认值
    const matchedRouteRef = computed(
      () => (props.route || injectedRoute).matched[depth]
    );
    provide(viewDepthKey, depth + 1);
    provide(matchedRouteKey, matchedRouteRef);
    const viewRef = ref();
    watch(
      () => [viewRef.value, matchedRouteRef.value, props.name],
      ([instance, to, name], [oldInstance, from, oldName]) => {
        if (to) {
          to.instances[name] = instance;
          if (from && instance === oldInstance) {
            to.leaveGuards = from.leaveGuards;
            to.updateGuards = from.updateGuards;
          }
        }
        if (
          instance &&
          to &&
          (!from || !isSameRouteRecord(to, from) || !oldInstance)
        ) {
          (to.enterCallbacks[name] || []).forEach((callback) =>
            callback(instance)
          );
        }
      }
    );
    return () => {
      const route = props.route || injectedRoute;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[props.name];
      const currentName = props.name;
      if (!ViewComponent) {
        return slots.default
          ? slots.default({ Component: ViewComponent, route })
          : null;
      }
      const routePropsOption = matchedRoute.props[props.name];
      const routeProps = routePropsOption
        ? routePropsOption === true
          ? route.params
          : typeof routePropsOption === 'function'
          ? routePropsOption(route)
          : routePropsOption
        : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(
        ViewComponent,
        assign({}, routeProps, attrs, {
          onVnodeUnmounted,
          ref: viewRef,
        })
      );
      return slots.default
        ? slots.default({ Component: component, route })
        : component;
    };
  },
});
```

- setup 函数的返回值是一个函数，那这个函数就是它的渲染函数。
- depth 就是表示这个 RouterView 的嵌套层级。
- 响应式关联逻辑：`RouterView` -> `ViewComponent` -> `matchedRoute && matchedRoute.components[props.name] ` -> `matchedRouteRef` -> `(props.route || injectedRoute).matched[depth]`
- injectedRoute 就是我们在前面在安装路由时候，注入的响应式 currentRoute 对象，而 depth 就是表示这个 RouterView 的嵌套层级。这里的 injectedRoute 是响应式的。
- RouterView 的渲染的路由组件和当前路径 currentRoute 的 matched 对象相关，也和 RouterView 自身的嵌套层级相关。

### matched 的值是怎么在路径切换的情况下更新的

我们执行 `createRouter` 函数创建路由的时候，内部会执行如下代码来创建一个 matcher 对象：

```js
export function createRouter(options: RouterOptions): Router {
  const matcher = createRouterMatcher(options.routes, options);
  // ...
}
```

createRouterMatcher

```js
function createRouterMatcher(routes, globalOptions) {
  const matchers = [];
  const matcherMap = new Map();
  globalOptions = mergeOptions(
    { strict: false, end: true, sensitive: false },
    globalOptions
  );

  function addRoute(record, parent, originalRecord) {
    let isRootAdd = !originalRecord;
    let mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [mainNormalizedRecord];
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      let { path } = normalizedRecord;
      if (parent && path[0] !== '/') {
        let parentPath = parent.record.path;
        let connectingSlash =
          parentPath[parentPath.length - 1] === '/' ? '' : '/';
        normalizedRecord.path =
          parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (parent && path[0] === '/')
        checkMissingParamsInAbsolutePath(matcher, parent);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
        {
          checkSameParams(originalRecord, matcher);
        }
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher) originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if ('children' in mainNormalizedRecord) {
        let children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(
            children[i],
            matcher,
            originalRecord && originalRecord.children[i]
          );
        }
      }
      originalRecord = originalRecord || matcher;
      insertMatcher(matcher);
    }
    return originalMatcher
      ? () => {
          removeRoute(originalMatcher);
        }
      : noop;
  }

  function insertMatcher(matcher) {
    let i = 0;
    while (
      i < matchers.length &&
      comparePathParserScore(matcher, matchers[i]) >= 0
    )
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }

  // 定义其它一些辅助函数

  // 添加初始路径
  routes.forEach((route) => addRoute(route));
  return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
}
```

`createRouterMatcher` 函数内部定义了一个 `matchers` 数组和一些辅助函数

- addRoute
- resolve
- removeRoute
- getRoutes
- getRecordMatcher

在 createRouterMatcher 函数的最后，会遍历 routes 路径数组调用 addRoute 方法添加初始路径。在 addRoute 函数内部，首先会把 route 对象标准化成一个 record，其实就是给路径对象添加更丰富的属性。

然后再执行 createRouteRecordMatcher 函数，传入标准化的 record 对象

### createRouteRecordMatcher

```js
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  {
    const existingKeys = new Set();
    for (const key of parser.keys) {
      if (existingKeys.has(key.name))
        warn(
          `Found duplicated params with name "${key.name}" for path "${record.path}". Only the last one will be available on "$route.params".`
        );
      existingKeys.add(key.name);
    }
  }
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: [],
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
```

其实 createRouteRecordMatcher 创建的 matcher 对象不仅仅拥有 record 属性来存储 record，还扩展了一些其他属性，需要注意，如果存在 parent matcher，那么会把当前 matcher 添加到 parent.children 中去，这样就维护了父子关系，构造了树形结构。

<div style='color:red'> matched 的值是怎么在路径切换的情况下更新的? </div>

切换路径会执行 pushWithRedirect 方法，内部会执行一段代码：

```js
const targetLocation = (pendingLocation = resolve(to));
```

### resolve

执行 resolve 函数解析生成 targetLocation，这个 targetLocation 最后也会在 finalizeNavigation 的时候赋值 currentRoute 更新当前路径。

```js
function resolve(location, currentLocation) {
  let matcher;
  let params = {};
  let path;
  let name;
  if ('name' in location && location.name) {
    matcher = matcherMap.get(location.name);
    if (!matcher)
      throw createRouterError(1 /* MATCHER_NOT_FOUND */, {
        location,
      });
    name = matcher.record.name;
    params = assign(
      paramsFromLocation(
        currentLocation.params,
        matcher.keys.filter((k) => !k.optional).map((k) => k.name)
      ),
      location.params
    );
    path = matcher.stringify(params);
  } else if ('path' in location) {
    path = location.path;
    if (!path.startsWith('/')) {
      warn(
        `The Matcher cannot resolve relative paths but received "${path}". Unless you directly called \`matcher.resolve("${path}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/vue-router-next.`
      );
    }
    matcher = matchers.find((m) => m.re.test(path));

    if (matcher) {
      params = matcher.parse(path);
      name = matcher.record.name;
    }
  } else {
    matcher = currentLocation.name
      ? matcherMap.get(currentLocation.name)
      : matchers.find((m) => m.re.test(currentLocation.path));
    if (!matcher)
      throw createRouterError(1 /* MATCHER_NOT_FOUND */, {
        location,
        currentLocation,
      });
    name = matcher.record.name;
    params = assign({}, currentLocation.params, location.params);
    path = matcher.stringify(params);
  }
  const matched = [];
  let parentMatcher = matcher;
  while (parentMatcher) {
    matched.unshift(parentMatcher.record);
    parentMatcher = parentMatcher.parent;
  }
  return {
    name,
    path,
    params,
    matched,
    meta: mergeMetaFields(matched),
  };
}
```

resolve 函数主要做的事情就是根据 location 的 name 或者 path 从我们前面创建的 matchers 数组中找到对应的 matcher，然后再顺着 matcher 的 parent 一直找到链路上所有匹配的 matcher，然后获取其中的 record 属性构造成一个 matched 数组，最终返回包含 matched 属性的新的路径对象。

这么做的目的就是让 matched 数组完整记录 record 路径，它的顺序和嵌套的 RouterView 组件顺序一致，也就是 matched 数组中的第 n 个元素就代表着 RouterView 嵌套的第 n 层。

因此 targetLocation 和 to 相比，其实就是多了一个 matched 对象，这样再回到我们的 RouterView 组件，就可以从`injectedRoute.matched[depth] [props.name]`中拿到对应的组件对象定义，去渲染对应的组件了。

## 导航守卫的实现

```js
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' }) else {
    next()
  }
})
```

对于导航守卫而言，经过 Promise 化后添加到 guards 数组中，然后再通过 runGuards 以及 Promise 的方式链式调用，最终依次顺序执行这些导航守卫。

- [是什么事让尤大如此生气？](https://blog.csdn.net/weixin_40906515/article/details/120695253)
