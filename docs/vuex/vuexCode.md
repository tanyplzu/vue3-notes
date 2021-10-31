# vuex v4.0.2

`vuex.esm-browser.js`，以下代码没有经过编译。

```js
/*!
 * vuex v4.0.2
 * (c) 2021 Evan You
 * @license MIT
 */
import { inject, reactive, watch } from 'vue';
import { setupDevtoolsPlugin } from '@vue/devtools-api';

const storeKey = 'store';

function useStore(key = null) {
  return inject(key !== null ? key : storeKey);
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find(list, f) {
  return list.filter(f)[0];
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, (c) => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy,
  });

  Object.keys(obj).forEach((key) => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

/**
 * forEach for object
 */
function forEachValue(obj, fn) {
  Object.keys(obj).forEach((key) => fn(obj[key], key));
}

function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

function isPromise(val) {
  return val && typeof val.then === 'function';
}

function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`);
}

function partial(fn, arg) {
  return function () {
    return fn(arg);
  };
}

function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return () => {
    const i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}

function resetStore(store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  const state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset state
  resetStoreState(store, state, hot);
}

function resetStoreState(store, state, hot) {
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

function installModule(store, rootState, path, module, hot) {
  const isRoot = !path.length;
  const namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error(
        `[vuex] duplicate namespace ${namespace} for the namespaced module ${path.join(
          '/'
        )}`
      );
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    const parentState = getNestedState(rootState, path.slice(0, -1));
    const moduleName = path[path.length - 1];
    store._withCommit(() => {
      {
        if (moduleName in parentState) {
          console.warn(
            `[vuex] state field "${moduleName}" was overridden by a module with the same name at "${path.join(
              '.'
            )}"`
          );
        }
      }
      parentState[moduleName] = module.state;
    });
  }

  const local = (module.context = makeLocalContext(store, namespace, path));

  module.forEachMutation((mutation, key) => {
    const namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction((action, key) => {
    const type = action.root ? key : namespace + key;
    const handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter((getter, key) => {
    const namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild((child, key) => {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext(store, namespace, path) {
  const noNamespace = namespace === '';

  const local = {
    dispatch: noNamespace
      ? store.dispatch
      : (_type, _payload, _options) => {
          const args = unifyObjectStyle(_type, _payload, _options);
          const { payload, options } = args;
          let { type } = args;

          if (!options || !options.root) {
            type = namespace + type;
            if (!store._actions[type]) {
              console.error(
                `[vuex] unknown local action type: ${args.type}, global type: ${type}`
              );
              return;
            }
          }

          return store.dispatch(type, payload);
        },

    commit: noNamespace
      ? store.commit
      : (_type, _payload, _options) => {
          const args = unifyObjectStyle(_type, _payload, _options);
          const { payload, options } = args;
          let { type } = args;

          if (!options || !options.root) {
            type = namespace + type;
            if (!store._mutations[type]) {
              console.error(
                `[vuex] unknown local mutation type: ${args.type}, global type: ${type}`
              );
              return;
            }
          }

          store.commit(type, payload, options);
        },
  };

  // getters and state object must be gotten lazily
  // because they will be changed by state update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? () => store.getters
        : () => makeLocalGetters(store, namespace),
    },
    state: {
      get: () => getNestedState(store.state, path),
    },
  });

  return local;
}

function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    const gettersProxy = {};
    const splitPos = namespace.length;
    Object.keys(store.getters).forEach((type) => {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) return;

      // extract local getter type
      const localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: () => store.getters[type],
        enumerable: true,
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace];
}

function registerMutation(store, type, handler, local) {
  const entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction(store, type, handler, local) {
  const entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
    let res = handler.call(
      store,
      {
        dispatch: local.dispatch,
        commit: local.commit,
        getters: local.getters,
        state: local.state,
        rootGetters: store.getters,
        rootState: store.state,
      },
      payload
    );
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch((err) => {
        store._devtoolHook.emit('vuex:error', err);
        throw err;
      });
    } else {
      return res;
    }
  });
}

function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error(`[vuex] duplicate getter key: ${type}`);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    );
  };
}

