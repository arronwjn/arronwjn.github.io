---
title: connect 动态读取 store 数据
---


首先明确一点，就是 redux 可以配合多种框架使用，并不是 react 的一部分。所以天然的 react 组件和 redux

store 之间是没有任何关系的。这一节，我们就把他们二者 connect 起来。

连接二者，需要一个专门的库，叫做 react-redux，这个是 React 官方的 Redux 对 React 的绑定。

### 安装使用

```
npm i --save react-redux
```
具体的使用的主要涉及两个接口 Provider 和 connect 。

```
export default connect(mapStateToProps)(PostBody);
```

- connect 连接 store 和组件

- mapStateToProps：把 store 中的数据（一部分）映射为当前组件的 props

map 的意思是“映射”

State 指的是 store 状态树（ State Tree ），也就是 store 的实际数据

Porps 就是属性


Store 中数据很多，当前组件需要的只是一部分，那么选取工作是在 mapStateToProps 中完成的

```
const mapStateToProps = (state) => ({
  comments: state
});
```

上面的 (state) 指的就是 Store 中的全部状态，也即是 store.getState() 可以读到的内容。具体的选取工作是

用 comments: state 这样的语句的完成的。

connect 完毕之后，PostBody 之中就多了一个属性：this.props.comments

只有 connect 不能工作，因为 connect 的生效范围是由 <Provider> 组件决定的，所以 代码中还需要添加

```
<Provider store={store}>
  <div>
    <div className="top  clearfix">
      <PostBody />
    </div>
    <div className="bottom clearfix">
      <CommentBox />
    </div>
  </div>
</Provider>
```

这样，动态连接就建立了。

代码

src/components/App.js

```js
 import React, { Component } from 'react';
 import PostBody from './PostBody';
 import CommentBox from './CommentBox';
+import { Provider } from 'react-redux';
+import store from '../store';

 class App extends Component {
   render(){
     return(
-      <div>
-        <div className="top  clearfix">
-          <PostBody />
+      <Provider store={store}>
+        <div>
+          <div className="top  clearfix">
+            <PostBody />
+          </div>
+          <div className="bottom clearfix">
+            <CommentBox />
+          </div>
         </div>
-        <div className="bottom clearfix">
-          <CommentBox />
-        </div>
-      </div>
+      </Provider>
     )
   }
 }
```

src/components/PostBody.js

```js
import React, { Component } from 'react';
 -import store from '../store';
 +import { connect } from 'react-redux';


  class PostBody extends Component {
 -  constructor(){
 -    super();
 -    this.state = {
 -      num: store.getState().length
 -    }
 -  }
    render(){
      return(
        <div className="post-body">
          <div className="comment-num">
 -          { this.state.num }
 +           { this.props.comments.length }
          </div>
        </div>
      )
    }
  }

 -export default PostBody;
 +const mapStateToProps = (state) => ({
 +  comments: state
 +});
 +
 +export default connect(mapStateToProps)(PostBody);
```
总结

到目前为止，Redux 三大概念：Store/action/reducer 都已经了解了，然后通过

connect/Provider/mapStateToProps 来实现数据从 store 到组件的动态订阅也已经会了。这意味着 Redux 的

核心思想已经完全介绍完毕。后续还有很多扩展技巧，但是它们也确实都是扩展技巧了，不是核心。
