---
title: props
---

### 1.props

通过 this.props 可以获取传递给该组件的属性值，还可以通过定义 getDefaultProps 来指定默认属性值（这是ES5的写法，ES6定义组件的默认props可以直接写props）

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
###  3.调用API定义组件

用 React.createClass或者React.Component 定义组件时允许传入相应的配置及组件API的使用，包括组件生命周期提供的一系列钩子函数。

**3.1 组件初始定义**
getDefaultProps 得到默认属性对象，这个在ES6的时候不需要这样定义
propTypes 属性检验规则
mixins 组件间公用方法
**3.2 初次创建组件时调用**
getInitialState 得到初始状态对象
render 返回组件树. 必须设置
componentDidMount 渲染到 dom 树中是调用，只在客户端调用，可用于获取原生节点
**3.3 组件的属性值改变时调用**
componentWillReceiveProps 属性改变调用
shouldComponentUpdate 判断是否需要重新渲染
render 返回组件树. 必须设置
componentDidUpdate 渲染到 dom 树中是调用, 可用于获取原生节点
**3.4 销毁组件**
componentWillUnmount 组件从 dom 销毁前调用
**3.5 示例诠释组件全生命周期**
```
import React, { Component } from 'react';

class LifeCycle extends Component {

  Props = {
    value: '开始渲染'
  }

  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    this.setState({
        value: nextProps.value
    });
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('shouldComponentUpdate');
    return true;
  }

  componentWillUpdate(nextProps,nextState){
    console.log('componentWillUpdate');
  }

  componentWillMount(){
    console.log('componentWillMount');
  }

  render() {
    console.log('render');
    return <span>{this.props.value}</span>
  }

  componentDidMount() {
      console.log('componentDidMount');
  }

  componentDidUpdate(prevProps,prevState) {
      console.log('componentDidUpdate');
  }

  componentWillUnmount(prevProps,prevState) {
      console.log('componentWillUnmount');
  }
}

export default LifeCycle;
```
调用组件并销毁组件示例
```
import React, { Component } from 'react';
import LifeCycleDemo from './LifeCycleDemo';

class DestroyComponent extends Component {

  state = {
    value:1,
    destroyed:false
  }

  increase = () => {
    this.setState({
      value: this.state.value + 1
    });
  }

  destroy = () => {
    this.setState({
      destroyed: true
    });
  }

  render() {
    if(this.state.destroyed){
        return null;
    }

    return <div>
      <p>
        <button onClick={this.increase}>每次加1</button>
        <button onClick={this.destroy}>干掉这两个按钮</button>
      </p>
      <LifeCycleDemo value={this.state.value}/>
    </div>;
  }
}

export default DestroyComponent;
```
### props(实现组件间的传递)特点：

- 只能从父组件传给子组件
- 子组件通过{this.prpos.[name]}获取prpos
- 子组件设置默认属性Btn.defaultProps={}
- 子组件设置属性格式验证Btn.propTypes={}
