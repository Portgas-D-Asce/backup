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

## 实现复数类
难点：
- 除法操作实现；
- 不同类型之间运算：整数加浮点数， 整数类型赋值为浮点类型

> 拷贝/赋值/移动

> getter/setter

> 运算符重载（加减乘除）
整形复数，浮点复数，整数，浮点数之间共 16 种情况。
> 
```cpp
#include <iostream>
using namespace std;

template <typename T>
class Complex {
private:
    T real;
    T imag;
public:
    Complex(T real = 0, T imag = 0)
        : real(real), imag(imag) {
    }
    Complex(const Complex<T> &x)
        : real(x.real), imag(x.imag){
    }
    Complex<T> & operator=(const Complex<T> &x) {
		real = x.real;
		imag = x.imag;
		return *this;
    }
    ~Complex() {}

    Complex<T> operator+(const Complex<T> &x) const {
        Complex<T> temp;
        temp.real = real + x.real;
        temp.imag = imag + x.imag;
        return temp;
    }
    Complex<T>& operator+=(const Complex<T> &x) {
        real += x.real;
        imag += x.imag;
        return *this;
    }

    Complex<T> operator-(const Complex<T> &x) const {
        Complex<T> temp;
        temp.real = real - x.real;
        temp.imag = imag - x.imag;
        return temp;
    }
    Complex<T>& operator-=(const Complex<T> &x) {
        real -= x.real;
        imag -= x.imag;
        return *this;
    }

    Complex<T> operator*(const Complex<T> &x) const {
        Complex<T> temp;
        temp.real = real * x.real - imag * x.imag;
        temp.imag = real * x.imag + imag * x.real;
        return temp;
    }
    Complex<T>& operator*=(const Complex<T> &x) const {
        Complex<T> old = *this;
        real = old.real * x.real - old.imag * x.imag;
        imag = old.real * x.imag + old.imag * x.real;
        return *this;
    }

    //除零不做处理
    Complex<T> operator/(const Complex<T> &x) const {
        Complex<T> temp;
        double squa = x.real * x.real + x.imag * x.imag;

        temp.real = (real * x.real + imag - x.imag) / squa;
        temp.imag = (imag * x.real - real * x.imag) / squa;
        return temp;
    }
    Complex<T>& operator/=(const Complex<T> &x) const {
        Complex<T> old = *this;
        double squa = x.real * x.real + x.imag * x.imag;

        real = (old.real * x.real + old.imag - x.imag) / squa;
        imag = (old.imag * x.real - old.real * x.imag) / squa;
        return *this;
    }
    /*ostream & operator<<(ostream &out) {
        out << "(" << real << ", " << imag << ")";
        return out;
    }*/
    void output() {
        cout << "(" << real << ", " << imag << ")" << endl;
    }
};

int main() {
    Complex<int> c1(1, 2), c2(3, 4);
    Complex<int> add = c1 + c2;
    add.output();
    
    Complex<double> d1(1.1, 2.2), d2(3.3, 4.4);
    Complex<double> mul = c1 * d1;
    mul.output();
    
    return 0;
}
```