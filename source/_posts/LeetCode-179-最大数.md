---
title: LeetCode 179. 最大数
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 排序
date: 2021-04-12 12:27:29
---

题目直达：[LeetCode 179. 最大数](https://leetcode-cn.com/problems/largest-number/)

## 分析

已知数组中两个数 a 和 b， a + b < b + a（+ 表示拼接）：
- 假设，将 a 放在 b 的前面得到一个最大的数 x；
- 那么总可以将 b 放在 a 的前面一定可以得到一个比 x 更大的数 y；
- 因此，对于 a + b < b + a 的情况，只能将 b 放在 a 前面才能得到最大的数；

## 代码

```cpp
class Solution {
public:
    string largestNumber(vector<int>& nums) {
        auto cmp = [](int a, int b)->bool {
            string s = to_string(a) + to_string(b);
            string t = to_string(b) + to_string(a);
            //cout << s << " > " << t << " = "<< (s > t) << endl;
            return s > t;
        };
        sort(nums.begin(), nums.end(), cmp);
        string s;
        for(int i = 0; i < nums.size(); ++i) {
            s += to_string(nums[i]);
        }
        int idx = s.find_first_not_of('0');
        return idx == string::npos ? "0" : s.substr(idx);
    }
};
```
