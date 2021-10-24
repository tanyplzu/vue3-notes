# 原生路由基础

## hash

```js
function refreshData() {}
window.addEventListener('hashchange', refreshData);
```

- 对 hash 值的读写可以通过 window.location.hash 完成。
- 可以使用 window.location.replace()方法替换路由。

## history 模式

- hostory 模式中有两个重要的方法，`pushState` 和 `replaceState`；
- 还有一个重要的事件，popstate 事件。

### pushState

```js
var stateObj = { foo: 'bar' };
history.pushState(stateObj, null, 'bar.html');
```

- state: 是一个 JavaScript 对象，以后你要用到的信息，都可以放到这个对象中。
- title: 新页面的标题，所有浏览器目前都忽略这个值，因此这里可以填 null。
- url: 是可选的，负责改变浏览器的地址栏中显示的 url，如果没有指定 url，你点击前进后退按钮页面还是会变化，只是浏览器的地址栏上显示的 url 会一直保持不变。

### replaceState

replaceState 和 pushState 的区别就在于它不是写入而是替换修改浏览历史中当前纪录，其余和 pushState 一模一样。

### popstate

```js
function refreshData(e) {
  console.log(e.state);
}
window.addEventListener('popstate', refreshData);
```
