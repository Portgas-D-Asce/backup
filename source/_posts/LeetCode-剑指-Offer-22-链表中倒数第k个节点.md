---
title: LeetCode 剑指 Offer 22. 链表中倒数第k个节点
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 链表
  - 基础数据结构
date: 2021-04-15 17:45:27
---

<!--more-->
题目直达：[LeetCode 剑指 Offer 22. 链表中倒数第k个节点](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof/)

## 分析

快慢指针：
- 快指针先走 k 步；
- 慢指针从 head 开始，和快指针一块走，当快指针到达末尾时，慢指针到达链表的倒数第 k 个节点；

注意：当 k 大于链表长度时（fast == nullptr && k），没有倒数第 k 个节点，需要返回 nullptr；

## 代码
```cpp
class Solution {
public:
    ListNode* getKthFromEnd(ListNode* head, int k) {
        ListNode *fast = head;
        while(fast && k) {
            fast = fast->next;
            k--;
        }
        if(fast == nullptr && k) return nullptr;

        ListNode *slow = head;
        while(fast) {
            fast = fast->next;
            slow = slow->next;
        }
        return slow;
    }
};
```