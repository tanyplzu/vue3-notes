export const navbarConfig: any = [
  { text: '首页', link: '/' },
  { text: 'Vue3基础', link: '/vue3Basic/' },
  { text: '源码解读', link: '/sourceCode/' },
  { text: 'ElementPlus', link: '/elementPlus/' },
  {
    text: '生态系统',
    children: [
      { text: 'Vuex', link: '/vuex/' },
      { text: 'Vue Router', link: '/vueRouter/' },
      { text: 'Vite', link: '/vite/' },
      { text: 'VuePress', link: '/vuePress/' },
    ],
  },
];

export const sidebarConfig: any = {
  '/vue3Basic/': [
    { text: 'Introduction', link: '/vue3Basic/' },
    '/vue3Basic/reactivityAPI',
    '/vue3Basic/vue3optimize',
    '/vue3Basic/Vue3Api',
    '/vue3Basic/JSX',
    '/vue3Basic/auth',
  ],
  '/sourceCode/': [
    { text: 'Introduction', link: '/sourceCode/' },
    '/sourceCode/componentRender',
    '/sourceCode/setup',
    '/sourceCode/reactivity',
    '/sourceCode/reactivity.cjs',
    '/sourceCode/computed',
    '/sourceCode/createAppAPI',
    {
      text: 'Deep Dive',
      children: [
        '/sourceCode/DeepDive/Render-function',
        '/sourceCode/DeepDive/creating-a-mini-vue',
        '/sourceCode/DeepDive/useFetch',
      ],
    },
    '/sourceCode/miniVue',
  ],
  '/elementPlus/': [
    { text: 'Introduction', link: '/elementPlus/' },
    {
      text: 'components',
      sidebarDepth: 1,
      children: [
        '/elementPlus/components/input/input',
        '/elementPlus/components/input/input-code',
        '/elementPlus/components/table/table',
        '/elementPlus/components/table/table-column',
      ],
    },
    {
      text: 'hooks',
      children: ['/elementPlus/hooks/use-attrs'],
    },
  ],
  '/vuex/': [
    { text: '应用笔记', link: '/vuex/' },
    { text: 'miniVuex', link: '/vuex/miniVuex' },
    { text: '源码解读', link: '/vuex/sourceCode_v4' },
    { text: 'Vuex v4.0.2', link: '/vuex/vuexCode' },
  ],
  '/vueRouter/': [
    { text: 'Introduction', link: '/vueRouter/' },
    { text: 'VueRouter 特性', link: '/vueRouter/application' },
    { text: '原生路由', link: '/vueRouter/browserRouter' },
    { text: '源码解读', link: '/vueRouter/sourceCode' },
    { text: 'vue-router v4.0.12', link: '/vueRouter/code' },
  ],
  '/vite/': [
    { text: 'Introduction', link: '/vite/' },
    { text: '应用', link: '/vite/application' },
    {
      text: '源码解读',
      children: [
        '/vite/sourceCode/createServer',
        '/vite/sourceCode/indexHtmlMiddleware',
      ],
    },
    { text: 'vue dev server', link: '/vite/vue-dev-server' },
  ],
  '/vuePress/': [
    { text: 'Introduction', link: '/vuePress/' },
    { text: '应用', link: '/vuePress/application' },
    { text: '源码解读', link: '/vuePress/sourceCode' },
  ],
};
