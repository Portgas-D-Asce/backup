---
title: LeetCode 144. 二叉树的前序遍历
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二叉树
date: 2021-04-15 13:57:25
---

题目直达：[LeetCode 144. 二叉树的前序遍历](https://leetcode-cn.com/problems/binary-tree-preorder-traversal/)

## 分析

一直朝左走（走的时候把遇到的结果保存在遍历结果中），直到不能走了为止：
- 走的时候把遇到的结果保存在遍历结果中：先访问父节点；
- 一直朝左走：其次访问 左子树；
- 不能走了：再去访问 右子树；

```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode *> stk;
        while(root || !stk.empty()) {
            while(root) {
                res.push_back(root->val);
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();
            root = root->right;
        }
        return res;
    }
};
```