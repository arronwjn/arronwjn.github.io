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
