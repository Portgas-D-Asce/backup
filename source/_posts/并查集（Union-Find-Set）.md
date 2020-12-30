---
title: 并查集（Union-Find Set）
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 基础数据结构
  - 树
date: 2020-10-29 17:03:47
---

<!--more-->

## 1 理论

**并查集**
- 是一种树型数据结构；
- 数据通常以顺序存储结构进行组织；
- 用来处理 **不相交集合** 问题。

定义在其上的两个操作：
- **Find：** 查找节点所属于的集合；
- **Union：** 合并两个不相交的集合；

两点优化方法：
- **路径压缩：** 让查找路径上的所有节点均指向根节点，提高下一次查找效率；
- **启发式合并：** 把 “秩” 小的集合合并到 “秩” 大的集合，使得合并后集合的 “秩” 处于较小状态，有利于查找；

## 2 实现
```cpp
class UnionFind {
private:
    vector<int> parent;
    vector<int> rank;
public:
    UnionFind(int n) {
        parent = vector<int>(n, 0);
        for(int i = 0; i < n; ++i) {
            parent[i] = i;
        }
        rank = vector<int>(n, 0);
    }

    int find(int node) {
        if(parent[node] == node) return node;
        //路径压缩
        parent[node] = find(parent[node]);
        //下面这句是没有必要的，因为启发式合并只会用到根节点的 “秩”，其它节点的 “秩” 是无所谓的
        //rank[node] = rank[parent[node]] + 1;
        return parent[node];
    }

    void union1(int node1, int node2) {
        int root1 = find(node1);
        int root2 = find(node2);
        if(root1 == root2) return;

        //启发式合并
        if(rank[root1] > rank[root2]) {
            swap(root1, root2);
        }
        parent[root1] = root2;
        rank[root2] = max(rank[root2], rank[root1] + 1);
    }
};
```

## 应用

图论中最小生成树算法：Kruskal


