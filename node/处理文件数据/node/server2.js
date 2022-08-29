const http = require("http");
const url = require("url");
const querystringify = require("querystringify");
const common = require("./libs/common.js");
const fs = require("fs");
const uuid = require("uuid");
uuid.v4();
const path = require("path");

let server = http.createServer((req, res) => {
  // GET数据
  let { pathname, query } = url.parse(req.url, true);
  console.log("接收到了GET数据:", pathname, query);

  // POST数据
  let aBuffer = [];
  req.on("data", (data) => {
    aBuffer.push(data);
  });
  req.on("end", () => {
    let data = Buffer.concat(aBuffer);

    // enctype="multipart/form-data"
    if (req.headers["content-type"].startsWith("multipart/form-data")) {
      // console.log(data.toString());

      let post = {};
      let files = {};
      // 提取分隔符---text3.js
      const boundary =
        "--" + req.headers["content-type"].split(";")[1].split("=")[1];
      // console.log(boundary);

      // 第一步，用分隔符切分
      let arr = data.split(boundary);

      // 第二步，扔掉头尾(<><--\r\n>)
      arr.shift();
      arr.pop();

      // 第三步，扔掉每一项数据的头尾(\r\n......\r\n)
      arr = arr.map((item) => item.slice(2, item.length - 2));

      // 第四步，找第一个"\r\n\r\n"，一切两半：前一半是信息，后一半是数据
      arr.forEach((item) => {
        let n = item.indexOf("\r\n\r\n");

        let info = item.slice(0, n);
        let data = item.slice(n + 4);

        info = info.toString();

        let total = 0;
        let complete = 0;

        // 只有一行普通数据
        if (info.indexOf("\r\n") == -1) {
          let key = common.parseInfo(info).name;
          let val = data.toString();
          // post存放普通数据
          post[key] = val;
        } else {
          // 两行数据：包含文件数据
          total++;

          let json = common.parseInfo(info);
          let key = json.name;
          let filename = json.filename;
          let type = json["Content-Type"];
          let filepath = `upload/${uuid.v4().replace(/\-/g, "")}${path.extname(
            filename
          )}`;

          // files存放文件数据
          files[key] = { filename, type, filepath };

          fs.writeFile(filepath, data, (err) => {
            if (err) {
              console.log("writeFile falid");
            } else {
              console.log("writeFile successfully");

              complete++;

              console.log(post, files);
            }
          });
        }
      });
    } else {
      // enctype="application/x-www-form-urlencoded" 不需要特别处理
      const post = querystringify.parse(data.toString());

      console.log("接收到了post数据:", post);
    }
  });
});

server.listen(8080, () => {
  console.log("8080 is running port");
});
