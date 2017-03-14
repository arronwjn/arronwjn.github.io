---
title: 解决跨域请求问题
---


这时候，我们用 react 客户端实现一个请求，请求一下我搭建在公网上的 API 服务器。但是，此时不管请求任何 API ，后台都会触发跨域请求的保护机制。于是请求失败，浏览器 console 中的报错信息是：

```
XMLHttpRequest cannot load http://tiger.haoduoshipin.com/users/1. No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
```

### 解决方法


这个问题出现，我们作为前端开发者是无能为力的，只能同时后端开发者，修改服务器配置或者代码。

最终保证，我们在前台用 curl 测试

```
curl -I url.com/api
```

> 注： -I 的作用是显示请求头部。

要保证 access-control-allow-origin 这一项要存在，要么设成 * ，要么就是客户端实际域名。之后，前端开发可以继续进行。
