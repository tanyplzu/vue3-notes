---
sidebarDepth: 1
---

# 响应式系统 API

[[toc]]

- [深入理解 Vue3 Reactivity API](https://zhuanlan.zhihu.com/p/146097763)

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

## store
