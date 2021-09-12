export const navbarConfig: any = [
  { text: '首页', link: '/' },
  { text: 'Vue3基础', link: '/vue3Basic/' },
  { text: '源码解读', link: '/sourceCode/' },
  { text: 'ElementPlus', link: '/elementPlus/' },
  { text: '生态系统', children: [{ text: 'Vuex', link: '/vuex/' }] },
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
};
