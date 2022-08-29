const http = require("http");
const url = require("url");
const querystringify = require("querystringify");
// 接收GET数据
let server = http.createServer((req, res) => {
  let { pathname, query } = url.parse(req.url, true);
  console.log("接收到了GET数据:", pathname, query);

  // POST数据
  let aBuffer = [];
  req.on("data", (data) => {
    aBuffer.push(data);
  });
  req.on("end", () => {
    let data = Buffer.concat(aBuffer);
    // method="post" enctype="application/x-www-form-urlencoded"
    const post = querystringify.parse(data.toString());
    console.log(`接收到了post数据: ${post}`);
    // method="post" enctype="multipart/form-data"
  });
});

server.listen(8080, () => {
  console.log("8080 is running port");
});
