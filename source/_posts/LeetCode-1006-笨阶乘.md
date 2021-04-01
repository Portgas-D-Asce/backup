---
title: LeetCode 1006. 笨阶乘
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 数论
date: 2021-04-01 12:56:24
---

<!--more-->

题目直达：[LeetCode 1006. 笨阶乘](https://leetcode-cn.com/problems/clumsy-factorial/)
## 数学思维
### 公式推导
公式推导：
$$n \times (n - 1) / (n - 2) = n + 1 + \frac{2}{n - 2}$$

结论一：当 $n >= 5$ 时， 有：
$$n \times (n - 1) / (n - 2) = n + 1$$

结论二：当 $n >= 6$ 时，有：
$$ n - (n - 1) \times (n - 2) / (n - 3) = 0$$

### 题目分析
当 $n <= 4$ 时，直接枚举答案就可以了。

当 $n > 4$ 时，可以将笨阶乘分成三部分：
- 前三项：直接按照结论一计算；
- 中间部分：按 4 个一组分成多组，每组的值都是 0 导致中间部分内容恒等于 0（当 5 <= n <= 8 时，是没有中间部分的）；
- 剩余部分：需要分类讨论：
  - 当 $n \% 4 == 1$ 时：剩余部分总是 “+ 2 - 1 = 1”；
  - 当 $n \% 4 == 1$ 时：剩余部分总是 “+ 3 - 2 * 1 = 1”；
  - 当 $n \% 4 == 3$ 时：剩余部分总是 “+ 4 - 3 * 2 / 1 = -2”；
  - 当 $n \% 4 == 0$ 时：剩余部分总是 “5 - 4 * 3 / 2 + 1 = 0”;

### 代码实现
```cpp
class Solution {
public:
    int clumsy(int n) {
        if(n == 1) return 1;
        if(n == 2) return 2;
        if(n == 3) return 6;
        if(n == 4) return 7;

        int res = n + 1;
        n %= 4;
        if(n == 1 || n == 2) res++;
        if(n == 3) res -= 2;
        return res;
    }
};
```

