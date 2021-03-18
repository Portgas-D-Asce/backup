---
title: Ubuntu 使用总结
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - Ubuntu
date: 2021-03-04 22:40:05
---

<!--more-->
## ubuntu 重装系统
### N卡驱动
```bash
# 查看推荐驱动
ubuntu-drivers devices

# 安装驱动
sudo apt install nvidia-driver-450

# 重启
sudo reboot
```
### 简单美化
```bash
sudo apt install gnome-tweak-tool

sudo apt-get install gnome-shell-extension-autohidetopbar
```

### chrome

### vim
> 安装
```bash
sudo apt install vim-gtk
```

> 配置
```bash
sudo vim /etc/vim/vimrc
```
配置文件内容
```bash
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap ] {}<ESC>i
inoremap { {<CR>}<ESC>O
inoremap } {<CR>};<ESC>O

"设置跳出自动补全的括号
func SkipPair()
    if getline('.')[col('.') - 1] == ')' || getline('.')[col('.') - 1] == ']' || getline('.')[col('.') - 1] == '"' || getline('.')[col('.') - 1] == "'" || getline('.')[col('.') - 1] == '}'
        return "\<ESC>la"
    else
        return "\t"
    endif
endfunc
" 将tab键绑定为跳出括号
inoremap <TAB> <c-r>=SkipPair()<CR>

set tags+=/usr/include/tags
set number
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
set autoindent
set cindent
set cinoptions={0,1s,t0,n-2,p2s,(03s,=.5s,>1s,=1s,:1s

autocmd BufNewFile *.cpp,*.c,*.h exec ":call SetTitle()"
func SetTitle()
    call setline(1, "/*************************************************************************")
    call append(line("."), "    > File Name: ".expand("%"))
    call append(line(".")+1, "    > Author: xx")
    call append(line(".")+2, "    > Mail: xxxxxxxxx@gmail.com ")
    call append(line(".")+3, "    > Created Time: ".strftime("%c"))
    call append(line(".")+4, " ************************************************************************/")
    call append(line(".")+5, "")

    if expand("%:e") == 'h'
 	call append(line(".")+6, "#ifndef _".toupper(expand("%:r"))."_H")
 	call append(line(".")+7, "#define _".toupper(expand("%:r"))."_H")
	call append(line(".")+8, "")
 	call append(line(".")+9, "#endif")
    endif
    "新建文件后，自动定位到文件末尾
endfunc
```
> ctags
```bash
sudo apt install ctags
```

> sshfs

```bash
sudo apt install sshfs
```

### github 访问优化
[访问网站](https://fastly.net.ipaddress.com/github.global.ssl.fastly.net)
```cpp
sudo vim /etc/hosts

# 追加以下内容
199.232.69.194 github.global.ssl.fastly.net
140.82.112.4 github.com
```
### ssh 免密登陆
> 创建公钥
```bash
cd ./.ssh

ssh-keygen
```
遇到问题：bash: cd: .ssh: 没有那个文件或目录
```bash
ssh hostname
```
> 上传公钥】

保存到阿里云服务器 / github

### 博客相关
```bash
# 安装 git
sudo apt install git
# 配置 git
git config --global user.email pk@devil.com
git config --global user.name pk

sudo apt install nodejs

sudo apt install npm

sudo npm install -g hexo-cli
```
### 软件安装
钉钉，百度云盘，QQ音乐，vscode，蓝灯

## 笔记本合盖子后不休眠
```bash
sudo vim /etc/systemd/logind.conf

# 找到 
# HandleLidSwitch=suspend
# 修改为
HandleLidSwitch=ignore

sudo reboot
```

## 软件更新相关
```bash
# 换源
sudo gedit /etc/apt/sources.list

# 在源上搜索应用程序
sudo apt-cache search mysql

# 只检查，不更新（已安装的软件包是否有可用的更新，给出汇总报告）
sudo apt update

# 查看可升级的软件信息
sudo apt list --upgradable 

# 更新已安装的软件包
sudo apt upgrade

# 依赖关系不正确时，可以用以下命令修复
sudo apt --fix-broken install
```

## 系统信息相关

## 服务器相关

## 网络相关
```bash
netstat -alnt

telnet xxx.xxx.xxx.xxx port
```


oofgbpoabipfcfjapgnbbjjaenockbdp