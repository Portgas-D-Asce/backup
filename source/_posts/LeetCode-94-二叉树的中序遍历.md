---
title: LeetCode 94. 二叉树的中序遍历
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二叉树
date: 2021-04-15 14:08:24
---

<!--more-->

题目直达：[LeetCode 94. 二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

## 分析

一直朝左走（把遇到的节点加入栈中），直到不能走为止：
- 一直朝左走：优先访问左子树；
- 栈中元素出栈：回溯过程访问 父节点；
- 最后访问 右子树；

## 代码

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode *> stk;
        while(root || !stk.empty()) {
            //优先左子树
            while(root) {
                stk.push(root);
                root = root->left;
            }
            
            //回溯，访问父节点
            root = stk.top();
            stk.pop();
            res.push_back(root->val);

            //最后右子树
            root = root->right;
        }
        return res;
    }
};
```