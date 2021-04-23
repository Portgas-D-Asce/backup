---
title: LeetCode 368. 最大整除子集
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 动态规划
date: 2021-04-24 00:19:36
---

<!--more-->

题目直达：[LeetCode 368. 最大整除子集](https://leetcode-cn.com/problems/largest-divisible-subset/)

## 分析
### 本质
本质：就是找一个最长的这样的数组 $a b c d e f$ （不防称呼它为整除数组吧）:
- $f$ 可以整除 $e$, $e$ 可以整除 $d$， $d$ 可以整除 $c$, $c$ 可以整除 $b$， $b$ 可以整除 $a$；
- 显然，这样需要先对原数组进行排序；
- 这样的数组肯定是满足题意的，但是它是最长的吗？

### 问题简化
只返回满足题意的最长数组的长度而不用返回具体内容，此时问题就变成了一个简单的动态规划问题：

状态定义：$dp[i]$ 表示以 $nums[i]$ 结尾的最长 整除数组；

状态转移：
$$dp[i] = \max\limits_{j = 0}^{j = i - 1}\{dp[j] ,\ nums[i] \% nums[j] == 0\} + 1$$

返回结果：
$$max(dp[i)$$

### 本问题答案
在计算 $dp[i]$ 的时候，保存下使其最大的 $dp[j]$ 的下标 $j$，很容易就可以找到 整除数组 的所有元素，具体情况结合代码理解。
## 代码
```cpp
class Solution {
public:
    vector<int> largestDivisibleSubset(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        //first 前一个可以整除的， second 以当前结尾最长的个数
        vector<pair<int, int>> dp(nums.size(), {0, 0});
        int mx = 0, idx = -1;
        for(int i = 0; i < nums.size(); ++i) {
            int pre = -1, cnt = -1;
            for(int j = i; j >= 0; --j) {
                if(nums[i] % nums[j] == 0) {
                    int temp = dp[j].second + 1;
                    if(temp > cnt) {
                        cnt = temp;
                        pre = j;
                    }
                }
            }
            dp[i] = {pre, cnt};
            if(cnt > mx) {
                mx = cnt;
                idx = i;
            }
        }
        vector<int> res;
        while(idx != dp[idx].first) {
            res.push_back(nums[idx]);
            idx = dp[idx].first;
        }
        res.push_back(nums[idx]);
        return res;
    }
};
```