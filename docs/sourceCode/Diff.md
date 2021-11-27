# Diff 算法优化

Vue3 中的主要优化点为

- 在 updateChildren 时双端比较 -> 最长递增子序列
- 全量 Diff -> 静态标记 + 非全量 Diff
- 静态提升

updateChildren

- Vue2
  - 头 - 头比较
  - 尾 - 尾比较
  - 头 - 尾比较 
  -尾 - 头比较
- Vue3
  - 头 - 头比较
  - 尾 - 尾比较
  - 基于最长递增子序列进行移动 / 删除 / 新增
