title: "The Leetcode Challenge"
date: 2015-05-19 21:06:28
tags: [Leetcode, Algorithm, Programming, Interview]
category: Diary
---
最近开始试着刷 [Leetcode](https://leetcode.com/) 了。倒也没有想太多，只是最近写的代码太多是查 API 调用，让人有了种沦为纯码农做体力活之感。虽然以前也曾有过算法无用论的想法，不过在工作了这一阵子之后，也慢慢开始体会到了数据结构和算法在实际生活中的实用。现在翻看一些相关文章，也不觉得算法像以前上课时那般枯燥了，偶尔居然有种拍案叫绝的感想。加上最近发现 Leetcode 支持的答题语言多了不少，还能支持用 Javascript。至此，还能有什么不去刷题的理由呢？

<!--more-->
如果还有人不知道不知道 Leetcode 的大名，在这里引用[酷壳的文章](http://coolshell.cn/articles/12052.html)简单地介绍一下：“Leetcode 这个网站上的题都是一些经典的公司用来面试应聘者的面试题，很多人通过刷这些题来应聘一些喜欢面试算法的公司，比如：Google、微软、Facebook、Amazon 之类的这些公司，基本上是应试教育的功利主义。”

不过，与其报着这样功利的心态去用 Leetcode，不如把它当成一次很好的回顾自己数据结构和算法的挑战。至少，这是我刷了将近一半题目之后的感受:)

总体而言，Leetcode 上的题目难度并不算太大，主要分成两大类：一种为基础算法考察，主要包括常用的深度搜索 DFS，广度搜索 BFS，二分法查找 BS，动态规划 DP，两点趋中 TP 等，主要检查对基本数据结构的理解和掌握，基本上只要确定好算法和边界条件，基本上都能 AC。另一种则为数学编程题，除了找出相关的规律之外，更多需要考虑各种特别的测试案例，否则时常会因为考虑不周到而出现只能通过部分测试最后得到 Wrong Answer 的悲剧。

虽然难度不太，要想一次就能通过倒也不容易，因此对于每一道题也不能掉以轻心。而且，Leetcode 还将题目按解题思路归类贴了标签，同一道题也可以根据这个提示用多种方式来解决。现在回想起来，前阵子只是单纯为了刷题通过率做得有些囫囵吞枣了。改天根据题目的不同类型重新写一次，并能分析一下相关的复杂度，才算是真的把这题目做透吧。

另外，在使用 Leetcode 的过程中，也稍有一些不是太爽的地方：

一、Leetcode 没有提供空间的使用数据情况。有时为了单纯提高速度都直接各自 Hashmap 用起来，实际工作里这倒不是一个好习惯。

二、Runtime 时间相差较大。由于自己基本是用 JS 答题，虽然已经做好了速度不会太快的心理准备，不过就算是相同的代码，在运行时间有时会差上几百毫秒。有这一点上，C++ 的分布情况就显得正常得多了。

三、Discuss 里面并不太活跃。虽然基本每题都会有人分享解答，但上面回复点赞者的数量还是少了不少。看着有些人提交了问题一直没有人回复，感觉有点桑心哈。

自己相关的解题答案，全都提交到了这里：[https://github.com/imcoddy/leetcode](https://github.com/imcoddy/leetcode)。虽然离全部 AC 还有不小距离，不过今后会坚持更新，顺利的话，半年内应该能完成到自己满意的目标吧。

同时，为了使里面的代码格式统一，还另外用 Nodejs 写了个 [小爬虫](https://github.com/imcoddy/leetcode-crawler)，可以将题目和代码定义预先抓取到本地，省去了经常到网站上查找的麻烦（毕竟本地 grep 搜索要便利不少，也方便自己不定期更新 problemset ）。虽然功能还很简陋，不过已经能满足我的需求了，有兴趣的同学不妨一试。

最后，Leetcode 的相关资料网上很容易就能找到，@billryan 的这份[总结](https://github.com/billryan/algorithm-exercise)感觉相对做得完善一些，在这里顺便推荐一下。英文不错的同学还可以多关注一下 Leetcode 的[博客](http://articles.leetcode.com/)，里面的每一篇文章都值得细读一遍。嗯，我都有点再写个爬虫把里面的文章全部抓下来整理的冲动了 :P

最最后，让我们记住下面这句话：

> Language might not last, but algorithm will long live. Happy Leetcoding!