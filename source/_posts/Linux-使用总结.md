---
title: Linux 使用总结
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2021-03-15 18:33:10
---

## 拷贝文件到远程服务器
```bash
# 拷贝一个或多个文件
scp x.c x.cpp user@xxx.xxx.xxx.xxx:~/test

# 拷贝文件夹
scp -r ./linux user@xxx.xxx.xxx.xxx:~./
```

## 将远程服务器文件夹挂载在本地
```bash
# 文件存储在服务器上（取消挂载后，本地没有任何文件）
# 挂载
sshfc user@xxx.xxx.xxx.xxx:./xxx ./xxx

# 取消挂载
umount ./xxx
```