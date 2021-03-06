---
title: 事件循环与任务队列
categories: 
  - js
---

### 单线程

众所周知,大家都知道JS是单线程的,其在同一时间只能执行一段代码,因此,JS并不具备并行任务处理的特性,(worker api可以实现多线程,但js本身始终是单线程的)
当某个任务很耗时的时候,如涉及多个I/O操作时,那么线程就会堵塞,产生大量的时间等待,且线程并不能被释放去执行其他任务,导致资源的持续占用,这样的运行方式被称之为同步模式,或阻塞模式
即使是采用多线程来并行运行多个任务,就会导致占用多倍的系统资源,是极不合理的
> 在浏览器进程中,js引擎是其中的一段线程,但是浏览器进程是事件驱动的,浏览器中有很多的异步行为,其会创建时间并放入执行队列中. 
> 浏览器中很多异步行为都是浏览器开启一个线程去完成的

从[计算机原理之线程与进程]一篇文章中, 我们知道每个线程都有自己的执行栈,和自己的程序本地存储

浏览器中有一些常驻的线程:
* Js引擎 (如著名的v8)
* GUI渲染 (用于浏览器页面的渲染)
* 事件触发 (如点击等)

### js引擎

Js引擎主要的构成:
* 内存堆-内存分配发生的地方
* 执行栈-函数调用时,会形成执行栈

#### 调用栈

调用栈的执行顺序
1. 函数被调用,函数相关的值被推入栈中 **返回地址,参数,本地变量**
2. 函数执行完毕,局部变量(简单数据类型)被弹出栈,复杂数据类型被弹出相对应的内存指针
> 只有简单数据类型是被存放在执行栈中
> 复杂数据类型只是将其相对应的内存指针存放在执行栈内,其真正的值在内存堆里
> 当复杂数据类型的对象没有用后,则被垃圾回收机制回收,释放内存堆的空间


#### Event loop
事件循环是为了解决单线程和多线程中,因阻塞操作导致的资源长时间占用产生的一系列问题
简单的说,就是在进程中开设两个线程,一个用于进程本身运行的主线程,和另一个负责主线程与其他进程进行的通信

每当遇到I/O操作时,主线程让event loop通知相应的I/O进程,然后继续执行主线程中的其他函数,所以不存在等待时间,等到I/O进程完成了相关的操作,event loop再将结果通知主线程,主线程调用事先设定好的回调函数,来完成任务

这样的运行方式被称之为异步模式,这样的运行方式就是js的运行方式,单线程虽然对js的性能产生了很多限制,但因为这样的运行方式也拥有了其他语言所不具备的优势.

如果设计得当,js就不会产生阻塞,这就是Node为何能使用较少的资源来应对大流量的访问的原因


#### 宏任务与微任务

##### 宏任务

##### 微任务