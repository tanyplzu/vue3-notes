# miniVueRouter

Vue3 中是如何使用路由的

```js
// router.js
import { createRouter, createWebHashHistory } from "vue-router";

import Login from "../pages/login.vue";
import Home from "../pages/home.vue";

// 定义各个组件的路由地址
const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/home",
    component: Home,
  },
];

// 创建路由实例
export default createRouter({
  history: createWebHashHistory(),
  routes,
});
```

```js
// App.vue
import { createApp } from "vue";

import App from "./App.vue";
import router from "./router/router";

const app = createApp(App);
app.use(router).mount("#app");
```

createRouter

```js
function createRouter() {
  // 定义一个路由对象
  const router = {};
  // 返回路由对象
  return router;
}

function createWebHashHistory() {}

export { createRouter, createWebHashHistory };
```

从 createRouter 的使用中，我们可以看到传入了两个参数：

```js
function createRouter(params) {
  // 获取传入的两个参数
  const history = params.history;
  const routes = params.routes;

  const router = {
    history,
    routes,
  };
  return router;
}
```

因为要根据当前 hash 来动态选择组件渲染，所以 router 实例还需要保存当前的路径 hash。

```js
import { ref } from "vue";

function createRouter(params) {
  const history = params.history;
  const routes = params.routes;

  const router = {
    history,
    routes,
    // 增加当前路径hash的响应式变量
    hash: ref(window.location.hash.slice(1)),
  };
  return router;
}
```

区分路由模式

```js
function createWebHashHistory() {
    // 区分路由模式
+   return 'WebHashHistory';
}

function createRouter(params) {
    const history = params.history;
    const routes = params.routes;

    const router = {
        history,
        routes,
        // 增加当前路径hash的响应式变量
        hash: ref(window.location.hash.slice(1)),
    }
    // 增加监听事件
+   if (history === 'WebHashHistory') {
+        window.addEventListener('hashchange', () => {
+            // hash修改后更新变量
+            router.hash.value = window.location.hash.slice(1);
+        });
+    }

     return router;
}
```
