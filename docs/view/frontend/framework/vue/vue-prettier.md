---
title: vue项目格式化
date: 2019-05-15 14:57:58
tags:
  - vue
categories: 
  - framework
---
## vscode中vue项目的格式化

vscode中开发vue项目,可以使用以下格式化方式


### vetur

对vue文件的代码做高亮展示  
vetur 对vue后缀的文件进行格式化,分别格式化template style script,可配置相应的格式化工具

``` json
{
  "vetur.format.defaultFormatter.scss": "none",
  "vetur.format.defaultFormatter.postcss": "none",
  "vetur.format.defaultFormatter.css": "none",
  "vetur.format.options.useTabs": true,
  "vueStyle.formatOnSave": true,
}
```

### vue-style-beautify

因prettier会自动将style中的大写px格式化为小写的px,使用其可以避免该问题,内置对样式属性的排序功能

* 这是一个专门为vue文件样式格式化的插件,特点是会按照csscomb的规则对css样式进行排序
* 优点是格式化时不会将大写的PX转译为小写的px
* 其缺点是会将文件全部展开