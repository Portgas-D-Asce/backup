---
title: '[GlobalACSfM ICCV 2013] Global Fusion of Relative Motions for Robust Accurate and Scalable Structure from Motion'
date: 2019-12-19 21:54:24
categories:
- [Article]
tags:
- SfM
---
<!-- more -->
## 1 原文
<embed src="[GlobalACSfM ICCV 2013] Global Fusion of Relative Motions for Robust Accurate and Scalable Structure from Motion.pdf">
## 2 笔记
### 2.1 相对旋转
$p_j = R_{ij} * p_i$

$R_{ij} * R_{ji} = E$
### 2.2 绝对旋转
$R_i$ 本质上是 $R_{gi}$
$p_i = R_{gi} * p_g = R_i * p_g$
### 2.3 相对旋转与绝对旋转关系
$R_j = R_{ij} * R_i$
