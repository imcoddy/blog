title: Backup And Restore Your Nook On The Mac
date: 2013-12-16 21:36:45
tags: [Nook, Mac, Hack, Reading]
---
转眼之间的手头上这台 Nook 已经到手两年了。虽然与 Kindle 相比这玩意名气的确小了不少，而且自带的系统限制不少，对中文支持得也不太到位。不过在经过自己 Root 并精心配置过后，这玩意的阅读体验可以得到很大的提升，实在是物超所值（虽然当年入手不久后这货就跟着 Kindle 狠狠滴降了价-_-）。趁着昨天在知乎挖了个老帖《[图书资源和阅读感觉上，Kindle 4 和 nook 2 哪个较好？](http://www.zhihu.com/question/20109608/answer/20869162?group_id=132318107#answer-3543341)》，记录一下昨天刷机的过程吧。
<!--more-->
其实一直在用着并没有出什么问题，只是有一次不小心，插电脑上充电时没有被其弹出就直接拔出，造成了磁盘的权限出了点问题。虽然不影响平时看书，不过这样一来就没有办法安装新软件或做其它系统修改了。直到昨天想安装点东西失败后，终于决定：还是把它刷回来吧！

不过在准备刷机的过程中，遇到了一个很尴尬的问题：现有的刷机教程都是基于 Windows 下用 DiskGenius 来操作的，其它系统下的操作指南几乎没有，而我已经摒弃 Windows 好多天……没办法，在某个说明不详的“Linux/Mac users can use dd”这一个模糊不清的提示下，我便开始了在 Mac 下恢复 Nook 的折腾史。

## 准备
首先需要调整好心态，充分意识到「刷机有风险，操作要谨慎，后果需自负」 的正确折腾心态，并预备好以下几样东西：

1. Nook 用 512M 以上大小的 SD 卡及 USB 读卡器，建议用闲置的卡，方便以后使用。
2. Nook 机器及数据线。
3. 引导所需的 Noogie 镜像文件。（点[这里](https://code.google.com/p/nst-recovery/downloads/detail?name=noogie.img.gz)下载）
4. 具有管理员权限的 Mac 一台。（ Linux 的操作大致相同，不过我没有验证。）

## 制作引导镜像
（声明：这一步我并没有做，因为之前这个 Noogie 引导镜像已经做好了，不过理论上是可行的。如果有人实践发现有问题请告诉我。）

1. 将准备中所下载的 Noogie 镜像解压（2.6MB 的文件解压后达到 79.7MB，这个压缩率真心赞啊。），打开一个 Terminal 并将当前目录转至镜像的目录下。
2. 将 SD 卡通过读卡器连接至 Mac 上。
3. 在 Terminal 中输入`diskutil list`获得当前 SD 卡的盘符。（一般来说是 /dev/disk# ，其中 # 号所对应的数字可能不同）
4. 仔细确认了 SD 卡的位置后，输入以下的命令（以 /dev/disk1 为例）。**一定要注意不要选到系统盘，否则整个系统就挂了。**
	
		sudo diskutil unmountDisk /dev/disk1
	
5. 用 dd 命令将镜像写入到 SD 卡中。

		sudo dd if=/path/to/noogie.img of=/dev/disk1 bs=1m
		
经过一阵等待后，该镜像应该会成功地写入到 SD 卡中。

## 备份/刷机
1. 长按背后的 N 键将 Nook 完成关机。
2. 插入刚才制作好的 SD 卡并开机，稍后会出现"Rooted Forever"的字样。
3. 将 Nook 插上数据线连接到电脑上，一会会在电脑上加载了名为 boot 和 Nook 的两个磁盘卷。
4. 通过 DiskUtil 将这两个磁盘卸下。在 Terminal 中获得 Nook 的盘符。
5. 仔细确认了 Nook 的位置后，输入以下的命令将现有的系统备份（以 /dev/disk1 为例）
	
		sudo dd if=/dev/disk1 of=/path/to/my_nook_backup.img bs=1m
6. 经过一阵漫长的等待后，确认生成的镜像大小是 1962934272 bytes。（也有可能大小是 1958739968，似乎不同的版本稍有差别。）
7. 将生成的镜像妥善保管，在需要还原的时候，只需要将 if 和 of 的内容反过来即可
	
		sudo dd if=/path/to/my_nook_backup.img of=/dev/disk1 bs=1m

## 总结
从上面的命令也可以看出，在 Mac 上要备份或者恢复 Nook 实在是太简单了，基本上只需要一个 dd 命令，以至于让我怀疑相关资料这么少的原因是因为这简单得别人不屑于写-_-。而 dd 命令其实使用也并不难，指定输入的文件 input file 以及输入的文件 output file，同时设置一下缓冲区 buffer size 的大小即可，但在使用中，需要注意不要误操作以破坏系统。

另外，由于我本次刷机用的是自己之前所保存的镜像，并没有涉及到刷他人镜像需要恢复 pmf 分区信息的问题。不过理论上这个也可以通过 DiskUtil 来写入，如果有认证实践了，分享一下经验吧。

总之，只要把自己的镜像备份了，Nook 这机器基本上就是不怕刷坏的不死之身了。 Happy Reading, And Long Live The Nook :P
