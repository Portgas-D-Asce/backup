---
title: C++容器使用
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-01-24 23:34:48
---

<!--more-->

## 优先队列
```cpp
//最大优先队列
priority_queue<int> pq_max;
priority_queue<int, vector<int>, less<int>> pq_max;

//最小优先队列
priority_queue<int, vector<int>, greater<int>> pq_min;

//元素为结构体
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq_min;
```

隐藏很深的bug
```cpp
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;

auto &pr = pq.top();
pq.pop();

int x = pr.first;
int y = pr.second;

//...
//优先队列底层是用堆实现的
//pr 可以理解为 指针，指向堆顶
//当pop之后，pr保存的是新堆顶的元素，而不是旧堆顶的元素
//解决办法：不要用引用 或者 用完之后再pop（推荐）
```