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
