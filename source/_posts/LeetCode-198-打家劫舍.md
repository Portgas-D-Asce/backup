---
title: LeetCode 198. 打家劫舍
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 动态规划
date: 2021-04-16 00:21:27
---

<!--more-->
题目直达：[LeetCode 198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

## 分析

状态定义：
- $dp1[i]$：从第 $i$ 位开始，没有选择 $nums[i]$ 所抢劫到的最大金额；
- $dp2[i]$：从第 $i$ 位开始，选择了 $nums[i]$ 所抢劫到的最大金额；

状态转移：
- 若没有选择 $nums[i]$，那么$nums[i + 1]$ 可选可不选，其状态转移方程如下：
$$dp1[i] = max(dp1[i + 1], dp2[i + 1]$$

- 若选择了 $nums[i]$，那么一定不能选择 $nums[i + 1]$，其状态转移方程如下：
$$dp2[i] = nums[i] + dp1[i + 1]$$

结果表示：要求抢劫的最大金额，也就是求：
$$max(dp1[0], dp2[0])$$

## 代码
```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        vector<int> dp1(n);
        vector<int> dp2(n);
        dp1[n - 1] = 0;
        dp2[n - 1] = nums[n - 1];
        for(int i = n - 2; i >= 0; --i) {
            dp1[i] = max(dp1[i + 1], dp2[i + 1]);
            dp2[i] = nums[i] + dp1[i + 1];
        }
        return max(dp1[0], dp2[0]);
    }
};
```

## 官方题解

状态定义：$dp[i]$ 表示抢劫第 $[0, i]$ 房屋所获得的最大金额；

边界条件：
- $dp[0] = nums[0]$：只有一间房屋，抢了就能获得最大金额；
- $dp[1] = max(nums[0], nums[1]$：只有两间房屋，抢了最大的就能获得最大金额；

状态转移：根据抢劫当前房屋 或 不抢劫当前房屋，可推导出状态转移方程如下：
$$dp[i] = max(nums[i] + dp[i - 2], dp[i - 1])$$

```cpp
class Solution {
public:
    int rob(vector<int>& nums) {
        if(nums.size() == 0) return 0;
        if(nums.size() == 1) return nums[0];
        nums[1] = max(nums[0], nums[1]);
        for(int i = 2; i < nums.size(); ++i) {
            nums[i] = max(nums[i - 2] + nums[i], nums[i - 1]);
        }
        return nums.back();
    }
};
```