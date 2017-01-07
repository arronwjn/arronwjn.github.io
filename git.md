---
title: git本地交流
---

git和github是两个不同的东西，git是一个软件，github是一个网站，浏览器访问github.com

Git 是一个版本控制工具，通常我们都是通过本地 Git 和 Github 的互动来完成版本控制工作的。

通常我们的 Github 工作流是这样的：

- 第一步，在我们自己的笔记本上安装 Atom 和 Git
- 第二步，注册 Github 账号，并开启新仓库
- 第三步，在笔记本上做代码开发
- 第四步，通过 git push 命令来上传代码到 Github

OK，从上面流程可见，如果想要灵活运用 Github ，第一步先要学会 Git 的基本使用技巧。下面几个部分中，我们先来介绍 Git 的使用。

### git的安装

```
sudo apt-get update
sudo apt-get install git
```
> 注意：apt-get 是 ubuntu 系统（ deepin 其实就是 ubuntu 的一个变种）的安装软件的命令。装软件的过程其实非常复杂，涉及到软件包依赖关系管理，这个原来 Peter 做过专职的一年的这个工作。这个领域的深入知识，应该是系统管理员（ sys admin ）去掌握，我们开发者没必要学那么深。

验证有没有装好就敲

**git --versio**

如果输出版号证明已经装好

### Git 本地工作流（没有网络操作）可以分为以下几步：

- 第一步，使用 atom 创建并编辑项目
- 第二步，使用 git init 命令，把一个普通项目变成一个Git 仓库
- 第三步，使用 git add -A 命令，添加修改内容到 Git
- 第四步，使用 git commit -m"my commit msg" 命令，制作一个版本
- 第五步，如果是新用户要使用命令写用户名和邮箱，命令如下：

```
git config --global user.name  "Peter Wang"
git config --global user.email  "happypeter1983@gmail.com"
```
这样git本地工作流就完成了一个循环。

如果要修改用户名和邮箱要在主目录输入命令

```
atom .gitconfig
```

如果要查看制作的版本需要输入命令

```
git log -p
```
> 小技巧：q 可以退出 git log -p 的界面，敲 j 可以往下翻，敲 k 可以往上翻。
