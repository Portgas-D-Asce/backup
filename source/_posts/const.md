---
title: const
author: Portgas·D·Asce
categories:
  - [C/C++]
tags:
  - C++关键字
date: 2020-09-12 23:51:04
---

<!--more-->
注：按道理应该对底层 const 和 顶层 const 进行说明，但个人觉得记着很麻烦，索性直接忽略它。

重点：
- const意味着什么？意味着常数？当然不，const意味着 “ 保护 ”保护数据在传输过程中不被修改；
- const可以预防意外变动，提高程序的健壮性，所以 **能用就用**（use const whenever you need）；

## 1 面向过程中的 const
为了与下面面向对象中的 const 对比，姑且先这么叫吧。
### 1.1 修饰普通变量
```cpp
//下面两种没有区别，一样的
const int a = 10;
int const b = 20;
//a = 20; //error: assignment of read-only variable ‘a’
//b = 30; //error: assignment of read-only variable ‘b’
```
### 1.2 修饰指针
**常指针：** 不允许修改指针本身；
```cpp
int a = 10;
int b = 20;
int* const ptr = &a;
//ptr = &b //error:assignment of read-only variable ‘ptr’
```
**指向常量的指针：** 不允许修改指针所指的内容
```cpp
int a = 10;
const int* ptr = &a;
//*ptr = 20; //error: assignment of read-only location ‘* ptr’
```

### 1.3 const与引用
强强联合
- 引用在参数传递过程中，可以避免对象的拷贝，进而提高程序运行效率；
- const可以保证数据在传输过程，不被意外改动；
- const与引用联合（即，常引用），可以保证数据安全又高效地传输，真的是太强了；
- 函数形参通常使用常引用来修饰；

<!--### 1.4 const与重载-->

## 2 面向对象中的 const
### 2.1 const 修饰成员函数
```cpp

class A {
public:
    //声明
    int add(int a, int b) const;
};

//定义
int add(int a, int b) const {
    return a + b;
}
```

- 用const修饰成员函数，可以防止对象的数据成员被修改；
- 表面上看是修饰成员函数，本质上修饰的是 this 指针（本质是一个指向类类型对象的 常指针），使 this 指针从 常指针 转变为 指向常量的常指针；

### 2.2 const 对象
```cpp
const A a;
```

注意：
- const 对象只能访问常成员函数；
- 常成员函数可以访问其它常成员函数（静态成员函数，静态成员变量也是可以访问的）,但不能访问其它成员函数；
