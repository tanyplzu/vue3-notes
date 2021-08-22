import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { path } from '@vuepress/utils';
import { navbarConfig, sidebarConfig } from './configs/menu';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig<DefaultThemeOptions>({
  title: '七月有风',
  dest: 'dist',
  base: '/',
  bundler: '@vuepress/vite',
  bundlerConfig: {
  },

  themeConfig: {
    logo: '/logo.png',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,
    editLinkText: '',
    sidebarDepth: 1,

    navbar: navbarConfig,
    sidebar: sidebarConfig,
  },

  debug: true,

  markdown: {
    code: {
      lineNumbers: false,
    },
  },

  plugins: [['@vuepress/plugin-search']],
});
