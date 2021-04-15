---
title: LeetCode 23. 合并K个升序链表
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 优先队列
date: 2021-04-15 19:08:39
---

<!--more-->
题目直达：[LeetCode 23. 合并K个升序链表](https://leetcode-cn.com/problems/merge-k-sorted-lists/)

## 分析
假设链表中元素总个数为 m ，链表的个数为 n ：
- 维护一个长度为 n 的最小优先队列 pq；
- 每次从 pq 中弹出最小元素；
- 然后将指针 推向 当前链表的后一位，并经当前指针 压入优先队列（如果为 nullptr 则无需压入）；
- 弹出顺序即为合并后的链表；

## 实现

```cpp
class cmp {
public:
    bool operator()(ListNode *a, ListNode *b) {
        return a->val > b->val;
    }
};
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        ListNode *dummy = new ListNode();
        priority_queue<ListNode *, vector<ListNode *>, cmp> pq;
        for(int i = 0; i < lists.size(); ++i) {
            if(lists[i]) pq.push(lists[i]);
        }
        ListNode *cur = dummy;
        while(!pq.empty()) {
            ListNode *temp = pq.top();
            pq.pop();

            cur->next = temp;
            cur = temp;

            temp = temp->next;
            if(temp) pq.push(temp);
        }
        ListNode *res = dummy->next; 
        delete dummy;
        return res;
    }
};
```

## 时间复杂度

$O(mlogn)$