---
title: 二叉搜索树（Binary Search Tree）
author: Portgas·D·Asce
categories:
  - []
tags:
  - 基础数据结构
  - 树
date: 2020-12-22 16:41:14
---

<!--more-->

## 1 二叉搜索树回顾
性质：
- 左子树 < 根节点 < 右子树；
- 中序遍历结果，是一个有序序列；

## 2 插入
插入新节点，一定会作为叶子节点。从根节点开始：
- 如果 插入键值 = 根节点 则直接返回（假设搜索树中节点键值均不相同）；
- 如果 插入键值 < 根节点 则将其插入到左子树中；
- 如果 插入键值 > 根节点 则将其插入到右子树中；

## 3 删除
### 3.1 前驱和后继
按中序遍历对节点进行排序，得到一个有序序列
- 当前节点的前一个节点称为它的前驱；
- 当前节点的后一个节点称为它的后继；

前驱和后继的含义：
- 前驱：
  - 当左子树存在时，前驱为左子树中最大的节点（这种前驱一定没有右孩子）；
  - 当左子树不存在时，前驱？？？？？？（不重要，这玩意好像并没有实际应用价值！如果非要实现，树的节点中需要记录父指针）；
- 后继：
  - 当右子树存在时，后继为右子树中最小的节点（这种后继一定没有左孩子）；
  - 当右子树不存在时，后继为？？？？？？？（同上）
- 当节点的度为 2 时，它的前驱 和 后继 的度最大为 1；

### 3.2 删除节点 
删除节点（假设要删除节点为 $x$）：
- $x$ 度为 0：删除 $x$，并将其父节点对应孩子置为NULL；
- $x$ 度为 1：用 $x$ 的孤儿节点取代 $x$；
- $x$ 度为 2：用 $x$ 的前驱/后继 取代 $x$，将问题转化为删除 $x$ 前驱/后继的问题（也就是删除度为 0/1 的节点问题）;

## 4 查找
查找键值的过程与插入键值的过程相似，从根节点开始（假设要查找的键值为 $k$）：
- 如果 $k$ = 根节点键值，则说明找到，直接返回；
- 如果 $k$ < 根节点键值，则接着在左子树中查找；
- 如果 $k$ > 根节点键值，则接着在右子树中查找；

插入的顺序影响所生成的树形结构，不同的树形结构具有不同的查找效率。如何衡量查找效率？
- 平均查找次数：所有节点的查找次数之和 / 节点的个数；

## 5 实现
### 5.1 C版
```cpp
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node *left, *right;
}Node;

Node *init(int val) {
    Node *p = (Node *)malloc(sizeof(Node));
    p->val = val;
    p->left = p->right = NULL;
    return p;
}

void clear(Node *root) {
    if(root == NULL) return;
    clear(root->left);
    clear(root->right);
    free(root);
}

Node *insert(Node *root, int val) {
    if(root == NULL) return init(val);
    if(root->val == val) return root;
    if(val < root->val) {
        root->left = insert(root->left, val);
    } else {
        root->right = insert(root->right, val);
    }
    return root;
}

//查找度为 2 的节点的前驱
Node *predecessor(Node *root) {
    Node *temp = root->left;
    while(temp->right) temp = temp->right;
    return temp;
}

Node *erase(Node *root, int val) {
    if(root == NULL) return NULL;
    if(val == root->val) {
        /*if(root->left == NULL && root->right == NULL) {
            free(root);
            return NULL;
        } else if(root->left == NULL || root->right == NULL) {
            Node *temp = root->left ? root->left : root->right;
            free(root);
            return temp;
        }*/
        //虽然是两种情况，但一种解决办法就可以双双吃掉
        if(root->left == NULL || root->right == NULL) {
            Node *temp = root->left ? root->left : root->right;
            free(root);
            return temp;
        } else {
            Node *temp = predecessor(root);
            root->val = temp->val;
            root->left = erase(root->left, temp->val);
            return root;
        }
    }
    if(val < root->val) {
        root->left = erase(root->left, val);
    } else {
        root->right = erase(root->right, val);
    }
    return root;
}

int search(Node *root, int val) {
    if(root == NULL) return 0;
    if(root->val == val) return 1;
    if(val < root->val) {
        return search(root->left,val);
    }
    return search(root->right, val);
}

void output(Node *root) {
    if(root == NULL) return;
    output(root->left);

    int left = root->left ? root->left->val : 0;
    int right = root->right ? root->right->val : 0;
    printf("(%d, %d, %d)\n", root->val, left, right);

    output(root->right);
}

int main() {
    int op, val;
    Node *root = NULL;
    while(scanf("%d%d", &op, &val) != EOF) {
        switch(op) {
            case 0: printf("search %d, result : %d\n", val, search(root, val)); break;
            case 1: root = insert(root, val); break;
            case 2: root = erase(root, val); break;
        }
        if(op) {
            output(root);
            printf("----------\n");
        }
    }
    return 0;
}
```

## 6 扩展内容
### 6.1 如何解决排名相关检索需求；
### 6.2 解决 Top-K 问题；
### 6.3 二叉排序树和快速排序关系