---
sidebarDepth: 2
---

# Vue3 的优化

[[toc]]

## 性能优化

### 1. 源码体积优化

- 移除一些冷门的 feature（比如 filter、inline-template 等）；
- 引入 tree-shaking 的技术，减少打包体积。

### 2. 数据劫持优化

`Object.defineProperty` 的方式:

```js
export default {
  data: {
    a: {
      b: {
        c: {
          d: 1,
        },
      },
    },
  },
};
```

`Proxy`的方式：

```js
observed = new Proxy(data, {
  get() {
    // track
  },
  set() {
    // trigger
  },
});
```

### 3. 编译优化

除此之外，Vue.js 3.0 在编译阶段还包含了对 Slot 的编译优化、事件侦听函数的缓存优化，并且在运行时重写了 diff 算法，这些性能优化的内容我在后续特定的章节与你分享。

## 语法 API 优化

### 1. 优化逻辑组织

Options API 的设计是按照 methods、computed、data、props 这些不同的选项分类，当组件小的时候，这种分类方式一目了然；但是在大型组件中，一个组件可能有多个逻辑关注点，当使用 Options API 的时候，每一个关注点都有自己的 Options，如果需要修改一个逻辑点关注点，就需要在单个文件中不断上下切换和寻找。

Vue.js 3.0 提供了一种新的 API：Composition API，它有一个很好的机制去解决这样的问题，就是将某个逻辑关注点相关的代码全都放在一个函数里，这样当需要修改一个功能时，就不再需要在文件中跳来跳去。

### 2. 优化逻辑复用

vue hooks 几乎和 react hooks 的用法很类似。
