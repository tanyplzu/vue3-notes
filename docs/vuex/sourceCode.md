# vuex4 源码解读

[[toc]]

## createStore

```js
// 精简版代码
export function createStore(options) {
  return new Store(options);
}
class Store {
  constructor(options = {}) {
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = Object.create(null);

    const store = this;
    const { dispatch, commit } = this;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options);
    };

    const state = this._modules.root.state;
    installModule(this, state, [], this._modules.root);
    resetStoreState(this, state);
  }
}
function resetStoreState(store, state, hot) {
  store._state = reactive({
    data: state,
  });
}
```

- 通过 reactive 创建响应式数据的；

## installModule

```js
function installModule(store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error(
        '[vuex] duplicate namespace ' +
          namespace +
          ' for the namespaced module ' +
          path.join('/')
      );
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' +
              moduleName +
              '" was overridden by a module with the same name at "' +
              path.join('.') +
              '"'
          );
        }
      }
      parentState[moduleName] = module.state;
    });
  }

  var local = (module.context = makeLocalContext(store, namespace, path));

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
```

## 参考阅读

- [[源码解读]一文读懂 Vuex4 源码](https://zhuanlan.zhihu.com/p/407011168)
- [Vuex 源码解析](https://github.com/answershuto/learnVue/blob/master/docs/Vuex%E6%BA%90%E7%A0%81%E8%A7%A3%E6%9E%90.MarkDown)
- [Vuex 框架原理与源码分析（vue2）-美团技术团队](https://tech.meituan.com/2017/04/27/vuex-code-analysis.html)
- [Vuex 源码分析 #58](https://github.com/dwqs/blog/issues/58)
