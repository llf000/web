define((require, exports, module) => {
  let moda = require("./a");
  let modb = require("./b");

  exports.res = moda.numa + modb.numb;
});
