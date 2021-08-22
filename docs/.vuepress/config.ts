import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { path } from '@vuepress/utils';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  base: '/',
  bundler: '@vuepress/vite',
  bundlerConfig: {
    // vite 打包工具的选项
  },

  themeConfig: {
    logo: '/public/logo.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '',
    sidebarDepth: 1,

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
    '/vue3Basic/': [
      { text: 'Introduction', link: '/vue3Basic/' },
      {
        text: '指南',
        children: ['/vue3Basic/reactiveAPI.md'],
      },
    ],
    '/sourceCode/': [],
    '/elementPlus/': [],
  };
}
