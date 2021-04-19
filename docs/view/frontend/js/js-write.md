---
title: 手撕api系列
date: 2019-05-25 14:57:58
categories: 
  - js
---

### 实现bind函数
``` javascript
Function.prototype.bind = Function.prototype.bind || function (context) {
  let me = this
  let F = function () {}
  let args = Array.prototype.slice.call(arguments, 1)
  F.prototype = me.prototype
  let bound =  function () {
    let fnArgs = Array.prototype.slice.call(arguments)
    let finalArgs = args.concat(fnArgs)
    // F是调用bind的函数,如果使用new关键字, this会指向调用bind的函数
    return me.apply(this instanceof F ? this : context || this, finalArgs)
  }
  bound.prototype = new F() // bound生成的实例使用instanceof 会指向 bind的 this
  return bound
}
```

### 实现call函数

``` javascript
Function.prototype.call = Function.prototype.call || function () {
  let [context, ...args] = [...arguments]
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  context.func = this
  let result = context.func(args)
  delete context.func
  return result
}
```

### 实现apply函数

``` javascript
Function.prototype.call = Function.prototype.call || function (context, args) {
  let result
  if (!context) {
    context = typeof window === 'undefined' ? global : window
  }
  context.func = this
  if (args) result = context.func(...args)
  else result = context.func()
  delete context.func
  return result
}
```

### 实现map函数

#### 使用for循环实现map
``` javascript
Function.prototype.map = Function.prototype.map || function (fn, context) {
  if (!(this instanceof Array)) throw new TypeError(me + 'is not a Array')
  var arr = Array.prototype.slice.call(me)
  var mapedArr = []
  for (var i = 0; i < arr.length; i++) {
    if (!arr.hasOwnProperty[i]) continue
    mapedArr.push(fn.call(context, arr[i], i, this))
  }
  return mapedArr
}
```

#### 使用reduce实现map
``` javascript
Function.prototype.map = Function.prototype.map || function (fn, context) {
  if (!(this instanceof Array)) throw new TypeError(me + 'is not a Array')
  var arr = Array.prototype.slice.call(me)
  return arr.reduce((pre, cur, index) => {
    return [...pre, fn.call(context, cur, index, this)]
  }, [])
}
```
### 实现reduce函数
**reduce函数**

| 参数          | 描述 |
| :------:  | :------: |
| 处理函数 function(total,currentValue, index,arr) | 必需。用于执行每个数组元素的函数 |
| initialValue | 可选。传递给函数的初始值 |

**处理函数**

| 参数          | 描述 |
| :------:  | :------: |
| total        | 必须,初始值或计算结束后的返回值 |
| currentValue | 必须,当前元素 |
| currentIndex | 可选,当前元素索引 |
| arr | 可选,当前元素所属的数组对象 |

``` javascript
Array.prototype.reduce = Array.prototype.reduce || function (fn, initValue) {
  let arr = this
  if (!(arr instanceof Array)) throw new TypeError(arr + 'is not a array')
  if (!arr.length) return 0
  let base = typeof initValue === 'undefined' ? arr[0] : initValue
  let initIndex = typeof initValue === 'undefined' ? 1 : 0
  arr.slice(initIndex).forEach((item, index) => {
    base = fn(base, item, initIndex + index, arr)
  })
  return base
}
```
### 实现some函数
**some函数**

| 参数          | 描述 |
| :------:  | :------: |
| 处理函数 function(total,currentValue, index,arr) | 必需。用于执行每个数组元素的函数 |
| thisValue | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值 |

**处理函数**

| 参数          | 描述 |
| :------:  | :------: |
| currentValue | 必须,当前元素 |
| currentIndex | 可选,当前元素索引 |
| arr | 可选,当前元素所属的数组对象 |

``` javascript
Array.prototype.some = Array.prototype.some || function (fn, context) {
  if (!(this instanceof Array)) throw new TypeError(this + 'is not a Array')
  if (!this.length) return []
  var tag = false
  var arr = Array.prototype.slice.call(this)
  var len = arr.length
  for (var i =0; i< arr.length; i++) {
    if (!arr.hasOwnProperty(i)) continue
    tag = fn.call(context, item, index, arr))
    if (tag) return true
  }
  return false
}
```

### 实现filter函数
``` javascript
Array.prototype.filter = Array.prototype.filter || function (fn, context) {
  if (!(this instanceof Array)) throw new TypeError(this + 'is not a Array')
  if (!this.length) return []
  let ret = []
  this.forEach((item, index) => {
    fn.call(context, item, index, this) && ret.push(result)
  })
  return ret
}
```

### 实现curry函数
``` javascript 
funciton curry (...fns) {
  return function (...args) {
    fns.forEach(fn => fn.call(null, args))
  }
}
curry(fn1, fn2, fn3)(1,2,3)
```

### 实现new
``` javascript
function new (...args) {
  let constructor = args.shift()
  let obj = Object.create(construtor)
  let result = constructor.apply(obj, args)
  return (typeof result === 'Object' && result !== 'null') ? result : obj
}
```

### 函数节流
> 函数节流=> 规定时间内多次触发,只会有一次
``` javascript
function throttle (fn, delay) {
  let _start = Date.now()
  return function () {
    let _now = Date.now()
    let args = Array.prototype.slice(arguments)
    let context = this
    if (_now - _start >= delay) {
      fn.apply(context, args)
      nowTime = Date.now()
    }
  }
}
```
### 函数防抖
> 函数防抖=> 规定时间内多次触发,在规定时间内多次触发,会取消上一次触发的结果
``` javascript
function debounce (fn, delay) {
  let timer = null
  return function () {
    timer && clearTimeout(timer)
    timer = setTimeout(() => {
      let context = this
      fn.apply(context, Array.prototype.slice(arguments))
    }, delay)
  }
}
```