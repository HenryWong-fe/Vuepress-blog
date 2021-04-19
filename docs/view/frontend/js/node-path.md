---
title: NodeJs的path模块
date: 2019-04-30 13:36:39
categories: 
  - js
---

## 方法

1. path.normalize(路径) 规范化路径
2. path.join(path1,path2,path3,path4....) 用于连接路径,该方法会正确使用系统路径分隔符
3. path.reslove([from...],to) 将to参数解析为绝对路径,给定的路径的序列是从右向左被处理的,后面的path依次解析,直到构建出一个完成的path路径
4. path.isAbsolute(path) 判断路径是否为绝对路径
5. path.relative(from, to) 返回从from 到 to的相对路径
6. path.dirname(path) 返回路径中代表文件夹的部分
7. path.basename(path) 返回路径中的最后部分
8. path.parse(pathString) 返回路径字符串的对象
9. path.format(pathObject) 从对象中返回路径字符串
