---
title: LeetCode 160. 相交链表
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 基础数据结构
  - 链表
date: 2021-04-15 18:09:22
---

<!--more-->

题目直达：[LeetCode 160. 相交链表](https://leetcode-cn.com/problems/intersection-of-two-linked-lists/)

## 分析

假设链表 1 相交前的长度为 a，链表 2 相交前的长度为 b，相交部分链表长度为 c：
- 指针 ptr1 先沿着链表 1 走一遍，走完之后沿着链表 2 走；
- 指针 ptr2 先沿着链表 2 走一遍，走完之后沿着链表 1 走；
- 因为 a + c + b == b + c + a，所以两个指针最终一定在相交处相遇；

## 代码
```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *h1, ListNode *h2) {
        ListNode *cur1 = h1;
        ListNode *cur2 = h2;
        while(cur1 != cur2) {
            cur1 = cur1 ? cur1->next : h2;
            cur2 = cur2 ? cur2->next : h1;
        }
        return cur1;
    }
};
```

