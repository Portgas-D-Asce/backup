---
title: hexo添加看板娘
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-14 13:41:41
---

好多博客都有一只看板娘，每次看到都能闻到满屏幕的二次元死肥宅气息，哈哈。虽不是死肥宅，奈何却是一个重度中二病患者啊：能不能把我的艾斯，二柱子什么的放上去...
<!-- more -->

## 1 看板娘模型有哪些
去[这里](https://huaji8.top/post/live2d-plugin-2.0/)预览看板娘模型
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
## 3 怎么没看到你的看板娘
没有添加看板娘主要原因：
- 没看到合适的模型（后面有时间，抽空看看怎么搞自己的模型，可以参考下面文献）；

## 4 参考文献
[给博客添加能动的看板娘(Live2D)-关于模型的二三事](https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-01/)
