title: "PassworK - A Little Work Over Your Password"
date: 2015-07-25 16:10:02
tags: [PassworK, Security, Development, Project, Bitcoin]
category: Diary
---
![](https://passwork.herokuapp.com/assets/images/64aa250e.passwork-256x256.png)

很早之前就打算写一个密码生成工具来辅助生成密码了。趁着最近 Lastpass Premium 到期，终于将它实现出来。网址为[https://passwork.herokuapp.com/](https://passwork.herokuapp.com/)，欢迎大家使用。

<!--more-->

## 设计原因

只所以写这个工具，是因为大部分用户还是习惯性的在不同的网站上设置相同的密码，而且密码的内容也十分简单，如用生日“19880219”或者姓名缩写+电话“jzm13018923223”。这样只要一个网站的密码被盗后，其它网站上的帐户也很容易受到影响。

## 使用方法

PassworK 正是为了解决这一问题而诞生的。其用法也很简单：通过用户输入的自定义字符串，生成一个比较复杂的密码。用户所定义的字符串可以分成两部分：固定语和变化语。前者是自己设计的短语，可以包含空格或其它的标点符号，长度也可以超过 16 位，只需要用户能够确保自己能完全记得住（切记一定要自己能记住，否则就算只差了一个空格，生成的密码也会完全不一样）；后者则是随着要登陆的网站不同而变化的信息，比如网站的域名。

例如，假设我以“MyPassworK”作为固定的密语，要登陆的网站的域名为变化语，那么可以得到如下的结果：

    MyPassw0rK + facebook → fCb5ADZh2pQpK5Lq
    MyPassworK + twitter → HZrqB6YYBBdW98GC
    MyPassworK + google → HUL17S6dePbyriCQ
    ...

![](http://i1375.photobucket.com/albums/ag455/imcoddy/Blog/PassworK_zpsb3bcsnpa.png)

通过这样的设置之后，就可以在只记住自己所设定的固定语这一个密码的情况下，为不同的网站创建容易生成而不重复的密码。

## 高级用法

尽管 PassworK 的推荐用法如上所示，用户实际上完全可以设置自己的密码生成规则。例如将固定语中的“MyPassworK”改成“MyPassw0rK”，同时将变化语中的域名部分的第二个字母变成大写。这将得到如下的结果：

    MyPassw0rK + fAcebook → M7WS5L54G6QK97F6
    MyPassw0rK + tWitter → XMYCxGcEarF3sCQR
    MyPassw0rK + gOogle → SwyqE4UMuMf6oTPR
    ...

甚至再将其颠倒过来，得到如下的结果：

    fAcebook + MyPassw0rK → Q9Nt24mPXTSDNFC5
    tWitter + MyPassw0rK → 4K5H2YAmfxidJHyA
    gOogle + MyPassw0rK → KEfqnLuGEoGf5giy
    ...

一个更好的办法是，用户根据自己要登陆的账号的重要程度，分别设置两到三个不同的固定语，从而可以更大程度上保护自己账号的安全。

同时，PassworK 还可将生成的密码以 QR 码的形式显示出来，例如用户要在不安全的电脑（例如网吧或者他人可能感染了病毒的电脑）上登陆时，可以在保证自己手机在可信任状态下（例如没有越狱过的 iPhone 上面）生成密码，再通过电脑摄像头进行读取。

## 实现原理

加密算法可以有很种多。 PassworK 受 Brainwallet 的启发，通过用 Bitcore 库，对用户输入的内容进行组合，然后生成一个比特币脑钱包地址。再将其秘钥所对应的字符串进行截取，用第三至第十八位字符作生成的密码。

由于每一个确定的输入都能得到一个确定的比特币地址，所以，只要用户能确保自己记得所设定的暗语，就可以得到相同的密码。

以 MyPassw0rK + fAcebook 为例子，这两个短语组合后可以得到字符串MyPassworKfacebook，将这作为输入，可以得到如下的结果（这一点可以在 [Brainwallet](https://brainwallet.org/) 上进行验证）：

    Secret Exponent: f2c2d825155bb3860d80247c243c4acec2a04fc578f1ba5db350390b5e2d4379
    Point Conversion: Uncompressed
    Private Key: 5KfCb5ADZh2pQpK5Lqvr2P86aXj43enZ4FL78yFbF52nYY58FJf
    Address: 1JnB64zCAYS6KJ4WqdsBoXU71io9193wdP

而所生成的密码 fCb5ADZh2pQpK5Lq，便来自上面的私钥。

## 安全分析

尽管比特币脑钱包并不被大众推荐，脑钱包所生成的私钥在格式上与其他并无二异。问题在于如果用户所设计的暗语过于简单的话，很有可能会受到暴力破解。换句话说，如果选择的暗语足够独特（例如 8299c2360c05bd4207014da2228b54d54db34236，PassworK 的第一个 commit ID ），被破解的概率与随机生成一个含有余额的比特币私钥其实差别不大。

同时，从生成机制上说，PassworK 所生成的密码受比特币地址的规则所限，仅包含 Base58 所允许的字符。尽管密码里没有标点或许会让某些高级用户觉得不够安全，但这也很好地避免了某些网站不允许设置标点作为密码从而提高了兼容性。毕竟，PassworK 解决的问题是，提供了一种简单易记的方式生成一个较高强度的密码。如果有更高的要求，请购买 1Password 或者 Lastpass 的服务，或者自行修改源码配置自己的字符映射表。

## 支持捐助

* 如果你觉得 PassworK 对你能有所帮助，请推荐给你的朋友，网络安全的意识提升需要大家的共同努力。
* 如果你对 PassworK 有任何的意见或建议，欢迎与我联系。
* 如果你喜欢 PassworK，请向 [1DNpE2i4H4bCRd6ezcgv3bL13Uc8GCEEPo](https://blockchain.info/address/1DNpE2i4H4bCRd6ezcgv3bL13Uc8GCEEPo) 进行捐赠。
* 如果你对这种方式生成的密码的安全性还有疑虑，上面的地址就是用这种方式生成的，如果你能猜出我的密码的话欢迎将里面的币取走，不过之后烦请告诉我一下 ┗(°0°)┛
