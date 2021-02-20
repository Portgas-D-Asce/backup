---
title: libpng
author: Portgas·D·Asce
categories:
  - [Image Processing]
tags:
  - Image Processing
date: 2021-02-20 16:47:40
---

通过实现一些简单的功能，来了解 libpng 的使用。

编译：
```bash
gcc x.cpp -lpng
```

## 1 另存为

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <png.h>
#include <zlib.h>

int main() {
    char path_src[512] = "./data/src.png";
    //char path_src[512] = "./data/1.jpg";
    char path_dst[512] = "./res/dst.png";

    png_image image;
    memset(&image, 0, sizeof(image));
    image.version = PNG_IMAGE_VERSION;
    //读取文件
    if(png_image_begin_read_from_file(&image, path_src) == 0) {
        fprintf(stderr, "error: %s\n", image.message);
        return 0;
    }
    //申请内存
    png_bytep buffer = malloc(PNG_IMAGE_SIZE(image));
    if(buffer == NULL) {
        png_image_free(&image);
        return 0;
    }
    
    if(png_image_finish_read(&image, NULL, buffer, 0, NULL) == 0) { //缓冲到内存
        fprintf(stderr, "buffer error: %s\n", image.message);
    } else if(png_image_write_to_file(&image, path_dst, 0, buffer, 0, NULL) == 0) { //另存为
        fprintf(stderr, "resave error: %s\n", image.message);
    } else {
        printf("resave successfully!\n");
    }

    free(buffer);
    png_image_free(&image);

    return 0;
}
```

## 2 镜像

```cpp
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include <png.h>
#include <zlib.h>

//水平镜像
void mirror(png_bytep buffer, int w, int h, int c) {
     for(int i = 0; i < h; ++i) {
        int base = i * w * c;
        for(int j = 0, k = w - 1; j < k; ++j, --k) {
            int p = base + j * c;
            int r = base + k * c;
            for(int x = 0; x < c; ++x) {
                int temp = buffer[p + x];
                buffer[p + x] = buffer[r + x];
                buffer[r + x] = temp;
            }
        }
    }
}

int main() {
    char path_src[512] = "./data/src.png";
    char path_mirror[512] = "./res/mirror.png";

    png_image image;
    memset(&image, 0, sizeof(image));
    image.version = PNG_IMAGE_VERSION;

    if(png_image_begin_read_from_file(&image, path_src) == 0) {
        fprintf(stderr, "error: %s\n", image.message);
        return 0;
    }
    //宽/高度
    int w = image.width, h = image.height;
    //波段数
    int channels = PNG_IMAGE_PIXEL_CHANNELS(image.format);
    //像素深度
    //int depth = PNG_IMAGE_PIXEL_COMPONENT_SIZE((image).format);

    png_bytep buffer = malloc(PNG_IMAGE_SIZE(image));
    if(buffer == NULL) {
        png_image_free(&image);
        return 0;
    }

    //缓冲到内存
    if(png_image_finish_read(&image, NULL, buffer, 0, NULL) == 0) {
        fprintf(stderr, "buffer error: %s\n", image.message);
    } else {
        mirror(buffer, w, h, channels);

        if(png_image_write_to_file(&image, path_mirror, 0, buffer, 0, NULL) == 0) {
            fprintf(stderr, "save error: %s\n", image.message);
        } else {
            printf("mirror success\n");
        }
    }

    free(buffer);
    png_image_free(&image);

    return 0;
}
```

