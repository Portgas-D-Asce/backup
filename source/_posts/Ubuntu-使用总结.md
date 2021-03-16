---
title: Ubuntu 使用总结
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - Ubuntu
date: 2021-03-04 22:40:05
---

<!--more-->

## 笔记本合盖子后不休眠
```bash
sudo vim /etc/systemd/logind.conf

# 找到 
# HandleLidSwitch=suspend
# 修改为
HandleLidSwitch=ignore

sudo reboot
```

## 软件更新相关
```bash
# 换源
sudo gedit /etc/apt/sources.list

# 只检查，不更新（已安装的软件包是否有可用的更新，给出汇总报告）
sudo apt update

# 查看可升级的软件信息
sudo apt list --upgradable 

# 更新已安装的软件包
sudo apt upgrade
```
