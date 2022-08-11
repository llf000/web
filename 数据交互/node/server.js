const http = require("http");
const url = require("url");

let allowHosts = ["baidu.com", "taobao.com", "tmall.com", "google.com"];

let server = http.createServer(function (req, res) {
  let { pathname, query } = url.parse(req.url, true);
  let { a, b, callback } = query;

  // 判断请求是否来自上面定义的数组
  if (allowHosts.indexOf(req.headers["origin"]) != -1) {
    // 判断Ajax1.0还是2.0   origin前台浏览器带来的
    // Ajax能不能跨域靠这个头
    // 1.0 没有origin
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  setTimeout(function () {
    res.write(`${callback}(${parseInt(a) + parseInt(b)})`);
    res.end();
  }, Math.floor(Math.random() * 20000));
});
server.listen(8081);
console.log("success");
