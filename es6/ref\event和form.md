---
title: ref/event和form
---



### 使用ref对操作DOM

- ReactDOM.findDOMNode
- this.refs.xxx
获取DOM后可以方便结合现有非 react 类库的使用，通过 ref/refs 可以取得组件实例，进而取得原生节点，不过尽量通过 state/props 更新组件，不要使用该功能去更新组件的DOM。


```
import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';

class HandleDOMComponent extends Component {
  componentDidMount(){
    // 两种方式都可以获取到元素
    let ele = findDOMNode(this.refs.content);
    let ele2 = this.refs.content;

    // 如果想用 jquery，那么这是个好时机
    console.log( ele );
    console.log( ele.innerHTML );
    console.log( ele2.innerHTML );

  }

  render(){
    return (
      <div>
        <h3>来吧，一起操作DOM</h3>
        <div ref='content'>这是我DOM元素里面的内容</div>
      </div>
    );
  }
}

export default HandleDOMComponent;
```

再看个例子

App.js
```js
class App extends React.Component{
  componentDidMount(){
    console.log(this.refs.aaa);
    $('#btn1').click(function(){
      alert('aaa');
    })
    $('#btn').click(function(){
      $('#btn1').trigger('click')
    })
    console.log(this.newAttr)
    this.textInput.focus()
  }
  render(){
    return(
      <div>
        <div ref={(aaa)=>this.newAttr=aaa} id='test'>aaa</div>
        <input text='type' ref={input=>this.textInput=input}/>
        <button id='btn' ref='btn' onClick={()=>this.refs.aaa.click()}>我是0</button>
        <button id='btn1' onClick={()=>console.log(this.textInput.value)} key={Math.random()}>我是1</button>
        <Test ref='aaa'/>
      </div>
    )
  }
}
export default App;
```
Test.js

```js
import React from 'react';
class Test extends React.Component{
  getValue(){
    return this.refs.input.value
  }
  click(){
    alert('aaabbb');
  }
  render(){
    return(
      <div>
        我是测试组件
        <input type='text' defaultValue='wshzj' ref='input'/>
        <button onClick={this.click.bind(this)}>thtrh</button>
      </div>
    )
  }
}

export default Test;
```

### 事件event

可以通过设置原生 dom 组件的 onEventType 属性来监听 dom 事件，例如 onClick, onMouseDown，在加强组件内聚性的同时，避免了传统 html 的全局变量污染

```
class App extends React.Component{
  constructor(){
    super();
    this.state={
      divH:50
    }
  }
  handleWheel(event){
    console.log(event.deltaY);
    if(this.state.divH<50){
      this.setState({divH:100})
    }else{
        this.setState({divH:this.state.divH+event.deltaY})
    }
  }
  handleMenu(e){
    e.preventDefault();
    console.log('你点击了右键');
  }
  render(){
    return(
      <div style={ {height:`${this.state.divH}px`,backgroundColor:'#ccc'} }           onWheel={this.handleWheel.bind(this)}
           onContextMenu={this.handleMenu.bind(this)}></div>
      </div>
    )
  }
}
```
> 注意：事件回调函数参数为标准化的事件对象，可以不用考虑 IE

### 使用自定义组件

父组件
```
class Children extends React.Component{
  constructor(){
    super();
    this.state={
      divH:50
    }
  }

  render(){

    return(
      <div>
        王健男
        <Son>
          <p>sdvfd</p>
          <Test/>
        </Son>
      </div>
    )
  }
}
```
子组件
```
class Son extends React.Component{

  render(){
    console.log(this.props)
    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}
export default Son;
```

### form表单代码
value值(输入不了了)defaultValue || onChange

有两种:
- 1.受控表单onChange, state控制value
- 2.不受控defaultValue,不可以设置value
```
class Form extends React.Component{
  constructor(){
    super()
    this.state={
      inputValue:'',
      textarea:'',
      select:'Grapefruit',
      radio:'male'
    }
  }
  submit(e){
    e.preventDefault();
    console.log('saaa')
  }
  handleChange(e){
    console.log(e.target.value);
    this.setState({inputValue:e.target.value})
  }
  handleText(e){
    this.setState({textarea:e.target.value})
  }
  select(){
    this.setState({value: event.target.select});
  }
  render(){
    return(
      <div>
        <form action='http://blog.duopingshidai.com' method='POST' onSubmit={this.submit.bind(this)}
          >
          <input type='text' name='phoneNumber' defaultValue='12345'/>
          <input type='text' name='phoneNumber' value={this.state.inputValue} onChange={this.handleChange.bind(this)}/>
          <button type='submit'>提交</button>
          <button type='button'>普通</button>{/*默认普通按钮*/}
          <button type='reset'>重设</button>
          <textarea value={this.state.textarea} onChange={this.handleText.bind(this)}/>
          <textarea value={this.state.textarea} onChange={(e)=>this.setState({textarea:e.target.value})}/>

          <select value={this.state.select} onChange={this.select.bind(this)}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
    )
  }
}
export default Form;
```

### 单选框，多选框

单选框代码
```
class Radio extends React.Component{
  constructor(){
    super()
    this.state={
      radio:'male'
    }
  }
  render(){
    return(
      <div>
          <input type='radio' name='test'/>男
          <input type='radio' name='test'　defaultChecked/>女
          <br/>
          <br/>
          <br/>
          <input type='radio' name='test1' value='male' checked={this.state.radio==='male'?true:false} onChange={(e)=>this.setState({radio:e.target.value})}/>男
          <input type='radio' name='test1'　value='famale' checked={this.state.radio==='famale'?true:false} onChange={(e)=>this.setState({radio:e.target.value})}/>女
      </div>
    )
  }
}
export default Radio;
```

多选框代码
```
class checked extends React.Component{
  constructor(){
    super()
    this.state={
      checkboxValue:[] //创建一个空数组
    }
  }
  handleChange(e){
    let ckValue=this.state.checkboxValue;　
    let nowCheck=e.target.value;
    let index=ckValue.findIndex(element=>element===nowCheck) //检索数组里有没有nowCheck
    if(index==-1){
      ckValue.push(nowCheck) //如果没有就把它放到数组里
    }else{
      ckValue.splice(index,1)　//如果有就把数组里删去
    }
    this.setState({checkboxValue:ckValue})　//把结果数组的值给checkboxValue
  }
  render(){
    console.log(this.state.checkboxValue);
    return(
      <div>
        <input type='checkbox' value='apple' name='fruits' onChange={this.handleChange.bind(this)}/>苹果
        <input type='checkbox' value='banana' name='fruits' onChange={this.handleChange.bind(this)}/>香蕉
        <input type='checkbox' value='pear' name='fruits' onChange={this.handleChange.bind(this)}/>梨子
        <button>提交</button>
      </div>
    )
  }
}
export default checked;
```
