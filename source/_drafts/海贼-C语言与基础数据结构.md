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
1、终端命令： 输出重定向
```bash
./a.out > result.txt
```

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



