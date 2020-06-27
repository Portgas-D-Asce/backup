---
title: CMake学习（一）
categories:
  - [Tool, CMake]
tags:
  - CMake
date: 2020-05-26 23:50:44
---

<!--more-->
## 1 Hello World

**1.新建工程文件夹 pro**

**2.在 pro 中创建 main.cpp 文件**
```
#include <iostream>
using namespace std;

int main(){
  cout << "hello world!" << endl;
  return 0;
}
```
**3.在 pro 中创建 CMakeLists.txt 文件**
```
cmake_minimum_required(VERSION 3.10)

project(hello)

add_executable(main main.cpp)
```
**4.打开终端，cd 到 pro 下，执行以下命令**
```
cmake .
make
./main
```

## 2 内部/外部构建



