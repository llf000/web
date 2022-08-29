// 分割字符串
// split() 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组，
// 以一个指定的分割字串来决定每个拆分的位置
let str =
  "multipart/form-data; boundary=----WebKitFormBoundarycWYtzRXqfQ0WZSeF";

let arr = str.split(";");
let boundary = "--" + arr[1].split("=")[1];

console.log(arr);
console.log(boundary);
// [
//   'multipart/form-data',
//   ' boundary=----WebKitFormBoundarycWYtzRXqfQ0WZSeF'
// ]

// ------WebKitFormBoundarycWYtzRXqfQ0WZSeF
