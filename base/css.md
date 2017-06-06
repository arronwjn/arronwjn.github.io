---
title: css基础知识
---

### 选择器

### 清除浮动

清除浮动有几种方法：

- 谁需要清浮动就在父级样式中添加

```
clear:both;
```

- 万能清浮动

谁需要清浮动就给谁加clearfix,class名

```
*{
   margin: 0;
   padding: 0;
   font-family: "΢���ź�";
}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}

.clearfix:before,.clearfix:after{
    content:"";
    display:block;
}
.clearfix:after{
    clear:both;
}
.clearfix{
    zoom: 1;
}
```

### rem布局

设置html字体大小，用实际的宽度或字体大小除以html字体的2倍，360是页面宽度的一半

```
<script type="text/javascript">
    !function(a){function b(){var b=a.document,c=b.documentElement,d=c.getBoundingClientRect().width;document.documentElement.style.fontSize=20*(d/360)+"px"}window.addEventListener("DOMContentLoaded",function(){b()},!1),window.addEventListener("resize",function(){b()}),b()}(window);
</script>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

html,body{font-size: 20px;}
```

### 盒子居中的几种方法

- margin固定宽高居中
- 负margin居中
- 绝对定位居中
- table-cell居中
- flex居中
- transform居中
- 不确定宽高居中(绝对定位百分数)
- button居中

### 代码演示

```html
html Demo：

<body>
    <div id="container">
        <div id="box"></div>
    </div>
</body>
```
margin固定宽高居中

这种定位方法纯粹是靠宽高和margin拼出来的，不是很灵活。

css
```
#container {
    width: 600px;
    height: 500px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    width: 200px;
    height: 200px;
    margin: 150px 200px;
    background-color: #0ff;
}  
```
负margin居中

利用负的margin来进行居中，需要知道固定宽高，限制比较大。

css
```
#container {
    position: relative;
    width: 600px;
    height: 500px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 50%;
    top: 50%;
    margin: -100px -100px;
    background-color: #0ff;
}
```

绝对定位居中

利用绝对定位居中，非常常用的一种方法

css
```
#container {
    position: relative;
    width: 600px;
    height: 500px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    position: absolute;
    width: 200px;
    height: 200px;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: #0ff;
}
```

table-cell居中

利用table-cell来控制垂直居中。

css
```
#container {
    display: table-cell;
    width: 600px;
    height: 500px;
    vertical-align: middle;
    border: 1px solid #000;
}
#box {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background-color: #0ff;
}
```

flex居中

CSS3中引入的新布局方式，比较好用。缺点：IE9以及IE9一下不兼容.

css
```
#container {
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
            align-items: center;
    -webkit-justify-content: center;
            justify-content: center;
    width: 600px;
    height: 500px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    width: 200px;
    height: 200px;
    background-color: #0ff;
}  
```

transform居中

这种方法灵活运用CSS中transform属性，较为新奇。缺点是IE9下不兼容。

css
```
#container {
    position: relative;
    width: 600px;
    height: 600px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    position: relative;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 200px;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    background-color: #0ff;
}
```

不确定宽高居中

这种不确定宽高的居中，较为灵活。只需要保证left和right的百分数一样就可以实现水平居中，保证top

和bottom的百分数一样就可以实现垂直居中。

css
```
#container {
    position: relative;
    width: 600px;
    height: 500px;
    border: 1px solid #000;
    margin: auto;
}
#box {
    position: absolute;
    left: 30%;
    right: 30%;
    top: 25%;
    bottom: 25%;
    background-color: #0ff;
}
```

button居中

利用button做外容器，里边的块元素会自动垂直居中，只需要控制一下水平居中就可以达到效果。

html
```
<button>
    <div></div>
</button>
```

css
```
button {
    width: 600px;
    height: 500px;
    border: 1px solid #000;
}
div {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background-color: #0ff;
}
```
### css基础知识

标签：

```
    - div：可设置大小  

    - h1~h6,p: 自带上下间距，可以设置大小

    - ul：自带上下边距和左内边距，可以设置大小

    - li：可以设置大小

    - a：链接 默认蓝色，自带下划线，不可设置大小

    - span：不可以设置大小

    - img：可以设置大小
```

样式：width height float

    背景：background-color

     ```
      background-image
     ```  

      用背景图代替列表符号

```
       background-repeat:no-repeat;
```

       background-position:水平 垂直;

    文字：font-size 字号 默认16px  最小12px

    ```
        font-family  有衬线   无衬线

        font-weight
        color
        line-height： 行高或垂直居中
        text-align：center  left right;水平居中
        text-indent: 像素 首行缩进
        text-decoration：none  line-through underline;
        letter-spacing:字符间距;
        word-spacing:单词间距;
    列表样式：list-style: none; 去掉列表符号
          list-style-type:disc  cricle  square；列表符号类型
          list-style-image:url()     列表符号图片
          list-style-position:outside  inside;列表符号的位置
    盒子：margin:外边距;
        border:1px solid(double dashed dotted) #ccc;
        padding:内边距;		  
```
选择器：权重值
			单一选择器：.class名 类选择器
						标签名   标签选择器
						E F	     后代选择器	  
			群组选择器：E,F,G  
