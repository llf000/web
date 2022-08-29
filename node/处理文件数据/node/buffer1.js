const fs = require("fs");

fs.readFile("a.jpg", (err, data) => {
  if (err) {
    console.log("Error");
  } else {
    // 打印结果：<Buffer ff d8 ff e0 00 10 4a......
    // console.log(data);
    // 会在文件目录下写入b.jpg 与a.jpg完全相同
    fs.writeFile("b.jpg", data, (err) => {
      if (err) {
        console.log("writeFile falid");
      } else {
        console.log("writeFIle successfully");
      }
    });
  }
});

// 转成字符串再写入，写入还是成功的，但图片已经被损坏了无法打开
// fs.readFile("a.jpg", (err, data) => {
//   if (err) {
//     console.log("Error");
//   } else {
//     str = data.toString();
//     fs.writeFile("c.jpg", str, (err) => {
//       if (err) {
//         console.log("writeFile falid");
//       } else {
//         console.log("writeFIle successfully");
//       }
//     });
//   }
// });
