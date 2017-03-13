---
title: HTTP简介
---

HTTP 全称就是“超文本传输协议”，超文本就是 HTML 。 我们的浏览器和服务器进行通信，就是通过 HTTP 来进行的。

### 起步走

如果你跟大多数人一样，那么到现在你应该已经使用了很长时间的互联网了。每次都在浏览器顶部输入那些讨厌的 URL 网址，先写个 HTTP 啊，然后冒号，斜杠斜杠，然后三个大不留 (w)，接着是一串所谓域名的东西，每次上网都重复，但是你从来不知道这些到底代表了什么。

每天，网上都有大量的图片，视频，HTML 页面等等这些东西飞来飞去，从服务器上送到我们的浏览器里，这个过程都是用 HTTP 协议来传输数据的。所以理解 HTTP ，不管是对于做网站，还是做 Web App ，都是非常重要的基本功。

### Web 客户端和服务器端

Web 是”网“的意思，但是 internet 也是“网”的意思。Internet 是有多台计算机互联组成的网络，Web 是有多个网页通过超级链接组成的网。Internet 主要通过 tcp/ip 来连接，Web 通过 http 协议来连接。

Web 内容都是存储在 Web 服务器上的，Web 服务器都是用 HTTP 协议的，因此也被称为 HTTP 服务器。HTTP 服务器存储了各种类型的数据，如果 HTTP 的客户端发出 **请求** 的话，服务器就会返回数据给客户端，叫做 **响应**。请求（ request )和响应（ response ）都是重要的术语，后面我们会反复用到，这里要脑子里先划一道印。

HTTP 的服务器和客户端是万维网（ World Wide Web ）的基本单元。其实我们每天都在使用 HTTP 的客户端，最常见的客户端就是浏览器。浏览一个页面的时候，浏览器会向服务器发出一个 HTTP 请求。等到服务器响应返回之后，浏览器再去处理响应数据，以美观的形式展示给用户。

### HTTP 的请求和响应

HTTP 协议最重要的两个概念就是请求（ request ）和响应（ response )。

请求是由浏览器发出的，响应是由服务器给出的。

请求由 **请求头** 和 **请求主体** 组成。响应由 **响应头** 和 **响应主体** 来组成。


### 代码演示

来写一个简单的 HTTP 服务器：

index.js 如下

```js
const express = require('express');
const app = express();

app.get('/', function(req, res){
  console.log('hello');
  res.send('hello world');
})

app.listen(3000, function(){
  console.log('running on port 3000...');
});
```
然后启动后台

### 请求响应

前台如果用浏览器发请求，也能完成整个循环，但是看不到底层数据。所以我们用 curl 代替 浏览器来发请求：

```
curl -X GET localhost:3000 -v
```

上面 -v 参数，表示”显示详情“ 。最终输出内容如下：

```
* Rebuilt URL to: localhost:3000/
* Hostname was NOT found in DNS cache
*   Trying ::1...
* Connected to localhost (::1) port 3000 (#0)
> GET / HTTP/1.1
> User-Agent: curl/7.37.1
> Host: localhost:3000
> Accept: */*
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 11
< ETag: W/"b-XrY7u+Ae7tCTyyK7j1rNww"
< Date: Sat, 17 Dec 2016 01:40:49 GMT
< Connection: keep-alive
<
* Connection #0 to host localhost left intact
hello world%
```

### 输出的结构分析

请求头：

```
> GET / HTTP/1.1
> User-Agent: curl/7.37.1
> Host: localhost:3000
> Accept: */*
```
请求主体：没有。一般 GET 请求，是没有请求主体的。POST 一般是有主体的。

响应头，如下

```
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: text/html; charset=utf-8
< Content-Length: 11
< ETag: W/"b-XrY7u+Ae7tCTyyK7j1rNww"
< Date: Sat, 17 Dec 2016 01:40:49 GMT
< Connection: keep-alive
```
响应主体：

```
hello world%
```

通常我们请求，就是请求一个 html 页面，那么响应主体就是：html 代码

