---
title: Linux-文件IO
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - 高级Linux
date: 2021-03-04 22:24:28
---

<!--more-->

IO 有两种：非缓冲IO 和 缓冲IO

非缓冲IO：
- 指的是每个 read write 都调用内核种的一个系统调用；
- 它是 POSIX.1 和 SUS 标准的组成部分 但 不是 ISO C 的组成部分；

## 非缓冲IO
非缓冲IO涉及的函数主要有5个：open、read、write、lseek、close。
### 文件描述符（file discriptor）
- 对内核而言，所有打开的文件都通过文件描述符引用。
- 文件描述符是一个非负整数。
- 当打开一个现有文件或创建一个新文件时，内核向进程返回一个文件描述符。

> 特殊的文件描述符
- 文件描述符 0 和进程的标准输入关联；
- 文件描述符 1 和进程的标准输出关联；
- 文件描述符 2 和进程的标准错误关联；

> 文件描述符上限
一个进程所允许打开文件的个数是有限的，通过以下命令查看上限
```bash
ulimit -a

# -n: file descriptors                8192
```

### 文件偏移量（file offset）
光标距离文件开头的字节数。

### open
> 函数原型
```cpp
#include <fcntl.h>

//flag 位掩码
int open(const char *pathname, int flags);

//若 flags 指定了 O_CREAT 则需要传入 mode ，通常为 0666
//否则，mode 无效
int open(const char *pathname, int flags, mode_t mode);
```
返回值：
- 成功：返回当前进程第一个（从小到大）没有被使用的文件描述符；
- 失败：返回 -1；

常见 flag：
- 访问模式: O_RDONLY, O_WRONLY, RDWR 必须三选一：
  - O_RDONLY: 以只读方式打开文件；
  - O_WRONLY: 以只写方式打开文件；
  - O_RDWR: 以可读可写方式打开； 
- O_CREAT: 如果文件不存在，则自动新建文件；
- O_DIREC: 直接 IO；
- O_NONBLOCK: 非阻塞 IO， 
- O_TMPFILE: 创建临时文件；

### read
> 函数原型
```cpp
#include <unistd.h>
ssize_t read(int fd, void *buf, size_t count);
```
返回值：
- 成功， 则返回读入字节的个数， 返回 0 表明读到文件末尾了；
- 失败， 则返回 -1；

### write
> 函数原型
```cpp
#include <unistd.h>

ssize_t write(int fd, const void *buf, size_t count);
```
返回值：
- 成功， 则返回写入字节的个数；
- 失败， 则返回 -1；

### close
> 函数原型
```cpp
#include <unistd.h>

int close(int fd);
```

返回值：
- 成功， 则返回 0；
- 失败， 则返回 -1；

### 示例代码

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>
#include <unistd.h>

int main() {
	int fd1 = -1;
    //有 O_CREAT, 一定要添加权限啊
	if((fd1 = open("./input", O_RDWR | O_CREAT, 0666)) == -1) {
		perror("open input error");
	    exit(1);
	}

    int fd2 = -1;
    if((fd2 = open("./output", O_RDWR | O_CREAT, 0666)) == -1) {
		perror("open output error");
		close(fd1);
	    exit(1);
	}
	
	char buf[512];
	int cnt = -1;
	while((cnt = read(fd1, buf,  512)) > 0) {
       if((cnt = write(fd2, buf, cnt)) == -1) {
           break;
       }
	}
	if(cnt == -1) {
		perror("read/write error");
		close(fd1);
        close(fd2);
		exit(2);
	}
	//在不出错的情况下，总是以读到 0 个字节结束
	printf("%d\n", cnt);
	close(fd1);
    close(fd2);
	return 0;
}
```
### lseek
> 函数原型
```cpp
#include <unistd.h>

off_t lseek(int fd, off_t offset, int whence);
```
whence：
- SEEK_SET: 将文件得偏移量设置为距文件开始处 offset 个字节处；
- SEEK_CUR: 将文件的偏移量设置为其当前值加 offset， offset 可正可负0；
- SEEK_END: 将文件偏移量设置到文件长度加 offset， offset 可正可负可为0；

示例：
```cpp
//确定当前文件偏移量
off_t pos = lseek(fd, 0, SEEK_CUR);

//确定文件大小
off_t size = lseek(fd, 0, SEEK_CUR);

//判断文件是否可以设置偏移量
// lseek == -1 + errno == ESPIPE
```
返回值：
- 成功：返回新的文件偏移量；
- 失败：返回 -1；

### fctl 函数
操作操控文件描述符
```cpp
int make_nonblock(int fd) {
	int flag = fcntl(fd, F_GETFL);
	if(flag < 0) {
		return -1;
	}

	flag |= O_NONBLOCK;

	flag = fcntl(fd, F_SETFL, flag);
	return flag;
}

int make_block(int fd) {
	int flag = fcntl(fd, F_GETFL);
	if(flag < 0) {
		return -1;
	}

	flag &= ~O_NONBLOCK;

	flag = fcntl(fd, F_SETFL, flag);
	return flag;
}


