// 文件名的部分是UUID 扩展名（extname）不变
const uuid = require("uuid/v4");
const path = require("path");

let filename = "1.txt";

let newfilename = `${uuid().replace(/\-/g, "")}${path.extname(filename)}`;

console.log(newfilename);
