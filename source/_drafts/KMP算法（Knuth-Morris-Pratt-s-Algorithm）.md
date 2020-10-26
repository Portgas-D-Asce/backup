---
title: KMP算法（Knuth-Morris-Pratt's Algorithm）
author: Portgas·D·Asce
categories:
  - [Data Structure & Algorithm]
tags:
  - 字符串
  - 字符串匹配
---

<!--more-->

## 1 问题描述
给定两个字符串 **主串**、**模式串**，判断 模式串 是否为 主串 的子串: 
- 如果是，返回 模式串 在 主串 中的位置；
- 否则，返回 -1；

## 2 Brute Force
设 主串 的长度为 $m$, 模式串 的长度为 $n$ : 
- 主串中长度为 $n$ 的子串共 $m - n + 1$ 个；
- 判断每个长度为 $n$ 的子串与模式串是否相等（时间复杂度为 $O(n)$）；

该方法的时间复杂度为 $O(mn)$。

## 3 KMP
KMP算法和Brute Force算法的主体思路是一样的，KMP 算法利用一个叫做 **部分匹配表（Partial Match Table, PMT）** 的结构跳过 Brute Force 过程中一些不必要的匹配，对 Brute Force进行了优化。

本结的思路是这样的：
- 先是，PMT 是什么；
- 然后是，KMP是如何利用 PMT 对 Brute Force 匹配进行优化的；
- 最后是，对如何计算 PMT；

### 3.1 PMT

**1、** 前缀和后缀
对于一字符串 $s$，我们可以将其写为两个字符串相加的形式：$s = a + b$, 其中 $a$、$b$ 均为非空字符串，则称 $a$ 为 $s$ 的 **前缀**，$b$ 为 $s$ 的 **后缀**。

以字符串 $s = abcabcabc$ 为例：
- 字符串 $a$、$ab$、$abc$、$abca$、$abcab$、$abcabc$、$abcabca$、$abcabcab$ 都是 $abcabcabc$ 的前缀，它们所构成的集合 $\{$ $a$、$ab$、$abc$、$abca$、$abcab$、$abcabc$、$abcabca$、$abcabcab$ $\}$ 称为 $abcdabc$ 的 **前缀集合**；
- 字符串 $bcabcabc$、$cabcabc$、$abcabc$、$bcabc$、$cabc$、$abc$、$bc$、$c$ 都是 $abcabcabc$ 的后缀，它们所构成的集合 $\{$ $bcabcabc$、$cabcabc$、$abcabc$、$bcabc$、$cabc$、$abc$、$bc$、$c$ $\}$ 称为 $abcdabc$ 的 **后缀集合**；

**2、** 交集

显然上述示例中，前缀集合和后缀集合的交集为 $\{$ $abcabc$、$abc$ $\}$ 。理解起来肯定是没问题的，但我们不妨往深再考虑一点，其实际意义是什么呢？

取两个 $abcabcabc$ 并以下列方式进行放置：
```
a b c a b c a b c
a b c a b c a b c
```
把第二个字符串向右移动，使两者之间发生错位：
```
a b c a b c a b c
  a b c a b c a b c
```
当移动到下面位置时，发现中间重叠部分相同：
```
a b c a b c a b c
      a b c a b c a b c
```
可见，前缀集合和后缀集合的交集的实际意义就是：
- 对两个相同的字符串进行错位，当其中间重叠部分相同时，相同的重叠部分就是交集中的元素。

**3、** PMT

**部分匹配**：
- 定义：一个字符串的前缀集合和后缀集合的交集中最长的元素称为该字符串的部分匹配；
- 实际意义：对两个相同的字符串进行错位，中间重叠部分相同时，最长的中间重叠部分；

**部分匹配表（PMT）：**
- 通常被称为 $next$ 数组；
- 定义：字符串的所有前缀的部分匹配的长度所构成的数组称为该字符串的PMT，其第 $i$ 个位置上的元素的值为，长度为 $i$ 的前缀的部分匹配的长度（字符串的前缀不包含空集，但在这里先暂时认为空集为字符串长度为 0 的前缀）；

下面，我们以求解 $abcabcabc$ 的 PMT 为例。

第0个位置上的元素：
- $s_0$ 为空字符串;
- $s_0$ 的前缀集合和后缀集合的交集为空；
- $s_0$ 的部分匹配为空字符串 ；
- $next[0] = 0$ ；

第1个位置上的元素：
- $s_1 = a$;
- $s_1$ 的前缀集合和后缀集合的交集为空；
- $s_1$ 的部分匹配为空字符串；
- $next[1] = 0$ ；

