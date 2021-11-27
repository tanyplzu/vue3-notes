# vuex 插件

## 持久化存储插件

saveiInLocal.js

```js
export default (store) => {
  // 如果本地存储了state，就把这个stateJSON字符串转换成对象，替换到当前store实例的state
  if (localStorage.state) {
    store.replaceState(JSON.parse(localStorage.state));
  }
  store.subscribe((mutation, state) => {
    // 提交commit提交mutation之后执行这里，把state转换成JSON字符串储存到localStorage的state中
    localStorage.state = JSON.stringify(state);
  });
};
```

```js
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    user,
  },
  plugins: [saveiInLocal],
});
```
