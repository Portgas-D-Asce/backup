---
title: Vim 配置总结
author: Portgas·D·Asce
categories:
  - [Tools & Skills]
tags:
  - Vim
date: 2021-03-01 23:30:28
---
通过修改 $/etc/vim/vimrc$ 来配置 $vim$ 。

## 1 生成文件默认信息
```bash
autocmd BufNewFile *.cpp,*.c,*.h exec ":call SetTitle()"
func SetTitle() 
    call setline(1, "/*************************************************************************") 
    call append(line("."), "    > File Name: ".expand("%")) 
    call append(line(".")+1, "    > Author: xxx") 
    call append(line(".")+2, "    > Mail: xxx") 
    call append(line(".")+3, "    > Created Time: ".strftime("%c")) 
    call append(line(".")+4, " ************************************************************************/") 
    call append(line(".")+5, "")

    if expand("%:e") == 'h'
 	call append(line(".")+6, "#ifndef _".toupper(expand("%:r"))."_H")
 	call append(line(".")+7, "#define _".toupper(expand("%:r"))."_H")
	call append(line(".")+8, "")
 	call append(line(".")+9, "#endif")
    endif
    "新建文件后，自动定位到文件末尾
endfunc 
```

## 2 Vim复制内容到系统剪切板
### 2.1 查看是否支持 clipboard
```bash
vim --version | grep clipboard
```
结果如下：
```bash
+clipboard         +keymap            +printer           +vertsplit
+emacs_tags        +mouse_gpm         -sun_workshop      +xterm_clipboard
```

如果是 -clipboard 则表明不支持，应重新安装 vim ：
```bash
sudo apt install vim-gtk
```
### 2.2 使用
- 不会有提示信息
  - "+yy ： 复制一行内容；
  - "+nyy : 复制 n 行内容；
- 复制成功会有提示：x lines yanked into "+：
  - "+yG : 复制光标所在行到文件末尾的所有内容；
  - {visual}"+y : 复制选中内容；

## 3 设置自动缩进
```cpp
set number
set expandtab
set tabstop=4
set softtabstop=4
set shiftwidth=4
set autoindent
set cindent
set cinoptions={0,1s,t0,n-2,p2s,(03s,=.5s,>1s,=1s,:1s
```

## 4 修改键盘映射
```bash
nnoremap j k
nnoremap k j
```
在命令模式下：
- 修改前 : $j$ 是向下移动光标，$k$ 是向上移动光标；
- 修改后 : $j$ 是向上移动光标，$k$ 是向下移动光标；

## 5配置文件
```bash
inoremap ' ''<ESC>i
inoremap " ""<ESC>i
inoremap ( ()<ESC>i
inoremap [ []<ESC>i
inoremap { {<CR>}<ESC>O
inoremap } {<CR>};<ESC>O

"设置跳出自动补全的括号
func SkipPair()
    if getline('.')[col('.') - 1] == ')' || getline('.')[col('.') - 1] == ']' || getline('.')[col('.') - 1] == '"' || getline('.')[col('.') - 1] == "'" || getline('.')[col('.') - 1] == '}'
        return "\<ESC>la"
    else
        return "\t"
    endif
endfunc
" 将tab键绑定为跳出括号
inoremap <TAB> <c-r>=SkipPair()<CR>

jkk
```