第2个位置上的元素：
- $s_2 = ab$;
- $s_2$ 的前缀集合和后缀集合的交集为空；
- $s_2$ 的部分匹配为空字符串；
- $next[2] = 0$ ；

...

第8个位置上的元素：
- $s_8 = abcabcab$;
- $s_8$ 的前缀集合和后缀集合的交集为 $\{ ab, abcab\}$；
- $s_8$ 的部分匹配为 $abcab$；
- $next[8] = 5$ ；

最终所得到的字符串的PMT（$next$ 数组）如下所示：
|   | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
| $s_i$ | 空串 | $a$ | $ab$ | $abc$ | $abca$ | $abcab$ | $abcabc$ | $abcabca$ | $abcabcab$ |
| 交集 | $\{\}$ | $\{\}$ | $\{\}$ | $\{\}$ | $\{ a \}$ | $\{ ab \}$ | $\{ abc \}$ | $\{$ $abca$、$a$ $\}$ | $\{$ $abcab$、$ab$ $\}$ |
| 部分匹配 | 空串 | 空串 | 空串 | 空串 | $a$ | $ab$ | $abc$ | $abca$ | $abcab$ |
| $next[i]$ | 0 | 0 | 0 | 0 | 1 | 2 | 3 | 4 | 5 |

### 3.2 匹配优化
示例：
- 主串：$abcabcabdabcabcabc$
- 模式串：$abcabcabc$

说明：
- $i$: 表示主串中，当前匹配字符的索引；
- $j$: 表示模式串中，当前匹配字符的索引；

**1、** 我们先按照 Brute Force 方法进行匹配一下：
```
                i
a b c a b c a b d a b c a b c a b c
a b c a b c a b c
                j

  i
a b c a b c a b d a b c a b c a b c
  a b c a b c a b c
  j

    i
a b c a b c a b d a b c a b c a b c
    a b c a b c a b c
    j

                i
a b c a b c a b d a b c a b c a b c
      a b c a b c a b c
                j
```

**2、** 下面我们再来看 KMP 是如何利用模式串的 PMT 来进行要匹配的：

```
                i
a b c a b c a b d a b c a b c a b c
a b c a b c a b c
                j

                i
a b c a b c a b d a b c a b c a b c
      a b c a b c a b c
                j
```

KMP匹配过程：
- 先按照 Brute Force 的方式进行匹配，发现：匹配到 $d$ 时，主串和模式串不匹配；
- 然后发现模式串已匹配的字符个数为 8，查看模式串的 PMT（3.1节中）可发现 $next[8] = 5$;
- 接着将模式串的当前匹配字符的索引 $j$ 调整 5；
- 然后直接从主串的当前索引 $i$ 和模式串的当前索引 $j$ 开始，再次开始进行匹配；

**3、** 先不着急往下，我们先思考下，为什么有了模式串的 PMT，我们就可以跳过那么多匹配过程？
- 首先明确一点：当主串和模式串不匹配时，主串和模式串的已匹配部分都是相同的（都为 $abcabcab$， 且为模式串的一个前缀）;
- 然后我们再看下 Brute Force 做了什么：
  - 先通将模式串右移一位，缩小中间重叠区域的范围，再比较中间重叠范围是否相同；
  - 如果中间范围不同，则继续右移一位，再判断是否相同，如此不断重复...
  
- 最后我们看下KMP究竟优化了 Brute Froce 的什么：
  - 3.1节曾说过“$next[i]$ 的实际意义：错位过程中，中间重叠部分相同时，中间重叠部分的最大长度”；
  - 于是，按照Brute Force 方法，在中间重叠区域缩短为 $next[i]$ 之前，中间重叠部分是不会相同的，可见 Brute Force 做了大量没有必要的工作。
  - 有了模式串的PMT，我们完全可以直接右移若干位，使得中间重叠部分的长度为 $next[i]$ ，也就是将模式串当前字符的索引 $j$ 调整为 $next[i]$

**4、** 理解了上述内容后，我们现在来看看 KMP 的整个匹配过程：

先按照 Brute Froce 进行匹配，直到主串与模式串发生不匹配：
```
                i
a b c a b c a b d a b c a b c a b c
a b c a b c a b c
                j
```
此时，已匹配字符串长度为 $j = 8$, 需要右移动模式串若干位，使得当前字符索引 $j = next[j] = next[8] = 5$：

