---
title: '安利一款英文文献阅读神器:StarDict'
tags:
  - Ubuntu
categories:
  - - OS
    - Ubuntu
date: 2020-03-10 16:37:07
---


还在为读英文论文、看英文帮助文档而头疼吗？有了这款神器，将大幅提高你的英文文献阅读效率，值得拥有。

<!--more-->

## 1 前言
一直为读英文论文、看一些第三方库的帮助文档感到头疼。
- 之前：发现有不认识  -->  复制粘贴到百度翻译、Google翻译等地方  --> 查看翻译结果；随然可行，但效率一直比较低；
- 前几天，偶然间发现了StarDict（星际译王）这款小软件，用了下，效果还不错：真的是哪里不会点哪里 : )

Ps：
- StarDict是跨平台的，Windows、Linux上都可以用；
- StarDict不仅限于支持英文、中文，还支持日文、俄文等其它语言；

## 2 安装
### 2.1 StarDict安装
```
sudo apt-install stardict
```
### 2.2 词库下载及安装

词库下载地址：[ http://download.huzheng.org/]( http://download.huzheng.org/)，看英文文献大多数人下的都是朗道：
- 在列表中找到“简体中文”并进入；
- 下载“朗道英汉词典”和“朗道汉英词典”；

下载不了的话，[百度云](https://pan.baidu.com/s/14NAvZxC9XLVg3JlWN8Z_AA)（提取码: bq31）有下载好的朗道词典。

词库安装：
- 将下载好的“朗道英汉词典”和“朗道汉英词典”，解压缩到“/usr/share/stardict/dic”目录下即可；

```
tar -xjvf stardict-langdao-ce-gb-2.4.2.tar.bz2
sudo mv stardict-langdao-ce-gb-2.4.2 /usr/share/stardict/dic
tar -xjvf stardict-langdao-ec-gb-2.4.2.tar.bz2
sudo mv stardict-langdao-ec-gb-2.4.2 /usr/share/stardict/dic
```
## 3 使用
### 3.1 运行StarDict
运行之后，不要关闭，最小化即可。
{% asset_img 1.png%}
### 3.2 效果
打开要阅读的英文网页或PDF，选中不认识的单词后，即可看到翻译结果。
{% asset_img 2.png%}
{% asset_img 3.png%}
