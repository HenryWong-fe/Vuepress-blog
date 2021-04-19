---
title: 函数的防抖
date: 2018-07-06
categories: 
  - js
---
### 定义
触发时间后的一段时间内,该事件的回调函数仅会触发一次,如果在规定时间内再次触发该事件,则重新开始计算时间
游戏理解: 法师读条法术,进度条未读完再次释放则会打断上次施法
### 应用场景
1. 用户连续操作导致事件频发触发回调
2. 用户只关系操作之后的结果(滚动条啊,搜索输入啊,这种)
### 原理
通过定时器将回调函数进行延时,在规定时间内继续回调,发现存在之前的定时器时,清空该定时器并重新设置新的定时器

### 实现方法
1. 非立即执行版本: 事件触发=> 延时=> 执行回调函数 在延时中触发事件,则会重新进行延时,延时结束后执行回调函数
```javascript
function debounce (cb, delay = 16) {
  return function (args) {
    let context = this
    let _args = args
    clearTimeout(cb.timer)
    cb.timer = setTimout(function () {
      cb.call(context, _args)
    }, delay)
  }
}

function cb () {
  console.log('这是一个回调函数', arguments)
}

let debounceFn = debounce(cb)
let input = document.getElementById('test-input')
input.addEventListener('keyup', function (e) {
  debounceFn(e.target.value)
})
```
2. 立即执行版本: 事件触发=> 执行回调函数=> 延时  在延时中触发事件,则会重新进行延时,延时结束,并不会执行回调函数
```javascript
function debounce (cb, immediate = true, delay = 16) {
  let timer = null
  return function (args) {
    let context = this
    let _args = args
    if (timer) clearTimeout(timer)
    if (immediate) {
      if(!timer) cb.apply(context, args)
      timer = setTimeout(function () {
        timer = null
      }, delay)
    } else {
      timer = setTimeout(function () {
        cb.apply(context, args)
      },delay)
    }
  }
}
```

// 防抖就是在一段时间内如果没有操作,则执行函数,如果有操作,则清除定时器重新执行
// 节流就是在一段时间内只会触发一次函数操作