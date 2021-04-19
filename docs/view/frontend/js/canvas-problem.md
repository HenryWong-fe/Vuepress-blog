---
title: 如何解决canvas绘制时出现的闪屏问题
date: 2019-04-28 20:38:01
categories: 
  - js
---
## 问题代码
```javascript
function refreshCanvas () {
  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  // 清除画布
  ctx.clearRect(0,0, canvas.width, canvas.height)
  // 重新绘制
  ctx.drawImage(bg, 0, 0)
}
```
## 问题分析
canvas在清除画布时,如果绘制时间过长,则会导致出现闪屏的问题

## 解决方案
```javascript
function refreshCanvas () {
  const canvas = document.getElementById('canvas')
  const tempcanvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')
  const tempctx = tempcanvas.getContext('2d')
  tempctx.width = window.screen.width
  tempctx.height = window.screen.height
  // 缓存canvas绘制
  tempCtx.drawImage(bg,0,0); // 背景
  // 目标canvas清除画布
  ctx.clearRect(0,0, canvas.width, canvas.height)
  // 目标canvas重新绘制
  ctx.drawImage(tempcanvas, 0, 0)
}
```