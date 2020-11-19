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
**函数原型：**
```c
int scanf(const char *format, ...);
```
- 返回值：读入变量的个数；
- format：格式控制字符串；
- ...: 变参列表；

**EOF：可用于循环读入**
```c
//常规操作
while(scanf("%d%d", &m, &n) != EOF) {
    //...
}

//稍微骚点的操作
while(~scanf("%d%d", &m, &n)) {
    //...
}
```

当然也有：
- sscanf
- fscanf

### printf
**函数原型：**
```c
int printf(const char *format, ...);
```
- 返回值：输出字符的个数；
- format：格式控制字符串；
- ...：变参列表；


### 其它
**%[]：**
```c
//正常scanf遇到空格即停止，以下scanf只有遇到换行才停止
//为了避免死循环，需要读掉 '\n'
//结束输入： ctr + d
while(scanf("%[^\n]", str) != EOF) {
    getchar();
    printf(" has %d chars.\n", printf("%s", str));
}

//循环读入包含空格的字符串
//或者简单点,前面的空格会吃掉上一次的回车，巧妙化解死循环
while(scanf(" %[^\n]", str) != EOF) {
    printf(" has %d chars.\n", printf("%s", str));
}
```

### vim命令：
```bash
#复制当前行
yy

#粘贴
p
```
## 2020-10-15

### 特殊文件描述符及重定向
三个特殊文件描述符
- stdin: 标准输入
- stdout: 标准输出
- stderr: 标准错误

三者所对应的重定向
- \<： 标准输入（stdin）重定向；
- \>: 标准输出（stdout）重定向；
- \2>: 标准错误（stderr）重定向；

### printf系列
- printf: 打印到标准输出端（终端）
- sprintf：打印到字符串中，（字符串拼接，注意边读边写）
- fprintf：打印到文件中

### 实践
```c
#include <stdio.h>

//宏实现交换
//__typeof(a) 只获取表达式类型，而不执行表达式
#define swap(a, b) {\
	__typeof(a) __temp = a;\
	a = b; b = __temp;\
}

int main() {
	int n = 0;
	scanf("%d", &n);    //stdin
	printf("%d\n", n);  //stdout stderr

	char str[1000] = {0}, buffer[1000] = {0}, *p = str, *q = buffer;
    //实现字符串拼接
    //有了sprintf，字符串拼接、int转字符串、double转字符串...实现完全没问题
	sprintf(str, "%d.%d.%d.%d", 192, 168, 1, 2);
	printf("%s\n", str);
	if(n & 1) {
        //sprintf是 “边读边写” 的， 因此两个字符串要区分开
	    sprintf(q, "(%s)", p);
		swap(p, q);
	}
	if(n & 2) {
	    sprintf(q, "[%s]", p);
		swap(p, q);
	}
	if(n & 4) {
	    sprintf(q, "{%s}", p);
		swap(p, q);
	}
	printf("%s\n", p);
	
	//文件描述符
	FILE *fout = fopen("output", "w");
	fprintf(fout, "fout = %s\n", p);
    fclose(fout);

    //两者都会在控制台输出
    //重定向时可以 ./a.out > stdout 2> stderr
	fprintf(stdout, "stdout = %s\n", p);
	fprintf(stderr, "stderr = %s\n", p);
    return 0;
}
```

### C语言基本运算符
运算符：
- 四则运算；
- 移位运算符；
- 关系运算符；
- 逻辑运算符：注意 “短路原则”；
- 按位运算符：巧妙使用可以大幅提高运算效率；异或（两数交换）；

异或实现两数交换
```c
void swap(int *a, int *b) {
    *a ^= *b;
    *b ^= *a;
    *a ^= *b;
}
```

### 数学函数库

**math.h**
- pow:
- sqrt:
- ceil: 天花板函数；
- floor: 地板函数；
- 对数函数（换底公式，求解任意对数函数）
  - log: 以 e 为底的对数函数；
  - log10: 以 10 为底的对数函数；
- 三角函数（输入参数或返回值均为弧度制）
  - sin/asin: 
  - cos/acos: PI = acos(-1)
  - tan/atan/atan2: 

**stdlib.h**
- abs

**补充**

负数除法和取余
- 除法：被除数 和 除数 符号相同 结果为正；符号相反，结果为负；
- 取余：结果符号 跟 被除数 保持一致；

计算机里面的运算都是按照 补码 来计算的；

负数的补码 = 反码 + 1；

如何快速求负数的 补码：0 向前借 1；
- -1 ： 100000000 - 1；
- -2 ： 100000000 - 2；
- ...
- -n ： 100000000 - n；

