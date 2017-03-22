---
title: Session
---

HTTP 本身就是个无状态协议，也就是你在一个 API 中设置一个变量，后一次请求再去访问这个 API 也拿不到这个变量了，服务器很健忘，马上就忘了客户端了。

这样你想想，怎么去实现一个购物车呀？ 但是 session 会话（或者也叫对话，但是 session 的中文本意其实是“一段时间”）机制可以解决这个问题。

实际上 IT 界，每次引入一个新技术，都是为了解决一个实际问题的。例如，人们发明 cookie 就是为了解决，服务器和客户端互不相认的问题。但是 cookie 有了，新问题来了，那就 cookie 的存储能力有限，如果一个用户买了1000000件商品，那么这些商品信息要存在哪里呢？

### Session 基本原理

当前最流行的做法就是，在每次有一个新的浏览器用户登录进来，服务器端都会为这个浏览器开辟一个小的内存区域（注意，这个区域可以认为是一个文件，但是这个文件是存在服务器端的），通常的术语就叫”又创建了一个新的 session“，那么在这个 session 之中，服务器就可以为这位特定用户（其实就是为特定的那个浏览器）保存任意信息到 session 之中了（例如，用户名，购物车中的商品）。但是同一时刻，连接到服务器的浏览器可能成千上万，那么服务器是如何区分不同用户的浏览器的呢？简单的答案就是，使用 cookie 。

具体来说，每个服务器端的 session 被创建的时候，都会有一个类似于文件名的东西，叫做 sessionId 。每个 session 在服务端被创建的时候，sessionId 都会自动的被发送到浏览器的 cookie 中，这样，每个浏览器就跟自己在服务器上的 session 有了绑定关系了。

### 代码演示

自己手动基于 cookie 机制，去服务器上开辟 session 比较麻烦。所以各大语言框架都有自己的 session 管理接口，例如，express 的接口就是 express-session 。

所以此时，peter 到服务器端，添加如下 API

```
const session = require('express-session')

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

app.post('/login', function(req, res){
  let username =  req.body.username;
  req.session.username = username ;
  res.send(req.session.username);
})
```

这样，就可以达成如下效果：

浏览器从客户端发起请求，请求格式为

```
POST /login Content-Type: application/json {"username": "peter"}
```

这样，服务器端用

```
req.body.username
```

这一个变量，就可以接收到 peter 这个字符串了。

然后把 ”peter“ 这个字符串保持到 session 中，具体语句就是

```
req.session.username = username
```

之后，服务器会自动的把 sessionId 返回给浏览器，存储到 cookie 之中

注意：req.session 接口，内置 cookie 操作功能

这样，浏览器每次就可以认领自己的 session 来拿到自己的用户名了。

### 使用 curl 测试

命令如下：

```
$ curl -v -X POST -H "Content-Type: application/json" -d '{"username": "peter"}' http://tiger.haoduoshipin.com/login
> POST /login HTTP/1.1
> Host: localhost:3005
> Content-Type: application/json

...

< HTTP/1.1 200 OK
< set-cookie: connect.sid=s%3A37nZnzBeXX3E-vO9gmSatGf8wDfWcH_K.tKDCw3NGRdfwjPCetq%2BYEQXwiXlFcjHPCkug1zAmOFg; Path=/; HttpOnly
...
peter%
```

上面信息重要是分两部分：请求和响应，具体来说：

- 请求部分可以看到发出的请求是 POST /login Content-Type: application/json {"username":

 "peter"} 这个是符合 API 规范的，所以应该能够得到正确的返回

- 响应的第一行 < HTTP/1.1 200 OK ，200 表示一切正常

- set-cookie 是我们要查看的重点，我们可以看到 req.session 接口可以正确的返回 sessionId 给浏览器

### 浏览器中的行为

这个我们来写一个前后端不分离的项目来演示。

```
mkdir session
cd session
```

初始化一个 nodejs 的项目

```
npm init -y
```

安装 express

