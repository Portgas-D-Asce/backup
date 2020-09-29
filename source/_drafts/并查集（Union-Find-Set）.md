---
title: 并查集（Union-Find Set）
categories:
  - []
tags:
  - null
---

<!--more-->

本文关键词：路径压缩、启发式合并

**并查集** 是一种树型数据结构，用来处理 **不相交集合** 问题。定义在其上的操作有两个：
- Union：合并两个不相交的集合；
- Find：查找节点所属于的集合；

实现
```cpp

//初始化
vector<int> make(int n) {
    vector<int> tree(n, 0);
    for(int i = 0; i < n; ++i>)
        tree[i] = i;
    return tree;
}

//递归
int find(vector<int>& tree, int node) {
    return tree[node] == node ? node : (tree[node] = find(tree, tree[node]));
}
//迭代
int find(vector<int>& tree, int node) {
    int root = node;
    while(tree[root] != root)
        root = tree[root];

    //路径压缩
    while(tree[node] != node)
    {
        int next = tree[node];
        tree[node] = root;
        node = next;
    }
    return root;
}

void union(vector<int>& tree, int node1, int node2) {
    int left = find(tree, node1);
    int right = find(tree, node2);
    if(left == right) return;
    tree[left] = right;
}

```


