---
title: webpack-demos
---

### webpack-Babel编译ＥS６

浏览器对Ｅs６兼容性不是很好，所以需要把Ｅs6编译成Ｅs5

- 第一步需要用npm下载如下包

```
babel-loader  babel-core
```
- 第二步创建.babelrc配置文件,里边添加｛ "presets": ["env"｝,添加完之后需要再下载 babel-preset-env包

- 第三步创建webpack配置文件webpack.config.js,配置文件里代码如下

```
var path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel'
      }
    ]
  }
};
```
- 第四步在创建入口文件index.js里面写Es6语句

为了展示浏览器中的运行效果，来添加一个 index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script src="./dist/bundle.js"></script>
</body>
</html>
```
- 第五步编译执行，在终端运行命令如下

```
webpack
```

### webpack的配置文件webpack.config.js

配置文件里要指定入口文件和出口文件，module里写下载编译的包的配置

```
module.exports={
  entry:'./es6.js',　　　//指定入口文件
  output:{
    path:'build',　　　　　　//出口文件所在文件夹
    filename:'bundle.js'　　//出口文件
  },
  devtool:'eval' ,//找到源代码错误
  resolve:{                   //解决文件后缀省略
    extensions: [".js",".css",".jpg",".png"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,　　　　//编译.js文件
        exclude: /node_modules/,
        use: "babel-loader"  //用babel-loader包编译
       }
    ]
  }
}

```

### webpack打捆Es6模块

Webpack 可以支持的模块格式不局限于 ES6 模块 ，但是由于我们写 React 项目主要用 ES6 来写，所以这一集就来演示一下用 Webpack 打捆 ES6 模块。

模块的命名导出和默认导出

我们这一集的重点并不是讲解模块的基础知识。但是还是顺便提一下 ES6 模块可以支持命名导出和默认导出两种形式。

src/index.js 如下:

```
import  i from './a';
import { j, k } from './a';

console.log(i);
console.log(j);
console.log(k);
```

src/a.js 如下:

```
const i = 1;
const j = 2;
const k = 3;

export { j, k };

export default i;
```
执行 webpack 命令，可以把 index.js 和 a.js 打捆成一个 bundle.js 文件，浏览器中运行，chrome console 中会打印出
