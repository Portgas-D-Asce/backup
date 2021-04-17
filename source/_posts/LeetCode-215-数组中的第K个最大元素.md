---
title: LeetCode 215. 数组中的第K个最大元素
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 排序
date: 2021-04-17 20:23:29
---

<!--more-->

题目直达：[LeetCode 215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

## 分析

裸 top-k 问题。

## 快速选择方法
```cpp
class Solution {
public:
    int partition(vector<int> &nums, int p, int r) {
        int q = p;
        for(int i = p; i < r; ++i) {
            if(nums[i] > nums[r]) {
                swap(nums[i], nums[q++]);
            }
        }
        swap(nums[q], nums[r]);
        return q;
    }
    void recursion(vector<int> &nums, int p, int r, int k) {
        int q = partition(nums, p, r);
        if(q == k) return;
        if(q < k) {
            recursion(nums, q + 1, r, k);
        } else {
            recursion(nums, p, q - 1, k);
        }
    }
    int findKthLargest(vector<int>& nums, int k) {
        int n = nums.size();
        recursion(nums, 0, n - 1, k - 1);
        return nums[k - 1];
    }
};
```

## 堆/优先队列/set 方法

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> pq;
        for(int i = 0; i < nums.size(); ++i) {
            pq.push(nums[i]);
            if(pq.size() > k) {
                pq.pop();
            }
        }
        return pq.top();
    }
};
```