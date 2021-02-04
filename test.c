/*************************************************************************
    > File Name: test.c
    > Author: pk
    > Mail: lupengkunmc@gmail.com 
    > Created Time: 2021年02月01日 星期一 20时15分01秒
 ************************************************************************/

#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    int fd1 = open("./1.txt", O_CREAT | O_RDONLY);
    //int fd2 = open("./2.txt", O_CREAT | O_WRONLY);
    char buffer[512];
    int cnt = 0;
    while((cnt = read(fd1, buffer, sizeof(buffer))) > 0) {
        printf("%d\n", cnt);
    }
    printf("%d\n", cnt);
    printf("%d\n", fd1);
    close(fd1);
    return 0;
}
