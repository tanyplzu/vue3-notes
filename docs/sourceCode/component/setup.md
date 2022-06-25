---
sidebarDepth: 1
---

# Setup

## 创建和设置组件实例

```js
const mountComponent = (
  initialVNode,
  container,
  anchor,
  parentComponent,
  parentSuspense,
  isSVG,
  optimized
) => {
  // 创建组件实例
  const instance = (initialVNode.component = createComponentInstance(
    initialVNode,
    parentComponent,
    parentSuspense
  ));
  // 设置组件实例
  setupComponent(instance);
  // 设置并运行带副作用的渲染函数
  setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized);
};
```

## 组件实例的设置流程

```js
function setupComponent(instance, isSSR = false) {
  const { props, children, shapeFlag } = instance.vnode;
  // 判断是否是一个有状态的组件
  const isStateful = shapeFlag & 4;
  // 初始化 props
  initProps(instance, props, isStateful, isSSR);
  // 初始化 插槽
  initSlots(instance, children);
  // 设置有状态的组件实例
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : undefined;
  return setupResult;
}
```

我们从组件 vnode 中获取了 props、children、shapeFlag 等属性，然后分别对 props 和插槽进行初始化。

## setupStatefulComponent

它主要做了三件事：创建渲染上下文代理、判断处理 setup 函数和完成组件实例设置。

```js
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  // 创建渲染代理的属性访问缓存
  instance.accessCache = {};
  // 创建渲染上下文代理
  instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
  // 判断处理 setup 函数
  const { setup } = Component;
  if (setup) {
    // 如果 setup 函数带参数，则创建一个 setupContext
    const setupContext = (instance.setupContext =
      setup.length > 1 ? createSetupContext(instance) : null);
    // 执行 setup 函数，获取结果
    const setupResult = callWithErrorHandling(setup, instance, 0 /* SETUP_FUNCTION */, [
      instance.props,
      setupContext,
    ]);
    // 处理 setup 执行结果
    handleSetupResult(instance, setupResult);
  } else {
    // 完成组件实例设置
    finishComponentSetup(instance);
  }
}
```

## 创建渲染上下文代理

到了 Vue.js 3.0，为了方便维护，我们把组件中不同状态的数据存储到不同的属性中，比如存储到 setupState、ctx、data、props 中。我们在执行组件渲染函数的时候，为了方便用户使用，会直接访问渲染上下文 instance.ctx 中的属性，所以我们也要做一层 proxy，对渲染上下文 instance.ctx 属性的访问和修改，代理到对 setupState、ctx、data、props 中的数据的访问和修改。

- setupState 就是 setup 函数返回的数据，稍后我们会详细说；
- ctx 包括了计算属性、组件方法和用户自定义的一些数据；

## setup 返回值

setup 不仅仅支持返回一个对象，也可以返回一个函数作为组件的渲染函数。

```js
import { h } from 'vue';
export default {
  props: {
    msg: String,
  },
  setup(props, { emit }) {
    function onClick() {
      emit('toggle');
    }
    return (ctx) => {
      return [h('p', null, ctx.msg), h('button', { onClick: onClick }, 'Toggle')];
    };
  },
};
```

## vue3 为什么要使用 setup

- [Vue Function-based API RFC](https://zhuanlan.zhihu.com/p/68477600)

## 设计动机

### 逻辑组合与复用

**组件 API 设计所面对的核心问题之一就是如何组织逻辑，以及如何在多个组件之间抽取和复用逻辑**
