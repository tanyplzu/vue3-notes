# computed

[[toc]]

```js
function computed(getterOrOptions) {
  // getter 函数
  let getter;
  // setter 函数
  let setter;
  // 标准化参数
  if (isFunction(getterOrOptions)) {
    // 表面传入的是 getter 函数，不能修改计算属性的值
    getter = getterOrOptions;
    setter =
      process.env.NODE_ENV !== 'production'
        ? () => {
            console.warn('Write operation failed: computed value is readonly');
          }
        : NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  // 数据是否脏的
  let dirty = true;
  // 计算结果
  let value;
  let computed;
  // 创建副作用函数
  const runner = effect(getter, {
    // 延时执行
    lazy: true,
    // 标记这是一个 computed effect 用于在 trigger 阶段的优先级排序
    computed: true,
    // 调度执行的实现
    scheduler: () => {
      if (!dirty) {
        dirty = true;
        // 派发通知，通知运行访问该计算属性的 activeEffect
        trigger(computed, 'set' /* SET */, 'value');
      }
    },
  });
  // 创建 computed 对象
  computed = {
    __v_isRef: true,
    // 暴露 effect 对象以便计算属性可以停止计算
    effect: runner,
    get value() {
      // 计算属性的 getter
      if (dirty) {
        // 只有数据为脏的时候才会重新计算
        value = runner();
        dirty = false;
      }
      // 依赖收集，收集运行访问该计算属性的 activeEffect
      track(computed, 'get' /* GET */, 'value');
      return value;
    },
    set value(newValue) {
      // 计算属性的 setter
      setter(newValue);
    },
  };
  return computed;
}
```
