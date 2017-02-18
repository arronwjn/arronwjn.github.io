---
title: react基础
---

### react装包
用react要装react/react-dom包
终端输入命令如下：
```
npm install react react-dom --save
```

### babel装编译react语法的包

```
 npm install --save-dev babel-preset-react
```

### JSX语法特点

- 允许我们在js里直接去写标签
- 每个标签必须都有结束标签
- JSX元素（elements）必须包裹到封闭的标签内
- 不可在JSX里写注释，如果写要写{/* */}
- 可以在JSX元素内嵌入变量{obg}
- 标签内class要写为className,tabindex为tabIndex,for写为htmlFor
- 变量可以定义在任何位置
- JSX语法会被编译，通过React,createElement()这个方法
- 组件(component)块开发,有三种方式,创建组件要首字母大写

### 组件开发

组件开发有三种方式

**第一种，es5语法写**
```
let Dom = React.createClass({
  render: function(){
    return <h1>信息表</h1>;
  }
});

ReactDom.render(
  <Dom />
  ,document.getElementById('app')
)
```

**第二种**
```
function Dom(){
return <h1>hello<h1/>
}

ReactDom.render(
  <Dom />
  ,document.getElementById('app')
)
```
