---
title: LeetCode 102. 二叉树的层序遍历
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 基础数据结构
  - 二叉树
date: 2021-04-15 14:51:47
---

<!--more-->
题目直达：[LeetCode 102. 二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)
## 分析
遍历当前层节点的时候：
- 将当前层节点打印输出；
- 同时，将下一层节点追加到队列尾部；

小技巧：在每层记录当前层节点个数。

## 代码

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if(!root) return {};
        vector<vector<int>> res;
        queue<TreeNode *> que;
        que.push(root);
        while(!que.empty()) {
            int n = que.size();
            vector<int> temp;
            for(int i = 0; i < n; ++i) {
                TreeNode *cur = que.front();
                que.pop();
                temp.push_back(cur->val);
                if(cur->left) que.push(cur->left);
                if(cur->right) que.push(cur->right);
            }
            res.push_back(move(temp));
        }
        return res;
    }
};
```