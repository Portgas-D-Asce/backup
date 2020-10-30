---
title: 海贼--C语言与基础数据结构
categories:
  - [海贼班笔记]
tags:
  - 
---

<!--more-->
## 2020-10-13
### scanf
函数原型：
```c
int scanf(const char *format, ...);
```
- 返回值：读入变量的个数；
- format：格式控制符；
- ...: 变参列表；


### printf
函数原型：
```c
int printf(const char *format, ...);
```
- 返回值：输出字符的个数；
- format：格式控制符；
- ...：变参列表；


### 其它
2、%[]：
```c
//正常scanf遇到空格即停止，以下scanf只有遇到换行才停止
//为了避免死循环，需要读掉 '\n'
while(scanf("%[^\n]", str) != EOF) {
    getchar();
    printf(" has %d chars.\n", printf("%s", str));
}

//结束输入： ctr + d
```

3、vim命令：
```bash
#复制当前行
yy

#粘贴
p
```
## 2020-10-15

文件描述副
- stderr:标准错误输出
- stdout：标准输出
- fout：

stderr stdout区别

重定向：
- >: 标准输出（stdout）重定向；
- 2>: 标准错误（stderr）重定向；
- <： 标准输入（stdio）重定向；


ls

- printf: 打印到标准输出端（终端）

- sprintf：打印到字符串中，（字符串拼接，注意边读边写）

- fprintf：打印到文件中

文件权限

```c
FILE *fout = fopen("output", "w");
fclose();
```
### 数学函数
abs 头文件 ： stdlib

### C语言基本运算符

负数除法和取余
- 除法：被除数 和 除数 符号相同 结果为正；符号相反，结果为负；
- 取余：结果符号 跟 被除数 保持一致；

计算机里面的运算都是按照 补码 来计算的；

左移，右移：
- 针对所有位的（包括符号位）；
- 左移：无论正负，右侧均补 0 ；在非溢出情况下：
  - 无论正负，左移都相当于乘以 2 的幂次方；
- 右移：左侧填充符号位，即负数填充 1，正数填充 0； 
  - 对于正数，右移相当于不断地 除 2；
  - 对于负数，右移相当于不断 除 2 并最后对结果 减 1；



## 2020-10-17

### 条件控制

!!(x):归一化

case 后面不允许 直接声明变量;

default 写错了编译不会报错，为什么？
- default是与switch配合的关键字 打错了就会误认为是与goto配合的标号，这里被当做标号自然不会报错；

逻辑运算符 短路原则
```
int a = 0;
int b = 0;
if((a++) && (b++)) {
    ...
}

if((a++) || (b++)) {
    ...
}
```

分支预测
```c
#define likely(x) __builtin_expect(!!(x), 1)

#define unlikely(x) __builtin_expect(!!(x), 0)
```

if条件比较耗时，一些小技巧可以避免 if
```c
//原始
int cnt = 0;
if(i % 2) {
    cnt += 1;
}
//优化
cnt += i % 2;

//原始
if(i != 0) {
     printf("123\n");
}

//优化
!i || printf("123\n");
```

位运算符 比 % 效率高：
- i % 2 等效于 i & 1;
- i % 4 等效于 i & 3;
- i % 8 等效于 i & 7;
- ...
- i % 2^n 等效于 i & (2^n - 1)



### 随机数生成
rand:
- Returns a pseudo-random integer value between ​0​ and RAND_MAX (0 and RAND_MAX included).
- 头文件：stdlib.h
- 设置种子需要：time.h
```c
//设置随机种子
srand(time(0));
//随机生成[0, 99]
int x = rand() % 100;
```

### 日期合理性检验

### 回文数判断
- 十进制回文数；
- 二进制回文数；

### C语言bool
- C89是没有bool类型；
- 目前使用 bool 需要包含 stdbool.h 头文件；

## 2020-10-20

### 函数式编程

### 巧妙的二分法

