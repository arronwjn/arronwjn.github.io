---
title: state
---

### state

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

### bind()方法改变this指向
