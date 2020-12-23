---
title: 海贼-Linux操作系统入门及使用
author: Portgas·D·Asce
categories:
  - []
tags:
  - null
date: 2020-11-22 22:15:19
---

<!--more-->

## 1 揭开Linux的神秘面纱

## 2 开启Vim编程之旅
### 使用 vim 编写程序
**模式：**
- 普通模式：按 esc 从 插入模式 退出到普通模式；
- 插入模式：按 i 进入；
- 命令模式：打一个 : 即可进入命令模式：
  - wq：保存并退出（快捷键：ZZ）； 
  - dd：删除一行；
  - u：撤销操作；

**linux 终端 tab键 自动补全**
```
//输入
gcc main tab键
//补全为
gcc main.c
```

**linux cat 命令**
- 作用：将文件内容打印到标准输出设备上；
```
cat main.c
//常用参数
-n: 同时输出行号；
-b: 同 n，但是空白行不编号； 
```
### C语言编码规范
- 百度/阿里/google编码规范；
- 提高可读性：空格， 大括号；
- more code = more bug

### 如何进行程序debug
- 将不同的功能模块分离开来，将更有利于查找bug；
- 从上到下，从左到右 debug；

Bus error：爆栈，栈溢出;

### 海贼 OJ 使用及编码提升

### 素数问题思考

## 3 基础知识

## 4 命令系统

## 5 基本系统

### 5.1 目录结构

**目录**
- /：根目录；
- /root：超管家目录；
- /etc：配置文件夹，系统中所有的配置信息（特别是全局配置信息）都会放在该目录下； 
- opt：用户决定放不放东西，想放的话，可以放点东西；
- run：系统中正在运行中的一些东西；
- sys：系统相关的东西；
- var：一些动态变化的数据
  - www：建站网站一般放在该目录；
  - mail：系统内部通知机制，告诉有谁偷偷登你服务器；
  - log：系统使用日志（last命令（wtmp文件）：查看服务器登录信息）；
- boot：内核文件相关；
- home：所有用户的家，但不是某个用户的家目录（$HOME）;
- lib/lib64：32/64位库；
- media：光驱;
- mnt：mount,挂载目录，挂载一个其它的文件系统，原先文件系统是一个树，u盘是一个独立的文件系统，将后者挂在前者；
- proc：系统中哪些进程正在运行;
- tmp: 临时文件夹，临时放在这，系统重启的时候统统消失；
- dev：设备文件夹；
- root: 超管家目录；
- usr:用户安装软件；

**路径**
- 相对路径: 以 / 开头的路径；
- 绝对路径: 以 ./ 开头的路径；

**全局配置**
- 全局配置可能会被局部配置覆盖掉；

### 5.3 启动流程
- 开机；
- BIOS：
  - 硬件检测，到底具不具备开机的条件（磁盘，cpu，内存）；
  - 找到主引导分区（MBR）
- 引导程序（Boot Loader）


**运行级别**
run level
- 0：系统关机
- 1：单用户模式；
- 2：多用户模式；
- 3：完整多用户模式；
- 4：
- 5：
- 6：

### 5.3 全局配置文件

**etc/fstab**


## Linux中特殊符号
### $
- 获取变量（包括环境变量）的值；
- $PATH 与 ${PATH} 一样；

### ``
- 返回其中命令执行的结果；

### []
- $[] 等价于 $(()), 属于执行计算公式；






# 由 Win 的图形化界面转化为 Linux 的字符界面
## 用户相关命令
### Linux中退出登录的三种方式
- exit；
- logout；
- ctrl + d；

### 添加，修改，删除用户
- useradd -m 用户名：-m 会同时创建该用户的家目录；
- userdel -r 用户名：-r 会同时删除该用户的家目录；
- adduser 用户名：添加用户，并设置密码等一系列流程；
- usermod：修改用户帐号；
- passwd：修改当前用户密码；

### 用户信息显示
- id：显示当前用户的id，组id，以及当前用户所属于的组；


## 一切皆文件（简单的基于文件实现的内容）

### 显现当前有哪些用户在线
- w：显示当前有哪些用户在线；

### 用户向其它用户发送消息
用户之间传递消息
```bash
w

# pk       pts/0    61.185.163.130   02:15    3:54   0.04s  0.04s -bash
# pk       pts/1    61.185.163.130   02:46    1.00s  0.02s  0.00s w

echo "hello" > /dev/pts/0
```
### 广播消息

```bash
wall "system is rebooting int 15 mins"

# Broadcast message from pk@Ubuntu (pts/1) (Mon Dec 14 02:54:55 2020): 
# system is rebooting int 15 mins
```

## 用户与组

### 三种人
- ower（u）：文件所属者；
- group（g）：文件所属组；
- others（o）：其它人；