```
npm i --save express
```

下面来写一个最简单 http 服务器

```
const express = require('express');
const app = express();

app.listen(3006, function(){
  console.log('running on port 3006...');
})
```

下面来实现一个 API ，返回一个静态 HTML 页面

```
+ app.get('/', function(req, res){
+  res.sendFile('index.html', {root: 'public'});
+ })
```

然后添加 public/index.html 如下

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  index.html
</body>
</html>
```

同时，package.json 中做如下修改

```
+   "start": "nodemon index.js"
```

这样，我后台运行

```
npm start
```

然后用 curl 测试一下 API

```
$ curl localhost:3006/
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  index.html
</body>
</html>
```

浏览器中打开

```
http://localhost:3006/
```

也能够看到 index.html 的内容。

但是，此时有一个小问题，就是浏览器中访问

```
http://localhost:3006/index.html
```

结果访问不到，报错信息是

```
Cannot GET /index.html
```

对应服务器端 index.js 文件中，要做这样的修改

```
const app = express();
-
+app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendFile('index.html', {root:
```

上面这一行的作用，就是把 public/ 文件夹，架设成了一个静态（ static ）服务器，也就 public/ 中所有

的 html 页面，未来都可以不走 API ，直接在浏览器中，用链接的形式访问到。


### 添加 login.html

首先到 index.html 中，添加 login 链接

```
</head>
<body>
-  index.html
+  <a href="/login.html">login</a>
</body>
</html>
```

创建 public/login.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>login</title>
</head>
<body>
  <form method="post" action="/login">
    <label for="username">用户名</label>
    <input name="username" type="text">
    <input type="submit">
  </form>
</body>
</html>
```

### 书写服务器对应接口

index.js 中修改如下：

```
app.use(express.static('public'));
+const bodyParser = require('body-parser');
+
+// parse application/x-www-form-urlencoded
+app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  res.sendFile('index.html', {root: 'public'});
})

+app.post('/login', function(req, res){
+  console.log(req.body);
+})
+
app.listen(3006, function(){
```

### 重定向 redirect

index.js 做出如下修改

```
app.post('/login', function(req, res){
+  let username = req.body.username;
+  // User.find({username: username}) 如果数据库中能找到这个用户
+  // 同时密码也对，这样才算登录成功
   console.log(req.body);
+  if(true) {
+    res.redirect('/');
+  }
 })
```

上面 redirect 接口实现的是“页面重定向”，具体的效果就是，前端页面会自动跳转到指定页面，对应上面的情

况，就是自动跳转到首页。

### 使用 req.session 接口

index.js 修改如下

```
const bodyParser = require('body-parser');

+const session = require('express-session')
+
+app.use(session({
+  secret: 'keyboard cat',
+  resave: false,
+  saveUninitialized: true
+}))
+
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

@@ -12,6 +20,7 @@ app.get('/', function(req, res){

app.post('/login', function(req, res){
  let username = req.body.username;
+  req.session.username = username;
  // User.find({username: username}) 如果数据库中能找到这个用户
```

上面代码有了，就可以拥有一个特殊的变量了 req.session 保存到这个变量中的数据，可以在各个 API 之间（

页面之间）共享。只要本次会话不结束，这个变量就不会消失。

### 观察浏览器中的现象

浏览器中，我们到 login 页面，填写用户名，提交，这样后端执行的是

```
app.post('/login')
```

那么里面会有 session 的操作，也就是

```
req.session.username = username
```

也就是，服务器端的 session 已经创建了。

那么浏览器中的体现就是有一个 cookie 被创建了，到 Application -> storeage -> Cookie -> localhost:3006 之下，就可以看到，有这样的 cookie 数据：

```
connect.sid   xxxxxfdsjfkldsjfklsdjxxxx
```

上面的 sid 意思就是 Session Id ，也就是是服务器端 req.session 的对应的 id 。由于，客户端，每次请

求都会携带 cookie 去服务器端，所以后续每次请求，都可以拿到服务器端 req.session 中存储的数据。

例如：

```
app.get('/hello', function(req, res){
  res.send(req.session.username)
  })
```

小陷阱：后台每次添加代码，服务器都会重启，所以要重新执行一下 POST /login 生成一下 session 才能测试。

### 解决页面缓存问题

现在修改 index.js

```
app.get('/', function(req, res){
+  console.log('home page', req.session.username);
  res.sendFile('index.html', {root: 'public'});
})
```

我们期待的是，每次访问 / 这个 API ，都能打印出 sesssion 变量的值。但是实际中能否达成呢？

实际中是不能打印出来的。甚至我们直接到 app.get(‘/’) 这个 API 中， 我们打印一个 Hello

```
console.log('hello')
```

其实都打印不出来了，因为直接访问

```
http://localhost:3006/
```

这个位置，就相当于访问

```
http://localhost:3006/index.html
```

而我们已经把 public 文件夹架设成静态服务器了，而且其中确实有 index.html 文件，所以 app.get(‘/’)

这个接口根本就不会执行了。

解决方法就是删除：

```
app.use(express.static('public'));
```
这样 API 就又恢复正常了

### 恢复 login 页面

由于取消了静态服务器，所以 login.html 也直接访问不到了，所以 index.js 要做这样的修改

```
res.sendFile('index.html', {root: 'public'});
})

+app.get('/login', function(req, res){
+  res.sendFile('login.html', {root: 'public'});
+})
+
app.post('/login', function(req, res){
let username = req.body.username;
```

index.html 修改如下

```
</head>
<body>
-  <a href="/login.html">login</a>
+  <a href="/login">login</a>
</body>
```

这样，我们再去 login.html 测试一下，重定向到 / 之后，就可以看到打印出提交的用户名了。

### 使用 pug 模板

现在在 GET / 这个接口中，我们有了 req.session.username 也就是登录用户的用户名，但是现在我们想要在

页面中显示这个变量，这个就不能直接用 index.html 了，而要使用一种模板语言。模板有多种，其中 pug 是常

见的一种。

先来装包：

```
npm i --save pug
```


index.js 代码修改如下

```
const session = require('express-session')
+const pug = require('pug');
+app.set('view engine', 'pug')
+

app.use(session({
  secret: 'keyboard cat',
@@ -15,7 +18,8 @@ app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  console.log('home page', req.session.username);
-  res.sendFile('index.html', {root: 'public'});
+  let currentUser = req.session.username;
+  res.render('index', { username: currentUser })
})
```

删除 public/index.html ，新增 views/index.pug 文件

```
html
  body
    p= '当前用户名是：'
    h1= username
```

这样，再次登录一下，跳转到首页，就能显示出当前用户名了。

### 添加 logout 功能

index.js 中

```
const session = require('express-session')
+const pug = require('pug');
+app.set('view engine', 'pug')
+

app.use(session({
  secret: 'keyboard cat',
@@ -15,13 +18,18 @@ app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function(req, res){
  console.log('home page', req.session.username);
-  res.sendFile('index.html', {root: 'public'});
+  let currentUser = req.session.username;
+  res.render('index', { currentUser })
})
app.get('/login', function(req, res){
  res.sendFile('login.html', {root: 'public'});
})

+app.get('/logout', function(req, res){
+  req.session.destroy();
+  res.redirect('/');
+})
app.post('/login', function(req, res){
  let username = req.body.username;
```

views/index.pug 的功能为：

```
html
  body
    if currentUser
      span= currentUser
      a(href='/logout') 退出
    else
      a(href='/login') 登录
```

### 单页面应用中 Cookie 使用不方便了

涉及到跨域问题，在 React-Axios 环境下，收发 cookie 默认都是不允许的，所以 req.session 的使用意义不大了。

参考文档

[codeforgeek](https://codeforgeek.com/2014/09/manage-session-using-node-js-express-4/)

Everything You Ever Wanted To Know About Authentication in Node.js
