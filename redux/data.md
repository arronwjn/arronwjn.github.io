---
title: 处理俩类数据
---

任务一：添加 React Router 进来

代码：add react router

src/components/App.js

```diff
import React, { Component } from 'react';
 -import PostBody from './PostBody';
 -import CommentBox from './CommentBox';
 -import { Provider } from 'react-redux';
 -import store from '../store';
 +

  class App extends Component {
    render(){
      return(
 -      <Provider store={store}>
 -        <div>
 -          <div className="top  clearfix">
 -            <PostBody />
 -          </div>
 -          <div className="bottom clearfix">
 -            <CommentBox />
 -          </div>
 -        </div>
 -      </Provider>
 +      <div>
 +        { this.props.children }
 +      </div>
      )
    }
  }
```

src/components/CommentBox.js

```
import React, { Component } from 'react';
 -
  import store from '../store';

  class CommentBox extends Component {
```

src/components/Home.js

```diff
+import React, { Component } from 'react';
 +
 +class Home extends Component {
 +  render(){
 +    return(
 +      <div>
 +        HOME
 +      </div>
 +    )
 +  }
 +}
 +
 +export default Home;
```

src/components/Post.js

```diff
+import React, { Component } from 'react';
 +import PostBody from './PostBody';
 +import CommentBox from './CommentBox';
 +import { Provider } from 'react-redux';
 +import store from '../store';
 +
 +class Post extends Component {
 +  render(){
 +    return(
 +      <Provider store={store}>
 +        <div>
 +          <div className="top  clearfix">
 +            <PostBody />
 +          </div>
 +          <div className="bottom clearfix">
 +            <CommentBox />
 +          </div>
 +        </div>
 +      </Provider>
 +    )
 +  }
 +}
 +
 +export default Post;
```

src/index.js

```diff
import React, { Component } from 'react';
  import './main.css';
  import App from './components/App';
 +import Home from './components/Home';
 +import Post from './components/Post';
 +import { Router, Route, IndexRoute, browserHistory} from 'react-router';

 +const router = (
 +   <Router history={browserHistory}>
 +     <Route path="/" component={App}>
 +       <IndexRoute component={Home} />
 +       <Route path="/posts/:postId" component={Post} />
 +     </Route>
 +   </Router>
 +)

 -ReactDOM.render(<App />, document.getElementById('app'));
 +
 +ReactDOM.render(router, document.getElementById('app'));
```

src/store.js

```diff
import { createStore } from 'redux';

 -
  let comments = [
 -    "hello1",
 -    "hello2"
 +  "hello1",
 +  "hello2"
  ]

  function commentReducer(state = [], action) {
 @@ -17,6 +16,6 @@ function commentReducer(state = [], action) {
    }
  }

 -let store = createStore(commentReducer, comments);
 +const store = createStore(commentReducer, comments);

  export default store;
```

这部分没有什么新知识点引入。


### 任务二：添加多个 store 数据，添加 root reducer

代码：add rootReducer

src/components/CommentBox.js

```diff
constructor(){
      super();
      this.state = {
 -      comments: store.getState()
 +      comments: store.getState().comments
      }
    }
    handleSubmit(e){
      store.dispatch({type: 'ADD_COMMENT', comment: this.refs.comment.value});
      console.log(store.getState());
      this.refs.commentForm.reset();
 -    this.setState({comments: store.getState()});
 +    this.setState({comments: store.getState().comments});
    }
    render(){
      let commentList = this.state.comments.map((comment, i)=>{
```

src/components/Post.js

```
<Provider store={store}>
         <div>
           <div className="top  clearfix">
-            <PostBody />
+            <PostBody id={ this.props.params.postId } />
           </div>
           <div className="bottom clearfix">
             <CommentBox />
           </div>
         </div>
</Provider>
```

src/components/PostBody.js

```js
return(
       <div className="post-body">
         <div className="comment-num">
-           { this.props.comments.length }
+           { this.props.comments.length }---
+           { this.props.id }
         </div>
       </div>
     )
   }
 }

 const mapStateToProps = (state) => ({
-  comments: state
+  comments: state.comments
 });

 export default connect(mapStateToProps)(PostBody);
```

src/reducers/comments.js

```diff
+function commentReducer(state = [], action) {
 +  // console.log(state, action);
 +  switch (action.type) {
 +    case 'ADD_COMMENT':
 +      // console.log([...state, action.comment])
 +      return [...state, action.comment]
 +    default:
 +      return state;
 +  }
 +}
 +
 +export default commentReducer;
```

src/reducers/index.js

```diff
+import { combineReducers } from 'redux';
 +
 +import postReducer from './posts';
 +import commentReducer from './comments';
 +
 +const rootReducer = combineReducers({
 +  posts: postReducer,
 +  comments: commentReducer
 +});
 +
 +export default rootReducer;
```

src/reducers/posts.js

```
+function postReducer(state = [], action) {
 +  return state
 +}
 +
 +export default postReducer;
```

src/store.js

```diff
import { createStore } from 'redux';
+import rootReducer from './reducers';
+

 let comments = [
   "hello1",
   "hello2"
 ]

-function commentReducer(state = [], action) {
-  // console.log(state, action);
-  switch (action.type) {
-    case 'ADD_COMMENT':
-      // console.log([...state, action.comment])
-      return [...state, action.comment]
-    default:
-      return state;
+const posts = [
+  {
+    id: 1,
+    title: 'redux-hello',
+    likes: 3
+  },
+  {
+    id: 2,
+    title: 'redux-baby',
+    likes: 6
   }
+]
+
+const defaultState = {
+  posts,
+  comments
 }

-const store = createStore(commentReducer, comments);
+const store = createStore(rootReducer, defaultState);

 export default store;
```


