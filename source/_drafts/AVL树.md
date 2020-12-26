---
title: AVL树
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 基础数据结构
  - 二叉树
  - 二叉搜索树
date: 2020-12-22 16:42:22
---

<!--more-->

## 1 AVL树认知
AVL树是一种平衡二叉搜索树，它满足性质： 
- 任一子树的左右子树的高度差，不会超过 1；

思考：
- 高度为 $H$ 的二叉搜索树，所包含的节点数量在什么范围内？
  - 二叉搜索树退化为链表时，其所包含的节点数量最少，下界为 $H$；
  - 二叉搜索树为满二叉搜索树时，其所包含的节点数量最多，上界为 $2^H - 1$
- 高度为 H 的 AVL 树，所包含的节点数量在什么范围内？
  - 设 $low(H)$ 为高度为 $H$ 的 AVL 树，下界为 $low(H) = low(H - 1) + low(H - 2) + 1$；
  - 同二叉搜索树，其上界为 $2^H - 1$；

## 2 左/右 旋
**左/右旋的本质：** 在不破坏二叉搜索树的前提下减小左右子树的高度差。

**“抓着谁旋转”：** 回溯过程中，第一次违反 AVL 树性质的那个节点；

{% asset_img 1.png %}

## 3 平衡遭到破坏的情况

设:
- $ha$（$hb$， $hc$， $hd$）表示从 $K1$ 节点到 $A$（$B$， $C$， $D$）子树叶子结点的最长路径长度；
- $K1$ 为回溯过程中，第一次发现失衡的节点；

### 3.1 LL 型

{% asset_img 2.png %}

**LL 型：** K1 的左子树更高 且 K2 的左子树更高；
- $ha$, $hb$, $hc$, $hd$ 之间的关系为： $ha = hb + 1 = max(hc, hd) + 2$;
  - 如果 $hb = ha$，那么说明在插入/删除之前 $K1$ 子树已经不平衡了；因此 $ha = hb + 1$ 一定成立；
  - 因为是回溯到 $K1$ 节点的时候，才发现失衡，因此 $ha = max(hc, hd) + 2$ 一定成立；

如何解决 LL 型失衡呢？
- 抓着 $K1$ “大右旋”；

### 3.2 LR 型
{% asset_img 3.png %}

**LR 型：** $K1$ 的左子树更高 且 $K2$ 的右子树更高；
- $ha$, $hb$, $hc$, $hd$ 之间的关系为： $ha + 1 = max(hb, hc) = hd + 2$（原因参照 LL 型）；

如何解决 LR 型失衡？
- 先抓着 $K2$ "小左旋" 使得 $ha = max(hb, hc) + 1$，也就是转化成 LL 型；
- 然后抓着 $K1$ “大右旋”；

### 3.3 RR 型
{% asset_img 4.png %}

**RR 型：** $K1$ 的右子树更高 且 $K3$ 的右子树更高；
- $ha$, $hb$, $hc$, $hd$ 之间的关系为： $max(ha, hb) + 2 = hc + 1 = hd$（原因参照 LL 型）；

如何解决 RR 型失衡？
- 抓着 $K1$ “大左旋”；

### 3.4 RL 型
{% asset_img 5.png %}

**RL 型：** $K1$ 的右子树更高 且 $K2$ 的左子树更高；
- $ha$, $hb$, $hc$, $hd$ 之间的关系为： $ha + 2 = max(hb, hc) = hd + 1$（原因参照 LL 型）;

如何解决 RL 型？
- 转着 $K2$ “小右旋” 使得 $max(hb + hc) + 1 = hd$，也就是转化成 RR 型；
- 抓着 $K1$ “大左旋”;

### 3.5 总结
思路整理：实际上只需要记一种 LL 型就够了：
- RR 型跟 LL 型是一样的，只需要把 LL 型的右旋变成左旋即可；
- LR 型可以对其 左孩子进行一次 “小左旋” 即可将其转化为 LL 型；
- 同理，RL 型也是可以转化为 RR 型；

记忆：
- LL 型：L + L = R（大右旋）；
- RR 型：R + R = L （大左旋）；
- LR 型：抓着 左孩子 “小左旋”（抓着第一位朝着第一位方向小旋，把第二位变成第一位）把问题转化为 LL 型；
- RL 型：抓着 右孩子 “小右旋”（抓着第一位朝着第一位方向小旋，把第二位变成第一位）把问题转化为 RR 型；

思考：结合 左/右旋 的本质，针对四种情况，分别考虑下到底是为什么 “那么处理一下”，AVL 树就能恢复平衡？

## 4 实现
### 4.1 C版
```cpp
#include <stdio.h>
#include <stdlib.h>

typedef struct Node {
    int val;
    struct Node *left, *right;
} Node;

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

Node *predecessor(Node *root) {
    Node *temp = root->left;
    while(temp->right) temp = temp->right;
    return temp;
}

Node *erase(Node *root, int val) {
    if(root == NULL) return NULL;
    if(root->val == val) {
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
        return search(root->left, val);
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
    int op = 0, val = 0;
    Node *root = NULL;
    while(scanf("%d%d", &op, &val) != EOF) {
        switch(op) {
            case 0:
                printf("searching %d, result = %d\n", val, search(root, val));
                break;
            case 1:
                root = insert(root, val);
                break;
            case 2:
                root = erase(root, val);
                break;
        }
        if(op) {
            output(root);
            printf("----------\n");
        }
    }
    return 0;
}
```
### 4.2 C++版

