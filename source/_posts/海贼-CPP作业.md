---
title: 海贼-CPP作业
author: Portgas·D·Asce
categories:
  - [C/C++]
tags:
  - 海贼班
date: 2021-02-28 13:21:37
---

<!--more-->
# 2.27 ~ 2.28
## string 类
### find
> 函数原型
```cpp
size_t find (const string& t, size_t pos = 0) const noexcept;

size_t find (const char* t, size_t pos = 0) const;

size_t find (const char* t, size_t pos, size_type n) const;

size_t find (char c, size_t pos = 0) const noexcept;
```

> 函数功能
查找字符串 $t$ 在字符串 $s$ 中，从位置 $pos$ 开始，第一次出现的位置。
- $t$ 可以为： string 对象、c-string 变量、字符变量
- 查找成功，返回查找到的位置；否则，返回 string::npos ；

> 示例代码：
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdefghabc";
    string t = "abc";
    
    cout << s.find(t) << endl;
    cout << s.find(t.c_str()) << endl;
    cout << s.find(t.c_str(), 1) << endl;
    cout << s.find(t[2], 3) << endl;

    if(s.find("xyz") == string::npos) {
        cout << "can not find!" << endl;
    }
    return 0;
}
```

### substr
> 函数原型
```cpp
string substr (size_t pos = 0, size_t len = n) const;
```

> 函数功能

获得字符串 $s$ (假设长度为 $m$ )从 $pos$ 开始的，长度为 $n$ 的子串。
- $pos$ ：当 $pos == m$ 时，返回空字符串；当 $pos > m$ 时，抛出 $out\_of\_range$ 异常；
- $n$ : 当 $pos + n >= m$ 时，直接返回从 $pos$ 到结尾的子串； 

> 示例代码
```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdefg";

    //pos -> pos + 2
    cout << s.substr(1, 3) << endl;

    //pos -> 结尾
    cout << s.substr(1) << endl;
    cout << s.substr(1, 100) << endl;

    //out of range
    cout << s.substr(100) << endl;
    return 0;
}
```
### insert
> 函数原型
```cpp
string& insert (size_t pos, const string& t);

string& insert (size_t pos, const string& t, size_t subpos, size_t sublen);

string& insert (size_t pos, const char* t);

string& insert (size_t pos, const char* t, size_t n);

string& insert (size_t pos, size_t n, char c);

//...
```
> 函数功能

在字符串 $s$ 的 $pos$ 位置上插入字符串 $t$。
- $t$ 可以是 string 对象、c-string 变量；

> 代码示例

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "abcdefg", t = "xyz";

    cout << s.insert(3, t) << endl;
    cout << s.insert(3, t, 1, 2) << endl;
    cout << s.insert(3, t.c_str()) << endl;
    cout << s.insert(3, t.c_str(), 2) << endl;

    cout << s.insert(3, 5, 'x') << endl;
    return 0;
}
```
## nth_element 函数
> 函数原型：
```cpp
//采用默认排序规则 operator< 
template <class RandomAccessIterator>
void nth_element (RandomAccessIterator first, RandomAccessIterator nth,
                    RandomAccessIterator last);

//自定义排序规则
template <class RandomAccessIterator, class Compare>
void nth_element (RandomAccessIterator first, RandomAccessIterator nth,
                    RandomAccessIterator last, Compare comp);
```
> 执行结果：

假设第 $nth$ 大的数为 $nums[nth]$
- $nums[nth]$ 放在第 $nth$ 位置上；
- 第 $nth$ 位置前面的数小于等于 $nums[nth]$ ；
- 第 $nth$ 位置后面的数大于等于 $nums[nth]$ ;

> 时间复杂度

时间复杂度： $O(n)$

> 示例代码
```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

void output(const vector<int> &nums) {
    for(int i = 0; i < nums.size(); ++i) {
        cout << nums[i] << " ";
    }
    cout << endl;
}

int main() {
    const int n = 10, k = 2;
    vector<int> nums;
    for(int i = 0; i < n; ++i) {
        nums.push_back(i);
    }
    //打乱顺序
    random_shuffle(nums.begin(), nums.end());
    output(nums);

    //nums.begin() + k，位置上放置了正确的数
    //默认排序规则
    nth_element(nums.begin(), nums.begin() + k, nums.end());
    output(nums);

    //自定义排序规则
    nth_element(nums.begin(), nums.begin() + k, nums.end(), greater<int>());
    output(nums);
    return 0;
}
```

## 合并果子 和 哈夫曼编码

**哈夫曼编码：** $l_i$ 为第 $i$ 个字符的编码长度，$p_i$ 为第 $i$ 个字符出现的概率，目标是使得平均编码长度最小，就是最小化：
$$\sum_{i = 1}^{n} (p_i \times l_i)$$

**合并果子：** $c_i$ 为第 $i$ 堆果子移动次数， $w_i$ 为第 $i$ 堆果子的重量，目标是使得体力耗费值最小，就是最小化：
$$\sum_{i = 1}^{n}(c_i \times w_i)$$

**结论：** 两者本质上是一样的。

## 支持加减乘除操作的复数类封装

