---
sidebarDepth: 1
---

# Vue3 API

## hooks

### vue2 mixins

```js
const mousePositionMixin = {
  data() {
    return {
      x: 0,
      y: 0,
    };
  },
  mounted() {
    window.addEventListener('mousemove', this.update);
  },
  destroyed() {
    window.removeEventListener('mousemove', this.update);
  },
  methods: {
    update(e) {
      this.x = e.pageX;
      this.y = e.pageY;
    },
  },
};
export default mousePositionMixin;
```

在组件中使用：

```vue
<template>
  <div>Mouse position: x {{ x }} / y {{ y }}</div>
</template>
<script>
import mousePositionMixin from './mouse';
export default {
  mixins: [mousePositionMixin],
};
</script>
```

### Vue3 hooks

```js
import { ref, onMounted, onUnmounted } from 'vue';
export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);
  const update = (e) => {
    x.value = e.pageX;
    y.value = e.pageY;
  };
  onMounted(() => {
    window.addEventListener('mousemove', update);
  });
  onUnmounted(() => {
    window.removeEventListener('mousemove', update);
  });
  return { x, y };
}
```

组件中使用

```js
<template>
  <div>
    Mouse position: x {{ x }} / y {{ y }}
  </div>
</template>
<script>
  import useMousePosition from './mouse'
  export default {
    setup() {
      const { x, y } = useMousePosition()
      return { x, y }
    }
  }
</script>
```

### react hooks

```js
const useWindowSize = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  useEffect(() => {
    const update = (e) => {
      setX(e.pageX);
      setY(e.pageY);
    };
    window.addEventListener('mousemove', update);
    return () => {
      window.removeEventListener('mousemove', update);
    };
  }, []);
  return [x, y];
};
```

vue3 hooks 和 react hooks 的用法几乎一样。react 有很多好用的 react hooks 库，vue3 其实也可以封装很多有用的 hooks 库。在 vuepress 2.0 的 `@vuepress/theme-default` 插件就有封装的 hooks,在 composables 文件下。