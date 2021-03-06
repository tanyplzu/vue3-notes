# mini vue

尤雨溪

```html
<div id="app"></div>

<script>
  // v-dom
  function h(tag, props, children) {
    return {
      tag,
      props,
      children,
    };
  }
  function mount(vnode, container) {
    const el = (vnode.el = document.createElement(vnode.tag));

    // props 解析props 为el设置attribute
    if (vnode.props) {
      for (const key in vnode.props) {
        const value = vnode.props[key];

        if (key.startsWith('on')) {
          el.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
          el.setAttribute(key, value);
        }
      }
    }
    // children
    if (vnode.children) {
      if (typeof vnode.children === 'string') {
        el.textContent = vnode.children;
      } else {
        vnode.children.forEach((child) => {
          mount(child, el);
        });
      }
    }

    // 元素挂载在container上
    container.appendChild(el);
  }
  function patch(n1, n2) {
    const el = (n2.el = n1.el);
    if (n1.tag === n2.tag) {
      //props
      const oldProps = n1.props || {};
      const newProps = n2.props || {};

      for (const key in newProps) {
        const oldValue = oldProps[key];
        const newValue = newProps[key];

        if (newValue !== oldValue) {
          el.setAttribute(key, newValue);
        }
      }

      // 删除props 删除旧vnode上面的attrbute
      for (const key in oldProps) {
        if (!(key in newProps)) {
          el.removeAttribute(key);
        }
      }

      // children
      const oldChildren = n1.children;
      const newChildren = n2.children;
      if (typeof newChildren === 'string') {
        // newChild 为字符串
        if (typeof oldChildren === 'string') {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren;
          }
        } else {
          el.textContent = newChildren;
        }
      } else {
        // newChild 为数组
        if (typeof oldChildren === 'string') {
          // newChildren为数组 oldChild为字符串
          el.innerHTML = '';
          newChildren.forEach((child) => {
            mount(child, el);
          });
        } else {
          // newChildren oldChildren都为数组

          // 公共部分长度
          const commonLength = Math.min(oldChildren.length, newChildren.length);

          for (let i = 0; i < commonLength; i++) {
            patch(oldChildren[i], newChildren[i]);
          }

          if (newChildren.length > oldChildren.length) {
            newChildren.slice(commonLength).forEach((child) => {
              mount(child, el);
            });
          } else if (newChildren.length < oldChildren.length) {
            oldChildren.slice(commonLength).forEach((child) => {
              el.removeChild(child.el);
            });
          }
        }
      }
    } else {
    }
  }

  //reactivity
  let activeEffect;

  // 依赖收集器
  class Dep {
    subscribers = new Set();

    depend() {
      if (activeEffect) {
        this.subscribers.add(activeEffect);
      }
    }

    notify() {
      this.subscribers.forEach((effect) => {
        effect();
      });
    }
  }

  function watchEffect(effect) {
    activeEffect = effect;
    effect();
    activeEffect = null;
  }

  const targetMap = new WeakMap();

  // 该函数的功能是返回target[key]的依赖收集器
  function getTarget(target, key) {
    // depsMap为Map类型 里面存储要响应的对象的Map
    /**
     * {
     *  [target]: Map()
     *}
     */
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      depsMap = new Map();
      targetMap.set(target, depsMap);
    }

    // 为每一个key设置Dep监听类
    let dep = depsMap.get(key);

    if (!dep) {
      dep = new Dep();
      depsMap.set(key, dep);
    }
    return dep;
  }

  const reactiveHandler = {
    get(target, key, receiver) {
      const dep = getTarget(target, key);
      // 收集依赖
      dep.depend();
      return Reflect.get(target, key, receiver);
    },
    set(target, key, value, receiver) {
      const dep = getTarget(target, key);
      const result = Reflect.set(target, key, value, receiver);
      dep.notify();
      return result;
    },
  };

  function reactive(raw) {
    return new Proxy(raw, reactiveHandler);
  }

  const App = {
    data: reactive({
      count: 0,
    }),
    render() {
      return h(
        'div',
        {
          onClick: () => {
            this.data.count++;
          },
        },
        String(this.data.count)
      );
    },
  };

  function mountApp(component, container) {
    let isMounted = false;
    let prevVdom;

    watchEffect(() => {
      if (!isMounted) {
        prevVdom = component.render();
        mount(prevVdom, container);
        isMounted = true;
      } else {
        const newVdom = component.render();
        patch(prevVdom, newVdom);
        prevVdom = newVdom;
      }
    });
  }
  mountApp(App, document.getElementById('app'));
</script>
```
