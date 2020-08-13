---
title: OpenCV4.0 + OpenCV_contrib4.0编译
date: 2019-12-13 04:48:10
categories:
- [Library, OpenCV]
tags:
- OpenCV

---

OpenCV，多厉害就不用我吹了，反正牛逼的人都会用（不要脸地说，我也学过两天的），本文详细记录了OpenCV 4.0 + OpenCV_contrib 4.0的编译流程．

<!-- more -->

## 环境
电脑相关环境如下：
- 操作系统：Win10 64位
- VS：VS2015 专业版
- CMake：cmake-3.13.1

## 准备工作
- 官方并没有将OpenCV\_contrib库放置在官网上，而是将其放在了GitHub上；
- OpenCV源码版本与OpenCV\_contrib一定要匹配，我这里下载的都是4.0版本；
- CMake下载及安装：[下载地址](https://cmake.org/download/)
- OpenCV源码下载：[下载地址](https://opencv.org/opencv-4-0-0.html)
- OpenCV_contrib下载：[下载地址](https://github.com/opencv/opencv_contrib/releases)
## CMake
**1、运行CMake，界面如下所示：**
{% asset_img 1.png%}
**2、选择源码目录和输出目录**
- where is the source code：选择OpenCV源码解压缩路径；
- where to build the binaries：选择CMake编译结果生成路径；

{% asset_img 2.png%}

**3、点击Configure按钮，配置VS（这里要根据自己VS版本来选）**
{% asset_img 3.png%}
**4、点击Finish按钮，界面如下图所示：**
{% asset_img 4.png%}
**5、稍等一会，最终界面会如下所示，出现"Configuring done"则表明成功可以继续下一步：**
{% asset_img 5.png%}
因为国内网络问题，ippicv下载经常会失败，进而导致失败，一种解决方案是自己下载对应版本的ippicv并进行配置，这里不进行详细介绍。

**6、选择OpenCV\_contrib源码（一）**
复制"OPENCV\_EXTRA\_MODULES\_PATH"到Search后面文本框，界面如下：
{% asset_img 6.png%}
**7、选择OpenCV\_contrib源码（二）**
将点击Value后面的按钮，选择OpenCV\_contrib解压路径：
{% asset_img 7.png%}
**8、启用SIFT、SURF等模块**
- 如果要使用SIFT、SURF等模块，复制"OPENCV\_ENABLE\_NONFREE"到Search,然后把Value中框勾选上；
- 这里如果不勾选"OPENCV_ENABLE_NONFREE"后面的框，后面运行SIFT特征检测、特征匹配等，运行会抛出异常：OpenCV(4.0.0) Error: The function/feature is not implemented (This algorithm is patented and is excluded in this configuration; Set OPENCV_ENABLE_NONFREE CMake option and rebuild the library) in cv::xfeatures2d::SURF::create, file F:\opencv_contrib-4.0.0\modules\xfeatures2d\src\surf.cpp, line 1029；
- 当然如果不需要使用这些的话，这一步可以跳过；

{% asset_img 8.png%}
**9、启用CUDA**
- 如果要使用CUDA加速模块，复制"WITH\_CUDA"到Search，然后把Value中框勾选上；
- 同样如果不需要CUDA模块，可以跳过这一步；

{% asset_img 9.png%}
**10、再次点击Configure按钮**
- 如果启用了CUDA模块，如果CUDA安装正确，正如下图所示，会出现"CUDA detected: 9.2"等字样；

{% asset_img 10.png%}
**11、稍等一会，再次出现"Configuring done"则表明成功可以继续下一步**
{% asset_img 11.png%}
**12、点击Generate按钮，出现如下界面：**
{% asset_img 12.png%}
**13、稍等一会，出现"Configuring done"和"Generating done"则表明CMake已编译成功**
{% asset_img 13.png%}
## Vs编译
**1、在CMake编译结果路径下找到"OpenCV.sln"，双击运行，界面如下：**
{% asset_img 14.png%}
**2、 点击生成->批生成，并选中以下四项，最后点击生成即可：**
{% asset_img 15.png%}
**3、编译的时间比较漫长，晚上编译，第二天早上肯定就编译好了**

## OpenCV开发环境搭建
开发环境搭建主要用到VS编译结果install文件夹底下的内容

**1、新建一个Win32控制台应用程序**
{% asset_img 16.png%}
**2、添加环境变量**
找到VS编译结束后动态链接库的路径(E:\MyCV\install\x64\vc14\bin)，并将其添加到Path环境变量底下（当然你也可以将所有动态链接库复制粘贴到工程根目录底下，这样也行。为了方便，我们这里选择添加到Path环境变量下）。
{% asset_img 17.png%}
**3、添加附加包含目录（E:\MyCV\install\include 和 E:\MyCV\install\include\opencv2）**
- 当然你也可以只添加E:\MyCV\install\include，这样的话后面使用OpenCV时，每个include都必须带上“opencv2/”，例如：#include <opencv2/opencv.hpp>，这样include后面的东西可能会很长，为了避免这种情况我们一般将E:\MyCV\install\include\opencv2也添加到了附加包含目录；
- 如果你不介意include后面东西很长，只需要将E:\MyCV\install\include添加到附加包含目录就行；
- E:\MyCV\install\include是必须的，E:\MyCV\install\include\opencv2是非必需的； 

{% asset_img 18.png%}
**4、添加附加库目录（E:\MyCV\install\x64\vc14\lib）**
{% asset_img 19.png%}
**5、添加附加依赖项**
OpenCV官网上将模块划分为Main modules 和 Extra modules两部分（如下图所示）：

{% asset_img 20.png%}

添加附加依赖项：
- 一般将Main modules部分的依赖项全部添加进来，Extra modules部分用到哪个后面再添加它就行；
- 因为配置的是Debug模式，所以附加依赖项都采用带d的；
- opencv_xfeatures2d400d.lib属于Extra modules部分，因为后面用到，所以将它也添加了进来。

下面面为所需添加的附加依赖项（复制粘贴）：
```
opencv_core400d.lib  
opencv_imgproc400d.lib  
opencv_imgcodecs400d.lib  
opencv_videoio400d.lib  
opencv_highgui400d.lib  
opencv_video400d.lib  
opencv_calib3d400d.lib  
opencv_features2d400d.lib  
opencv_objdetect400d.lib  
opencv_dnn400d.lib  
opencv_ml400d.lib  
opencv_flann400d.lib  
opencv_photo400d.lib  
opencv_stitching400d.lib  
opencv_gapi400d.lib  
opencv_xfeatures2d400d.lib
```
{% asset_img 21.png%}
## 测试
**1、测试代码（SIFT图像匹配）**
```
#include <opencv2/opencv.hpp>
#include "opencv2/highgui.hpp"
#include "opencv2/xfeatures2d.hpp"
using namespace cv;
using namespace cv::xfeatures2d;
using namespace std;

int main()
{
	Ptr<SIFT> detector = SIFT::create();
	Mat src1 = imread("1.jpg", IMREAD_GRAYSCALE);
	Mat src2 = imread("2.jpg", IMREAD_GRAYSCALE);
	std::vector<KeyPoint> keypoints1, keypoints2;
	Mat descriptors1, descriptors2;
	detector->detectAndCompute(src1, noArray(), keypoints1, descriptors1);
	detector->detectAndCompute(src2, noArray(), keypoints2, descriptors2);

	Ptr<DescriptorMatcher> matcher = DescriptorMatcher::create(DescriptorMatcher::BRUTEFORCE);
	std::vector<DMatch> matches;
	matcher->match(descriptors1, descriptors2, matches);

	Mat img_matches;
	drawMatches(src1, keypoints1, src2, keypoints2, matches, img_matches);
	imwrite("3.jpg", img_matches);
	imshow("match", img_matches);
	waitKey();
	system("pause");
	return 0;
}
```
**2、测试图片**
{% asset_img 22.png%}
{% asset_img 23.png%}
**3、测试结果**
{% asset_img 24.png%}
## 参考文献
[OpenCV学习笔记（八）—— OpenCV 3.1.0 + opencv_contrib编译（Windows）](https://blog.csdn.net/linshuhe1/article/details/51221015)  
[Opencv3.1.0+opencv_contrib配置及使用SIFT测试](https://blog.csdn.net/NNNNNNNNNNNNY/article/details/52182091)  
[添加OpenCV_contrib库至OpenCV3.1.0中（Windows 64位 环境下编译OpenCV3.1.0和OpenCV_contrib）](https://blog.csdn.net/liu798675179/article/details/51259505)  
[opencv4+contrib 编译](https://blog.csdn.net/andylanzhiyong/article/details/84333365)  
[【opencv3.3】VS2015+opencv3.3 GPU模块编译（包含opencv_contrib模块）](https://blog.csdn.net/qq_15947787/article/details/78534272)  