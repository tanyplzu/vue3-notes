import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { navbarConfig, sidebarConfig } from './configs/menu';
import { path } from '@vuepress/utils';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  title: '七月有风',
  dest: 'dist',
  base: '/',
  bundler: '@vuepress/vite',
  bundlerConfig: {},
  head: [
    ['link', { rel: 'manifest', href: '/manifest.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    // ...其他标签
  ],

  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '',
    sidebarDepth: 1,
    darkMode: false,
    navbar: navbarConfig,
    sidebar: sidebarConfig,
  },

  debug: true,

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  plugins: [
    ['@vuepress/plugin-search'],
    // ['@vuepress/plugin-pwa'],
    // [
    //   '@vuepress/plugin-pwa-popup',
    //   {
    //     locales: {
    //       '/zh/': {
    //         message: '发现新内容可用',
    //         buttonText: '刷新',
    //       },
    //     },
    //   },
    // ],
  ],
});
