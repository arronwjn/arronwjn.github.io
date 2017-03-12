---
titlt: full-stack
---

### 打通全栈

这一节算是前面的几节内容的综合使用。所谓全栈项目，要有这几层技术组成：

- 最贴近用户的，是 React
- HTTP 请求，用 axios
- 后台，我们使用 express
- 最底层，海量数据，用 Mongodb

### 使用 Mongoose 来查询所有用户

首先，保证 mongodb 处于运行状态，然后，通过　mongo-express 查看一下， mongodb 中是否有多个用户。

成熟的工程师，你给他 Mongoose 的　API 文档 他就有能力完成这个任务了。但是如果你属于开发新手，还是要先通过教程，来学习一些最基本的使用，后续才会有能力看 API 文档。

参考：http://haoqicat.com/react-express-api/5-rest-api

到后台代码的 index.js 文件中，把 db.once 部分的修改成下面这样：

```js
db.once('open', function() {
  User.find().exec(function(err, users) {
    console.log(users);
  });
});
```
这样，我们到　express-backend 文件夹中，运行，可以看到如下输出结果

```js
$ node index.js
running on port 3000...
[ { _id: 584b62b830a2a2cbf4c4c3f6,
    username: 'billie66',
    email: 'billie@billie66.com' },
  { _id: 584bb045ff8f0f1c7ba4fe24,
    username: 'inCode',
    email: 'inCode@incode.com',
    __v: 0 } ]
```
可以看到，终端中可以打印出所有数据文档。证明我们的　mongoose 的　find() 接口 使用正确。

但是，我们为何不把代码写成这样呢？

```
let users = User.find();
conole.log(users)
```
答案是：　find() 接口是一个异步函数，所以它的返回值　users 只能 在回调函数中使用。.exec 字面意思就是执行，我们把回调函数传给它做参数。

### 用 API 来返回　JSON

上面数据虽然拿到，但是如果想提供给客户端使用：

- 第一步，把它要封装成一个　API
- 第二步，数据格式转换为　JSON

先来做第一步，代码做出如下调整：

```js
db.once('open', function() {
  console.log('success');
});

app.get('/users', function(req, res){
  User.find().exec(function(err, users) {
    console.log(users);
  });
})
```
上面把　User.find() 代码封装到了一个　API ( Web API ) 。这样， 触发条件就变了。只有当客户端发出　GET /users 请求的时候，User.find() 代码才会被执行。

暂时，我们用　curl 来模拟一下客户端请求：

```
curl -X GET http://localhost:3000/users
```
但是，此时，curl 请求不到任何返回信息，因为　console.log(users) 只会把 信息打印到后台终端。curl 请求不到信息，未来浏览器也就请求不到。所以要把这一行 改为

```
// res.send() 可以数据返回给客户端，但是我们要的是　json ，所以用下面接口
res.json()
```
也就是要写成这样：

```
app.get('/users', function(req, res){
  // res.json({"users": "happypeter"});
  User.find().exec(function(err, users) {
    res.json({users});
  });
})
```
这样，再用　curl 请求一下，前台就能读到数据了，如下

```
$ curl -X GET http://localhost:3000/users
{"users":[{"_id":"584b62b830a2a2cbf4c4c3f6","username":"billie66","email":"billie@billie66.com"},{"_id":"584b760498d7b520b68a05cd","username":"pppaaa"},{"_id":"584bb045ff8f0f1c7ba4fe24","username":"inCode","email":"inCode@incode.com","__v":0}]}
```
这样，后台代码就准备完毕。

### 后台代码

express-backend 文件夹中，有下面的文件：

index.js

```js
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/digicity');
// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口



var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
});


// 下面三行就是我们实现的一个 API
app.get('/users', function(req, res){
  // res.json({"users": "happypeter"});
  User.find().exec(function(err, users) {
    res.json({users});
  });
})


app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

models/user.js

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String }
  }
);
module.exports = mongoose.model('User', UserSchema);
// `User` 会自动对应数据库中的　users 这个集合
// 如果这里是　Apple 那么就会对应　apples 集合
// 如果这里是　Person 那么就会对应　people 集合
```

### 前台书写　axios 请求

到　react-frontend/　也就前台项目中，修改生命周期函数如下：

