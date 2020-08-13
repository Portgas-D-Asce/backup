---
title: '最近邻搜索问题（The nearest neighbor seatch problem） '
tags:
---
## 1 问题描述
已知：
- 点集P = {p1, p2, ...}；
- 查询点（query point）q；
求解：
- 集合P中距离q最近的点pi；

## 2 关键词
ANN，kd-tree
## 简单线性搜索（simple linear search）
解决方案：
- 分别计算q和P中每一个点的距离；
- 保留距离最小的点，作为最终所求结果；

时间复杂度：
- 假设P中点的个数为n；
- 点的维度为k；
- 时间复杂度为O(kn)；

查询点有多个：
- 当查询点有m个时；
- 即查找m次，其时间复杂度为O(kmn)；

问题：
- 当点的维度k、P中点的个数n、查询点的个数m过大时，其查找过程是极为耗时的；

## 近似最近邻搜索（approximate nearest neighbor search，ANN）