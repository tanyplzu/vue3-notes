import { defineConfig } from 'vitepress';
import { navbarConfig, sidebarConfig } from './configs/menu';

// netlify envs
// const deployURL = process.env.DEPLOY_PRIME_URL || '';
// const commitRef = process.env.COMMIT_REF?.slice(0, 8) || 'dev';


export default defineConfig({
  title: '朝花夕拾',
  description: 'vue3 学习笔记',
  lang: 'zh-cn',

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.png' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'theme-color', content: '#646cff' }],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'CBDFBSLI',
        'data-spa': 'auto',
        defer: '',
      },
    ],
  ],

  vue: {
    reactivityTransform: true,
  },

  themeConfig: {
    logo: '/logo.png',

    editLink: {
      pattern: 'https://github.com/vitejs/vite/edit/main/docs/:path',
      text: 'Suggest changes to this page',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vitejs/vite' },
    ],

    // algolia: {
    //   appId: '7H67QR5P0A',
    //   apiKey: 'deaab78bcdfe96b599497d25acc6460e',
    //   indexName: 'vitejs',
    //   searchParameters: {
    //     facetFilters: ['tags:en'],
    //   },
    // },

    // localeLinks: {
    //   text: 'English',
    //   items: [
    //     { text: '简体中文', link: 'https://cn.vitejs.dev' },
    //   ],
    // },

    footer: {
      message: `Released under the MIT License`,
      copyright: 'Copyright © 2021-present',
    },

    nav: navbarConfig,
    sidebar: sidebarConfig,
  },
});