```
const rootReducer = combineReducers({
   posts: postReducer,
   comments: commentReducer
});
```

通过如上的 rootReducer 的使用，相当于对整个状态树进行的分拆。由 postReducer 专门更新 posts，由

commentReducer 专门负责 comments 数据。

上面的代码中把每篇 post （文章）也都接收到了数据自己的 id 。方便后续我们对不同文章进行区分，也对属于不同文

章的评论进行分组。

### 任务三：添加另一组评论，每篇 post 显示自己的评论

代码：show comments for each post

src/components/CommentBox.js

```diff
import store from '../store';

  class CommentBox extends Component {
 -  constructor(){
 -    super();
 +  constructor(props){
 +    super(props);
      this.state = {
 -      comments: store.getState().comments
 +      comments: store.getState().comments[this.props.postId]
      }
    }
    handleSubmit(e){
 @@ -14,7 +14,7 @@ class CommentBox extends Component {
      store.dispatch({type: 'ADD_COMMENT', comment: this.refs.comment.value});
      console.log(store.getState());
      this.refs.commentForm.reset();
 -    this.setState({comments: store.getState().comments});
 +    this.setState({comments:store.getState().comments[this.props.postId]});
    }
    render(){
      let commentList = this.state.comments.map((comment, i)=>{
```

src/components/Post.js

```diff
<Provider store={store}>
        <div>
          <div className="top  clearfix">
-            <PostBody id={ this.props.params.postId } />
+            <PostBody postId={ this.props.params.postId } />
          </div>
          <div className="bottom clearfix">
-            <CommentBox />
+            <CommentBox postId={this.props.params.postId} />
          </div>
        </div>
      </Provider>
```

src/components/PostBody.js

```diff
return(
        <div className="post-body">
          <div className="comment-num">
 -           { this.props.comments.length }---
 -           { this.props.id }
 +          { this.props.comments[this.props.postId].length }
          </div>
        </div>
      )
```

src/store.js

```
import rootReducer from './reducers';


 -let comments = [
 -  "hello1",
 -  "hello2"
 -]
 +let comments = {
 +  1: ['nice course', 'help me a lot'],
 +  2: ['really good', 'save me lots of time']
 +}

  const posts = [
{
```
### 任务四：提交评论失败，现在修复一下

代码： ADD_COMMENTS works

用到了对象展开运算符 。

src/components/CommentBox.js

```
handleSubmit(e){
      e.preventDefault();
      console.log(store.getState());
 -    store.dispatch({type: 'ADD_COMMENT', comment: this.refs.comment.value});
 +    store.dispatch({type: 'ADD_COMMENT', comment: this.refs.comment.value, postId: this.props.postId});
      console.log(store.getState());
      this.refs.commentForm.reset();
      this.setState({comments:store.getState().comments[this.props.postId]});
```


src/reducers/comments.js

```diff
-function commentReducer(state = [], action) {
 -  // console.log(state, action);
 -  switch (action.type) {
 +function postComments(state = [], action) {
 +  switch(action.type){
      case 'ADD_COMMENT':
 -      // console.log([...state, action.comment])
 -      return [...state, action.comment]
 +      return [...state, action.comment];
      default:
        return state;
    }
  }

 +function commentReducer(state = [], action) {
 +  if(typeof action.postId !== 'undefined') {
 +    return {
 +      ...state,
 +      [action.postId]: postComments(state[action.postId], action)
 +    }
 +  }
 +  return state;
 +}
 +
  export default commentReducer;
```
### 任务五：添加点赞功能

第一步，添加样式：like button style

第二步，从 store 中读取数据 read like number from store


src/components/PostBody.js

```diff
render(){
      return(
        <div className="post-body">
 -      <div className="likes-num num">
 -        23 喜欢
 -      </div>
 +        <div className="likes-num num">
 +          { this.props.posts[this.props.postId - 1].likes } 喜欢
 +        </div>
          <div className="comment-num num">
            { this.props.comments[this.props.postId].length } 评论
          </div>
 @@ -18,7 +18,8 @@ class PostBody extends Component {
  }

  const mapStateToProps = (state) => ({
 -  comments: state.comments
 +  comments: state.comments,
 +  posts: state.posts
  });

  export default connect(mapStateToProps)(PostBody);
```

第三步，添加 reducer 代码在INCREMENT_LIKES works

src/components/PostBody.js

```diff
import React, { Component } from 'react';
  import { connect } from 'react-redux';
 +import store from '../store';


  class PostBody extends Component {
 +  handleClick(){
 +    store.dispatch({type: 'INCREMENT_LIKES', index: this.props.postId - 1})
 +  }
    render(){
      return(
        <div className="post-body">
 -        <div className="likes-num num">
 +        <div className="likes-num num" onClick={this.handleClick.bind(this)}>
            { this.props.posts[this.props.postId - 1].likes } 喜欢
          </div>
          <div className="comment-num num">
```

src/reducers/posts.js

```diff
function postReducer(state = [], action) {
-  return state
+  switch(action.type) {
+    case 'INCREMENT_LIKES':
+      const i = action.index;
+      return [
+        ...state.slice(0, i),
+        {...state[i], likes: state[i].likes + 1},
+        ...state.slice(i + 1),
+      ]
+    default:
+      return state;
+  }
 }

 export default postReducer;
```
### 任务六：完成首页列表

第一步：PostBody 中添加 title add title to PostBody
第二步：首页组件从 store 中读取数据 read post data from store

第三步：首页展示博客列表： add postList to HOME
