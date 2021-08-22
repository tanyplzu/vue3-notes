export const navbarConfig: any = [
  { text: 'Vue3基础', link: '/vue3Basic/响应式系统API' },
  { text: '源码解读', link: '/sourceCode/' },
  { text: 'ElementPlus', link: '/elementPlus/' },
];

export const sidebarConfig: any = {
  '/vue3Basic/': [
    {
      text: 'Guide',
      children: [
        '/vue3Basic/响应式系统API'
      ],
    },
  ],
  '/sourceCode/': [],
  '/elementPlus/': [],
};
