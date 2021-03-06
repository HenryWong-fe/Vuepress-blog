---
title: 垃圾回收机制
date: 2018-06-23
categories: 
  - js
---
# 垃圾回收机制 
**javascript**有内置的垃圾回收机制GC,执行环境在管理代码执行过程中使用的内存,内存的分配和回收全都由js引擎来管理

## 内存生命周期
1. 内存分配阶段: 声明变量,函数,对象并执行时,系统会自动为其分配内存
2. 内存使用阶段: 使用变量,函数时
3. 内存回收阶段: 变量,函数被使用完毕,由GC机制回收

## 垃圾回收机制的策略

### 标记清除法: mark-and-sweep
**算法:**  
1. 标记阶段: GC从根开始遍历,凡是可以到达根的对象,都是仍需要使用的对象,被标记
2. 清除阶段: GC会对堆内存从头到尾进行线性遍历,发现对象没有被标记则将其占用的内存回收,标记了的对象被去除标记

**缺陷**
1. 不能从根对象查询到的对象都会被清除
2. GC后会产生大量的内存碎片,因为对象需要连续的内存单位,可能会导致内存碎片持续未被使用,直到内存溢出

*** 

### 引用计数法
**算法:**  
对象是否未被其他对象引用  

**缺陷:**  
无法处理循环引用,创建两个对象,互相引用,则这两个对象永远无法被垃圾回收,从而导致内存溢出

*** 

### V8垃圾回收算法
chrome的v8引擎采用了分代回收策略,将内存对象分为临时对象和持久对象  
临时对象和持久对象的回收机制并不相同  
因为GC会导致js线程暂停执行,一次较长的GC可能会持续1s以上的时间,所以通过持续回收临时对象来减少GC的执行时间

*** 

### V8的内存限制
在node中javascript可使用的内存有限制
> 1. 64位系统下约1.4GB,临时对象存储空间约32MB
> 2. 32位系统下约0.7GB,临时对象存储空间约16MB
#### 临时对象
临时对象的存储空间将会被均分为两块,只有一块处于使用状态,其被称为FROM空间,另一块则闲置,被称为TO空间
GC时,将FROM空间中的临时对象中的存活对象进行标记,GC结束后将被标记对象复制到TO空间中,将FROM空间的内存清空,此时FROM空间与TO空间角色互换,如此循环  
**缺陷:**减少了空间的使用,换来了时间上的节省  
**优点:**极其适合临时对象的垃圾回收,因为临时对象生命周期短,适合该算法

##### 晋升机制
当一个对象经过多次复制后依然存在,其就会被标记为持久对象,被移动至持久对象存储空间中
##### 晋升条件
1. 对象经历过临时存储空间的GC
2. 临时存储空间中的TO空间被占据25%以上
#### 持久对象
持久对象的存储空间较大,存储的对象较多,使用临时对象的那种GC算法牺牲的空间太大,而且持久对象的生命周期较长  
持久对象的GC算法为mark-and-sweep,即标记-清除,标记非活跃对象,清除非活跃对象
但是mark-and-sweep会导致内存不连续,产生大量的内存碎片,导致内存溢出的可能性
为了解决上述问题引入了一种新的算法Mark-compact,即标记-排列整理,在标记后,将活跃对象往一端移动,移动完成后,清除边界外的内存,但该种算法的执行速度较慢,所以仅在临时对象晋升后的内存分配时使用