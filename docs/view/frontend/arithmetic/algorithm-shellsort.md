---
title: 希尔排序
date: 2018-06-21
tags: algorithm
categories: 学习
---
***
## 算法介绍

### 1.1 算法描述
希尔排序是建立在插入排序上的改进排序方法,对排序情况较好的序列排序时,能够达到较好的排序效率
### 1.2 算法步骤
1. 选择一个增量序列,t1, t2, ....,tj,tk 依次减少,最小为1 
2. 按照增量序列的个数,对序列进行k次排序
3. 每次排序根据对应的增量ti,将待排序列分割成若干长度为m的子序列,分别对各子表进行直接插入排序.
### 1.3 算法实现
```javascript
funtion shellSort (arr) {
  let len = arr.length
  let temp
  let gap = 1
  while (gap < len / 2) {
    gap = gap * 2 + 1
  }
  for (;gap > 0; gap = Math.floor(gap/2)) {
    for (let i = gap; i < len; i++) {
      temp = arr[i] // 按照步进值取出对应的分块数据 arr[2]和arr[0]配对 依次类推   
      // 该gap值下所分的组进行插值排序
      for (let j = i-gap; j >= 0 && arr[j] > temp; j -= gap) {
        // arr[j] > arr[i] 前值大于后值
        arr[j+gap] = arr[j] // 将前值赋值给后值
      }
      arr[j+gap] = temp //
    }
  }
  return arr
}
```
