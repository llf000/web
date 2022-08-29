// 文件名的部分是UUID,扩展名（extname）不变
const uuid = require("uuid");
uuid.v4();
const path = require("path");

let filename = "1.txt";

let newFilename = `${uuid.v4().replace(/\-/g, "")}${path.extname(filename)}`;

console.log(newFilename);
// 32f547f3ffd64ddcb22ad95ff833daa7.txt
