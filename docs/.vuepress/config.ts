import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { path } from '@vuepress/utils';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',

  themeConfig: {
    logo: '/public/logo.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: 'Suggest changes to this page',

    navbar: navbarConfig(),
    sidebarz: sidebarConfig(),
  },

  markdown: {},

  plugins: [['@vuepress/plugin-search']],
});

function navbarConfig() {
  return [
    { text: '首页', link: '/' },
    { text: 'Vue3基础', link: '/vue3Basic/' },
    { text: '源码解读', link: '/sourceCode/' },
    { text: 'ElementPlus', link: '/elementPlus/' },
  ];
}

function sidebarConfig() {
  return {
    '/vue3Basic/': ['/', '/vue3Basic/响应式系统API'],
    '/sourceCode/': [],
    '/elementPlus/': [],
  };
}
