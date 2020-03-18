---
title: nullptr
categories:
  - [Language, C/C++]
tags:
  - C/C++
date: 2020-03-19 01:04:50
---
C++关键字nullptr
<!--more-->
我们都知道
- 未经初始化的指针是极其危险的；
- 因此，一般在声明时，同时初始化，使其指向某个变量；
- 如果实在不清楚它该指向哪，使用 **空指针（null pointer）** 对其初始化；
- 那么问题来了 空指针 是什么？
- 空指针 又跟 0，NULL，nullptr有什么关系？（说白了，0，NULL，nullptr就是 空指针 的不同版本）

一开始，C、C++里面都没有 空指针 这个东西，是用0 / NULL来替代 空指针 的：
**1、0 版本**
为什么可以用 0 来代替空指针？
- 大多数计算机系统不允许用户写地址为0的内存空间，因此我们可以用0来初始化指针；

**2、NULL 版本**
NULL是什么？
```
# undef NULL
# if defined(__cplusplus)
# define NULL 0
# else
# define NULL ((void*)0)
# endif
```
即：
- 在C++中，NULL本质是 0 ；
- 在C中，NULL本质是 ((void*)0)；

等等，void* 又是什么？
- void* 习惯被称为无类型指针，可用于存放任意变量的地址；

那显然 ((void*)0) 比 0 更适合当作空指针，为什么C++里还要用 0 作为空指针？
- c++不允许直接将void*隐式的转化为其他类型指针；

别急，考虑下面的代码
```
#include <iostream>
using namespace std;

void fun(int x) {
	cout << "call int version" << endl;
}

void fun(int* p) {
	cout << "call int* version" << endl;
}
int main()
{
	fun(NULL);	//输出：call int version
	return 0;
}
```
啊，有了前面的铺垫，为什么调用 int 版本，就不用多说了；但我们希望的是它作为空指针调用 int* 版本啊；
- 可见，在C++中，用本质为 0 的NULL还是有问题的；

**3、nullptr 版本**
哈哈，终于轮到nullptr闪耀登场了：
- 麻烦死了，不就是需要一个空指针吗？整那么多麻烦事，凭空造一个不就行了；
- nullptr习惯被称作指针空值；
- nullptr_t习惯被称作指针空值类型；

关于nullptr_t的一些规则：
- 所有定义为nullprt_t类型的数据都是等价的；
- nullprt_t类型数据可以隐式转换成任意一个指针类型；
- nullptr_t类型数据可以隐式转换为bool类型；

为什么已经有nullptr存在了，还要NULL
- 为了向后兼容；

