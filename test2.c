/*************************************************************************
    > File Name: test2.c
    > Author: pk
    > Mail: lupengkunmc@gmail.com 
    > Created Time: 2021年02月01日 星期一 20时56分37秒
 ************************************************************************/
#include <stdio.h>
#include <unistd.h>
#include <sys/stat.h>
#include <fcntl.h>

int main() {
    int fd1 = open("./1.txt", O_CREAT | O_RDONLY);
    int fd2 = open("./2.txt", O_CREAT | O_WRONLY);
    char buffer[512];
    int cnt = 0;
    while((cnt = read(fd1, buffer, sizeof(buffer))) > 0) {
        cnt = write(fd2, buffer, cnt);
        //printf("%d\n", cnt);
    }
    close(fd1);
    close(fd2);
    return 0;
}
