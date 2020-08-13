---
title: hexo部署到Github
date: 2019-12-04 14:20:32
categories:
- [Tool, Hexo]
tags:
- Hexo
---
“测试三连”我们已经知道是什么了，那“部署三连”又是什么呢？
<!-- more -->
当个人博客搭建的差不多了的时候，就可以将它部署到github page上，其它人就可以通过“用户名.github.io”的方式来访问我们的个人博客了。那么，如何部署呢，往下看。

## 1 新建仓库
仓库名必须为：用户名.github.io
## 2 添加SSH key
具体步骤参考[本篇](https://portgas-d-asce.com/2019/12/18/Github%E6%B7%BB%E5%8A%A0SSH-key/)博文
## 2 安装hexo-deployer-git
[hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
```
npm install hexo-deployer-git --save
```
## 3 配置_config.yml
```
# Deployment
deploy:
  type: 'git'
  branch: master
  repository: 
    github: git@github.com:Portgas-D-Asce/Portgas-D-Asce.github.io.git
```
## 4 部署到github
执行“部署三连”即可将本地仓库内容push到github page
```
hexo clean
hexo g
hexo d
```
## 5 访问
登录 **用户名.github.io** 即可看到所搭建的博客。
