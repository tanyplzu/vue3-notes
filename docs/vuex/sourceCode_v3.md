# vuex3 源码

Vuex 使用注入代码的方式，调用了 applyMixin 方法，vuex3 调用的是 Vue.mixin，在所有组件的 beforeCreate 生命周期注入了设置 this.$store 这样一个对象。

## Vue.mixin

```js
// src/store.js
export function install(_Vue) {
  if (Vue && _Vue === Vue) {
    return;
  }
  Vue = _Vue;
  applyMixin(Vue);
}
```

```js
// src/mixins.js
export default function (Vue) {
  const version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // 兼容2之前的版本
    const _init = Vue.prototype._init;
    Vue.prototype._init = function (options = {}) {
      options.init = options.init ? [vuexInit].concat(options.init) : vuexInit;
      _init.call(this, options);
    };
  }

  function vuexInit() {
    const options = this.$options;
    // store injection
    if (options.store) {
      this.$store =
        typeof options.store === 'function' ? options.store() : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}
```

`Vue.mixin({ beforeCreate: vuexInit })`，所有组件中都注入了 vuexInit。vuexInit 中`this.$store = options.parent.$store`是将$store 一层一层的传递下去。

## Vuex.Store

```js
// src/store.js
constructor (options = {}) {
  const {
    plugins = [],
    strict = false
  } = options

  // 初始变量设置
  this._committing = false // 是否在进行提交状态标识
  this._actions = Object.create(null)
  this._actionSubscribers = []
  this._mutations = Object.create(null)
  this._wrappedGetters = Object.create(null) // 封装后的getters集合对象
  this._modules = new ModuleCollection(options) 
  this._modulesNamespaceMap = Object.create(null)
  this._subscribers = []
  this._watcherVM = new Vue() // Vue组件用于watch监视变化

  const store = this

  // dispatch和commit设置
  // 封装替换原型中的dispatch和commit方法，将this指向当前store对象
  const { dispatch, commit } = this
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
}
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
}

  // strict mode
  this.strict = strict

  const state = this._modules.root.state

  // init root module.

  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root)

  resetStoreVM(this, state)

  // apply plugins
  plugins.forEach(plugin => plugin(this))

}
```

## resetStoreVM

进行 store 组件的初始化。

```js
// src/store.js
function resetStoreVM(store, state, hot) {
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  });
}
```

```js
function resetStoreVM(store, state, hot) {
  const oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  const wrappedGetters = store._wrappedGetters;
  const computed = {};
  // 循环所有处理过的getters，并新建computed对象进行存储，通过Object.defineProperty方法为getters对象建立属性，使得我们通过this.$store.getters.xxxgetter能够访问到该getters
  forEachValue(wrappedGetters, (fn, key) => {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key],
      enumerable: true, // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  const silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state,
    },
    computed,
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(() => {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(() => oldVm.$destroy());
  }
}
```

vuex 的响应式主要使用了 Vue2 的 data 和 computed。

## enableStrictMode

该方法对 state 执行$watch 以禁止从 mutation 外部修改 state，只是一个对 state 修改的约束判断，有性能问题。

```js
function enableStrictMode(store) {
  store._vm.$watch(
    function () {
      return this._data.$$state;
    },
    () => {
      {
        assert(
          store._committing,
          `do not mutate vuex store state outside mutation handlers.`
        );
      }
    },
    { deep: true, sync: true }
  );
}
// 相关代码
function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`);
}
_withCommit (fn) {
  const committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
}
```

Vuex 中修改 state 的唯一渠道就是执行 commit('xx', payload) 方法，其底层通过执行 `this._withCommit(fn)` 设置 `_committing` 标志变量为 true，然后才能修改 state，修改完毕还需要还原`_committing`变量。外部修改虽然能够直接修改 state，但是并没有修改 `_committing` 标志位，所以只要 watch 一下 state，state change 时判断是否 `_committing` 值为 true，即可判断修改的合法性。

## ModuleCollection

ModuleCollection 主要将传入的 options 对象整个构造为一个 module 对象，并循环调用 this.register([key], rawModule, false) 为其中的 modules 属性进行模块注册，使其都成为 module 对象，最后 options 对象被构造成一个完整的组件树。

所有 module 都会有一个 local context，根据配置时的 path 进行匹配。所以执行如 `dispatch('submitOrder', payload)` 这类 action 时，默认的拿到都是 module 的 local state，如果要访问最外层或者是其他 module 的 state，只能从 rootState 按照 path 路径逐步进行访问。

```js
// register nested modules
if (rawModule.modules) {
  forEachValue(rawModule.modules, (rawChildModule, key) => {
    this.register(path.concat(key), rawChildModule, runtime);
  });
}
```

```js
class ModuleCollection {
  constructor(rawRootModule) {
    // register root module (Vuex.Store options)
    this.register([], rawRootModule, false);
  }

