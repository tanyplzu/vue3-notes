---
sidebarDepth: 2
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

## store