### 三种权限
- r：可读；
- w：可写；
- x：可执行；

### 权限字符串（ll命令）
- -rwxrwxrwx；

## 文件系统

linux 中文件系统就是一棵目录树（不同于 win 是多棵树）；

### 切换目录
cd

### 查看目录下的文件
ls

## 拷问灵魂的三个问题
- whoami：我是谁；
- pwd：我在哪；
- cd：我要去哪（资源在哪）；
  - cd / cd ~ ：回到家目录；
  - cd - ：回到上一个目录；

## 软件安装
安装的常用方式：
- 下载xxx.deb，使用 dpkg -i xxx.deb安装；
- 下载压缩包 xxx.tar，使用 tar 命令解压；
- 使用 apt 安装（可以选择合适的源配置远程地址）；

卸载软件：
- 使用 apt 卸载：--pure表示删除用户配置文件；

软件安装在哪里了：
- 一个软件的不同部分会放在不同的地方（不同于 Win ，集中安装在某个地方）；

```bash
whereis tree

# tree: /usr/bin/tree /usr/share/man/man1/tree.1.gz
```

相关命令：
- apt：软件管家；
- apt update：同步软件信息：有哪些软件可用，哪些可更新，哪些可卸载；
- apt upgrade：更新本地软件为最新版本；
- apt-cache search xxx：搜索 xxx 软件；
- dpkg -i xxx.deb：使用dpkg程序安装 xxx.deb；
- dpkg -r ：使用dpkg卸载软件；

扩展：
- nmon工具；

---

# 常用的Linux命令（简介）

## 文件及目录相关命令
- ls：查看目录下内容；
- cd：目录跳转；
- pwd：打印工作目录；
- cp：拷贝；
- mv：移动文件及目录；
- rm：删除文件及目录；
- mkdir：创建目录；
- tree：打印目录树；
- tar：文件归档与压缩；
- ln：创建连接文件；

## 文件内容的修改与查看

- touch：创建空白文件；
- cat：正向连续读，查看文件内容；
- vim：文本编辑器；
- echo：打印文本；
- more：分页查看文件；
- less：分页查看文件；
- head：查看文件头部；
- tail：查看文件尾部；
- diff：对比文件；
- grep：检索信息；
- wc：计数；

## 文件的查找与定位
- find：查找文件
- witch：查找可执行文件；
- whereis：查找可执行，源码，帮助手册；
- locate：定位任何文件；
  - 基于数据库的，所以查找速度非常快；
  - 但它不是实时更新的，需要手动 sudo updatedb 更新；

## 用户相关命令
- useradd：新建用户；
- userdel：删除用户；
- usermod：修改用户；
- passwd：修改密码；
- su：切换用户；
- sudo：获取管理员权限；
- chgrp：修改所属组；
- chmod：文件权限修改；
- chown：修改文件所属用户；
- exit：退出用户；
- logout：退出用户；

## 进程相关命令
扩展：
- 守护进程；

命令：
- ps：打印进程；
  - ps -ef： 
- kill：杀死进程；
  - kill pid： 
- pkill：批量杀死进程；
  - pkill sshd： 
- killall：批量杀死进程；
- crotab：定时任务；
- ctrl + z：挂起前台进程；
- fg：将进程调至前台运行；
- bg：让挂起的进程后台执行；
- jobs：查看挂起和后台进程

## 系统信息获取命令
- date：查看时间；
- df：查看文件系统；
- du：获取目录文件大小；
- free：查看内存；
- top：查看系统信息；
- htop：查看系统信息；
- dstat：查看系统信息；
- nmon：查看系统信息；
- ifconfig：查看ip信息；
- uname：查看os信息
  - cat /etc/os-release 
- last：查看最近登录；
- who：查看当前登录；

## 其它命令
- ssh：远程连接；
- scp：远程拷贝；
- wget：获取http文件；
- ping：测试远程主机；
- poweroff：关机；
- reboot：重启；

## 基础命令总结
### 终端（terminal） = tty（TeletypeWriter，电传打印机）
作用：提供一个命令输入输出环境；

快捷方式：ctrl + alt + t；

### shell
是一种人机交互接口，是一种命令解释器，是Linux内核的一个壳，负责外界与Linux内核的交互；

两种shell
- bash；
- zsh；

问题：在终端中输入命令并执行，究竟经历了哪些过程？
- 终端读入命令及参数；
- 在 $PATH 路径下查看命令存在不存在（内置命令，非内置命令）；
- 若存在则执行，并将结果输出到终端进行显示；

### 程序与进程
程序：是存储在磁盘（存储介质）上的二进制可执行文件；

进程：运行着的程序；

