---
title: Linux命令
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2020-11-12 23:22:55
---

<!--more-->

## man
```
//遇到不懂的命令man一下，查看帮助
man 命令

//--help也可达到类似效果，例如
ls --help
```


## ls

ls（list files）：列出当前目录下的所有文件和子目录

使用：
```
ls [参数] [路径]
```

常用参数：
- a: 显示所有文件及目录 (. 开头的隐藏文件也会列出)
- l: 除文件名称外，亦将文件型态、权限、拥有者、文件大小等资讯详细列出
- r: 将文件以相反次序显示(原定依英文字母次序)
- t: 将文件依建立时间之先后次序列出
- A: 同 -a ，但不列出 "." (目前目录) 及 ".." (父目录)
- F: 在列出的文件名称后加一符号；例如可执行档则加 "*", 目录则加 "/"
- R: 若目录下有文件，则以下之文件亦皆依序列出

其它：
- ll 是 ls -l 的快捷方式；
- [ll查询结果解读](https://blog.csdn.net/u012060033/article/details/88044472)



