---
title: Ubuntu安装NVIDIA显卡驱动
categories:
  - []
tags:
  - Ubuntu
date: 2020-06-27 20:51:31
---

<!--more-->

## 1 前言
目前，在Ubuntu上安装NVIDIA显卡驱动主要有三种方法：
- 使用Ubuntu仓库进行自动化安装；
- 使用PPA仓库进行自动化安装；
- 使用官方的NVIDIA驱动进行手动安装；

在安装NVIDIA显卡驱动前需要先禁用Nouveau驱动。

## 2 禁用Nouveau驱动


### 2.1 临时禁用
### 2.2 永久禁用

## 3 安装NVIDIA显卡驱动
### 3.1 使用Ubuntu仓库进行自动化安装（推荐）
**1、检测NVIDIA显卡型号和推荐显卡驱动**

在终端中输入如下命令：
```
ubuntu-drivers devices
```
结果如下：
```
pk@pk:~$ ubuntu-drivers devices
== /sys/devices/pci0000:00/0000:00:01.0/0000:01:00.0 ==
modalias : pci:v000010DEd00001C8Csv00001D05sd0000102Ebc03sc00i00
vendor   : NVIDIA Corporation
model    : GP107M [GeForce GTX 1050 Ti Mobile]
driver   : nvidia-driver-440 - distro non-free recommended
driver   : nvidia-driver-390 - distro non-free
driver   : nvidia-driver-435 - distro non-free
driver   : xserver-xorg-video-nouveau - distro free builtin
```
结果表明：
- 电脑NVIDIA显卡驱动型号为 GeForce GTX 1050 Ti；
- 支持NVIDIA显卡驱动版本有：nvidia-driver-390、nvidia-driver-435、nvidia-driver-440，其中nvidia-driver-440为推荐安装版本；

**2、安装NVIDIA显卡驱动**
可以使用以下命令安装推荐版本的显卡驱动
```
sudo ubuntu-drivers autoinstall
```
若需要安装其它版本的显卡驱动，可以使用以下命令（这里以nvidia-driver-435为例）
```
sudo apt-get install nvidia-driver-435
```

### 3.2 使用PPA仓库进行自动化安装

### 3.3 使用官方的NVIDIA驱动进行手动安装

## 4 测试NVIDIA驱动是否安装成功
可以使用以下命令来测试NVIDIA显卡驱动是否安装成功：
```
nvidia-smi
```
当出现如下结果，则表明安装成功：
```
pk@pk:~$ nvidia-smi
Sat Jun 27 21:03:13 2020       
+-----------------------------------------------------------------------------+
| NVIDIA-SMI 440.100      Driver Version: 440.100      CUDA Version: 10.2     |
|-------------------------------+----------------------+----------------------+
| GPU  Name        Persistence-M| Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp  Perf  Pwr:Usage/Cap|         Memory-Usage | GPU-Util  Compute M. |
|===============================+======================+======================|
|   0  GeForce GTX 105...  Off  | 00000000:01:00.0 Off |                  N/A |
| N/A   51C    P0    N/A /  N/A |    562MiB /  4040MiB |      1%      Default |
+-------------------------------+----------------------+----------------------+
                                                                               
+-----------------------------------------------------------------------------+
| Processes:                                                       GPU Memory |
|  GPU       PID   Type   Process name                             Usage      |
|=============================================================================|
|    0      1117      G   /usr/lib/xorg/Xorg                            45MiB |
|    0      1774      G   /usr/lib/xorg/Xorg                           168MiB |
|    0      2005      G   /usr/bin/gnome-shell                         166MiB |
|    0      4613      G   ...AAAAAAAAAAAACAAAAAAAAAA= --shared-files    84MiB |
|    0      8956      G   ...quest-channel-token=9396428612317232094    86MiB |
+-----------------------------------------------------------------------------+
```
## 参考
[https://www.linuxidc.com/Linux/2019-02/157170.htm](https://www.linuxidc.com/Linux/2019-02/157170.htm)