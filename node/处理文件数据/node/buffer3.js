// Buffer的切割
// Buffer.slice()：返回一个新的Buffer，它指向与输入的Buffer相同的内存位置，且仅包含裁剪的元素
Buffer.prototype.split =
  Buffer.prototype.split ||
  function (spliter) {
    let b1 = this;
    let result = [];
    let n;
    // = -1 说明没有==了，切完了
    while ((n = b1.indexOf("==")) != -1) {
      // (0,n)从0开始到n-1结束切开(不包括n)
      let res1 = b1.slice(0, n);
      // 从n=2开始：因为有两个==，要跳过两次
      let res2 = b1.slice(n + 2);

      result.push(res1);
      b1 = res2; // 重复切割过程
    }
    result.push(b1);
    return result;
  };

let b1 = new Buffer.from("abd==sddfwer==asdsdfbdf=sdsdf==gfsdg");
let result = b1.split("==");

// [
//   <Buffer 61 62 64>,
//   <Buffer 73 64 64 66 77 65 72>,
//   <Buffer 61 73 64 73 64 66 62 64 66 3d 73 64 73 64 66>,
//   <Buffer 67 66 73 64 67>
// ]
console.log(result);
// ['abd', 'sddfwer', 'asdsdfbdf=sdsdf', 'gfsdg']
console.log(result.map((item) => item.toString()));
