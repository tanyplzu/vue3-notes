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
