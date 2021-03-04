---
title: Linux-文件IO
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-03-04 22:24:28
---

<!--more-->

IO 有两种：非缓冲IO 和 缓冲IO

非缓冲IO：
- 指的是每个 read write 都调用内核种的一个系统调用；
- 它是 POSIX.1 和 SUS 标准的组成部分 但 不是 ISO C 的组成部分；

## 非缓冲IO
非缓冲IO涉及的函数主要有5个：open、read、write、lseek、close。

### open
