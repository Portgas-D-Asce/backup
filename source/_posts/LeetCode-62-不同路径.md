---
title: LeetCode 62. 不同路径
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 数论
date: 2021-04-21 22:19:12
---

<!--more-->

题目直达：[LeetCode 62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

## 分析
本质是一个排列组合问题：
- 从 左上角 到达 右下角 共需要 走 m + n 步；
- 问题可被抽象成：从 m + n 步 中选择 m 步 向下走，共有多少种选择方法？

## 实现

```cpp
class Solution {
public:
    int uniquePaths(int m, int n) {
        int temp = min(m, n);
        m += n - 2;
        n = temp - 1;
        long long res = 1;
        for(int i = 1, j = m; i <= n; ++i, --j) {
            res *= j;
            res /= i;
        }
        return static_cast<int>(res);
    }
};
```
