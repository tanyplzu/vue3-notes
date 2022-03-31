# JSX

以一个 elform

## 在 render 中返回

```js
import { defineComponent, inject, ref } from 'vue';
import { ElForm } from 'element-plus';

export default defineComponent({
  props: {},
  components: { ElForm },
  setup(props, { slots, attrs, expose }) {
    const formProps = inject('formProps', {});
    const formRef = ref();

    const validate = (callback) => {
      return formRef.value.validate(callback);
    };

    const resetFields = () => {
      return formRef.value.resetFields();
    };

    return {
      validate,
      resetFields,
      formRef,
      attrs,
      formProps,
      slots,
    };
  },
  render() {
    const { formRef, attrs, formProps, slots } = this;
    return (
      <el-form ref='formRef' {...attrs} {...formProps}>
        {slots.default()}
      </el-form>
    );
  },
});
```

## 在 setup 中返回

```js
import { defineComponent, inject, ref } from 'vue';
import { ElForm } from 'element-plus';

export default defineComponent({
  props: {},
  components: { ElForm },
  setup(props, { slots, attrs, expose }) {
    const formProps = inject('formProps', {});
    const formRef = ref();

    return () => (
      <el-form ref={formRef} {...attrs} {...formProps}>
        {slots.default()}
      </el-form>
    );
  },
});
```

## 用法

- render 中可以通过 this 访问当前 Vue 实例;
- setup 中访问不到 this;
- 文件名可以写成`.js`或`.jsx`;
- 如果写成`.vue`, 需要`<script>` 标签增加 `lang="jsx"` 设置;

## 阅读参考

- [vuejs/babel-plugin-jsx](https://github.com/vuejs/babel-plugin-jsx#syntax)
- [在 vue3 中编写 jsx 的两种方式](https://www.jiangweishan.com/article/vuejs20210715a3.html)
- [为什么我推荐使用JSX开发Vue3](https://juejin.cn/post/6911175470255964174)
