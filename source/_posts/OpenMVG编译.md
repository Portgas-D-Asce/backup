---
title: OpenMVG编译
date: 2019-12-12 20:31:08
categories:
- [Library, OpenMVG]
tags:
- SfM
- OpenMVG

---

目前关于稀疏重建的开源库不多，不过也不少，OpenMVG是其中的佼佼者之一，本文详细记录了OpenMVG的编译过程．

 <!-- more -->
 
## 配置
配置情况：

- 操作系统：Win10 64位
- VS：VS2015 专业版
- CMake：cmake-3.13.1

## 准备工作
OpenMVG源码及依赖的第三方库下载：

- [OpenMVG源码](https://github.com/openMVG/openMVG)
- [glfw](https://github.com/glfw/glfw)
- [osi_clp](https://github.com/openMVG-thirdparty/osi_clp)
- [cereal](https://github.com/openMVG-thirdparty/cereal)

下载完成后，解压，并将第三方库放在OpenMVG源码 openMVG-master\src\dependencies 路径对应文件夹下。以 glfw 为例：
{% asset_img 1.png%}

## CMake
**1、打开CMake，选择OpenMVG源码路径和输出目录**
{% asset_img 2.png%}
**2、点击Configure按钮，配置VS**
{% asset_img 3.png%}
**3、点击 finish 后，出现如下界面（configuring done），则表明可进行下一步**
{% asset_img 4.png%}
**4、修改编译结果输出路径（复制 “CMAKE_INSTALL_PREFIX”，然后选择输出路径，这里使用默认）**
{% asset_img 5.png%}
**5、再次点击 configure 按钮，再次出现 configuring done ，则表明可以开始编译了**
{% asset_img 6.png%}
**6、点击 generate 生成 OpenMVG 工程文件（generating done 表明生成成功）**
{% asset_img 7.png%}
## VS编译
**1、在CMake编译结果路径下找到"openMVG.sln"，双击运行，界面如下：**
{% asset_img 8.png%}
**2、选择ALL_BILUD子项目,编译debug版或release版（这里选择Debug x64）**
{% asset_img 9.png%}
**3、关闭VS并以管理员身份重启VS,编译INSTALL子项目,则可在CMAKE_INSTALL_PREFIX路径中得到最终结果（与上一步保持一致，同样是Debug x64）**
- 之前没有修改路径，所以输出结果在默认路径C:/Program Files/openMVG下

{% asset_img 10.png%}
{% asset_img 11.png%}

## 示例
防止C盘被占满，这里将编译结果拷贝到了D:\SoftWare\OpenMVG 路径下

**1、新建 Win32 控制台程序**
- 由于编译的是 Debug x64，所以需要将配置平台修改为 Debug x64

**2、添加附加包含目录**
- D:\SoftWare\OpenMVG\include
- D:\SoftWare\OpenMVG\include\openMVG\third_party\eigen

**3、添加附加包含库目录**
- D:\SoftWare\OpenMVG\lib

**4、添加附加依赖项**

- openMVG_image.lib
- openMVG_features.lib
- openMVG_matching.lib
- openMVG_jpeg.lib
- openMVG_png.lib
- openMVG_tiff.lib
- openMVG_zlib.lib

**5、C/C++——>预处理器——>预处理器定义，将“_USE_MATH_DEFINES”添加进去，否则后面会报错**
- error C2065: “M_PI”: 未声明的标识符

**6、测试代码**
```
#include <iostream>

#include <openMVG/image/image_io.hpp>
#include <openMVG/image/image_concat.hpp>
#include <openMVG/features/feature.hpp>
#include <openMVG/features/sift/SIFT_Anatomy_Image_Describer.hpp>
#include <openMVG/features/svg_features.hpp>
#include <openMVG/matching/regions_matcher.hpp>
#include <openMVG/matching/svg_matches.hpp>

using namespace std;

using namespace openMVG;
using namespace openMVG::image;
using namespace openMVG::features;
using namespace openMVG::matching;

int main()
{
	const string jpg_filenameL = "1.jpg";
	const string jpg_filenameR = "2.jpg";

	Image<unsigned char> imageL, imageR;
	ReadImage(jpg_filenameL.c_str(), &imageL);
	ReadImage(jpg_filenameR.c_str(), &imageR);

	std::unique_ptr<Image_describer> image_describer(new SIFT_Anatomy_Image_describer);
	std::map<IndexT, std::unique_ptr<features::Regions>> regions_perImage;
	image_describer->Describe(imageL, regions_perImage[0]);
	image_describer->Describe(imageR, regions_perImage[1]);

	const SIFT_Regions* regionsL = dynamic_cast<SIFT_Regions*>(regions_perImage.at(0).get());
	const SIFT_Regions* regionsR = dynamic_cast<SIFT_Regions*>(regions_perImage.at(1).get());

	const PointFeatures
		featsL = regions_perImage.at(0)->GetRegionsPositions(),
		featsR = regions_perImage.at(1)->GetRegionsPositions();

	// Show both images side by side
	{
		Image<unsigned char> concat;
		ConcatH(imageL, imageR, concat);
		string out_filename = "01_concat.jpg";
		WriteImage(out_filename.c_str(), concat);
	}
	const bool bVertical = false;
	//- Draw features on the two image (side by side)
	{
		Features2SVG
		(
			jpg_filenameL,
			{ imageL.Width(), imageL.Height() },
			regionsL->Features(),
			jpg_filenameR,
			{ imageR.Width(), imageR.Height() },
			regionsR->Features(),
			"02_features.svg",
			bVertical
		);
	}

	std::vector<IndMatch> vec_PutativeMatches;
	//-- Perform matching -> find Nearest neighbor, filtered with Distance ratio
	{
		// Find corresponding points
		matching::DistanceRatioMatch(
			0.8, matching::BRUTE_FORCE_L2,
			*regions_perImage.at(0).get(),
			*regions_perImage.at(1).get(),
			vec_PutativeMatches);

		IndMatchDecorator<float> matchDeduplicator(
			vec_PutativeMatches, featsL, featsR);
		matchDeduplicator.getDeduplicated(vec_PutativeMatches);

		std::cout
			<< regions_perImage.at(0)->RegionCount() << " #Features on image A" << std::endl
			<< regions_perImage.at(1)->RegionCount() << " #Features on image B" << std::endl
			<< vec_PutativeMatches.size() << " #matches with Distance Ratio filter" << std::endl;

		// Draw correspondences after Nearest Neighbor ratio filter
		Matches2SVG
		(
			jpg_filenameL,
			{ imageL.Width(), imageL.Height() },
			regionsL->GetRegionsPositions(),
			jpg_filenameR,
			{ imageR.Width(), imageR.Height() },
			regionsR->GetRegionsPositions(),
			vec_PutativeMatches,
			"03_Matches.svg",
			bVertical
		);
	}
	system("pause");
    return 0;
}
```
**7、测试图片**

{% asset_img 12.jpg%}
{% asset_img 13.jpg%}

**8、输出结果**
{% asset_img 14.png%}
{% asset_img 15.png%}
{% asset_img 16.png%}
## 参考文献
[openMVG 编译安装指南](https://blog.csdn.net/u012512679/article/details/53116641)

[VS2017 C++ 程序报错“error C2065: “M_PI”: 未声明的标识符"](https://blog.csdn.net/liu_feng_zi_/article/details/84816763)

