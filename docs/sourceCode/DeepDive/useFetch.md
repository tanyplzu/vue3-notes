# useFetch

```js
const { createApp, ref, watchEffect } = Vue;

function useFetch(getUrl) {
  const data = ref(null);
  const error = ref(null);
  const isPending = ref(true);

  // Re-fetch when `props.id` has changed.
  // `getUrl()` is called inside the`watchEffect()`, when it gets called,
  // it access the `props.id`, and that registers the dependency for this
  // `fetch` effect.

  // This `watchEffect()` is automatically associated with the `Post` component.
  // When the `Post` component is destroyed, this `watchEffect()` will stop by itself.
  watchEffect(() => {
    isPending.value = true;
    data.value = null;
    error.value = null;

    fetch(getUrl())
      .then((res) => res.json())
      .then((_data) => {
        data.value = _data;
        isPending.value = false;
      })
      .catch((err) => {
        error.value = err;
        isPending.value = false;
      });
  });

  return {
    data,
    error,
    isPending,
  };
}

const Post = {
  template: `
      <div v-if="isPending">loading...</div>
      <div v-else-if="data">{{ data }}</div>
      <div v-else-if="error">Something went wrong: {{ error.message }}</div>
    `,
  props: ['id'],
  setup(props) {
    const { data, error, isPending } = useFetch(
      () => `https://jsonplaceholder.typicode.com/todos/${props.id}`
    );

    return { data, error, isPending };
  },
};

const App = {
  components: { Post },
  data() {
    return {
      id: 1,
    };
  },
  template: `
      <button @click="id++">change ID</button>
      <Post :id="id" />
    `,
};

createApp(App).mount('#app');
```
