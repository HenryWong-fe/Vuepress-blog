---
title: ES6之let与const
date: 2019-04-29 14:02:45
categories: 
  - js
---

## let 
用于声明变量,会在当前作用域下形成块级作用域,其声明的变量不在受外部作用域影响

### 特性
使用let声明的变量,不会出现变量提升,意味着在声明前调用会报错

### 用法
```javascript
for (let i = 0; i < 3; i++) {
  let i = 'abc';
  console.log(i);
}
```

### 注意事项
在未声明前调用变量会报错
```javascript
console.log(b) // 报错 未定义
let b 
b = 1
let a = a //报错
```

## const
用于声明常量

### 特性
声明时必须初始化,也就是赋值,初始化后不可修改,声明前调用变量会报错

### 用法
```javascript
console.log(a) // 报错 未定义
const b // 报错 声明时就必须初始化,且不可在修改
const a = 1
a = 2 // 报错 不可以修改
```

### 注意事项
const声明的对象是可以修改属性的,造成这一的原因主要是因为声明的对象变量中保存的是对象的内存指针,修改对象本身的属性并不会引起对象指针的变化
```javascript
const a = {b: 1}
a.b = 2 
console.log(a.b) // 2
a = {} // 报错 重新赋值对象会导致指针变化,所以会报错
```