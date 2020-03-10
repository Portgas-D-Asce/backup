---
title: Sorted Matrix
tags:
- search
---
<!-- more -->
## 1 定义
排序矩阵：每行，每列都按照从小到大（从大到小）的顺序排列的数组（a matrix where each of the rows and columns are sorted in ascending order）。

## 2 相关问题
## 2.1 查找指定元素是否存在
## 2.2 查找第k小元素
## 3 扩展
有两个跟排序矩阵比较相似的矩阵，姑且先分别称乎它们为 "Row Sorted Matrix" 和 "Column Sorted Matrix"：
- Row Sorted Matrix：每行都按从小到大的顺序排列，行号大的行的所有元素 都大于 行号小的行的所有元素；
- Column Sorted Matrix：每列都按从小到大的顺序排列，列号大的列的所有元素 都大于 列号小的列的所有元素；
- 显然，上面两种矩阵可以转换为排序数组，所以用途较少，但还是有提出来的必要的；

思考：那由若干个长度相同的排序数组随机垛叠起来的矩阵，又该如何命名，它有被提出来的必要吗？
