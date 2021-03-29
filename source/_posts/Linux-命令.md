---
title: Linux 命令
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - Linux Command
date: 2021-03-19 13:00:17
---
只对命令有大致了解，具体使用查找 man 手册 或 tldr 手册。
<!--more-->
## uptime
查看系统运行情况
```bash
uptime

# 当前时间      运行时长  用户个数  负载情况       1min  5min  15min
# 13:14:20 up 27 min,  1 user,  load average: 0.29, 0.28, 0.22
```

## free
查看内存使用情况
```bash
free
#           total       used        free         shared     buffer/cache   available
#               总计         已用        空闲         共享     缓冲/缓存           可用
# 内存：     8069860     1915776     4395660      144864     1758424        5732184
# 交换：     2097148           0     2097148

# used = total - free - buffer/cache
# 内存使用率 = 1 - available / total
```

