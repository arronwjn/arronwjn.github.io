---
title: LifeCycle
---

# 生命周期函数步骤

### 初始化,首次挂载


- constructor (initial state)
- componentWillMount (will mount)
- render (render)
- componentDidMount (did mount)


### 更新阶段(state props 发生变化时触发)

state 发生变化时

- shouldComponentUpdate(必须有返回值(有两个参数 nextProps 和 nextState)) (should update)
- componentWillUpdate(有两个参数 nextProps 和 nextState) (will update)
- render (render)
- componentDidUpdate(有两个参数 prevProps 和 prevState) (did update)

props 发生变化时

- componentWillReceiveProps(有一个参数 nextProps) (Test will receive props=== Object {childNum: 2})
- componentWillUpdate(有两个参数 nextProps 和 nextState) (Test will update=== Object {childNum: 2} null)

### 销毁

- componentWillUnmount (我要被销毁了)

### 调用API定义组件

用 React.createClass或者React.Component 定义组件时允许传入相应的配置及组件API的使用，包括组件生命周期提供的一系列钩子函数。

**3.1 组件初始定义**
getDefaultProps 得到默认属性对象，这个在ES6的时候不需要这样定义
propTypes 属性检验规则
mixins 组件间公用方法
**3.2 初次创建组件时调用**
getInitialState 得到初始状态对象
componentWillMount　将要挂载
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
class App extends React.Component{
  constructor(){
    super();
    this.state={num:0,show:true}
    console.log('initial state');
  }
  componentWillMount(){
    console.log('will mount');
  }
  componentWillReceiveProps(nextProps){
    console.log('will receive props===',nextProps);
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log('should updata===',nextProps,nextState);
    if(nextState.num<5){
      return true
    }else{
      return false
    }
  }
  componentWillUpdate(nextProps,nextState){
    console.log('will updata===',nextProps,nextState);
  }
  componentDidUpdate(prevProps,prevState){
    console.log('did update');
  }
  componentDidMount(){
    console.log('did mount');
  }
  render(){
    console.log('render')
    return(
      <div>
        数值是：{this.state.num}
        <button onClick={()=>this.setState({num:this.state.num+1})}>click</button>
        <button onClick={()=>this.setState({show:false})}>销毁</button>
        {this.state.show?<Test childNum={this.state.num}/>:null}
      </div>
    )
  }
}
export default App;
```

**调用组件并销毁组件示例**
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
### 回顾组件的渲染过程

# 创建-》渲染-》销毁

getDefaultProps()
getInitialState()
componentWillMount()
render()
componentDidMount()
componentWillUnmount()

# 更新组件

componentWillReceiveProps()
shouldComponentUpdate()
componentWillUpdate()
render()
componentDidUpdate()
