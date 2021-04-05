---
title: LeetCode LCP 30. 魔塔游戏
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 贪心
date: 2021-04-05 19:49:05
---

<!--more-->

## 分析
本质：最小代价通关
- 按顺序打怪的过程中，可能会死掉；死掉之后是可以挽回的：消耗一次“代价” 使得血量暂时提升以继续任务；
- 对于每次“代价” 使得收益最大化，也就是把最耗血的怪放在最后打，以此方式提高通关的可能性（贪心过程）

## 代码
```cpp
class Solution {
public:
    int magicTower(vector<int>& nums) {
        long long sum = 1;
        long long x = 0;
        set<int> st;
        int cnt = 0;
        for(int i = 0; i < nums.size(); ++i) {
            st.insert(nums[i]);
            sum += nums[i];
            if(sum <= 0) {
                sum -= *st.begin();
                x += *st.begin();
                st.erase(st.begin());
                ++cnt;
            }
        }
        if(sum + x <= 0) return -1;
        return cnt;
    }
};
```
