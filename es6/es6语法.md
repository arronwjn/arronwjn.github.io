---
title: es6语法
---

### 变量let和const

**let的用法**

- let块级作用域
- let变量不提升

let定义变量：
```
let [a,b,c]=[1,2,3];
```

**const用法**

- const只能用不能改
- const也是块级作用域

### 解构赋值

解构意思就是分解一个东西的结构,可以用一种类似数组的方式定义N个变量，可以将一个数组中的值按照规则赋值过去。
**数组的解构赋值**
```
let [a, b, c] = [1, 2, 3];
```
**对象的解构赋值**
```
let { foo, bar } = { foo: "aaa", bar: "bbb" };
```
**字符串解构**
```
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```


### rest参数

ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

```
function add(...values) {
  let sum = 0;

  for (var val of values) {
    sum += val;
  }

  return sum;
}

add(2, 5, 3) // 10
```
下面是一个 rest 参数代替arguments变量的例子。

```
// arguments变量的写法
function sortNumbers() {
  return Array.prototype.slice.call(arguments).sort();
}

// rest参数的写法
const sortNumbers = (...numbers) => numbers.sort();
```
> 注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

### 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```
{
  let people=['w','z','r'];
  function sayHello(people,people2,people3){
    console.log(`hello ${people},${people2},${people3}`);
  }
  sayHello(...people);
}
```

### es6语法字符串连接

```
{
  let age=10;
  let name='wangjiannan';
  console.log(`姓名是${name}的年龄是${age}岁`);
}
```
### 箭头函数
- 箭头函数简化了函数的的定义方式，一般以 “=>” 操作符左边为输入的参数，而右边则是进行的操作以及返回的值Inputs=>outputs。
- 箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数，从而避免了this指向的问题。
返回值为一个对象时要用小括号括起来; 多条语句时用大括号括起来,返回值写return,返回值为一个对象时,如果这个对象的对象名和参数名一样时写一个就可以;


```
//demo 1
//以前
let [a,b]=[1,2];
function add(a,b) {
  console.log(a+b);
}
add(a,b);
//现在
let add = (a,b) => console.log(a+b);


//demo 2
var a =(name,age)=>({name,age:age+8})
console.log(a('ljm',10));

var b =(name,age)=>{
  console.log('1');
  alert('2');
  return{name,age:age+8}
}
console.log(b('ljm',10));
```

### reduce方法累加

reduce() 数组的方法 官方概述：reduce() 方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。 其实reduce接收的就是一个回调函数，去调用数组里的每一项，直到数组结束。
```
{
  function add(...x){
    return x.reduce((m,n)=>m+n);
  }
}
console.log(add(1,2,3));
console.log(add(1,2,3,4,5,100));
```
### map方法

**遍历数组方法**
map() 方法返回一个由原数组中的每个元素调用一个指定方法后的返回值组成的新数组;数组的map()方法,遍历数组,有返回值
```
let arr = [4,5,6];
let newArr = arr.map(function (currentValue, index, array) {
  console.log(currentValue, index, array);
  return currentValue+10;
})
console.log(newArr);
```
### forEach

forEach() 方法对数组的每个元素执行一次提供的函数,没有返回值
```
//demo1
var numbers = [1, 2, 3, 4];
numbers.forEach(function(item, index, array) {
  console.log(item + "\t" + index + "\t" + array);
});
var array = [1, 2, 3];
//传统写法
array.forEach(function(v, i, a) {
    console.log(v);
});
//ES6
array.forEach(v = > console.log(v));
// 箭头函数,输入参数如果多于一个要用()包起来，函数体如果有多条语句需要用{}包起来

//demo2
let arr = [4,5,6];
let newArr = arr.forEach(function (currentValue, index, array) {
   console.log(currentValue, index, array);
 })
 console.log(newArr);//undefined   因为forEach方法没有返回值

//demo3
let arr = [4,5,6];
arr.forEach(item=>console.log(item+10))
```
> 注意：forEach没有返回值

### filter过滤

```
let arr = [4,5,9];
let results = arr.filter(function (item, index, array) {
  console.log(item, index, array);
  return item>8;
})
//var results = arr.filter(item=>item>8)//简写成箭头函数
console.log('results======',results);
```
### 构造函数的简单继承(es5)

es5原型继承demo
```
{
  function Point(x,y){
    this.x=x;
    this.y=y;
  }
  Point.prototype.toString=function(){
    return `(${this.x},${this.y})`
  }
  let p=new Point(1,2);
  console.log(p.x);
  console.log(p.y);
  console.log(p.toString());
}
```
例子２
```
{
  function Point(x,y){
    this.x=x;
    this.y=y;
  }

  Point.prototype.toString=function(){
    return `(${this.x},${this.y})`
  }

  function Hello(){
    this.toString=function(){
      return 'hello say'
    }
  }

  Hello.prototype=new Point(3,4)
  let p=new Hello();
  console.log(p.x);
  console.log(p.y);
  console.log(p.toString());
}
```

### class类(es6继承)

```
class Point{
    constructor(x,y){
      this.x=x;
      this.y=y;
    }
    toString(c,d){
      console.log('scasa');
      return 'this.x';
    }
  }

  class Hello extends Point{
    say(){
      return this.x;
    }
  }

  var p=new Hello(6,8);
  console.log(p.x,p.y);
  console.log(p.say());
```
> 注意1：只要实例化Point，constructor方法就会自动执行，一般追加属性
> 注意２:如果继承里constructor方法，要在里面加super()

class实现demo

```
{
  class Father{
    render(){
      throw new Error('子类必须实现')
    }
    _render(){
      return (`<ul>${this.render()}</ul>`)
    }
  }
  class Son extends Father{
    render(){
      return (`
        <li>1</li>
        <li>2</li>
        <li>3</li>
        `);
    }
  }
  document.getElementById('app').innerHTML=new Son()._render();
}
```

### module模块

在ES6标准中，JavaScript原生支持module了。这种将JS代码分割成不同功能的小块进行模块化的概念是在一些三方规范中流行起来的，比如CommonJS和AMD模式。

将不同功能的代码分别写在不同文件中，各模块只需导出公共接口部分，然后通过模块的导入的方式可以在其他地方使用。

不过，还是有很多细节的地方需要注意，我们看例子：

- 命名导出
- 默认导出

```
let a=10;
let b=443;
function aa(){
  console.log('aaaa');
}
class Father{
  render(){
    throw new Error('子类必须实现')
  }
  _render(){
    return (`<ul>${this.render()}</ul>`)
  }
}
export {a,aa,Father};  //命名导出
export default b;      //默认导出
```
引入导出的文件，代码如下：
```
import {a,aa,Father} from './test';
import demo from './test';
```
