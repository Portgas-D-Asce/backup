---
title: 多字符字符常量（multi-character character constant）
author: Portgas·D·Asce
categories:
  - [C/C++]
tags:
  - C/C++
date: 2020-11-20 02:29:51
---

<!--more-->

## 1 背景
海贼班的第一次考试结束了，其中一道选择题的一个选项，引起了大家的激烈探讨，先来看看是什么：
```c
int nums['10'];
```
上面那个数组声明的对吗？
- 对的，字符常量会被认为是一个整形，所以没问题，不过好像怪怪的；
- '10' 哪里是个字符常量啊，所以显然是错的啊；

那么正确答案到底是什么？
- 对的！！！ '10' 是一个叫做 “多字符字符常量” （本文主角）的东西，它会被解释为 int；

## 2 多字符字符常量
C标准声明多字符字符常量总是被解释为一个 int 类型的值，但是这个值具体为多少，依赖于编译器的实现，是一个 **implementation-defined behavior**。

### 2.1 undefined behavior & implementation-defined
- undefined behavior: 标准没有做出声明，实现成什么样（编译通过，答案也正确 和 编译通过，段吐核）都没问题；
- implementation-defined: 标准做出了声明，但并不是规定（总是被解释为 int 类型值，但具体值多少，自己看着办）；


经典的 undefined behavior：
- The effect of attempting to modify a string literal is undefined.（尝试修改字符串常量属于未定义的行为）
```c
#include <stdio.h>

int main() {
    char *p = "hello!";
    p[0] = 'y';
    p[5] = 'w';
    printf("%s\n", p);
    return 0;
}
```
解释：
> I can hear people screaming "But wait, I can compile this no problem and get the output yellow" or "What do you mean undefined, string literals are stored in read-only memory, so the first assignment attempt results in a core dump". This is exactly the problem with undefined behavior. Basically, the standard allows anything to happen once you invoke undefined behavior (even nasal demons).

### 2.2 不要想太多
'10' 就是一个 “多字符字符常量”，它没有类型，不能用 printf 进行输出。

### 2.3 测试
```c
#include <stdio.h>

int main() {
    printf("%d %c", '10', '10');
    return 0;
}
/*输出
12592 0
*/
```
12592怎么来的？
- '1' 的 ascii 码为 49， '0' 的 ascii 码为 48，12592 = 49 * 256 + 48；

0 怎么来的？
- 在小端机上，12592 的低位，存储在低地址处，也就是 '0' 存储在低地址处，%c读取一个字节，所以输出 0；

## 参考
- [Multi-character constant warnings](https://stackoverflow.com/questions/7755202/multi-character-constant-warnings)
- [Best practices for multi-character character constants](https://zipcon.net/~swhite/docs/computers/languages/c_multi-char_const.html)
- [Undefined, unspecified and implementation-defined behavior](https://stackoverflow.com/questions/2397984/undefined-unspecified-and-implementation-defined-behavior)