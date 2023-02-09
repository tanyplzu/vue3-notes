# card

card.vue

```vue
<template>
  <div :class="[ns.b(), ns.is(`${shadow}-shadow`)]">
    <div v-if="$slots.header || header" :class="ns.e('header')">
      <slot name="header">{{ header }}</slot>
    </div>
    <div :class="ns.e('body')" :style="bodyStyle">
      <slot />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useNamespace } from '@element-plus/hooks'
import { cardProps } from './card'

defineOptions({
  name: 'ElCard',
})

defineProps(cardProps)

const ns = useNamespace('card')
</script>
```

card.ts

```ts
import { buildProps, definePropType } from '@element-plus/utils'
import type { ExtractPropTypes, StyleValue } from 'vue'

export const cardProps = buildProps({
  /**
   * @description title of the card. Also accepts a DOM passed by `slot#header`
   */
  header: {
    type: String,
    default: '',
  },
  /**
   * @description CSS style of card body
   */
  bodyStyle: {
    type: definePropType<StyleValue>([String, Object, Array]),
    default: '',
  },
  /**
   * @description when to show card shadows
   */
  shadow: {
    type: String,
    values: ['always', 'hover', 'never'],
    default: 'always',
  },
} as const)
export type CardProps = ExtractPropTypes<typeof cardProps>
```

instance.ts

```ts
import type Card from './card.vue'

export type CardInstance = InstanceType<typeof Card>
```

index.ts

```ts
import { withInstall } from '@element-plus/utils'

import Card from './src/card.vue'

export const ElCard = withInstall(Card)
export default ElCard

export * from './src/card'
export type { CardInstance } from './src/instance'

```
