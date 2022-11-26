---
sidebarDepth: 1
---

# 响应式系统 API

## reactive

```js
import { reactive } from 'vue';
export default {
  name: 'App',
  setup() {
    const state = reactive({
      title: 'json',
    });

    return {
      state,
    };
  },
};
```

## ref

```js
export default {
  name: 'App',
  setup() {
    const count = ref(0);

    return {
      count,
    };
  },
};
```

## computed

### 用法

```js
export default {
  name: 'App',
  setup() {
    const state = reactive({
      name: '十三',
      desc: '你好',
    });

    const text = computed(() => {
      return state.name + state.desc;
    });

    return {
      text,
    };
  },
};
```

```js
const count = ref(1);
const plusOne = computed(() => count.value + 1);
console.log(plusOne.value); // 2
plusOne.value++; // error
count.value++;
console.log(plusOne.value); // 3
```

> 直接修改 plusOne.value 会报一个错误，这是因为如果我们传递给 computed 的是一个函数，那么这就是一个 getter 函数，我们只能获取它的值，而不能直接修改它。

有时候我们也希望能够直接修改 computed 的返回值，那么我们可以给 computed 传入一个对象：

computed 第二个参数作为 setter 来创建

```js
const count = value(0);
const writableComputed = computed(
  // read
  () => count.value + 1,
  // write
  (val) => {
    count.value = val - 1;
  }
);

writableComputed.value = 1;
console.log(count.value); // 0
```

## watch

watch() 接收的第一个参数被称作 “数据源”，它可以是：

- 一个返回任意值的函数
- 一个包装对象
- 一个包含上述两种数据源的数组

第二个参数是回调函数。回调函数只有当数据源发生变动时才会被触发：

```js
watch(
  // getter
  () => count.value + 1,
  // callback
  (value, oldValue) => {
    console.log('count + 1 is: ', value);
  }
);
// -> count + 1 is: 1
count.value++;
// -> count + 1 is: 2
```

```js
export default {
  setup() {
    let timer = null;
    let state = reactive({
      search: Date.now(),
    });
    watch(
      () => {
        return state.search;
      },
      (nextData, preData) => {
        console.log('preData', preData);
        console.log('nextData', nextData);
      }
    );

    const handleSearch = () => {
      state.search = Date.now();
    };
    return {
      state,
      handleSearch,
    };
  },
};
```

### 观察 props

```js
const MyComponent = {
  props: {
    id: Number,
  },
  setup(props) {
    const data = ref(null);
    watch(
      () => props.id,
      async (id) => {
        data.value = await fetchData(id);
      }
    );
    return {
      data,
    };
  },
};
```

### 观察包装对象

```js
// double 是一个计算包装对象
const double = computed(() => count.value * 2);

watch(double, (value) => {
  console.log('double the count is: ', value);
}); // -> double the count is: 0

count.value++; // -> double the count is: 2
```

### 观察多个数据源

```js
watch([refA, () => refB.value], ([a, b], [prevA, prevB]) => {
  console.log(`a is: ${a}`);
  console.log(`b is: ${b}`);
});
```

### 停止观察

```js
const stop = watch(...)
// stop watching
stop()
```

```js
export default {
  setup() {
    // 组件销毁时也会被自动停止
    watch(/* ... */);
  },
};
```

### 清理副作用

```js
watch(idValue, (id, oldId, onCleanup) => {
  const token = performAsyncOperation(id);
  onCleanup(() => {
    // id 发生了变化，或是 watcher 即将被停止.
    // 取消还未完成的异步操作。
    token.cancel();
  });
});
```

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 watch 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

## watchEffect

```js
export default {
  setup() {
    let state = reactive({
      search: Date.now(),
    });
    watchEffect(() => {
      console.log(`监听查询字段${state.search}`);
    });

    const handleSearch = () => {
      state.search = Date.now();
    };
    return {
      state,
      handleSearch,
    };
  },
};
```

### watch 和 watchEffect 的区别

- 两者都可以监听 data 属性
- watch 需要明确只知道监听那个属性
- watchEffect 会根据其属性自动监听其变化

## effect

```js
import { effect, reactive } from '@vue/reactivity';
// 使用 reactive() 函数定义响应式数据
const obj = reactive({ text: 'hello' });
// 使用 effect() 函数定义副作用函数
effect(() => {
  document.body.innerText = obj.text;
});

// 一秒后修改响应式数据，这会触发副作用函数重新执行
setTimeout(() => {
  obj.text += ' world';
}, 1000);
```

- reactive() 函数接收一个对象作为参数，并返回一个代理对象。
- effect() 函数用于定义副作用，它的参数就是副作用函数，这个函数可能会产生副作用，例如上面代码中的 `document.body.innerText = obj.text`。在副作用函数内的响应式数据会与副作用函数之间建立联系，即所谓的依赖收集，当响应式数据变化之后，会导致副作用函数重新执行。

### 调度执行 effect-scheduler

```js
const obj = reactive({ count: 1 });
effect(() => {
  console.log(obj.count);
});

obj.count++;
obj.count++;
obj.count++;
```

console.log 语句共打印四次（包括首次执行）

假如我们只需要把数据的最终的状态应用到副作用中，而不是每次变化都重新执行一次副作用函数，这将对性能有所提升。实际上我们可以为 effect 传递第二个参数作为选项，可以指定“调度器”。所谓调度器就是用来指定如何运行副作用函数的：

```js
const obj = reactive({ count: 1 });
effect(
  () => {
    console.log(obj.count);
  },
  {
    // 指定调度器为 queueJob
    scheduler: queueJob,
  }
);

// 调度器实现
const queue: Function[] = [];
let isFlushing = false;
function queueJob(job: () => void) {
  if (!queue.includes(job)) queue.push(job);
  if (!isFlushing) {
    isFlushing = true;
    Promise.resolve().then(() => {
      let fn;
      while ((fn = queue.shift())) {
        fn();
      }
    });
  }
}

obj.count++;
obj.count++;
obj.count++;
```

最终只会执行一次副作用函数。这实际上就是 watchEffect() 函数的实现思路。

```js
const obj = reactive({ foo: 1 });
watchEffect(() => {
  console.log(obj.foo);
});

obj.foo++;
obj.foo++;
obj.foo++;
```

这与我们上面刚刚实现的自定义调度器的 effect 的效果实际上是一样的。

### watchEffect() 与 effect() 的区别

- effect() 函数来自于 @vue/reactivity ，而 watchEffect() 函数来自于 @vue/runtime-core。
- 它们的区别在于：effect() 是非常底层的实现，watchEffect() 是基于 effect() 的封装。
- watchEffect() 会维护与组件实例以及组件状态(是否被卸载等)的关系，如果一个组件被卸载，那么 watchEffect() 也将被 stop，但 effect() 则不会。

参考：

- [深入理解 Vue3 Reactivity API](https://zhuanlan.zhihu.com/p/146097763)
