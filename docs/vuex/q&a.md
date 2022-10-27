# vuex 有关的问题

### action 和 mutations

[vuex 中为什么把把异步操作封装在 action，把同步操作放在 mutations？](https://www.zhihu.com/question/48759748?utm_source=wechat_session&utm_medium=social&utm_oi=689440301193916416&utm_content=group3_supplementQuestions&utm_campaign=shareopn)

> 区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。
>
> 作者：尤雨溪
> 链接：https://www.zhihu.com/question/48759748/answer/112823337

### state 内部支持模块配置和模块嵌套，如何实现的？

在 store 构造方法中有 makeLocalContext 方法，所有 module 都会有一个 local context，根据配置时的 path 进行匹配。所以执行如 `dispatch('submitOrder', payload)` 这类 action 时，默认的拿到都是 module 的 local state，如果要访问最外层或者是其他 module 的 state，只能从 rootState 按照 path 路径逐步进行访问。

> https://tech.meituan.com/2017/04/27/vuex-code-analysis.html

### defineProperty 何时执行

```js
function Archiver() {
  var temperature = null;
  var archive = [];

  Object.defineProperty(this, 'temperature', {
    get: function () {
      console.log('get1');
      return temperature;
    },
    set: function (value) {
      temperature = value;
      console.log('set1');
      archive.push({ val: temperature });
    },
  });

  this.getArchive = function () {
    return archive;
  };
}

var arc = new Archiver();
arc.temperature;
console.log('get2');
arc.temperature = 11;
console.log('set2');
arc.temperature = 13;
console.log('set3');

// get1
// get2
// set1
// set2
// set1
// set3
```

vuex 使用 `this._committing` 来判断是否是由 `_withCommit` 触发的

### 为什么 vuex store 中的值需要放到 computed 中

```vue
<template>
  <div id="app">
    Clicked: {{ count }} times, count is {{ evenOrOdd }}.
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">Increment if odd</button>
    <button @click="incrementAsync">Increment async</button>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();

    return {
      count: computed(() => store.state.count),
      evenOrOdd: computed(() => store.getters.evenOrOdd),
      increment: () => store.dispatch('increment'),
      decrement: () => store.dispatch('decrement'),
      incrementIfOdd: () => store.dispatch('incrementIfOdd'),
      incrementAsync: () => store.dispatch('incrementAsync'),
    };
  },
};
</script>
```

如果将 `computed(() => store.state.count)` 直接写成 `store.state.count`，点击页面时页面不会有变化。



