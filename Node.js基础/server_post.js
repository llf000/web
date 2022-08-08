const http = require("http");

let server = http.createServer((req, res) => {
  // post数据是分块传输的，必须分多次接收
  // 下面这种接收方式是有问题的：str--字符串，万一是二进制数据就完了
  let str = "";

  req.on("data", (data) => {
    str += data;
  });
  req.on("end", () => {
    console.log(`post数据接收成功:${str}`);
  });
});

server.listen(8080, () => {
  console.log("server is running 8080 port");
});
