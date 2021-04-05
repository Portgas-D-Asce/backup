---
title: LeetCode LCP 29. 乐团站位
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 数学思维
date: 2021-04-05 19:27:34
---

第一次参加 LCP，惨不忍睹 &#x1f62d; &#x1F62D;
<!--more-->
题目直达：[LeetCode LCP 29. 乐团站位](https://leetcode-cn.com/problems/SNJvJP/)

## 分析
本质：将 二维矩阵位置（二维） 转换为 螺旋线路上的位置（一维）。

思路：
- 整块部分：外层环共有多少个元素；
- 剩余部分：在当前环上前面有多少元素；

## 实现
注意：
- 数据范围较大，整块部分需要用等差数列公式计算；
- 剩余部分：按照在上下左右哪条边上，进行计算；

```cpp
class Solution {
public:
    int orchestraLayout(int n, int t, int l) {
        long long m = n;
        int b = n - t - 1, r = n - l - 1;
        long long mn = min(min(t, l), min(b, r));
        
        int cnt = (4 * (m - mn) % 9 * (mn % 9)) % 9;
        n -= mn * 2;
        if(mn == t) {
            cnt = (l - mn + 1 + cnt) % 9;
        } else if(mn + l == m - 1) {
            cnt = (t - mn + n + cnt) % 9;
        } else if(mn + t == m - 1) {
            cnt = (m - mn - 1 - l + 2 * n - 1) % 9;
        } else{
            cnt = (m - mn - 1 - t + 3 * n - 2) % 9;
        }
        return cnt == 0 ? 9 : cnt;
        
    }
};
```