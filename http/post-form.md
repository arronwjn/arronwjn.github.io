---
title: 用 POST 发复杂数据到服务器（ form 篇 ）
---


浏览器中发 POST 请求，地址栏是无法做到的，通常有两种方式可以：一种就是用 html 的 form ，另外一种是 HTTP 客户端，例如 axios/fetch 。今天我们先介绍 form 的这种形式。


### 内容类型 Content-Type

现在咱们先来写一个 React 组件，里面写一个 from ，也就是表单。

```
<form method="post" action="http://localhost/login">
  <input name="username" type="text" />
  <input type="submit" />
</form>
```

代码跑起来，填写表单（用户名 happypeter ），点 submit 按钮，发出一个 POST 请求，可以在 chrome 开发者工具的 Network 标签下看到，请求的头部（ Headers ） 中包含

```
Content-Type: application/x-www-form-urlencoded
```

表示发送的数据，的内容类型是 application/x-www-form-urlencoded 。这个要记住。

### 请求的主体

同样，在 chrome 的 Network 标签下，也可以看到，请求主体

```
username=happypeter
```

使用 curl 来模拟上面的表单提交

```
$ curl -H "Content-Type: application/x-www-form-urlencoded" -X POST -d 'username=peter' localhost:3005/login -v

> POST /login HTTP/1.1
> Host: localhost:3005
> User-Agent: curl/7.51.0
> Accept: */*
> Content-Type: application/x-www-form-urlencoded
> Content-Length: 14
```

> 注：上面的 -H "Content-Type: application/x-www-form-urlencoded" 可以省略，省略后发出的请求不会变。

上面的输出中看不到请求主体，可以用下面的命令看到：

```
$  curl -H "Content-Type: application/x-www-form-urlencoded" -X POST -d 'username=peter' localhost:3005/login -v --trace-ascii /dev/stdout
```

### 请求行

请求头部的第一行叫做请求行 ，打开 chrome 开发者工具，点开相应请求， 看到我们这次请求的请求行如下：

```
POST /login
```

请求是由 form 发出的，对照代码我们会发现，action='/login' 对应这里请求行的 /login 链接这一部分，method='post' 对应了请求行中的 POST ，也就是请求方法为 post 。

同时，前台的请求方法和链接，要跟后台 express api 中的方法和链接对应上，才能正确触发后台的对应 api 所以，后台处理这次请求的 api 应该写成：

```
app.post('/login', function(){
  ...
})
```

可以这样说，form 的 action 和 method 的值，就决定了，点 submit 按钮的时候，form 发出的请求是

```
POST /login
```

而，前台请求的格式，就决定了，后台 api 的匹配格式，就是

```
app.post('/login', ...)
```

具体后台 API 的实现，那是后台开发者的事情了。