### 路径
三种路径：
- 绝对路径：以根目录 / 开头的路径
- 相对路径：以 ./ 或 ../ 开头的路径
- 远程路径：协议：//用户名：密码@位值/路径：端口；
  - http://haizei.com;
  - ftp://usr:passwd@ftp.haizei.com:21;

特殊路径：
- ～：家目录；cd ~pk 回到某个用户家目录；
- -：回到上一次目录；

### 软件
通常一个软件包含的内容会分别被拷贝到级别相同的 bin lib share 和 /etc 目录下
- bin：存放程序的可执行文件，在系统环境变量中将该路径添加进去，就可以直接执行程序；
- lib：库文件集中存放，方便共享。
- share：存放程序需要的其它资源；
- /etc：配置文件存放路径，大部分程序的配置文件都可以在这个路径下找到；


### 配置方式
两种配置方式：
- 命令行方式：为了方便使用，很多程序都会提供命令接口供用户更加快捷个性化地配置自己的系统；
- 修改配置文件：

### 隐藏文件
Linux的隐藏文件都是以.开头的，所有以.开头的文件都会被系统识别为隐藏文件；

### 文件类型
使用 ll 命令可以查看当前文件夹下所有文件的详细信息。

七种文件：
- -(regular file)：普通文件；
  - 纯文本文件；
  - 二进制文件；
- d(directory)：目录；
- l(link)：链接；
- b(block)：块设备；
- c(character)：字符设备；
- s(socket)：套接字；
- p(pipe)：管道；
  - 创建管道文件：mkfifo a.
  - 向管道文件中传入数据：echo 123 > a.

### 与文件权限有关的命令
ll命令：

如果没有 ll 命令 和 l 命令，在 .zshrc 中添加以下内容：
- alias ll="ls -lh"
- alias l="ls -alh"

chown:
- sudo chown zrx a.c;
- sudo chown suyelu:suyelu a.c;
- sudo chown suyelu:zrx a.c;

chgrp:
- sudo chgrp zrx a.c;

chmod：
- chmod a+x a.txt:a表示所有（a = u, g, o）;
- chmod o-x a.txt:
- chmod a=x a.txt:
- chmod u=rwx,g=rw,o=r a.txt:
- chmod ug0=x a.txt;
- chmod 775 a.txt:

三个时间
- atime：最后一次访问时间；
  - ls --time=atime -l;
- ctime：最后一次修改属性/权限时间；
- mtime：最后一次修改文件内容时间；

### 用户
Linux 有两种用户：
- root：拥有系统完全控制权，慎用 root 用户，更大的权限意味着更大的风险；
- 普通用户：

su 命令切换：
- su zrx：家目录没变，表示是一次临时切换；
- su - zrx：更新环境变量，表示是一次完整的重新登录；


# 命令系统
## terminal 和 shell
- terminal：负责输入数据 和 显示结果（标准输出，标准错误）；
- shell：负责处理数据（负责让内核处理数据）；

- 标准错误；
- 标准输出；
- 数据黑洞：/dev/null；

## Linux帮助系统
- man手册；
  - 代号：1，2，3 ... 9， 0 的含义分别是什么； 
  - man 2 reboot；
  - man 8 reboot；
  - man -k reboot: 命令和描述里面包含 reboot 的都会被找到；
  - man -f reboot: 精确查找？
- info手册；
- tldr手册；
- --help；

## 通配符
?:
- 代表单个任意字符；
- ls ?.c

*：
- 代表任意字符串；
- ls *.c

[list]:
- 匹配list中任意一个字符；
- ls [1-3].c
- ls[0-9a-zA-Z].c
- [!list]

{}:
- 匹配其中一个字符串；
- ls {"main1","main2"}.cpp

## 任务管理
&:表示后台执行；
- ping baidu.com &

;:表示顺序执行；
- ls;ls;ls

&&:只有第一个命令执行成功了，才执行第二个命令；
- ls /etc1 && echo "success"

||:只有第一个命令执行失败了，才执行第二个命令；
- ls /etc1 || echo "failed"

``:命令嵌套
- p=`ls`;echo $p
- dir=`pwd`;cd /;cd /etc/;cd $dir

ctrl + z:挂起；

bg：将挂起的命令后台执行；

fg：将后台执行的任务前台执行；

管道，重定向
- ls > a.log;cat a.log（重写，标准输出重定向）
- ls >> a.log;cat a.log（追加，标准输出重定向）
- ls 1> a.log;cat a.log
- ls 1>> a.log;cat a.log 
- cat < a.log（标准输入重定向）
- cat 0< a.log
- cat >> a.log << EOF

## 转义符
- ''（硬转义）：其内部所有 shell 元字符，通配符都会被关掉；
  - a='$a'; echo $a
  -  
- ""（软转义）：其内只允许出现特定的shell元字符；
- \：


