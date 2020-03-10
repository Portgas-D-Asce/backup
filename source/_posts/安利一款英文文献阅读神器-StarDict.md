---
title: '安利一款英文文献阅读神器:StarDict'
tags:
  - Ubuntu
categories:
  - - OS
    - Ubuntu
date: 2020-03-10 16:37:07
---


读英文论文、看英文帮助文档时真的是头疼啊，前两天看到了一款神器：StarDict，真的是救星啊，这里安利一波。

<!--more-->

## 1 前言
之前看英文文献：
- 发现新单词  -->  复制粘贴到百度翻译、Google翻译等地方  --> 查看翻译结果；

用StarDict看英文文献：
- 哪里不会点哪里 : )

## 2 安装
### 2.1 StarDict安装
```
sudo apt-install stardict
```
### 2.2 词库下载及安装

词库下载[ http://download.huzheng.org/]( http://download.huzheng.org/)（本文下载的是朗道）：
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
打开要阅读的英文网页或PDF，选中新单词后，即可看到翻译结果。
{% asset_img 2.png%}
{% asset_img 3.png%}