function enableStrictMode(store) {
  watch(
    () => store._state.data,
    () => {
      {
        assert(
          store._committing,
          `do not mutate vuex store state outside mutation handlers.`
        );
      }
    },
    { deep: true, flush: 'sync' }
  );
}

function getNestedState(state, path) {
  return path.reduce((state, key) => state[key], state);
}

function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  {
    assert(
      typeof type === 'string',
      `expects string as the type, but found ${typeof type}.`
    );
  }

  return { type, payload, options };
}

const LABEL_VUEX_BINDINGS = 'vuex bindings';
const MUTATIONS_LAYER_ID = 'vuex:mutations';
const ACTIONS_LAYER_ID = 'vuex:actions';
const INSPECTOR_ID = 'vuex';

let actionId = 0;

function addDevtools(app, store) {
  setupDevtoolsPlugin(
    {
      id: 'org.vuejs.vuex',
      app,
      label: 'Vuex',
      homepage: 'https://next.vuex.vuejs.org/',
      logo: 'https://vuejs.org/images/icons/favicon-96x96.png',
      packageName: 'vuex',
      componentStateTypes: [LABEL_VUEX_BINDINGS],
    },
    (api) => {
      api.addTimelineLayer({
        id: MUTATIONS_LAYER_ID,
        label: 'Vuex Mutations',
        color: COLOR_LIME_500,
      });

      api.addTimelineLayer({
        id: ACTIONS_LAYER_ID,
        label: 'Vuex Actions',
        color: COLOR_LIME_500,
      });

      api.addInspector({
        id: INSPECTOR_ID,
        label: 'Vuex',
        icon: 'storage',
        treeFilterPlaceholder: 'Filter stores...',
      });

      api.on.getInspectorTree((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          if (payload.filter) {
            const nodes = [];
            flattenStoreForInspectorTree(
              nodes,
              store._modules.root,
              payload.filter,
              ''
            );
            payload.rootNodes = nodes;
          } else {
            payload.rootNodes = [
              formatStoreForInspectorTree(store._modules.root, ''),
            ];
          }
        }
      });

      api.on.getInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const modulePath = payload.nodeId;
          makeLocalGetters(store, modulePath);
          payload.state = formatStoreForInspectorState(
            getStoreModule(store._modules, modulePath),
            modulePath === 'root'
              ? store.getters
              : store._makeLocalGettersCache,
            modulePath
          );
        }
      });

      api.on.editInspectorState((payload) => {
        if (payload.app === app && payload.inspectorId === INSPECTOR_ID) {
          const modulePath = payload.nodeId;
          let path = payload.path;
          if (modulePath !== 'root') {
            path = [...modulePath.split('/').filter(Boolean), ...path];
          }
          store._withCommit(() => {
            payload.set(store._state.data, path, payload.state.value);
          });
        }
      });

      store.subscribe((mutation, state) => {
        const data = {};

        if (mutation.payload) {
          data.payload = mutation.payload;
        }

        data.state = state;

        api.notifyComponentUpdate();
        api.sendInspectorTree(INSPECTOR_ID);
        api.sendInspectorState(INSPECTOR_ID);

        api.addTimelineEvent({
          layerId: MUTATIONS_LAYER_ID,
          event: {
            time: Date.now(),
            title: mutation.type,
            data,
          },
        });
      });

      store.subscribeAction({
        before: (action, state) => {
          const data = {};
          if (action.payload) {
            data.payload = action.payload;
          }
          action._id = actionId++;
          action._time = Date.now();
          data.state = state;

          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: action._time,
              title: action.type,
              groupId: action._id,
              subtitle: 'start',
              data,
            },
          });
        },
        after: (action, state) => {
          const data = {};
          const duration = Date.now() - action._time;
          data.duration = {
            _custom: {
              type: 'duration',
              display: `${duration}ms`,
              tooltip: 'Action duration',
              value: duration,
            },
          };
          if (action.payload) {
            data.payload = action.payload;
          }
          data.state = state;

          api.addTimelineEvent({
            layerId: ACTIONS_LAYER_ID,
            event: {
              time: Date.now(),
              title: action.type,
              groupId: action._id,
              subtitle: 'end',
              data,
            },
          });
        },
      });
    }
  );
}

