---
title: Markdown常用操作
author: Portgas·D·Asce
categories:
  - [Tools & Skills]
tags:
  - Markdown
date: 2021-01-09 15:45:33
---

## 1 表格
```
|     | A    | B   | ... | C   |
| :-: |  :-: | :-: | :-: | :-: |
|  1  |
|  2  |
| ... |
|  n  |
```
|| A | B | ... | C |
| :-: |  :-: | :-: | :-: | :-: |
| 1 |
| 2 |
| ... |
| n |

# 2 Latex
## 2.1 常用符号
| 代码 | 显示 |
| :-:| :-: |

## 2.2 公式推导
$$
\begin{aligned}
y
& = x^2 - 1 \\
& = (x + 1)(x - 1) \\
\end{aligned}
$$
```
$$
\begin{aligned}
y
& = x^2 - 1 \\
& = (x + 1)(x - 1) \\
\end{aligned}
$$
```
## 2.3 函数

### 2.3.1 分段函数
$$
f(x) = 
\begin{cases}
-1 & ,x < 0 \\
0 & ,x = 0 \\
1 & ,x > 0
\end{cases}
$$
```
$$
f(x) = 
\begin{cases}
-1 & ,x < 0 \\
0  & ,x = 0 \\
1  & ,x > 0
\end{cases}
$$
```
## 2.4 矩阵
$$
\begin{bmatrix}
0      & 1      & \cdots & 0 \\
-1     & 0      & \cdots & 0 \\
\vdots & \vdots & \ddots & 0 \\
0      & 0      & \cdots & 0
\end{bmatrix}
$$
```
$$
\begin{bmatrix}
0      & 1      & \cdots & 0 \\
-1     & 0      & \cdots & 0 \\
\vdots & \vdots & \ddots & 0 \\
0      & 0      & \cdots & 0
\end{bmatrix}
$$
```