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

## vuex中为什么把把异步操作封装在action，把同步操作放在mutations？

[vuex中为什么把把异步操作封装在action，把同步操作放在mutations？](https://www.zhihu.com/question/48759748?utm_source=wechat_session&utm_medium=social&utm_oi=689440301193916416&utm_content=group3_supplementQuestions&utm_campaign=shareopn)

> 区分 actions 和 mutations 并不是为了解决竞态问题，而是为了能用 devtools 追踪状态变化。事实上在 vuex 里面 actions 只是一个架构性的概念，并不是必须的，说到底只是一个函数，你在里面想干嘛都可以，只要最后触发 mutation 就行。异步竞态怎么处理那是用户自己的事情。vuex 真正限制你的只有 mutation 必须是同步的这一点（在 redux 里面就好像 reducer 必须同步返回下一个状态一样）。同步的意义在于这样每一个 mutation 执行完成后都可以对应到一个新的状态（和 reducer 一样），这样 devtools 就可以打个 snapshot 存下来，然后就可以随便 time-travel 了。如果你开着 devtool 调用一个异步的 action，你可以清楚地看到它所调用的 mutation 是何时被记录下来的，并且可以立刻查看它们对应的状态。其实我有个点子一直没时间做，那就是把记录下来的 mutations 做成类似 rx-marble 那样的时间线图，对于理解应用的异步状态变化很有帮助。
>
>作者：尤雨溪
>链接：https://www.zhihu.com/question/48759748/answer/112823337