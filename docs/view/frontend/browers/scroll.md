---
title: 浏览器滚动穿透问题.md
date: 2019-06-08 09:44:05
categories: 
  - browers
---
***

### 滚穿是什么

> 当我们用fixed定位元素做蒙层,引导用户进行操作时,用户对弹层的滑动操作会导致蒙层下的页面跟随滚动

> 模态框的组成
  > 遮罩层
  > 模态框

### 如何解决滚穿

* 禁止遮罩层滚动
* 监听用户手势滑动动作,当用户滑动至弹窗上层边界和下层边界时,阻止其touch事件
``` html
<template>
  <div class="mask" @touchmove.stop>
    <div class="model" @touchmove="touchMove" id="Model" @touchstart="touchStart">
      <span class="content" v-for="i in 20">这是一段文字</span>
    </div>
  </div>
</template>
<script>
  export default {
    ...
    data() {
      return {
        startY: 0
      }
    },
    methods: {
      touchmoveForbidden(e) {
        e.preventDefault()
      },
      touchStart(e) {
        this.startY = e.targetTouches[0].clientY
      },
      touchMove(e){
        let target = document.getElementById('Model')
        let offsetHeight = target.offsetHeight
        let scrollHeight = target.scrollHeight;
        let changedTouches = e.changedTouches;
        let scrollTop = target.scrollTop;
        if (changedTouches.length > 0) {
          let touch = changedTouches[0] || {};
          let moveY = touch.clientY;
          if (moveY > this.firstY && scrollTop === 0) {
            // 滑动到弹窗顶部临界条件
            e.preventDefault()
            return false
          } else if (moveY < this.firstY && scrollTop + offsetHeight >= scrollHeight) {
            // 滑动到底部临界条件
            e.preventDefault()
            return false
          }
        }
      }
    }
  }
</script>
```

### 复习一下相关知识点

* offsetHeight 元素自身的高度(含border,padding,滚动条高度)
* clientHeight 元素自身的高度(仅含padding)
* scrollHeight 元素不滚动时,scrollHeight = clientHeight,元素滚动时scrollHeight = scrollTop + clientHeight
* scrollTop 元素滚动时,已滚动到元素顶部以上的距离
* offsetTop 元素距离最近一级定位父元素顶部的距离