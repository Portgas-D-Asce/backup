---
title: LeetCode 42. 接雨水
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - Prefix/Suffix Array
date: 2021-04-02 14:00:43
---

题目直达：[LeetCode 42. 接雨水](https://leetcode-cn.com/problems/trapping-rain-water/)

## 分析

站在数组中某个元素的角度看：**当前位置能容纳的雨水量为：左侧最大和右侧最大的最小值 - 当前位置高度** ，即:
$$min(max(left), max(right)) - height(cur)$$

最后将每个位置能接到雨水量求和即可。

```cpp
class Solution {
public:
    int trap(vector<int>& nums) {
        int n = nums.size();
        vector<int> prefix(n);
        for(int i = 0, mx = 0; i < n; ++i) {
            mx = max(mx, nums[i]);
            prefix[i] = mx;
        }
        int res = 0;
        for(int i = n - 1, mx = 0; i >= 0; --i) {
            mx = max(nums[i], mx);
            res += min(mx, prefix[i]) - nums[i];
        }
        return res;
    }
};
```