左移，右移：
- 针对所有位的（包括符号位）；
- 左移：无论正负，右侧均补 0 ；在非溢出情况下：
  - 无论正负，左移都相当于乘以 2 的幂次方；
- 右移：左侧填充符号位，即负数填充 1，正数填充 0； 
  - 对于正数，右移相当于不断地 除 2；
  - 对于负数，右移相当于不断 除 2 并最后对结果 减 1；

## 2020-10-17

### 条件控制
**C语言bool**
- C89是没有bool类型；
- 目前使用 bool 需要包含 stdbool.h 头文件；

**switch：**
- case 后面不允许 直接声明变量;
- default 写错了编译不会报错，为什么？
  - default是与switch配合的关键字 打错了就会误认为是与goto配合的标号，这里被当做标号自然不会报错；

**逻辑运算符：短路原则**
```c
int a = 0;
int b = 0;
if((a++) && (b++)) {
    //...
}

if((a++) || (b++)) {
    //...
}
```

### 性能拉升到极致，打造性能巨兽
**分支预测**
- !!(x):归一化；
- __builtin_expect(!!(x), 1)：表示 x 非常有可能发生；

```c
#define likely(x) __builtin_expect(!!(x), 1)
#define unlikely(x) __builtin_expect(!!(x), 0)
```

**if条件比较耗时，一些小技巧可以避免 if**
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

### 练习
**日期合理性检验**
```c
#include <stdio.h>

int check(int y, int m, int d) {
    int days[13] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    if(m <= 0 || d <= 0 || m > 12) return 0;
	if((y % 4 == 0 && y % 100) || y % 400 == 0) days[2] += 1;
	return d <= days[m];
}

int main() {
	int y = 0, m = 0, d = 0;
	scanf("%d%d%d", &y, &m, &d);
    printf("%s\n", check(y, m, d) ? "YES" : "NO");
	return 0;
}
```

**回文数判断**
- 十进制回文数；
- 二进制回文数；
```c
//x过大会导致整形溢出
bool is_palindrome(int x, int base) {
    int y = 0, z = x;
    while(x) {
        y += y * base + x % base;
        x /= base;
    }
    return y == z;
}
```

## 2020-10-20
### 递归函数
过程：
- 递推 + 回溯；

证明：
- 采用数学归纳法证明递归的正确性。

**阶乘**
```c
int factorial(int n) {
    if(n == 0) return 1;
    return n * factorial(n - 1);
}
int main() {
    int n = 0;
    while(scanf("%d", &n) != EOF) {
        printf("fac(%d) = %d\n", n, fac(n));
    }
    return 0;
}
```
**斐波那契序列（fibonacci sequence）**
```c
int fibonacci(int n) {
    if(n == 0 || n == 1) return 1;
    return f(n - 1) + f(n - 2);
}

int main() {
    int n = 0;
    while(scanf("%d", &n != EOF)) {
        printf("fibonacci(%d) = %d\n", n, fibonacci(n));
    }
    return 0;
}
```

注意：计算 阶乘 和 斐波那契 都是很好的递归示例，但同时它们也是递归实现经典的反面教材：
- 它们的子问题之间是存在相交区域的，采用递归会导致子问题被多次处理，从而导致效率极为低下，应该采用动态规划解决。

### 函数式编程
> 将函数作为参数进行传递的编程方式；

**函数指针变量 和 函数指针类型**
```c
//函数指针变量
int (*func)(int);

//函数指针类型
typedef int (*Func)(int)
//用函数指针类型 声明一个 函数指针变量
Func func；
```

**练习：欧拉45**
```c
#include <stdio.h>
typedef long long ll;

ll Triangle(ll n) {
    return n * (n + 1) / 2;
}

ll Pentagonal(ll n) {
    return n * (3 * n - 1) / 2;
}

ll Hexagonal(ll n) {
    return n * (2 * n - 1);
}

ll binary_search(ll (*arr)(ll), ll n, ll x) {
    ll head = 0, tail = n - 1, mid;
    while(head <= tail) {
        mid = (head + tail) >> 1;
        if(arr(mid) == x) return mid;
        if(arr(mid) < x) {
            head = mid + 1;
        } else {
            tail = mid - 1;
        }
    }
    return -1;
}

int main() {
    ll n = 143;
    while(1) {
        ++n;
        int temp = Hexagonal(n);
        if(binary_search(Pentagonal, temp, temp) == -1) continue;
        //六边形数字一定是三角形数字
        //if(binary_search(Triangle, temp, temp) == -1) continue;
        printf("%d\n", temp);
        break;
    }
    return 0;
}
```
注意：二分法中所使用的单调数组不一定是真实存在的，可以用函数临时生成。
- 数组是展开了的函数；
- 函数是压缩了的数组；

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

