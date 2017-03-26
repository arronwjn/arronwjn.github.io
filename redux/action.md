---
title: Store Action Reducer
---


推荐 阮一峰 …

- [Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
- [Redux 入门教程（二）：中间件与异步操作](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
- [Redux 入门教程（三）：React-Redux 的用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_three_react-redux.html)

这里简单介绍…


### Store

Store 就是保存数据的地方，你可以把它看成一个容器。整个应用只能有一个 Store。

Redux 提供createStore这个函数，用来生成 Store。

```
import { createStore } from 'redux';
const store = createStore(comments)
export default store;
```

上面代码中,createStore 函数接受另一个函数作为参数，返回新生成的 Store 对象。来瞅瞅官方文档

官方文档指定了一个必传的参数 reducer


### Reducer

Store 收到 Action 以后，必须给出一个新的 State，这样 View 才会发生变化。这种 State 的计算过程就叫做 Reducer。

Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State。就是说 reducer 是用来修改 store 中的数据的。

```
const reducer = function (state, action) {
  // ...
  return new_state;
};
```

整个应用的初始状态，可以作为 State 的默认值。下面是一个实际的例子。

```
const defaultState = 0;
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD':
      return state + action.payload;
    default:
      return state;
  }
};

const state = reducer(1, {
  type: 'ADD',
  payload: 2
});
```

上面代码中,reducer 函数收到名为 ADD 的 Action 以后，就返回一个新的 State，作为加法的计算结果。其他运算

的逻辑（比如减法），也可以根据 Action 的不同来实现。

实际应用中，Reducer 函数不用像上面这样手动调用,store.dispatch 方法会触发 Reducer 的自动执行。为此

，Store 需要知道 Reducer 函数，做法就是在生成 Store 的时候，将 Reducer 传入 createStore 方法。


```
import { createStore } from 'redux';
const store = createStore(reducer);
```
上面代码中,createStore 接受 Reducer 作为参数，生成一个新的 Store。以后每当 store.dispatch 发送过来

一个新的 Action，就会自动调用 Reducer，得到新的 State。

为什么这个函数叫做 Reducer 呢？因为它可以作为数组的 reduce 方法的参数。请看下面的例子，一系列 Action 对

象按照顺序作为一个数组。

```
const actions = [
  { type: 'ADD', payload: 0 },
  { type: 'ADD', payload: 1 },
  { type: 'ADD', payload: 2 }
];

const total = actions.reduce(reducer, 0); // 3
```

上面代码中，数组 actions 表示依次有三个 Action，分别是加0、加1和加2。数组的reduce方法接受 Reducer 函数作为参数，就可以直接得到最终的状态 3 。

### Action

State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。

Action 是一个对象。其中的 type 属性是必须的，表示 Action 的名称。其他属性可以自由设置，社区有一个规范

可以参考。

```
const action = {
  type: 'ADD_TODO',
  payload: 'Learn Redux'
};
```

上面代码中，Action 的名称是ADD_TODO，它携带的信息是字符串Learn Redux。

可以这样理解，Action 描述当前发生的事情。改变 State 的唯一办法，就是使用 Action。它会运送数据到 Store

Action Creator

View 要发送多少种消息，就会有多少种 Action。如果都手写，会很麻烦。可以定义一个函数来生成 Action，这个函

数就叫 Action Creator。


```
const ADD_TODO = '添加 TODO';

function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

const action = addTodo('Learn Redux');
```

上面代码中，addTodo函数就是一个 Action Creator。

store.dispatch()

store.dispatch()是 View 发出 Action 的唯一方法。

```
import { createStore } from 'redux';
const store = createStore(fn);

store.dispatch({
  type: 'ADD_TODO',
  payload: 'Learn Redux'
});
```

上面代码中，store.dispatch接受一个 Action 对象作为参数，将它发送出去。

结合 Action Creator，这段代码可以改写如下。

```
store.dispatch(addTodo('Learn Redux'));
```

知道了以上这些基本可以完成我们的小目标

- [add store](https://github.com/fightingljm/redux-demo/commit/33a9a3a90960ed2ae9cd7c90e18477edba67af6e)

- [action and reducer](https://github.com/fightingljm/redux-demo/commit/6c95793481c1f403297abe57692a2846be20aea6)

如果继续按照这个思路的话,那么问题就这样不灵不灵的出现了…

- [problem~](https://github.com/fightingljm/redux-demo/commit/43efcbb8a26194f3bae5e053d4a72194bc94f5ae)

什么情况?!评论数量没有变化…看来是这里的 store.getState() 没有再次被执行

欲知后事如何,且听下回分解 ~
