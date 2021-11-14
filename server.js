const server = require('pushstate-server');

server.start({
  port: 8082,
  directory: './dist',
});
