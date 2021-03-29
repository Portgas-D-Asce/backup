---
title: Linux 文件
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - [Linux File]
date: 2021-03-19 12:59:55
---

## /etc/fstab
> 文件内容
```bash
# <file system> <mount point>   <type>  <options>       <dump>  <pass>
# 文件系统 挂载点 文件系统类型 选项 ... ...
UUID=2aa27c83-6800-49ed-acf0-37971aff6b50 /               ext4    errors=remount-ro 0       1
# /boot/efi was on /dev/nvme0n1p1 during installation
UUID=CFB7-DD48  /boot/efi       vfat    umask=0077      0       1
/swapfile                                 none            swap    sw              0       0
```
> 开机挂载

在该文件下新增行相关行，即可开机启动。
```bash
# 查看磁盘分区 文件系统 挂载点
df -h

# 查看文件系统类型
sudo parted -l

# 挂载
/dev/sda1 /media/user/dir ntfs default 0 0



```