---
title: LeetCode 74. 搜索二维矩阵
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二分查找
date: 2021-03-31 23:24:36
---

<!--more-->
## 分析

二分查找：查找某个数村不存在。
- 哪一类二分，该套哪个板子？
- 上限下限？循环终止条件？如何避免死循环？

题目给的是一个二维矩阵，但本质上是一个单调递增的一维数组，只不过转换需要点小技巧罢了：
- 确定上下界前：将二维索引转化为一维索引；
- 比大小，确定选左边还是选右边时：将一维索引转化为二维索引；

```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int tar) {
        if(matrix.empty()) return false;
        int m = matrix.size();
        int n = matrix[0].size();
        int p = 0, r = m * n - 1;
        while(p <= r) {
            int q = p + r >> 1;
            int x = q / n;
            int y = q % n;
            if(matrix[x][y] == tar) return true;
            matrix[x][y] < tar ? p = q + 1 : r = q - 1;
        }
        return false;
    }
};
```
