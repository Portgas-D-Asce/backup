---
title: find_package
categories:
  - [Tool, CMake]
tags:
  - CMake
---

<!--more-->
发现外部工程，并加载其设置。
## 基本使用
```
find_package(<PackageName> [version] [EXACT] [QUIET] [MODULE]
             [REQUIRED] [[COMPONENTS] [components...]]
             [OPTIONAL_COMPONENTS components...]
             [NO_POLICY_SCOPE])
```
查找外部工程并加载其设置。隐式定义的变量\<PackageName\>_FOUND表明是否查找到工程。