---
title: hexo备份
date: 2019-12-05 14:22:10
categories:
- [Tool, Hexo]
tags:
- Hexo
---
天有不测风云，人有旦夕祸福，做好备份，无需多言。
<!-- more -->

## 1 要备份的内容有哪些
其实要备份的主要有两大块内容：
- ××.github.io仓库中存储的是生成的静态文件，没必要备份；
- 为了有更好的展示效果，经常需要对主题做一些小的修改，这时就需要对主题进行备份；
- 博客源文件（.md）当然也需要备份，辛辛苦苦码起来的，丢失了多不好；

## 2 使用hexo-git-backup备份
[hexo-git-backup](https://github.com/coneycode/hexo-git-backup)
### 2.1 安装
```
if your hexo version is 2.x.x, you should install as follow:
$ npm install hexo-git-backup@0.0.91 --save

if version is 3.x.x, you should install as follow:
$ npm install hexo-git-backup --save
```

### 3.1 配置_config.yml
在已经配置好SSH的前提下，进行如下配置
```
#　Backup
backup:
  type: git
  theme: devil #要备份的主题
  message: backup
  repository: #可以备份到多个仓库
    github: git@github.com:Portgas-D-Asce/backup.git
```
### 3.2 配置.gitignore
站点工程下有一个.gitignore的隐藏文件，可以在其中添加无需备份的文件夹和文件，如：
```
db.json
node_modules/
public/
```
### 3.3 备份四连
配置好了之后，每次更新都用备份三连备份一下
```
hexo clean
hexo g
hexo d
hexo b
```