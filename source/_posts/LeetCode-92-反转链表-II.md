---
title: LeetCode 92. 反转链表 II
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 基础数据结构
  - 链表
date: 2021-04-15 16:43:57
---

<!--more-->

题目直达：[LeetCode 92. 反转链表 II](https://leetcode-cn.com/problems/reverse-linked-list-ii/)

## 分析
可以分为两种情况：
- 第一个位置为 1 时，特殊处理下：反转以 head 开头的前 k 个节点即可，返回新的头节点；
- 第一个位置不为 1 时：
  - 先找到 pre；
  - 然后反转以 pre->next 开始的前 k 个元素；
  - pre->next 指向新的局部头节点;
  - 返回 head 即可；

## 代码
```cpp
class Solution {
public:
    ListNode *reverse(ListNode *head, int k) {
        ListNode *pre = nullptr;
        ListNode *cur = head;
        for(int i = 0; i < k; ++i) {
            ListNode *temp = cur->next;
            cur->next = pre;
            pre = cur;
            cur = temp;
        }
        head->next = cur;
        return pre;
    }
    ListNode* reverseBetween(ListNode* head, int p, int r) {
        //处理第一个位置为 1 的情况
        if(p == 1) return reverse(head, r - p + 1);

        //找到pre
        ListNode *pre = head;
        for(int i = 1; i < p - 1; ++i) {
            pre = pre->next;
        }
        //反转，并将反转后结果链接在pre后面
        pre->next = reverse(pre->next, r - p + 1);
        return head;
    }
};
```