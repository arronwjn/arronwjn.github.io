---
title: github
---


### 准备工作：删除第一天创建的项目

如何删除一个 github.com 的仓库呢？

首先到仓库页面：https://github.com/funnydeer/funnydeer.github.io

点 Settings（设置）这一个标签。打开的页面底部有一个 “Delete this repository” 按钮，意思是”删除这个仓库“，点击按钮。打开的界面中，输入一下这个仓库的名字 funnydeer.github.io 就可以把这个仓库删除了。

删除仓库之后，我们要做的事情是：

如何把本地已有的仓库上传到github

### 第一步：创建本地项目

项目名称是任意的，但是我们这里想做的事情是上传比较，所以，本地这个仓库名要和github上项目保持一致

### 第二步：创建github.com上的同名仓库

### 添加 ssh key

为了达成开发机和 github.com 的互信。因为开发过程中，我们需要用本地机器向 github.com 的仓库中 写东西（ git push ），同时我们又不想每次都输入密码，所以我们就用 ssh key 的形式来达成互信，过程 如下：

在本地机器上生成一对 ssh key ，一个公钥，一个私钥
把公钥添加到 github.com
具体操作如下：

首先本地运行 ssh-keygen 命令
到 ~/.ssh/id_rsa.pub 也就是公钥文件中，拷贝公钥字符串
把字符串粘贴到 github.com -> setting -> ssh keys -> add
这样添加 ssh key 的工作就完成了，以后我们执行 git push 这样的命令就不会看到如下错误了：

...permission denied...
...make sure ... correct access right ...
大功告成。

git clone 命令

要想把 github 上的一个项目代码下载到本地有两种方式，一种就是普通下载（ download ）。但是，开发者 基本上会选择另外一种方式，就是 clone 。

git clone git@github.com:happypeter/digicity.git
clone 的特点就是不仅仅可以得到最新代码，而且可以得到整个改版历史。而普通下载只能得到最新版本。

### git 各个命令的作用

- git push 把本地仓库中有，而远端对应仓库中没有的版本推送到远端
- git pull 把远端仓库中有，而本地对应仓库中没有的版本拉到本地
- git clone 把远端仓库，克隆到本地

### 添加门牌号

```
git remote add origin https://git.coding.net/arronwjn/arronwjn.git
```

查看门牌号：

```

cat .git/config
```

上传到github

```
git push -u origin master
```
