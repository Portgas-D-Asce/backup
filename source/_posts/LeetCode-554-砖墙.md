---
title: LeetCode 554. 砖墙
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 有点意思
date: 2021-04-21 22:00:54
---

<!--more-->

题目直达：[LeetCode 554. 砖墙](https://leetcode-cn.com/problems/brick-wall/)

## 分析
统计所有缝出现的位置，出现缝最多的位置也就是穿墙最找的位置。

## 实现

```cpp
class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        int m = wall.size(), n = wall[0].size();
        unordered_map<int, int> cnt;
        for(int i = 0; i < m; ++i) {
            for(int j = 1; j < wall[i].size(); ++j) {
                cnt[wall[i][j - 1]]++;
                wall[i][j] += wall[i][j - 1];
            }
        }
        int mx = 0;
        for(auto &pr : cnt) {
            mx = max(pr.second, mx);
        }
        return m - mx;
    }
};
```