```c
#include <stdio.h>
int gcd(int a, int b) {
    return b ? gcd(b, a % b) : a;
}

int main() {
    int a = 0, b = 0;
    while(scanf("%d%d", &a, &b) != EOF) {
        printf("gcd(%d, %d) = %d\n", a, b, gcd(a, b));
    }
    return 0;
}
```


### 扩展欧几里德算法



## 2020-10-22
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

### 数组
局部数组和全局数组的区别
- 全局数组会自动初始化为0，局部数组不会；
- 全局数组可以开得更大；

### 素数筛
- 空间复杂度 $O(n)$; 时间复杂度 $O(nloglogn)$；

存在的问题是会重复标记；
```c
#include <stdio.h>

#define max_n 100
int prime[max_n + 1];

int main() { 
    for(int i = 2; i <= max_n; ++i) {
	    if(prime[i]) continue;
        prime[++prime[0]] = i;
		for(int j = i * 2; j <= max_n; j += i) {
		    prime[j] = 1;
		}
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

二分法实现sqrt
```c
#include <stdio.h>
double f(double x) {
    return x * x;
}

double binary_search(double (*arr)(double), double x) {
    double p = 0, r = max(1.0, x), q = 0;
    #define EPSL 1e-6
	while(r - p > EPSL) {
	    q = (p + r) / 2.0;
		arr(q) < x ? (p = q) : (r = q);
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
$$x_2 = x_1 - f(x_1)/f'(x_1)$$

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
**宏有哪些形式：**
- 宏变量：例如，#define PI 3.1415926
- 宏函数：例如，#define swap(a, b) ...
- 宏参数：
- ---
- 变参宏：args...
- 嵌套宏：

**一些符号**
- \：将多行宏连接成一行；
- #：把宏参数变成字符串；
- ##：将宏参数连接在一起；

**常见内置宏**
- \_\_DATE__
- \_\_TIME__
- \_\_FILE__
- \_\_LINE__
- \_\_func__

### MAX宏实现

注意事项：
- 最外层要带括号：防止优先级改变；
- 每个变量带括号：防止优先级改变；
- 预先获取值，防止函数调用多次；

```c
#include <stdio.h>

#define MAX(a, b) ({\
    __typedef(a) _a = (a);\
    __typedef(b) _b = (b);\
    _a > _b ? _a : _b;\
})

#define P(func) {\
    printf("%s = %d\n", #func, func);\
}

int main() {
    int a = 7;
    P(5 + MAX(2, 3));
    P(MAX(2, MAX(3, 4)));
    P(MAX(2, 3 > 4 ? 3 : 4));
    P(MAX(a++, 6));
    P(a);

    return 0;
}
```

将复合语句作为表达式的返回值：返回复合语句最后一条表达式的值。
- { __typeof(a++) _a = (a++); __typeof(6) _b = (6); _a > _b ? _a : _b;} 

扩展：表达式和语句是什么，它们的区别又是什么。


### 利用宏实现日志输出
```c
#include <stdio.h>
#ifdef DUBUG

#define log(frm, args...) {\
    printf("[%s : %s : %d] ", __FILE__, __func__, __LINE__);\
    printf(frm, ##args);\
    printf("\n");\
}

#else

#define log(frm, args...)

#endif

int main() {
    log("%d", b);
    log("hello world");
    return 0;
}
```

**其它**

当宏出现问题时：
- 使用 gcc -E main.c 来查看宏展开后的结果，进行分析；

条件编译：编译时设置宏定义
```
gcc -DDEBUG main2.c
```

### 字符串

第一点当然是作为字符串的结尾 '\0' 了，真是太好用了。
```c
//不怕访问越界
int n = strlen(s);
int cnt = 0;
for(int i = 0; i < n; ++i) {
    if(s[i] != s[i + 1]) {
        ++cnt;
    }
}

//索性连 strlen 都不要了
for(int i = 0; s[i]; ++i) {
    printf("%c", s[i]);
}
printf("\n");
```

字符串是一种特殊的字符数组，初始化方式：
```c
char str[] = "hello world";
char str[size + 1] = {'h', 'e', 'l', 'l', 'o', ' ', 'w', 'o' , 'r', 'l', 'd'};
```

**字符串函数**
- 头文件 string.h
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
//定义结构体
struct person {
	char name[20];
	int age;
	char gender;
	float height;
};

//同时重命名结构体
typedef struct person {
	char name[20];
	int age;
	char gender;
	float height;
} Person;

//声明结构体变量
struct person yu1;
Person yu2;

//结构体字段访问方式：直接引用 + 间接引用
yu1.height;
(&yu1)->height;
```

### 结构体内存对齐

**结构体内存对齐规则：**
- 第一个成员在结构体变量偏移量为 0 的地址处；
- 其他成员变量要对齐到 “对齐数” 的整数倍的地址处；
  - 对齐数 = 编译器默认的一个对齐数与该成员大小中的较小值（每个成员变量都有自己的对齐数）；
- 结构体总大小为最大对齐数的整数倍；
- 如果嵌套结构体，嵌套的结构体对齐到自己的最大对齐数的整数倍处，结构体的整体大小就是所有最大对齐数（包含嵌套结构体的对齐数）的整数倍。

**为什么存在内存对齐呢？**
- 平台原因（移植原因）：不是所有的硬件平台都能访问任意地址的任意数据的；某些平台只能在某些地址处取某些特定类型的数据；

- 性能原因：数据结构尤其是栈应该尽可能在自然边界上对齐。原因在于，为了访问未对齐的内存，处理器需要做两次访问内存;而对齐的内存访问仅需要一次访问；
- 缺点：无可厚非，这必然会存在效率问题，这是一种以空间换时间的做法，但这种做法是值得的；

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

结论：
- 结构体所占空间的大小不仅跟内存对齐有关，还跟其内字段的声明顺序有关；

**强制内存对齐：**
- #pragma pack(n)
- #pragma pack(push)
- #pragma pack(pop)
- #pragma pack()

**匿名结构体：**
- 声明完成之后立即使用，后面想再用也找不到；

```c
typedef struct Student {
    struct {
        char name[20];
        int age;
        char gender;
    } p;
    char school[100];
}Student；
```
**利用 NULL 实现结构体中变量地址偏移量计算**
```c
#define offset(T, a)  ((long)(&((T *)(NULL))->a))

typedef struct Data {
	int a;
	double b;
	char c;
};

int main() {
	printf("%ld\n", offset(struct Data, a));
	printf("%ld\n", offset(struct Data, b));
	printf("%ld\n", offset(struct Data, c));

	return 0;
}
```
### 公用体
```c
#include <stdio.h>

union IP {
    //IP表示形式：点分十进制
    struct {
        unsigned char a1;
        unsigned char a2;
        unsigned char a3;
        unsigned char a4;
    }ip;
    unsigned int num;
};

int is_little() {
    int num = 1;
    return (char *)(&num)[0];
}

int main() {
    printf("%s\n", is_little() ? "小端机" : "大端机");
    union IP p;
    char str[100] = {0};
    int arr[4];
    while(~scanf("%s", str)) {
        sscanf(str, "%d.%d.%d.%d", arr, arr + 1, arr + 2, arr + 3);
        p.ip.a1 = arr[3];
        p.ip.a2 = arr[2];
        p.ip.a3 = arr[1];
        p.ip.a4 = arr[0];
        printf("%u\n", p.num);
    }
    return 0;
}
```

**大/小端机器**
- 就是看低地址存的是数值的低位还是高位：存的低位，则为小端机器；存的高位，则为大端机器；
- 存储是以字节为单位的，无论大端还是小端，字节内都是高位在低地址；

```c
//数值 1 ：
//数值高位                  //数值低位
00000000 00000000 00000000 00000001

//大端机器
//地址低位                  //地址高位
00000000 00000000 00000000 00000001

//小端机器
//地址低位                  //地址高位
00000001 00000000 00000000 00000000
```

**扩展：**
- 本机字节序；
- 网络字节序；
## 2020-10-31
### define 和 typedef

- define: 无论是整个宏还是宏变量，都只是简单字符串的替换；
- typedef: 为类型取别名；

```c
#define ppchar char *
typedef char * pchar;

int main() {
	ppchar p1, p2;
	pchar p3, p4;
	printf("p1 = %lu, p2 = %lu\n", sizeof(p1), sizeof(p2)); //8, 1
	printf("p3 = %lu, p4 = %lu\n", sizeof(p3), sizeof(p4)); //8, 8

	return 0;
}
```
### main 函数得三种形式
三种形式：
```c
int main();

int main(int argc, char *argv[]);

int main(int argc, char *argv[], char **env);

```
- argc: 表明了 argv 中参数的个数，包括可执行文件程序名；
- argv: 程序被调用时，所使用的参数，可执行文件程序名为第一个参数；
- env: 程序的环境变量，但是没有标明它中到底包含多少个字符串，类似于字符串，其最后一个字符指针为 NULL;

输出调用参数及环境变量：
```c
void output(int argc, char *argv[], char **env) {
	printf("argc = %d\n", argc);
	for(int i = 0; i < argc; ++i) {
		printf("argv[%d] = %s\n", i, argv[i]);
	}
	for(int i = 0; env[i]; ++i) {
		printf("env[%d] = %s\n", i, env[i]);
	}
	//指纹验证
	for(int i = 0; env[i]; ++i) {
		if(!strncmp(env[i], "USER=", 5)) {
			if(!strncmp(env[i] + 5, "***")) {
				printf("welcome ***\n");
			} else {
				printf("gun\n");
			}
		}
	}
}
```
根据环境变量中信息实现指纹验证，只允许符合规则的用户使用程序

## 2020-11-3

### 头文件与源文件分离
常见错误：
- 函数未声明；
- 函数未定义；
- 重定义；
- 多重定义；

**函数的声明和定义**
- 函数允许声明多次，但只能定义一次；
- 函数未声明：发生在编译/汇编阶段；
- 函数未定义：发生在链接阶段；

**重定义 与 多重定义**
- 重定义：发生在 编译/汇编阶段，同一文件中，变量名和函数名冲突；
- 多重定义：发生在 链接阶段，多个文件中，变量名和函数名冲突；

**解决重复包含问题**
```c
#ifndef _head_h
#define _head_h

#endif
```
扩展：
- ld main.o；

### 工程开发规范
**#include <> 和 #include ""**
- #include "" 比 #include <> 多了一个从当前目录下查找；
- 附加包含目录： gcc -L./ main.cpp；

**目录：**
- include
- src
- lib
- bin

### 静态链接库
**打包命令：**
```
ar -r libhaizei.a header1.o header2.o header3.o
```

**使用静态链接库**
```
//附加包含库目录
//依赖库
gcc test.o -L./lib -lhaizei
```

### makefile文件
```
.PHONY: clean
all: lib/libhaizei.a test.o
    gcc test.o -L./lib -lhaizei
test.o: test.cpp
    gcc -I./include -c test.cpp
clean:
    rm -rf a.out test.o
```

### 工程实践

- __attribute__((constructor))：使得函数在main函数之前执行；

## 2020-11-5
### 谷歌测试框架
**下载编译GoogleTest**
- git clone https://hub.fastgit.org/google/googletest：下载速度更快；
- cd googletest；
- cmake；
- make；
- 拷贝 include 和 lib 文件夹（cp -r include ../../）

**使用GoogleTest**
```c
#include <stdio.h>
#include <gtest/gtest.h>

int add(int a, int b) {
    return a + b;
}

TEST(testfunc, add) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 3);
    EXPECT_EQ(add(0, 1), 1);
}

