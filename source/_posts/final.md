---
title: final
author: Portgas·D·Asce
categories:
  - [C/C++]
tags:
  - C++关键字
date: 2020-08-28 21:15:46
---
C++11关键字final。
<!--more-->
C++11关键字final用途：
- 禁止虚函数被重写；
- 禁止基类被继承；
```cpp
class base1{
    virtual void a() final;
};
class derived : public base1{
    virtual void a(int a);//重定义，没问题
    virtual void a();//重写，error
};

class base2 final{};
class derived2 : public base2{};//error
```

