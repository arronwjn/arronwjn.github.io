---
title: AJAX请求和Storage
---

### 原生AJAX请求

```
var ajax=new XMLHttpRequest();
ajax.onreadystatechange=function(){
  if(ajax.readyState==4&& ajax.status==200){
    let data=JSON.parse(ajax.responseText)
    document.getElementById('name').innerHTML=data.login
  }
}
ajax.open("GET","https:api.github.com/users/arronwjn",true)
ajax.send()
```

### jquery的AJAX请求

```
$.ajax({
  type:'GET',
  dataType:'jsonp',   //发post请求必须往后台发json类型,解决跨域请求要变成jsonp
  jsonp:'callback', //解决跨域请求还要加这个，而且type要改成GET
  data:{
    accesstoken:'3aae6c64-7539-44d7-8494-ff0acaa36ce1'
  },
  url:'https://api.douban.com/v2/book/1220562',
  success:function(data,status){
    console.log(data,status);
    $('#name').html(data.login);
    $('#name').append(`<img src="${data.avatar_url}"/>`)
  },
  error:function(xhr,mes){
    console.log(mes);
  }
})
```
  跨域请求http协议的规定就是不同源之间不能进行资源共享
  http://api.github.com:80这一段如果有不同的都叫跨域
  一般后台设置

### fetchAJAX请求

```
fetch('https://api.github.com/users/newming',{method:'GET'})
    .then(response=>response.json())
    .then(json=>console.log(json))
    fetch('https://cnodejs.org/api/v1/accesstoken',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({accesstoken:'3f77acb1-d753-4393-b784-44913190e6a8'
      })
    })
    .then(res=>res.json())
    .then(json=>console.log(json))
```

### axios发送请求

```
axios.get('https:api.github.com/users/arronwjn')
    .then(res=>console.log(res))
    .catch(error=>console.log(error));

    axios.post('https://cnodejs.org/api/v1/accesstoken',
    {accesstoken:''}).then(res=>console.log(res)).catch(err=>console.log(err))
```
### 总结

发送ajax请求的几种方式
原生    XMLHttpRequest()
jquery $.ajax({type:'POST',data:string,success:function(){}})
fetch  fetch('url').then(res=>res.json()).then(json=>do()).catch(err=>console.log())
axios

# localStorage

Storage的方法
```
Storage.key()[https://developer.mozilla.org/zh-CN/docs/Web/API/Storage/key]
```
该方法接受一个数值 n 作为参数，并返回存储中的第 n 个键名。
```
Storage.getItem()
```
该方法接受一个键名作为参数，返回键名对应的值。
```
Storage.setItem()
```
该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。
```
Storage.removeItem()
```
该方法接受一个键名作为参数，并把该键名从存储中删除。
```
Storage.clear()
```
调用该方法会清空存储中的所有键名。

SessionStorage, LocalStorage, Cookie这三者都可以被用来在浏览器端存储数据，而且都是字符串类型的键值对！。 区别在于前两者属于WebStorage，创建它们的目的便是存储客户端数据。 而Cookie早在网景公司的浏览器中就开始支持，最初目的是为了保持HTTP的状态。
LocalStorage和SessionStorage都是本地存储，不会被发送到服务器上。同时空间比Cookie大很多，一般支持5-10M。 与Cookie类似，每个域名下会有不同的localStorage和SessionStorage实例，而且localStorage可以在多个标签页中互相访问。 其中LocalStorage没有过期时间，除非手动删除它会一直存在。而SessionStorage在浏览器会话结束时（关闭标签页，不包括刷新和跳转）清空。

> 注意SessionStorage中的Session指的是浏览器会话，而非服务器端通过Cookie实现的Session。

### Storage的使用

LocalStorage/SessionStorage提供的存储也是基于字符串的键值对。可以通过setItem，getItem来访问其中的存储项：

```
localStorage.clear();
localStorage.setItem('key', 'value');
localStorage.getItem('key');     // => 'value'
localStorage.removeItem('key');
```
因为它只能存储字符串，要存JSON只能序列化为字符串：

```
var testObject = { 'one': 1, 'two': 2, 'three': 3 };

// Put the object into storage
localStorage.setItem('testObject', JSON.stringify(testObject));

// Retrieve the object from storage
var retrievedObject = localStorage.getItem('testObject');

console.log('retrievedObject: ', JSON.parse(retrievedObject));
```

再来看个小例子：
```
import React from 'react';

class Test extends React.Component{
  constructor(){
    super();
    this.state={
      arr:[]
    }
  }
  componentWillMount(){
    if (localStorage.todos) {
      this.setState({arr: JSON.parse(window.localStorage.getItem('todos') || '[]') })
    }
  }
  render(){
    localStorage.setItem('todos',JSON.stringify(this.state.arr))
    return(
      <div style={styles.root}>
      </div>
    )
  }
}
export default Test;
```