TEST(testfunc, add) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 4);
    EXPECT_EQ(add(0, 1), 1);
}

int main(int argc, char *argv[]) {
    testing::InitGoogleTest(&argc, argv);
    return RUN_ALL_TESTS();
}
//编译
//gcc main.cpp -L./lib .I./include -lgtest
```

### 简版GoogleTest实现
**\_\_attribute\_\_((constructor))**

```c
//main.cpp
#include <stdio.h>
#include "haizei/test.h"

int add(int a, int b) {
    return a + b;
}

TEST(testfunc, add) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_EQ(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 3);
    EXPECT_EQ(add(0, 1), 1);
}

TEST(testfunc, add1) {
    EXPECT_EQ(add(2, 0), 2);
    EXPECT_EQ(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 4);
    EXPECT_EQ(add(0, 1), 1);
}

TEST(testfunc, add2) {
    EXPECT_EQ(add(0, 1), 1);
    EXPECT_EQ(add(-1, -3), 4);
    EXPECT_EQ(add(0, -3), 3);
    EXPECT_EQ(add(-1, 1), 0);
}

int main() {
    return RUN_ALL_TESTS();
}

//test.h
#ifndef _TEST_H
#define _TEST_H

#define TEST(a, b)\
__attribute__((constructor))\
void a##_##b()

