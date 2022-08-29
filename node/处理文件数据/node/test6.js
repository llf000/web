// uuid生成唯一标识符
const uuid = require("uuid");
uuid.v4();
// 横杠都不要
console.log(uuid.v4().replace(/\-/g, ""));
