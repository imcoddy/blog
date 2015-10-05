---
layout: post
title: "Alias For Your Git Branches"
date: 2015-10-05 21:23
comments: true
tags: [Dairy, Git, Hack, Tip]
categories: Tech
---

![git-branch](http://i1375.photobucket.com/albums/ag455/imcoddy/Blog/git-branch_zps9p0s7kro.jpg) 

今天手头上工作的项目终于从 SVN 迁移到 Git 上了。其实这事本身对我来说没有什么太大影响，因为在此之前就直接用 git-svn 一直开发着，现在只不过换了一下提交的方式而已，所以当同事在推进的时候基本也没有怎么关心。直到项目迁移完了，才发现遇到了一个问题。

<!--more-->

问题是这样：原先的 SVN 里面，根据环境的不同，设置了 development, test, sandbox, production 四个不同的分支，而本次迁移为了保持一致，git 里建立的分支的名字也照样存留了下来。　　　

虽然 Git 里面对分支的管理十分宽松，而分支之间其实也没有所谓的等级观念。不过这样一换之后，原先的不少习惯就变得不一致了。比如我平时习惯了 git-flow 的流程，开始分支在 develop 上，每增加一个功能就开一个 feature 分支，最后测试完之后再合并到 master 上。而这样一换，原先习惯将 ```git checkout develop``` 缩略成 ```gcod``` 的诸多 aliases 现在就完全没法用了。

写代码嘛，当然是能少敲一下键盘就尽量少啦。虽然试了一下 ```git branch alias``` 无法成功，不过搜索了一下，在 [StackOverflow](http://stackoverflow.com/questions/549920/is-it-possible-to-alias-a-branch-in-git/549949#549949) 找到解决的方案。	

``` sh
git symbolic-ref refs/heads/develop refs/heads/development
git symbolic-ref refs/heads/master refs/heads/production
```

再用 ```git branch``` 看一下，发现 Git 支持得还是很不错的：

``` sh
> gb
  develop -> development
  development
* feature/1540-shorten-click-session
  master -> production
  production
```

于是，又可以很开心滴用之前习惯的操作啦。

最后，发现现在对这些新特征关心度少了，前阵子 Git 刚出了 2.6 版也只是看了一下更新日志，[OS X El Capitan](https://www.apple.com/osx/elcapitan-preview/) 出来也只是刚下载好却一直没安装。也不知道这样慢慢变得不爱折腾是不是一件好事。不过这几个月想写的博客一直都没有没有整理出来，抽空得再更新一下才是。　
