---
title: 最长公共子序列(Longest Common Subsequence, LCS)
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 字符串
  - dp
date: 2020-08-27 20:22:04
---

<!--more-->

## 1 问题描述
给定两个字符串： $s_1$ 和 $s_2$，计算它们的最长公共子序列的长度。
- 子串必须是连续的；
- 子序列可以是非连续的；

例如：
- $s_1 = abcdefgh$，$s_2 = maczefhn$；
- 两者的最长公共子序列为 $acefh$，其长度为 5；

## 2 递归公式

设：
- $s_1$ 的前 $i$ 个字符所构成的字符串 为 $s_{1i}$;
- $s_2$ 的前 $j$ 个字符所构成的字符串 为 $s_{2j}$；
- $dp[i][j]$ 为  $s_{1i}$ 和 $s_{2j}$ 的最长公共子序列的长度；

以下为该问题的递归公式：
$$
dp[i + 1][j + 1] =
\begin{cases}
0, & i = 0 || j = 0 \\
dp[i][j] + 1,  & s_1[i + 1] = s_2[j + 1] \\
max(dp[i][j + 1], dp[i + 1][j]), & s_1[i + 1] != s_2[j + 1]
\end{cases}
$$

通常以二维表格的形式来理解该递归公式，以 $s_1 = abcba$, $s_2 = abcbcba$ 为例：
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

LCS 问题要求的就是 $dp[s_1.size()][s_2.size()]$。

## 3 实现
```cpp
int lcs(const string& s1, const string& s2) {
    vector<int> dp(s2.size() + 1, 0);
    for(int i = 0; i < s1.size(); ++i)
    {
        int pre = 0;
        for(int j = 0; j < s2.size(); ++j)
        {
            int temp = dp[j + 1];
            dp[j + 1] = s1[i] == s2[j] ? pre + 1 : max(dp[j], dp[j + 1]);
            pre = temp;
        }
    }  
    return dp[s2.size()];
}
```


