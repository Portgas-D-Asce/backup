---
title: Linux ls 命令实现
author: Portgas·D·Asce
categories:
  - [Linux]
tags:
  - Linux
date: 2021-03-17 18:19:57
---

```cpp
#include <stdio.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/stat.h>
#include <pwd.h>
#include <grp.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>
#include <sys/ioctl.h>
#include <termios.h>

#define max(a, b) ((a) > (b) ? (a) : (b))
#define min(a, b) ((a) > (b) ? (b) : (a))

#define COLOR(fg, bg, msg) "\033[1"#fg "" #bg "m" msg "\033[0m"
#define FG_BLUE(msg) COLOR(;34, , msg)
#define FG_GREEN(msg) COLOR(;32,, msg)
#define BG_RED(msg) COLOR(;37, ;41, msg)

enum OPTION {
	OPTION_A = 1,
	OPTION_L = 2
};

typedef struct node {
    char dugo[16];
    char link[16];
    char user[32];
    char group[32];
    char size[16]; 
    char time[16];
    char name[1024];
    struct node *next;
} Node;

Node *init(const char *file_name) {
   Node *p = (Node *)malloc(sizeof(Node));
   strcpy(p->name, file_name);
   p->next = NULL;
   return p;
}

int cmp(const void *a, const void *b) {
    return strcmp((*(Node **)a)->name, (*(Node **)b)->name);
}

char get_file_type(mode_t mode) {
    char type = '-';
    switch(mode & S_IFMT) {
        case S_IFBLK:
            type = 'b';
            break;
        case S_IFCHR:
            type = 'c';
            break;
        case S_IFDIR:
            type = 'd';
            break;
        case S_IFIFO:
            type = 'f';
            break;
        case S_IFLNK:
            type = 'l';
            break;
        case S_IFREG:
            type = '-';
            break;
        case S_IFSOCK:
            type = 's';
            break;
        default:
            type = '-';
            break;
    }
    return type;
}
void get_file_dugo(mode_t mode, char *dugo) {
    const char *temp = "xrw";
    strcpy(dugo, "----------");
    dugo[0] = get_file_type(mode);
    for(int i = 1, j = 1 << 8; i <= 9; ++i, j >>= 1) {
        if(mode & j) dugo[i] = temp[i % 3];
    }
    if(mode & S_ISUID) {
        dugo[3] = dugo[3] == 'x' ? 's' : 'S';
    }
    if(mode & S_ISGID) {
        dugo[6] = dugo[6] == 'x' ? 's' : 'S';
    }
    if(mode & S_ISVTX) {
        dugo[9] = dugo[9] == 'x' ? 't' : 'T';
    }
}

void get_file_time(const time_t *timep, char *const time) {
    struct tm *bk = gmtime(timep);
    sprintf(time, "%2d %2d %02d:%02d", bk->tm_mon + 1, bk->tm_mday, bk->tm_hour, bk->tm_min);
}

void get_file_info(const struct stat *stp, Node *fp, int *len) {
    get_file_dugo(stp->st_mode, fp->dugo);

    sprintf(fp->link, "%ld", stp->st_nlink);
    len[1] = max(strlen(fp->link), len[1]);

    char *user = getpwuid(stp->st_uid)->pw_name;
    strcpy(fp->user, user);
    len[2] = max(strlen(user), len[2]);

    char *group = getgrgid(stp->st_gid)->gr_name;
    strcpy(fp->group, group);
    len[3] = max(strlen(group), len[3]);
    
    sprintf(fp->size, "%ld", stp->st_size);
    len[4] = max(strlen(fp->size), len[4]);

    get_file_time(&stp->st_ctime, fp->time);
    
    len[6] = max(strlen(fp->name), len[6]);
}

void get_dir_info(DIR *dirp, int flag, Node **dir_info, int *len) {
    memset(len, 0, sizeof(int) * 7);
    struct dirent *dtp = NULL;
	struct stat st;
    int idx = 0;
    while(dtp = readdir(dirp)) {
        if(!(flag & OPTION_A) && dtp->d_name[0] == '.') continue;

		fstatat(dirfd(dirp), dtp->d_name, &st, 0);
        Node *temp = init(dtp->d_name);
        dir_info[idx++] = temp;

        get_file_info(&st, temp, len);
    }
}

void print_name(Node *fp) {
    char *dugo = fp->dugo;
    int is_dir = dugo[0] == 'd';
    int is_exe = dugo[3] == 'x' || dugo[6] == 'x' || dugo[9] == 'x';
    int is_own = dugo[3] == 's' || dugo[6] == 's';

    if(is_own) {
        printf(BG_RED("%s"), fp->name);
    } else if(is_exe) {
        if(is_dir) {
            printf(FG_BLUE("%s"), fp->name);
        } else {
            printf(FG_GREEN("%s"), fp->name);
        }
    } else {
        printf("%s", fp->name);
    }
}
void print_space(int cnt) {
    for(int i = 0; i < cnt; ++i) {
        printf(" ");
    }
}
void print_file_info_detail(Node *fp, int *len) {
    int temp = 0;
    printf("%s ", fp->dugo);
    
    print_space(len[1] - strlen(fp->link));
    printf("%s ", fp->link);

    printf("%s ", fp->user);
    print_space(len[2] - strlen(fp->user));
    
    printf("%s ", fp->group);
    print_space(len[3] - strlen(fp->group));

    print_space(len[4] - strlen(fp->size));
    printf("%s ", fp->size);

    printf("%s ", fp->time);

    print_name(fp);
    printf("\n");
}

void get_max_len(Node **dir_info, int n, int *len, int m) {
    memset(len, 0, sizeof(int) * m);
    int x = n / m;
    int y = n % m;
    for(int i = 0, z = 0; i < m; ++i) {
        int k = x + (i < y ? 1 : 0);
        for(int j = 0; j < k; ++j) {
            char *s = dir_info[z++]->name;
            len[i] = max(len[i], strlen(s));
        }
    }
}
int check(Node **dir_info, int n, int q, int w) {
    int *len = (int *)malloc(sizeof(int) * q);
    get_max_len(dir_info, n, len, q);
    int sum = 0;
    for(int i = 0; i < q; ++i) {
        sum += len[i];
    }
    free(len);
    return sum + 2 * q < w;
}
int binary_search10(Node **nums, int n, int w) {
    int p = 1, r = n;
    while(p < r) {
        int q = p + r + 1 >> 1;
        check(nums, n, q, w) ? (p = q) : (r = q - 1); 
    }
    return p;
}
void print_dir_info_simple(Node **dir_info, int n) {
    struct winsize size;
    ioctl(STDOUT_FILENO, TIOCGWINSZ, &size);
    int w = size.ws_col; 
    w = binary_search10(dir_info, n, w);
    int *len = (int *)malloc(sizeof(int) * w);
    get_max_len(dir_info, n, len, w);
    
    int x = n / w;
    int y = n % w;
    for(int i = 0; i < x + !!y; ++i) {
        int k = i - x - 1;
        for(int j = 0; j < w; ++j) {
            k = k + x + (j <= y);
            if(i == x && j >= y) break;
            print_name(dir_info[k]);
            print_space(len[j] - strlen(dir_info[k]->name) + 2);
        }
        printf("\n");
    }
    free(len);
}

void print_dir_info_detail(Node **dir_info, int n, int *len) {
    for(int i = 0; i < n; ++i) {
        print_file_info_detail(dir_info[i], len);
    }
}

void ls_file(const struct stat *stp, const char *file_name, int flag) {
    int len[7] = {0};
    Node *temp = init(file_name);
    get_file_info(stp, temp, len);
    if(flag & OPTION_L) {
        print_file_info_detail(temp, len);
    } else {
        print_name(temp);
        printf("\n");
    }
    free(temp);
}

int get_file_cnt(DIR *pdir, int flag) {
    int cnt = 0;
    struct dirent *pdt = NULL;
    while((pdt = readdir(pdir)) != NULL) {
        if(!(flag & OPTION_A) && pdt->d_name[0] == '.') continue;
        ++cnt; 
    }
    return cnt;
}

void ls_dir(DIR * dir, int flag) {
    int len[7] = {0};
    int n = get_file_cnt(dir, flag);
    rewinddir(dir);
    Node **dir_info = (Node **)malloc(sizeof(Node *) * n); 
    get_dir_info(dir, flag, dir_info, len);
    qsort(dir_info, n, sizeof(Node *), cmp);
    if(flag & OPTION_L) {
        print_dir_info_detail(dir_info, n, len);
    } else {
        print_dir_info_simple(dir_info, n);
    }
    for(int i = 0; i < n; ++i) {
        free(dir_info[i]);
    }
    free(dir_info);
}

void ls(const char *path, int flag) {
    DIR *dirp = opendir(path);
    if(dirp) {
        ls_dir(dirp, flag);
        closedir(dirp);
        return;
    }
    
    struct stat st;
    if(stat(path, &st) != -1) {
        ls_file(&st, path, flag);
        return;
    }

	fprintf(stderr, "please check your path: %s\n", path);
}

int main(int argc, char *argv[]) {
    int opt = 0, flag = 0;
	while((opt = getopt(argc, argv, "al")) != -1) {
        switch(opt) {
			case 'a':
				flag |= OPTION_A;
				break;
			case 'l' :
				flag |= OPTION_L;
				break;
		    default:
				fprintf(stderr, "Usage: %s [-al]\n", argv[0]);
				break;
		}
	}
    //默认路径
    if(optind == argc) ls(".", flag);
	for(int i = optind; i < argc; ++i) {
		ls(argv[i], flag);
	}
	return 0;
}
```