```js
componentWillMount() {
  axios.get('http://localhost:3000/users').then((response) => {
    console.log(response);
      // this.setState({username: response.data.username});
  })
}
```
这样，就可以看出　response 中的数据结构了，我们想要的数据可以这样拿到

```js
constructor(){
  super();
  this.state = {
    users: []
  };
}
componentWillMount() {
  axios.get('http://localhost:3000/users').then((response) => {
      this.setState({users: response.data.users});
  })
}
```

### 使用 map 展开数组

render 函数做如下调整：

```js
render(){
  const userList = this.state.users.map((user, i) => {
    return (
      <div key={i}>
         username:
        {user.username}
      </div>
    )
  });

  return(
    <div>
      { userList }
    </div>
  )
}
```
这样，页面中就可以显示出所有用户的用户名的列表了。

# 前台向后台传递参数

前台在发 axios 的 http 请求的时候，我们要携带一个参数到服务器端。这里，参数的本质就是字符串。所以这一节就是把一个任意字符串，从前台传到后台。

比如，我们现在想把一个 “123456” 这个字符串，传递一下。

### 前台发送请求

那么前台的请求我们可以这样写

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  handleClick(e){
    e.preventDefault();
    console.log('handleClick......');
    axios.get('http://localhost:3000/users/123456').then((response) => {
      console.log(response);
    })
  }
  render(){
    return(
      <div onClick={this.handleClick.bind(this)}>
         clickme
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
```

> 解释一下：这里我们传递的字符串是 123456 但是未来还可能替换成 任意的字符串

### 后台代码

```js
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());


app.get('/users/:id', function(req, res){
  console.log(req.params.id)
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```
> 说明：req 是 request 请求的缩写，express 用这个变量来接收前台发过来的请求。 res 是 response 响应的缩写，用来响应前台发过来的请求，实际作用就是往前台发送数据。

注意，前台的请求是：

```
GET /users/123456
```

后台如果 API 写成这样：

```
app.get('/users'...)
```

是匹配不上的。可以写成

```
app.get('/users/123456'...)
```

但是这样前台能传递的字符串就限制死了。所以最好就是使用 express 的 params （param 是英文参数的简写） 机制来进行处理，也就是写成如上的

```
app.get('/users/:id')
```

> 注：上面的 id 写成其他的单词也可以，关键点就是前面的冒号。这样写之后 前台请求中的字符串，就可以在后台通过 req.params.id 这个变量来拿到了。

前台能向后台传递数据的方式并不唯一。我们这里介绍的是最简单的一种。

### 显示一个用户的信息

以下知识的综合应用

- MongoDB 数据库基本操作
- Mongoose 这个 JS 库的使用
- 前台向后台传递参数：涉及 axios 和 express 配合
- React 基本操作

我们要完成的任务是，用户在浏览器中点按钮，发　axios 请求访问这个链接：

```
http://localhost:3000/users/一个真实的用户 id
```
页面上要能显示出用户名和邮箱。

### 前台代码

我们先打开 mongo-express ，拷贝一个真实的 id 出来。然后粘贴到 前台代码的 axios 请求中

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }
  handleClick(e){
    e.preventDefault();
    axios.get('http://localhost:3000/users/584dfb6fd5aa1c13955d5cca').then((response) => {
      console.log(response);
      this.setState({
        user: response.data
      });
    })
  }
  render(){
    return(
      <div>
        <div onClick={this.handleClick.bind(this)}>
           clickme
        </div>
        <div>
          username:
          { this.state.user.username }
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App/>,document.getElementById('app'));
```

### 后台增加请求一位用户信息的API

src/index.js

```js
const express =  require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost:27017/digicity');
// 执行此行代码之前，要保证 mongodb 数据库已经运行了，而且运行在 27017 端口

var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('success');
});

// 下面三行就是我们实现的一个 API
app.get('/users/:id', function(req, res){
  User.findById(req.params.id,function (err,user) {
    console.log(user);
    res.json(user)
  })
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```

models/user.js

```js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String }
  }
);
module.exports = mongoose.model('User', UserSchema);
```
package.json

```js
{
  "name": "express-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.1",
    "express": "^4.14.0",
    "mongoose": "^4.7.2"
  }
}
```
### 总结

这样，前台打开 index.html 文件，点一下 clickme ，就可以在页面上 显示出从后台 mongodb 中取出的用户的 username 了。
