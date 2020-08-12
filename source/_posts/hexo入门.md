---
title: hexo入门
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-01 13:38:13
---

麻雀虽小，五脏俱全，一周时间，完成了个人博客的雏形，添加了一些想要的模块，细节性的东西后面慢慢添加，慢慢调整，这里记录自己使用Hexo的一些入门心得。

<!-- more -->

## 1 Hexo资料都有哪些
资料算是挺多的：
- [官网](https://hexo.io/)，
    - [文档](https://hexo.io/zh-cn/docs/index.html)虽然不怎么好，但是用还是可以用的；
    - [主题](https://hexo.io/themes/)，包含很多主题模型，可以下载下来参考别人是如何实现的；
- 博客，很多人都搭建了自己个人博客，而且记录了很多心得，多查查，基本上所有问题都有解决办法；

## 2 安装Hexo
[官网文档](https://hexo.io/zh-cn/docs/index.html)有详细步骤：
- 安装node.js；
- 安装git
- 安装hexo

## 3 建站三步走
建站三步走：
- 新建文件夹，并cd到该文件夹下；
- 执行hexo init 命令；
- 执行npm install 命令；
```
mkdir blog
cd blog
hexo init
npm install
```
Ps：站点目录里面的东西先暂不介绍，先走流程，看效果。

## 4 测试三连
测试三连
- hexo clean
- hexo generate（可简写为hexo g）
- hexo server（可简写为hexo s）

```
hexo clean
hexo g
hexo s
```
输入上面测试三连之后，站点服务就已经启动了，在浏览器中访问"http://localhost:4000"，即可看到效果（landscape主题）。
- 对了，还有一个命令"ctrl + c"，是停止服务命令，而不是复制命令。

## 5 结束语
本文中，我们安装了hexo，并对hexo搭建的个人博客有了一个直观的体验，在阅读下一篇博文前，建议先快速过一遍官网帮助文档。