```
                i
a b c a b c a b d a b c a b c a b c
      a b c a b c a b c
                j
```
此时，发现主串和模式串依然不匹配，已匹配字符串长度为 $j = 5$, 继续调整 $j = next[5] = 2$
```
                i
a b c a b c a b d a b c a b c a b c
            a b c a b c a b c
                j
```
仍然不匹配，已匹配字符串长度为 $j = 2$, 继续调整 $j = next[2] = 0$
```
                i
a b c a b c a b d a b c a b c a b c
                a b c a b c a b c
                j
```
还是不匹配，已匹配字符串长度 $j = 0$, 需要继续调整 $t = next[0] = 0$。oh， wait, wait, wait... 这不是相当于没调整啊，陷入死循环了，这可怎么办啊？

实际上，$next[0] = 0$ 恒成立，为了编程方便通常将其值设置为 $next[0] = -1$。当遇到 $j == -1$ 时，只需要 $++i; ++j$ 即可避免上述死循环问题。

```
                  i
a b c a b c a b d a b c a b c a b c
                  a b c a b c a b c
                  j
```
逐位进行匹配后，主串与模式串已完全匹配，我们也就找到了模式串在主串中的位置。

至此，KMP 如何使用 PMT 对 Brute Force 进行优化已经介绍完毕。

## 3.3 $next$ 数组计算

为了编程方便，设置：
- $next[0] = -1$ ；

根据 $next$ 数组的定义,有：
- $next[1] = 0$ ;

**1、第一种情况**
接下来，以字符串 $s = abcabcabc$ 为例，其$next[6] = 3$，这意味着：
```
           6
           |i
a b c a b c|a b c
      a b c a b c|a b c
            j    |
                 6
```
我们发现： $s[6] = s[3] = a$，且 $next[7] = 4$ ，也就是：
```
             7
             |i
a b c a b c a|b c
      a b c a b c a|b c
              j    |
                   7
```
**这表明，若 $next[i] = j$，则当 $s[i] = s[j]$ 时，有： $next[i + 1] = next[i] + 1$**

**2、第二种情况**
现在对字符串稍微改动下： $s = abcabcdbc$，此时 $next[6] = 3$ 依然成立：
```
           6
           |i
a b c a b c|d b c
      a b c a b c|d b c
            j    |
                 6
```
但 $s[6] != s[3]$ ， 导致 $next[7] != 4$ 。考虑到，此时求解 $next[7]$ 可转化为求解 $abcd$ 的部分匹配的长度。

$abcd$ 可分为两部分：
- 第一部分： $abc$ 为 $s$ 的长度为 3 的前缀；
- 第二部分： $d$ 为一个单字符；

若 第一部分的 部分匹配已求得，
- 如果其随后一位为 $d$，那么此时问题转化为第一种情况；
- 否则，问题依旧为第二种情况，不过第一部分的长度变得比之前短；迭代地进行第二种情况，直到转化为第一种情况或第一部分长度为 0 为止；

ps：此处示例不够典型，可以尝试求解 $adacadafadacadadmm$ 的 $next[16]$ 来理解第二种情况的处理过程。

### 3.4 实现
KMP 算法 ~~理解~~ 解释起来是有点难度的，但实现起来还是挺简单的。
```cpp
vector<int> get_next(const string& t) {
    vector<int> next(t.size(), -1);
    int i = 0, j = -1;
    while(i + 1 < t.size())
    {
        if(j == -1 || t[i] == t[j])
        {
            ++i;
            ++j;
            next[i] = j;
        }
        else
        {
           j = next[j];
        }
    }
    return next;
}

int kmp(const string& s, cosnt string& t) {
    const vector<int> next = get_next(t);
    int i = 0, j = 0;
    //必须要强制转换
    while(i < s.size() && j < (int)t.size())
    {
        if(j == -1 || s[i] == t[j])
        {
            ++i;
            ++j;
        }
        else
        {
            j = next[j];  
        }
    }
    return j == t.size() ? i - j : -1;
}
```
看上去 $kmp$ 代码 和 计算 $next$ 数组的代码有很多相同的地方，这是一个比较奇怪的问题，这里分析下为什么，主要有两点：
- 求 $next$ 数组，实际上是一个求解所有前缀的部分匹配的长度的过程，求解前缀的部分匹配需要进行逐字符对比，而 $kmp$ 也需要进行逐字符对比,这是两者相似的第一个原因；
- 求解 $next[i + 1]$ 需要依赖于 $next[0], next[1], ..., next[i]$，而 $kmp$ 依赖于 $next$ 数组，这是两者相似的第二个原因；

ps：由于两者较为相似就试图将两者硬扯到一块的想法，不敢苟同。两者所解决的问题在本质上是不同的：
- 计算 $next$ 数组的本质是：求解前缀的部分匹配；
- $kmp$ 的本质是：判断模式串是否为主串的子串；

### 3.5 时间复杂度

## 4 参考
[如何更好地理解和掌握 KMP 算法?](https://www.zhihu.com/question/21923021)



