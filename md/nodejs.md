---
title: nodejs
---

### nodejs安装

安装 node 的方式很多，这里推荐用 nvm 装 node。

安装 nvm 可以直接到 github 上找到 nvm 这个仓库查看安装命令

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
```
接下来就可以用nvm 去安装 nodejs 了

nvm ls-remote  # 查看可以选择安装的 node 版本
nvm install v7.4.0 # 安装 7.4.0 的 nodejs
安装完 node 之后，npm 一块跟着装好了。

查看node/npm版本
```
node -v
npm -v
```

### 使用npm初始化一个node项目

npm init 创建nodejs仓库，生成package.json

### 使用npm命令安装模块
- npm install <package name> --save 用npm下载包，安装的包会记录到 package.json 的 dependencies
- npm install <package name> --save-dev 安装的包会记录到 package.json 的 devDependencies
- npm install <package name> -g 安装到我们本地的电脑上

### 卸载模块
npm uninstall <package name>

其它命令：
npm help
npm cache clear  #可以清空NPM本地的缓存
npm unpublish @[版本号]  #撤销发布的某个版本的模块
