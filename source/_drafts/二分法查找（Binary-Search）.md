---
title: 二分法查找（Binary Search）
categories:
  - []
tags:
  - null
---

<!--more-->


## 1 二分法板子
```cpp
int binary_search(const vector<int> &nums, int target) {
    int n = nums.size();
    int p = 0, r = n - 1;
    while(p <= r) {
        int q = p + r >> 1;
        if(nums[q] == target) return q;
        nums[q] < target ? p = q + 1 : r = q - 1;
    }
    return -1;
}
```


## 2 消失的数组
只有 “实实在在” 的存在一个数组才能进行二分吗？不是的，数组也可以以一个函数的形式给出，下面就来看看到底是怎么回事。

以查找某个数是否为平方数为例：
```cpp
int func(int x) {
    return x * x;
}

int binary_search(int (*f)(int), int target) {
    int p = 0, r = target >> 1;
    while(p <= r) {
        int q = p + r >> 1;
        int val = f(q);
        if(val == target) return q;
        val < target ? p = q + 1 : r = q - 1;
    }
    return -1;
}
```
当然函数也可以为其它任意单调函数。如 
- 数组是展开了的函数；
- 函数是压缩了的数组；

## 3 方程的根
二分法返回值是什么？

是数组的下标！！！

当我们给定一个单调函数的 y 值时，我们可以通过二分法计算得到它所对应的 x 值；
```

```