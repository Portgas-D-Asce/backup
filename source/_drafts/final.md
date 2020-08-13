---
title: final
date: 2020-03-18 23:28:22
categories:
- [Language, C/C++]
tags:
- C/C++
---
C++11关键字final。
<!--more-->
C++11关键字final用途：
- 禁止虚函数被重写；
- 禁止基类被继承；
```
class base1{
    virtual void a() final;
};
class derived : public base1{
    virtual void a(int a);//重定义，没问题
    virtual void a();//重写，报错
};

class base2 final{};
class derived2 : public base2{};//报错
```