int main() {
    int age = 0;
    make_nonblock(0);
    sleep(5);
    int ret = scanf("%d", &age);
    printf("xxx is %d years old! <%d>\n", age, ret);
    perror("scanf");
    return 0;
}
```

## 缓冲IO/标准IO

### 流



### fopen
```cpp
#include <stdio.h>

FILE *fopen(const char *pathname, const char *mode);

FILE *fdopen(int fd, const char *mode);

FILE *freopen(const char *pathname, const char *mode, FILE *stream);
```
mode
- r：以只读方式打开文件，流指向文件开头；
- r+：以可读可写方式打开文件， 流指向文件开头；
- w：以只写方式打开文件，若文件不存在则新建，一开始清除文件内容，流指向文件开头；
- w+：以可读可写方式打开文件，若文件不存在则新建，一开始清除文件内容，流指向文件开头；
- a：以追加方式打开文件，若文件不存在则新建，流指向文件末尾；
- a+：以追加方式打开文件，若文件不存在则新建，读取流指向文件开头，写入流指向文件末尾；
- b: 打开二进制文件；

返回值：
- 成功：返回 FILE* 指针；
- 失败：返回 NULL，并且 errno被设置；

### fread/fwrite
> 函数原型
```cpp
#include <stdio.h>

//读 nmemb 次， 每次 size 字节
size_t fread(void *ptr, size_t size, size_t nmemb, FILE *stream);

// 写 nmemb 次， 每次 size 字节
size_t fwrite(const void *ptr, size_t size, size_t nmemb,
                     FILE *stream);
```

返回值：
- 一般情况下：nmemb，即成功读取/写入了这么多次；
- 特殊情况下：返回成功读取/写入的次数 < nmemb, 可能原因是 出错了 也可能是到达文件末尾了；
- fread 对于出错和到达文件末尾不做区分，必须使用 feof 和 ferror 来判断发生的情况属于哪种类型；

### fclose
```cpp
#include <stdio.h>
//同 /n 一样会刷新流的缓冲区，并且关闭打开的流（文件描述符）
//释放 不合理的/已经释放过的 流，属于未定义行为
int fclose(FILE *stream);
```
返回值：
- 成功： 返回 0；
- 失败： 返回 EOF，失败原因在 errno 中；

### fflush
> 函数原型
```cpp
#include <stdio.h>

//强制刷新缓冲区
int fflush(FILE *stream);
```


### 示例代码

```cpp
#include <stdio.h>

int main() {
    FILE *fp  = NULL;
    if((fp = fopen("./input", "r")) == NULL) {
        perror("read error");
        exit(1);
    }
    return 0;
}
```

## 目录

### opendir

### readdir

### closedir

## 获取文件/目录状态

###

### 

### 


## 练习 实现 “ls -al”

## 阻塞/非阻塞
缓冲/非缓冲：针对内核的；
阻塞/非阻塞：针对用户态的；

想干某件事，但当前情况干不了
阻塞：等着，等天时地利齐了，干完这件事后再开始后面的任务
非阻塞：不等，直接开始后面的任务；

write：将数据交给内核，内核取完成真正的写操作；将数据交给内核后等还是不等呢？
- 阻塞：等内核返回，然后再进行下面的写操作；
- 非阻塞：交完任务就走人，接着进行下一；

## IO多路复用
IO多路复用：1个你处理多个事情。
### select/pselect
> 函数原型

```cpp
#include <sys/select.h>

       /* According to earlier standards */
       #include <sys/time.h>
       #include <sys/types.h>
       #include <unistd.h>

       int select(int nfds, fd_set *readfds, fd_set *writefds,
                  fd_set *exceptfds, struct timeval *timeout);

       void FD_CLR(int fd, fd_set *set);
       int  FD_ISSET(int fd, fd_set *set);
       void FD_SET(int fd, fd_set *set);
       void FD_ZERO(fd_set *set);

       #include <sys/select.h>

       int pselect(int nfds, fd_set *readfds, fd_set *writefds,
                   fd_set *exceptfds, const struct timespec *timeout,
                   const sigset_t *sigmask);


int
main(void)
{
    fd_set rfds;
    struct timeval tv;
    int retval;

    /* Watch stdin (fd 0) to see when it has input. */

    FD_ZERO(&rfds);
    FD_SET(0, &rfds);

    /* Wait up to five seconds. */

    tv.tv_sec = 5;
    tv.tv_usec = 0;

    retval = select(1, &rfds, NULL, NULL, &tv);
    /* Don't rely on the value of tv now! */

    if (retval == -1)
        perror("select()");
    else if (retval)
        printf("Data is available now.\n");
        /* FD_ISSET(0, &rfds) will be true. */
    else
        printf("No data within five seconds.\n");

    exit(EXIT_SUCCESS);
}
```

### poll/ppoll

### epoll 
