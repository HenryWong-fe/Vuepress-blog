---
title: 为何使用void0代替undefined
date: 2019-04-29 14:39:20
categories: 
  - js
---
## 原因
在javascript中undefined是变量而非关键字,这导致了使用undefined作为变量时,是可以随意赋值的,其值可变
```javascript
var undefined = 1
console.log(undefined) // 1
```

## 实际情况
在IE8以上的浏览器中,全局作用域下undefined值不可变
```javascript
var undefined = 1
console.log(undefined) // undefined
```
在IE8中的浏览器中,全局作用域下undefined值可以更改
```javascript
var undefined = 1
console.log(undefined) // 1
```
在IE8以上的浏览器中,块级作用域下的undefined值可以更改
```javascript
(function () {
  var undefined = 2
  console.log(undefined);  //2 
})()
```