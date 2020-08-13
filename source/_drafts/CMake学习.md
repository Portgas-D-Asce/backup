---
title: CMake学习
categories:
  - []
tags:
  - null
---

<!--more-->
## 关于third-party
### 只包含头文件
有一部分第三方库只有头文件构成，使用时只需要包含相关头文件即可。
- 较小的第三方库通常没有CMakeLists.txt文件：自然也就没有project命令，可见它并没有拥有独立工程这一身份；另外，当然不能对其调用add_subdirectory命令；
- 稍大一点的第三方库通常会包含CMakeLists.txt文件：通常，拥有独立工程这一身份；当然dd_subdirectory是必不可少的；
- 只包含头文件的第三方库都通常是一个空工程，没有add_library。

## 既包含头文件又包含源文件
通常，有CMakeLists.txt文件:：
- 需要对其调用add_subdirectory命令；- 拥有独立工程这一身份；
- 调用add_library命令生成库对其进行封装；
- 依赖其的模块需要调用target_link_libraries命令

