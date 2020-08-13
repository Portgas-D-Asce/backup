---
title: dijkstra算法
categories:
  - [Data Structure & Algorithm]
tags:
  - 图论
date: 2020-04-28 20:41:55
---
dijkstra算法解决的是带权重的有向图上的单源最短路径问题。
<!--more-->
## 简介
**dijkstra算法：**解决的是带权重的有向图上的单源最短路径问题，它要求边的权重都为非负值；
- 单源最短路径问题：给定一个图 $G(V,E)$ ，求给定源节点 $s \in V$ 到每个节点 $v \in V$ 的最短路径；
- 原理：维护一个集合 $S$ ，从源节点 $s$ 到该集合中点的最短路径均已被找到；算法重复从集合 $V - S$ 中选择最短路径估计最小的节点 $u$ 加入到集合 $S$ ，然后对所有从 $u$ 出发的边进行松弛操作。
  
## 核心
dijkstra算法有三个核心内容：初始化、最小优先队列、松弛（理解了这三个内容dijkstra算法也就没问题了）

### 初始化
```
for(vertex v : G.V)
    v.d = inf;
    v.pi = null;
s.d = 0;
```
### 最小优先队列

### 松弛
void relax(u, v, w) {
    if(v.d > u.d + w(u, v))
    {
        v.d = u.d + w(u, v);
        v.pi = u;
    }
}
