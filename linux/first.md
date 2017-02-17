---
title: github简单使用
---

Github.com 是程序员存放代码的一个网站。Github Pages 是 Github 提供的一项服务，可以免费的帮助我们托管网站。

注册 Github 账号

- 点 github.com 首页的 Sign Up （注册）按钮，进行注册。

- 填写 username （用户名），小写英文字母，不要用空格。

- Email 这一项，必须填写真实有效的邮箱，不然注册不了

- Choose your personal Plan ? 选择你的付费方案

免费版：无限使用权限，只能发布开源项目
收费版：允许发布闭源项目
邮箱中点链接之后，就可以自动跳转回 github.com 的页面上，同时显示

Your email was verified.

你的邮箱已经验证成功了。下一步就可以来创建项目了。

repository （仓库）这个词基本上等价于 project ，差别如下：

repository = project + history
搭建 Github 网站

创建一个仓库，仓库的名字是有严格规定的，

username.github.io
把 username 替换成自己的自己的用户名。例如我叫 happypeter ，我要创建的仓库名就是

happypeter.github.io
Description (optional) 项目描述（可选项）

Public: 开源项目
Private：闭源项目
Initialize this repository with a README 初始化项目的时候，自动添加一个 README 文件
我们这里勾选上这一项。

到达项目页面后，现在来创建一个 index.html ，点 “Create A New File”

添加一些基本的 html 内容进 index.html ，然后点 “Commit New File” 进行保存。

注意：新添加的内容，不一定立刻能显示到 happypeter.github.io ，可能会有五六分钟的延迟。

用 Markdown 来记笔记

Markdown 跟 HTML 一样，是一种标签语言。但是 Markdown 语法特别简单，适合用来做笔记。

Markdown 语法参考
Mardown 语法不是浏览器能直接支持的，所以需要先把 Mardown 语法写成的内容，编译成 HTML ，才能美观的显示出来。

那么 Github 就提供了这个编译环境。到 Github 上我们的项目中，有一个文件叫 README.md 这里 md 就是 markdown 的缩写。

在这个文件里面，我们去写 markdown ，就可以翻译成 html 。

例如，我们在 README.md 中填写

[百度](http://baidu.com)

<a href="http://baidu.com">百度</a>
提交保存之后，页面显示出完全一样的链接效果。

注意，添加内容的文件名，无所谓，但是后缀一定要 .md 不然无法编译成功

Mardown 中添加语法高亮

什么是语法高亮？ 如果一段代码没有语法高亮，那么就是所有的字符都显示成一个颜色。但是通常编辑器中有语法高亮，也就是不同语法作用的字符串会显示成不同的颜色。

markdown 中，如果写成下面这样，最终显示的效果就是有语法高亮的：

```js
console.log('hello');
console.log('hello');

console.log('hello');

console.log('hello');
```

```css
body {
  background: red;
}
```
上面的内容会最终显示为：

console.log('hello');
console.log('hello');

console.log('hello');

console.log('hello');
body {
  background: red;
}
如何在 happypeter.github.io 仓库中使用 markdown

在 github pages 项目中使用 markdown ，基本的思路就是

如果我想添加一个 pagename.html 的页面
那我就创建 pagename.md 这个文件
然后里面直接写 markdown 语法就可以了
但是，跟普通的 markdown 文件不同，添加到 github pages 页面中的 .md 文件，必须有头部。
头部格式如下：

---
title: 我的这篇文章的标题
---
具体操作步骤

到 happypeter.github.io 的项目仓库中，首先在 index.html 中添加如下内容：

<ul>
  <li>
    <a href="1-first.html">第一篇文章</a>
  </li>
  <li>
    <a href="2-second.html">第二篇文章</a>
  </li>
</ul>
然后，就到 https://github.com/happypeter/happypeter.github.io 仓库首页，找到 Create New File 按钮，创建一个新文件，叫做

1-first.md
里面添加这些内容：

---
title: 我的第一篇文章
---

### 第一篇第一个大标题
上面:后面留一个空格，头部下方留出一个空行，然后再写 markdown 正文

注意：头部千万不能敲错，不然网站就不更新了。例如，A.md 文件中 头部敲错了，即使后续再创建一个 B.md 文件，里面添加了头部，网站也不会更新。除非先把 A.md 中的头部修改好。

总结一下，虽然很多 github pages 的知识我们还没有介绍，但是有了上面的这些技巧已经完全可以胜任记笔记的工作了。当然如果想让笔记好看，就添加 CSS 进来。
