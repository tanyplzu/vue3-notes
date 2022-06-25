# 渲染器与响应式系统的结合

实现原理，将 renderer 在副作用中执行，才会被依赖收集。

```js
const { effect, ref } = VueReactivity;

function renderer(domString, container) {
  container.innerHTML = domString;
}

const count = ref(1);

effect(() => {
  renderer(`<h1>${count.value}</h1>`, document.getElementById('app'));
});

count.value++;
```

vue 中使用时，effect 主要由 createApp 提供。

```js
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

app.mount('#app');
```

createApp 由 createRenderer 提供

```js
export function createRenderer(options) {
  const render = (vnode, container) => {
    patch(null, vnode, container);
  };

  return {
    createApp: createAppAPI(render),
  };
}
```

createAppAPI

```js
export function createAppAPI(render) {
  return function createApp(rootComponent) {
    const app = {
      _component: rootComponent,
      mount(rootContainer) {
        const vnode = createVNode(rootComponent);
        render(vnode, rootContainer);
      },
    };

    return app;
  };
}
```

patch

```js
function patch(
  n1,
  n2,
  container = null,
  anchor = null,
  parentComponent = null
) {
  // 处理 component
  processComponent(n1, n2, container, parentComponent);
}
```

```js
function processComponent(n1, n2, container, parentComponent) {
  if (!n1) {
    mountComponent(n2, container, parentComponent);
  } else {
    updateComponent(n1, n2, container);
  }
}
```

```js
function mountComponent(initialVNode, container, parentComponent) {
  // 1. 先创建一个 component instance
  const instance = (initialVNode.component = createComponentInstance(
    initialVNode,
    parentComponent
  ));

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}
```

```js
function setupRenderEffect(instance, initialVNode, container) {
  // 调用 render
  // 应该传入 ctx 也就是 proxy
  // ctx 可以选择暴露给用户的 api
  // 源代码里面是调用的 renderComponentRoot 函数
  // 这里为了简化直接调用 render

  // 从哪里做一些事
  // 收集数据改变之后要做的事 (函数)
  // 依赖收集   effect 函数
  // 触发依赖
  function componentUpdateFn() {
    if (!instance.isMounted) {
      // 组件初始化的时候会执行这里
      // 为什么要在这里调用 render 函数呢
      // 是因为在 effect 内调用 render 才能触发依赖收集
      // 等到后面响应式的值变更后会再次触发这个函数
      console.log(`${instance.type.name}:调用 render,获取 subTree`);
      const proxyToUse = instance.proxy;
      // 可在 render 函数中通过 this 来使用 proxy
      const subTree = (instance.subTree = normalizeVNode(
        instance.render.call(proxyToUse, proxyToUse)
      ));

      // 这里基于 subTree 再次调用 patch
      // 基于 render 返回的 vnode ，再次进行渲染
      // 这里我把这个行为隐喻成开箱
      // 一个组件就是一个箱子
      // 里面有可能是 element （也就是可以直接渲染的）
      // 也有可能还是 component
      // 这里就是递归的开箱
      // 而 subTree 就是当前的这个箱子（组件）装的东西
      // 箱子（组件）只是个概念，它实际是不需要渲染的
      // 要渲染的是箱子里面的 subTree
      patch(null, subTree, container, null, instance);
      // 把 root element 赋值给 组件的vnode.el ，为后续调用 $el 的时候获取值
      initialVNode.el = subTree.el;

      instance.isMounted = true;
    } else {
      // 响应式的值变更后会从这里执行逻辑
      // 主要就是拿到新的 vnode ，然后和之前的 vnode 进行对比
      console.log(`${instance.type.name}:调用更新逻辑`);
      // 拿到最新的 subTree
      const { next, vnode } = instance;

      // 如果有 next 的话， 说明需要更新组件的数据（props，slots 等）
      // 先更新组件的数据，然后更新完成后，在继续对比当前组件的子元素
      if (next) {
        // 问题是 next 和 vnode 的区别是什么
        next.el = vnode.el;
        updateComponentPreRender(instance, next);
      }

      const proxyToUse = instance.proxy;
      const nextTree = normalizeVNode(
        instance.render.call(proxyToUse, proxyToUse)
      );
      // 替换之前的 subTree
      const prevTree = instance.subTree;
      instance.subTree = nextTree;

      // 用旧的 vnode 和新的 vnode 交给 patch 来处理
      patch(prevTree, nextTree, prevTree.el, null, instance);
    }
  }

  // 在 vue3.2 版本里面是使用的 new ReactiveEffect
  // 至于为什么不直接用 effect ，是因为需要一个 scope  参数来收集所有的 effect
  // 而 effect 这个函数是对外的 api ，是不可以轻易改变参数的，所以会使用  new ReactiveEffect
  // 因为 ReactiveEffect 是内部对象，加一个参数是无所谓的

  instance.update = effect(componentUpdateFn, {
    scheduler: () => {
      // 把 effect 推到微任务的时候在执行
      // queueJob(effect);
      queueJob(instance.update);
    },
  });
}
```
