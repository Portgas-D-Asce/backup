---
title: Vim 使用总结
author: Portgas·D·Asce
categories:
  - [Tools & Skills]
tags:
  - Vim 
date: 2021-01-09 23:10:52
---


- dd: 剪切光标所在行；
- yy: 复制光标所在行；
  - nyy：从光标所在行开始复制 n 行内容；
- p: 将剪切/复制内容粘贴到光标所在行的下面；

> 按列插入/删除

按列插入：ctrl + v：进入可视块模式，选中多行，shift + i 进入插入模式，输入字符，esc即可发现添加完成

按列删除：ctrl + v: 进入可视块模式，选中多行，x即可删除