---
title: 深浅拷贝
date: 2019-06-26 19:52:33
categories: 
  - js
---

## 浅拷贝

对对象的每一个属性进行复制,但是如果对象的属性为引用类型,则只会复制其引用(内存指针),如果引用的数据发生变化,复制的对象数据也会变化

浅拷贝的方法主要有

* Array.prototype.slice()
* Object.assign()
* 扩展运算符...
* for in
* Array.prototype.concat()

## 深拷贝

JSON.parse(JSON.stringify(obj)) 是最简单的一种深拷贝方式,但是有很多缺点

* 对象属性值为函数时,无法拷贝
* 无法处理Date类型的属性
* 会忽略属性值为undefined的值
* 会忽略symbol
* 不能处理RegExp
* 原型链上的属性无法拷贝

自己实现一个深拷贝函数

``` javascript
function deepClone (obj) {
  let result = obj instanceof Array ? [] : {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj === 'Object' && obj !== null) {
        result[key] =  deepClone(obj)
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}
```