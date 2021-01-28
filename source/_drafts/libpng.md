---
title: libpng
author: Portgas·D·Asce
categories:
  - [Image Processing]
tags:
  - Image Processing
date: 2021-01-27 15:39:09
---

<!--more-->

## 读取 png 图像
```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <png.h>
#include <zlib.h>

int main() {
    char path_src[512] = "./1.png";
    char path_dst[512] = "./2.png";

    png_image image;
    memset(&image, 0, sizeof(image));
    image.version = PNG_IMAGE_VERSION;

    //读取文件失败
    if(png_image_begin_read_from_file(&image, path_src) == 0) {
        fprintf(stderr, "error: %s\n", image.message);
        return 0;
    }
    
    //image.format = PNG_FORMAT_RGBA;

    png_bytep buffer = malloc(PNG_IMAGE_SIZE(image));
    //申请内存失败
    if(buffer == NULL) {
        png_image_free(&image);
        return 0;
    }

    //缓冲到内存失败
    if(png_image_finish_read(&image, NULL, buffer, 0, NULL) == 0) {
        free(buffer);
        png_image_free(&image);
        fprintf(stderr, "error: %s\n", image.message);
        return 0;
    }

    if(png_image_write_to_file(&image, path_dst, 0, buffer, 0, NULL) == 0) {
        fprintf(stderr, "error: %s\n", image.message);
        return 0;
    }

    printf("resave successfully!\n");

    return 0;
}
```


## 封装（C++）
```cpp
class ImagePng {
private:
    png_structp png_ptr;
    png_infop info_ptr;
public:
    ImagePng(const string &path) {

    }
};
```