#define EXPECT_EQ(a, b) printf("%s = %s ? %s\n", #a, #b, (a) == (b) ? "True" : "False");

int RUN_ALL_TESTS();
#endif
```

**通过 RUN_ALL_TESTS 控制测试用例是否执行**
```c
//test.h
#ifndef _TEST_H
#define _TEST_H

#define TEST(a, b)\
void a##_##b();\
__attribute__((constructor))\
void add##_##b##_() {\
    add_function(a##_##b, #a "_" #b);\
}\
void a##_##b()

#define EXPECT_EQ(a, b) printf("%s = %s ? %s\n", #a, #b, (a) == (b) ? "True" : "False");

typedef void (*TestFuncT)();

typedef struct Function {
    TestFuncT func;
    const char *str;
}Function;
int RUN_ALL_TESTS();
void add_function(TestFuncT, const char *);

//test.cc
#include <string.h>
#include <haizei/test.h>
#include <stdio.h>

int func_cnt = 0;
Function func_arr[100];

int RUN_ALL_TESTS() {
    for(int i = 0; i < func_cnt; ++i) {
        printf("RUN TEST : %s\n", func_arr[i].str);
        func_arr[i].func();
        printf("RUN END\n");
    }
    return 0;
}

void add_function(TestFuncT func, const char *str) {
    func_arr[func_cnt].func = func;
    func_arr[func_cnt].str = strdup(str);
    func_cnt++;
}
```

**颜色渲染**
```c
//test.h
#ifndef _TEST_H
#define _TEST_H

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)
#define RED(a) COLOR(a, 31)
#define BLUE(a) COLOR(a, 34)
#define YELLOW(a) COLOR(a, 33)

