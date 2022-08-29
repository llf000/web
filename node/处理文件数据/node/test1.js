// url解析
// url.parse() 方法接受网址字符串，解析并返回网址对象
const url = require("url");

let obj = url.parse("https://www.baidu.com/s?ie=UTF-8&wd=url.parse()");

console.log(obj);
// Url {
//   protocol: 'https:',
//   slashes: true,
//   auth: null,
//   host: 'www.baidu.com',
//   port: null,
//   hostname: 'www.baidu.com',
//   hash: null,
//   search: '?ie=UTF-8&wd=url.parse()',
//   query: 'ie=UTF-8&wd=url.parse()',
//   pathname: '/s',
//   path: '/s?ie=UTF-8&wd=url.parse()',
//   href: 'https://www.baidu.com/s?ie=UTF-8&wd=url.parse()'
// }
