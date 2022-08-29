// Buffer的拼接
// Buffer.from:用于创建包含指定 字符串，数组或buffer的新Buffer实例
// Buffer.concat:拼接buffer
let b1 = new Buffer.from("abc");
let b2 = new Buffer.from("def");

let b3 = new Buffer.concat([b1, b2]);

// <Buffer 61 62 63 64 65 66 >
console.log(b3);