#define TEST(a, b)\
void a##_##b();\
__attribute__((constructor))\
void add##_##b##_() {\
    add_function(a##_##b, #a "." #b);\
}\
void a##_##b()

#define EXPECT(a, b, comp) {\
    printf(GREEN("[-----------] "));\
    printf("%s %s %s %s\n", #a, #comp, #b, (a) comp (b) ? GREEN("True") : RED("False"));\
}

#define EXPECT_EQ(a, b) EXPECT(a, b, ==)
#define EXPECT_NE(a, b) EXPECT(a, b, !=)
#define EXPECT_LT(a, b) EXPECT(a, b, <)
#define EXPECT_LE(a, b) EXPECT(a, b, <=)
#define EXPECT_GT(a, b) EXPECT(a, b, >)
#define EXPECT_GE(a, b) EXPECT(a, b, >=)

typedef void (*TestFuncT)();

typedef struct Function {
    TestFuncT func;
    const char *str;
}Function;
int RUN_ALL_TESTS();
void add_function(TestFuncT, const char *);

//test.cc
#include <string.h>
#include <haizei/test.h>
#include <stdio.h>

int func_cnt = 0;
Function func_arr[100];

int RUN_ALL_TESTS() {
    for(int i = 0; i < func_cnt; ++i) {
        printf("RUN TEST : %s\n", func_arr[i].str);
        func_arr[i].func();
        printf("[====END====]\n");
    }
    return 0;
}

void add_function(TestFuncT func, const char *str) {
    func_arr[func_cnt].func = func;
    func_arr[func_cnt].str = strdup(str);
    func_cnt++;
}

//main.cpp
#include <stdio.h>
#include "haizei/test.h"

int add(int a, int b) {
    return a + b;
}

TEST(testfunc, add) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_NE(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 3);
    EXPECT_EQ(add(0, 1), 1);
}

TEST(testfunc, add1) {
    EXPECT_EQ(add(2, 0), 2);
    EXPECT_GE(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 4);
    EXPECT_GT(add(0, 1), 1);
}

TEST(testfunc, add2) {
    EXPECT_EQ(add(0, 1), 1);
    EXPECT_LE(add(-1, -3), 4);
    EXPECT_LT(add(0, -3), 3);
    EXPECT_EQ(add(-1, 1), 0);
}

int main() {
    return RUN_ALL_TESTS();
}
```

**正确率统计**
```c
//test.h
#ifndef _TEST_H
#define _TEST_H

#define COLOR(a, b) "\033[" #b "m" a "\033[0m"
#define GREEN(a) COLOR(a, 32)
#define RED(a) COLOR(a, 31)
#define BLUE(a) COLOR(a, 34)
#define YELLOW(a) COLOR(a, 33)

#define TEST(a, b)\
void a##_##b();\
__attribute__((constructor))\
void add##_##b##_() {\
    add_function(a##_##b, #a "." #b);\
}\
void a##_##b()

#define EXPECT(a, b, comp) {\
    printf(GREEN("[-----------] "));\
    haizei_test_info.total += 1;\
    if(a comp b) haizei_test_info.success += 1;\
    printf("%s %s %s %s\n", #a, #comp, #b, (a) comp (b) ? GREEN("True") : RED("False"));\
}

#define EXPECT_EQ(a, b) EXPECT(a, b, ==)
#define EXPECT_NE(a, b) EXPECT(a, b, !=)
#define EXPECT_LT(a, b) EXPECT(a, b, <)
#define EXPECT_LE(a, b) EXPECT(a, b, <=)
#define EXPECT_GT(a, b) EXPECT(a, b, >)
#define EXPECT_GE(a, b) EXPECT(a, b, >=)

typedef void (*TestFuncT)();

typedef struct Function {
    TestFuncT func;
    const char *str;
}Function;
extern struct FunctionInfo haizei_test_info;
struct FunctionInfo{
    int total, success;
};

