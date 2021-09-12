# 源码解读

[[toc]]

## 目录结构划

- module：提供 module 对象与 module 对象树的创建功能；
- plugins：提供开发辅助插件，如“时光穿梭”功能，state 修改的日志记录功能等；
- helpers.js：提供 action、mutations 以及 getters 的查找 API；
- index.js：是源码主入口文件，提供 store 的各 module 构建安装；
- mixin.js：提供了 store 在 Vue 实例上的装载注入；
- util.js：提供了工具方法如 find、deepCopy、forEachValue 以及 assert 等方法。

## store.js

### createStore

```js
export function createStore(options) {
  return new Store(options);
}
```

### constructor

```js
export class Store {
  constructor(options = {}) {
    if (__DEV__) {
      assert(typeof Promise !== 'undefined', `vuex requires a Promise polyfill in this browser.`);
      assert(this instanceof Store, `store must be called with the new operator.`);
    }

    const { plugins = [], strict = false, devtools } = options;

    // store internal state
    /* 用来判断严格模式下是否是用mutation修改state的 */
    this._committing = false;
    /* 存放action */
    this._actions = Object.create(null);

    this._actionSubscribers = [];
    /* 存放mutation */
    this._mutations = Object.create(null);
    /* 存放getter */
    this._wrappedGetters = Object.create(null);
    /* module收集器 */
    this._modules = new ModuleCollection(options);
    /* 根据namespace存放module */
    this._modulesNamespaceMap = Object.create(null);
    /* 存放订阅者 */
    this._subscribers = [];
    this._makeLocalGettersCache = Object.create(null);
    this._devtools = devtools;

    // bind commit and dispatch to self
    // 确保 dispatch/commit 方法中的 this 对象正确指向 store
    /**
     * 主要是把 Store 类的 dispatch 和 commit 的方法的 this 指针指向当前 store 的实例上. 这样做的目的可以保证当我们在组件中通过 this.$store 直接调用 dispatch/commit 方法时, 能够使 dispatch/commit 方法中的 this 指向当前的 store 对象而不是当前组件的 this.
     * */
    const store = this;
    const { dispatch, commit } = this;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options);
    };

    // strict mode
    /*严格模式(使 Vuex store 进入严格模式，在严格模式下，任何 mutation 处理函数以外修改 Vuex state 都会抛出错误)*/
    this.strict = strict;

    const state = this._modules.root.state;

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root);

    // initialize the store state, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    /*使store具有响应式*/
    resetStoreState(this, state);

    // apply plugins
    plugins.forEach((plugin) => plugin(this));
  }
}
```

#### resetStoreState

```js
export function resetStoreState(store, state, hot) {
  const oldState = store._state;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  const wrappedGetters = store._wrappedGetters;
  const computedObj = {};
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldState.
    // using partial to return function with only arguments preserved in closure environment.
    computedObj[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      // TODO: use `computed` when it's possible. at the moment we can't due to
      // https://github.com/vuejs/vuex/pull/1883
      get: () => computedObj[key](),
      enumerable: true, // for local getters
    });
  });

  store._state = reactive({
    data: state,
  });

  // enable strict mode for new state
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldState) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldState.data = null;
      });
    }
  }
}
```

### install

```js
export class Store {
  install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;

    const useDevtools =
      this._devtools !== undefined ? this._devtools : __DEV__ || __VUE_PROD_DEVTOOLS__;

    if (useDevtools) {
      addDevtools(app, this);
    }
  }

  get state() {
    return this._state.data;
  }

  set state(v) {
    if (__DEV__) {
      assert(false, `use store.replaceState() to explicit replace store state.`);
    }
  }
}
```

### commit

```js
commit(_type, _payload, _options) {
  // check object-style commit
  const { type, payload, options } = unifyObjectStyle(_type, _payload, _options);

  const mutation = { type, payload };
  const entry = this._mutations[type];
  if (!entry) {
    if (__DEV__) {
      console.error(`[vuex] unknown mutation type: ${type}`);
    }
    return;
  }
  /* 执行mutation中的所有方法 */
  this._withCommit(() => {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });

  /* 通知所有订阅者 */
  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach((sub) => sub(mutation, this.state));

  if (__DEV__ && options && options.silent) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
        'Use the filter functionality in the vue-devtools'
    );
  }
}
```

