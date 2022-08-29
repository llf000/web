// fs：nodeJS提供的用于操作文件系统的模块（如文件读写），引入后就可以使用
const fs = require("fs");

// 读文件
fs.readFile("1.txt", (err, data) => {
  if (err) {
    console.log("读取失败");
  } else {
    console.log("读取成功");
    console.log(data); // 打印出来的是buffer（缓存区）  二进制数据
    console.log(data.toString());
  }
});

// 写文件
fs.writeFile("2.txt", "这是写入的", (err) => {
  if (err) {
    console.log("写入失败");
  } else {
    // 成功的话，文件夹里会出现2.txt文件
    console.log("写入成功");
  }
});