int RUN_ALL_TESTS();
void add_function(TestFuncT, const char *);

//test.cc
#include <string.h>
#include <haizei/test.h>
#include <stdio.h>

int func_cnt = 0;
Function func_arr[100];
struct FunctionInfo haizei_test_info;

int RUN_ALL_TESTS() {
    for(int i = 0; i < func_cnt; ++i) {
        printf("[=====RUN====] ", func_arr[i].str);
        haizei_test_info.total = 0, haizei_test_info.success = 0;
        func_arr[i].func();
        printf("[====END====]" "total : %d  success: %d\n",haizei_test_info.total
        haizei_test_info.success);
    }
    return 0;
}

void add_function(TestFuncT func, const char *str) {
    func_arr[func_cnt].func = func;
    func_arr[func_cnt].str = strdup(str);
    func_cnt++;
}

//main.cpp
#include <stdio.h>
#include "haizei/test.h"

int add(int a, int b) {
    return a + b;
}

TEST(testfunc, add) {
    EXPECT_EQ(add(2, 3), 5);
    EXPECT_NE(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 3);
    EXPECT_EQ(add(0, 1), 1);
}

TEST(testfunc, add1) {
    EXPECT_EQ(add(2, 0), 2);
    EXPECT_GE(add(1, 3), 4);
    EXPECT_EQ(add(2, 2), 4);
    EXPECT_GT(add(0, 1), 1);
}

TEST(testfunc, add2) {
    EXPECT_EQ(add(0, 1), 1);
    EXPECT_LE(add(-1, -3), 4);
    EXPECT_LT(add(0, -3), 3);
    EXPECT_EQ(add(-1, 1), 0);
}

int main() {
    return RUN_ALL_TESTS();
}
```
## 2020-11-7
### 泛型宏
```c
#define Type(a) _Generic((a),\
    int: "%d",\
    long long: "%ld",\
    float: "%f",\
    double: "%lf",\
    char *: "%s",\
    const char *: "%s"\
)
```

## 2020-11-10

## 2020-11-12


## 2020-11-17

### 动态空间申请
- calloc
- malloc
- realloc

## 2020-11-17
```c
/*************************************************************************
    > File Name: main1.c
    > Author: pk
    > Mail: lupengkunmc@gmail.com 
    > Created Time: 2020年11月19日 星期四 19时48分16秒
 ************************************************************************/
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct Node {
    int data;
    struct Node *lchild, *rchild;
} Node;

typedef struct Tree {
    Node *root;
    int n;
}Tree;

Node *getNewNode(int val) {
    Node *p = (Node *)malloc(sizeof(Node));
    p->data = val;
    p->lchild = p->rchild = NULL;
    return p;
}

Tree *getNewTree() {
    Tree *tree = (Tree *)malloc(sizeof(Tree));
    tree->root = NULL;
    tree->n = 0;
    return tree;
}
void clearNode(Node *node) {

    if(node == NULL) return;
    clearNode(node->lchild);
    clearNode(node->rchild);
    free(node);
    return;
}

void clear(Tree *tree) {
    if(tree == NULL) return;
    clearNode(tree->root);
    free(tree);
    return;
}

Node *insert_node(Node *root, int val, int *flag) {
    if(root == NULL)  {
        *flag = 1;
        return getNewNode(val);
    }
    if(root->data == val) return root;
    if(val < root->data) root->lchild = insert_node(root->lchild, val, flag);
    else root->rchild = insert_node(root->rchild, val, flag);
    return root;
}

void insert(Tree *tree, int val) {
    int flag = 0;
    tree->root = insert_node(tree->root, val, &flag);
    tree->n += flag;
    return;
}

void pre_order_node(Node *node) {

    if(node == NULL) return;
    printf("%d ", node->data);
    pre_order_node(node->lchild);
    pre_order_node(node->rchild);
    return;
}

void pre_order(Tree *tree) {
    if(tree == NULL) {
        return;
    }
    printf("pre_order: ");
    pre_order_node(tree->root);
    printf("\n");
    return;

}

void in_order_node(Node *node) {
    if(node == NULL) return;
    in_order_node(node->lchild);
    printf("%d ", node->data);
    in_order_node(node->rchild);
    return;
}

void in_order(Tree *tree) {
    if(tree == NULL) {
        return;
    }
    printf("in_order: ");
    in_order_node(tree->root);
    printf("\n");
    return;

}

void post_order_node(Node *node) {
    if(node == NULL) return;
    post_order_node(node->lchild);
    post_order_node(node->rchild);
    printf("% d", node->data);
    return;
}

