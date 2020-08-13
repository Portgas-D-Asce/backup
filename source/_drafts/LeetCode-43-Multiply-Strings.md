---
title: LeetCode 43. Multiply Strings
date: 2019-12-20 09:21:56
categories:
- [OJ, LeetCode]
- [Data Structure & Algorithm]
tags:
- 字符串
- LeetCode
---
大数相乘
<!-- more -->
## 1 题意
给定两个以字符串形式表示的非负整数num1、num2，求它们的积的字符串表示。
- 本质上就是大数相乘；

## 2 思路
按照列乘法竖式的思路实现，将结果保存在一个字符串product中。
### 2.1 积的位数不会超过两个乘数的位数之和
简单证明下，假设num1=99，num2=999，99 * 999 < 99 * 1000 = 99000，所以一个两位数乘以一个三位数，积的位数一定不会超过5；
### 2.2 进位不会超过9
两个digit相乘最大为 9 × 9 = 81，再加上目标位置上原有的digit最大为9，81 + 9 = 90，进位初值为0，导致第一次进位不会超过9，进而导致第二次进位不会超过9...因此，进位是不会超过9的。
### 2.3 缩进是怎么实现的
num1乘以num2的十位的结果 相比 num1乘以num2的个位的结果要向左偏移一位，如何处理这块的小技巧可以在代码中体会。

## 3 代码
```
   string multiply(string num1, string num2) {
    if(num1 == "0" || num2 == "0")
        return "0";
        
    string product(num1.size() + num2.size(), '0');
    for(int i = num1.size() - 1; i >= 0; --i)
    {
        int carry = 0;
        int left = num1[i] - '0';
        for(int j = num2.size() - 1; j >= 0; --j)
        {
            int right = num2[j] - '0';
            int temp = product[i + j + 1] - '0' + left * right + carry;
            product[i + j + 1] = temp % 10 + '0';
            carry = temp / 10;
        }
        product[i] = carry + '0';
    }
    int idx = product.find_first_not_of('0');
    return product.substr(idx);
}
```
