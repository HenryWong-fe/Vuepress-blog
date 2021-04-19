---
title: 将hexo静态文件部署至云服务器
date: 2020-04-03 16:59:33
categories: 
  - hexo
description: 通过hexo-deploy-git将静态文件部署至云服务器
---

## 服务器环境安装

> 如你已经安装过 node,git 及 nginx,请直接略过

### node 环境安装

```bash
yum install nodejs
```

验证是否成功安装

```bash
node -v
npm -v
```

### git 及 nginx 的安装

```bash
yum install git
yum install nginx
```

### hexo 的安装

> hexo-cli 是 Hexo 的命令行工具，可用于快速新建、发布、部署博客；
> hexo-server 是 Hexo 的内建服务器，可用于部署前的预览和测试。-g 选项，表示全局安装。

```bash
npm install hexo-cli hexo-server -g
```

验证是否安装成功

```bash
hexo
```

## 服务器上 git 的相关配置

### 创建 git 用户,用于相关服务

```bash
adduser git
passwd git
```

### 创建证书

```bash
su git # 切换到git用户
mkdir .ssh && chmod 700 .ssh # 创建.ssh文件夹并设定文件夹权限
su - # 切换到root用户
touch .ssh/authorized_keys && chmod 600 .ssh/authorized_keys # 创建authorized_keys公钥保存文件
```

### 创建 git 仓库目录

```bash
mkdir /var/repo # 创建repo文件夹,用于存放源文件
cd /var/repo
git init --bare blog.git
```

### 配置 GIT HOOKS

```bash
vim /var/repo/blog.git/hooks/post-receive
```

填写以下内容

```bash
#!/bin/sh
git --work-tree=/var/www/hexo --git-dir=/var/repo/blog.git checkout -f
```

保存退出，并设置权限

```bash
chmod +x /var/repo/blog.git/hooks/post-receive
```

### 改变 BLOG.GIT 目录的拥有者为 GIT 用户

```bash
chown -R git:git blog.git
```

### 创建静态文件目录并将生成的 git 仓库链接到静态文件目录下

```bash
mkdir /var/www/hexo # 创建静态文件目录,hexo生成的静态文件存放的地址
chown -R git:git /var/www/hexo # 链接git仓库
chmod -R 755 /var/www/hexo # 配置权限
```

这样 git 仓库的更新会自动同步到该文件夹下

### 本地尝试拉取远端仓库

```bash
git clone git@服务器ip:/var/repo/blog.git
```

如果成功拉取,则证明配置成功

## hexo 配置

### 配置,并发布到服务器

```bash
deploy:
  type: git
  repository: git@ip或域名:/var/repo/blog.git
  branch: master
```

将文件上传到你部署的服务器

```bash
hexo clean && hexo g -d
```

## 服务器端 nginx 的配置

> 为了能让浏览器能直接访问静态页面，需要使用 nginx 将端口或域名指向 hexo 静态文件目录

```bash
vim /etc/nginx/conf.d/blog.conf # centos系统
vim /etc/nginx/sites-available/default # ubuntu系统
```

> **注意:** 不同版本的 nginx 或系统，nginx 的配置文件不一定相同，根据具体情况来修改配置

### nginx 配置文件

```bash
server {
    listen 80;
    listen [::]:80;
    root /var/www/hexo; # 修改的地方
    server_name xxx.xxx www.xxx.xx; # 如果需要改域名访问，修改server_name 为域名便可
    location / {
      # First attempt to serve request as file, then
      # as directory, then fall back to displaying a 404.
      try_files $uri $uri/ =404;
    }
}
```

### nginx 重启

```bash
nginx -s reload
```
