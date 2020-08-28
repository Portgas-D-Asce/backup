---
title: hexo添加音乐播放器
author: Portgas·D·Asce
categories:
  - [Hexo]
tags:
  - Hexo
date: 2019-12-14 13:41:17
---

使用 APlayer + MetingJS（非 hexo-tag-aplayer）为页面添加音乐播放器。

<!-- more -->

## 1 外链播放器
### 1.1 网易云外链播放器
这里并不用网易云外链播放器，所以不打算细说。页面放一个网易云音乐播放器，这要怎么放啊？主要有以下两步：
- 获取某一首歌/歌单的网易云外链;
- 将得到的ifream标签嵌入到页面模块，就可以在页面上看到一个音乐播放器了

使用网易云音乐播放器的问题：
- 绝大部分歌曲都涉及版权，很多外链是拿不到的;
- 外链播放器是一个iframe，意味着，它的样式你是无法控制的（比方说，它播放器的阴影效果确实不错，但是跟我的其它模块很不搭，我想去掉，可以吗？不行的！）出于这个原因，我放弃了网易云外链播放器;

效果图：
{% asset_img 1.png %}
### 1.2 Aplayer
APlayer 也是一款不错的外链播放器，尤其是在支持了 MetingJS 后，变得更加强大，可以对QQ音乐、网易云音乐、虾米、酷狗、百度等平台的音乐进行播放
- 可以播放大部分歌曲;
- 传回的并非iframe，而是一个文档片段（segment），可以对样式进行自定义;


这太合胃口了，ok，就它了。
## 2 使用
hexo 很多人添加音乐播放器用的是 [hexo-tag-aplayer](https://github.com/MoePlayer/hexo-tag-aplayer/blob/master/docs/README-zh_cn.md) 插件，实际上完全没有必要，直接用 [APlayer + MetingJS](https://github.com/metowolf/MetingJS)就可以了。下面以添加网易云歌单为例。

### 2.1 获取网易云音乐外链歌单id
插入的播放器需要用到这个歌单id，歌单中内容更新，外链播放器也会同步更新（真的是好方便啊）
### 2.2 插入播放器模块
```
<div id="bgm">
  <h3>Music</h3>
  <hr>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.css">
  <script src="https://cdn.jsdelivr.net/npm/aplayer/dist/APlayer.min.js"></script>
  <!-- require MetingJS -->
  <script src="https://cdn.jsdelivr.net/npm/meting@2/dist/Meting.min.js"></script>

  <meting-js
    server="netease"
    type="playlist"
    id="3119003139">
  </meting-js>
</div>
```
## 3 效果图
就是右边那个音乐播放器 ：）
