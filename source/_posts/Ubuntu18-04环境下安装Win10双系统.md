---
title: Ubuntu18.04环境下安装Win10双系统
tags:
  - Ubuntu
  - Windows
categories:
  - - OS
    - Ubuntu
date: 2020-03-10 18:55:16
---


本文仅对安装Ubuntu + Win双系统（先Ubuntu后Win）步骤进行梳理，并不具体介绍如何单独安装Ubuntu 和 Win系统。
<!--more-->

## 1 前言
为什么要装Ubuntu + Win双系统？
- 有时候需要在Win环境下工作，有时候又要在Linux环境下工作，两台电脑一个装Win一个装Ubuntu有点夸张，装个Ubuntu + Win双系统，用哪个启动哪个就行了，很方便；

双磁盘该怎么装Win + Ubuntu双系统？
- 单磁盘双系统：Ubuntu和Win装在同一个磁盘中；
- 双磁盘双系统：Ubuntu和Win装在不同的磁盘中；
- 如果有SSD且空间足够，直接采用单磁盘双系统，且将Ubuntu和Windows都装在SSD中；

## 2 准备工作
- Ubuntu启动盘（软碟通，Ubuntu18.04）
- Win启动盘（大白菜，Win10）

## 3 安装
### 3.1 安装Ubuntu
正常安装就行，没什么特别要求。如果没有GParted，安装一下。

### 3.2 安装Win
**1、使用GParted压缩一个新卷**
- 如果是双磁盘双系统的话，直接用GParted直接在磁盘（非Ubuntu系统的那个磁盘）压缩出一个新卷（ntfs格式），大小100G（看个人情况修改）；
- 如果是单磁盘双系统的话，系统盘处于挂载状态，且无法被卸载，导致无法压缩出一个新卷；解决办法：用Ubuntu启动盘进入试用Ubuntu，然后用GParted在系统盘中压缩出一个新卷（ntfs格式）；

**2、安装Win**
- 在压缩的新卷中正常安装Win即可；
- 无论是双磁盘还是单磁盘，Win引导盘必须和Ubuntu引导盘保持一致（**关键一步，一定要注意！！！**）；
{% asset_img 1.bmp %}
  
**3、安装成功了吗？**
- 当然没有，win安装完成后，Ubuntu引导被损坏，导致无法再进入Ubuntu系统；
- 但不要担心，修复一下引导即可，接着往下看；

### 3.3 Ubuntu引导修复
**1、用ubuntu启动盘开机，选择试用Try ubuntu without install**

**2、打开终端输入如下命令**
```
# sudo add-apt-repository ppa:yannubuntu/boot-repair
# sudo apt-get update
# sudo apt-get install boot-repair
# sudo boot-repair
```
**3、稍等一会出来一个弹窗，点击recommand repair，等待修复完成即可**
{% asset_img 2.png %}

## 4 最终效果
之后每次开机，都会进入如下界面：
- Ubuntu：进入Ubuntu系统
- Windows Boot Manager：进入win系统

{% asset_img 3.jpg %}
