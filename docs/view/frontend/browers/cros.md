---
title: 跨域解决方案
date: 2019-01-09 13:37:29
tags: 
  - cros
categories: 
  - browers
---
## 跨域

### 原因
浏览器出于安全考虑,有了同源原则.只要协议,域名,端口号三者有一个不同,都会被当做是不同域
### 解决方案
#### JSONP
利用script标签没有跨域限制的特性,通过把src的链接配置为接口的地址,并提供一个回调函数来接受数据
```javascript
function jsop(url,jsonpCb, success) {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[jsonpCb] = function (data) {
    success && success()
  }
  document.body.appendChild(script)
}
jsonp('http://xxx', 'callback', function (value) {
  console.log(value)
})
```

#### CORS
CORS定义了必须访问跨域资源时,浏览器如何与服务器进行沟通  
基本思想是使用自定义的HTTP头部让浏览器与服务器进行沟通,从而决定请求或响应是否成功  
兼容性,不低于IE10  
CORS通信的关键在服务器,服务器实现了CORS接口,就可以实现跨域通信,而浏览器端,无需做任何更改,由浏览器自动完成  
服务器端对CORS的支持,主要是通过Access-Contril-Allow-Origin来进行,该属性用于标识哪些域名可以跨域访问,如果浏览器检测到域名匹配则可以进行跨域访问
#### postMessage
window.postMessage提供了一种受控机制来规避此限制,可以安全的实现跨源通信  
当postMessage方法被调用时,会在页面脚本执行完毕后,会发送一个MessageEvent给目标窗口  
MessageEvent含四个属性
```javascript
let messageCb = function (event) {
  let message = event.message // 消息类型,消息名称
  let source = event.source // 消息源window对象
  let origin = event.origin // 消息来源地址
  let data = event.data // 发送过来的消息
}
window.addEventListener('message', messageCb, false)
```
#### Nginx反向代理
```bash
server {
  listen 80;
  server_name www.xxx.com;

  location / {
    proxy_pase api.xxx.com;
    index index.html index.htm;
  }
}
```