---
title: hexo添加评论系统
date: 2019-12-17 20:07:57
categories:
- [Tool, Hexo]
tags:
- Hexo
---
评论系统算是博文中一个重要模块，是必须必要添加的。

<!-- more -->

## 1 评论系统有哪些
早期的多说、网易云跟帖，都是非常好的评论系统，但服务已关闭，目前无法使用；
目前新的评论系统也有很多
### 1.1 github系列
#### 1.1.1 gitment
[gitment](https://github.com/imsun/gitment)
基于Github Issues，支持Markdown（**不再更新**）。
{% asset_img 1.png %}

#### 1.1.2 gitalk（推荐）
[gitalk](https://github.com/gitalk/gitalk)
基于Github Issues，支持Markdown
{% asset_img 2.png %}

### 1.2 valine
[valine](https://valine.js.org/)
基于LeanCloud，安全、快速、无后端实现、支持Emoji、支持Markdown
{% asset_img 3.png %}

### 1.3 livere
[livere](https://livere.com/)
韩国，功能全面，可以先体验下
{% asset_img 4.png %}

### 1.4 Hypercomments
[Hypercomments](https://www.hypercomments.com/)
俄罗斯，需要翻墙
### 1.5 其它
友言、畅言等

## 2 选择
用得比较多的有：gitalk，valine，本人基于Hexo + Github搭建个人博客，一是图管理起来方便，二是，比较喜欢gitalk的风格，最终选择了gitalk。
## 3 Gitalk
在使用gitalk之前要先做两项准备工作
- 在Github中，新建OAuth Apps
- 在Github中，新建一个仓库用于保存评论
### 3.1 新建OAuth Apps
在路径“settings->Developer settings->OAuth Apps”下新建一个app
- Application name：不重要，随便填就行
- Homepage URL：如果绑定了域名，填写绑定域名即可，如果没有绑定域名，按https://portgas-d-asce.github.io/格式填写就行
- Application description：随便填就行
- Authorization callback URL：与Homepage URL保持一致即可
{% asset_img 5.png %}
后面要用到的两个东西：
- Client ID
- Client Secret
{% asset_img 6.png %}
### 3.2 新建仓库
建议直接使用“用户名.github.io”那个仓库，当然要新建一个仓库也是没问题的。

### 3.3 使用
配置文件_config.yml添加如下内容
```
#　Gitalk
gitalk:
  enable: true #用来做启用判断可以不用
  owner: Portgas-D-Asce #Github 用户名,
  repo: comments #储存评论issue的github仓库名
  admin: Portgas-D-Asce #Github 用户名
  clientID: ********* #Github Application clientID
  clientSecret: ******* #Github Application clientSecret
```
为页面添加模块
```
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.css">
<div id="comments"></div>
<script src="https://cdn.jsdelivr.net/npm/gitalk@1/dist/gitalk.min.js"></script>
  
<script type="text/javascript">
  //必须对pathname加密
　//不能对href加密，不知道为什么，href会变导致加密结果不一致
  const gitalk = new Gitalk({
    clientID: '<%- config.gitalk.clientID %>',
    clientSecret: '<%- config.gitalk.clientSecret %>',
    id: md5(location.pathname),
    repo: '<%- config.gitalk.repo %>',
    owner: '<%- config.gitalk.owner %>',
    admin: ['<%- config.gitalk.admin %>']
  });
  gitalk.render('comments');
</script>
```
### 3.4 效果图
首次进入页面会是如下效果
{%asset_img 7.png%}
登陆后效果
{%asset_img 8.png%}

## 4 问题
配置Gitalk真的是踩了好多坑
### 4.1 Error:Not found / error=redirect_uri_mismatch
本质就是重定向错误，产生的原因有两个
- _config.yml中参数错误，拼写错误等细节问题；
- https 和 http问题，的的域名不支持https，就用http，否则用https就行；

### 4.2 Error: Validation Failed
有两个可能的原因：
- _config.yml配置中id的长度超过50：这个id将来要作为Issue的label使用
    - 最好的解决方案就是使用md5，但需注意使用的事location.pathname，而不是location.href，后者会导致每次加密结果都不同；
- page页面title标签为空：title标签内容将作为Issue的标题使用，title为空，当然无法建立新的Issue（我就是在这个坑里爬了老半天）

### 4.3 其它
- 如果使用了md5，出现的问题跟不支持中文路径，需要编码什么的没有关系


