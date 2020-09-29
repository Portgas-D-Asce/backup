---
title: '最小生成树（Minimum Spanning Tree, MST）'
categories:
  - []
tags:
  - null
---

<!--more-->

## 1 概述

## 2 Kruskal
步骤：
- 初始化：将 $V$ 个节点划分为 $V$ 棵树；
- 按权重，从小到大对边进行排序；
- 遍历边：
  - 若边的起点和终点属于同一棵树，则遍历下一条边；
  - 若边的起点和中点不属于同一棵树，将边加入最小生成树集合中，并将两棵树合并；
- 当找到 $V - 1$ 条边时，算法结束；

Kruskal实现，大多都是基于 **并查集** 来实现的；

实现
```cpp
int tree_num(vector<int>& tree, int root) {
    int vertex = root;
    while(tree[root] != -1)
        root = tree[root];
    while(tree[vertex] != -1)
    {
        int next = tree[vertex];
        tree[vertex] = root;
        vertex = next;
    }
    return root;
}
int minCostConnectPoints(vector<vector<int>>& points) {
    int res = 0;
    
    int n = points.size();
    vector<int> tree(n, -1);
    
    vector<vector<int>> edges;
    for(int i = 0; i < n; ++i)
    {
        for(int j = i + 1; j < n; ++j)
        {
            int dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);
            edges.push_back({dist, i, j});
        }
    }
    
    sort(edges.begin(), edges.end());
    
    for(int i = 0, cnt = 1; i < edges.size() && cnt < n; ++i)
    {
        int left_tree = tree_num(tree, edges[i][1]);
        int right_tree = tree_num(tree, edges[i][2]);
        if(left_tree != right_tree)
        {
            res += edges[i][0];
            ++cnt;
            tree[left_tree] = right_tree;
        }
    }
    return res;
}
```

## 3 Prim
Prim 算法 和 AStar 算法，都可以看作是类似于 Dijkstra 算法；这些算法里面都有两个集合，这里采用 AStar 中的 **开集合（Open Set）** 和 **闭集合（Closed Set）** 来称呼他们。

步骤：
- 建图；
- 对所有节点进行初始化；并采用 最小优先队列 构造 开集合；
- 从开集合中弹出 节点，并将其加入到 闭集合；
- 对开集合中与其相邻的且未节点进行 “松弛” 操作；
- 不断重复第3、4步，直到开集合中节点全部加入到闭集合中为止；


实现
```cpp
int minCostConnectPoints(vector<vector<int>>& points) {
    int n = points.size();
    vector<vector<int>> outgoing(n, vector<int>(n, 0));
    for(int i = 0; i < n; ++i)
    {
        for(int j = i + 1; j < n; ++j)
        {
            int dist = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);
            outgoing[i][j] = dist;
            outgoing[j][i] = dist;
        }
    }
    
    const int MX = numeric_limits<int>::max();
    set<pair<int, int>> q{{0, 0}};
    vector<int> key(n , 0);
    for(int i = 1; i < n; ++i)
    {
        q.insert({MX, i});
        key[i] = MX;
    }
        
    while(!q.empty())
    {
        int u = q.begin()->second;
        q.erase(q.begin());
        for(int v = 0; v < outgoing[u].size(); ++v)
        {
            int w = outgoing[u][v];
            auto it = q.find({key[v], v});
            if(it == q.end()) continue;
            if(w < key[v])
            {
                q.erase(it);
                q.insert({w, v});
                key[v] = w;
            }
        }
    }
    
    int res = 0;
    for(int i = 0; i < n; ++i)
        res += key[i];
    
    return res;
}
```

## 4 Optimized Prim for Complete Graph
为什么没必要建图？
- 完全图，一个节点到其它所有节点都有边，完全没必要按组织好的图来遍历所邻接的节点；

为什么不要最小优先队列：
- 在最小优先队列弹出节点时，确实 prime 比较快，但其在每次松弛之后，需要对最小优先队列进行维护，总的次数大约是 $O(ElgV) = O(V^2lgV)$，如果不需要优先队列则时间复杂度为 $O(V^2)$;

```cpp
int minCostConnectPoints(vector<vector<int>>& points) {
    int res = 0;
    const int Mx = numeric_limits<int>::max();
    int n = points.size();
    
    //vector<int> dist(n, Mx);
    int * dist = (int *)malloc(sizeof(int) * n);
    for(int i = 0; i < n; ++i) dist[i] = Mx;
    pair<int, int> cur = {0, 0};
    for(int i = 0; i < n; ++i)
    {
        res += cur.second;
        cur.second = Mx;
        int idx = cur.first;
        dist[idx] = -1;
        for(int j = 1; j < n; ++j)
        {
            if(dist[j] == -1) continue;
            int temp = abs(points[idx][0] - points[j][0]) + abs(points[idx][1] - points[j][1]);
            dist[j] = min(dist[j], temp); 
            if(dist[j] < cur.second) cur = {j, dist[j]};
        }
    }
    return res;
}
```

## 5 分析
Kruskal：不用建图，但需要按权重对边进行排序；需要使用并查集数据结构；
Prim：需要建图（有向图）；需要使用 优先队列（堆）数据结构；
OPrime：无需建图，无需排序，无需特殊数据结构；


## 6 使用
如果是完全图的话，使用 **Optimized Prim for Complete Graph** 即可；

如果边已按权重排好序，直接使用 Kruskal；

否则，用 Prime；

