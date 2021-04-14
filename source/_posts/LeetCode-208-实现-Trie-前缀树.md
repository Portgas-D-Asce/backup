---
title: LeetCode 208. 实现 Trie (前缀树)
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - Trie
date: 2021-04-15 00:21:22
---
题目直达：[LeetCode 208. 实现 Trie (前缀树)](https://leetcode-cn.com/problems/implement-trie-prefix-tree/)

## 分析
Node 节点中尝试实现重载 [] 运算符，需要注意：
- 返回的是引用；
- 指针需要取值之后再 “调用[]”，且 * 的运算符优先级小于 [];

## 实现
```cpp
#define CNT 26
#define BASE 'a'

class Node {
private:
    bool _flag;
    Node *_child[CNT];
public:
    Node() {
        _flag = false;
        for(int i = 0; i < CNT; ++i) _child[i] = nullptr;
    }
    void flag(bool flag) { _flag = flag;}
    bool flag() { return _flag; }
    Node *&operator[](int idx) { return _child[idx]; }
};

class Trie {
public:
    /** Initialize your data structure here. */
    Trie() {
        root = new Node();
    }
    
    /** Inserts a word into the trie. */
    void insert(string s) {
        int n = s.size();
        Node *cur = root;
        for(int i = 0; i < n; ++i) {
            int idx = s[i] - BASE;
            if((*cur)[idx] == nullptr) (*cur)[idx] = new Node();
            cur = (*cur)[idx];
        }
        cur->flag(true);
    }
    
    /** Returns if the word is in the trie. */
    bool search(string s) {
        int n = s.size();
        Node *cur = root;
        for(int i = 0; i < n; ++i) {
            int idx = s[i] - BASE;
            if((*cur)[idx] == nullptr) return false;
            cur = (*cur)[idx];
        }
        if(!cur->flag()) return false;
        return true;
    }
    
    /** Returns if there is any word in the trie that starts with the given prefix. */
    bool startsWith(string s) {
        int n = s.size();
        Node *cur = root;
        bool flag = true;
        for(int i = 0; i < n; ++i) {
            int idx = s[i] - BASE;
            if((*cur)[idx] == nullptr) return false;
            cur = (*cur)[idx];
        }
        return true;
    }
private:
    Node *root;
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie* obj = new Trie();
 * obj->insert(word);
 * bool param_2 = obj->search(word);
 * bool param_3 = obj->startsWith(prefix);
 */
```