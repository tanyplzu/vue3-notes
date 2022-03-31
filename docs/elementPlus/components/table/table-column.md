# table-column

## showOverflowTooltip

当内容过长被隐藏时显示 tooltip

```ts
export default defineComponent({
  name: 'ElTableColumn',
  components: {
    ElCheckbox,
  },
  props: defaultProps,
  setup(props, { slots }) {

  }
  render() {
    let children = []
    try {
      const renderDefault = this.$slots.default?.({
        row: {},
        column: {},
        $index: -1,
      })
      if (renderDefault instanceof Array) {
        for (const childNode of renderDefault) {
          if (
            childNode.type?.name === 'ElTableColumn' ||
            childNode.shapeFlag & 2
          ) {
            children.push(childNode)
          } else if (
            childNode.type === Fragment &&
            childNode.children instanceof Array
          ) {
            children.push(...childNode.children)
          }
        }
      }
    } catch {
      children = []
    }
    return h('div', children)
  },
})
```

## render-helper

```ts
const getPropsData = (...propsKey: unknown[]) => {
  return propsKey.reduce((prev, cur) => {
    if (Array.isArray(cur)) {
      cur.forEach((key) => {
        prev[key] = props[key];
      });
    }
    return prev;
  }, {});
};
```
