---
title: LeetCode 101. 对称二叉树
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二叉树
date: 2021-04-15 12:56:57
---

<!--more-->
题目直达：[LeetCode 101. 对称二叉树](https://leetcode-cn.com/problems/symmetric-tree/)

## 分析

对于两个处于对称位置的节点 left 和 right：
- 比较 left->left 和 right->right 两棵子树是否对称；
- 比较 left->right 和 right->left 两棵子树是否对称；
- 如果两者皆对称，则说明 left 和 right 对称；

## 代码

```cpp
class Solution {
public:
    bool recursion(TreeNode *left, TreeNode *right) {
        if(left == nullptr && right == nullptr) return true;
        if(left == nullptr || right == nullptr) return false;
        if(left->val != right->val) return false;
        bool flag1 = recursion(left->left, right->right);
        bool flag2 = recursion(left->right, right->left);
        return flag1 && flag2;
    }
    bool isSymmetric(TreeNode* root) {
        if(!root) return true;
        return recursion(root->left, root->right);
    }
};
```

