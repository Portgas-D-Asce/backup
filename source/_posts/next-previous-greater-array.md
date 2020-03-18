---
title: next/previous greater array
categories:
- [Data Structure & Algorithm]
tags:
  - 数组
date: 2020-03-19 01:46:17
---

<!--more-->
## 考虑
给定一个数组nums，如何找到其中每个元素的下一个比它大的元素呢（如果没有找到，我们用-1表示）
- eg. [1, 3, 2, 8, 6] 找到每个元素的下一个比它大的元素，我们可以得到数组[3, 8, 8, -1, -1]；

我们将得到的数组称为原数组的next greater array，如何得到这个数组呢？
- 很容易想到，两层for循环，即可搞定；
- 没错，简单粗暴，但时间复杂度 $O(n^2)$；
- 有没有更好的办法？

## $O(n)$方法
核心思想，维护一个单调递减栈即可，代码如下：
```
vector<int> nextGreaterElements(vector<int>& nums) {
    stack<int> upkeep;
    int n = nums.size();
    for(int i = 0; i < n; ++i)
    {
        while(!upkeep.empty() && nums[upkeep.top()] < nums[i])
        {
            nums[upkeep.top()] = nums[i];
            upkeep.pop();
        }
        upkeep.push(i);
    }
    while(!upkeep.empty())
    {
        nums[upkeep.top()] = -1;
        upkeep.pop();
    }
    return nums;
}
```
## 其它
- 理解了next previous greater array，变种：previous greater array、next less array、previous less array这些表示什么，就显而易见了；
- 同前缀/后缀和数组一样，在某些情景下，这也是一把降低时间复杂度的利器；
