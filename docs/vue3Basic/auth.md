# 权限

鉴权组件

```html
<!-- 单权限验证 -->
<Auth :value="'department.create'">
  <p>你有该权限</p>
  <template #no-auth>
    <p>你没有该权限</p>
  </template>
</Auth>

<!-- 多权限验证，用户只要具备其中任何一个权限，则验证通过 -->
<Auth :value="['department.create', 'department.edit']">
  <p>你有该权限</p>
  <template #no-auth>
    <p>你没有该权限</p>
  </template>
</Auth>

<!-- 多权限验证，用户必须具备全部权限，才验证通过 -->
<AuthAll :value="['department.create', 'department.edit']">
  <p>你有该权限</p>
  <template #no-auth>
    <p>你没有该权限</p>
  </template>
</AuthAll>
```

鉴权指令

```html
<!-- 单权限验证 -->
<button v-auth="'department.create'">新增部门</button>

<!-- 多权限验证，用户只要具备其中任何一个权限，则验证通过 -->
<button v-auth="['department.create', 'department.edit']">新增部门</button>

<!-- 多权限验证，用户必须具备全部权限，才验证通过 -->
<button v-auth-all="['department.create', 'department.edit']">新增部门</button>
```

鉴权函数

```js
// 单权限验证，返回 true 或 false
this.$auth('department.create');

// 多权限验证，用户只要具备其中任何一个权限，则验证通过，返回 true 或 false
this.$auth(['department.create', 'department.edit']);

// 多权限验证，用户必须具备全部权限，才验证通过，返回 true 或 false
this.$authAll(['department.create', 'department.edit']);
```


https://hooray.gitee.io/fantastic-admin/guide/permission.html#%E8%B7%AF%E7%94%B1%E6%9D%83%E9%99%90