二分法中所使用的单调数组不一定是真实存在的，可以用函数临时生成。

### 欧几里德算法

最大公约数，gcd
gcd(a, b) == gcd(b, a % b)如何证明？

设gcd(a, b) = x, 则有 a = mx， b = nx；

设 a = kb + a % b ， 则有 a % b = a - kb = mx - knx = （m - kn）x；

结论1：a 和 b 的最大公约数，一定是 b 和 a % b 的公约数；


设gcd(b, a % b) = y, 则有 b = my , a % b = ny;

设 a = kb + a % b ，则有 a = kmy + ny = (km + n)y;

结论2：b 和 a % b 的最大公约数，一定是 a 和 b 的公约数；


假设 gcd(a, b) = x， gcd(b, a % b) = y

根据结论 1 有 x <= y, 根据结论二有 y <= x ， 最终 x == y；

结论3：结合结论1、2，即有 gcd(a, b) == gcd(b, a % b);


### 扩展欧几里德算法

以下公式恒有整数解
$$
a * x + b * y = gcd(a, b)
$$


若 $x_0$, $y_0$ 是 以下方程的一个整数解
$$
b * x + a \% b * y = gcd(b, a \% b)
$$

则 $x_1 = y_0, y_1 = x_0 - a / b * y_0$ 是以下方程的一个整数解：
$$
a * x + b * y = gcd(a, b)
$$

证明：
$$
b * x_0 + (a - a / b * b) * y_0 = gcd(b, a \% b) \\

a * y_0 + b(x_0 - a / b * y_0) = gcd(a, b)
$$

通过递归方法可以求解方程
$$
a * x + b * y = gcd(a, b)
$$
的初始解，进一步可以得到改方程的所有解。



疑问：以下方程一定没有整数解吗？
$$
a * x + b * y = !gcd(a, b)
$$


## 2020-10-22

循环读入
```c
int n = 0;
while(~scanf("%d", &n)) {
    
}
```
负数的补码 = 反码 + 1；

如何快速求 补码：0 向前借 1；
- -1 ： 100000000 - 1；
- -2 ： 100000000 - 2；
- ...
- -n ： 100000000 - n；

### 变参函数
理论：


va 一族：
- va_list:
- va_arg:
- va_begin:
- va_end:

printf 简版实现

putchar

## 2020-10-24

### 素数筛
- 空间复杂度 $O(n)$; 时间复杂度 $O(nloglogn)$；

存在的问题是会重复标记；
```c
#include <stdio.h>

#define max_n 100
int prime[max_n + 1];

int main() { 
    for(int i = 2; i * i <= max_n; ++i) {
	      if(prime[i]) continue;
		    for(int j = i * i; j <= max_n; j += i) {
		        prime[j] = 1;
		    }
	  }
    
	  for(int i = 2; i <= max_n; ++i) {
	      prime[i] || printf("%d\n", i);
	  }
    return 0;
}
```

### 线性筛
对于一个合数，是用其质因数分解中最小的质因子去标记；
```c
#include <stdio.h>
#define max_n 200000
int prime[max_n + 1];

int main() {
    for(int i = 2; i <= max_n; ++i) {
	      if(!prime[i]) prime[++prime[0]] = i;
		    for(int j = 1; j <= prime[0]; ++j) {
		        if(i * prime[j] > max_n) break;
			      prime[prime[j] * i] = 1;
			      if(i % prime[j] == 0) break;
		    }
	  }
	  for(int i = 1; i <= prime[0]; ++i) {
	      printf("%d\n", prime[i]);
	  }
    return 0;
}
```

### 二分法查找
```c
#include <stdio.h>

int binary_search(int *nums, int x, int n) {
    int p = 0, r = n - 1;
	  while(p <= r) {
	      int q = p + r >> 1;
		    if(nums[q] == x) return q;
		    nums[q] < x ? (p = q + 1) : (r = q - 1);
	  }
    return -1;
}

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
	  printf("%d\n", binary_search(nums, 3, 10));
    return 0;
}
```
为什么二分法要返回数组的下标？

