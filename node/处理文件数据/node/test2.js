// url参数转换
// querystringify.parse() 方法反序列化字符串，将其转化为对象
// querystringify.stringify() 方法将对象序列化为字符串
// 默认分隔符是 "=","&"
const querystringify = require("querystringify");

let str = "age=111&name=test&passwowd=123456";
let obj = { age: "111", name: "test", passwowd: "123456" };

let obj2 = querystringify.parse(str);
let str2 = querystringify.stringify(obj);

console.log(obj2);
console.log(str2);
// { age: '111', name: 'test', passwowd: '123456' }
// age=111&name=test&passwowd=123456
