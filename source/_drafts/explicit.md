---
title: explicit
categories:
  - [Language, C/C++]
tags:
  - C/C++
date: 2020-03-19 01:00:23
---
explicit
<!--more-->
用途：
- 用于修饰构造函数（普通构造函数、拷贝构造函数、移动构造函数都可以）；
- 指明构造函数只能被显式调用，不能被隐式调用（以函数调用运算符()形式的调用都是显式调用，其它形式都是隐式调用）；
```
#include <iostream>
using namespace std;
class A {
private:
	int m;
	int n;
public:
	explicit A(int x) : m(x), n(0) {
		cout << "single" << endl;
	};
	explicit A(int x, int y) : m(x), n(y) {
		cout << "double" << endl;
	}
	explicit A(const A& a) : m(a.m), n(a.n) {
		cout << "copy" << endl;
	}
	explicit A(A&& a) : m(a.m), n(a.n) {
		a.m = 0;
		a.n = 0;
		cout << "move" << endl;
	}
};
int main() {
	A a(100);		//显式调用
	//A b = 300;	//error,不能隐式调用普通构造函数
	A c(100, 200);	//显示调用
	//A d = { 3, 7 };//error,不能隐式调用普通构造函数
	A e(a);			//显示调用
	//A f = a;		//error,不能隐式调用拷贝构造函数
	A g(move(a));	//显示调用
	//A h = move(c);//error，不能隐式调用移动构造函数
	return 0;
}
```
ps：
- 不要说什么只能用来修饰带一个参数的构造函数；
- 也不要说implicit，c++里面就没有这个关键字；
