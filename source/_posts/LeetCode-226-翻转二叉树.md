---
title: LeetCode 226. 翻转二叉树
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 树
date: 2021-04-15 12:03:52
---

题目直达：[LeetCode 226. 翻转二叉树](https://leetcode-cn.com/problems/invert-binary-tree/)

## 分析
对于二叉树中每个节点，交换其左/右节点。

## 实现
```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    void recursion(TreeNode *root) {
        if(!root) return;
        swap(root->left, root->right);
        recursion(root->left);
        recursion(root->right);
    }
    TreeNode* invertTree(TreeNode* root) {
        recursion(root);
        return root;
    }
};
```