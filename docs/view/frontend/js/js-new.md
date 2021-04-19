---
title: new fucntion发生了什么
date: 2019-02-26 10:59:27
categories: 
  - js
---
```javascript
function parentClass (a,b) {
  this.a = a
  this.b = b
}
new parentClass(a,b)
New(parentClass, a, b)
// 1.生成一个空对象
// 2.将该对象的原型指向到构造函数
// 3.函数的this属性赋值为该对象

function New () {
  let obj = {} // 生成一个空对象
  let constructor = [].shift.call(arguments) // 得到构造函数
  if (constructor.prototype === null) { // 将对象的原型指向构造函数
    obj.prototype = constructor.prototype
  }
  let ret = constructor.apply(obj, [].slice.call(arguments)) // 获取构造函数的返回值 
  if ((typeof ret === 'object' || typeof ret === 'function') && ret !== null) { // 如果构造函数有返回值,且返回值为object,function类型的话,且不等于null,则返回构造函数的返回值
    return ret
  }
  // 否则返回对象
  return obj
}
```
### 如何将类数组转化为数组类型
1. [].slice.call()
2. Array.from()

Array.from使用时需要注意类数组的key值需要是数字

[].slice.call(arguments)将arguments转化为数组