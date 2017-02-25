---
title: props
---

### 1.props

通过 this.props 可以获取传递给该组件的属性值，还可以通过定义 **defaultProps** 来指定默认属性值（这是ES6的写法）

下面几个是props的常用API：

- this.props.children
- this.props.map
- this.props.filter

**props是调用组件的时候传递进去的数据，一般用于组件树数据传递**
```
import React, { Component } from 'react';

class PropsDemo extends Component {
  props = {
    title: '这是默认的title属性值'
  }
  render(){
    console.log(this.props);

    return <b>{this.props.title}</b>
  }
}

export default PropsDemo;


// 组件调用方式
// <PropsDemo title="设置的标题" />
```

### 2.propTypes

通过指定 propTypes 可以校验props属性值的类型，校验可提升开发者体验，用于约定统一的接口规范。
```
import React, { Component, PropTypes } from 'react';

class PropTypesDemo extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  props = {
      title: '默认的title'
  }

  render(){
    return <b>{this.props.title}</b>
  }
}

export default PropTypesDemo;
```

### props(实现组件间的传递)特点：

- 只能从父组件传给子组件
- 子组件通过{this.prpos.[name]}获取prpos
- 子组件设置默认属性Btn.defaultProps={}
- 子组件设置属性格式验证Btn.propTypes={}
