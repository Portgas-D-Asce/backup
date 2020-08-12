---
title: hexo添加不蒜子
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-07 13:40:55
---
评论有“多说”，计数有“不蒜”！多说已关闭，不蒜子还活着，这是程序员对程序员的承诺。
<!-- more -->
## 1 官网
[不蒜子](http://ibruce.info/2015/04/04/busuanzi/)
## 2 使用
### 2.1 引入js文件
```
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
```
### 2.2 显式站点访问总量

将下列代码添加到想要添加的地方即可（一般为footer模块）
```
<span id="busuanzi_container_site_pv">
    总访问量: <span id="busuanzi_value_site_pv"></span> 次
</span>
| 
<span id="busuanzi_container_site_uv">
    总访客数: <span id="busuanzi_value_site_uv"></span> 人
</span>
```
### 2.3 显式单页面访问量

将下列内容添加到需要统计的页面即可
```
<div id="busuanzi_container_page_pv">
    阅读量：<span id="busuanzi_value_page_pv"></span>
</div>
```

## 3 效果图
{% asset_img 1.png %}

{% asset_img 2.png %}