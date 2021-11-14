const server = require('pushstate-server');

server.start({
  port: 8081,
  directory: './dist',
});
