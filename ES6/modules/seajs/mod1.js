define((require, exports, module) => {
  module.exports = {
    mod11: 11,
    mod12: 22,
    show1: function (mod11, mod12) {
      console.log(mod11 + mod12);
    },
    show2(mod11, mod12) {
      console.log(mod11 * mod12);
    },
  };
});
