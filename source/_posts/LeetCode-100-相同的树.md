---
title: LeetCode 100. 相同的树
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 基础数据结构
  - 二叉树
date: 2021-04-15 15:28:58
---

<!--more-->
题目直达：[LeetCode 100. 相同的树](https://leetcode-cn.com/problems/same-tree/)

## 分析

依次比较两棵树中的节点：
- 如果 两个节点均不存在/两个节点存在且值相等 则继续比较他们两个左子树/右子树是否分别相等；
- 否则，两棵树不相同；

## 代码
```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if(p == nullptr && q == nullptr) return true;
        if(p == nullptr || q == nullptr) return false;
        if(p->val != q->val) return false;
        bool flag1 = isSameTree(p->left, q->left);
        bool flag2 = isSameTree(p->right, q->right);
        return flag1 && flag2;
    }
};
```