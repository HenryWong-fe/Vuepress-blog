---
title: 函数的节流
date: 2018-08-13
categories: 
  - js
---
## 定义

当持续触发事件时,在规定的时间内只触发一次,如果在规定的时间内再次触发事件,则不做任何操作

## 应用场景

监听是否滚动到底部,而触发上拉加载

## 原理

维护定时器,其计时以最后一次触发为起点,到达延迟时间才会触发

1. 时间戳形式,通过闭包保存上一次的时间戳,将其与事件触发时的时间戳进行比较,如果差值大于设定的时间,则调用事件,并记录时间戳,否则不进行任何操作

2. 定时器形式,通过闭包保存定时器,事件触发时,如果定时器为null,则执行cb,并设置新的定时器

## 实现方法

1. 时间戳形式

```javascript
function throttle (cb, delay = 16) {
  let prevTime = 0
  return function (...args) {
    let now = Date.now()
    let context = this
    let _args = args
    if (now > prevTime + delay) {
      fun.apply(context, _args)
      prevTime = now
    }
  }
}
```

2. 定时器形式

```javascript
function throttle (cb, delay = 16) {
  let timer = null
  return function (...args) {
    let context = this
    let _args = args
    if (!timer) {
      timer = setTimeout(function () {
        timer = null
        cb.apply(context, _args)
      },delay)
    }
  }
}
```

3. 时间戳加定时器的形式

```javascript
function throttle (cb, delay = 16) {
  let timer = null
  let prevTime = 0
  return function (...args) {
    let context = this
    let _args = args
    let now = Date.now()
    let tag = delay - (now - prevTime)
    clearTimeout(timer)
    if (tag < 0) {
      cb.apply(context, delay)
      prevTime = Date.now()
    } else {
      timer = setTimeout(function () {
        cb.apply(context, delay)
      }, tag)
    }
  }
}
```
