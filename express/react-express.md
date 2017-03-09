---
title: react牵手Express
---

### 前端项目准备

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
