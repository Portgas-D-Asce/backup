---
title: C语言
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-02-01 20:05:49
---

<!--more-->


## 1 简单使用
四个函数：
- $open$: 打开文件；
- $read$: 读取文件；
- $write$: 写入文件；
- $close$: 关闭文件；

## 1.1 读文件 
```cpp
#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    int fd = open("./1.txt", O_CREAT | O_RDONLY);
    //int fd2 = open("./2.txt", O_CREAT | O_WRONLY);
    char buffer[512];
    int cnt = 0;
    while((cnt = read(fd, buffer, sizeof(buffer))) > 0) {
        printf("%d\n", cnt);
    }
    printf("%d\n", cnt);
    printf("%d\n", fd);
    close(fd);
    return 0;
}
```
一般流程是下面这个样子：
- 第一次读 512 字节内容，返回 512；
- 第二次读 512 字节内容，返回 512；
- ...
- 第 $n - 1$ 次读 512 字节内容，返回 512；
- 第 $n$ 次读发现只剩 369 字节内容，读取剩下内容，返回 369；
- 第 $n + 1$ 次读，发现已经到文件末尾了，返回 0（因此在读文件不出错的情况下，$cnt$ 最后总等于 0）；

小结：
- $open$: 

## 1.2 写文件
```cpp
#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    int fd1 = open("./1.txt", O_CREAT | O_RDONLY);
    int fd2 = open("./2.txt", O_CREAT | O_WRONLY);
    char buffer[512];
    int cnt = 0;
    while((cnt = read(fd1, buffer, sizeof(buffer))) > 0) {
        cnt = write(fd2, buffer, cnt);
        printf("%d\n", cnt);
    }
    close(fd1);
    close(fd2);
    return 0;
}
```

## 2 深入理解

### 2.1 open 函数
函数原型:
```cpp
#include <sys/stat.h>
#include <fcntl.h>

int open(const char *pathname, int flags);
int open(const char *pathname, int flags, mode_t mode);
```
返回值：
- 失败：返回 -1；
- 成功：返回一个新的文件描述符（进程中第一个没有被占用的非负整数，一般是从 3 开始，0 表示标准输入，1 表示标准输出，2 表示标准错误输出）；

注意：一个进程所能打开的文件个数是有上限的，可以通过以下命令查看：
```bash
ulimit -a
```

## 2.2 read 函数
函数原型：
```cpp
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
```
返回值：
- 失败：返回 -1；
- 成功：返回读入内容的字节数；

### 2.3 write 函数
函数原型：
```cpp
#include <unistd.h>
ssize_t write(int fd, const void *buf, size_t count);
```
返回值：
- 失败：返回 -1；
- 成功：返回写入字节的个数；