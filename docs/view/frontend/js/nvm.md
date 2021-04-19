---
title: Node版本切换工具nvm
date: 2018-07-20
categories: 
  - js
---
## nvm

Node版本切换工具

### 安装 

因nrm依赖git,请确认已安装git

``` bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
$ 或者
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
```

### 环境变量设置
> 这四个文件中的一个 ~/.bashrc, ~/.bash_profile, ~/.zshrc, ~/.profile 文件下添加
``` bash
$ export NVM_DIR="$HOME/.nvm" [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
$ source .bash_profile // 启用
$ nvm ls // 测试
```

### 使用

``` bash
$ nvm ls // 展示现有node版本列表
$ nvm use <node-version>
```

## 卸载

``` 
$ cd ~
$ rm -rf .nvm
$ // 去除上面设置的全局路径
$ source .bash_profile
```