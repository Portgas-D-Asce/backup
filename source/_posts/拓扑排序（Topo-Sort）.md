---
title: 拓扑排序（Topo Sort）
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 基础算法
  - 图论
date: 2021-01-25 13:43:44
---

拓扑排序：在保持 **有向图** 中顶点之间先后关系的前提下，将所有节点排成一行。

## 1 Kahn 算法（推荐）
本质：依次找到入度为 0 的顶点。
```cpp
vector<int> topo_sort(const vector<vector<int>>& outgoing) {
    int n = outgoing.size();

    //统计入度
    vector<int> indeg(n, 0);
    for(int i = 0; i < outgoing.size(); ++i) {
        for(int j = 0; j < outgoing[i].size(); ++j) {
            ++indeg[outgoing[i][j]];
        }
    }

    //保存入度为 0 的顶点
    vector<int> zero_deg;
    for(int i = 0; i < n; ++i) {
        if(indeg[i] == 0) zero_deg.push_back(i);
    }

    vector<int> topo;
    while(!zero_deg.empty()) {
        int u = zero_deg.back();
        zero_deg.pop_back();
        topo.push_back(u);
        for(auto v : outgoing[u]) {
            if(--indeg[v] == 0) zero_deg.push_back(v);
        }
    }
    return topo;
}
```
分析：
- 时间复杂度：$O(E)$；
- 即使有向图是一个森林也是没有问题的；
- $topo$ 排序结果中未出现的顶点构成环；

扩展：
- $dfs$ 也是可以用来 $topo sort$ 的，它的本质是：依次找到出度为 0 的顶点，反转得到序列的就是拓扑排序结果。

