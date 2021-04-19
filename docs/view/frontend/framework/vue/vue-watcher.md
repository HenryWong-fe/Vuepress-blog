---
title: vue观察者模式
date: 2019-06-13 14:32:23
tags:
  - vue
categories: 
  - framework
---

## 观察者模式

观察者模式有两个对象 目标 和 观察者

* 目标是被观察的对象,其属性的变化,会通知到观察该对象的观察者
* 观察者会观察不同的目标,目标的变化会通知观察者,并通知vue引擎来进行视图的更新

### 如何实现

#### 实现Observe数据监听

``` javascript
class Observe {
  constructor (value) {
    this.value = value
    this.walk(value) // 将属性值observe
  }
  walk(value) {
    Object.keys(value).forEach(key => this.covert(key, value[key]))
  }
  covert(key, value) {
    defineReactive(this.value, key , value) 
  }
}

defineReactive(obj, key, val) {
  // 对每个属性订阅
  let dep = new Dep()
  let ob = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: ()=>{
      // 说明这是watch 引起的
      if(Dep.target){
        dep.addSub(Dep.target)
      }
      return val
    },
    set: function (newV) {
      if (newV === val) return 
      val = newV
      // 判断赋值的值是否为对象,如果是对象则,递归操作将对象上的属性监听
      ob = observe(newV)
      // 触发订阅者的notify方法,对视图进行更新
      dep.notify()
    }
  })
}

observe(val) {
  if (!val || typeof val !== 'object') {
    return
  }
  return new Observe(val)
}
```

#### 实现订阅器Dep
``` javascript
class Dep {
  constructor () {
    // 订阅者数据
    this.subs = []
  }
  addSub(sub) {
    // 添加订阅者
    this.subs.push(sub)
  }
  notify() {
    // 通知订阅者数据变化
    this.subs.forEach(sub => sub.update())
  }
}
Dep.target = null
```

### 实现Watcher

``` javascript
// 观察者
class Watcher {
  constructor (vm, expOrFn, cb) {
    this.cb = cb
    this.vm = vm
    this.expOrFn = expOrFn
    this.value = this.get()
  }
  update() {
    // 通知视图更新
    console.log(视图更新)
    this.run()
  }
  run() {
    const value = this.get()
    if (value !== this.value) {
      this.value = value
      this.cb.call(this.vm)
    }
  }
  get(){
    // 当前vm的某个属性值
    // 此处简化。。要区分fuction还是expression
    Dep.target = this
    const value = this.vm._data[this.expOrFn]
    Dep.target = null
    return value
  }
}
```

### 实现一个vue实例

``` javascript
class Vue () {
  constructor(options) {
    this.$options = options
    let data = this.data = this.$options.data
    Object.keys(data).forEach(key => this._proxy(key))
  }
  $watch(expOrFn, cb) {
    new Watcher(this, expOrFn, cb)
  }
  _proxy(key) {
    let self = this
    Object.defineProperty({
      enumerable: true,
      configurable: true,
      get: function() {
        return self.data[key]
      },
      set: function(value) {
        self.data[key] = value
      }
    })
  }
}
```

### 来一个数据属性变化
``` javascript
let vm = new Vue()
vm.$watch('a', function => {
  console.log('数据变化', a)
})
setTimeout(() => {
  vm.a = 5
})
```