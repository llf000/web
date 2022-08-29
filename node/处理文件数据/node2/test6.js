const uuid = require("uuid");
uuid.v4();
// 横杠都不要 变成空的
console.log(uuid.v4().replace(/\-/g, ""));
