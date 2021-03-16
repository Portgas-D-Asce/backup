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
### 构造函数与析构函数
构造函数：负责初始化对象；
析构函数：负责销毁对象；

> 构造函数类型：
默认构造函数（default constructor）：参数个数为零的构造函数；当没有定义时，编译器会自动生成一个；

转换构造函数(conversion constructor)：参数个数为一的构造函数；隐式转换会调用转换构造函数，使用 explicit 禁止发生隐式转换；

拷贝构造函数（copy constructor）：参数必须为常引用，否则会导致栈溢出；
- 拷贝构造函数的语义就是复制一个一模一样的对象；
- 一般来说，不能添加其它多余操作（如果添加其它操作，在涉及到临时变量时，可能会导致bug）
- 加点小动作也是可以的，但前提代码逻辑不受拷贝构造函数调用次数影响：比方 share_ptr 的循环引用；

移动构造函数（move constructor）：解决列效率问题，C++重回神坛的关键；

赋值运算符：
- 普通赋值运算符；
- 移动赋值运算符；

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

### 静态成员变量/方法
```cpp
class A {
public:
    //类内声明
    static void func();
    static int x;
};

//类外定义
void A::func() {
    //...
}

int A::x = 0;
```

### const 成员方法
方法中不允许对成员变量进行修改；

### 对象与引用
引用在定义的时候必须进行初始化；

### C++中的结构体与类
struct：访问权限默认为 public；
class： 访问权限默认为 private；

### 返回值优化(RVO)
> 关掉返回值优化
```bash
g++ -fno-elide-constructors main.cpp
```


```cpp
#include <iostream>
using namespace std;

class A {
public:
    A() {
        cout << "default constructor called" << endl;
    }

    A(int x) {
        cout << "conversion constructor called" << endl;
    }
    A(const A &other) {
        cout << "copy constructor called" << endl;
    }
    ~A() {
        cout << "destructor called" << endl;
    }
};

int main() {
    A a = 5;
    return 0;
}
```
关闭掉返回值优化
- 先调用转换构造函数生成一个临时对象；
- 然后调用拷贝构造函数；
- 析构临时对象；
- 析构 a 对象；

编译器优化后：
- 直接调用转换构造函数；
- 析构 a 对象；

```cpp
#include <iostream>
using namespace std;

class A {
public:
    A() {
        cout << "default constructor called" << endl;
    }
    A(int x) {
        cout << "conversion constructor called" << endl;
    }
    A(const A &other) {
        cout << "copy constructor called " << endl;
    }

	~A() {
		cout << "destructor called" << endl;
	}
private:
    int x;
};

A fun() {
    A temp(1);
	cout << &temp << endl;
    return temp;
}

int main() {
    A a = fun();
	cout << &a << endl;
    return 0;
}
/* 返回值优化结果
conversion constructor called
0x7ffffbd4fe74
0x7ffffbd4fe74
destructor called
*/

/* 关闭掉返回值优化
conversion constructor called
0x7ffdee571924
copy constructor called 
destructor called
copy constructor called 
destructor called
0x7ffdee571950
destructor called
*/

```
关闭掉返回值优化：
- 先调用转换构造函数生成对象 temp；
- 然后调用拷贝构造函数将局部变量 拷贝到 fun 函数作用域外的一个临时变量，也就是返回值；
- 接着调用拷贝构造函数将临时变量拷贝到 a 对象；

编译器优化：
- 直接用 a 替代 temp，所以两者的地址是一样的；


注意：
- 一般情况，编译器会对拷贝构造函数优化，但不对赋值运算符做优化； 
- 所以轻易不要在拷贝构造函数中添加多余的处理操作，这与编译器所理解的拷贝构造函数不一致，导致它在不知情的情况下多做许多额外的操作；
- 在拷贝构造函数中是可以加些小动作的，但前提是保证编译器偷偷调用没有副作用，例如 shared_ptr 的引用计数；         
- 就是说，在保证构造函数语义的情况下，加点小动作是可以的，但是尽量不要；

实现拷贝构造函数需要注意两点：
- 第一点：深拷贝还是浅拷贝；
- 第二点：添加的小动作，会不会改变拷贝构造的语义（偷偷摸摸调用拷贝构造函数没有副作用）；

### 对象的初始化
对象初始化：
- 申请内存空间；
- 调用匹配的构造函数