  get(path) {
    return path.reduce((module, key) => {
      return module.getChild(key);
    }, this.root);
  }

  getNamespace(path) {
    let module = this.root;
    return path.reduce((namespace, key) => {
      module = module.getChild(key);
      return namespace + (module.namespaced ? key + '/' : '');
    }, '');
  }

  update(rawRootModule) {
    update([], this.root, rawRootModule);
  }

  register(path, rawModule, runtime = true) {
    {
      assertRawModule(path, rawModule);
    }

    const newModule = new Module(rawModule, runtime);
    if (path.length === 0) {
      this.root = newModule;
    } else {
      const parent = this.get(path.slice(0, -1));
      parent.addChild(path[path.length - 1], newModule);
    }

    // register nested modules
    if (rawModule.modules) {
      forEachValue(rawModule.modules, (rawChildModule, key) => {
        this.register(path.concat(key), rawChildModule, runtime);
      });
    }
  }

  unregister(path) {
    // ...
    parent.removeChild(key);
  }

  isRegistered(path) {
    const parent = this.get(path.slice(0, -1));
    const key = path[path.length - 1];

    if (parent) {
      return parent.hasChild(key);
    }

    return false;
  }
}
```

## dispatch

触发 `_actions`

```js
dispatch (_type, _payload) {
  // check object-style dispatch
  const {
    type,
    payload
  } = unifyObjectStyle(_type, _payload);

  const action = { type, payload };
  const entry = this._actions[type];
  if (!entry) {
    {
      console.error(`[vuex] unknown action type: ${type}`);
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(sub => sub.before)
      .forEach(sub => sub.before(action, this.state));
  } catch (e) {
    {
      console.warn(`[vuex] error in before action subscribers: `);
      console.error(e);
    }
  }

  const result = entry.length > 1
    ? Promise.all(entry.map(handler => handler(payload)))
    : entry[0](payload);

  return new Promise((resolve, reject) => {
    result.then(res => {
      try {
        this._actionSubscribers
          .filter(sub => sub.after)
          .forEach(sub => sub.after(action, this.state));
      } catch (e) {
        {
          console.warn(`[vuex] error in after action subscribers: `);
          console.error(e);
        }
      }
      resolve(res);
    }, error => {
      try {
        this._actionSubscribers
          .filter(sub => sub.error)
          .forEach(sub => sub.error(action, this.state, error));
      } catch (e) {
        {
          console.warn(`[vuex] error in error action subscribers: `);
          console.error(e);
        }
      }
      reject(error);
    });
  })
}

```

## commit

触发`mutation`

```js
commit (_type, _payload, _options) {
  // check object-style commit
  const {
    type,
    payload,
    options
  } = unifyObjectStyle(_type, _payload, _options);

  const mutation = { type, payload };
  const entry = this._mutations[type];
  if (!entry) {
    {
      console.error(`[vuex] unknown mutation type: ${type}`);
    }
    return
  }
  this._withCommit(() => {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(sub => sub(mutation, this.state));

  if (
    options && options.silent
  ) {
    console.warn(
      `[vuex] mutation type: ${type}. Silent option has been removed. ` +
      'Use the filter functionality in the vue-devtools'
    );
  }
}
```

参考资料：

- [Vuex 框架原理与源码分析（vue2）-美团技术团队](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)
- [Vuex 源码解析](https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown)
- [Vuex 源码分析 #58](https://github.com/dwqs/blog/issues/58)
