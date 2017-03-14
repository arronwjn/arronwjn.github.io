---
title: 用 POST 传复杂数据到服务器（ axios 篇）
---


在 React 应用中，比较少会用到 form 直接提交数据的形式，而更多是采用更为灵活的一种方式， 那就通过 axios/fetch 这样的 http 客户端来发 POST 请求。

跟 from 提交形式不同，axios 提交的内容类型是

```
Content-Type: application/json
```

### 后台代码

基本上就是在上节的基础上，修改一行代码即可

```
--- app.use(bodyParser.urlencoded());
+++ app.use(bodyParser.json());
```

json 接口，可以到 [body-parser](https://github.com/expressjs/body-parser) 的 Readme 中查到。


### 使用 curl 调试 api

```
curl -H "Content-Type: application/json" -X POST -d '{"username":"happypeter"}' http://localhost:3000/login
```

上面代码中，-H 用来设置头部（ header ），这里我们设置的值是 Content-Type: application/json 。-X 用来设置请求方法，这里设置的值是 POST 。-d 用来设置数据， 具体的值就是后面的 json 字符串。


### 前台实现 axios 代码

react 代码如下：

index.js

```js
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      msg: "plz login"
    };
  }
  _handleSubmit(e){
    e.preventDefault();
    const username = this.refs.username.value;
    console.log(username);
    axios.post('http://tiger.haoduoshipin.com/login', {username}).then(res => {
      console.log(res);
      this.setState({msg: res.data.msg});
    })
  }
  render(){
    return(
      <div>
        <div>{this.state.msg}</div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input ref="username" />
          <input type="submit" />
        </form>
      </div>
    )
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
```

这样就可以发送跟前面 curl 命令一样效果的请求了。 chrome 中查看，请求 Headers 中有：

```
Content-Type:application/json;charset=UTF-8
```

表示 axios 的数据，默认就是按照 application/json 发送的。

### 总结

使用 axios 发送数据，是最为灵活和强大的一种方式，以后我们会用到的比较多。
