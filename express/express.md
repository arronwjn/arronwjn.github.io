---
title: 你好Express
---

### 上手Express框架

前面课程中介绍了 React , React 是一个 前端框架 ，前端框架是运行在浏览器 环境下的，负责 UI（ User Interface 用户界面）。

但是，我们想一想，如果只有 UI ，那么用户要看的数据从哪里来？用户需要保存的数据 如何进行运算之后保存到数据库中？这部分的功能就需要后端代码来完成。今天我们要介绍的 Express 就是一个后端（ back-end ）框架。

我们可能知道，当下实现后台服务，最流行的方式就是使用 Nodejs , Express 就是 Nodejs 的 一个框架，而且是 Nodejs 各种后台框架中最为通用，最为流行的一个，没有之一。所以学习 Nodejs 最佳途径就是从 Express 入手。

# 你好Express

Express 的官网位置是 http://www.expressjs.com.cn/ 。官网上，首页最能吸引 我们注意的就是 API 这个关键字。API （ Application Program Interface ）是应用开发接口，简称接口 。而 Express 就是用来制作后台接口的，或者说叫制作后台 API 的。

那么之后，我们整个项目的架构，就是用 Express 来制作后台 API , 这些 API 的使用 者就是前台 React 代码。

`做一个简单的Express`

- 第一步，要新建文件夹，并把它初始化为一个 Nodejs 项目
```
mkdir express-hello
cd express-hello
npm init -y
```
这样文件夹内就会生成一个 package.json ，有了这个文件，我们这个文件夹就可以 叫做一个 Nodejs 项目 了

- 下一步，进行装包
```
npm install --save express
```
> 注意：项目文件夹名不能用express

- 接下来到项目中，创建一个 index.js 文件，内容如下：

```
const express =  require('express');
const app = express();

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```
- 最后在命令行运行node，命令如下：
```
node index.js
```
> 上面添加的无名函数 function(){...} 在这里 的作用是回调函数( callback function ) 。

什么是回调函数？ 回调函数是我们写 JS 程序，最常见的功能之一。程序会先执行一个操作，执行完这个操作后，回过头来要调用的那个函数，就叫回调函数。

一般格式如下：
```
app.listen(3000, function(){

});
```
一般回调函数的使用场合就是，之前的一个操作耗时比较长（或者是异步操作） 这样的情况下才使用回调函数。大家暂时不必深究，异步操作未来会成为大家的 必备知识。


服务器监听端口后，唯一的作用就是来根据端口传入的请求，来执行特定代码。

比如，我们在上面的 index.js 中，app.listen 语句的上面，添加如下代码：

```
app.get('/', function(){
  console.log('request come in...');
})
```
上面代码中 get('/') 这是什么？

- get 是一个 http 请求的动词 ，类似的还有 post/delete/put 。
- / 是一个路径 ，英文 path

一个动词加一个路径，这样就组成一个 HTTP 请求 ，公式如下
```
request = verb + path + data
```
但是，这里的请求，不是 **发出** 请求 ，而是 **接收** 请求 。

现在我们需要的客户端请求是，一个GET

同时这个请求，必须来自3000端口。

可以发请求的方式不唯一，可以用浏览器地址栏，可以用页面的 form 发， 也可以用 axios 发，后者使用专门的 API 调试工具 curl/postman 来发。


现在，我们就用浏览器的地址栏来发请求。地址栏中输入
```
http://localhost:3000/
```
> 注意：localhost 就是我们自己机器的域名。

上的请求，默认动词就是 GET ，同时 :3000 用来指定端口号。

请求之后，会发现浏览器里没有任何输出，这是因为，我们的 express 服务器根本就没有给前台返回任何字符串，回调函数中的 console.log() 只能把字符串打印到后台。

### 前端和后端

前端，front-end，或者也可以叫前台。后端，back-end 也可叫后台。

前端代码运行环境是什么呢？对于我们 Web 开发者来说，就是浏览器。注意，浏览器是安装在用户自己的机器上的。也就是说前端代码运行在我们自己的笔记本或者 ipad 上，如果前端代码写的烂，那么考验的是我们自己设备的内存大小。

后端代码运行环境是？是一个放在人家机房里的刀片机。上面运行 Linux 操作系统。刀片机根本就没有显示器，当然也不能跑浏览器。所以后端代码的运行是脱离浏览器的。如果后端写的烂，那么考验的就是刀片机的内存够不够了。

然后，再从 API 的角度来聊聊。前端是 API 的消费者，后端是 API 的生产者。后台 API 写好之后，默认不运行，只有当前端发送过请求来的时候才会触发后台 API 代码运行。

当然，在平常开发的时候，我们并没购买刀片机，所有只能是用自己的笔记本来当刀片机用了。这时候，基本可以认为 express 写的代码就是后端代码，react 写的代码就是前端代码。

### 继续前面的代码：返回字符串

前面的回调函数中，console.log 打印字符串，只是出现在后端（服务器端）。前端得不到任何反馈。所以，我们可以把代码做如下修改

```
app.get('/', function(req, res){
  res.send('Hello World');
})
```
上面代码中 req 是 request 请求的简写， res 是 response 响应的简写 。res.send('Hello World'); 的作用是从后端向前端浏览器返回字符串 Hello World 。

### 总结

到这里，我们一个 Express 的 Hello World API 就制作完毕， 我们需要掌握的概念就是：

- 前端和后端的区别
- API 基本格式
- Express 使用方式
