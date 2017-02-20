---
title: state
---

### state

用状态控制组件变化 可以把一个组件看做一个状态机, 每一次状态对应于组件的一个 ui

**组件内部的状态，可以使用 state**

```
import React from 'react'

class App extends React.Component{
  constructor(){
    super();
    this.state={
      num:0,
      show:false
    }
  }
  handleAdd(){
    this.setState({num: this.state.num+1})
  }
  handleCut(){
    this.setState({num: this.state.num-1})
  }
  show(){
    this.setState({show:!this.state.show})
  }
  render(){
    let _this=this;
    setInterval(()=>this.state.num)
    return(
      <div>
        数字是：{this.state.num}
        <button onClick={this.handleAdd.bind(this)}>+1</button>
        <button onClick={this.handleCut.bind(this)}>-1</button>
        <button onClick={this.show.bind(this)}>{this.state.show?'隐藏':'显示'}</button>
        <p style={{display:this.state.show?'block':'none'}}>你现在显示吗{this.state.show?'显示':'不显示'}</p>
      </div>
    )
  }
}

export default App;
```
- 首先要定义一个状态，代码如下
```
constructor(){
  super();
  this.state={
    num:0
  }
}
```
- 然后修改state

用state做点击加１的功能

```
class App extends React.Component{
  constructor(){
    super();　　　　　　　 //在继承里如果定义constructor，要在顶部加super方法
    this.state={        //定义一个state
      const: 0          //给state里的const属性一个值
    }
  }
  add(){
    this.setState({const:this.state.const+1})    //修改state
  }
  render(){
    return(
      <div>
        数字是：{this.state.const}　　　//显示state里const属性的值
        <button onClick={this.add.bind(this)}>+1</button>　　//点击事件，执行add方法修改state
      </div>
    )
  }
}
```
> bind()方法改变this指向
