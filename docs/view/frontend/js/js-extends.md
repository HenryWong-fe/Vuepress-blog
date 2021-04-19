---
title: Js之继承
date: 2019-06-27 11:20:17
categories: 
  - js
---

## 属性拷贝

## 原型继承

``` javascript
function Parent () {
  this.name = '哈哈'
}

Parent.prototype.speak = function () {
  console.log(this.name);
}

function Child () {
  this.age = 16
}

Child.prototype = Parent.prototype

let childDom = new Child()

childDom.speak()
```

### 缺点: 

1. 存在原型共享的问题,如果父级原型修改,会影响到子级

2. 只能继承原型上的属性和方法,实例对象上的属性和方法不能被继承

## 原型链继承

``` javascript
function Parent () {
  this.name = '哈哈'
}

Parent.prototype.speak = function () {
  console.log(this.name);
}

function Child () {
  
}

Child.prototype = new Parent()
Child.prototype.constructor = Child

let childDom = new Child()

console.log(childDom.name)

childDom.speak()

```

### 缺点: 

1. 存在原型共享的问题,如果子级中去修改原型上的某些属性,会影响到父级

2. 无法给父级构造函数传递参数

## 组合式继承

``` javascript
function Parent (name) {
  this.name = name
  this.showName = function () {
    console.log(this.name);
  }
}

function Child (...args) {
  Parent.apply(this, args)
}

Child.prototype = Parent.prototype
Child.prototype.constructor = Child

let childDom = new Child()

console.log(childDom.name)

```

### 问题

1. 属性共享问题无法解决