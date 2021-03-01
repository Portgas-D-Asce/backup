---
title: 海贼-CPP
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-02-27 13:51:03
---

<!--more-->

C++ 内容：
- C 语言
- 类/对象（面向对象编程）
- STL
- 模板（泛型编程）
- Lamdba表达式（函数式编程）
- 异常处理机制


mutable

```cpp

#include <iostream>
using namespace std;

class A {
public:
	//构造函数体里面的都是赋值语句而不是构造语句
    A() {
        cout << this << ": default constructor called" << endl;
	}
	A(int x) {
        cout << this << ": transform constructor called" << endl;
	}
	//为什么是常引用
	//从构造函数目的角度来看
	//从既可以用const对象也可以用非const对象来构造新对象
	A(const A& x) {
        cout << this << ": copy constructor called" << endl;
	}

	//为什么不返回值类型：效率低 且 没必要
	//返回普通引用和常引用都是可行的
	const A & operator=(const A& x) {
        cout << this << ": operator= called" << endl;
		return *this;
	}
	~A() {
        cout << this << ": destructor" << endl;
	}
};

int main() {
	A a;	//直接调用默认拷贝构造函数
	A b;	//直接调用默认拷贝构造函数
	A c = 3;	//直接调用单参构造函数

	//以下过程生成了一个用完就立马析构的临时对象
	a = 123;	//先隐式转换（调用单参构造函数），然后调用赋值运算符
    cout << "end of main" << endl;
    return 0;
}
```


## 拷贝构造函数的语义
传入对象 和 构造对象 的成员变量一模一样。

拷贝构造函数唯一需要考虑的问题就是 深/浅拷贝。

改变语义会导致 构造对象 随拷贝构造函数调用次数不同而不同；

## 返回值优化
关掉返回值优化
```bash
-fno-elide-constructors
```

## 泛型编程
在类中，使用Complex<T> 与 Complex 是一样的


