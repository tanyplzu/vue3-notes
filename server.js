const express = require('express');
const compression = require('compression');
// 端口可以自己定义
const port = process.env.PORT || 3000;
const app = express();
// 开启 gzip 压缩
app.use(compression());
app.use(express.static('./dist'));
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at ' + port + '\n');
});
