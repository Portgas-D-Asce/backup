---
title: hexo绑定域名
author: Portgas·D·Asce
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-06 13:43:00
---

有些人绑定域名是因为后面的github.io看起来不舒服，我倒是没有想那么多，只是单纯的试试。
<!-- more -->
## 1 购买域名
可以去阿里云、腾讯云这些地方去购买域名。
## 2 实名认证
必须要实名认证，否则绑定是无效的。
## 3 解析域名
添加两条解析记录：
- 第一条
    - 记录类型：A
    - 主机记录：@
    - 记录值：在终端ping一下自己的“用户名.github.io”所得到的ip
    - 解析路线和TTL：默认就行
- 第二条
    - 记录类型：CNAME
    - 主机记录：www
    - 记录值：用户名.github.io
    - 解析路线和TTL：默认就行

## 4 配置CNAME
有两步：
- 在站点目录下source目录下添加CNAME文件（没有后缀），并将申请的域名填写进去（eg. portgas-d-asce.com）
- 执行“部署三连”：hexo clean、hexo g、hexo d

## 5 访问
直接在浏览器中访问申请的域名，若正常打开，则说明域名绑定成功了。
