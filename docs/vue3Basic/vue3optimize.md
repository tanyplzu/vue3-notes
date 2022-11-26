---
sidebarDepth: 2
---

# Vue3 的优化

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

## 编译优化

### PathFlag

- 编译模板时，动态节点做标记
- 分为不同的标记类型，如 text props
- diff 算法时，可以区分静态节点和不同类型的动态节点

[vue-next-template-explorer](https://vue-next-template-explorer.netlify.app/)

```html
<div>
  <span>Hello World!</span>
  <span>{{name}}</span>
  <span>{{age}}</span>
  <span :class="name">{{name}}</span>
  <span :name="name">{{name}}</span>
</div>
```

编译后

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _createElementVNode('span', null, 'Hello World!'),
      _createElementVNode('span', null, _toDisplayString(_ctx.name), 1 /* TEXT */),
      _createElementVNode('span', null, _toDisplayString(_ctx.age), 1 /* TEXT */),
      _createElementVNode(
        'span',
        {
          class: _normalizeClass(_ctx.name),
        },
        _toDisplayString(_ctx.name),
        3 /* TEXT, CLASS */
      ),
      _createElementVNode(
        'span',
        { name: _ctx.name },
        _toDisplayString(_ctx.name),
        9 /* TEXT, PROPS */,
        ['name']
      ),
    ])
  );
}
```

### HoistStatic

- 将静态节点的定义，提升到父作用域，缓存起来；
- 多个相邻的静态节点，会被合并起来；
- 典型的拿空间换时间的优化策略；

```html
<div>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>{{name}}</span>
  <span>{{age}}</span>
  <span :class="name">{{name}}</span>
  <span :name="name">{{name}}</span>
</div>
```

编译后

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createElementVNode(
  'span',
  null,
  'Hello World!',
  -1 /* HOISTED */
);
const _hoisted_2 = /*#__PURE__*/ _createElementVNode(
  'span',
  null,
  'Hello World!',
  -1 /* HOISTED */
);
const _hoisted_3 = /*#__PURE__*/ _createElementVNode(
  'span',
  null,
  'Hello World!',
  -1 /* HOISTED */
);
const _hoisted_4 = /*#__PURE__*/ _createElementVNode(
  'span',
  null,
  'Hello World!',
  -1 /* HOISTED */
);
const _hoisted_5 = ['name'];

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _hoisted_1,
      _hoisted_2,
      _hoisted_3,
      _hoisted_4,
      _createElementVNode('span', null, _toDisplayString(_ctx.name), 1 /* TEXT */),
      _createElementVNode('span', null, _toDisplayString(_ctx.age), 1 /* TEXT */),
      _createElementVNode(
        'span',
        {
          class: _normalizeClass(_ctx.name),
        },
        _toDisplayString(_ctx.name),
        3 /* TEXT, CLASS */
      ),
      _createElementVNode(
        'span',
        { name: _ctx.name },
        _toDisplayString(_ctx.name),
        9 /* TEXT, PROPS */,
        _hoisted_5
      ),
    ])
  );
}
```

合并节点

```html
<div>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>{{name}}</span>
  <span>{{age}}</span>
  <span :class="name">{{name}}</span>
  <span :name="name">{{name}}</span>
</div>
```

编译后

```js
import {
  createElementVNode as _createElementVNode,
  toDisplayString as _toDisplayString,
  normalizeClass as _normalizeClass,
  createStaticVNode as _createStaticVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = /*#__PURE__*/ _createStaticVNode(
  '<span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span>',
  10
);
const _hoisted_11 = ['name'];

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _hoisted_1,
      _createElementVNode('span', null, _toDisplayString(_ctx.name), 1 /* TEXT */),
      _createElementVNode('span', null, _toDisplayString(_ctx.age), 1 /* TEXT */),
      _createElementVNode(
        'span',
        {
          class: _normalizeClass(_ctx.name),
        },
        _toDisplayString(_ctx.name),
        3 /* TEXT, CLASS */
      ),
      _createElementVNode(
        'span',
        { name: _ctx.name },
        _toDisplayString(_ctx.name),
        9 /* TEXT, PROPS */,
        _hoisted_11
      ),
    ])
  );
}
```

### CacheHandler

- 缓存事件

```html
<div>
  <span @click="handleClick">{{age}}</span>
</div>
```

编译后

```js
import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

const _hoisted_1 = ['onClick'];

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _createElementVNode(
        'span',
        { onClick: _ctx.handleClick },
        _toDisplayString(_ctx.age),
        9 /* TEXT, PROPS */,
        _hoisted_1
      ),
    ])
  );
}
```

缓存

```js
import {
  toDisplayString as _toDisplayString,
  createElementVNode as _createElementVNode,
  openBlock as _openBlock,
  createElementBlock as _createElementBlock,
} from 'vue';

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (
    _openBlock(),
    _createElementBlock('div', null, [
      _createElementVNode(
        'span',
        {
          onClick:
            _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args)),
        },
        _toDisplayString(_ctx.age),
        1 /* TEXT */
      ),
    ])
  );
}
```

### SSR

```html
<div>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>Hello World!</span>
  <span>{{name}}</span>
</div>
```

编译后

```js
import { mergeProps as _mergeProps } from 'vue';
import {
  ssrRenderAttrs as _ssrRenderAttrs,
  ssrInterpolate as _ssrInterpolate,
} from 'vue/server-renderer';

export function ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _cssVars = { style: { color: _ctx.color } };
  _push(
    `<div${_ssrRenderAttrs(
      _mergeProps(_attrs, _cssVars)
    )}><span>Hello World!</span><span>Hello World!</span><span>Hello World!</span><span>${_ssrInterpolate(
      _ctx.name
    )}</span></div>`
  );
}
```

### tree-shaking
