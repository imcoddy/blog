---
layout: post
title: "Brainwallet.org Is Dead, Long Live Brainwallet"
date: 2015-10-06 18:16
comments: true
tags: [Dairy, Bitcoin, Brainwallet, Blog]
categories: Bitcoin
---

![brainwallet](http://i1375.photobucket.com/albums/ag455/imcoddy/Blog/brain-wallets_zpsfabntddg.png)

这其实是一份姗姗来迟的文章，阐述了笔者个人对脑钱包的一些看法。尽管原作者因安全原因将 Brainwallet.org 关闭，但笔者认为脑钱包有其存在的意义和研究价值，是以又搭建了一个[镜像](http://brainwallet.herokuapp.com/)放到网上。内容较长，将分成几部分发表，欢迎大家围观并讨论。

<!--more-->

## 脑钱包是什么

顾名思义，脑钱包即存在于脑海中的比特币钱包。它其实是一种比特币私钥的生成方式，通过对用户的输入进行计算生成相应的比特币地址。让你只需要记住一个密码，便可以用这个密码在脑钱包程序中恢复比特币地址和私钥。

基于这个思想，一个名叫 Brainwallet.org 的网站于 2012 年 4 月出现了 。这是一个基于网页的 JavaScript 比特币地址生成器，通过对用户输入的内容进行运算后生成对应的比特币私钥和地址。

它带来的好处是十分明显的：1，用户不需要去安装 Bitcoin Core （当时还叫 Bitcoin ）软件，不需要下载庞大的区块链数据，只需要打开一个网址便可方便地生成比特币地址并接收；2，用户不要去学习如何定期备份 wallet.dat 文件，只需要记住自己所设置的密码，就能在需要的时候通过计算得到相应私钥。

![brainwallet-org-first-public-release](http://i1375.photobucket.com/albums/ag455/imcoddy/Blog/brainwallet-org-first-public-release_zpsnahqghbf.png)

脑钱包的出现在当时比特币应用贫瘠、对用户电脑水平要求较高的情况下，犹如一阵清新的拂面春风，给比特币社区带来不少活力。Electrum 的作者 Vitalik Buterin，就曾经在 Bitcoin Magazine 上写过一篇脑钱包的指南《[Brain Wallets: The What and the How](https://bitcoinmagazine.com/articles/brain-wallets-the-what-and-the-how-1333845334)》。在随后的几年里，Brainwallet.org 亦是更新不断，但这个核心的功能，直至 2015 年 8 月关闭为止，都几乎没有太大的变化。

## Brainwallet.org 之殇

尽管 Brainwallet.org 给大家带来了不少便利，不过由于其实现的机制，时常被业内人士所诟病。例如 Gavin 就曾经在个人的 [Github Gist](https://gist.github.com/gavinandresen/3840286) 上就写过一篇针对脑钱包的檄文《[Do Not Use A Brainwallet! You Are Likely To Lose Your Coins!](http://imcoddy.github.io/2014/01/18/do-not-use-a-brainwallet/)》，甚至做过这样的[表态](https://bitcointalk.org/index.php?topic=102349.10;)：

> Every time I look at the academic literature on passwords/passphrases, I get more depressed about the feasibility of either giving users a secure passphrase that they will remember or getting a secure passphrase from them. I fear there will be a lot of lost coins if "brain wallets" get popular.　　　

这样的担忧绝非杞人忧天。实际上，这是由比特币的原理决定的。作为一款基于 P2P 网络的虚拟货币，比特币的存储实际上贯穿于整个网络，而非具体的实物媒介。尽管用户可以在离线的环境下保证使用脑钱包生成的私钥不会被木马盗取，但对于黑客而言，其可以采用暴力穷举的方式不断进行尝试，从而在发现存有币的地址时将其盗取。

实际上，每一个（存有币）的比特币地址都有可能被碰撞出来，因为每一个私钥不过是一串特别的字符串。而脑钱包的出现，虽然给了人们通过单词语句来生成比特币地址的便利，同时也让比特币地址被猜出来的概率大大增加了。

这催生部分以此为乐的掘金猎人，例如部分黑客就在 《[Smashing Bitcoin BrainWallets, for fun and profit! ](http://www.morxploit.com/morxpapers/smashingbitcoins.pdf) 》一文里给出了详尽的代码，用户只需要设置好自己词汇表并运行便可。这样的攻击在 Brainwallet.org 出现初期非常有效，因为有不少用户仅使用很简单的诸如“password1”这样的短语生成的地址，而要暴力破解这样的脑钱包不需超过十秒。

这其中最让人著名的莫过于用"bitcoin is awesome"生成的脑钱包地址 [14NWDXkQwcGN1Pd9fboL8npVynD5SfyJAE](https://blockchain.info/address/14NWDXkQwcGN1Pd9fboL8npVynD5SfyJAE) ，因为有人在 2012 年用这个短语生成该地址后，向里面转入 500 枚比特币后，随后在不到一分钟的时间内，这上面的币就被全部转走。另一个著名的脑钱包地址为“correct horse battery staple”生成的地址 [1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T](https://blockchain.info/address/1JwSSubhmg6iPtRjtyqhUYYH7bZg3Lfy1T)，由于这是 Brainwallet.org 初期的默认地址，陆陆续续不断有用户直接拿来使用向里面发币，到网站关闭为止居然积累了 15.4 个币，实在算是现代版的守株待兔。

这就是脑钱包的特点：如果你能确保生成一个独一无二的输入，你就基本上可以认为它是安全的。但一旦他人能构建出相同的输入，对方也将获得该地址的掌控权。而对于大量使用 Brainwallet.org 来存储比特币的用户而言，他们当中的大部分远远没有驾驭好这个工具所需的能力。

尽管社区里抵制脑钱包的呼声一直不断，最终导致 Brainwallet.org 关闭的，是数字反欺诈公司 White Ops 的安全研究员 Ryan Castellucci 于 2015 年 8 月 7 日在 DEF CON 23 大会公布的一项[研究](https://rya.nc/cracking_cryptocurrency_brainwallets.pdf)。

在该研究中，Ryan 编写了一个叫 Brainflayer 的程序，它能够每秒猜测 130,000 个密码，相比其早期版本性能足足提升了十余倍。如果该软件在强大的计算机上进行运算，花费 1 美元的成本就可以核对 5.6 亿个短语密码([相关资料](https://bitcointalk.org/index.php?topic=1147035.0)）。Ryan 称，他用这个程序找到了超过 730 个比特币，其中有一个脑钱包是由“[how much wood could a woodchuck chuck if a woodchuck could chuck wood](https://blockchain.info/address/1GjjGLYR7UhtM1n6z7QDpQskBicgmsHW9k)”生成的，里面包含了 250 个比特币。

这使得以往被认为是足够安全的脑钱包短语被证明事实上十分脆弱。在这项研究被公布之后，Brainwallet.org 立即在 Twitter 上 [宣布将永久关闭](https://twitter.com/brainwallet/status/629759260004630528)，并清空了其在 Github 的源代码。

![brainwallet-org-shut-down](http://i1375.photobucket.com/albums/ag455/imcoddy/Blog/brainwallet-org-closed-down_zpsdgq6ee9m.png)

事已至令，Brainwallet.org 就算是从此落下了帷幕。但这是否就算是给脑钱包下了死刑呢？脑钱包的安全性是否如此不济？这一切，还需要从脑钱包的详细原理说起。在下一篇文章里，笔者将对此进行阐述，并分析讨论脑钱包的安全性。

打赏地址：1873PE9v17hZcAHPmBVufTAWVEhkunLoV3

本文同步