# 基本系统
## 目录结构
Linux目录结构是一棵目录树：
- 根目录（/）；
- /bin: 存放可执行二进制文件；
- /etc: 配置文件存放位值；
  - 全局配置；
  - 局部配置：全局配置会被局部配置覆盖； 
- /home: 用户的家目录所在文件夹；
- /root: 超管家目录；
- /sys：系统相关东西；
- /var:
  - www:
  - log:
  - mail:


## 系统启动流程
- 开机；
- bios；
- boot loader；
- kernel：
- 虚拟文件系统；
- init；
- getty；
- x window；


## 运行级别
- 0：系统关机；
- 1：单用户模式，安全模式；
- 2：多用户模式；
- 3：完整多用户模式
- 4：系统保留
- 5：x windows；
- 6：重启；

## 系统启动
- System V：一个接一个依次启动；
- UpStart：topo启动；
- System d：

扩展：
- 99.999原则；
- 热启动：跳过硬件检测；

## 全局配置文件
### 系统初始化

### 文件系统

### 用户系统

### shell

### 系统环境

### 网络


# 系统信息获取
## w
```bash
w
# 用户 终端 从哪登录 登录时间 空闲时间 与该终端相连的进程所占用的cpu时间 当前进程占用时间 正在干什么
# 02:54:21 up 6 days,  4:00,  1 user,  load average: 0.00, 0.00, 0.00
# USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
# pk       pts/0    xxx.xxx.xxx.xxx  02:53    1.00s  0.02s  0.00s w


```
## who

```bash
who
# pk       pts/0        2020-12-19 02:53 (xxx.xxx.xxx.xxx)
who -q
# pk
# users=1
```
## whoami
```bash
whoami
# pk
```
## uptime
```bash
uptime
# 03:04:45 up 6 days,  4:11,  1 user,  load average: 0.00, 0.00, 0.00

uptime -p
# up 6 days, 4 hours, 12 minutes
```
- uptime -p；


## last
```bash
last | grep -v "wtmp begins" | grep -v "^$" | cut -d ' ' -f 1 | sort | uniq -c | sort -n -r | head -n 1
# 186 pk
```
## date
```bash
date +"%Y-%m-%d %H:%M:%S"
# 2020-12-19 03:06:12

date +"%s"
# 1608319869

st=`date +"%s"`
et=`date +"%s"`
pt=$[$et - $st]
echo $pt
# 18
```
## uname
```bash
uname -a
# Linux Ubuntu 5.4.0-52-generic #57-Ubuntu SMP Thu Oct 15 10:57:00 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

## 词频统计
```bash
man ls > a.log
man man >> a.log
man stdio >> a.log
man scanf >> a.log
cat a.log | tr -s -c "a-zA-Z" "\n" | sort | uniq -c | sort -n -r | more

300 the
168 a
149 to
131 is
126 of
99 and
83 man
74 be
70 or
69 in
60 pointer
55 The
53 input
53 by
51 with
51 stream
49 for
49 as
```

# shell编程基础

shell 高级，脚本，面向过程，解释型语言；

## 第一个Shell脚本
```bash
# 程序将会用bash去解释
#!/bin/bash
```

## 变量与局部变量
变量定义
- a=12
- a=helloword
- a=`pwd`
- a=$a:a（字符串拼接）

```bash
a=123
echo $a
# 123

echo $a:a
# 123:a

echo -e "In\033[31;32m $a \033[0m"
# In /home/pk
```
### 特殊变量
位值变量
- $0: 获取当前执行shell脚本的文件名，包括路径。
- $n: 获取当前执行脚本的第 n 个参数，n = 1..9；如果 n 大于 9，则需要将 n 用大括号扩起来；
- $*: 获取当前执行脚本的所有参数，将所有命令行参数视为单个字符串，相当于 "$1$2$3";
- $#: 得到执行当前脚本的参数个数；
- $@: 获取这个程序所有参数，并保留参数之间的任何空白，相当于 "$1" "$2" "$3"，这是将参数传给其它程序的最好办法；

```bash
#!/bin/bash
# 这是注释
echo "Hello World!"
WorkDir=`pwd`
echo -e "In\033[31;32m ${WorkDir} \033[0m"
echo "Program Name : $0"
echo "Arg1 : $1"
echo "Arg2 : $2"
echo "Arg3 : $3"
echo "Arg4 : $4"
echo "Arg5 : $5"
echo "Arg6 : $6"
echo "\$@ : $@"
echo "\$* : $*"
echo "\$# : $#"
```

状态变量
- $?: 判断上一指令是否成功，0 为成功，非 0 为不成功；
- $$: 取当前进程的 PID；
- $!: 上一指令的 PID；

```bash
ls /etc1
# ls: 无法访问'/etc1': 没有那个文件或目录

