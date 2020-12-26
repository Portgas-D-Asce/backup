---
title: Hexo添加看板娘
author: Portgas·D·Asce
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-14 13:41:41
---

添加个看板娘？？抱歉，不可能，我不是死肥宅！不过艾斯，二柱子什么的倒是可以 &#x1f920; &#x1f920;

<!-- more -->

## 1 有哪些看板娘模型
[预览看板娘模型](https://huaji8.top/post/live2d-plugin-2.0/)

## 2 如何添加看板娘
### 2.1 安装live2d
live2d(https://github.com/EYHN/hexo-helper-live2d)
```
npm install --save hexo-helper-live2d
```
### 2.2 模型下载及安装
- 可以到[这里](https://github.com/xiazeyu/live2d-widget-models)去下载看板娘模型
- 将下载好的模型放到路径“node_modules/live2d-widget”下

### 2.3 配置站点_config.yml文件
```
live2d:
  enable: true
  model:
    use: live2d-widget-model-epsilon2_1  #模板
  display:
    position: right
    width: 150 
    height: 300
  mobile:
    show: false  #是否在手机进行显示
```

##  参考
[给博客添加能动的看板娘(Live2D)-关于模型的二三事](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-01/)
