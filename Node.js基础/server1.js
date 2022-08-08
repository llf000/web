// 引入http模块，node官方提供的
const http = require("http");

// 创建请求
let server = http.createServer((req, res) => {
  // request: 请求--服务器被人请求——输入, 请求信息——哪个地址、时间、ip、方法...
  // response: 响应——输出出去
  console.log("有人请求我");

  console.log(`客户端请求的内容是：${req.url}`);
  console.log(`请求的方法是：${req.method}`);
  // 返回给客户端的东西 返回结束：res.end();
  res.write("abcdeeee");
  res.write("qqq");
  res.write("22222");
  res.end();
});

// 监听端口
server.listen(8080);
console.log("监听成功");
