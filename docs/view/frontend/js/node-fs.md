---
title: NodeJs的fs模块
date: 2018-11-26 16:53:53
categories: 
  - js
---
## fs模块
```javascript
// 打开文件
fs.open('test.txt', 'r+', function (err, fd) {
  if (err) {
    return console.error(err);
  }
  console.log("文件打开成功！");    
})
// 获取文件信息
fs.stat('test.txt', function (err, status) {
  status.isFile() // 是否为文件
  status.isDirectory() // 是否为文件夹
  status.isBlockDevice() // 是否是块设备
  status.isCharacterDevice() // 是否是字符设备
  status.isSymbolicLink() // 是否是软链接
  status.isFIFO() // 是否是FIFO
  status.isSocket() // 是否是Socket
})
```

### 对文件夹的操作的一些命令总结
* 读取文件夹 fs.readdir(path, callback)
* 创建文件夹 fs.mkdir(path, cb)
* 删除文件夹 fs.rmdir(path, callback)

### 对文件的操作的一些命令总结
* 关闭文件 fs.close(fd, callback)
* 读取文件 fs.read(fd, buffer, offset, length, position, callback)
* 写入文件 fs.writeFile(file, data[, options], callback)
* 删除文件 fs.unlink(path, cb)
* 截取文件 fs.ftruncate(fd, len, callback)

### 同步与异步将文件复制至缓存区,然后从缓存区读取文件

#### 同步读取文件
**特点** 在读取操作结束下,无法进行下一步操作
```javascript
let data = fs.readFileSync('test.txt', 'utf8')
console.log(data) // 文件数据
```
#### 异步读取文件
**特点** 在读取操作结束下,可以进行下一步操作,在读取结束后,会将读取结果用参数形式传入回调函数,并执行回调函数
```javascript
fs.readFile('test.txt', 'utf8', function (err) {
  if (err) console.log('读取失败')
  else console.log('读取成功')
})
```

### 同步与异步将文件复制至缓存区,然后从缓存区写入文件中

#### 同步读取文件
**特点** 在读取操作结束下,无法进行下一步操作
```javascript
fs.writeFileSync('test.txt', 'hello world')
```

#### 异步读取文件
**特点** 在读取操作结束下,可以进行下一步操作,在读取结束后,会将读取结果用参数形式传入回调函数,并执行回调函数
```javascript
fs.writeFile('test.txt', 'hello world', function (err) {
  if(err) console.log('写文件操作失败');
  else console.log('写文件操作成功');
})
```

### 同步或异步分块式读取文件内容
> fs.read(fd, buffer, offset, length, position, callback)

参数说明:  
* fd 文件名
* buffer 数据写入的缓存区
* offset 缓冲区写入的偏移量
* length 要读取的字符数
* position 文件读取的起始位置 为null时,从文件指针位置开始
* callback 回调函数

#### 异步读取文件
**特点** 
```javascript
let buffer = new Buffer(255)
fs.read('test.txt', buffer, 0, 3, null,function (err,bytesRead,buffer) {
  if(err) console.log('写文件操作失败');
  else console.log('写文件操作成功');
})
```

#### 同步读取文件
**特点** 
```javascript
fs.readSync('test.txt', buff, 0, 3, null)
```

### 创建一个读取/写入流
fs.createReadStream('test.txt')

#### 读取流
```javascript
const fs = require('fs');
let readStream = fs.createReadStream('./message.txt', {start:3,end:12});
readStream.on('open', function (fd) {
  console.log('开始读取文件');
});
readStream.on('data', function (data) {
  console.log('读取到数据：', data);
});
readStream.on('end', function () {
  console.log('文件已全部读取完毕');
});
readStream.on('close', function () {
  console.log('文件被关闭');
});
readStream.on('error', function (err) {
  console.log('读取文件失败');
});
```

#### 写入流
```javascript
const fs = require('fs');
const file = fs.createReadStream('./message.txt');
let out = fs.createWriteStream('./anotherMessage.txt');
file.on('data', function (data) {
  out.write(data);
});
out.on('open', function (fd) {
  console.log('需要被写入的文件已打开');
});
file.on('end', function () {
  //将操作系统缓存区中的数据全部写入文件
  out.end('再见', function () {
    console.log('文件全部写入完毕');
    console.log('共写入'+out.bytesWritten+'数据');
  });
});
```