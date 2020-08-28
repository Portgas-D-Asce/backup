---
title: LeetCode 300. Longest Increasing Subsequence
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - LeetCode
  - 数组
date: 2020-08-27 23:25:16
---

最长递增子序列。

<!--more-->
## 1 问题描述

给定一个数组，返回其中最长递增子序列的长度。

示例：
- 输入: [10,9,2,5,3,7,101,18]
- 输出: 4 
- 解释: 最长递增子序列是 [2,3,7,101], 其长度为 4. 

## 2 分析
维护一个递增数组 $inc$，对于每个新添加的元素 $x$：
- 用 $x$ 替换 $inc$ 中第一个不小于它的元素；
- 若 $inc$ 中不存在元素大于等于 $x$ ，则将 $x$ 添加到 $inc$ 尾部；

这样使得：
- 以 $inc[i]$ 结束的最长递增子序列的长度为 $i + 1$;
- 也就是说 $inc[i]$ 插入到了 “正确的” 位置；

## 3 实现
```
int lengthOfLIS(vector<int>& nums) {
	vector<int> inc;
	for (int i = 0; i < nums.size(); i++)
	{
		auto it = lower_bound(inc.begin(), inc.end(), nums[i]);
		if (it == inc.end())
			inc.push_back(nums[i]);
		else
			*it = nums[i];
	}
	return inc.size();
}
```

时间复杂度：$O(nlogn)$

$inc$ 中存储的并不是最长递增子序列。
## 4 思考

思考 1 ：递增有严格单调递增和非严格单调递增之分，上述代码实现的是 严格单调递增的，若要求实现非严格单调递增的，该如何修改？
- lower_bound or upper_bound；

思考 2 ：如果要求实现最长递减自序列，又该如何处理？
- 数组中元素取相反数；

思考 3 ：这里只是返回最长递增子序列的长度，如何返回最长递增子序列呢？（待解决）