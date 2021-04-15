---
title: LeetCode 145. 二叉树的后序遍历
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二叉树
date: 2021-04-15 14:28:05
---

<!--more-->

题目直达：[LeetCode 145. 二叉树的后序遍历](https://leetcode-cn.com/problems/binary-tree-postorder-traversal/)

## 作弊方法

### 分析
后序遍历是 “左-右-中”:
- 可以先把 先序遍历的“中-左-右” 改成 “中-右-左”;
- 上面跟后续遍历的顺序是完全相反的，只需要把最后结果反转一下即可；

### 实现
```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode *> stk;
        while(root || !stk.empty()) {

            //遍历右子树
            while(root) {
                stk.push(root);
                //父节点优先添加
                res.push_back(root->val);
                root = root->right;
            }

            //遍历左子树
            root = stk.top();
            stk.pop();
            root = root->left;
        }
        
        //结果反转
        reverse(res.begin(), res.end());
        return res;
    }
};
```