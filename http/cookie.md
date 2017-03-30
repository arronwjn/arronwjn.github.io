---
title: Cookie
---


HTTP 的一个最大的特点就是它是无状态协议，基本的意思就是客户端发一次请求给服务器，走一个请求和响应的循环之后，服务器就立刻忘记可客户端，同一个客户端再次访问服务器的时候，服务器是不认识这个客户端的，也就是，客户端和服务器之间是不能保持一种“链接状态”的，所以说 HTTP 是一个无状态协议。

但是为了实现用户登录的一种状态（或者实现类似购物车这样的应用），我们必须要求我们的客户端跟服务器保持一种状态，所以 cookie 就被发明出来了。

### Cookie 的诞生

其实当时也就真是为了解决购物车的这种需求，为了达成浏览器跟服务器之间的一种持续连接状态，让服务器知道到底正在买东西的用户是谁， 在1993年的时候，网景公司发明了 cookie 这个技术。

Cookie 就是咱们所说的曲奇饼干，浏览器的 Cookie 可以翻译成浏览器的一个小文件。文件中的数据，会被设置成 http 请求的一个 header ，header 的名字就叫 Cookie ，让浏览器对这个 header 做特殊对待，每次发出请求的时候都会携带着 cookie 信息给服务器。

### 服务器端返回 cookie

那么浏览器的 cookie 里的数据是从哪里来的呢？Cookie 一般都是在服务器端设置的，通过 http 响应的头部返回给浏览器，浏览器拿到这些数据就可以保存到自己的 cookie 文件中。

例如，服务器代码写成

response.setHeader('Set-Cookie', 'id=123')
代码有了，上线到 tiger.haoduoshipin.com 之后，我们先用 curl 来测一下：

curl -I tiger.haoduoshipin.com/cookie-test
-I 加上就可以只显示响应的头部了。上面命令执行，可以看到响应头部中包含

'Set-Cookie', 'id=123'

### 浏览器中看效果

打开浏览器，访问 http://tiger.haoduoshipin.com/cookie-test

之后，在 chrome 开发者工具的 Application（App 的全称） -> Storage （存储） -> Cookies -> tiger.haoduoshipin.com 之下， 可以看到 id=123 这些信息已经被保存为了浏览器的 cookie 。也就是说，浏览器一旦看到服务器响应的头部信息中包含

'Set-Cookie', 'id=123'
这样的信息，就会把数据拿出来，保存到自己的一个特殊的小文件，也就是 cookie 中，便于后续每次请求服务器的时候使用这些信息。

### 后续行为

后续的默认行为就是，每次浏览器再去访问同一个域名，都会在请求的头部中携带 cookie 信息的。

可以请求一下试试，在浏览器的 Network 标签下，看每次的请求 Headers ，都会看到 cookie 数据的。

实际写代码验证一下，到服务器端，添加下面代码

const cookieParser = require('cookie-parser');
app.use(cookieParser());
...

app.get('/hello', function(req, res){
  res.send(req.cookies)
})
这样，当我们首次访问 GET /cookie-test 这个 API 之后，后续再去访问，任意其他接口，服务器端都可以收到 cookie 中的数据了。

### 使用 curl 测试带 cookie 的接口

curl 不是浏览器，所以不是每次 curl 请求都会自带 cookie 到服务器端的，需要明文指定，如下

```
$ curl -v --cookie "id=123" http://tiger.haoduoshipinc.com/hello
*   Trying ::1...
* TCP_NODELAY set
* Connected to localhost (::1) port 3000 (#0)
> GET /hello HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/7.51.0
> Accept: */*
> Cookie: peter=billie
>
```

后台可以看到

```
{ id: '123' }
```

### cookie 的限制

cookie 中存储的数据不能太多（小于4k），这就是为啥浏览器会有 local storeage 这种新机制。


### chrome搜索自身的DNS缓存

网址

```
chrome://net-internals/#dns
```
### 总结

cookie 是一个客户端硬盘上的一个小文件。可以通过在响应中设置 Set-Cookie 这一项来设置 cookie 中的数据，cookie 中的数据每次都会自动发往服务器端。
