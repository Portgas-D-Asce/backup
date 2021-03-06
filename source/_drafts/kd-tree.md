---
title: kd tree
tags:
---
## 简介
kd树究竟是什么？
- 是一种分割k维数据空间的数据结构，主要用于多维空间数据的搜索；
- 可以将其看作是普通二叉搜索树的k维扩展，它的每个节点都是k维空间向量；

## 构建kd树
kd树是普通二叉搜索树的k维扩展，它也同样满足“左不大于，右不小于”的规则，依据该规则，对k维空间点集P = {p1，p2， ...，pn}构建kd树的步骤如下：
- 先选择一个点p作为超平面，并构建根节点root，它将P中剩余点一分为二，其中“小于等于”p的点构成点集L，“大于”p的点构成点集R；
- 将L作为新的P递归地执行前一步，并将所构建的kd树left作为root的左子树；将R作为新的P递归地执行前一步，并将所构建的kd树right作为root的右子树；

### 大小比较
两个k维空间向量如何比较大小？通常采用k维中某一维上数值的大小来决定向量的大小，例如：
- 已知两个三维向量(5, 2, 7) 和 (6, 1, 9)；
- 若采用第一维上数值的大小来决定向量的大小，则(6, 1, 9)大于(5, 2, 7)；若采用第二维上数值的大小来决定向量的大小，则(6, 1, 9)小于(5, 2, 7)；

### 维度选择
可以通过k维中某一维上数值的大小来决定向量的大小，但具体要选择哪一维呢？维度的选择依据不同，所构建出的kd树通常是不同的。针对不同的维度选择依据，kd树构建算法存在多种实现方式：
- 轮流法；
- 最大方差法；

### 最大方差法
最大方差法构建kd树的步骤如下所示：
1. 分别计算P在第1维，第2维，...，第k维上的方差，采用方差最大的那一维来衡量空间向量的大小；
2. 将中位数（若向量个数为偶数，不计算平均值）作为超平面，同时构建根节点 root；依据超平面对 P 中剩余点进行划分，小于等于中位数的点构成集合 L，大于中位数的点构成集合 R；
3. 将 L 作为新的 P，递归地执行步骤1,2，并将所构建的 kd树 left 作为 root 的左子树；将 R 作为新的 P ，递归地执行步骤 1, 2，并将所构建的 kd树 right 作为 root 的右子树；

由于采用中位数作为超平面，所以最终所构建的kd树为平衡二叉搜索树；

时间复杂度分析：
- P中点的数目为n，又由于所构建的kd树为平衡二叉搜索树，因此树的高度为lg(n)；
- 假设查找中位数的时间复杂度为线性，则构建kd树的时间复杂度为O(knlgn)；
### 随机kd树
### 示例

## 最近邻搜索

