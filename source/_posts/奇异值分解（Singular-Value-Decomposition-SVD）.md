---
title: '奇异值分解（Singular Value Decomposition, SVD）'
categories:
  - []
tags:
  - null
date: 2020-07-07 01:02:57
---

<!--more-->

## 特征值分解

## 奇异值分解

## 奇异值分解压缩图像
图像本质上可以看作是一个二维矩阵，因此，我们也可以对其进行 SVD 分解，这没毛病。但是利用它来压缩图片是怎么回事呢，下面我们就来看看。


本文基于 OpenCV 对其进行了实现，以下为实现代码：
```
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

#include <vector>
using namespace cv;
using namespace std;

Mat svd_compress(const Mat& src_channel, int k) {
    Mat temp;
    src_channel.convertTo(temp, CV_32FC1);
    
    Mat U, w, Vt;
    SVD::compute(temp, w, U, Vt);   //opencv得到的V已经经过转置了

    Mat res(src_channel.size(), CV_32FC1, Scalar(0));
    for(int i = 0; i < k; ++i)
    {
        res += w.ptr<float>(i)[0] * (U.col(i) * Vt.row(i));
    }

    //w为一个行矩阵，而非对角阵
    /*Mat W(w.rows, w.rows, CV_32FC1, Scalar(0));
    for (int i = 0; i < k; i++)
        W.ptr<float>(i)[i] = w.ptr<float>(i)[0];
    res = U * W * Vt;*/

    return res;
}

int main() {
    Mat src = imread("../data/1.jpg");
    imshow("原图", src);
    vector<Mat> src_channels;
    split(src, src_channels);

    vector<Mat> dst_channels(src.channels());
    const int k = 20;
    for(int i = 0; i < src_channels.size(); ++i)
    {
        dst_channels[i] = svd_compress(src_channels[i], k);
        dst_channels[i].convertTo(dst_channels[i], CV_8UC1);
    }
    Mat dst;
    merge(dst_channels, dst);
    imshow("压缩图", dst);
    waitKey(0);

    
    return 0;
}
```
以下为实现效果图：

原图，1080 * 1920：

{% asset_img 1.png %}

$k = 10, 压缩比：$
{% asset_img 1.png %}

$k = 100, 压缩比：$
{% asset_img 1.png %}

$k = 500, 压缩比：$
{% asset_img 1.png %}

当 k = 时，压缩后的图像与原图看起来基本一样，此时压缩比为。。。，可见，压缩效率还是挺好的。

## 参考
[https://www.cnblogs.com/endlesscoding/p/10033527.html](https://www.cnblogs.com/endlesscoding/p/10033527.html)

[https://cosx.org/2014/02/svd-and-image-compression](https://cosx.org/2014/02/svd-and-image-compression)