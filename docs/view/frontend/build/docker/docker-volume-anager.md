---
title: docker-volume 数据卷
date: 2019-01-21
categories: 
  - docker
---

## Docker数据管理方式

* 沙盒文件系统会随着容器生命周期而创建和移除,数据无法直接被持久化存储
* 因为容器隔离,我们很难从容器外部操作和查看容器内部文件中的数据

## 文件系统挂载的方式

### Bind Mount

将宿主操作系统中的目录文件挂载到容器内的文件系统中,通过制定容器外的路径和容器内路径,形成挂载映射关系,在容器内外对文件的读写,都是互相可见的

``` bash
docker run -d --name <container-name> -v <host-path>:<container-path>:ro <image>
docker inspect <container-name>
```

通过在挂载路径后加入:ro可以实现只读挂载,容器内部程序将无法对目录和文件进行修改

### Volume

从宿主操作系统中挂载目录到容器内,但挂载的目录由Docker管理,我们只需要制定容器内的目录,不需要关系具体挂载到了宿主操作系统中的哪个文件夹下

使用数据卷进行挂载时,依然可以使用-v或--volume选项来定义数据卷的挂载,路径需要是绝对路径

``` bash
docker run -d --name <container-name> -v <container-path> <image>
docker inspect <container-name>
```

为了方便对数据卷的管理,我们可以对数据卷命名,在我们未给出数据卷命名时,Docker会使用数据卷的Id命名数据卷,我们可以通过以下方式来命名数据卷,路径需要是绝对路径

``` bash
docker run -d --name <container-name> -v <volume-name>:<container-path>
docker inspect <container-name>
```

#### 使用场景

* 希望数据在多个容器间共享
* 希望对容器内挂载的内容进行管理
* 当使用远程服务器或云服务作为存储介质的时候,数据卷可以隐藏更多细节,让容器构建过程更加清晰简单

### Tmpfs Mount

支持挂载系统内存中的一部分到容器的文件系统里,由于内存和容器的特征,其存储并非持久的,其中的内容会随着容器的停止而消失

与挂载宿主操作系统目录或文件不同,挂载临时文件目录要通过--tmpfs这个选项来完成,由于内存的具体位置不需要我们来指定,这个选项里只需要传递挂载到容器内的目录就行了

``` bash
docker run -d --name <container-name> --tmpfs <container-path> <image>
docker inspect <container-name>
```

## 数据卷相关操作

当我们使用-v来挂载数据卷时,如果数据卷不存在,Docker会为我们自动创建和分配宿主操作系统的目录,如果同名数据卷已经存在,则会直接引用

``` bash
docker volume ls 列出当前已创建的数据卷
docker volume create <volume-name> 创建不依赖容器的数据卷
docker volume rm <volume-name> 删除指定的数据卷
docker volume prune 删除没有被容器引用的数据卷
```
 
在删除容器的命令中.我们可以通过增加-v选项来删除容器关联的数据卷

``` bash
docker rm -v <container-name>
```

## 数据卷容器

数据卷容器,不需要容器本身运行,可以找个简单系统镜像完成创建

使用数据卷容器时,不建议定义数据卷的名称,因为我们可以通过数据卷容器的引用来完成数据卷的引用

数据卷容器是容器间文件系统的桥梁,我们可以通过--volumes-from选项来引用数据卷容器

``` bash
sudo docker run -d --name <container-name> --volumes-from <volume-container-name> <image>
```

引用数据卷容器时,无需定义数据卷挂载到容器中的位置,Docker会以数据卷容器中的挂载定义将数据卷挂载到引用的容器中

## 备份和迁移数据卷

由于数据卷本身就是宿主操作系统中的一个目录,只需要在Docker资源目录中找到就可以轻松的打包,迁移,恢复

利用数据卷容器,我们可以非常方便的对数据卷中的数据进行迁移

通过建立临时容器,将用于备份的目录和要备份的数据卷都挂载到这个容器上

``` bash
docker run --rm --volumes-from <volumes-container-name> -v <host-path>:<container-path> <image> tar cvf <host-file> <container-path>
```

上面的命令的意思是创建一个在停止运行后会自动删除的临时容器,操作系统的指定文件路径绑定挂载到容器的指定文件路径上, 并解压缩指定文件到容器的指定文件夹中

``` bash
docker run --rm --volumes-from <volumes-container-name> -v <host-path>:<container-path> <image> tar xvf <host-file> -C <container-path> --strip
```