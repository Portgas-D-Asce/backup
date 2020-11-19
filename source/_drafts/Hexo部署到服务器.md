---
title: Hexo部署到服务器
author: Portgas·D·Asce
categories:
  - [Hexo]
tags:
  - Hexo
date: 2020-11-19 23:26:28
---

<!--more-->

关于 Hexo 部署，本人经历了以下 3 个过程：
- Hexo + Github Page: 访问速度特别慢，不推荐；
- Hexo + Github Page 和 Hexo + Coding 双线部署: 还是慢，不推荐；
- Hexo + 阿里云 ECS 服务器: 访问速度很快（服务器双11买的，一年不到100大洋），推荐；

本文就来详细介绍一下 如何将 Hexo 部署到阿里云 ECS 服务器。

## 1 服务器配置
### 1.1 新建用户

### 1.2 配置 SSH

## 2 配置 nginx

### 2.1 安装 nginx
```
sudo apt install nginx

//检查是否安装成功
nginx -v
```
### 2.2 修改 nginx 配置
```
cd /etc/nginx/sites-available
sudo cp default default.bak
sudo vim default

//将文件中以下内容修改为我们所创建的网站根目录
root /var/www/blog;
```
### 2.3 启动 nginx
```
//启动
systemctl start nginx

//设置开机自动启动
systemctl enable nginx

//查看运行状态
systemctl status nginx

//显示 running 表示运行成功。
```

### 2.4 配置安全组
服务器的 nginx 是已经启动了，但是目前还无法通过浏览器访问，需要对服务器的安全组进行配置。


配置好之后，可以在地址栏输入服务器 ip 则可访问到服务器网站，大概长下面这个样子：

{% asset_img x.png %}

## 3 创建网站根目录

## 4 创建 git 仓库
### 4.1 初始化 git 仓库

### 4.2 配置 Git Hooks
```
cd /home/git/blog.git/hooks //切换到 hooks 目录下

touch post-receive //创建文件
```
将以下内容复制到 post-receive 文件中
```
#!/bin/bash
echo "post-receive hook is running..."

GIT_REPO=/home/git/blog.git
TMP_GIT_CLONE=/tmp/blog
PUBLIC_WWW=/var/www/blog

rm -rf ${TMP_GIT_CLONE}
git clone $GIT_REPO $TMP_GIT_CLONE
rm -rf ${PUBLIC_WWW}/*
cp -rf ${TMP_GIT_CLONE}/* ${PUBLIC_WWW}
```

赋予可执行权限
```
chmod +x post-receive
```

## 5 配置 Hexo
打开博客配置文件 _config.yml 对 deploy相关信息进行修改，模板如下：
```
# Deployment
deploy:
  type: 'git'
  repository: 
    #devil随便起；xx表示用户名；192.168.0.1表示服务器ip；blog.git表示创建的 git 仓库；
    devil: xx@192.168.0.1:/~/blog.git
  branch: master
```
生成静态页面
```
hexo g
```
将生成的静态页面推送到服务器
```
hexo d

//此时会报没有权限，为网站根目录添加可写权限即可
```

## 6 访问
浏览器地址栏输入服务器 ip 即可看到我们所搭建的网站了

## 7 绑定域名
域名可以去阿里云购买，购买完成之后，域名解析为服务器 ip 即可。

在短暂的几分钟里，是可以通过绑定的域名访问到博客的，但是，过一回就不行了，这是因为没有备案。

## 8 备案
