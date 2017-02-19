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

### 组件式开发

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

**第三种**
```
class Hello extends ReactDom.Component{
  render(){
    return(
      <div> </div>
      )
  }
}
```

### react内部样式

react内部样式有两种方法：

- 第一种,代码如下
```
class Logo extends React.Component{
  render(){
    return(
      <div style={{width:'160px',float:'left'}}>
        <span className="logo" >Project Name</span>
      </div>
    )
  }
}
```
- 第二种，代码如下
```
class Logo extends React.Component{
   render(){
     let style={display: 'block',width: '540px',float: 'left',marginLeft: '362px'}
    return(
      <div>
        <img src={img} className='img' style={style}/>
      </div>
    )
  }
}
```
### react外部样式

首先在src里创建main.css文件,然后需要下载包，style-loader,css-loader，之后在配置文件里配置包

外部样式代码如下：
```
class SignIn extends React.Component{
  render(){
    return(
      <div>
        <input className='btn' type='button' value='Sign in' />
        <input  className='inp' type='text' placeholder='aaa' />
        <input className='inp' type='text' placeholder='bbbb' />

      </div>
    )
  }
}
```

### 组件嵌套式布局

SignIn.js
```
import React from 'react';

class SignIn extends React.Component{
  render(){
    return(
      <div>
        <input className='btn' type='button' value='Sign in' />
        <input  className='inp' type='text' placeholder='aaa' />
        <input className='inp' type='text' placeholder='bbbb' />

      </div>
    )
  }
}
export default SignIn;
```
logo.js
```
import React from 'react';
import img from './images/coder'

class Logo extends React.Component{
  render(){
    return(
      <div style={{width:'160px',float:'left'}}>
        <span className="logo" >Project Name</span>
      </div>
    )
  }
}

export default Logo;
```
Header.js
```
import React from 'react';
import Logo from './Logo';
import SignIn from './SignIn';

class Ｈeader extends React.Component{
  render(){
      return(
        <div>
          <Logo />
          <SignIn />
        </div>
      )
  }
}

export default Ｈeader;
```
### 下载加载包

css样式加载需要下载包，命令如下：

```
npm install --save-dev style-loader css-loader
```
加载文件需下载包，命令如下：

```
npm install --save-dev file-loader
```