echo $?
# 2

last | grep "test1" | echo $?
# 1
```

## 输入输出
### read
参数：
- p：显示提示信息；
- s：不显示输入；
- t：等待时间，超过则退出输入；
```bash
read a
echo $a

bash
read -p "请输入密码： " pw
echo $pw

read -s -p "请输入密码： " pw
echo $pw

read -s -p "请输入密码： " -t 2 pw
echo $pw
```
### echo（输出）

### printf（输出）
```bash
printf "%s is %d years old ! \n" "suyelu" 18
# suyelu is 18 years old !
```

## 函数
```bash
#!/bin/bash

function _printf_() {
    echo $1
    return
}

_printf_ "Hello World!"
```

## 流程控制
### if
test 表达式：
- string
  - -n string：字符串不为空；
  - -z string：字符串为空；
  - string1 = string2：字符串想等；
  - string1 ！= string2：字符串不相等；
- integer
  - integer1 -eq integer2
  - integer1 -ge integer2
  - integer1 -gt integer2
  - integer1 -le integer2
  - integer1 -lt integer2
  - integer1 -ne integer2
- File
  - file1 -ef file2：同一个文件；
  - file1 -nt file2：修改时间更近；
  - file1 -ot file2：修改时间更远；
  - -b file：文件存在，且是一个块文件；
  - -c file：文件存在，且是一个字符文件；
  - -d file：文件存在，且是一个目录；
  - -e file：文件存在；
  - -f file：文件存在，且是一个普通文件；
  - -g file：
  - -G file：
  - -h file：文件存在，且是一个符号链接； 
  - -r file：文件存在，且可读；

```bash
#!/bin/bash
read a
if [[ ${a} -gt 10 ]];then
    echo "$a > 10"
elif [[ ${a} -eq 10 ]];then
    echo "$a = 10"
else
    echo "$a < 10"
fi
```

```bash
#!/bin/bash
TargetFile="a.c"
if [[ -r ${TargetFile} ]];then
    gcc a.c -o a
    ./a
else
    echo "${TargetFile} not found!"
fi
```

### case
```bash
#!/bin/bash
read a
case $a in
    1)
        echo 1
        ;;
    2)
        echo 2
        ;;
esac
```

### for
```bash
#!/bin/bash
for i in $@;do
    echo $i
done

for (( i = 1; i <= 100; i++ ));do
    echo $i
done
```

### while（条件不成立的时候退出）
```bash
#!/bin/bash
num=0
while [[ $num -lt 100 ]];do
    echo ${num}
    num=$[${num} + 1]
done
```

### until（直到条件成立的时候退出）
```bash
#!/bin/bash
num=0
until [[ $num -eq 100 ]];do
    echo $num
    num=$[$num + 1]
done
```

### 练习
0-100偶数和
```bash
#!/bin/bash
sum=0
for(( i=2; i <= 100; i++));do
    if [[ $[$i % 2] -eq 0 ]];then
        # 启动调试
        # set -x
        sum=$[$sum + $i]
        # 关闭调试
        # set +x
    fi
