---
title: Ubuntu常用命令大全
categories:
  - [OS, Ubuntu]
tags:
  - Ubuntu
---

本文将对Ubuntu中常用的命令进行介绍。

<!-- more -->
1. 切换到指定目录（cd）
```
cd ../
cd test
```
2. 移动文件/文件夹到指定目录（mv）
```
mv 1.txt test/newdir
mv dir test/newdir
```
3. 删除当前目录下的所有文件（rm）
```
rm -rf *
```
4. 创建新的文件夹（mkdir）
```
mkdir tesk
```
5. 创建新文件（touch）
```
touch 1.txt
```
6. 列出当前目录下所有文件及文件夹，并显式详细信息（ls）
```
ls -ll
```
7. 软件卸载
```
dpkg --list
sudo apt-get --purge remove 要卸载软件名称（--purge：删除配置文件）
```



