---
title: LeetCode 5724. 绝对差值和
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 二分查找
date: 2021-04-04 22:25:48
---

<!--more-->

题目直达：[LeetCode 5724. 绝对差值和](https://leetcode-cn.com/problems/minimum-absolute-sum-difference/)

## 整体思路
设：第 i 位 调整前的绝对差值为 x[i]，**最小调整后的绝对差值** 为y[i] ，z[i] = x[i] - y[i] 为第 i 位 的 **最大降落差值**

为了使绝对差值和最小，就是要找所有位置中最大的 **最大降落差值** （设为 mx）。

设调整前的绝对差值和为 old，则调整后的最小绝对差值和 now = old - mx。

## 关键部分
如何找 **最小调整后的绝对差值** y[i] 呢？
- 对于 nums2[i]，在 nums1 中找到 **最接近它的前后两个数分别计算绝对差值再取最小** 也就是我们要的 y[i]。

如何找 **最接近的前后两个数** 呢？当然先要对 nums1 排序了，排好序有两种办法：
- set 方法：这里就不详细说明了；
- 当然是二分查找啊！！！

二分查找方法：
- 要的是查找 **nums1 中最后一个小于等于 nums2[i] 的数 和 第一个大于等于 nums2[i] 的数**；
- lower_bound确实找的是 **第一个大于等于 nums2[i] 的数**，upper_bound 找的是 **第一个大于 nums2[i] 的数**，不是所要的啊！！！怎么办呢？
- **反向迭代器 + 自定义比较函数** 搞起：反向看，第一个小于等于 nums2[i] 的数 也就是 正向看 最后一个大于等于 nums2[i] 的数

```cpp
//第一个大于等于 nums2[i] 的数
auto it1 = lower_bound(nums3.begin(), nums3.end(), nums2[i]);
//最后一个小于等于 nums2[i] 的数
auto it2 = lower_bound(nums3.rbegin(), nums3.rend(), nums2[i], greater<int>());
```

哈哈，第一次这么用，新技能 get ！

别高兴得太早，需要考虑 lower_bound 没找到的边界情况。 

## 代码
```cpp
class Solution {
public:
    int minAbsoluteSumDiff(vector<int>& nums1, vector<int>& nums2) {
        int n = nums2.size();
        vector<int> nums3 = nums1;
        sort(nums3.begin(), nums3.end());

        int idx = -1;
        int mx = -1;
        for(int i = 0; i < n; ++i) {
            auto it1 = lower_bound(nums3.begin(), nums3.end(), nums2[i]);
            int temp = INT_MAX;
            if(it1 != nums3.end()) {
                temp = min(temp, *it1 - nums2[i]);
            }
            auto it2 = lower_bound(nums3.rbegin(), nums3.rend(), nums2[i], greater<int>());
            if(it2 != nums3.rend()) {
                temp = min(temp, nums2[i] - *it2);
            }
            temp = abs(nums1[i] - nums2[i]) - temp;
            if(temp > mx) {
                mx = temp;
                idx = i;
            }
        }
        
        int res = 0, mod = 1000000007;
        for(int i = 0; i < n; ++i) {
            int temp = abs(nums1[i] - nums2[i]);
            if(i == idx) {
                temp -= mx;
            }
            res = (res + temp) % mod;
        }
        return res;
    }
};
```
