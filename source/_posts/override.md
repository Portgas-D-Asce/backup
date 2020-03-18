---
layout: hexo
title: override
date: 2020-03-18 23:36:54
categories:
- [Language, C/C++]
tags:
- C/C++
---
C++关键字override。
<!--more-->
当我们打算在派生类中对基类的某个虚函数进行重写时，可能由于疏忽（参数类型、参数个数、返回值类型不匹配等原因），导致重写“变质”成了重定义，与我们想要的效果失之毫厘，差之千里，这种错误很难发现；为了避免这种错误的发生引入了override关键字；

- 通过在派生类中的虚函数尾部加上override关键字使得“重写”意图更加清晰，避免错误发生；
- 如果我们使用override标记了某个函数，但该函数并没有覆盖已存在的虚函数，编译器将报错；
```
class Base{ 
public: 
  virtual int func(int a, int b); 
}; 
  
class Derive : public Base{ 
public: 
  virtual int func(int a) override; // 报错，没有重写虚函数 
}; 
```
