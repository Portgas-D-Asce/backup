---
title: mmap（建立内存映射）
categories:
  - []
tags:
  - null
date: 2020-07-16 18:41:54
---

<!--more-->
## 简介
mmap用来将一个文件内容映射到内存中，加快文件的访问。

## 1 mmap
### 1.1 头文件
```
#include <unistd.h>
#include <sys/mman.h>
```
### 1.2 函数原型
```
void* mmap(void* start, size_t length, int prot, int flags, int fd, off_t offset);
```
start：映射区的开始地址，通常设置为 NULL，表示由系统决定映射区的起始地址。

length：映射区的长度，以字节为单位，不足一内存页按一内存页处理。

prot：映射内存区域保护标志，不能与文件的打开模式冲突。是以下的某个值，可以通过or运算合理地组合在一起：
- PROT_EXEC 映射区域可被执行
- PROT_READ 映射区域可被读取
- PROT_WRITE 映射区域可被写入
- PROT_NONE 映射区域不可存取

flags：指定映射对象的属性，它的值可以是一个或者多个以下位的组合体
- MAP_FIXED 如果参数start所指的地址无法建立映射时，则放弃映射，不对地址进行修正。通常不建议使用；
- MAP_SHARED 对映射区域的写入数据会复制回文件，而且允许其它映射该文件的进程共享。
- MAP_PRIVATE 内存区域的写入不会影响到原文件。
- MAP_LOCKED 锁定映射区的页面，从而防止页面被交换出内存。
- MAP_ANONYMOUS 匿名映射，映射区不与任何文件关联，而且映射区域无法和其它进程共享；

fd：有效的文件描述词。一般是由open()函数返回，其值也可以设置为-1，此时需要指定flags参数中的MAP_ANONYMOUS,表明进行的是匿名映射。

offset：表示映射文件的偏移量，通常设置为 0，表示从映射文件最前方开始映射。

返回值：若映射成功则返回映射区的内存起始地址，否则返回 MAP_FAILED(-1)，错误原因存储于errno中：
- EBADF：参数fd不是有效的文件描述词；
- EACCES：存取权限错误。如果是 MAP_PRIVATE 情况下文件必须可读；如果是 MAP_SHARED 则要有 PROT_WRITE 以及该文件要能写入；
- EINVAL：参数start、length、offset有一个不合法；
- EAGAIN：文件被锁住，或是太多内存被锁住；
- ENOMEM：内存不足；

## 2 使用
使用 mmap 一般包括以下几个步骤：
- open打开映射文件，得到文件描述词 fd；
- 获取映射文件大小；
- 建立内存映射；
- 进行相关读写操作；
- 关闭内存映射；
- close关闭映射文件；

以下为一个用 mmap 实现文件拷贝的例子：
```
#include <unistd.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <stdio.h>
#include <string.h>
#include <errno.h>

int main()
{
    char input[] = "./src.txt";
    char output[] = "./des.txt";
    int src_fd, dst_fd;
    if ((src_fd = open(input, O_RDONLY)) < 0)
    {
        printf("src open failed!\n");
        return 1;
    }
    if ((dst_fd = open(output, O_RDWR | O_CREAT, S_IRWXU)) < 0)
    {
        printf("file2 open failed! \n");
        return 1;
    }

    //获取映射文件大小
    int src_len = lseek(src_fd, 0, SEEK_END);

    //设置输出文件大小，必须要有
    truncate(output, src_len);

    //建立内存映射
    void *src_ptr = mmap(NULL, src_len, PROT_READ, MAP_PRIVATE, src_fd, 0);
    void *dst_ptr = mmap(NULL, src_len, PROT_READ | PROT_WRITE, MAP_SHARED, dst_fd, 0);
    if (src_ptr == MAP_FAILED || dst_ptr == MAP_FAILED)
    {
        printf("mmap error:%s\n", strerror(errno));
        return 1;
    }
    //拷贝文件
    memcpy(dst_ptr, src_ptr, src_len);

    //关闭内存映射
    munmap(src_ptr, src_len);
    munmap(dst_ptr, src_len);

    //关闭映射文件
    close(src_fd);
    close(dst_fd);
    return 0;
}
```
ps：另外一种获取映射文件大小的方法
```
//头文件
#include <sys/stat.h>

struct stat stat;
//获取文件信息
fstat(src_fd, &stat);
//获取文件大小
int len = stat.st_size;
```