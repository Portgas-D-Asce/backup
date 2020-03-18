---
title: LeetCode 415. Add String
date: 2019-12-20 09:06:41
categories:
- [OJ, LeetCode]
- [Data Structure & Algorithm]
tags:
- 字符串
- LeetCode
---
大数相加
<!-- more -->
## 题意
给定两个以字符串形式表示的非负整数，求其和的字符串表示。
- 本质上就是大数相加；
## 2 思路
没什么特别要说明的，注意到以下两点就行了：
- 利用引用区分较长和较短字符串，避免了不必要拷贝的小技巧；
- 进位只有两种情况，要么0，要么1；

## 3 代码
```
string addStrings(string num1, string num2) {
    if(num1.empty())
        return num2;
    if(num2.empty())
        return num1;
    string& l = num1.size() >= num2.size() ? num1 : num2;
    string& s = num1.size() >= num2.size() ? num2 : num1;
    int carry = 0;
    for(int i = l.size() - 1, j = s.size() - 1; i >= 0; --i, --j)
    {
        int temp = carry + (l[i] - '0');
        if(j >= 0)
        {
            temp += (s[j] - '0');
        }
        else if(carry == 0)
        {
            return l;
        }
        l[i] = temp % 10 + '0';
        carry = temp / 10;
    }
    if(carry)
        l = "1" + l;
    return l;
}
```
