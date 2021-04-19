---
title: 浏览器存储方案
date: 2019-04-26 15:08:13
categories: 
  - browers
---
## 确立目标
理解cookie,sessionstorage,localstorage,indexDB等浏览器存储数据方案的使用方法,优缺点

## 学习理解

### cookie

#### 特征

* 不同浏览器存储cookie的位置不同,所以不能通用
* 不同域下的cookie是独立的
* 我们能够操作的cookie,是在当前域,和当前域的子域中
* 一个域下可存储的cookie有限(20个左右)
* 存放大小也有限制(4kb)
* cookie可以设置过期时间(默认会话结束就销毁)

#### 配置项

##### expires
expires用于设定cookie的有效时间,默认为会话结束后(浏览器窗口关闭)  
expires必须是GMT格式的时间,可以通过new Date().toGMTString()或者 new Date().toUTCString()来获得

##### domain,path
domain和path共同确定了cookie的作用域,如果路径匹配成功,则会被添加到请求的头部中,如果没有设置,则会使用默认值  
domain的默认值为设置该cookie的网页所在的域,path默认值为设置该cookie的网页所在的目录

##### secure
cookie通常使用http连接来传递数据,这种数据很容易被查看,所以cookie存储信息容易被窃取,当我们使用https等加密安全协议时,可以使用加密的数据传输cookie  
secure选项用来设置cookie只会在安全的请求中才进行发送,但这样的cookie只有在传输过程中是加密的,存储到本地的cookie文件是不加密的,所以机密和敏感的信息不应该放在cookie中进行传输

##### httpOnly
cookie默认是可以通过js来进行操作的,但是如果我们不想js来操作cookie的话,可以通过设置httpOnly属性  
设置过该属性后,客户端无法通过js代码来进行读取,写入,删除,修改等操作,这种类型的cookie只能由服务器端进行设置

### sessionstorage
**特点**  
数据在相同协议,端口,域名,窗口下,可以访问,且会话窗口关闭则数据被清除
```javascript
window.sessionStorage.setItem(key, value) // value必须是字符串类型
window.sessionStorage.getItem(key)
```
### localstorage
**特点**
数据持久化存储,相同协议,端口,域名下就可以访问并操作数据