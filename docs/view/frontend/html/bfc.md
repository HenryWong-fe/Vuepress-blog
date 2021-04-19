---
title: html之你真的了解BFC吗
date: 2019-06-19 10:59:27
categories: 
  - html
---

***

### BFC是什么

简单来说BFC,就是块级格式上下文,其会创建一个特殊的区域,这个区域中,只有block-box可以参与布局.
在BFC创建的区域中,有一套自己的布局规定(如何定位,如何排列,布局区域内元素之间的相互作用)

#### Block-box是什么

指display属性值为block, list-item, table的元素

#### 除了Block-box还有哪些box类型

常见的如inline-box flex-box grid-box

### 如何创建BFC

1. 根元素或包裹其的元素
2. 浮动元素
3. 定位元素 (fixed,absolute)
4. 内联块元素 (display: inline-block)
5. 表格单元格 (display: table-cell)
6. 表格标题
7. 有overflow属性,且属性值不为visible的元素
8. display: flow-root
9. column-span: all

### BFC内的布局规则

1. BFC内部的block-box独占宽度,且在垂直方向上一个接一个排列
2. block-box垂直方向的间距由margin决定,但同一个BFC的两个相邻box的margin会出现重叠的情况
3. BFC区域不会与浮动元素重叠,而是会依次排列
4. BFC区域是个独立的渲染盒,盒内的元素与外界元素不会形成干扰
5. 浮动元素的高度参与到BFC高度的计算中
6. 每个 block-box水平方向上的左边缘与BFC区域的左边缘对齐,即使存在浮动

### BFC的特性引发的一些应用和解决方案

#### 自适应多栏布局

``` html
<style>
    body {
        width: 500px;
        position: relative;
    }

    .left {
        width: 80px;
        height: 100px;
        float: left;
        background: blue;
    }

    .right {
        height: 100px;
        background: yellow;
    }
</style>

<body>
  <div class="left"></div>
  <div class="right"></div>
</body>
```

如果想让上面的right元素与left元素自适应充满全屏,根据规则BFC区域不会与浮动元素重叠的规则特性,只要将Right元素形成BFC区域即可


#### 如何解决父级元素高度坍塌的问题

``` html
<style>
    .parent {
      border: 1px solid black;
      width: 300px;
    }

    .child {
      border: 1px solid red;
      width: 100px;
      height: 100px;
      float: left;
    }
</style>
<body>
    <div class="parent">
        <div class="child"></div>
        <div class="child"></div>
    </div>
</body>
```

根据BFC的规则,浮动元素也会加入高度计算的特性,只要Parent元素形成Bfc即可