// extracted from tailwind palette
const COLOR_LIME_500 = 0x84cc16;
const COLOR_DARK = 0x666666;
const COLOR_WHITE = 0xffffff;

const TAG_NAMESPACED = {
  label: 'namespaced',
  textColor: COLOR_WHITE,
  backgroundColor: COLOR_DARK,
};

/**
 * @param {string} path
 */
function extractNameFromPath(path) {
  return path && path !== 'root' ? path.split('/').slice(-2, -1)[0] : 'Root';
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorNode}
 */
function formatStoreForInspectorTree(module, path) {
  return {
    id: path || 'root',
    // all modules end with a `/`, we want the last segment only
    // cart/ -> cart
    // nested/cart/ -> cart
    label: extractNameFromPath(path),
    tags: module.namespaced ? [TAG_NAMESPACED] : [],
    children: Object.keys(module._children).map((moduleName) =>
      formatStoreForInspectorTree(
        module._children[moduleName],
        path + moduleName + '/'
      )
    ),
  };
}

/**
 * @param {import('@vue/devtools-api').CustomInspectorNode[]} result
 * @param {*} module
 * @param {string} filter
 * @param {string} path
 */
function flattenStoreForInspectorTree(result, module, filter, path) {
  if (path.includes(filter)) {
    result.push({
      id: path || 'root',
      label: path.endsWith('/')
        ? path.slice(0, path.length - 1)
        : path || 'Root',
      tags: module.namespaced ? [TAG_NAMESPACED] : [],
    });
  }
  Object.keys(module._children).forEach((moduleName) => {
    flattenStoreForInspectorTree(
      result,
      module._children[moduleName],
      filter,
      path + moduleName + '/'
    );
  });
}

/**
 * @param {*} module
 * @return {import('@vue/devtools-api').CustomInspectorState}
 */
function formatStoreForInspectorState(module, getters, path) {
  getters = path === 'root' ? getters : getters[path];
  const gettersKeys = Object.keys(getters);
  const storeState = {
    state: Object.keys(module.state).map((key) => ({
      key,
      editable: true,
      value: module.state[key],
    })),
  };

  if (gettersKeys.length) {
    const tree = transformPathsToObjectTree(getters);
    storeState.getters = Object.keys(tree).map((key) => ({
      key: key.endsWith('/') ? extractNameFromPath(key) : key,
      editable: false,
      value: canThrow(() => tree[key]),
    }));
  }

  return storeState;
}

function transformPathsToObjectTree(getters) {
  const result = {};
  Object.keys(getters).forEach((key) => {
    const path = key.split('/');
    if (path.length > 1) {
      let target = result;
      const leafKey = path.pop();
      path.forEach((p) => {
        if (!target[p]) {
          target[p] = {
            _custom: {
              value: {},
              display: p,
              tooltip: 'Module',
              abstract: true,
            },
          };
        }
        target = target[p]._custom.value;
      });
      target[leafKey] = canThrow(() => getters[key]);
    } else {
      result[key] = canThrow(() => getters[key]);
    }
  });
  return result;
}

function getStoreModule(moduleMap, path) {
  const names = path.split('/').filter((n) => n);
  return names.reduce(
    (module, moduleName, i) => {
      const child = module[moduleName];
      if (!child) {
        throw new Error(`Missing module "${moduleName}" for path "${path}".`);
      }
      return i === names.length - 1 ? child : child._children;
    },
    path === 'root' ? moduleMap : moduleMap.root._children
  );
}

function canThrow(cb) {
  try {
    return cb();
  } catch (e) {
    return e;
  }
}

// Base data struct for store's module, package with some attribute and method
class Module {
  constructor(rawModule, runtime) {
    this.runtime = runtime;
    // Store some children item
    this._children = Object.create(null);
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule;
    const rawState = rawModule.state;

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
  }

  get namespaced() {
    return !!this._rawModule.namespaced;
  }

  addChild(key, module) {
    this._children[key] = module;
  }

  removeChild(key) {
    delete this._children[key];
  }

  getChild(key) {
    return this._children[key];
  }

  hasChild(key) {
    return key in this._children;
  }

