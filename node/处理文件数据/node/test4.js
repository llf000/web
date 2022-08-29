// 解析普通数据
let str = 'Content-Disposition: form-data; name="username"';

function parseInfo(str) {
  let arr = str.split("; ");
  let json = {};

  arr.forEach((s) => {
    let [key, val] = s.split("=");

    json[key] = val;
    console.log(json);
  });

  return json;
}
