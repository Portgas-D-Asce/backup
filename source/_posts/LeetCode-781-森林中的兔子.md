---
title: LeetCode 781. 森林中的兔子
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 思维逻辑
date: 2021-04-04 19:33:58
---
题目直达：[LeetCode 781. 森林中的兔子](https://leetcode-cn.com/problems/rabbits-in-forest/)
## 分析
如果两个兔子颜色相同，那么它们的回答一定相同。
- 也就是说如果两个兔子的回答不同，那么他们的颜色一定不同；
- 因此，可以确定每种颜色兔子的最小数量，它们的和也就是答案；

如何确定每种颜色兔子的最小数量呢？
- 对于一种回答：x，如果它的个数刚好为 x + 1，那么刚好有 x + 1 只兔子；
- 如果个数 y 大于 x + 1，则需要对于整除部分需要 y / (x + 1) * (x + 1) 只兔子；
- 如果个数 y 小于 x + 1（也就是余数部分），则需要补充额外的兔子至 x + 1；

最终的结论：
- 对于每种颜色的兔子的最小数量 = 向上取整(y ➗ (x + 1)) * (x + 1) 。

## 代码
```cpp
class Solution {
public:
    int numRabbits(vector<int>& nums) {
        unordered_map<int, int> st;
        for(int i = 0; i < nums.size(); ++i) {
            st[nums[i]]++;
        }
        int res = 0;
        for(auto& pr : st) {
            //对于回答 pr.first 至少需要 temp 只兔子
            int temp = pr.first + 1;
            //对于每一种颜色的兔子，至少需要多少只兔子
            res += ((pr.second - 1) / temp + 1) * temp;
        }
        return res;
    }
};
```