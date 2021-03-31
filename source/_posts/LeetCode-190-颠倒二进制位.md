---
title: LeetCode 190. 颠倒二进制位
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 有点意思
date: 2021-03-29 13:10:16
---

<!--more-->

题目直达：[LeetCode 190. 颠倒二进制位](https://leetcode-cn.com/problems/reverse-bits/)
## 循环
时间复杂度 O(logn)。
```cpp
class Solution {
public:
    uint32_t reverseBits(uint32_t n) {
        uint32_t res = 0;
        for(int i = 0; i < 32 && n; ++i) {
            res |= (n & 1) << (31 - i);
            n >>= 1;
        }
        return res;
    }
};
```
## 分治
以 8 位数 12345678 的反转为例:
- 第一步: 分别将前 4 位数和后 4 位数反转，得到: 43218765（将原问题划分为两个子问题）；
- 第二步: 将前 4 位和后 4 位交换，即得到结果: 87654321（将子问题的结果进行合并）；

不难发现，上述过程实际上就是 归并排序 所用到的分治策略。
- 时间复杂度 O(1)

```cpp
class Solution {
public:
    const uint32_t m1 = 0x55555555;
    const uint32_t m2 = 0x33333333;
    const uint32_t m4 = 0x0f0f0f0f;
    const uint32_t m8 = 0x00ff00ff;
    const uint32_t m16 = 0x0000ffff;

    uint32_t reverseBits(uint32_t n) {
        n = n >> 1 & m1 | (n & m1) << 1;
        n = n >> 2 & m2 | (n & m2) << 2;
        n = n >> 4 & m4 | (n & m4) << 4;
        n = n >> 8 & m8 | (n & m8) << 8;
        n = n >> 16 & m16 | (n & m16) << 16;
        return n;
    }
};
```
