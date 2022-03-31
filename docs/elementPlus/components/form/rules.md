# validation

嵌套的熟悉使用`:`

```js
// form-item.vue
const fieldValue = computed(() => {
  const model = elForm.model;
  if (!model || !props.prop) {
    return;
  }

  let path = props.prop;
  if (path.indexOf(':') !== -1) {
    path = path.replace(/:/, '.');
  }

  return getPropByPath(model, path, true).v;
});
```
