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
## 2.27
### c/c++ 标准
- 89
- 99
- 03c/
- 11
- 17
- 20

### C++ 联邦 和 编程范式
- C 语言（面向过程编程）
- 类/对象（面向对象编程）
- STL
- 模板（泛型编程）
- Lamdba表达式（函数式编程）
- 异常处理机制

### 好的编码习惯
- 少用define；
- 多用const（真/伪 const）；
- 声明变量的同时进行初始化；

### const 对象 和 const 成员函数
- const 成员函数中不允许修改成员变量；
- const 成员函数只能调用 const 成员函数；
- const 对象只能调用 const 成员函数；
- const 实际上是修饰的是 this 指针；
- mutable 使用；

### 初始化列表
- 初始化顺序与成员变量声明顺序相同，不受成员初始化列表的影响；
- 多使用初始化列表（效率高）；

### 货舱选址（刷题）
奇数: 只有一个最佳位置，最中间数所在的位置；
偶数: 多个最佳位置，最中间两个数及其中间所有区域均可以，一般选择中间两个数的位置；

### 合并果子（刷题）
**哈夫曼编码：** $l_i$ 为第 $i$ 个字符的编码长度，$p_i$ 为第 $i$ 个字符出现的概率，目标是使得平均编码长度最小，就是最小化：
$$\sum_{i = 1}^{n} (p_i \times l_i)$$

**合并果子：** $c_i$ 为第 $i$ 堆果子移动次数， $w_i$ 为第 $i$ 堆果子的重量，目标是使得体力耗费值最小，就是最小化：
$$\sum_{i = 1}^{n}(c_i \times w_i)$$

**结论：** 两者本质上是一样的。

### 国王游戏（刷题256）（看回放）


### 类与对象
基本概念:
- 类
- 对象
- 成员变量
- 成员函数
- 访问权限

### 实现 cout
cin/cout 本质上是对象。
```cpp
#include <cstdio>

class out {
public:
    out& operator<<(int x) {
		printf("%d", x);
	}
	out& operator<<(const char *s) {
		printf("%s", s);
	}
};

int main() {
    out o;
	o << 5 << " " << "hello world\n";
	return 0;
}
```

## 2.28

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


Complex a(1.1, 2.2);
double b = 3.3;

a + b 时，b会先调用转换构造函数，生成一个临时 Complex 对象，然后再调用 Complex 的 operator+ 会得到结果；

b + a 时，却是编译错误，而不是像上面那样 b 先 隐式转换为 Complex 对象，然后和 a 相加？


int a = 3;
double b = 4.4;

//a + b 和 b + a 中，a都会隐式转换为 double 吧