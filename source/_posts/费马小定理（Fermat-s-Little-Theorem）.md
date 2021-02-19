---
title: 费马小定理（Fermat's Little Theorem）
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 基础算法
  - 数论
date: 2021-02-20 00:07:28
---

**费马小定理:** 若 $p$ 为素数，$a$ 为任意自然数，则：
$$a^p\ \equiv\ a\ (mod\ p)$$

## 1 证明（数学归纳法）

当 $a = 1$ 时，$1^p\ \equiv\ 1\ (mod\ p)$ 显然成立

假设当 $a = x$ 时， $x^p\ \equiv\ x\ (mod\ p)$ 成立，则有：$p\ |\ (x^p - x)$

当 $a = x + 1$ 时：
$$
\begin{aligned}
(x + 1)^p - (x + 1)
&\ =\ \sum_{k = 0}^{p} C_p^k x^k - x - 1 \\ \\
&\ =\ \sum_{k = 1}^{p - 1} C_p^k x^k + (x^p - x)
\end{aligned}
$$

因为 $C_p^k \ =\ \frac{p!}{k!(p - k)!}$，并且 $p$ 为素数，所以：
$$p\ |\ C_p^k, k \in [1, p - 1]$$

又因为 $p\ |\ (x^p - x)$, 所以：
 $$p\ |\ (x + 1)^p - (x + 1)$$

也就是说：
$$(x + 1)^p\ \equiv\ (x + 1)\ (mod\ p)$$

证毕。

## 2 另一种型式
若 $p$ 为素数，对任意自然数 $a$ 都有：
$$a^{p - 1}\ \equiv\ 1\ (mod\ p)$$


根据费马小定理有：
$$p\ |\ (a^p - a)$$

也就是：
$$p\ |\ [\ a \times(a^{p - 1} - 1)\ ]$$

$p$ 显然不能整除 $a$, 则说明:
$$p\ |\ (a^{p - 1} - 1)$$

也就是：
$$a^{p - 1}\ \equiv\ 1\ (mod\ p)$$

## 3 应用
- 素性检验
- 乘法逆元
