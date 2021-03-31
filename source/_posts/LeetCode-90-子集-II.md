---
title: LeetCode 90. 子集 II
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 枚举
date: 2021-03-31 22:59:16
---

<!--more-->
题目直达：[LeetCode 90. 子集 II](https://leetcode-cn.com/problems/subsets-ii/)
## 分析
枚举类型题目。

如何保证子集不重复? unordered_set ? 当然不是。
- 如果两个子集中某个元素 x 的个数不同, 那么这两个子集一定不同。
- 第一个元素取几个，第二个元素取几个，...，最后一个元素取几个？以这种方式组合成的子集一定不相同；

上限的确定：
- 取最大元素即可；
- 用于确保递归何时终止；

回溯，可以说是枚举神器了：
- 在向下递归之前，更新现有 “状态”；
- 在向下递归之后，恢复原来 “状态”；
- 保证效率，要用引用；

```cpp
class Solution {
public:
    void recursion(vector<int> &cnt, int idx, int mx, vector<int> &temp, vector<vector<int>> &res) {
        if(idx == mx) {
            res.push_back(temp);
            return;
        }
        int x = idx - 10;
        for(int i = 0; i <= cnt[idx]; ++i) {
            recursion(cnt, idx + 1, mx, temp, res);
            temp.push_back(x);
        }
        for(int i = 0; i <= cnt[idx]; ++i) {
            temp.pop_back();
        }
    }
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        vector<int> cnt(25, 0);
        int mx = 0;
        for(int i = 0; i < nums.size(); ++i) {
            int x = nums[i] + 10;
            cnt[x]++;
            mx = max(mx, x);
        }
        vector<vector<int>> res;
        vector<int> temp;
        recursion(cnt, 0, mx + 1, temp, res);

        return res;
    }
};
```