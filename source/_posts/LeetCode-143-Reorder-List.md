---
title: LeetCode 143. Reorder List
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 链表
date: 2020-08-28 12:28:37
---

单链表重排序,比较经典的链表问题，融合了：单链表反转、查找单链表中点、单链表融合三个问题。

<!--more-->

## 1 问题描述
已知一个单链表 L: L0→L1→…→Ln-1→Ln；

将其重排序为这个样子: L0→Ln→L1→Ln-1→L2→Ln-2→…

示例：
- 单链表：1->2->3->4->5；
- 重排序结果：1->5->2->4->3；

## 3 实现
思路：
- 先找到链表的中点；
- 从中点处将链表断开；
- 将后半部分链表反转；
- 将前后两部分重新合并成新的链表；
```
1->2->3->4->5

1->2->3
4->5

1->2->3
5->4

1->5->2->4->3
```

### 3.1 代码
```cpp
ListNode* reverse_list(ListNode* head){
    ListNode* pre = nullptr;
    while(head)
    {
        ListNode* temp = head->next;
        head->next = pre;
        pre = head;
        head = temp;
    }
    return pre;
}

//two pointer method
ListNode* find_middle(ListNode* head){
    if(!head) return nullptr;
        
    ListNode* slow = head;
    ListNode* fast = head;
    while(fast->next && fast->next->next)
    {
        slow = slow->next;
        fast = fast->next->next;
    }
    return slow;
}

void reorder_list(ListNode* head) {
    if(!head) return;

    ListNode* first = find_middle(head);

    //reverse the second part list
    ListNode* second = first->next;
    second = reverse_list(second);

    //merge two part lists
    first->next = nullptr;
    first = head;
    while(second)
    {
        ListNode* temp1 = first->next;
        ListNode* temp2 = second->next;
        first->next = second;
        second->next = temp1;
            
        first = temp1;
        second = temp2;
    }
}

```