# 故事的起点：发起 HTTP 请求

聊聊发起 HTTP 请求之后，表面那些事（用浏览器发起请求），和底层那些事（用 curl 工具发起请求）。这些我们观察到的现象就会是后续我们进行深入的 HTTP 知识讨论的起点

### 资源和 URL

HTTP 故事的开始是浏览器发出请求。但是请求的是什么呢？是服务器上的资源，英文叫 Resource 。

对应的每一个资源，都有一个 URL ，也就是统一资源定位地址，指向这个资源。不过资源分两种：

- 一种是静态资源，也就是各种文件了，最常见的就是静态 HTML ，但是也可以是 PDF ，json 文件等等。
- 另外一种，就是动态资源，也就是 URL 指向的地方不是一个文件，而是一段代码的入口，服务器经过运算后，才返回运算结果给客户端。


所以， 我们有 http://haoqicat.com/peter.txt ，这个 URL 就是指向一个静态资源的。如果是 http://haoqicat.com/username 这个可能就是指向动态资源的，后台对应的可能就是一个 API 。

### 浏览器的 HTTP 请求

发起一个 HTTP 请求很容易。比如你说你想用浏览器访问 haoqicat.com 。你所需要做的仅仅是启动浏览器然后在地址栏输入 http://haoqicat.com ，然后你就可以在页面中看到好奇猫网站的首页了。

那么底层发生了什么呢？首先，我们的浏览器作为 HTTP Client ，发出了一个请求给服务器

```
GET http://haoqicat.com/
```
上面的 GET 是 HTTP 方法（或者叫 HTTP 动词），这个后面我们会详细介绍的。

haoqicat.com 的服务器收到请求后，给出响应。响应中带有各种数据，html/css/图片 等等，返回到浏览器。 浏览器是理解这些文件格式的，所以可以最终展示一个美观的网页给用户。

### 使用 curl 发起请求

因为浏览器给我们展示的是处理过的服务器响应，我们看不到服务器发给我们的响应的本来面目。怎么样才能看到原始的 HTTP 响应数据呢？

为此，我们可以使用一个 HTTP 工具，就像用浏览器的时候我们输入网址一样，我们可以用 HTTP 工具发送一个请求到 haoqicat.com。我们的 HTTP 工具，curl ，不会处理响应数据，这样能让我们看到原始的请求和响应数据，大概长这样：

```
$ curl -X GET "http://haoqicat.com" -v
* Rebuilt URL to: http://haoqicat.com/
*   Trying 182.92.203.18...
* Connected to haoqicat.com (182.92.203.18) port 80 (#0)
> GET / HTTP/1.1
> Host: haoqicat.com
> User-Agent: curl/7.43.0
> Accept: */*
>
< HTTP/1.1 200 OK
< Server: nginx/1.4.6 (Ubuntu)
< Date: Fri, 09 Dec 2016 09:23:59 GMT
< Content-Type: text/html; charset=utf-8
< Transfer-Encoding: chunked
< Connection: keep-alive
< Vary: Accept-Encoding
<
<!DOCTYPE html>
<html>
<head>
  <title>haoqicat</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ...
</head>
<body>
...

</body>
</html>
* Connection #0 to host haoqicat.com left intact
```

稍微解释一下上面都发生了什么。首先我们输入了一个命令

```
$ curl  https://haoqicat.com -v
```

使用 curl 工具，向 haoqicat.com 发起了一个 HTTP 请求。请求方法为 GET 。如果看一下 man curl 也就是查看 curl 的手册，可以看到 -X 选项后面是专门用来指定 HTTP 方法的。最后的 -v 用来显示详情。所以我们才能看到比较详尽的后续输出内容。


# HTTP 请求的格式

### 请求行

第一行的内容被叫做 **请求行** （ Request Line ） ，具体形式如下

```
GET/POST [url] HTTP/[version]   GET / HTTP/1.1
```

