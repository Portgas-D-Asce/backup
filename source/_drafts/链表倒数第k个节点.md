---
title: 链表倒数第k个节点
categories:
- [Data Structure & Algorithm]
tags:
- 链表
date: 2020-03-19 17:57:25
---

<!--more-->
## 1 问题描述

给一个单链表，输出该链表的倒数第k个节点；

## 2 代码
```
ListNode* FindKthToTail(ListNode* head, int k) {
    if(k <= 0) return nullptr;

    ListNode* early = head;
    while(early && k--)
        early = early->next;
        
    //单链表长度小于k
    if(k > 0) return nullptr;

    ListNode* later = head;
    while(early)
    {
        early = early->next;
        later = later->next;
    }
    return later;
}

```