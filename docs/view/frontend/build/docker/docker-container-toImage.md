---
title: docker-containerToImage 导入导出镜像
date: 2018-12-21
categories: 
  - docker
---

## 容器修改,镜像保存

### 给保存的镜像命名

将容器修改的内容保存为镜像使用`docekr commit`

``` bash
$ docker commit -m "提交信息" <image>:<tag> <new-image>:<tag>
```

将容器内沙盒文件系统记录成镜像层的时候,会先暂停容器的运行

#### 如何给未命名的镜像命名

``` bash
$ docker tag  <imageId> <new-image>:<tag>
```

#### 给已有的镜像新的命名

``` bash
$ docker tag  <image>:<tag> <new-image>:<tag>
```

### 镜像迁移

当我们将对容器的更改导出为镜像后,就可以开始对镜像的迁移操作

#### 镜像导出

##### 使用管道符导出镜像到文件

``` bash
$ docker save <image>:<tag> > <file-name>
```

在默认定义下,docker save命令会将镜像内容放入输出流中,需要使用>管道符号将其导入到文件当中

##### 使用-o指定输出文件

``` bash
$ docker save -o <file-name> <image>:<tag>
```

#### 镜像导入

##### 使用管道符导入镜像

``` bash
$ docker load < <file-name>
```

##### 使用-i指定输入文件

``` bash
$ docker load -i <file-name>
```

导入的镜像会应用原有的镜像名称
 
### 对容器的导出迁移的合并操作 export

使用`docker commit` 和 `docker save` 操作来讲容器更改打包为文件的操作可能有些繁琐,我们可以使用`docker export` 来进行


将指定镜像打包到指定文件

``` bash
$ docker export -o <file-name> <image>:<tag>
```

将指定文件导出为镜像

``` bash
$ docker import <file-name> <image>:<tag>
```
