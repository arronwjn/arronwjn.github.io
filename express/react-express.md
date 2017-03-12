---
title: 前端项目准备
---


前面的课程中，我们已经学习了 React 开发。那么先在就来写一个完全跟后台无关的 React 的 Hello World ，要求：

页面最终显示出来的，就是你的用户名，例如 happypeter
要用到 react 的 state ，constructor ，生命周期
用 ES6/Babel/Webpack
小贴士：创建 React 应用的脚手架项目 可以推荐的是 https://github.com/facebookincubator/create-react-app 但是，我们需要对 Webpack 底层做一些了解，所以暂时不推荐使用 脚手架 小贴士结束

所有代码都放到 react-frontend 这个文件夹中，代码如下：

src/index.js
```
import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class App extends Component {
  constructor(){
    super();
    this.state = {
      username: ''
    };
  }
  componentWillMount() {
    this.setState({username: 'happypeter'});
  }
  render(){
    return(
      <div>
        {this.state.username}
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
```

### 安装 http-server

前端代码其实最好也跑在一个 http 服务器之上，最简单的方法是：
```
npm install -g http-server
```

运行http-server

```
http-server .
```
### 实现 API

开发一个功能，好的做法是，先修改后端代码，也就是先实现 API ，然后下一步就是用 curl 这样的命令，来测试一下 API ，发现 API 没毛病，然后再动手去写前端代码。

打开 express-backend 中的 index.js 代码，添加下面这个 API

```
app.get('/username', function(req, res){
  res.send({username: 'happypeter'});
})
```
### 用 curl 来测试 API

curl 是一个安装在系统上的命令，可以用来发 http 请求，最适合用来测试 API 。

动手写前端代码之前，如果用 curl 测试一下 API ，会让写前端代码的时候，我们心里更踏实。

```
curl -X GET 'http://localhost:3000/username'
```
> 注意：执行curl，要先启动后端

### 安装 axios 发送 http 请求

现在我们来到前端代码中。引入 axios 。axios 按照官网的说法，它是一个 http client （ http 的客户端），换句话说，它是专门用来发 http 请求的。

axios 是常用的发 http 请求的工具（现在一般不提发 ajax 请求这个说法了）

首先来进行装包：
```
npm install --save axios
```
把 axios 安装到 react-frontend 这个项目中。

装包之后，就可以到 src/index.js 中去使用了，代码如下
```
import axios from 'axios';
```

我们当前的请求不希望是通过按钮来触发，而是希望，页面加载的时候，自动发出 http 请求，向服务要数据，所以，代码非常适合写到生命周期函数中：

```
componentWillMount() {
  axios.get('http://localhost:3000/username').then(function(response){
      return console.log(response);
    }
  )
}
```

### 跨域请求 Access-Control-Allow-Origin

代码进行到上面，浏览器中用前台请求后台，会在 chrome console 中看到，如下 错误：

```
XMLHttpRequest cannot load http://localhost:3000/. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
```
XMLHttpRequest 是发 HTTP 请求的底层机制，是浏览器自带功能。上面的报错翻译如下：

```
无法加载后台 http://localhost:3000 . 被请求的资源中没有设置 Access-Control-Allow-Origin 头部。源头设置为 Null ，所以不允许 访问。
```
Access-Control-Allow-Origin 字面意思：访问控制允许来源。服务器上的默认是不允许其他网址（或者网址相同，但是端口号不同）的网站请求资源的（也就是默认不允许跨域请求），如果需要开通权限，就需要设置这个选项。

那么，如何开通服务器上的这个资源访问权限呢？就是要在服务器上做下面的设置

```
Access-Control-Allow-Origin: *
```

有了这个设置，所有的第三方网站都可以访问服务器上的资源了。

### 跨域请求的解决方案

解决方案采用： https://github.com/expressjs/cors

cors 是 Cross Origin Resource Share ，安装了这个包就可以完成

```
Access-Control-Allow-Origin: *
```

这个设置了。

保证后台启动状态，现在我们看看当前后台资源的 header 设置，可以用下面的 curl 命令

```
$ curl -I http://localhost:3000/
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/"b-sQqNsWTgdUEFt6mb5y4/5Q"
Date: Thu, 08 Dec 2016 01:51:44 GMT
Connection: keep-alive
```
curl 的 -I 选项用来专门拿到服务器返回的 header 。命令返回的信息，就是服务器端被请求资源的的 header 。上面很明显是没有 Access-Control-Allow-Origin 这一项的。下面我们安装 cors 这个包，就可以解决这个问题。

具体步骤如下：

到 https://www.npmjs.com/package/cors 可以看到装包命令如下：

```
npm install --save cors
```
> 再次提醒：这个包要安装到后台代码中。

然后按照文档，添加下面两行代码，再重启服务器代码：

```
const cors = require('cors')
app.use(cors());
```
接下来再用 curl -I 看看输出如下：

```
HTTP/1.1 200 OK
X-Powered-By: Express
Access-Control-Allow-Origin: *
Content-Type: text/html; charset=utf-8
Content-Length: 11
ETag: W/"b-sQqNsWTgdUEFt6mb5y4/5Q"
Date: Thu, 08 Dec 2016 02:17:23 GMT
Connection: keep-alive
```
这样，我们就看到了 Access-Control-Allow-Origin: * 。

浏览器中，刷新一下，可以看到后台返回的 response 数据了。错误没有了。

### 调整接口数据格式

后台代码中，添加下面两个 API

```
app.get('/username', function(req, res){
  res.json({"username": "happypeter"});
})
```
对应，到前台代码中，调整 componentWillMount ，如下：

```
componentWillMount() {
  axios.get('http://localhost:3000/username').then(function(response){
      return console.log(response.data.username);
  })
}
```
这样，前台的 console 中，就可以看到返回数据

```
happypeter
```
下面进一步调整 componentWillMount 如下：

```
componentWillMount() {
  axios.get('http://localhost:3000/username').then((response) => {
      this.setState({username: response.data.username});
  })
}
```
### 总结

至此，前台页面上成功显示出了，后台的数据。这样，一个前后端分离架构，通过 API 通信的应用，我们就完成了。
