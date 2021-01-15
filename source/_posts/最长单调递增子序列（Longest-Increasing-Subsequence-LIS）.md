---
title: '最长单调递增子序列（Longest Increasing Subsequence, LIS）'
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 基础算法
  - 动态规划
  - 数组
date: 2021-01-14 23:21:39
---

## 1 问题描述

给定一个数组 $nums$，返回其中最长递增子序列的长度。

## 2 动态规划 方法
状态定义：dp[i]：表示以第 $i$ 位元素结尾的最长单调递增子序列的长度。

状态转移方程：$dp[i] = \max{\{dp[j]\ |\ 0 \le j \lt i, nums[j] \lt nums[i]\}} + 1$

```cpp
//严格单调递增子序列
int lis(const vector<int>& nums) {
    int mx = 0, n = nums.size();
	vector<int> dp(n);
	for(int i = 0; i < n; ++i) {
	    dp[i] = 0;
		for(int j = 0; j < i; ++j) {
		    if(nums[j] >= nums[i]) continue;
			dp[i] = max(dp[i], dp[j]);
		}
		mx = max(mx, ++dp[i]);
	}
	return mx;
}
```

时间复杂度：$O(n^2)$

## 3 二分法查找 方法
假设已知 $nums$ 前 $i$ 个元素构成的所有单调递增子序列：
- 把这些序列按长度进行划分：长度为 1 的单调递增子序列，长度为 2 的单调递增子序列，...

假设，所有长度为 2 的单调递增子序列中，最小结尾为 $x$；
- 如果 $nums[i] > x$ 那么 $nums[i]$ 一定可以追加到某个长度为 2 的单调递增子序列，从而构成一个长度为 3 的单调递增子序列；
- 否则，$nums[i]$ 一定不能追加到......  

因此：可以维护一个单调递增数组：
- 其中 第 $i$ 个元素为：当前所有长度为 $i$ 的单调递增子序列中最小结尾；
- 当追加元素 $x$ 时，用 $x$ 来更新各个长度的单调递增子序列的最小结尾；
- 当所有元素追加完成后，所维护的单调递增数组的长度，就是最长单调递增子序列的长度（但这个数组并不是最长单调递增子序列）；

```cpp
int lengthOfLIS(const vector<int>& nums) {
	vector<int> inc;
	for (int i = 0; i < nums.size(); i++) {
		auto it = lower_bound(inc.begin(), inc.end(), nums[i]);
		if (it == inc.end()) {
            inc.push_back(nums[i]);
        } else {
            *it = nums[i];
        }	
	}
	return inc.size();
}
```

时间复杂度：$O(nlogn)$

## 4 思考
