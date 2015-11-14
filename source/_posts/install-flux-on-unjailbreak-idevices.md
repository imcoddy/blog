---
layout: post
title: "Install f.lux On Unjailbreak iDevices"
date: 2015-11-12 13:24
comments: true
tags: [Dairy, iOS, XCode, Hack, Health]
categories: Tech
---

![sleep-better-using-flux](http://i1375.photobucket.com/albums/ag455/imcoddy/sleep-better-use-flux_zps4iyen9cp.jpg)

作为一个每天长时间面对各类电子屏幕的人，有一个软件是必须安装的：[f.lux](https://justgetflux.com/)。安装之后，它会自动调节屏幕的色调，使得在晚上看电子屏幕不再这么刺眼。

<!--more-->

由于 iOS 的系统限制，很长一段时间里 f.lux 只能在越狱后才能通过 Cydia 安装。这对于那些不想越狱但经常晚上刷手机的夜猫子来说，实在是非常痛苦。好在最近作者公开了一个方法，让用户可以自行编译，然后将 f.lux 安装到自己的手机里。

## 准备

要想安装 f.lux 到自己的 iPhone/iPad 上，首先需要做如下准备：

1. Mac OSX 10.10 系统并安装好 XCode 7 （Windows 用户可以直接把篇文章关了）。
2. 注册成苹果的开发者（只需要免费注册一下就可以了，并不需要付费）。
3. 下载 f.lux 的[代码](https://justgetflux.com/sideload/f.lux-xcode-master.zip)。

## 操作

1. 用 XCode 打开 iflux.xcodeproj
2. XCode > Preferences > Accounts 里添加自己的 iCloud 或开发者账号
3. 在 Targets > iflux > General > Identity 里面改一下 Bundle Identifier 以避免相同
4. 在同一页面中，将 Identity > Team 设置成自己的帐户

完成上面的步骤后，就可以将 f.lux 安装到自己的设备上了

1. 接上要安装的设备，将 Build Target 设置为真机
2. 按 Cmd+R 开始安装
3. 如果是第一次安装的话，需要在设备上的 Settings > General > Profile 里面信任该应用
4. Open f.lux, and enjoy.

最后不得不说，早上将其设置为 Darkroom 模式真是爽，再也不觉得刺眼了~

原文：https://justgetflux.com/sideload/ （貌似作者被苹果投诉而下线了……）
