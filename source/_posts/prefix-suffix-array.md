---
title: prefix/suffix array
categories:
  - []
tags:
  - null
date: 2020-04-02 11:54:42
---

<!--more-->
## 1 prefix/suffix array定义
prefix array：当前元素的值为排在其前面元素的函数：
- 即：$a[i] = f(a[i - 1], ..., a[0])$

suffix array：当前元素的值为排在其后面元素的函数：
- 即：$a[i] = f(a[i + 1], ..., a[n])$

## 2 特例
当f为最大值函数时，称其为prefix/suffix max array
当f为最小值函数是，称其为prefix/suffix min array;

当f为下一个比他大的元素时，称其为prefix/suffix next greater array
当f为下一个比他小的元素时，称其为prefix/suffix next less array

当f为所有元素之和时，称其为 prefix/suffix sum array；
当f为所有元素之积时，称其为
prefix/suffix product array;

当f为所有元素中大于当前元素的个数时，称其为prefix/suffix greater count array
当f为所有元素中小于当前元素的个数时，称其为prefix/suffix less count array

...等等，还有很多类似的prefix/suffix array，这里不再列举更多。

## 3 练习题
- 接雨水


