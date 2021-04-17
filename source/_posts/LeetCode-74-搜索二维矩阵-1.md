---
title: LeetCode 74. 搜索二维矩阵
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 矩阵
date: 2021-04-17 20:45:37
---

<!--more-->

题目直达：[LeetCode 74. 搜索二维矩阵](https://leetcode-cn.com/problems/search-a-2d-matrix/)

## 分析

从右上角（左下角也行）开始，假设当前元素为 x， 目标元素为 tar：
- 如果 x == tar，则表明存在，直接返回即可；
- 如果 x < tar，则当前行，该位置前面的元素一定也小于 tar. 直接 行 + 1 即可；
- 如果 x > tar, 则当前列，该位置后面的元素一定大于 tar，直接 列 - 1 即可；

时间复杂度: $O(m + n)$

## 代码
```cpp
class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int tar) {
        if(matrix.empty()) return false;
        int m = matrix.size();
        int n = matrix[0].size();
        int r = 0, c = n - 1;
        while(r < m && c >= 0) {
            if(matrix[r][c] == tar) return true;
            matrix[r][c] < tar ? ++r : --c;
        }
        return false;
    }
};
```