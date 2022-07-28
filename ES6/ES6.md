# ES6-新特性
## 变量
* 以前常量var：可以重复声明，无法限制修改，没有块级作用域{}
* 新的变量let：不能重复声明，可以修改，有块级作用域{}
* 新增常量const：不能重复声明，不可修改，有块级作用域{}
## 函数
### 箭头函数
* 普通函数`function () 
* 箭头函数写法：{}``()=>{}` 
  * 如果只有一个参数：()可以省
  * 只有一条语句，且是return：{}和return都可以省
### 函数参数
* 参数扩展（收集剩余参数）` function show(a, b, ...args) {....}`
* 数组展开：相当于将数组内容写出来
  ```
    let arr1 = [1, 2, 3];
    let arr2 = [4, 5, 6];
    let arr3 = [...arr1, ...arr2];
  ```
* 默认参数`function show(a, b = 2, c = 3) {...}`
## 解构赋值
* 左右两边结构必须一样`let [a, b, c] = [1, 2, 3];`
* 右边必须是个东西(数组、JSON、字符串、数字...)` let { a, b } = { 1, 2}; ` 不可以
* 声明和赋值不能分开，必须在一句话里完成
  ```
  不可以：
    let [a, b];
    [a, b] = [1, 2];
  ```
## 数组
* map：映射，一个对一个--[24, 66, 45, 99] => [不及格, 及格, 不及格, 及格]
* reduce：汇总，一堆出来一--[..., ..., ...] => xx，接收一个函数作为累加器
* filter：过滤器
* forEach：循环/迭代
## 字符串 
* 新方法
  * startWith('xxx')：以xxx开始
  * endsWith('xxx')：以xxx结束
* 字符串模板  \`\`
  * 可以直接把内容塞进字符串里 ```console.log(`${index}: ${item}`);```
  * 可以折行
## ES6的面向对象
* class关键字，构造器和类分开
* class里可以直接加方法
* extends 继承
* super 调用父类构造函数/方法
## Promise
* 异步：操作之间没关系，可以同时进行多个操作，代码更复杂也更高效，用户体验好
  同步：操作之间相关，同时只能做一件事，代码简单
  ```
    $.ajax({
      url: '/get_banners',
      type: 'post',
      dataType: 'json',
      success(){
  
        $.ajax({
          url: '/get_hot',
          type: 'post',
          dataType: 'json',
          success(){
            $.ajax({
              url: '/get_list',
              type: 'post',
              dataType: 'json',
              success(){
                $.ajax({
                  url: '/get_hot',
                  type: 'post',
                  dataType: 'json',
                  success(){
  
                  },
                  error(){
                    alert('读取失败');
                  }
                })
              },
              error(){
                alert('读取失败');
              }
            })
          },
          error(){
            alert('读取失败');
          }
        })
      },
      error(){
        alert('读取失败');
      }
    })
  
  同步：
  let banners=$.ajax('/get_banners');
  let hot=$.ajax('/get_hot');
  let list=$.ajax('/get_list');
  let hot=$.ajax('/get_hot');
  ```
* Promise--解决异步--用同步一样的方式来书写异步代码，通过链式调用解决回调嵌套。本质是等待异步操作结束
  * 创建Promise对象
    ``` 
      let p=new Promise(function (resolve, reject){
        异步代码...
      });
      Promise($.ajax({}));
    ```
  * 使用Promise对象
    ``` 
      p.then(()=>{}, ()=>{});
    ```
  * Promise.all
    ```
       Promise.all([p1, p2, p3...]).then(() => {}, () => {})
    ```
* 只兼容高级浏览器，IE不可，靠编译解决
## generator
* 生成器函数，在普通函数基础之上多了一个 *，不能简写成箭头函数。调用生成器函数并不会立即执行函数，而是得到一个生成器对象，直到手动调用 next 方法
* yield 关键字：在生成器函数内部可以随时定义一个 yield 关键字并返回一个值，可以在 next 方法返回对象中获取到这个值
  * yield 关键字只是暂停当前生成器函数的执行，直到外部调用 next 方法时，会从当前暂停处继续执行
  * 可以通过 next 方法传递参数使生成器内部获取传值
  * 返回的对象中有一个 done 属性表示这个生成器是否执行完毕
* generator用在哪儿？promise能解决回调嵌套，但是仍然有大量回调函数，相比同步模式可读性仍然较差，用generator，等待某个操作结束，用写同步操作的方式完成异步操作，无感处理异步操作
## async和await
* async是generator的语法糖
* async代替*，await代替yield
* async可以写成箭头函数
## 模块化
### 解释
* 模块：可以重复用的东西，也叫组件、元件
* 发展历程
  * 官方模块化还未出现时-see.js（遵循CMD规范）、require.js（遵循AMD规范）
  * node.js模块化--比较像sea.js和require.js
  * ES6模块化
### sea.js
* 遵循CMD规范 
* 按需引用（用就引，不用就不引），解决依赖，异步引用 
* seajs对js文件敏感，因此引用时可以省略.js后缀
* 定义模块：define，三个参数
```
  define(function(require, exports, module){}
```
  * require
  * exports
  * module
* 引用模块：在html中引用js使用seajs.use()，在js模块中引用其他js模块使用require
```
  html:
  引用两个模块，可以写成数组：
  <script src="sea.js"></script>
  <script>
    // 引用的时候.js可省略，默认引用的是js文件
    seajs.use(['mod1.js', 'mod2.js'], function (mod1, mod2) {
      mod1.show1(mod1.mod11, mod1.mod12);
      mod1.show2(mod1.mod11, mod1.mod12);
      console.log(mod2.res);
    });
  </script>
  引用一个模块：
  <script>
    seajs.use('mod2', function (mod) {
      console.log(mod.res);
    });
  </script>
  mod1.js:
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
  mod2.js
  define((require, exports, module) => {
    let moda = require("./a");
    let modb = require("./b");
    exports.res = moda.numa + modb.numb;
  });
  a.js:
  define(function (require, exports, module) {
    exports.numa = 11;
  });
```
### node.js
* node.js来自于seejs，二者比较像
* node.js里没有use 都是return
* node在当前目录下引用 也必须要写./ 不写的话node会以为是系统自带的模块 ./强制在当前目录下寻找
* 将文件node_modules目录下，可以不写./
* node的模块化：
  * 没有define
  * exports、require、module
  * 引用自定义模块
    * 放到node_modules里
    * 前面加./
* node文件一般为nname，区别于系统自带模块
### ES6模块化
* import：引入模块`import mod from "data/1.js" `
* export：定义模块
  ```
    let a = 1;
    let b = 2;
    export { a, b };
  ```
          