  update(rawModule) {
    this._rawModule.namespaced = rawModule.namespaced;
    if (rawModule.actions) {
      this._rawModule.actions = rawModule.actions;
    }
    if (rawModule.mutations) {
      this._rawModule.mutations = rawModule.mutations;
    }
    if (rawModule.getters) {
      this._rawModule.getters = rawModule.getters;
    }
  }

  forEachChild(fn) {
    forEachValue(this._children, fn);
  }

  forEachGetter(fn) {
    if (this._rawModule.getters) {
      forEachValue(this._rawModule.getters, fn);
    }
  }

  forEachAction(fn) {
    if (this._rawModule.actions) {
      forEachValue(this._rawModule.actions, fn);
    }
  }

  forEachMutation(fn) {
    if (this._rawModule.mutations) {
      forEachValue(this._rawModule.mutations, fn);
    }
  }
}

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
    const parent = this.get(path.slice(0, -1));
    const key = path[path.length - 1];
    const child = parent.getChild(key);

    if (!child) {
      {
        console.warn(
          `[vuex] trying to unregister module '${key}', which is ` +
            `not registered`
        );
      }
      return;
    }

    if (!child.runtime) {
      return;
    }

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

function update(path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (const key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            `[vuex] trying to add a new module '${key}' on hot reloading, ` +
              'manual reload is needed'
          );
        }
        return;
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

const functionAssert = {
  assert: (value) => typeof value === 'function',
  expected: 'function',
};

const objectAssert = {
  assert: (value) =>
    typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'),
  expected: 'function or object with "handler" function',
};

const assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert,
};

