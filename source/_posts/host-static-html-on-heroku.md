---
layout: post
title: "Host Static Html On Heroku"
date: 2015-10-05 22:34
comments: true
tags: [Dairy, Heroku, Brainwallet, Bitcoin]
categories: Tech
---
![heroku](http://photos.prnewswire.com/prn/20110712/SF33967LOGO)
前阵子脑钱包的作者因为安全性的原因，将脑钱包网站彻底关闭，而且还将代码也清空了。确实，从安全性的角度而言，脑钱包的确容易出现被人撞库而造成损失，以至于 [Gavin 都强烈警告过不要用它](http://imcoddy.github.io/2014/01/18/do-not-use-a-brainwallet/)。但平心而论，脑钱包其实还是一个非常不错的在线工具，这样关闭未免有些矫枉过正了。因此，我打算在 Heroku 上重新开一个镜像。
<!--more-->

由于之前 fork 过代码，将最近一些小修改合并到了 master 分支后，设置了一下 heroku 的配置，轻车熟路地就将代码部署上去了。不过当我打开了 [http://brainwallet.herokuapp.com/](http://brainwallet.herokuapp.com/) 之后，却提示应用没有正常配置。搜索一番后发现，原来结果居然是 Heroku 不支持直接部署静态的 HTML 网页！

发现这个原因后觉得有点哭笑不得。不过在知道原因后，解决起来也就容易多了：只需要让 Heroku 能正常识别出文件类型就好。这一般是通过设置 Procfile 来实现，不过人懒如偶，当然不会为了折腾一个静态页面去配置各种 Ruby 插件。当我知道 Heroku 对 PHP 支持不错时，新建一个叫 index.php 的文件，在里面加入以下一行代码即可。

```
<?php include_once("home.html"); ?>
```

这样做之后，Heroku 就会将程序识别为 PHP 的应用，虽然会提示缺少某些文件，不过对于这样一个静态的网站，这并不是什么问题。

```
> gps heroku master
Counting objects: 1954, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (764/764), done.
Writing objects: 100% (1954/1954), 600.38 KiB | 0 bytes/s, done.
Total 1954 (delta 1335), reused 1741 (delta 1182)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> PHP app detected
remote:
remote:  !     WARNING: No 'composer.json' found.
remote:        Using 'index.php' to declare PHP applications is considered legacy
remote:        functionality and may lead to unexpected behavior.
remote:
remote: -----> No runtime required in 'composer.json', defaulting to PHP 5.6.14.
remote: -----> Installing system packages...
remote:        - PHP 5.6.14
remote:        - Apache 2.4.10
remote:        - Nginx 1.6.0
remote: -----> Installing PHP extensions...
remote:        - zend-opcache (automatic; bundled)
remote: -----> Installing dependencies...
remote:        Composer version 1.0.0-alpha10 2015-04-14 21:18:51
remote: -----> Preparing runtime environment...
remote:        NOTICE: No Procfile, using 'web: vendor/bin/heroku-php-apache2'.
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing... done, 72.7MB
remote: -----> Launching... done, v3
remote:        https://brainwallet.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
```

就这样，脑钱包网站就重新恢复啦。撒花~ [http://brainwallet.herokuapp.com/](http://brainwallet.herokuapp.com/)

当然，就算恢复了，并不意味着我推荐大家去将币存在脑钱包里面，除非你真的明白其原理，并加密过自己输入的密语。脑钱包对我而言是一个很方便的管理私钥的方式，但对于更多的人而言，用[比太钱包](https://bither.net/)才是更合适的选择。
