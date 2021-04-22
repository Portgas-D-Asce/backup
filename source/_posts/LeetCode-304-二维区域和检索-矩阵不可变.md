---
title: LeetCode 304. 二维区域和检索 - 矩阵不可变
author: Portgas·D·Asce
categories:
  - [LeetCode]
tags:
  - 刷题
  - 矩阵
date: 2021-04-22 19:54:33
---

题目直达：[304. 二维区域和检索 - 矩阵不可变](https://leetcode-cn.com/problems/range-sum-query-2d-immutable/)

## 分析
构建矩阵的前缀和：
$$matrix[i][j] += matrix[i - 1][j] + matrix[i][j - 1] - matrix[i - 1][j - 1]$$

时间复杂度：$O(mn)$

常数时间计算任意子矩阵的和$(r1, c1, r2, c2)$：
$$sum = matrix[r2][c2] - matrix[r1 - 1][c2] - matrix[r2][c1 - 1] + matrix[r1 - 1][c1 - 1]$$

边界处理：
- 可以在左侧加一列 0 并在上方 加一行 0；
- 对边界情况进行特判；

## 代码（对边界进行特判）
```cpp
class NumMatrix {
public:
    NumMatrix(vector<vector<int>>& mat) {
        matrix = mat;
        int m = matrix.size();
        int n = matrix[0].size();
        for(int i = 1; i < m; ++i) {
            matrix[i][0] += matrix[i - 1][0];
        }
        for(int i = 1; i < n; ++i) {
            matrix[0][i] += matrix[0][i - 1];
        }
        for(int i = 1; i < m; ++i) {
            for(int j = 1; j < n; ++j) {
                matrix[i][j] += matrix[i - 1][j] + matrix[i][j - 1] - matrix[i - 1][j - 1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        int row = row1 - 1;
        int temp1 = row < 0 ? 0 : matrix[row][col2];
        int col = col1 - 1;
        int temp2 = col < 0 ? 0 : matrix[row2][col];
        int temp3 = row < 0 || col < 0 ? 0 : matrix[row][col];
        return matrix[row2][col2] - temp1 - temp2 + temp3;
    }
private:
    vector<vector<int>> matrix;
};
```
