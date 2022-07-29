// 引入http模块，node官方提供的
const http = require("http");

let server = http.createServer((req, res) => {
  console.log(`客户端请求的内容是：${req.url}`);
  console.log(`请求的方法是：${req.method}`);
  // 判断请求哪个，确定返回什么
  if (req.url == "/aaa") {
    res.write("aaaaa");
  } else if (req.url == "/bbb") {
    res.write("bbbbb");
  } else {
    res.write("404"); // 其实是假的404，F12可以看到http状态码还是200，更改在server3.js
  }
  res.end();
});

server.listen(8081);
console.log("监听成功");
