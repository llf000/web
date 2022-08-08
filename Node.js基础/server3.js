const http = require("http");
const fs = require("fs");
// 不可能服务端所有的文件都能被客户端操作，例子中只有www文件夹下文件能被客户端操作，所以：
//req.url   =>    '/a.html'             =>    'www/a.html'
//req.url   =>    '/aaa/bbb/1.html'     =>    'www/aaa/bbb/1.html'

let server = http.createServer((req, res) => {
  // 会出错，看console.log就知道，因为先end了，才write了，write时就出错了（end是同步，write是异步）
  /*
  fs.readFile(`www${req.url}`, (err, data) => {
    console.log("write");
    if (err) {
      res.write("404");
    } else {
      res.write(data);
    }
  });
  console.log("end");
  res.end();
  */

  /*
  // 把res.end()也放在fs的调用函数里就好了
  fs.readFile(`www${req.url}`, (err, data) => {
    console.log(res.write);
    if (err) {
      res.write("404");
    } else {
      res.write(data);
    }
    console.log(res.end);
    res.end();
  });
  */

  // 404问题：res.write('404')，是假的404，write出去的是响应消息的body，不是状态码404，应该用res.writeHeader(404);
  fs.readFile(`www${req.url}`, (err, data) => {
    if (err) {
      // 错的话指向一个404页面，如果没有404页面，就res.writeHeader(404);
      fs.readFile("./http-errors/404.html", (err, data) => {
        if (err) {
          res.writeHeader(404); // 给机器的
          res.write("Not Found"); // 给人看的
        } else {
          res.writeHeader(404);
          res.write(data);
        }
        res.end();
      });
    } else {
      res.write(data);
      res.end();
    }
  });
});
server.listen(8080, () => {
  console.log("server is running 8080 port");
});
