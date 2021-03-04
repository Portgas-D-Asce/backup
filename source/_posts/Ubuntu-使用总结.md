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