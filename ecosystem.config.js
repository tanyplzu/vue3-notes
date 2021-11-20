module.exports = {
  apps: [
    {
      name: 'vue3-note',
      script: 'server.js',
    },
  ],
  deploy: {
    production: {
      user: 'root',
      host: '47.97.10.178',
      ref: 'origin/master',
      repo: 'git@github.com:tanyplzu/vue3-notes.git',
      path: '/www/website/vue3-notes',
      ssh_options: 'StrictHostKeyChecking=no',
      'post-deploy':
        'git checkout master && git pull && npm i --production=false && npm run docs:build && pm2 startOrReload ecosystem.config.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  },
};