done
echo "sum = $sum"
```

## 数组
跟 C 语言一样，下标都是从 0 开始；
```bash
# 需要切换到 bash
# 输入数组
read -a a
# 输入 1 2 3 4 7 8 9 10
echo $a
# 1（数组第一个元素）
echo ${a[0]}
# 1
echo ${a[1]}
# 2
echo ${a[*]}
# 1 2 3 4 7 8 9 10（数组所有元素）
echo ${a[@]}
# 1 2 3 4 7 8 9 10（数组所有元素）
echo ${#a[*]}
# 8（数组元素个数）
echo ${#a[@]}
# 8（数组元素个数）

# 声明一个数组
declare -a b
b[1]=1
b[2]=2
echo ${b[@]}
# 1 3

c[1]=2
c[3]=4
c[100]=200
echo ${c[@]}
# 2 4 200
echo ${!c[@]}
# 1 3 100（输出数组中元素下标）

d=(1 2 3 4 5 6)
echo ${d[@]}
# 1 2 3 4 5 6
d+=(7 8 9)
echo ${d[@]}
# 1 2 3 4 5 6 7 8 9
unset d[1]
echo ${d[@]}
# 1 3 4 5 6 7 8 9
unset d
echo ${d[@]}
# 

files=(`ls`)
echo ${files[@]}

```


## shell 求解素数

### 暴力
```bash
#!/bin/bash

function Usage() {
    echo "Usage: $0 start_num end_num"
    exit
}

if [[ $# -ne 2 ]];then
    Usage
fi

function is_prime() {
    num=$1
    for ((j=2; $[j * j]<=$num; ++j));do
        if [[ $[$num % $j] -eq 0 ]];then
            return 1
        fi
    done
    return 0
}

Start=$1
End=$2

for (( i=$Start; i<=$End; ++i));do
    is_prime $i
    if [[ $? -eq 0 ]];then
        echo $i
    fi
done
```
```bash
bash prime1.sh 10 2000

# 调试
bash -x prime1.sh 10 2000
```
### 素数筛

```bash
declare -a prime
read n
for (( i=2; i<=n; ++i));do
    if [[ prime[i] -eq 0 ]];then
        prime[++prime[0]]=i
    fi
    for (( j=i*2; j<=n; ++j));do
        prime[j]=1;
    done
done
for (( i=1; i<=prime[prime[0]]; ++i ));do
    echo ${prime[i]}
done
```
### 线性筛
```bash
#!/bin/bash
declare -a prime
n=$1
for (( i=2; i<=$n; ++i ));do
    if [[ ${prime[$i]} -eq 0 ]];then
        prime[0]=$[${prime[0]} + 1]
        prime[${prime[0]}]=$i
    fi
    for (( j=1; j<=${prime[0]}; ++j));do
        if [[ $[$i * ${prime[$j]}] -gt $n ]];then
            break
        fi
        prime[$[$i * ${prime[$j]}]]=1
        if [[ $[$i % ${prime[$j]}] -eq 0 ]];then
            break
        fi
    done
done

sum=0;
for (( i=1; i<=${prime[0]}; ++i));do
    sum=$[$sum + ${prime[$i]}]
done

echo $sum
```

# 文件及目录操作
## 目录
### cd
：切换当前工作目录；
### pwd
打印当前工作目录；
- -L：显示逻辑工作目录；
- -P：显示物理工作目录；

链接：
- 硬链接：不能链接目录；
- 软链接：可以链接目录；
```bash
# 默认硬链接（会失败）
ln ../Desktop/ .

# 软链接
ln ../Desktop/ .
# 进入到链接目录
cd Desktop
# 默认逻辑目录
pwd
# /home/pk/test/Desktop
pwd -L
# /home/pk/test/Desktop
pwd -P
# /home/pk/Desktop

# 千万不要那么做，Desktop下面文件内容都会被删除的
rm -r Desktop
```
### mkdir
新建文件夹
- -p:自动创建符目录；
- -m:设置权限；

```bash
mkdir 123/456
# mkdir: 无法创建目录 “123/456”: 没有那个文件或目录
mkdir -p 123/456
rm -rf 123

mkdir -p -m 700 123/456
cd 123
ll
# drwx------ 2 pk pk 4.0K 12月 21 11:30 456
```

ps:权限不足，可能的两种情况
- 用户权限不足；
- 执行的文件不可执行；


### rmdir
：删除文件夹；

## 文件与目录管理
### ls


### cp
复制
- -i:若文件存在，询问用户；
- -r:递归复制；
- -a:pdr集合；
- -p:连同文件属性一起拷贝；
- -d:若源文件为连接文件的属性，则复制连接文件的属性；

```bash
# 管道没有数据，接收的那边就会阻塞
# 创建一个管道
mkfifo a.

# 创建一个文件夹
mkdir test

# 拷贝
cp a.out a.log test.c a. test/
```
### rm
删除
- -i:互动模式
- -r:递归删除
- -f:强制删除


### mv
移动
- mv src1 src2 src3 dir
- -i:互动模式
- -f:force


### basename
取文件名
### dirname
取目录名

## 文件内容查阅
### cat
正向连续读
```bash
cat -b main.cpp

cat -n main.cpp
```
### tac
反向连续读
```bash
tac main.cpp
```

### nl
为文件添加行号
- -b:行号指定方式
  - -b a:相当于 cat -n
  - -b t:相当于 cat -b
- -n:列出行号的表示方法
  - -n ln:行号在屏幕最左边显示；
  - -n rn:行号在自己字段最右边显示；
  - -n rz:行号在自己字段的最右边显示，前面自动补全0
- w num:行号所占位数；

```bash
# cat -n main.cpp
cat main.cpp | nl -b a

# cat -b main.cpp
cat main.cpp | nl -b t
```

### more
一页一页显示文件内容
- 只能往下走；
- 搜索（/）结果不会高亮显示；

### less
与more相似，但是可以上下翻看

### head
只看头几行

### tail
只看末尾几行

## 修改文件时间与新建文件
文件的三个时间
- mtime:内容数据改动时才更新这个时间（没有这个选项，它是默认的）；
- ctime:文件权限属性改动时更新这个时间；
- atime:文件的内容被取用access时，更新这个时间；

```bash
ls -l --time=ctime
```

### touch
修改文件时间，若文件不存在，则新建一个文件；
- -a:仅修改访问时间；
- -c:仅修改文件时间，若文件不存在，则不新建；
- -d:修改文件日期；
- -m:仅修改mtime
- -t:修改文件时间[yymmddhhmm]

### chattr
文件隐藏属性
- chattr [+-=][ASacdistu] <fire/dir>
- A不修改atime
- S:同步写入；
- a:只能增加数据；
- c:自动压缩，解压；
- d:不会被dump程序备份；
- i:不能删除，修改，建立连接；
- s:文件删除时，直接从磁盘删除；
- u:文件删除时，数据内容存在磁盘种；

```bash
lsattr a.log
# --------------e----- a.log
# 设置为只能追加数据
sudo chattr +a a.log
lsattr a.log
# -----a--------e----- a.log

echo abc > a.log
# zsh: 不允许的操作: a.log

echo abc >> a.log
cat a.log
# abc

rm a.log
# rm: 无法删除'a.log': 不允许的操作

sudo chattr -a a.log
rm a.log

touch a.log
sudo chattr +i a.log
lsattr a.log
# ----i---------e----- a.log
ln a.log c.log
# ln: 无法创建硬链接'c.log' => 'a.log': 不允许的操作
```

### lsattr
文件的隐藏属性
- lsattr [-adR] <file/dir>
- -a:打印隐藏文件的隐藏属性；
- -d:如果是目录，仅打印目录的信息；
- -R:递归；

## 文件特殊权限

### set-uid
标记
- s

作用对象：
- 二进制程序文件，非脚本；

效果：
- 用户在执行程序时获取程序所有者权限；

```bash
# 用户密码存放于 /etc/shadow 中
# 普通用户 不具有 /etc/shadow 的读写权限
ll shadow
# -rw-r----- 1 root shadow 1.6K 11月 23 16:28 shadow

# 但普通用户可以修改密码（写 shadow 文件），这不是矛盾了吗？
# 先不着急，先往下看

# 找passwd在哪
which passwd
# /usr/bin/passwd

# 查看 passwd 信息
ll /usr/bin/passwd
# -rwsr-xr-x 1 root root 67K 5月  28  2020 /usr/bin/passwd

# 发现 x 位值被 s占用了
# s的意思就是让执行 passwd 的用户，临时具有 passwd 所有者 root 的权限

# 总结下就是，passwd这个可执行二进制文件拥有它的所有者的所有权限，普通用户有执行 passwd 的权限，从而可以通过 passwd 来修改 /etc/shadow
```
### set_gid(s)
标记
- s

作用对象：
- 目录和二进制程序文件；

效果：
- 用户在该目录里，有效组变为目录所属组；

```bash
mkdir gid_test
chmod g+s gid_test
ls -ald gid_test
# drwxrwsr-x 2 pk pk 4096 12月 21 17:44 gid_test
```
### sticky bit(粘着位)
标记：t

作用对象：目录

效果：在该目录下，用户只能删除自己创建的内容

```bash
ls -ald /tmp
# drwxrwxrwt 19 root root 4096 12月 21 17:56 /tmp
```

## 文件检索及定位
### which
查找PATH路径下，所有可执行文件；
```bash
ls -al `which cp`
# -rwxr-xr-x 1 root root 153976 9月   5  2019 /bin/cp
```

### whereis
寻找特定文件
- -b: 只查找二进制文件；
- -m: 只查找manual路径下的文件；
- -s: 只查找source源文件；
- -u: 查找其他文件；

```bash
whereis tldr
# tldr: /usr/bin/tldr /usr/share/man/man1/tldr.1.gz
```
### locate
模糊定位
- -i: 忽略大小写；
- -r: 后面可接正则表达式；

它是基于数据库的，维护了一个查找索引：
- 刚创建的文件一般是找不到的，因为数据库没有更新；
- 更新数据库：updatedb；

```bash
locate qq

touch 1234567.txt
locate 1234567.txt
# 什么都没查找到

sudo updatedb
locate 1234567.txt
# /home/pk/1234567.txt
```

### find
高级查找
- 与时间相关的参数：-atime, -ctime, -mtime
  - -mtime n: n天前的 “一天之内” 修改的文件；
  - -mtime +n: n天之前，不包含 n，修改过的文件；
  - -mtime -n: n天之内，包含n，修改过的文件；
  - -newer file: 比file还新的文件；
- 与用户或用户组相关的参数：
  - -uid n: 用户 UID 为 n；
  - -gid n: 群组 gid 为 n；
  - -user name：用户名为 name；
  - -group name：群组名为name；
  - nouser：文件所有者不存在；
  - nogroup：文件所属组不存在；
- 与文件权限及名称有关的参数
  - -name filename: 文件名为filename；
  - -size [+-]size:查找比size大或小的文件；
  - -type t：f b c d l s p
  - -perm mode: mode刚好等于的文件；
  - -perm -mode： 全部包含mode的文件；

```bash
find test/ \( -name "*.c" -o -name "*.h" \)

rm -rf `find test/ \( -name "*.c" -o -name "*.h" \)`

# 将前面的结果作为输入
find . \( -name "*.c" \) | xargs ls

# 找出所有.sh 且为 775 的文件
find . -perm 775 -name "*.sh" 2>/dev/null

# 并统计所有文件的总行数
find . -perm 775 -name "*.sh" -exec cat {} \; 2>/dev/null | wc -l
```

## Linux三剑客之AWK

```bash
awk [-Ffv] 'BEGIN{commands} {pattern/commmands} END{commands}' file
```
文本数据处理
- -F fs：指定输入分隔符，fs可以是字符串或正则表达式；
- -v var=value: 赋值一个用户定义变量，将外部变量传递给 awk
- -f scriptfile：从脚本文件中读取 awk 命令；

处理步骤：
- 执行BEGIN{commands}中的语句；
- 从文件中读入一行，执行 pattern{commands};重复直到文件被读完；
- 执行END{commands};

```bash
last | grep -v "^$" | grep -v "wtmp" | head -n 3| awk 'BEGIN{printf"Start\n"} pattern{} END{printf"end\n"}'

last | grep -v "^$" | grep -v "wtmp" | awk '{if($1 == "pk") {print $10}}'
```

# 数据提取操作

##
```bash
echo $[`echo 1 2 3 4 5 6 7 9 a v 你好 . /8 | tr -s -c "0-9" " " | tr " " "+"`0]

echo ${PATH} | tr ":" "\n" | tail -1

last | grep "reboot"

cat /etc/passwd | sort -t : -k 3 -n -r

last | grep -v "^$" | grep -v "wtmp" | wc -l

last | grep -v "^$" | grep -v "wtmp" | cut -d ' ' -f 1 | sort | uniq -c | sort -n -r

cat /etc/passwd | head -n 20 | tail -n 10 | cut -d : -f 1 | xargs -n 1 id

cat /etc/passwd | cut -d : -f 1 | xargs -esync -n 1 id
```

## sed
```bash
# a.log
abcdabc
abcghjkabcjklabc
efg

123
```

```bash
# sed 是按行处理的
# 只将每行第一个 abc 替换为 123
sed 's/abc/123/' a.log

# 将每行所有的 abc 替换为 123
sed 's/abc/123/g' a.log

# 将替换结果写入到原文件
sed -i 's/abc/123/g' a.log

# 只对匹配到的行进行处理
sed '/hjk/s/abc/123/g' a.log

# 删除匹配的行（以#开头的行）
sed '/#/d' a.log
```

# 重点
## tr
translate or delete characters（替换或删除字符）

注意：
- tr会连回车也换掉；


参数：
- -d set1：删除所有在set1中出现过的字符；
- -c set1：反选设定字符，即符合 set1 的不做处理；
- -s ch：将连续的 ch 变成一个 ch；

示例：
```bash
echo ${PATH} | tr -d "ur"

echo ${PATH} | tr "usr" "use"

# 将testfile中的小写字母全部转换成大写字母
cat testfile | tr a-z A-Z

# 7后面的换行符也会被替换成 空格
echo "1 2 3 4 5 a x 哈哈 ， /7" | tr -c "0-9" " " | tr -s " "
```

## cut -d ' ' -f 1
- -d: 分隔符；
- -f: 取第几项；

## sort -t : -k 3 -n -r
- -t: 分隔符；
- -k: 按第几项排序；
- -n: 以数子方式排序；
- -r: 倒叙；


### grep
- 按行对文件进行匹配，保留匹配的行；

示例：
```bash
grep "abc"
grep -v "abc"
grep -v "^$"
```

### wc
统计文件中的 字节数，字符数，单词数，行数等内容。

参数：
- -c：统计字节数；
- -m：统计字符数；
- -l：统计行数；
- -w：统计单词数；

示例：
```
echo ${PATH} | wc -c
echo ${PATH} | wc -m
echo ${PATH} | wc -w
echo ${PATH} | wc -l
```



### tail

输出文件的尾部（默认输出最后10行）

参数：
- -n num：输出最后 num 行数据；
- -n +num：输出从第 num 行 到 结束 的所有数据；

示例：
```bash
last | tail -n 3
last | tail -n +2
```

### head
输出文件头部（默认输出前10行）

参数：
- -n num：输出前 num 行数据；
- -n -num：输出第一行到倒数第 n - 1 行数据；

示例：
```bash
last | head -n 3
last | head -n -5
```







