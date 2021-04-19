---
title: 箭头函数与普通函数的区别
date: 2018-08-14 11:08:17
categories: 
  - js
---
### 箭头函数
```javascript
let arrowFn = (...args) => {
  // 箭头函数没有arguments属性
  // 箭头函数没有原型属性
  // 箭头函数不能当做generator函数,也不能使用yield关键字
  // 箭头函数作用域永远指向父级作用域,call,apply,bind都无法改变
  console.log('箭头函数', arguments) // Uncaught ReferenceError: arguments is not defined
  console.log('箭头函数', args) // 因为没有arguments属性,使用...扩展符来获取
}
// 箭头函数不可以作为构造函数,因为其特性,this永远指向父级作用域,而构造函数的第一步就是将this赋值为生成的空对象
new arrowFn() // Uncaught TypeError: FunConstructor is not a constructor
```
### 普通函数
```javascript
let normalFn = function () {
  console.log('普通函数')
}
```