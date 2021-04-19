---
title: docker-dockerfile
date: 2018-12-13 13:54:13
categories: 
  - docker
---

## 使用Dockerfile创建镜像

> Dockerfile比容器提交创建镜像更加直观和效率,其清晰明了直白的文件描述构建过程的方式能让我们对镜像的构建更加明晰

### Dockerfile的优势

* Dockerfile的体积小,更容易进行快速迁移和部署
* 环境构建流程记录在Dockerfile里,能够直观了解构建过程
* 修改环境搭建细节时,相比提交容器的方式来说更加简单和轻松

### Dockerfile的文件结构

* 基础指令: 用于定义新镜像的基础和性质
* 控制指令: 知道进项构建的核心部分,用于描述镜像在构建过程中需要执行的命令
* 引入指令: 用于将外部文件直接引入到构建镜像内部
* 执行指令: 能够为基于镜像所创建的容器,指定在启动时需要执行的脚本或命令
* 配置指令: 配置镜像的网络,用户等内容

### 常见的Dockerfile指令

#### FROM

指定一个基础镜像,接下来所有的指令基于该镜像,Dockerfile的第一条指令必须是FROM
当FROM第二次或者之后出现时,标识在此刻需要将FROM指定的镜像内容合并到构建镜像内容中

``` Dockerfile
FROM <image> [AS <name>]
FROM <image>[:<tag>] [AS <name>]
FROM <image>[@<digest>] [AS <name>]
```

#### RUN

用于想控制台发送命令的指令

RUN指令后跟随需要执行的命令,在构建时,致谢命令会被执行,并将它们对文件系统的修改记录下来

RUN指令支持换行,因为每个RUN指令会生成一个新的镜像层,所以如非必要,请使用\,可以方便阅读和提高镜像构建效率

``` Dockerfile
RUN <command>
RUN ["executable", "param1", "param2"]
```

#### ENTRYPOINT 和 CMD

用于给出需要执行的命令, ENTRYPOINT 和 CMD 可以为空,当两者同时给出时,CMD中的内容会作为ENTRYPOINT定义命令的参数,最终执行容器启动还是ENTRYPOINT中给出的命令

``` Dockerfile
ENTRYPOINT ["executable", "param1", "param2"]
ENTRYPOINT command param1 param2

CMD ["executable","param1","param2"]
CMD ["param1","param2"]
CMD command param1 param2
```

``` bash
$ docker run -it <image> <ENTRYPOINT-params>
```

ENTRYPOINT用于对容器进行初始化

CMD用于定义容器中主程序的启动命令

CMD中的参数会被注入到ENTRYPOINT的参数中,并执行

#### EXPOSE

指定镜像需要暴露的端口

``` Dockerfile
EXPOSE 3307
```

#### VOLUME

定义基于此镜像的容器所自动建立的数据卷

``` Dockerfile
VOLUME ["/data"]
```

在VOLUME指令中定义的目录,在基于新镜像创建容器是,会自动简历里为数据卷,无需在单独使用-v来配置


#### COPY 和 ADD

在制作新的镜像时,我们可能会遇到需要将一些软件配置,程序代码,执行脚本等直接导入到镜像内的文件系统中,使用上述指令可以帮助我们拷贝内容到镜像中


``` Dockerfile
COPY [--chown=<user>:<group>] <src>... <dest>
ADD [--chown=<user>:<group>] <src>... <dest>

COPY [--chown=<user>:<group>] ["<src>",... "<dest>"]
ADD [--chown=<user>:<group>] ["<src>",... "<dest>"]
```

ADD相比COPY,可以使用网络端URL地址作为src源,并且源文件被识别为压缩包时,会自动进行解压操作

#### ARG

声明参数变量,在构建时,通过构建指令传入参数

``` Dockerfile
ARG NGINX_VERSION
```

``` bash
$ docker build --build-arg NGINX_VERSION=1
```

#### ENV

环境变量,使用方式与参数变量一样,能够直接替换指令参数中的内容

ENV定义的变量永远优先级高于ARG定义的变量,如果两者同名

``` Dockerfile
ENV NGINX_VERSION 1
```

运行容器时,可以使用`-e`或者 `--env`来对环境变量的值进行修改

``` bash
$ docker run -e NGINX_VERSION=2
```

### 构建镜像

``` bash
$ docker build ./dockerapp
```

`docker build` 接受一个参数,该参数并非Dockerfile的文件路径,而是构建的环境目录,在dockerfile中使用的COPY和RUN指令都会使用该目录进行操作

`docker build` 会在给定的目录下寻找名为Dockerfile的文件

如果我们的Dockerfile文件不在这个目录下,或者有别的文件名,我们可以使用-f单独给出Dockerfile文件的路径

``` bash
$ docker build -t webapp:latest -f ./webapp/a.Dockerfile ./webapp
```

使用`-t`选项来指定新生成的镜像名称

``` bash
$ docker build -t webapp:latest ./webapp
```

