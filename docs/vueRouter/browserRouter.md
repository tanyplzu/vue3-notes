# 原生路由基础

## hash

```js
function refreshData() {}
window.addEventListener('hashchange', refreshData);
```

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

## location

### Location.assign()

加载给定 URL 的内容资源到这个 Location 对象所关联的对象上。

### Location.replace()

用给定的 URL 替换掉当前的资源。与 assign() 方法不同的是用 replace()替换的新页面不会被保存在会话的历史 History 中，这意味着用户将不能用后退按钮转到该页面。

### Location 属性

```js
var url = document.createElement('a');
url.href =
  'https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container';
console.log(url.href); // https://developer.mozilla.org/en-US/search?q=URL#search-results-close-container
console.log(url.protocol); // https:
console.log(url.host); // developer.mozilla.org
console.log(url.hostname); // developer.mozilla.org
console.log(url.port); // (blank - https assumes port 443)
console.log(url.pathname); // /en-US/search
console.log(url.search); // ?q=URL
console.log(url.hash); // #search-results-close-container
console.log(url.origin); // https://developer.mozilla.org
```

## 其它

- 对 hash 值的读写可以通过 window.location.hash 完成。
- 对 hash 可以使用 window.location.replace()方法替换路由。
