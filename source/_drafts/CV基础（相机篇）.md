---
title: CV基础（相机篇）
date: 2019-12-24 11:20:40
categories:
- [计算机视觉]
---

<!-- more -->
## 1 术语
像幅大小：1920 * 1080
传感器尺寸：10mm * 8mm（或者只说较长的那一个尺寸）
焦距：10.4mm

### 2 内参矩阵（Camera Intrinsics，K）

建立了像素坐标和相机坐标系的关系：

$
\left[
\begin{matrix}
  u \\
  v \\
  1 
\end{matrix}
\right]
=
\left[
\begin{matrix}
  f_x & 0 & ppx \\
  0 & f_y & ppy \\
  0 & 0 & 1 
\end{matrix}
\right]
\left[
\begin{matrix}
  X \\
  Y \\
  Z
\end{matrix}
\right]
$

ps：
- 右侧计算结果可以理解为像素坐标的齐次表示；
- $f_x, f_y$，单位为像素，一般两者相等；

## 3 外参矩阵（Camera Extrinsics, T）
建立了相机坐标系和世界坐标系之间的关系
- 旋转矩阵 $R$ 是将世界坐标转化为相机坐标；
- 位移 $t$ 是相机在世界坐标系中的坐标取负值；

### 3.1 非齐次表示
$p_c = R * p_w + t$

$
\left[
\begin{matrix}
  X_c \\
  Y_c \\
  Z_c
\end{matrix}
\right]
=
\left[
\begin{matrix}
  r_{11} & r_{12} & r_{13} \\
  r_{21} & r_{22} & r_{23} \\
  r_{31} & r_{32} & r_{33} 
\end{matrix}
\right]
\left[
\begin{matrix}
  X_w \\
  Y_w \\
  Z_w 
\end{matrix}
\right]
+
\left[
\begin{matrix}
  {t_1} \\
  {t_2} \\
  {t_3} 
\end{matrix}
\right]
$
### 3.2 齐次表示
$p_c = T * p_w$

$
\left[
\begin{matrix}
  X_c \\
  Y_c \\
  Z_c \\
  1
\end{matrix}
\right]
=
\left[
\begin{matrix}
  r_{11} & r_{12} & r_{13} & {t_1} \\
  r_{21} & r_{22} & r_{23} & {t_2} \\
  r_{31} & r_{32} & r_{33} & {t_3} \\
  0 & 0 & 0 & 1
\end{matrix}
\right]
\left[
\begin{matrix}
  X_w \\
  Y_w \\
  Z_w \\
  1
\end{matrix}
\right]
$
## 3 畸变
