---
title: Github添加SSH key
date: 2019-12-18 19:57:55
categories:
- [Tool, Github]
tags:
- Github
---
为了将本地仓库内容push到github仓库上，添加SSH key是必不可少的一步（当然，采用http方式可以不用添加）。
<!-- more -->
## 1 SSH是什么
SSH（安全外壳协议）是Secure Shell的缩写，它由IETF小组所制定。SSH为建立在应用层基础上的安全协议，专为远程登录会话和其他网络服务提供安全协议。
## 2 Http和SSH区别是什么
```
https://github.com/Portgas-D-Asce/Portgas-D-Asce.github.io.git
git@github.com:Portgas-D-Asce/Portgas-D-Asce.github.io.git
```
- 使用Http：无需提前配置，但每次访问需要输入用户名和密码才能登录；
- 使用SSH：一次配置永久使用，无需输入用户名和密码，更为安全；

## 3 生成SSH秘钥对
大多数Git服务器都会选择使用SSH公钥来进行授权，系统中每个用户都必须提供一个公钥用于授权，如果没有的话需要生成一个。密钥对默认存储在主目录/.ssh文件夹下，执行以下命令
```
cd .ssh
ls
```
如果出现sth sth.pub来命名的一对文件（sth通常是id_dsa / id_rsa）
- 则表明已经存在秘钥对了，其中sth为私钥，sth.pub为公钥

如果没有出现，则表明不存在密钥对，需要执行以下命令生成
```
ssh-keygen -t rsa

Ps：ssh-keygen  选项：
-b：指定密钥长度；
-e：读取openssh的私钥或者公钥文件；
-C：添加注释；
-f：指定用来保存密钥的文件名；
-i：读取未加密的ssh-v2兼容的私钥/公钥文件，然后在标准输出设备上显示openssh兼容的私钥/公钥；
-l：显示公钥文件的指纹数据；
-N：提供一个新密语；
-P：提供（旧）密语；
-q：静默模式；
-t：指定要创建的密钥类型。
```
## 4 Github配置SSH key

- 执行cat id_rsa.pub命令获取公钥；
- 复制SSH公钥；
- 在Github“setting/SSH and GPG keys”路径下，New SSH key，并将公钥拷贝进去即可；

