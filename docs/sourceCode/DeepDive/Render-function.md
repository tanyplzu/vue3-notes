# Render function

Render function in Vue 2:

```js
render(h) {
  return h('div', {
    attrs: {
      id: 'foo'
    },
    on: {
      click: this.onClick
    }
  }, 'hello');
}
```

Render function in Vue 3:

- Flat props structure
- Globally imported `h` helper

```js
import { h } from 'vue';

render() {
  return h('div', {
    id: 'foo',
    onClick: this.onClick,
  }, 'hello');
}
```
