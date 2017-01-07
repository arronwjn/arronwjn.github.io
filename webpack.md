---
title: webpack
---

webpack是一款强大的模块加载器兼打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。

接下来我们将一步步熟悉Webpack的使用，并使用它来搭建一套前端工作流。

### 初始化项目

创建一个项目

```
$ mkdir webpack-demos && cd webpack-demos
$ git init
$ touch README.md .gitignore
$ npm init
```

编辑.gitignore

```
node_modules
*.log*
.idea
```

建立src和build两个目录

```
// src 目录存放源码，build 目录存放编译打包之后的资源
$ mkdir src build
$ cd src && touch index.js component.js
$ cd ../ && touch index.html
/* src/index.js */
var component = require('./component.js');

component();
/* src/component.js */
module.exports = function(){
  alert('component');
}
/*index.html */
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Webpack demos</title>
</head>
<body>
  <div id="app"></div>
  <script src="./build/bundle.js"></script>
</body>
</html>
```

下载webpack和webpack-dev-server

```
# 安装并保存在项目的依赖中
$ npm install --save-dev webpack webpack-dev-server
# 如果想直接在命令行使用webpack或webpack-dev-server命令，请全局安装
$ npm install -g webpack webpack-dev-server
```

创建webpack的配置文件

```
$ touch webpack.config.js
```
> 请注意webpack.config.js这个文件命名，默认情况下需要严格按照这个命名，不然会报Output filename not configured的错误；另外，如果不按这个命名，那么在webpack运行的时候通过--conf这个参数指定配置文件，比如：webpack --config conf.js

进行基本配置

```
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
};
```

执行webpack命令,这里我们用的是项目内安装的webpack

```
$ ./node_modules/.bin/webpack
```
可以看到控制台出现如下信息：

```
Hash: cf7cc9272c664f542fcb
Version: webpack 1.13.0
Time: 80ms
    Asset     Size  Chunks             Chunk Names
bundle.js  2.04 kB       0  [emitted]  main
   [0] ./src/index.js 60 bytes {0} [built]
   [1] ./src/component.js 57 bytes {0} [built]
```
build目录下也新增了一个bundle.js文件


### webpack和webpack-dev-server的基本命令

```
$ webpack --help
```
执行以上命令，可以在控制台看到很多webpack相关的命令，选取几个常用的介绍下。

- webpack 开发环境下编译
- webpack -p 产品编译及压缩
- webpack --watch 开发环境下持续的监听文件变动来进行编译(非常快!)
- webpack -d 引入 source maps
- webpack --progress 显示构建进度
- webpack --display-error-details 这个很有用，显示打包过程中的出错信息
- webpack --profile 输出性能数据，可以看到每一步的耗时
