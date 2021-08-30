export const navbarConfig: any = [
  { text: '首页', link: '/' },
  { text: 'Vue3基础', link: '/vue3Basic/' },
  { text: '源码解读', link: '/sourceCode/' },
  { text: 'ElementPlus', link: '/elementPlus/' },
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
    '/sourceCode/setup'
  ],
  '/elementPlus/': [
    { text: 'Introduction', link: '/elementPlus/' },
  ],
};
