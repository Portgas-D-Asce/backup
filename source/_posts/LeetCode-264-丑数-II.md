---
title: LeetCode 264. 丑数 II
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 思维逻辑
date: 2021-04-11 09:40:53
---

## 分析
排在后面的丑数都是由排在前面的丑数乘以 2/3/5 得到的；所以可以划分为 3 条线：
- 乘以 2 的最小数到哪里了；
- 乘以 3 的最小数到哪里了；
- 乘以 5 的最小数到哪里了；
- 最后取三者的最小值，压入到丑数末尾即可；
- 更新的时候需要根据最小值更新所有三种情况（同一个丑数只能压入一次）；

```cpp
class Solution {
public:
    int nthUglyNumber(int n) {
        vector<int> nums;
        nums.push_back(1);
        int idx2 = 0, idx3 = 0, idx5 = 0;
        for(int i = 1; i < n; ++i) {
            int val2 = nums[idx2] * 2;
            int val3 = nums[idx3] * 3;
            int val5 = nums[idx5] * 5;
            int mn = min(val2, min(val3, val5));
            if(val2 == mn) idx2++;
            if(val3 == mn) idx3++;
            if(val5 == mn) idx5++;
            nums.push_back(mn);
        }
        return nums.back();
    }
};
```

