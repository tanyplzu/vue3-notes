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
  name: 'CustomComponent',
  props: {
    msg: String,
  },
  render() {
    return {
      tag: 'div',
      props: {
        onClick: () => alert('hello'),
      },
      children: 'click me',
    };
  },
};


const vnode = {
  type: CustomComponent,
  props: {
    msg: 'test',
  },
};
```

从上面的代码可以看出组件和 vnode 的区别。

## 那么 vnode 有什么优势

- 抽象，引入 vnode，可以把渲染过程抽象化
- 跨平台

## 创建 vnode

```js
const vnode = createVNode(rootComponent, rootProps);
```

createVNode

```js
function createVNode(type, props = null, children = null) {
  if (props) {
    // 处理 props 相关逻辑，标准化 class 和 style
  }
  // 对 vnode 类型信息编码
  const shapeFlag = isString(type)
    ? 1 /* ELEMENT */
    : isSuspense(type)
    ? 128 /* SUSPENSE */
    : isTeleport(type)
    ? 64 /* TELEPORT */
    : isObject(type)
    ? 4 /* STATEFUL_COMPONENT */
    : isFunction(type)
    ? 2 /* FUNCTIONAL_COMPONENT */
    : 0;
  const vnode = {
    type,
    props,
    shapeFlag,
    // 一些其他属性
  };
  // 标准化子节点，把不同数据类型的 children 转成数组或者文本类型
  normalizeChildren(vnode, children);
  return vnode;
}
```

createVNode 做的事情很简单，就是：对 props 做标准化处理、对 vnode 的类型信息编码、创建 vnode 对象，标准化子节点 children。

## 渲染 vnode

```js
render(vnode, rootContainer);
const render = (vnode, container) => {
  if (vnode == null) {
    // 销毁组件
    if (container._vnode) {
      unmount(container._vnode, null, null, true);
    }
  } else {
    // 创建或者更新组件
    patch(container._vnode || null, vnode, container);
  }
  // 缓存 vnode 节点，表示已经渲染
  container._vnode = vnode;
};
```

渲染函数 render 的实现很简单，如果它的第一个参数 vnode 为空，则执行销毁组件的逻辑，否则执行创建或者更新组件的逻辑。

## patch 函数

patch 本意是打补丁的意思，这个函数有两个功能，一个是根据 vnode 挂载 DOM，一个是根据新旧 vnode 更新 DOM。

```js
const patch = (
  n1,
  n2,
  container,
  anchor = null,
  parentComponent = null,
  parentSuspense = null,
  isSVG = false,
  optimized = false
) => {
  // 如果存在新旧节点, 且新旧节点类型不同，则销毁旧节点
  if (n1 && !isSameVNodeType(n1, n2)) {
    anchor = getNextHostNode(n1);
    unmount(n1, parentComponent, parentSuspense, true);
    n1 = null;
  }
  const { type, shapeFlag } = n2;
  switch (type) {
    case Text:
      // 处理文本节点
      break;
    case Comment:
      // 处理注释节点
      break;
    case Static:
      // 处理静态节点
      break;
    case Fragment:
      // 处理 Fragment 元素
      break;
    default:
      if (shapeFlag & 1 /* ELEMENT */) {
        // 处理普通 DOM 元素
        processElement(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      } else if (shapeFlag & 6 /* COMPONENT */) {
        // 处理组件
        processComponent(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      } else if (shapeFlag & 64 /* TELEPORT */) {
        // 处理 TELEPORT
      } else if (shapeFlag & 128 /* SUSPENSE */) {
        // 处理 SUSPENSE
      }
  }
};
```

- 第一个参数 n1 表示旧的 vnode，当 n1 为 null 的时候，表示是一次挂载的过程；
- 第二个参数 n2 表示新的 vnode 节点，后续会根据这个 vnode 类型执行不同的处理逻辑；
- 第三个参数 container 表示 DOM 容器，也就是 vnode 渲染生成 DOM 后，会挂载到 container 下面。

## 把组件封装在一个函数中

将 Vue 组件封装在 promise 中：如 `message` 组件，`dialog` 组件。vue2 可以借助 `extend` Api，Vue3 可以用下面的方法。

```ts
import { Component, createVNode, render } from 'vue';

/**
 * 渲染组件实例
 * @param Constructor 组件
 * @param props 组件参数
 * @returns 组件实例
 */
export const renderInstance = (
  Constructor: Component,
  props: Record<string, any>
) => {
  const container = document.createElement('div');

  props.vanish = () => {
    // 销毁
    render(null, container);
  };

  // 创建vnode
  const vnode = createVNode(Constructor, props);
  // 渲染
  render(vnode, container);

  // 添加子元素(组件)至父元素
  document.body.appendChild(container.firstElementChild);
};

/**
 * 模态框调用方法
 * @param props
 * @returns {Promise}
 */
export const Modal = (props: Props) => {
  return new Promise<Result>((resolve, reject) => {
    renderInstance(Index, {
      ...props,
      resolve,
      reject,
    });
  });
};
```

参考 element-plus message 组件的实现方式。
