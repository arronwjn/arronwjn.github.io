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

### state项目示例

**示例１：用state做点击加１的功能**

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

**示例１：用state做随机功能**
```
import React from 'react';

let data=['白菜','青菜','大豆','花生','蘑菇','小麦'];
class EatWhat extends React.Component{
  constructor(){
    super();
    this.state={
      start:false,
      data,
      text:''

    }
  }
  select(){
    let result=this.state.data[Math.floor(Math.random()*this.state.data.length)]
    this.setState({text:result})
  }
  Click(){
    this.setState({start:!this.state.start})
    if(this.state.start){

      clearInterval(this.interval)
      this.setState({start:false})

    }else{

      this.interval=setInterval(()=>this.select(),130);
      this.setState({start:true})
    }
  }
  render(){
    return(
      <div>
        <p>今天吃什么：{this.state.text}</p>
        <button onClick={this.Click.bind(this)}>{this.state.start?'停止':'开始'}</button>
      </div>
    )
  }
}
export default EatWhat;
```
**示例２：选项卡**
```
class SelectBar extends React.Component{
  constructor(){
    super();
    this.state={
      show:0
    }
  }
  handleClick(num){
    this.setState({show:num})
  }
  render(){
    return(
      <div>
        <button onClick={this.handleClick.bind(this,0)}>选项卡一</button>
        <button onClick={this.handleClick.bind(this,1)}>选项卡二</button>
        <button onClick={this.handleClick.bind(this,2)}>选项卡三</button>
        <div style={{width:'200px',border:'1px #000 solid'}}>
          {this.state.show===0?<Tab1 />:this.state.show===1?<Tab2 />:<Tab3 />}
        </div>
      </div>
    )
  }
}
```
> bind()方法改变this指向