### 代码实现
```cpp
#include <iostream>
using namespace std;

class Complex {
private:
	double _real;
	double _imag;
public:
	Complex(double real = 0, double imag = 0) 
		: _real(real), _imag(imag) {}
	Complex(const Complex &x) = default;
	Complex& operator=(const Complex &x) = default;
	~Complex(){}
	double real() const {
		return _real;
	}
	double imag() const {
		return _imag;
	}
    
	Complex operator+() const {
		return *this;
	}
	Complex operator-() const {
		return Complex(-_real, -_imag);
	}
	Complex& operator+=(double x) {
		_real += x;
		return *this;
	}
    Complex& operator+=(const Complex &x) {
		_real += x._real;
		_imag += x._imag;
		return *this;
	}
	Complex operator+(double x) const {
		Complex temp = *this;
		temp += x;
		return temp;
	}
	Complex operator+(const Complex &x) const {
		Complex temp = *this;
		temp += x;
		return temp; 
	}

	Complex& operator-=(double x) {
		_real -= x;
		return *this;
	}
	Complex& operator-=(const Complex &x) {
		_real -= x._real;
		_imag -= x._imag;
		return *this;
	}
	Complex operator-(double x) const {
		Complex temp = *this;
		temp -= x;
		return temp;
	}
	Complex operator-(const Complex& x) const {
	    Complex temp = *this;
		temp -= x;
		return temp;
	}

    Complex& operator*=(double x) {
		_real *= x;
		_imag *= x;
		return *this;
	}
	Complex& operator*=(const Complex& x){
		double temp = _real;
		_real = _real * x._real - _imag * x._imag;
		_imag = temp * x._imag + _imag * x._real;
		return *this;
	}
	Complex operator*(double x) const {
		Complex temp = *this;
		temp *= x;
		return temp;
	}
	Complex operator*(const Complex& x) const {
	    Complex temp = *this;
		temp *= x;
		return temp;
	}

	Complex& operator/=(double x) {
		_real /= x;
		_imag /= x;
		return *this;
	}
	Complex& operator/=(const Complex& x) {
		double squa = x._real * x._real + x._imag * x._imag;
		double temp = _real;
		_real = (_real * x._real + _imag * x._imag) / squa;
		_imag = (_imag * x._real - temp * x._imag) / squa;
		return *this;
	}
	Complex operator/(double x) const {
	    Complex temp = *this;
		temp /= x;
		return temp;
	}
	Complex operator/(const Complex &x) const {
		Complex temp = *this;
		temp /= x;
		return temp;
	}
};

Complex operator+(double a, const Complex &b) {
	return Complex(a) + b;
}
Complex operator-(double a, const Complex &b) {
	return Complex(a) - b;
}
Complex operator*(double a, const Complex &b) {
    return Complex(a) * b;
}
Complex operator/(double a, const Complex &b) {
	return Complex(a) / b;
}

ostream& operator<<(ostream& out, const Complex &x) {
	out << x.real() << " + " << x.imag() << "i";
	return out;
}

int main() {
	int a = 5;
	Complex c1(1.1, 2.2), c2(3.3, 4.4);
	//正负号
	cout << +c1 << endl;
	cout << -c1 << endl;
	cout << "----------" << endl << endl;

	//加法
	cout << c1 + c2 << endl;
	cout << a + c1 << endl;
	cout << c1 + a << endl;
	c1 += c2;
	cout << c1 << endl;
	c1 += a;
	cout << c1 << endl;
	cout << "----------" << endl << endl;
	
    //减法
	cout << c1 - c2 << endl;
	cout << a - c1 << endl;
	cout << c1 - a << endl;
	c1 -= c2;
	cout << c1 << endl;
	c1 -= a;
	cout << c1 << endl;
	cout << "----------" << endl << endl;
	
    //乘法
	cout << c1 * c2 << endl;
	cout << a * c1 << endl;
	cout << c1 * a << endl;
	c1 *= c2;
	cout << c1 << endl;
	c1 *= a;
	cout << c1 << endl;
	cout << "----------" << endl << endl;
	
    //除法
	cout << c1 / c2 << endl;
	cout << a / c1 << endl;
	cout << c1 / a << endl;
	c1 /= c2;
	cout << c1 << endl;
	c1 /= a;
	cout << c1 << endl;
	cout << "----------" << endl << endl;
    
	return 0;
}
```
### 总结
> 重载运算符
- 为了实现加减乘除操作，除了需要重载 +、-、 \*、 /、 +=、 -=、\*=、/= 外，还需要重载正负运算符 +、- 。
- / 和 /= 、\* 和 \*= 这些计算过程是相同的，需要对计算过程进行封装（这里是使用 /= 实现 /）；
- 需要处理支持的情况有：
  - Complex 与 Complex 运算；
  - Complex 与 纯实数（int， double） 运算；

> Complex 与 double 运算

针对 Complex + double 这种情况：
- 重载并不是必须的；
- 当不重载时：
  - double 会调用转换构造函数，隐式转换为 Complex ，变成 Complex + Complex 来计算；
  - 优点，代码实现少（省去 Complex + double 的重载）；缺点，每次都要调用转换构造函数生成一个临时 Complex 对象，代码效率会降低。
- 重载时（推荐）：需要实现 Complex + double 重载，但不会导致效率降低。

针对 double + Complex 这种情况：
- 重载是必须的； 
  - double 也可以隐式转换，然后...所以也可以不重载吧？
  - 实现 A + B的同时，也要求实现 A += B，两者是成套的，double + Complex这种情况可以解释，但 double += Complex 就解释不通了；
  - 所以必须重载；

> 关于运算符重载的两种方式

运算符重载：
- 第一种方式：作为类的成员函数来实现；
- 第二种方式：作为全局函数来实现，通常该函数是一个友元函数（友元不是必须的，但此时需要通过 getter/setter 来访问成员变量）；
