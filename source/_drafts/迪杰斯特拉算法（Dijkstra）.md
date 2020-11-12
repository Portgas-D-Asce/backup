---
title: 迪杰斯特拉算法（Dijkstra）
categories:
  - [Data Structure & Algorithm]
tags:
  - 图论
  - 最短路径
---

<!--more-->

关键词：初始化，开集合，闭集合，优先队列，松弛操作，访问标记


## 实现

### 简版
```cpp
vector<int> dijkstra(const vector<vector<pair<int, int>>> &outgoing， int s) {
    int n = outgoing.size();
    //初始化
    vector<int> dist(n, INT_MAX);
    dist[s] = 0;

    //开集合
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({dist[s], s});
    while(!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        //松弛
        for(auto &pr : outgoing[u]) {
            int w = pr.first, v = pr.second;
            int temp = dist[u] + w;
            if(temp < dist[v]) {
                dist[v] = temp;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```
思考1：按照算法导论中的描述，应将初始化的所有节点存放到 开集合（也就是优先队列） 当中；但在实际实现的时候只将起点存放在 开集合 当中了，为何可以这样做？
- 
- 

思考2：每次都将松弛后的结果存放到优先队列当中，同一个节点会被存放多次（比方：节点 5 ，{100, 5},{34, 5}, ... ,{8, 5}），优先队列中存放了多余的内容，这样会导致结果不正确或者效率降低吗？
- 答案是 不会 ；
- 因为 松弛操作 是按边进行的，也就是说，优先队列中节点个数最多为边的个数；

### 标记优化版

```cpp
vector<int> dijkstra(const vector<vector<pair<int, int>>> &outgoing， int s) {
    int n = outgoing.size();
    //第一处变化
    vector<bool> visited(n, false);
    vector<int> dist(n, INT_MAX);
    dist[s] = 0;

    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    pq.push({dist[s], s});
    while(!pq.empty()) {
        int u = pq.top().second;
        pq.pop();

        //第二处变化
        if(visited[u]) continue;
        visited[u] = true;
        for(auto &pr : outgoing[u]) {
            //第三处变化
            if(visited[pr.first]) continue;
            int v = pr.first, w = pr.second;
            int temp = dist[u] + w;
            if(temp < dist[v]) {
                dist[v] = temp;
                pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```

第一处：添加了访问标记

第二处：由于同一个节点在优先队列中存放了多份，导致同一节点会被多次 pop ，但实际上我们需要的只是第一次 pop，所以也就有了第二处变化；

第三处：松弛操作就是用即将加入闭集合的点来松弛开集合中的点，如果没有访问标记，会导致即将加入闭集合的点也会优化闭集合当中的点（也就是说每条边都会被访问两次），但这显然是没有意义的，因此也就有了第三处的优化；