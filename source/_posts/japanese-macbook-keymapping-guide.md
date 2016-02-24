---
layout: post
title: "Japanese Macbook Keymapping Memo"
date: 2016-02-04 17:45
comments: true
tags: [Dairy, Mac, Hack, Tip, Keyboard]
categories: Tech
---
![](http://g01.a.alicdn.com/kf/HTB1NuHOIpXXXXaFXVXXq6xXFXXXH/Laptop-Palmrest-With-JA-JP-Japanese-font-b-Layout-b-font-font-b-Keyboard-b-font.jpg)
过年之前撸了一台 2014 出的日版的 Macbook Pro Retina。之所以没有选 2015 的新款，是觉得多出来的 Force Touch 触摸板以及那小幅度提升的性能不值得那近两万日元的差价，而选择日版也是因为英文键盘版的只能在苹果里买而没有优惠。虽然事前也担心了一下日文键盘是否能适应，不过实践证明其实这反而更加方便。事前如果还有有人顾虑的话，只需要参照本文所说的配置就可毫无压力地用日文键盘输入了。
<!--more-->

首先，普及一下背景知识。由于日文输入特殊性，日本的大部分电脑都是配着带片假名的日文键盘。平心而论，它本身还是有一定的便利性的，例如空格左右的「英数」和「かな」键可以方便地快速切换输入法，对于经常要输入日文的同学来说很有必要。而它的缺点也同样明显，数字区和右手边的符号基本和普通的英式键盘完全不一致，需要记住另外一套指法，而且如果要经常换键盘来回切换的话容易得精神分裂症:P

日本键盘和英文键盘的具体差异如下：
![](http://blog-imgs-71-origin.fc2.com/g/o/k/gokexn/20110715_ss04.png)

当然，由于有了 Karabiner 这样的神器，日文键盘上完美模拟英文键盘的输入快感也不是难事。具体的步骤如下（安装过程略过）：

一、开启内置映射

Karabiner 本身其实对日文键盘有做了对应，因此把「Use Japanese Keyboard as US Keyboard」这一项勾选上以后，已经基本能够达成模拟英文键盘输入的效果。

在小写的模式下：
```
1234567890-=`
qwertyuiop[]
asdfghjkl;’¥
zxcvbnm,./`
```

在 Shift 组合模式下：
```
!@#$%^&*()_+~
QWERTYUIOP{}
ASDFGHJKL:”|
ZXCVBNM<>?~
```

二、微调

虽然上面的模式已经没太大的问题，不过出于个人习惯，为了把它配置得和 Filco Minila 一致，我还进行了以下的改动：

1. 将右 Command 当成切换输入法
1. Ro → \
1. Shift+Ro → |
1. Shift+Yen → |
1. Mu → Return


具体的代码如下：

```
<item>
  <name>Japanese</name>
  <item>
    <name>[JPN]Command_R to Switch Input Source</name>
    <identifier>private.japanese.command_r_to_space_command_l</identifier>
    <autogen>
      __KeyToKey__ KeyCode::COMMAND_R, KeyCode::SPACE, ModifierFlag::COMMAND_L
    </autogen>
  </item>
  <item>
    <name>[JPN]Underscore(Ro) to Backslash(\)</name>
    <identifier>private.japanese.underscore_ro_to_backslash</identifier>
    <autogen>
      __KeyToKey__ KeyCode::JIS_UNDERSCORE, KeyCode::BACKSLASH
    </autogen>
  </item>
  <item>
    <name>[JPN]Shift + Underscore(Ro) to Shift + Backslash(\)</name>
    <identifier>private.japanese.shift_underscore_ro_to_shift_backslash</identifier>
    <autogen>
      __KeyToKey__ KeyCode::JIS_UNDERSCORE, MODIFIERFLAG_EITHER_LEFT_OR_RIGHT_SHIFT, KeyCode::BACKSLASH, MODIFIERFLAG_EITHER_LEFT_OR_RIGHT_SHIFT,
    </autogen>
  </item>
  <item>
    <name>[JPN]Shift + Japanese Yen to Pipe(|)</name>
    <identifier>private.japanese.shift_jis_yen_to_pipe</identifier>
    <autogen>
      __KeyToKey__ KeyCode::JIS_YEN, MODIFIERFLAG_EITHER_LEFT_OR_RIGHT_SHIFT, KeyCode::BACKSLASH, MODIFIERFLAG_EITHER_LEFT_OR_RIGHT_SHIFT,
    </autogen>
  </item>
  <item>
    <name>[JPN]EISUU to Command_L</name>
    <appendix>(+ When you press EISUU only send Space)</appendix>
    <identifier>private.japanese.jis_eisuu_to_command_l_space</identifier>
    <autogen>__KeyOverlaidModifier__ KeyCode::JIS_EISUU, KeyCode::COMMAND_L, KeyCode::SPACE</autogen>
  </item>
</item>
```

这样一来，基本上使用的体验就和之前映射成 HHKB 的 Filco Minila 完全一致了。

最后打字的效果如下：

```
1234567890-=`
qwertyuiop[]
asdfghjkl;'
zxcvbnm,./\

!@#$%^&*()_+|~
QWERTYUIOP{}
ASDFGHJKL:"
ZXCVBNM<>?|
```
