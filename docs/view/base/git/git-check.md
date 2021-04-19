---
title: git-check
tags: 
  - git
categories: 
  - base
---

## 使用Commitlint校验代码是否符合规范

### 使用的插件
``` json
{
  "@commitlint/cli": "^8.1.0", // 代码校验时的命令行交互
  "@commitlint/config-conventional": "^8.1.0", // 代码校验规则配置
  "conventional-changelog-cli": "^2.0.23", // 从常规提交历史中生成更改日志
  "cz-customizable": "^6.2.0",
  "husky": "^3.0.4", // git-hook工具 用于对git各类钩子做自定义处理
}
```