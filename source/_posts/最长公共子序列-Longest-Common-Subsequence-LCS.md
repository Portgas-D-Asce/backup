---
title: 最长公共子序列(Longest Common Subsequence, LCS)
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 字符串
  - 动态规划
  - 基础算法
date: 2020-08-27 20:22:04
---

<!--more-->

## 1 问题描述
给定两个字符串： $s_1$ 和 $s_2$，计算它们的最长公共子序列的长度。

## 2 动态规划方法

状态定义：
- $dp[i, j]$ 表示 $s_1$ 前 $i$ 项 和 $s_2$ 前 $j$ 项 的最长公共子序列的长度；

转移方程：
$$
dp[i + 1. j + 1] =
\begin{cases}
0, & i = 0\ ||\ j = 0 \\
dp[i, j] + 1,  & s_1[i + 1] = s_2[j + 1] \\
max(dp[i, j + 1], dp[i + 1,j]), & s_1[i + 1] != s_2[j + 1]
\end{cases}
$$

通常以二维表格的形式来理解状态转移方程，以 $s_1 = abcba$, $s_2 = abcbcba$ 为例：
|     | '' | a | b | c | b | c | b | a |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
''| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
a | 0 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
b | 0 | 1 | 2 | 2 | 2 | 2 | 2 | 2 |
c | 0 | 1 | 2 | 3 | 3 | 3 | 3 | 3 |
b | 0 | 1 | 2 | 3 | 4 | 4 | 4 | 4 |
a | 0 | 1 | 2 | 3 | 4 | 4 | 4 | 5 |

计算方法：
- 从上往下，从左往右依次计算；
- 若 $s[i] = s[j]$, 则 **当前单元格 = 左上角单元格 + 1**；
- 若 $s[i] ！= s[j]$，则 **当前单元格 = max(左侧单元格，上侧单元格)**;

LCS 问题要求的就是 $dp[s_1.size(), s_2.size()]$。

## 3 实现
```cpp
int lcs(const string& s1, const string& s2) {
    vector<int> dp(s2.size() + 1, 0);
    for(int i = 0; i < s1.size(); ++i) {
        //pre 保存左上角元素的值
        int pre = 0;
        for(int j = 0; j < s2.size(); ++j) {
            int temp = s1[i] == s2[j] ? pre + 1 : max(dp[j], dp[j + 1]);
            pre = dp[j + 1];
            dp[j + 1] = temp;
        }
    }
    return dp[s2.size()];
}
```

## 练习
- [LeetCode 1143. Longest Common Subsequence](https://leetcode.com/problems/longest-common-subsequence/)


