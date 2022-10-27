# vuex 笔记

> Flux 架构就像眼镜：您自会知道什么时候需要它。 —— Redux 的作者 Dan Abramov

[[toc]]

## vuex 关系图

![vuex](./imgs/vuex.png)

## 示例

`/app.js`

```js
import { createApp } from 'vue';
import App from './components/App.vue';
import store from './store';
import { currency } from './currency';

const app = createApp(App);

app.use(store);

app.mount('#app');
```

`/store/index.js`

```js
import { createStore, createLogger } from 'vuex';
import products from './modules/products';

const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    products,
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
```

`/store/modules/products.js`

```js
import shop from '../../api/shop';

// initial state
const state = () => ({
  all: [],
});

// getters
const getters = {};

// actions
const actions = {
  async getAllProducts({ commit }) {
    const products = await shop.getProducts();
    commit('setProducts', products);
  },
};

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products;
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find((product) => product.id === id);
    product.inventory--;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
```

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

### 计算属性 set、get 方式

```vue
<template>
  <div>
    <input v-model="stateValue" />
  </div>
</template>

<script>
export default {
  computed: {
    stateValue: {
      get() {
        return this.$store.state.stateValue;
      },
      set(value) {
        this.$store.commit('SET_STATE_VALUE', value);
      },
    },
  },
};
</script>
```

如果有很多个 computed，可以写成这样

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

依然比较繁琐。其实在 github vuex 的 Issues 中有好几个类似的问题，但解决方案依然是这个。最简单的办法就是将 vuex 设置成非严格模式，直接修改 store 的值，如果这样使用，可能不符合 vuex 的一些设计原则。