void post_order(Tree *tree) {
    if(tree == NULL) {
        return;
    }
    printf("in_order: ");
    post_order_node(tree->root);
    printf("\n");
    return;

}

void output_node(Node *root) {
    if(root == NULL) return;
    printf("%d", root->data);
    if(root->lchild == NULL && root->rchild == NULL) return;
    printf("(");
    output_node(root->lchild);
    printf(",");
    output_node(root->rchild);
    printf(")");
    return;
}

void output(Tree *tree) {
    if(tree == NULL) return;
    printf("tree(%d):", tree->n);
    output_node(tree->root);
    printf("\n");
    return;
}

int main() {
    srand(time(0));
    Tree *tree = getNewTree();
    #define max_op 10
    for(int i = 0; i < max_op; ++i) {
        int val = rand() % 100;
        insert(tree, val);
        output(tree);
    }
    pre_order(tree);
    in_order(tree);
    post_order(tree);
    #undef max_op
    clear(tree);
    return 0;
}
```

### 根据广义表够造二叉树
```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Node {
    char data;
    struct Node *lchild, *rchild;
}Node;

typedef struct Tree {
    Node *root;
    int n;
} Tree;

typedef struct Stack {
    Node **data;
    int top, size;
} Stack;

Node *getNewNode(char val) {
    Node *p = (Node *)malloc(sizeof(Node));
    p->data = val;
    p->lchild = p->rchild = NULL;
    return p;
}

Tree *getNewTree() {
    Tree *tree = (Tree *)malloc(sizeof(Tree));
    tree->root = NULL;
    tree->n = 0;
    return tree;
}

Stack *init_stack(int n) {
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->data = (Node **)malloc(n * sizeof(Node *));
    s->top = -1;
    s->size = n;
    return s;
}

Node *top(Stack *s) {
    return s->data[s->top];
}

int empty(Stack *s) {
    return s->top == -1;
}

int push(Stack *s, Node *val) {
    if(s == NULL) return 0;
    if(s->top == s->size - 1) return 0;
    s->data[++(s->top)] = val;
    return 1;
}

int pop(Stack *s) {
    if(s == NULL) return 0;
    if(empty(s)) return 0;
    --(s->top);
    return 1;
}

void clear_stack(Stack *s) {
    
}

void clear_node(Node *node) {
    if(node == NULL) return;
    clear_node(node->lchild);
    clear_node(node->rchild);
    free(node);
    return;
}

void clear_tree(Tree *tree) {
    if(tree == NULL) return;
    clear_node(tree->root);
    free(tree);
    return;
}

Node *build(const char *str, int *node_num) {
    Stack *s = init_stack(strlen(str));
    int flag = 0;
    Node *temp = NULL, *p = NULL;
    while(str[0]) {
        switch (str[0]) {
            case '(': {
                push(s, temp);
                flag = 0;
            } break;
            case ')': {
                p = top(s);
                pop(s);
            } break;
            case ',': {
                flag = 1;
            } break;
            case ' ': {
                break;
            }
            default: {
                temp = getNewNode(str[0]);
                if(!empty(s) && flag == 0) {
                    top(s)->lchild = temp;
                } else if(!empty(s) && flag == 1){
                    top(s)->rchild = temp;
                }
                ++(*node_num);
            }
        }
        ++str;
    }
    clear_stack(s);
    if(temp && !p) p = temp;
    return p;
}

void pre_order_node(Node *root) {
    if(root == NULL) return;
    printf("%c ", root->data);
    pre_order_node(root->lchild);
    pre_order_node(root->rchild);
    return;
}

void pre_order(Tree *tree) {
    if(tree == NULL) return;
    printf("pre_order : ");
    pre_order_node(tree->root);
    printf("\n");
    return;
}
void in_order_node(Node *root) {
    if(root == NULL) return;
    in_order_node(root->lchild);
    printf("%c ", root->data);
    in_order_node(root->rchild);
    return;
}

void in_order(Tree *tree) {
    if(tree == NULL) return;
    printf("pre_order : ");
    in_order_node(tree->root);
    printf("\n");
    return;
}
void post_order_node(Node *root) {
    if(root == NULL) return;
    post_order_node(root->lchild);
    post_order_node(root->rchild);
    printf("%c ", root->data);
    return;
}

void post_order(Tree *tree) {
    if(tree == NULL) return;
    printf("pre_order : ");
    post_order_node(tree->root);
    printf("\n");
    return;
}
int main() {
    char str[1000] = {0};
    scanf("%[^\n]s", str);
    Tree *tree = getNewTree();
    int node_num = 0;
    tree->root = build(str, &node_num);
    tree->n = node_num;
    pre_order(tree);
    in_order(tree);
    post_order(tree);    
    
    return 0;
}
```
