---
sidebarDepth: 2
---

# 组件渲染

[[toc]]

vnode 和组件的关系

vnode 本质上是用来描述 DOM 的 JavaScript 对象，它在 Vue.js 中可以描述不同类型的节点，比如普通元素节点、组件节点等。

## 普通元素节点

用 vnode 表示一个 `<button>` 标签：

```js
const vnode = {
  type: 'button',
  props: {
    class: 'btn',
    style: {
      width: '100px',
      height: '50px',
    },
  },
  children: 'click me',
};
```

## 组件节点

```vue
<custom-component msg="test"></custom-component>
```

```js
const CustomComponent = {
  // 在这里定义组件对象
};
const vnode = {
  type: CustomComponent,
  props: {
    msg: 'test',
  },
};
```
