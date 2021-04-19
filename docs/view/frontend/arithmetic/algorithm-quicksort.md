---
title: 快速排序
date: 2018-05-20
tags: 
  - algorithm
categories: 
  - arithmetic
---
## 算法介绍

### 算法描述

快速排序因为时间复杂度较低,且其核心思想分治法实用性强,算法难度不高,使其流行度较高

### 算法步骤

1. 从数组中取出一个数作为基数

2. 对数组进行遍历,将大于该数的数放在基数的右边,小于该数的放在基数的左边

3. 对左侧和右侧的数组继续进行上述操作,直至左右侧只有一位数

### 算法实现

```javascript
funtion quickSort (arr) {
  if (!arr.isArray) return []
  if (!arr.length) return []
  let baseIndex = Math.floor(arr.length / 2)
  let baseNumber = arr.splice(baseIndex, 1)[0]
  let left = []
  let right = []
  arr.forEach(item => {
    if (item < baseNumber) left.push(item)
    else right.push(item)
  })
  return quickSort(left).concat(baseNumber,quickSort(right))
}
```