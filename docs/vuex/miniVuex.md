# 自定义 Vuex

```js
const createStore = (params) => {
  return {};
};

const useStore = () => {};

export { createStore, useStore };
```

```js
createStore({
  state() {
    return {
      count: 0,
    };
  },
  mutations: {
    add(state) {
      state.count++;
    },
  },
});
```

createStore

```js
const createStore = (params) => {
  return {
    // 传入的state是个方法，我们真正需要的是返回的结果
    state: params.state(),
    mutations: params.mutations,
  };
};
```

state 声明成响应式

```js
const createStore = (params) => {
  return {
    // state声明成响应式
    state: reactive(params.state()),
    mutations: params.mutations,
  };
};
```

增加 install 方法，将 store 实例注册到全局

```js
import { reactive, provide, inject } from "vue";
...
const createStore = (params) => {
    return {
        state: reactive(params.state()),
        mutations: params.mutations,
        install(app) {
            app.provide('STORE', this);
        }
    }
}
```

useStore

```js
// 返回store实例
const useStore = () => {
  return inject("STORE");
};
```

commit 方法

```js
const createStore = (params) => {
  return {
    state: reactive(params.state()),
    mutations: params.mutations,
    // commit用来执行mutations下的方法
    commit(fun, payload) {
      // mutations下的方法接受state作为参数
      this.mutations[fun](this.state, payload);
    },
    install(app) {
      app.provide("STORE", this);
    },
  };
};
```

简单版本的 Vuex

```js
import { reactive, inject } from "vue";

const createStore = (params) => {
  return {
    state: reactive(params.state()),
    mutations: params.mutations,
    // commit用来执行mutations下的方法
    commit(fun, payload) {
      // mutations下的方法接受state作为参数
      this.mutations[fun](this.state, payload);
    },
    install(app) {
      app.provide("STORE", this);
    },
  };
};

const useStore = () => {
  return inject("STORE");
};

export { createStore, useStore };
```
