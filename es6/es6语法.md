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

**数组的解构赋值**
```
let [a, b, c] = [1, 2, 3];
```
**对象的解构赋值**
```
let { foo, bar } = { foo: "aaa", bar: "bbb" };
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

```
{
  let a = (x) => x+5;
  console.log(a(8));
  {
    let b= a(8);
    console.log(b);
  }
}
```

### reduce方法累加

```
{
  function add(...x){
    return x.reduce((m,n)=>m+n);
  }
}
console.log(add(1,2,3));
console.log(add(1,2,3,4,5,100));
```
###　map方法

```
{
  let arr=[4,5,6];
  let newArr=arr.map(function(a,index,array){
    return a+10;
  })
  console.log(newArr);
}
```
### forEach

```
{
  let arr=[6,7,8];
  arr.forEach(function(currentValue,index,array){
    console.log(currentValue+10);
  })
}
```
> forEach没有返回值

### filter过滤

```
{
  let arr = [5,8,9,15];
  var result= arr.filter(function(item,index,array){
    console.log(item,index,array);
    return item>8;
  })
  console.log(result);
}
```
