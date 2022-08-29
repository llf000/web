# nodeJS基础
## 基本知识
* Node.js：用JavaScript写后台 
* 特点：
  * 性能高--基于Chrome v8引擎--预编译(成二进制)----可媲美底层语言写的
  * 相比传统后台语言跟前台配合方便--js亲兄弟
  * 适合前端人员入门
* Node.js不会取代Java（或者其他的）
  * Java诞生时间长，有很多框架支撑，可以开发大型项目
  * Node.js时间短，大型框架少，适用于小型项目、工具项目，是中间层语言（夹在前台和真正大后台之间）
* 浏览器是JavaScript的前端运行环境
* Node.js是JavaScript的后端运行环境
* Node.js中无法调用DOM和BOM等浏览器内置API
## 用Node.js搭建后台服务器
### 使用 http 模块构建服务器
* 引入http模块`const http = require("http");`
* 创建server对象`const server = http.createServer(function(req, res){});`
  * createServer的回调函数，两个参数
    *  req：请求对象
    *  res：响应对象
* 监听端口`server.listen();`
  * listen：等待客户端连接，对任何服务器程序都是必须的
  * 给出一个端口：数字：区分不同服务，端口号要是没有进程正在使用的
  * 每种服务都有默认端口
  * 查看端口占用：cmd--netstat -aon|findstr "xxx"，找到哪个进程占用的，任务管理器（Ctrl+Shift+Esc）看进程对应pid
* res.write()和res.end()
  * res.write()：可以执行多次，输出多条语句，用res.write()输出，必须用res.end()结尾，否则浏览器会一直处于请求状态
  * res.end() ：只能执行一次
  ```
    const http = require("http");
    
    const server = http.createServer((req, res) => {
      res.write("hello worid");
      res.write("hello worid");
      res.write("hello worid");
      res.end();
    });
    
    server.listen(8080);
  ```
### fs模块
* fs模块：Node.js官方提供的用来操作文件的模块，有一系列的方法和属性用来满足用户对文件的操作需求
* 使用fs模块
  * 引用模块`const fs = require("fs");`
  * 调用模块 
    * 读取文件：fs.readFile()方法，`fs.readFile(path[,options],callback);`
      * 参数1：必选参数，字符串，表示文件的路径
      * 参数2：可选参数，表示什么编码格式来去读文件
      * 参数3：必选参数，文件读取完成后，通过回调函数拿到读取的结果
    * 写入文件：fs.writeFile()方法，`fs.writeFile(file,data[,options],callback);`
      * 参数1：必选参数，需要指定一个文件路径的字符串，表示文件的存放路径
      * 参数2：必选参数，表示要写入的内容
      * 参数3：可选参数，表示已什么格式写入文件内容，默认值是邨utf8
      * 参数4：必选参数，文件写入完成后的回调函数
      * fs.writeFile()方法只能用来创建文件，不用用来创建路径
      * 重复调用fs.writeFile()写入同一个文件，新写入的内容会覆盖之前的旧内容
  ```
    const fs = require("fs");

    // 读文件
    fs.readFile("1.txt", (err, data) => {
      if (err) {
        console.log("读取失败");
      } else {
        console.log("读取成功");
        console.log(data); // 打印出来的是buffer（缓存区）  二进制数据
        console.log(data.toString());
      }
    });
    
    // 写文件
    fs.writeFile("2.txt", "这是写入的", (err) => {
      if (err) {
        console.log("写入失败");
      } else {
        // 成功的话，文件夹里会出现2.txt文件
        console.log("写入成功");
      }
    });
  ```