### 其它
变量：定义 + 初始化；

函数： 函数声明 + 函数定义；
## 泛型编程
在类中，使用Complex<T> 与 Complex 是一样的


Complex a(1.1, 2.2);
double b = 3.3;

a + b 时，b会先调用转换构造函数，生成一个临时 Complex 对象，然后再调用 Complex 的 operator+ 会得到结果；

b + a 时，却是编译错误，而不是像上面那样 b 先 隐式转换为 Complex 对象，然后和 a 相加？


int a = 3;
double b = 4.4;

//a + b 和 b + a 中，a都会隐式转换为 double 吧

## 3.6
### 运算符重载
运算符的两种方式：
- 类内重载：
- 类外重载：

不能重载的运算符：


特殊的运算符重载
- 数组对象：重载 [] 运算符的类的对象，其外在表象像一个数组；
- 函数对象：重载 () 运算符的类的对象，其外在表象像一个函数，这个对象被称为仿函数；
- 指针对象：重载 -> 运算符的类的对象；其外在表象像一个指针；
- 它们得本质都是一个对象；

> 函数对象示例：实现可自定义比较规则的快排
```cpp
#include <iostream>
#include <functional>
#include <vector>
using namespace std;


//仿函数类可以看作是一个 函数簇
class Compare {
public:
	Compare(int type = 0) : _type(type) {

	}
	//相比普通函数仿函数可以做得更多
	bool operator()(int a, int b) {
		return _type & 1 ? a > b : a < b; 
	}
private:
	int _type;
};

int partition(vector<int> &nums, int p, int r, const function<bool(int, int)> &cmp) {
	int q = p;
	for(int i = p; i < r; ++i) {
		if(cmp(nums[i], nums[r])) {
			swap(nums[i], nums[q++]);
		}
	}
	swap(nums[q], nums[r]);
	return q;
}

void quick_sort(vector<int> &nums, int p, int r, const function<bool(int, int)> &cmp) {
	if(p >= r) return;
    int q = partition(nums, p, r, cmp);
	quick_sort(nums, p, q - 1, cmp);
	quick_sort(nums, q + 1, r, cmp);
}

int main() {
    srand(time(0));
	vector<int> nums;
	const int n = 10;
	for(int i = 0; i < n; ++i) {
	    nums.push_back(rand() % 100);
	}
	quick_sort(nums, 0, n - 1, Compare());
	for(int i = 0; i < n; ++i) {
	    cout << nums[i] << " ";
	}
	cout << endl;

	quick_sort(nums, 0, n - 1, Compare(1));
    for(int i = 0; i < n; ++i) {
		cout << nums[i] << " ";
	}
	cout << endl;
	return 0;
}

```

> 指针对象示例：实现智能指针 shared_ptr。

```cpp
#include <iostream>
using namespace std;

class A {
public:
    A(int x = 100) : _x(x) {}
    int x() const {
        return _x;
    }
    void x(int x) {
        _x = x;
    }
private:
    int _x;
};

class shared_ptr {
public:
	shared_ptr(A *ptr) : _cnt(new int(1)), _ptr(ptr) {};
	shared_ptr(const shared_ptr &other) : _cnt(other._cnt), _ptr(other._ptr) {
		*_cnt += 1;
	}

	shared_ptr& operator=(const shared_ptr &other) {
		if(_ptr == other._ptr) return *this;
		decrease_by_one();
		_cnt = other._cnt;
		*_cnt += 1;
		_ptr = other._ptr;

		return *this;
	}
	A* operator->() {
		return _ptr;
	}
	A& operator*() {
		return *_ptr;
	}
	int cnt() const {
		return *_cnt;
	}
	~shared_ptr() {
		decrease_by_one();
	}
private:
	A *_ptr;
	int *_cnt; 
	void decrease_by_one() {
		*_cnt -= 1;
		if(*_cnt == 0) {
			delete _ptr;
			delete _cnt;
		}
	}
};

int main() {
    shared_ptr sp1(new A());
	shared_ptr sp2(sp1);
	cout << sp1.cnt() << " " << sp2.cnt() << endl;
	shared_ptr sp3(new A());
	sp1 = sp3;
	cout << sp1.cnt() << " " << sp2.cnt() << " " << sp3.cnt() << endl;

    cout << sp3->x() << endl;
    sp3->x(999);
    cout << sp3->x() << endl;
	return 0;
}
```