```js
_withCommit (fn) {
  const committing = this._committing
  this._committing = true
  fn()
  this._committing = committing
}
```

### dispatch

```js
dispatch(_type, _payload) {
  // check object-style dispatch
  const { type, payload } = unifyObjectStyle(_type, _payload);

  const action = { type, payload };
  const entry = this._actions[type];
  if (!entry) {
    if (__DEV__) {
      console.error(`[vuex] unknown action type: ${type}`);
    }
    return;
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter((sub) => sub.before)
      .forEach((sub) => sub.before(action, this.state));
  } catch (e) {
    if (__DEV__) {
      console.warn(`[vuex] error in before action subscribers: `);
      console.error(e);
    }
  }

  const result =
    entry.length > 1 ? Promise.all(entry.map((handler) => handler(payload))) : entry[0](payload);

  return new Promise((resolve, reject) => {
    result.then(
      (res) => {
        try {
          this._actionSubscribers
            .filter((sub) => sub.after)
            .forEach((sub) => sub.after(action, this.state));
        } catch (e) {
          if (__DEV__) {
            console.warn(`[vuex] error in after action subscribers: `);
            console.error(e);
          }
        }
        resolve(res);
      },
      (error) => {
        try {
          this._actionSubscribers
            .filter((sub) => sub.error)
            .forEach((sub) => sub.error(action, this.state, error));
        } catch (e) {
          if (__DEV__) {
            console.warn(`[vuex] error in error action subscribers: `);
            console.error(e);
          }
        }
        reject(error);
      }
    );
  });
}

```

```js
subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
}

```

```js
subscribeAction(fn, options) {
  const subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
}
```

### watch

watch 就可以直接采用了 Vue 内部的 watch 特性提供了一种观察数据 getter 变动的方法。

```js
import { watch } from 'vue'
// ....

/* 观察一个getter方法 */
watch(getter, cb, options) {
  if (__DEV__) {
    assert(typeof getter === 'function', `store.watch only accepts a function.`);
  }
  return watch(() => getter(this.state, this.getters), cb, Object.assign({}, options));
}
```

### replaceState

```js
replaceState(state) {
  this._withCommit(() => {
    this._state.data = state;
  });
}

```

### registerModule

registerModule 用以注册一个动态模块，也就是在 store 创建以后再注册模块的时候用该接口

```js

registerModule(path, rawModule, options = {}) {
  if (typeof path === 'string') path = [path];

  if (__DEV__) {
    assert(Array.isArray(path), `module path must be a string or an Array.`);
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreState(this, this.state);
}

```

### unregisterModule

同样，与 registerModule 对应的方法 unregisterModule，动态注销模块。实现方法是先从 state 中删除模块，然后用 resetStore 来重制 store。

```js

unregisterModule(path) {
  if (typeof path === 'string') path = [path];

  if (__DEV__) {
    assert(Array.isArray(path), `module path must be a string or an Array.`);
  }

  this._modules.unregister(path);
  this._withCommit(() => {
    const parentState = getNestedState(this.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
}

```

### hasModule

```js

hasModule(path) {
  if (typeof path === 'string') path = [path];

  if (__DEV__) {
    assert(Array.isArray(path), `module path must be a string or an Array.`);
  }

  return this._modules.isRegistered(path);
}
```

### hotUpdate

```js
hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
}
```

### \_withCommit

执行 mutation 函数

```js
_withCommit(fn) {
  const committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
}
```

## 参考阅读

- [Vuex 源码解析](https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown)
- [Vuex 框架原理与源码分析（vue2）-美团技术团队](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)
- [Vuex 源码分析 #58](https://github.com/dwqs/blog/issues/58)
