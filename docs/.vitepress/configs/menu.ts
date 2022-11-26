export const navbarConfig: any = [
  { text: '首页', link: '/' },
  { text: 'Vue3基础', link: '/vue3Basic/', activeMatch: '/vue3Basic/' },
  { text: '核心原理', link: '/sourceCode/' },
  { text: 'ElementPlus', link: '/elementPlus/' },
  {
    text: '生态系统',
    items: [
      { text: 'Vuex', link: '/vuex/' },
      { text: 'Vue Router', link: '/vueRouter/' },
      { text: 'Vite', link: '/vite/' },
      { text: 'VuePress', link: '/vuePress/' },
    ],
  },
];

export const sidebarConfig: any = {
  '/vue3Basic/': [
    {
      text: 'vue3 基础',
      items: [
        { text: 'Introduction', link: '/vue3Basic/' },
        { text: '响应式系统 API', link: '/vue3Basic/reactivityAPI' },
        { text: 'Vue3 的优化', link: '/vue3Basic/vue3optimize' },
        { text: 'Vue3 API', link: '/vue3Basic/Vue3Api' },
        { text: 'JSX', link: '/vue3Basic/JSX' },
        { text: '权限', link: '/vue3Basic/auth' },
      ],
    },
  ],
  '/sourceCode/': [
    // { text: 'Introduction', link: '/sourceCode/' },
    {
      text: '响应式系统',
      items: [
        { text: '手写reactivity', link: '/sourceCode/reactivity/reactivity' },
        {
          text: 'reactivity 源码',
          link: '/sourceCode/reactivity/reactivity.cjs',
        },
        { text: 'computed', link: '/sourceCode/reactivity/computed' },
        { text: 'watch', link: '/sourceCode/reactivity/watch' },
      ],
    },
    {
      text: '渲染器',
      items: [
        {
          text: '渲染器与响应式系统的结合',
          link: '/sourceCode/renderer/index',
        },
        { text: 'createAppAPI', link: '/sourceCode/renderer/createAppAPI' },
        { text: '组件渲染', link: '/sourceCode/renderer/componentRender' },
      ],
    },
    {
      text: '组件化',
      items: [{ text: 'Setup', link: '/sourceCode/component/setup' }],
    },
    {
      text: 'Deep Dive',
      items: [
        {
          text: 'Render function',
          link: '/sourceCode/DeepDive/Render-function',
        },
        {
          text: 'Introduction',
          link: '/sourceCode/DeepDive/creating-a-mini-vue',
        },
        { text: 'creating a mini vue', link: '/sourceCode/DeepDive/useFetch' },
        { text: 'mini vue', link: '/sourceCode/DeepDive/miniVue' },
      ],
    },
  ],
  '/elementPlus/': [
    {
      text: 'components',
      items: [
        { text: 'input', link: '/elementPlus/components/input/input' },
        {
          text: 'input code',
          link: '/elementPlus/components/input/input-code',
        },
        { text: 'table', link: '/elementPlus/components/table/table' },
        {
          text: 'table-column',
          link: '/elementPlus/components/table/table-column',
        },
      ],
    },
    {
      text: 'use-attrs',
      items: [{ text: 'mini vue', link: '/elementPlus/hooks/use-attrs' }],
    },
  ],
  '/vuex/': [
    {
      text: 'vuex',
      items: [
        { text: '应用笔记', link: '/vuex/' },
        { text: '一些问题', link: '/vuex/q&a' },
        { text: 'miniVuex', link: '/vuex/miniVuex' },
        { text: '源码解读', link: '/vuex/sourceCode_v4' },
        { text: 'Vuex v4.0.2', link: '/vuex/vuexCode' },
      ],
    },
  ],
  '/vueRouter/': [
    {
      text: 'vueRouter',
      items: [
        { text: 'Introduction', link: '/vueRouter/' },
        { text: 'VueRouter 特性', link: '/vueRouter/application' },
        { text: '原生路由', link: '/vueRouter/browserRouter' },
        { text: '源码解读', link: '/vueRouter/sourceCode' },
        { text: 'vue-router v4.0.12', link: '/vueRouter/code' },
      ],
    },
  ],
  '/vite/': [
    // { text: '应用', link: '/vite/application' },
    {
      text: '源码解读',
      item: [
        { text: '应用', link: '/vite/sourceCode/createServer' },
        { text: '应用', link: '/vite/sourceCode/indexHtmlMiddleware' },
      ],
    },
    // { text: 'vue dev server', link: '/vite/vue-dev-server' },
  ],
  '/vuePress/': [
    {
      text: 'vueRouter',
      items: [
        { text: 'Introduction', link: '/vuePress/' },
        { text: '应用', link: '/vuePress/application' },
        { text: '源码解读', link: '/vuePress/sourceCode' },
      ],
    },
  ],
};
