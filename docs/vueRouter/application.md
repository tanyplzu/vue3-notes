# Vue Router 笔记

[[toc]]

```js
// 1. 定义路由组件.
// 也可以从其他文件导入
const Home = { template: '<div>Home</div>' };
const About = { template: '<div>About</div>' };

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置
const router = VueRouter.createRouter({
  
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

// 5. 创建并挂载根实例
const app = Vue.createApp({});
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router);

app.mount('#app');
```

```js
// Home.vue
export default {
  computed: {
    username() {
      // 我们很快就会看到 `params` 是什么
      return this.$route.params.username;
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard');
      } else {
        this.$router.push('/login');
      }
    },
  },
};
```

要在 setup 函数中访问路由，需要调用 useRouter 或 useRoute 函数。
