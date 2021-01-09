---
title: Vim复制内容到系统剪切板
author: Portgas·D·Asce
categories:
  - [Tools & Skills]
tags:
  - Vim
date: 2020-11-19 22:38:49
---

<!--more-->

## 1 配置
**查看是否支持 clipboard**
```
vim --version | grep clipboard
```
结果如下：
{%asset_img 1.png%}

如果是 -clipboard 则表明不支持，应重新安装 vim ：
```
sudo apt install vim-gtk
```
## 2 使用
- 不会有提示信息
  - "+yy ： 复制一行内容；
  - "+nyy : 复制 n 行内容；
- 复制成功会有提示：18 lines yanked into "+：
  - "+yG : 复制光标所在行到文件末尾的所有内容；
  - {visual}"+y : 复制选中内容；

## 参考
[Vim操作](https://github.com/ruanyf/articles/blob/master/dev/vim/operation.md)