二分法可以求解方程的根
```c
#include <stdio.h>
double f(double x) {
    return x * x;
}

double binary_search(double (*arr)(double), double x) {
    double p = 0, r = x, q;
	  if(x < 1.0) r = 1.0;
    #define EPSL 1e-6
	  while(r - p > EPSL) {
	      q = (p + r) / 2.0;
		    if(arr(q) < x) p = q;
		    else r = q;
	  }
    #undef EPSL 
	  return p;
}
int main() {
    double x;
	  while(~scanf("%lf", &x)) {
	      double ans = binary_search(f, x);
		    printf("my_sqrt(%g) = %g\n", x, ans);
	  }
    return 0;
}
```

### 牛顿迭代法
$$
x_2 = x_1 - f(x_1)/f'(x_1)
$$

```c
#include <stdio.h>
#include <math.h>

double F(double x, double n) {
    return x * x - n;
}

double f(double x) {
    return x * 2;
}

double Newton(double (*F)(double x, double n), double (*f)(double), double n) {
    double x = n / 2.0;
    #define EPSL 1e-7
	while(fabs(F(x, n)) > EPSL) {
	    x -= F(x, n) / f(x);
	}
    #undef EPSL
	return x;
}

int main() {
    double n;
	while(~scanf("%lf", &n)) {
	    printf("my_sqrt(%g) = %g\n", n, Newton(F, f, n));
	}
    return 0;
}
```

## 2020-10-27

### 源码到可执行文件

### 宏

#### 内置宏定义

#### 宏max实现
- 最外层要带括号；
- 每个变量带括号：防止优先级改变；
- 预先获取值，防止函数调用多次；

返回值问题：返回最后一条语句的返回值；
- { __typeof(a++) _a = (a++); __typeof(6) _b = (6); _a > _b ? _a : _b;} 

#### 利用宏实现日志输出
“#” 和 “##”
- “#”： 把宏参数编程字符串；
- “##”：把两个宏参数贴合在一起，如果连接的第二个宏为空，则会吃掉前面的链接符（eg，逗号）；

变参宏:args...

```c
#define print(func) {\
    printf("%s = %d\n", #func, func);\
}

```

编译时，查看预处理结果：
```
gcc -E main2.c
```

编译时设置宏定义
```
gcc -DDEBUG main2.c
```

### 字符串

字符串是一种特殊的字符数组

#### 字符串函数
头文件 string.h
- strlen：字符串长度
- strcpy：字符串拷贝
- strcmp：字符串比较
- strncpy：安全的字符串拷贝
- strncmp：安全的字符串比较
- memcpy：
- memset：
- memcmp：


## 2020-10-29
### 结构体
```c
struct person {
	char name[20];
	int age;
	char gender;
	float height;
};
```
typedef struct person {
	char name[20];
	int age;
	char gender;
	float height;
} Person;
声明变量时：
```c
struct person yu1;
Person yu2;
```

结构体内存对齐：
```c
//8字节
struct node1 {
    char a;
	char b;
	int c;
};

//12字节
struct node2 {
	char a;
	int c;
	char b;
};
```

强制改变结构体内存对齐：
- #pragma pack(n)
- #pragma pack(push)
- #pragma pack(pop)
- #pragma pack()

匿名结构体：
```c
vim
```

### 公用体

IP表示形式：点分十进制

大小端机器区分：
- 就是看低地址存的是数值的低位还是高位：存的低位，则为小端机器；存的高位，则为大端机器；
- 存储是以字节为单位的，无论大端还是小端，字节内都是高位在低地址；

```c
//数值：
00000000 00000000 00000000 00000001

//大端机器
00000000 00000000 00000000 00000001

//小端机器
00000001 00000000 00000000 00000000
```