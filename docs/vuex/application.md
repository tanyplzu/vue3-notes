# vuex 笔记

> Flux 架构就像眼镜：您自会知道什么时候需要它。 —— Redux 的作者 Dan Abramov

## 使用

![vuex](./imgs/vuex.png)

## form 表单问题

### 官方解决

```html
<input :value="message" @input="updateMessage" />
```

```js
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

下面是 mutation 函数：

```js
// ...
mutations: {
  updateMessage (state, message) {
    state.obj.message = message
  }
}
```

#### 双向绑定的计算属性

使用带有 setter 的双向绑定计算属性

```html
<input v-model="message" />
```

```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

### 如果有很多 computed

```html
<input v-model="message" />
```

```js
function mapModel(names) {
  return names.reduce((computed, name)=>{
    return {
      ...computed,
      [name]: {
        get () {
          return this.$store.values[name]
        },
        set (value) {
          this.$store.commit('setValues', { name, value })
        }
      }
    }
  }, {})
}

// ...
computed: {
  ...mapModel(['message', 'age', 'username'])
}
```

依然比较繁琐。其实在 github vuex 的 Issues 中有好几个类似的问题，但解决方案依然是这个。最简单的办法就是将 vuex 设置成非严格模式，直接修改 store 的值，如果这样使用，可以不用 vuex。

