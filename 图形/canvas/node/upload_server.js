const http = require("http");
const fs = require("fs");
const url = require("url");
const uuid = require("uuid");
uuid.v4();

let server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  if (pathname == "/upload_base64") {
    //3.接收字符串
    let str = ""; //问题不大——以后再改
    req.on("data", (data) => {
      str += data;
    });
    req.on("end", () => {
      str = decodeURIComponent(str);
      // 上传的时候会有个头,得把头掐掉才是数据内容
      // mine-type:  主类型/子类型（子类型可以为空）
      str = str.replace(/data:[a-z\-]+(\/[a-z\-]+)?;base64,/i, "");

      //4.保存成文件
      fs.writeFile(
        // 文件名：UUID
        `./www/upload/${uuid.v4().replace(/\-/g, "")}`,
        str,
        "base64",
        (err) => {
          if (err) {
            res.writeHeader(500);
            res.write("write file error");
          } else {
            res.write("ok");
          }
          res.end();
        }
      );
    });
  } else {
    fs.readFile(`./www${pathname}`, (err, data) => {
      if (err) {
        res.writeHeader(404);
        res.write("not found");
      } else {
        res.write(data);
      }

      res.end();
    });
  }
});
server.listen(8080, () => {
  console.log("server is running 8080 port");
});
