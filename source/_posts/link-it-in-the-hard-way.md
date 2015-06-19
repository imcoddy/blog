title: "Link It In The Hard Way"
date: 2015-06-19 22:01:51
tags: [Mac, Homebrew, Tweak, Blog, Writing]
category: Tech
---
又一阵子没有写博客了。最近晚上回到家打开电脑后，基本都是在上 Leetcode 刷题。其实最近有好几件事都可以写写，不过认真想想，从启动电脑到输入 Hexo 命令再打开 Atom 编辑器码字，实在是有些显得繁琐不堪。今天一时心血来潮，购买了 iPad 上传说中的编辑神器 [Editorial](https://itunes.apple.com/us/app/editorial/id673907758?mt=8)，然后又有了一个折腾的想法，将博客的撰写转移到 iPad 上。
<!--more-->
这个想法其实并不新鲜，毕竟有了 Dropbox 之类的同步软件之后，只要有网络，基本上可以实现设备之间的无缝切换。因此，只需要在灵感来临之时掏出 iPhone 或者 iPad 上随时随地记录一下，然后等打开电脑时再发布即可。

不过在这之前，还是遇到了一点小麻烦。

## 情况说明
现在这个博客是用 Hexo 生成的，目录放在 ```/Users/imcoddy/Blog/``` 下面，代码和网页都托管在 Github 上。现在要做的，只需要将 Blog 下的 ```_posts``` 链接到 Dropbox 里面即可。

在 iPad 里面将 Editorial 与 Dropbox 关联之后，即会在 ```Apps``` 目录下出现一个同名的文件夹，因此，决定将目标路径设置为 ```/Users/imcoddy/Dropbox/Apps/Editorial/Blog/Posts```。

不过现在是很残酷的，ln 命令不允许直接做文件夹的硬链接。终端里面执行结果如下：

    /Users/imcoddy [imcoddy@iMac] [22:44][1]
    > ln /Users/imcoddy/Blog/source/_posts /Users/imcoddy/Dropbox/Apps/Editorial/Blog/Posts
    ln: /Users/imcoddy/Blog/source/_posts: Is a directory

## 解决方案

一个很简单的方案是将 Blog 下面的 ```_posts``` 文件夹删除，在 Dropbox 里面建立好文件夹后再将其通过软链接的方式链接过来。虽然这种方案很简单快捷，不过也有一个不好的结果：```_posts``` 文件夹下的 md 文件将不再被 Git 所管理。更好的方案自然是在 Blog 里面正常编辑发布，而相关的 md 文件能自动同步到 Dropbox 里。

Google 一番之后，发现 Stackoverflow 上有个[解答](http://stackoverflow.com/questions/80875/what-is-the-unix-command-to-create-a-hardlink-to-a-directory-in-os-x)说得很详细，也说得很吓人。要想在 Mac 上建立文件夹的硬链接，需要先满足下面的几个条件：

1. The file system must be journaled HFS+.
1. The parent directories of the source and destination must be different.
1. The source’s parent must not be the root directory.
1. The destination must not be in the root directory.
1. The destination must not be a descendent of the source.
1. The destination must not have any ancestor that’s a directory hard link.

给出的解决方案倒很简单。
首先编译如下的文件

    #include <stdio.h>
    #include <unistd.h>
    int
    main(int argc, char *argv[])
    {
       if (argc != 2)
          return 1;
       int ret = unlink(argv[1]);
       if (ret != 0)
          perror("unlink");
       return ret;
    }

    gcc -o hunlink hunlink.c

使用的时候，只需要 ```hlink source_folder target_folder``` 即可。

再 Google 一番，其实[这个功能](https://github.com/selkhateeb/hardlink)已经有人在 Homebrew 上发布了。因此，要做的就简单多了：

    /Users/imcoddy [imcoddy@iMac] [22:44][1]
    > brew install hardlink-osx
    ==> Downloading https://homebrew.bintray.com/bottles/hardlink-osx-0.1.1.yosemite.bottle.t
    ######################################################################## 100.0%
    ==> Pouring hardlink-osx-0.1.1.yosemite.bottle.tar.gz
    ==> Caveats
    Hardlinks can not be created under the same directory root. If you try to
    `hln source directory` to target directory under the same root you will get an error!

    Also, remember the binary is named `hln` due to a naming conflict.
    ==> Summary
    🍺  /usr/local/Cellar/hardlink-osx/0.1.1: 3 files, 20K
    > hln /Users/imcoddy/Blog/source/_posts /Users/imcoddy/Dropbox/Apps/Editorial/Blog/Posts

然后，在 Hexo 里面新建这篇博客，打开 Atom，看着菜单栏里的 Dropbox 不时地自动同步，心情真是舒畅。

不过这篇文章还是在电脑上记录的，Editorial 的使用心得，就留着以后慢慢体会吧。
