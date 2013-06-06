---
layout: post
title: "How Time Flies, in Database"
description: "前阵子遇到了一个这样的的场景：数据库中原来使用的是MySQL中的DateTime格式，不过由于有经常性的时间比较的需求，以及需要引入多时区支持方便以后扩展。因此，需要将数据库的格式从DateTime转换成Timestamp。"
category: Diary
tags: [Diary, Dev, PHP, MySQL]
---

前阵子遇到了一个这样的的场景：数据库中原来使用的是MySQL中的DateTime格式，不过由于有经常性的时间比较的需求，以及需要引入多时区支持方便以后扩展。因此，需要将数据库的格式从DateTime转换成Timestamp。这就自然而然地引出了以下的问题：

     应该如何操作，以达到不影响服务的情况下平稳地实施这一更新？

在回答这个问题之前，首先需要了解清楚数据库中的时间是如何存储的。
<!--more-->

#DateTime vs Timestamp

这两个作为数据库中最常见的选择，难免时常被拿出来比较一番。在MySQL的[官网](http://dev.mysql.com/doc/refman/5.6/en/datetime.html)上，对这两个是这样说明的：

>The TIMESTAMP data type is used for values that contain both date and time parts. TIMESTAMP has a range of '1970-01-01 00:00:01' UTC to '2038-01-19 03:14:07' UTC.

>The DATETIME type is used for values that contain both date and time parts. MySQL retrieves and displays DATETIME values in 'YYYY-MM-DD HH:MM:SS' format. The supported range is '1000-01-01 00:00:00' to '9999-12-31 23:59:59'.

>MySQL converts TIMESTAMP values from the current time zone to UTC for storage, and back from UTC to the current time zone for retrieval. (This does not occur for other types such as DATETIME.)

Timestamp记录的是1970-01-01年始（UTC）所经过的秒数。在存储时，会根据服务器的时区计算出UTC时区对应的值存储下来，并在取出时将其还原成LocalTime。由于其存储时被当作一个4字节的非负整数，在2038年即将溢出（Bug2K+38）。

DateTime在存储时占用的是8个字节，在记录的范围内可以比Timestamp多出不少。前四个字节的整数存放日期信息，后四个字节的整数存放时间信息。因此，所得到的结果是不连续着。这就意味着当希望把时间推迟一分钟时，并不是单纯地在原有的基础上加上60即可，而是需要经过更复杂的计算。

实际上，对于已经定格的时间，用DateTime是一个不错的选择，如博文发表的时间，用户的生日等等。不过也由于DateTime本身与时区并无关系，在处理涉及多时区数据的时候（如生成统计报表），往往力不从心。

另一方面，Timestamp则合适处理经常更新，或者对数据一致性要求较高的场合。虽然它的时间范围有限制，但那也是在不可预见的20年之后。（嗯，当年千年虫问题出现前的开发者也是这样的心态吧:P）

#The Other Solution

在实际遇用中，不少开发者是使用int型来存储对应的Timestamp的。虽然做法和使用数据库内置的Timestamp类型大同小异，不过还是稍有区别。例如，SO上有人提到了这样的一个[场景](http://stackoverflow.com/a/4028045/834636)：

>Consider setting a timestamp by a user to a server in New York, for an appointment in Sanghai. Now when the user connects in Sanghai, he accesses the same appointment timestamp from a mirrored server in Tokyo. He will see the appointment in Tokyo time, offset from the original New York time.

虽然该问题的提问者认为这时应该使用DateTime以便能够正确地显示出该时间，不过在我看来用int来记录下UTC的Timestamp，以及创建时所对应的正确时区，从而消除服务器数据库的时区偏差值。因此，在这种情况下，数据库中增加timezone栏必不可少。同时，需要在程序里对时间进行调整计算，确保能换成统一的时间截。

虽然这样的做法折腾了一些，不过也给了开发者更多的自由，在进行数据查询及比较时也因为少了不必要的格式转换而更加自然。同时，这也意味着需要对代码的安全性担负更大的责任，完备的测试用例必不可少。

#What I Learnt

回到前面的问题，在部署这部分的更新时，其实折腾了好一阵子。现在回顾起来，感受如下：

0. 开发和时区有关系的应用时，一定要使用UTC标准时间，仅在显示的时候根据需要进行调整。
1. 虽然变更对于软件开发来说不可避免，但前期的考虑还是应该尽可能充分一些。比如这样的变更，在设计时考虑到多时区的因素，可以避免后期不少麻烦。
2. 对生产环境中的数据库进行变更，需要尽力避免出现服务中断或者宕机造成数据不一致的情况。
3. 建立相应的运行脚本，并添加dryrun方法，仅在指定参数时才执行更新数据库的操作以避免误执行。
4. 在要变更的DateTime栏后边增加对应的Timestamp栏，采用Double Write来记录该DateTime相对应的时间截。
5. 确定数据存储没问题之后，尽可能地在Model层将数据从原先的DateTime读取换成从Timestamp读取，并计算相应的DateTime以保持对外的接口不变。
6. 确认没问题后，将原先的数据栏给消除掉，停止Double Write。

总之，最初感觉一个并不太大的功能，最后感觉让自己折腾了不少，这或许是其中最大的收获吧。

最后，把时间交给程序来处理，有时还是难免出现各种意想不倒的问题。暂且不说“臭名昭著”的夏令时记时的转换给开发增添了多少乱子，也不提那个[更换时区的事件](http://stackoverflow.com/questions/6841333/why-is-subtracting-these-two-times-in-1927-giving-a-strange-result)对程序员提出了多高的「上知天文、下识地理」的人文需求，光是2012年7月1日添加的那一闰秒，就足以让所有[内核低于2.6.18-164的Linux系统的服务器Crush](http://coolshell.cn/articles/7804.html)。

嗯，这让无证程序员压力山大，毕竟，计算机世界里的数据只是现实的映射。然而时间依旧这样流逝着，不紧不慢，不离不弃。

How Time Flies! 以此为题，在六一里纪念一下逝去的青春。
