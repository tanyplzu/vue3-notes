import type { ThemeObject } from '@vuepress/core'
import { path } from '@vuepress/utils'

const fooTheme: ThemeObject = {
  name: 'vuepress-theme-foo',
  extends: '@vuepress/theme-default',
  layouts: {
    Layout: path.resolve(__dirname, 'layouts/Layout.vue'),
  },
}

export default fooTheme;
