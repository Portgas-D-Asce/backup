---
title: Ubuntu系统安装
tags:
---
# 1 安装
## 1.1 用软碟通制作u盘启动盘
## 1.2 系统安装
1、选择安装ubantu（不要点回车）；
2、然后点e编辑，倒数第二行+ nomodeset；
3、alt + f7可以移动屏幕
# 2 安装n卡驱动
## 2.1 禁用nouveau
## 2.2 使用PPA仓库进行自动安装
1、添加源，并更新
```
$ sudo add-apt-repository ppa:graphics-drivers/ppa
$ sudo apt update
```
2、查看推荐安装驱动
```
$ ubuntu-drivers devices
== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
modalias : pci:v000010DEd00001C8Csv00001D05sd0000102Ebc03sc00i00
vendor   : NVIDIA Corporation
model    : GP107M [GeForce GTX 1050 Ti Mobile]
driver   : nvidia-driver-410 - third-party free
driver   : nvidia-driver-430 - third-party free recommended
driver   : nvidia-driver-390 - third-party free
driver   : nvidia-driver-415 - third-party free
driver   : xserver-xorg-video-nouveau - distro free builtin
```

3、安装驱动
```
//安装有recommended（推荐）的那个就行
$ sudo apt install nvidia-driver-430
```
4、重启
如果显卡不是n卡，找到下面位置切换下
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190808043321279.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MzA5OTgx,size_16,color_FFFFFF,t_70)
# 4 个性化设置
## 4.1 自定义壁纸、锁屏
1、以超级管理员身份打开文件夹
```
$ sudo nautilus
```
2、进入背景图片所在的地方
```
usr/share/backgrounds/
```
3、把系统的图片全部删除了
4、把自己喜欢的图片复制进去,并最好按照1，2，3，4这样的顺序命名下（后面方便）
5、在 usr/share/ 目录下搜索 wallpapers，找到bionic-wallpapers.xml，并对其进行修改
原始是：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190808045720827.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MzA5OTgx,size_16,color_FFFFFF,t_70)
修改后：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190808045924425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzI0MzA5OTgx,size_16,color_FFFFFF,t_70)
6、在设置中选则壁纸和锁屏

壁纸效果：

锁屏效果：


## 4.2 接着你会发下解锁画面很难看，能不能自定义下呢？可以的
1、找到/etc/alternatives/gdm3.css 这个文件
2、在该文件下搜索 lockDialogGroup 
```
#找到默认的这个部分
#lockDialogGroup {
  background: #2c001e url(resource:///org/gnome/shell/theme/noise-texture.png);
  background-repeat: repeat; 
}
#改为
#lockDialogGroup {
  background: #2c001e url(file:///usr/share/backgrounds/mybackground.jpg);         
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center; 
}
```
3、重启
