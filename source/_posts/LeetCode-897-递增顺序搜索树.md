---
title: LeetCode 897. 递增顺序搜索树
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二叉树
date: 2021-04-25 09:28:14
---

<!--more-->
题目直达：[LeetCode 897. 递增顺序搜索树](https://leetcode-cn.com/problems/increasing-order-search-tree/)

## 分析
普通的二叉树中序遍历，实现的时候需要注意：
- 虚拟头节点的使用可以简化代码实现(用完别忘了释放虚拟头节点)；
- 当将一个节点加入到链表时，需要对加入节点的左右孩子置为 nullptr;

## 代码
```cpp
class Solution {
public:
    TreeNode* increasingBST(TreeNode* root) {
        TreeNode *dummy = new TreeNode();

        TreeNode *pre = dummy;
        stack<TreeNode *> stk;
        while(root || !stk.empty()) {
            while(root) {
                stk.push(root);
                root = root->left;
            }
            root = stk.top();
            stk.pop();

            //将新节点加入链表
            pre->right = root;

            //更新链表尾节点
            pre = root;

            //下一个要访问的节点
            root = root->right;

            //左右孩子节点置为 nullptr
            pre->left = nullptr;
            pre->right = nullptr;
        }

        TreeNode *res = dummy->right;
        delete dummy;
        return res;
    }
};
```