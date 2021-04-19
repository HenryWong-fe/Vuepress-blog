---
title: 浏览器的回流与重绘
date: 2019-04-28 14:45:57
categories: 
  - browers
---
## 浏览器的渲染机制

### 渲染步骤
1. 读取字符流,通过状态机,将字符转化为DOM节点,并构成树形结构
2. 处理CSS,构建CSSOM树
3. 将DOM树,与CSSOM树结合构建出渲染树
4. 调用GPU绘制,合成图层

**注意事项**  
* 构建CSSOM树时,会阻塞渲染,直至CSSOM树构建完成,所以深层的嵌套结构会导致更长的构建时间,保持层级的扁平有助于提升页面性能
* 越是具体的CSS选择器,执行速度越慢
* js代码会阻止DOM树的构建,如果想拥有更快的首屏加载速度,则应将脚本文件,放在body标签后

### Load和DOMContentLoaded的区别

* Load事件表明js,css,dom,图片均加载完毕
* DOMContentLoaded事件表明html被完全加载和解析,可以进行对dom节点的操作

### 图层

正常的文档流是一个图层,一些特别的属性可以生成一个新的图层,不同图层的渲染互不影响  
如果想对DOM节点进行持续的操作,最好将DOM节点生成一个新的图层  
过多的图层依然会引起页面性能的下降

**以下几个属性和标签会产生新的图层**
1. transfrom: translateZ(0) transfrom: translate3d()
2. will-change 
3. video,iframe标签
4. position: fixed
5. opacity

## 回流与重绘

### 概念

### 回流与重绘和Event loop的关系

### 如何触发回流与重绘

### 如何减少回流与重绘
