---
title: Ubuntu20.04 + VsCode + Python3开发环境搭建
categories:
  - []
tags:
  - python入门
date: 2020-06-28 11:14:26
---

<!--more-->

## 1 声明
电脑配置情况如下：
- Ubuntu版本：20.04，内置Python2和Python3；
- VsCode已提前安装；

## 2 安装Python插件
打开VsCode，搜索Python，并安装如下插件：

## 3 新建工程
在桌面新建test文件夹，并用VsCode打开该工作空间

在工作空间下建立test.py文件，其中代码如下：
```
print("Hello World!")
```
## 4 安装pylint
到目前为之，工程是建好了，但VsCode会提示以下错误，要求我们安装pylint：
```
Linter pylint is not installed.
```
直接点击install，是不行的，会出现以下错误：
```
There is no Pip installer available in the selected environment.
```
为了安装pylint需要先安装pip，在终端中使用以下命令安装pip：
```
sudo apt-get install python3-pip
```
再使用以下命令安装pylint
```
pip3 install pylint
```

## 5 运行工程
点击右上角绿色运行按钮，得到以下输出：
```
pk@pk:~/Desktop/test$ /usr/bin/python3 /home/pk/Desktop/test/test.py
Hello World!
```