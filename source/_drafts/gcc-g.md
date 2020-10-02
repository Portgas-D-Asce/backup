---
title: gcc & g++
categories:
  - []
tags:
  - null
---

<!--more-->

## gcc
### 使用
显示版本信息
```
gcc --version
```

显示帮助
```
gcc --help
```

## g++
### 使用
显示版本信息
```
g++ --version
```

显示帮助
```
g++ --help
```
### 编译
源文件内容：
```cpp
#include <iostream>

int main() {
    std::cout << "Hello World!" << std::endl;
    return 0;
}
```
-o \<file\>：指定输出文件名（可以加路径）: 
```c
g++ -o main main.cpp
//默认生成 a.out 文件
g++ main.cpp
```
-E： 只进行预处理：
```cpp
//只是在终端中显示预处理后文件内容，并不生成以 .i 结尾的中间文件
g++ -E main.cpp
//指定生成以 .i 结尾的中间文件
g++ -E -o main.i main.cpp

//以 .i 结尾的中间文件大概长下面样子
# 1 "main.cpp"
# 1 "<built-in>"
# 1 "<command-line>"
# 1 "/usr/include/stdc-predef.h" 1 3 4
# 1 "<command-line>" 2
# 1 "main.cpp"
# 1 "/usr/include/c++/9/iostream" 1 3
# 36 "/usr/include/c++/9/iostream" 3
       
# 37 "/usr/include/c++/9/iostream" 3

    //上面是开头，下面是末尾，整个文件快3w行

# 3 "main.cpp"
int main() {
    std::cout << "Hello World!" << std::endl;
 return 0;
}

//同时预处理多个文件，全部文件的预处理结果将显示在终端上
g++ -E add.cpp minus.cpp time.cpp

//处理多个预处理文件时，不能指定输出文件，也就是不能下面那么做
g++ -E -o math.i add.cpp minus.cpp time.cpp

//如果指定了输出文件，会报下面的错误
//g++: fatal error: cannot specify ‘-o’ with ‘-c’, ‘-S’ or ‘-E’ with multiple files
```

-S：只进行 预处理 和 编译
```cpp
//以源文件作为输入
g++ -S main.cpp
//以 .i 结尾的中间文件 作为输入
g++ -S main.i

//最终都会生成以 .s 结尾的ASCII语言文件 main.s，大盖长下面这个样子
.file	"main.cpp"
.text
.section	.rodata
.type	_ZStL19piecewise_construct, @object
.size	_ZStL19piecewise_construct, 1

    //省略中间部分，整个文件共100+行

0:
	.string	 "GNU"
1:
	.align 8
	.long	 0xc0000002
	.long	 3f - 2f
2:
	.long	 0x3
3:
	.align 8
4:

//同时处理多个文件（同预处理一样也不能显示指定输出文件）
g++ -S add.cpp minus.cpp time.cpp
g++ -S add.i time.i minus.i
g++ -S add.i time.cpp minus.i

//将生成每个文件的 以 .s 结尾的ASCII语言文件：add.s 、 time.s 、 minus.s

```

-c： 只进行 预处理 、 编译 、 汇编
```cpp
//以 源文件 作为输入
g++ -c main.cpp

//以 .i 结尾的中间文件 作为输入
g++ -c main.i

//以 .s 结尾的ASCII语言文件 作为输入
g++ -c main.s

//最终都生成以 .o 结尾的可重定位目标文件 main.o ，其是一个二进制文件

//同时处理多个文件（同预处理一样也不能显示指定输出文件）
g++ -c add.cpp time.cpp minus.cpp
g++ -c add.i time.i minus.i
g++ -c add.s time.s minus.s
g++ -c add.cpp time.i minus.s

//将生成每个文件的 以 .o 结尾的可重定位目标文件：add.o 、 time.o 、 minus.o
```

什么都不加：进行 预处理、编译、汇编、链接，生成可执行目标文件。
```cpp
//分别以 源文件 、 .i 结尾的中间文件 、 .s 结尾的ASCII语言文件 、 .o 结尾的可重定位目标文件作为输入
//均生成 可执行目标文件 a.out
g++ main.cpp
g++ main.i
g++ main.s
g++ main.o

//指定 可执行目标文件 文件名为 main
g++ -o main main.cpp

//处理多个文件（会报错）
g++ -o main add.cpp time.cpp minus.cpp

//报错内容
///usr/bin/ld: /usr/lib/gcc/x86_64-linux-gnu/9/../../../x86_64-linux-gnu/Scrt1.o: in function `_start':
//(.text+0x24): undefined reference to `main'
//collect2: error: ld returned 1 exit status

//也就是说，当编译生成可执行目标文件时，必须要有包含 main函数 的文件

//处理多个文件（不会报错）
g++ -o main main.cpp add.cpp time.cpp minus.cpp
g++ -o main main.i add.i time.i minus.i
g++ -o main main.s add.s time.s minus.s
g++ -o main main.o add.o time.o minus.o
g++ -o main main.cpp add.i time.s minus.o

//最后将生成可执行目标文件 main
```

-shared： 生成动态链接库
```cpp
//一般不对含有 main函数 的文件进行生成动态链接库操作，也不对单个文件进行生成动态链接库操作，但这样做都是没问题的，不会报错

//将生成 a.out 文件
g++ -shared main.cpp

//指定文件名
g++ -shared -o libmain.so main.cpp

//多个文件操作
g++ -shared -o libmath.so add.cpp time.cpp minus.cpp
g++ -shared -o libmath.so add.i time.i minus.i
g++ -shared -o libmath.so add.s time.s minus.s
g++ -shared -o libmath.so add.o time.o minus.o
g++ -shared -o libmath.so add.i time.s minus.o

//最终将生成 libmath.so 动态链接库
```

顺便提下如何生成静态链接库：静态链接库实际上 就是 多个可重定位目标文件 的集合体；g++ 没有提供生成静态链接库的选项，只需要使用 ar 打包命令就可以生成静态链接库了。
```cpp
ar -q libmath.a add.o time.o minus.o
```

-I： 附加包含目录
```
```

-L: 附加库（静态库）目录
```
```

-Wl,-rpath=: 附加库（动态库）目录
```
```

-l*： 附加库（默认链接动态链接库）
```
```

-static: 强制链接静态库
```
```



