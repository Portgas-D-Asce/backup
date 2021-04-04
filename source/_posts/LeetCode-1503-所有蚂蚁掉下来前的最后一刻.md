---
title: LeetCode 1503. 所有蚂蚁掉下来前的最后一刻
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 脑筋急转弯
date: 2021-04-05 00:09:34
---

<!--more-->

题目直达：[LeetCode 1503. 所有蚂蚁掉下来前的最后一刻](https://leetcode-cn.com/problems/last-moment-before-all-ants-fall-out-of-a-plank/)

## 分析
所有蚂蚁都一样，碰撞和穿透又有什么区别呢？
## 代码
```cpp
class Solution {
public:
    int getLastMoment(int n, vector<int>& left, vector<int>& right) {
        int res = 0;
        for(int i = 0; i < left.size(); ++i) {
            res = max(res, left[i]);
        }
        for(int i = 0; i < right.size(); ++i) {
            res = max(res, n - right[i]);
        }
        return res;
    }
};
```