---
title: Git的基础操作指令
date: 2018-10-13
tags: 
  - git
categories: 
  - base
---

## 全局配置

### Git操作
1. 配置全局信息
```bash
$ git config --global user.name "henry"
$ git config --global user.email henry@example.com
$ git config --global alias.<alias-name> <命令名> // 设置别名 如 git ci 等价于 git commit 
```

2. 初始化本地仓库
```bash
$ git init
```

3. 查询当前文件状态
```bash
$ git status
```

4. 添加文件到git暂存区
```bash
$ git add 文件名
$ git add . // 添加所有文件到暂存区
```

5. 提交暂存区文件到git本地仓库
```bash
$ git commit -m '提交信息'
$ git commit --amend // 重新提交
```

6. 撤销暂存区文件
```bash
$ git reset HEAD 文件名
```

7. 查看远程仓库
```bash
$ git remote
$ git remote -v // 显示需要读写远程仓库使用的 Git 保存的简写与其对应的 URL
```

8. 添加远程仓库
```bash
$ git remote add <remote-name> <url> // 添加一个新的远程Git仓库
```

9. 拉去远程仓库到本地
```bash
$ git fetch <remote-name>
```

10. 推送到远程仓库
```bash
$ git pull <remote-name> <branch-name>
```

11.  修改远程仓库名称
```bash
$ git remote rename <remote-name> <new-remote-name>
```

12. 删除远程仓库
```bash
$ git remote rm <remote-name>
```

13. 查看所有标签
```bash
$ git tag
$ git tag -l '搜索词'
```

14. 创建标签
```bash
$ git tag  <tag-name> // 创建一个轻量标签
$ git tag -a <tag-name> -m '存储在标签中的信息' // -a 创建一个携带标签信息的标签 -m 标签信息
$ git tag -a <tag-name> 提交的校验和（或部分校验和） // 给过去的提交打标签
```

15. 将标签推送到远程
```bash
$ git push <remote-name> <tag-name> // 推送一个tag到远端
$ git push <remote-name> --tags // 推送多个tag到远端
```

16. 删除标签
```bash
$ git tag -d <tag-name> // 本地删除一个指定的tag
$ git push <remote-name> :refs/tags/<tag-name> // 远端删除一个指定的tag
```

17. 检出标签
```bash
$ git checkout <tag-name> // 将指针指向指定的tag
$ git checkout <tag-name> // 将指针指向指定的tag
```

### 分支操作
1. 创建分支
2. 删除分支
```bash
$ git brach -d
```
3. 查询分支
```bash
$ git branch
```