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
  ],
  '/sourceCode/': [
    { text: 'Introduction', link: '/sourceCode/' },
    '/sourceCode/componentRender',
    '/sourceCode/setup',
    '/sourceCode/reactivity',
    '/sourceCode/reactivity.cjs',
    {
      text: 'Deep Dive',
      children: [
        '/sourceCode/DeepDive/Render-function',
        '/sourceCode/DeepDive/creating-a-mini-vue',
        '/sourceCode/DeepDive/useFetch',
      ],
    },
  ],
  '/elementPlus/': [{ text: 'Introduction', link: '/elementPlus/' }],
  '/vuex/': [
    { text: 'Introduction', link: '/vuex/' },
    { text: '应用', link: '/vuex/application' },
    { text: '源码解读', link: '/vuex/sourceCode' },
  ],
  '/vueRouter/': [
    { text: 'Introduction', link: '/vueRouter/' },
    { text: '应用', link: '/vueRouter/application' },
    { text: '源码解读', link: '/vueRouter/sourceCode' },
  ],
  '/vite/': [
    { text: 'Introduction', link: '/vite/' },
    { text: '应用', link: '/vite/application' },
    { text: '源码解读', link: '/vite/sourceCode' },
  ],
  '/vuePress/': [
    { text: 'Introduction', link: '/vuePress/' },
    { text: '应用', link: '/vuePress/application' },
    { text: '源码解读', link: '/vuePress/sourceCode' },
  ],
};