这一行就是以HTTP 方法（ HTTP Method ）打头，一般是 GET 或者 POST ，当然还有其他不太常用的方法。 当我们用 GET 发请求的时候，一般我们就是想要从服务器上 GET （拿到）一些内容，而不是想去修改服务器数据。POST 正好就是用来修改服务器上的数据的。到底要 GET 或者要修改哪个资源，就是后面的 URL 这一项来指定了。上面例子中，请求的 URL 是 / 。最后就是跟 HTTP 字样，再跟上到底是使用的哪个版本的 HTTP 协议，目前一般都是 HTTP 1.1 了。

### 请求的头部 Headers

请求行下面的内容就是请求的头部了。英文叫做 Headers ，注意是复数。也就是这一项下面可以有多个 header

```
[header 名]：[header 值]
```

上节中我们请求中有三个 header

```
> Host: haoqicat.com
> User-Agent: curl/7.43.0
> Accept: */*
```

都是以冒号隔开的键值对。上面三项：

- 第一个，Host 代表被请求的主机，也就是 haoqicat.com
- 第二个，User-Agent 代表用户使用的客户端，我们这里用的是 curl
- 第三个，Accept 后面指明客户端可以接受的返回资源的类型，* 代表所有类型都接受
其他的 header 还有很多，可以参考 Wikepeida 上的列表 。

### 请求主体

请求主体其实严格的术语叫做请求的负载数据 payload 。

请求头之下，一个 request 中还可能包含负载数据（ payload ）。这一项，请求中不一定会包含，就像咱们上 一节的 request 中就没有这一项。GET 请求都是不带负载数据的，POST 请求带负载数据。这个挺好理解，POST 方法的请求 都是要改动服务器数据的，当然要在请求中携带数据过去。

比如，我们页面上有一个表单 form ，我们填写几项数据，然后一点提交，这个就会发出一个 POST 请求，而我们填写的数据， 就会作为 payload 成为请求的一部分。

> 一个 HTTP 请求，第一会有一个请求行，然后会有几项 header ，最后，可能会有 payload 。这个就是任何一个 HTTP 请求的基本格式了。


# HTTP 响应的格式

### 状态行

对于请求有请求行，响应的第一行也很特别，叫做状态行 （ status line ） ，基本格式如下

```
HTTP[版本号] [状态码] [状态信息]
```

一个实例

```
HTTP/1.1 200 OK
```

简单介绍一下状态码 。

- 20x 的状态码都代表某种成功状态。最常见的 200 ，它的意义，就正如它后面跟的状态信息一样，代表一切 OK 。
- 30x 的状态码，意味着资源已经被移动到其他地方了，但是响应中给出了应该跳转到哪里去找到这个资源。这个行为的 术语就叫做 redirect （重定向）。
- 40x 的代码也都是代表一种客户端请求错误 。一个最常见的状态码 404 ，它的意 义也跟它后面紧跟的状态信息所说的 一样：Page Not Found （页面未找到）。
- 50x 的状态吗也很常见。返回的如果是这一系列的状态码，就意味着服务器端在处理请求的时候出错 。50x 出现，对于开发者，一般意味着服务器端代码出了错误。


### 响应头部 Headers

跟请求一样，响应也有自己的 Headers 。基本格式也是

```
[ header 名]: [ header 值]
```

一个例子

```
Server: nginx/1.4.6 (Ubuntu)
Date: Fri, 09 Dec 2016 09:23:59 GMT
Content-Type: text/html; charset=utf-8
Transfer-Encoding: chunked
Connection: keep-alive
Vary: Accept-Encoding
```

这些信息基本上都是用来描述后面要介绍的响应主体数据的，例如，响应数据返回的时间，响应数据的格式（ html ）等等。

### 响应主体

响应主体，response body ，也可以叫做 payload 。在我们前面的例子中，响应主体就是这些：

```
<!DOCTYPE html>
<html>
<head>
  <title>haoqicat</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ...
</head>
<body>
...

</body>
</html>
```

> 响应的基本格式和请求的基本格式有着高度的一致性。
