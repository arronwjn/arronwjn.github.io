---
title: AJAX请求
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
