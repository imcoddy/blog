title: "Atom: The Hacking Editor Of Your Choice"
date: 2015-06-26 22:04:41
tags: [Editor, Hack, App, Mac, OSX, Config]
category: Tech
---
![](http://i1-news.softpedia-static.com/images/news2/github-s-atom-editor-reaches-1-0-maturity-485320-2.jpg)
经过了长达一年的 Beta 公众测试之后，Atom，这个号称可 Hack 的面向 21 世纪的文本编辑器，正式更新到了 1.0 版。虽然没有在其推出之初就用上（以前还是需要邀请码才能用的呢），但在最近刷 Leetcode 的时候，深感这款编辑器的可定制性和方便程度远超其它。而前阵子微软推出的新 IDE 和 Facebook 推出的 Nuclide 都基于 Atom，颇让人有种天下编辑器苦人久矣之感。是以在这个特别的日子里，有必要为其记上一笔。
<!--more-->

## 巨人的肩膀

对于程序员而言，世界上的编辑器只有三种：Vim，Emacs，和其它。而对于我这样的 Vim 党而言，虽然 Vim 和 Emacs 的学习成本稍有些高，但在经历了一段磨合期之后，的确深感到其设计的优越性，让你的手在最小的移动范围内能高效实现各种操作。而且两者的定制程度都很高，配合着各种插件，可以将输入体验提高到一个的新的层次。

可是，这两个 70 年代里诞生的软件，现在看来，终究还是显得有些过时了。除了界面经常让一些习惯用鼠标点来点去的用户觉得难以上手之外，其架构也使得在它上面进行功能扩展并不方便（无论是插件的编写语法还是兼容维护）。虽然对于程序员而言了解基本的 Vim 用法还是非常有必要，但对于非 Linux/Unix 的用户而言，更多人选择了"界面更友好"的其它编辑器。

这里面不乏有各种优秀应用，例如 Notepad++，TextMate，Sublime 等等。而 Atom 作为后起之秀，有着更加远大的理想。

## 为何选用 Atom

对于每个 Atom 的新用户而言，这是一个必问的问题。Atom 的其官方手册上给出了[这样的答案](https://atom.io/docs/latest/getting-started-why-atom)：

这个世界上有那么多种编辑器，为什么你要花时间学习和使用 Atom 呢？

虽然 Sublime 和 TextMate 之类的编辑器已经非常好用了，但它们仅提供了很有限的拓展性。而在另一个极端，Emacs 和 Vim 提供了灵活的拓展性，但它们并不是很友好，需要使用专用的编程语言来配置和拓展。

我们觉得我们可以做得更好。我们的目标是在保证易用性的同时提供充分的可拓展性（hackability）：这个编辑器会受到第一天学习编程的新生欢迎，而且当他们成长为编程专家时也难以割舍。

当我们使用 Atom 来开发 Atom 的时候，随着它的逐渐完善，我们愈发觉得已经离不开它了。从表面上来看，Atom 是一个能满足你的期待的，现代化的桌面文本编辑器，而在表面之下，这是一个值得你去一同完善的系统。

## 超强的可定制性

如上所述，如果说 Vim 和 Emacs 凝聚的是上个世纪文本编辑器的精华。那么 Atom 则将其思想进一步发扬光大。由于采用了 NodeWebkit 技术（Github 公司为了改进这技术还专门把 NodeWebkit 作者雇用了让他专职开发），在 Atom 里面，每一个窗口实际上都是一个本地渲染的网页。同时由于其良好的扩展性，用户可以用 JS 和 HTML5 语言在上面开发各种扩展。这大大降低了开发插件的难度，是以在短短的一年之内，围绕 Atom 所建的主题超过 500 多个，插件更是超过了 2000 多件。

相关的插件都可以在 [https://atom.io/packages/](https://atom.io/packages/) 上进行查找。 个人所安装的插件列表[如下](https://github.com/imcoddy/.dotfiles/blob/feature/mac-home/atom/packages.txt)：

    atom-beautify
    atom-color-highlight
    atom-ctags
    atom-pair
    autocomplete-plus
    autocomplete-snippets
    color-picker
    comment
    dash
    easy-motion
    editor-stats
    emmet
    ex-mode
    file-icons
    filetype-color
    git-plus
    git-tab-status
    highlight-line
    highlight-selected
    japanese-wrap
    jshint
    language-scheme
    linter
    linter-coffeelint
    linter-jshint
    merge-conflicts
    minimap
    minimap-highlight-selected
    mocha-test-runner
    open-last-project
    pretty-json
    project-manager
    remote-edit
    script
    seti-monokai
    seti-ui
    symbols-tree-view
    terminal-status
    todo-show
    vim-mode
    vim-surround

长长的列表可能让人觉得管理起来会很麻烦，但这正是 Atom 的强大之处。在安装好 Atom 后它会在系统里面加上一个 ```apm``` 的命令，将上面的脚本保存到一个 packages.txt 文件里，配合一个简单的脚本，安装插件只在一念之中：

    > cat install.sh
    while read p; do
      apm install $p
    done < packages.txt

更关键的一点是，不光是插件的管理可以用文本化，插件的配置也会全部放到 ~/.atom 目录下面，并以 cson 文件格式进行保存。这就意味着，只要通过 Github 之类的服务进行托管，就能很快的将其部署到新机器上，使得在新环境也能很快将 Atom 配置成自己习惯的样子！个人的配置[如下](https://github.com/imcoddy/.dotfiles/blob/feature/mac-home/atom/config.cson)：

    "*":
      "exception-reporting": {}
      welcome:
        showOnStartup: false
      core:
        themes: [
          "one-light-ui"
          "one-light-syntax"
        ]
        disabledPackages: [
          "atom-ctags"
          "atom-pair"
          "atom-color-highlight"
          "editor-stats"
          "emmet"
          "exception-reporting"
          "git-plus"
          "git-tab-status"
          "language-scheme"
          "linter-coffeelint"
          "feedback"
          "git-plus"
          "git-tab-status"
          "metrics"
          "merge-conflicts"
          "minimap"
          "minimap-highlight-selected"
          "mocha-test-runner"
          "symbols-view"
          "symbols-tree-view"
          "terminal-status"
          "welcome"
        ]
        followSymlinks: true
      editor:
        invisibles: {}
        softWrap: true
        showIndentGuide: true
        showInvisibles: true
        softWrapAtPreferredLineLength: true
        fontSize: 14
        lineHeight: 1.2
        tabLength: 4
      "filetype-color":
        enabled: "false"
      linter: {}
      "terminal-status": {}
      "atom-beautify":
        analytics: false
        muteUnsupportedLanguageErrors: true
        language_coffeescript_beautify_on_save: true
        language_css_beautify_on_save: true
        language_csv_beautify_on_save: true
        language_html_beautify_on_save: true
        language_js_beautify_on_save: true
        language_json_beautify_on_save: true
        language_scss_beautify_on_save: true
        language_ruby_disabled: true
        language_python_beautify_on_save: true
      "vim-mode":
        useClipboardAsDefaultRegister: true
        useSmartcaseForSearch: true
      "japanese-wrap":
        characterWidth: {}
        lineBreakingRule: {}
      emmet: {}
      "autocomplete-plus":
        confirmCompletion: "tab and enter"
        includeCompletionsFromAllBuffers: true
      minimap:
        plugins:
          "highlight-selected": true
      "atom-ctags": {}
      "atom-pair": {}
      "atom-color-highlight": {}
      "linter-jshint": {}
      "vim-surround": {}
      autosave:
        enabled: true
      script:
        scrollWithOutput: false

至于其它的，还可以自定义 snippets，shortcuts 之类的，就不在这里一一描述了。但从上应该已经能体会到，只要你乐意去改，很多东西都是能 Hack 的，毕竟 Atom 从一开始就定位如此了:P

## 遗憾之处
虽然 Atom 的确有许多优秀的地方，我也通过定制尽可能地将 Vim 上的操作习惯迁移到了 Atom 上来。不过在使用 Atom 期间，还是遇到了一些小问题或不快的地方。

1. 启动稍慢
虽然打开后的反应还是很及时，但在启动的时候速度还是相对慢了一些。如果插件安装得比较多的话，有时可能需要等上数十秒。相比之下，基本 Atom 开发的微软 Code IDE 似乎快上不少，看来 Atom 应该还有不少待优化的地方。
1. 部分插件功能太弱
Vim 里面的 NerdCommenter 提供了许多强大的代码注释功能，可以快速地进行状态切换。这点在调试代码的时候非常有用。而 Atom 里面暂时还没有个较好的替代，而且唯一现在有的在家里的 Mac Mini 上还不能正常使用。其它的快速跳转和添加配对括号的插件也不是很顺手，内置的 Terminal 似乎也无法读取本地的 .zshrc 配置导致用得不习惯。这一些小问题，只能期待社区更加给力一点了。
1. 远程编辑功能缺失
不知道是我没有找对还是怎么回事，现有的 RemoteEdit 和Nuclide-server 都无法满足我的需求，使得在公司电脑上想在本地写 VM 里面的代码还是一种奢望。

虽然稍有遗憾，但 Atom 的良好可定制性，还是深深地赢得了我的欢心。也相信随着 1.0 版的面世，这款编辑器将会变得更加强大。