function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach((key) => {
    if (!rawModule[key]) return;

    const assertOptions = assertTypes[key];

    forEachValue(rawModule[key], (value, type) => {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage(path, key, type, value, expected) {
  let buf = `${key} should be ${expected} but "${key}.${type}"`;
  if (path.length > 0) {
    buf += ` in module "${path.join('.')}"`;
  }
  buf += ` is ${JSON.stringify(value)}.`;
  return buf;
}

function createStore(options) {
  return new Store(options);
}

class Store {
  constructor(options = {}) {
    {
      assert(
        typeof Promise !== 'undefined',
        `vuex requires a Promise polyfill in this browser.`
      );
      assert(
        this instanceof Store,
        `store must be called with the new operator.`
      );
    }

    const { plugins = [], strict = false, devtools } = options;

    // store internal state
    this._committing = false;
    this._actions = Object.create(null);
    this._actionSubscribers = [];
    this._mutations = Object.create(null);
    this._wrappedGetters = Object.create(null);
    this._modules = new ModuleCollection(options);
    this._modulesNamespaceMap = Object.create(null);
    this._subscribers = [];
    this._makeLocalGettersCache = Object.create(null);
    this._devtools = devtools;

    // bind commit and dispatch to self
    const store = this;
    const { dispatch, commit } = this;
    this.dispatch = function boundDispatch(type, payload) {
      return dispatch.call(store, type, payload);
    };
    this.commit = function boundCommit(type, payload, options) {
      return commit.call(store, type, payload, options);
    };

    // strict mode
    this.strict = strict;

    const state = this._modules.root.state;

    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root);

    // initialize the store state, which is responsible for the reactivity
    // (also registers _wrappedGetters as computed properties)
    resetStoreState(this, state);

    // apply plugins
    plugins.forEach((plugin) => plugin(this));
  }

  install(app, injectKey) {
    app.provide(injectKey || storeKey, this);
    app.config.globalProperties.$store = this;

    const useDevtools = this._devtools !== undefined ? this._devtools : true;

    if (useDevtools) {
      addDevtools(app, this);
    }
  }

  get state() {
    return this._state.data;
  }

  set state(v) {
    {
      assert(
        false,
        `use store.replaceState() to explicit replace store state.`
      );
    }
  }

  commit(_type, _payload, _options) {
    // check object-style commit
    const { type, payload, options } = unifyObjectStyle(
      _type,
      _payload,
      _options
    );

    const mutation = { type, payload };
    const entry = this._mutations[type];
    if (!entry) {
      {
        console.error(`[vuex] unknown mutation type: ${type}`);
      }
      return;
    }
    this._withCommit(() => {
      entry.forEach(function commitIterator(handler) {
        handler(payload);
      });
    });

    this._subscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .forEach((sub) => sub(mutation, this.state));

    if (options && options.silent) {
      console.warn(
        `[vuex] mutation type: ${type}. Silent option has been removed. ` +
          'Use the filter functionality in the vue-devtools'
      );
    }
  }

  dispatch(_type, _payload) {
    // check object-style dispatch
    const { type, payload } = unifyObjectStyle(_type, _payload);

    const action = { type, payload };
    const entry = this._actions[type];
    if (!entry) {
      {
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
      {
        console.warn(`[vuex] error in before action subscribers: `);
        console.error(e);
      }
    }

    const result =
      entry.length > 1
        ? Promise.all(entry.map((handler) => handler(payload)))
        : entry[0](payload);

    return new Promise((resolve, reject) => {
      result.then(
        (res) => {
          try {
            this._actionSubscribers
              .filter((sub) => sub.after)
              .forEach((sub) => sub.after(action, this.state));
          } catch (e) {
            {
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
            {
              console.warn(`[vuex] error in error action subscribers: `);
              console.error(e);
            }
          }
          reject(error);
        }
      );
    });
  }

  subscribe(fn, options) {
    return genericSubscribe(fn, this._subscribers, options);
  }

  subscribeAction(fn, options) {
    const subs = typeof fn === 'function' ? { before: fn } : fn;
    return genericSubscribe(subs, this._actionSubscribers, options);
  }

  watch(getter, cb, options) {
    {
      assert(
        typeof getter === 'function',
        `store.watch only accepts a function.`
      );
    }
    return watch(
      () => getter(this.state, this.getters),
      cb,
      Object.assign({}, options)
    );
  }

  replaceState(state) {
    this._withCommit(() => {
      this._state.data = state;
    });
  }

  registerModule(path, rawModule, options = {}) {
    if (typeof path === 'string') path = [path];

    {
      assert(Array.isArray(path), `module path must be a string or an Array.`);
      assert(
        path.length > 0,
        'cannot register the root module by using registerModule.'
      );
    }

    this._modules.register(path, rawModule);
    installModule(
      this,
      this.state,
      path,
      this._modules.get(path),
      options.preserveState
    );
    // reset store to update getters...
    resetStoreState(this, this.state);
  }

  unregisterModule(path) {
    if (typeof path === 'string') path = [path];

    {
      assert(Array.isArray(path), `module path must be a string or an Array.`);
    }

    this._modules.unregister(path);
    this._withCommit(() => {
      const parentState = getNestedState(this.state, path.slice(0, -1));
      delete parentState[path[path.length - 1]];
    });
    resetStore(this);
  }

  hasModule(path) {
    if (typeof path === 'string') path = [path];

    {
      assert(Array.isArray(path), `module path must be a string or an Array.`);
    }

    return this._modules.isRegistered(path);
  }

  hotUpdate(newOptions) {
    this._modules.update(newOptions);
    resetStore(this, true);
  }

  _withCommit(fn) {
    const committing = this._committing;
    this._committing = true;
    fn();
    this._committing = committing;
  }
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
const mapState = normalizeNamespace((namespace, states) => {
  const res = {};
  if (!isValidMap(states)) {
    console.error(
      '[vuex] mapState: mapper parameter must be either an Array or an Object'
    );
  }
  normalizeMap(states).forEach(({ key, val }) => {
    res[key] = function mappedState() {
      let state = this.$store.state;
      let getters = this.$store.getters;
      if (namespace) {
        const module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return;
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
const mapMutations = normalizeNamespace((namespace, mutations) => {
  const res = {};
  if (!isValidMap(mutations)) {
    console.error(
      '[vuex] mapMutations: mapper parameter must be either an Array or an Object'
    );
  }
  normalizeMap(mutations).forEach(({ key, val }) => {
    res[key] = function mappedMutation(...args) {
      // Get the commit method from store
      let commit = this.$store.commit;
      if (namespace) {
        const module = getModuleByNamespace(
          this.$store,
          'mapMutations',
          namespace
        );
        if (!module) {
          return;
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
const mapGetters = normalizeNamespace((namespace, getters) => {
  const res = {};
  if (!isValidMap(getters)) {
    console.error(
      '[vuex] mapGetters: mapper parameter must be either an Array or an Object'
    );
  }
  normalizeMap(getters).forEach(({ key, val }) => {
    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter() {
      if (
        namespace &&
        !getModuleByNamespace(this.$store, 'mapGetters', namespace)
      ) {
        return;
      }
      if (!(val in this.$store.getters)) {
        console.error(`[vuex] unknown getter: ${val}`);
        return;
      }
      return this.$store.getters[val];
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res;
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
const mapActions = normalizeNamespace((namespace, actions) => {
  const res = {};
  if (!isValidMap(actions)) {
    console.error(
      '[vuex] mapActions: mapper parameter must be either an Array or an Object'
    );
  }
  normalizeMap(actions).forEach(({ key, val }) => {
    res[key] = function mappedAction(...args) {
      // get dispatch function from store
      let dispatch = this.$store.dispatch;
      if (namespace) {
        const module = getModuleByNamespace(
          this.$store,
          'mapActions',
          namespace
        );
        if (!module) {
          return;
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args));
    };
  });
  return res;
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
const createNamespacedHelpers = (namespace) => ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace),
});

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap(map) {
  if (!isValidMap(map)) {
    return [];
  }
  return Array.isArray(map)
    ? map.map((key) => ({ key, val: key }))
    : Object.keys(map).map((key) => ({ key, val: map[key] }));
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap(map) {
  return Array.isArray(map) || isObject(map);
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace(fn) {
  return (namespace, map) => {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map);
  };
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace(store, helper, namespace) {
  const module = store._modulesNamespaceMap[namespace];
  if (!module) {
    console.error(
      `[vuex] module namespace not found in ${helper}(): ${namespace}`
    );
  }
  return module;
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger({
  collapsed = true,
  filter = (mutation, stateBefore, stateAfter) => true,
  transformer = (state) => state,
  mutationTransformer = (mut) => mut,
  actionFilter = (action, state) => true,
  actionTransformer = (act) => act,
  logMutations = true,
  logActions = true,
  logger = console,
} = {}) {
  return (store) => {
    let prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return;
    }

    if (logMutations) {
      store.subscribe((mutation, state) => {
        const nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          const formattedTime = getFormattedTime();
          const formattedMutation = mutationTransformer(mutation);
          const message = `mutation ${mutation.type}${formattedTime}`;

          startMessage(logger, message, collapsed);
          logger.log(
            '%c prev state',
            'color: #9E9E9E; font-weight: bold',
            transformer(prevState)
          );
          logger.log(
            '%c mutation',
            'color: #03A9F4; font-weight: bold',
            formattedMutation
          );
          logger.log(
            '%c next state',
            'color: #4CAF50; font-weight: bold',
            transformer(nextState)
          );
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction((action, state) => {
        if (actionFilter(action, state)) {
          const formattedTime = getFormattedTime();
          const formattedAction = actionTransformer(action);
          const message = `action ${action.type}${formattedTime}`;

          startMessage(logger, message, collapsed);
          logger.log(
            '%c action',
            'color: #03A9F4; font-weight: bold',
            formattedAction
          );
          endMessage(logger);
        }
      });
    }
  };
}

function startMessage(logger, message, collapsed) {
  const startMessage = collapsed ? logger.groupCollapsed : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage(logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime() {
  const time = new Date();
  return ` @ ${pad(time.getHours(), 2)}:${pad(time.getMinutes(), 2)}:${pad(
    time.getSeconds(),
    2
  )}.${pad(time.getMilliseconds(), 3)}`;
}

function repeat(str, times) {
  return new Array(times + 1).join(str);
}

function pad(num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num;
}

var index = {
  version: '4.0.2',
  Store,
  storeKey,
  createStore,
  useStore,
  mapState,
  mapMutations,
  mapGetters,
  mapActions,
  createNamespacedHelpers,
  createLogger,
};

export default index;
export {
  Store,
  createLogger,
  createNamespacedHelpers,
  createStore,
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
  storeKey,
  useStore,
};
```
