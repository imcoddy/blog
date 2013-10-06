title: Powered Up From Screen To Tmux
date: 2013-10-06 21:30:05
tags: [Dev, Diary, Linux, Software, Unix]
---

平时在公司开发自然少不了用screen这类的远程作业工具，虽然screen可以很方便的进行detach和attach，不过在重新连接时，总是会出现Terminal恢复到默认80行宽的大小。虽然重新调整一下窗口大小并不是什么大事，只是每次这样拖动鼠标有些烦人。最近由于开新项目换了一台VM，解决了之前安装不了tmux的问题，于是便从此摈弃screen，全面投入到tmux的怀抱中。
<!--more-->
试用了两天，其实感觉并没有和screen有太大的差别。不过以下的几点其实还是挺贴心的：

1. 现在在远程服务器时，可以不必再重新调整一次窗口的大小了。
2. 单个windows里面划分成几个panel很方便，而且大小也比较容易调整。
3. 在下方开个panel查看帮助信息有时还是很有用的，虽然我还是不太习惯用man 命令:P
4. 状态栏的自定义功能很强大，可以方便地根据需要进行调整。

使用Linux/Unix系的软件一般都需要精心配置一番，不过这绝对是磨刀不误砍柴功。经过参考多方资料后，最终的配置如下：

    #-- base settings --#
    set -g default-terminal "screen-256color"
    set -g display-time 3000
    set -g escape-time 0
    set -g history-limit 65535
    set -g base-index 1
    set -g pane-base-index 1

    #-- bindkeys --#
    # prefix key (Ctrl+a)
    set -g prefix ^a
    unbind ^b
    bind a send-prefix

    # split window
    unbind '"'
    # vertical split (prefix -)
    bind - splitw -v
    unbind %
    bind | splitw -h # horizontal split (prefix |)

    # select pane
    bind k selectp -U # above (prefix k)
    bind j selectp -D # below (prefix j)
    bind h selectp -L # left (prefix h)
    bind l selectp -R # right (prefix l)

    # Quick pane selection
    bind -r C-h select-window -t :-
    bind -r C-l select-window -t :+

    # resize pane
    bind -r ^k resizep -U 3 # upward (prefix Ctrl+k)
    bind -r ^j resizep -D 3 # downward (prefix Ctrl+j)
    bind -r ^h resizep -L 3 # to the left (prefix Ctrl+h)
    bind -r ^l resizep -R 3 # to the right (prefix Ctrl+l)

    # swap pane
    # swap with the previous pane (prefix Ctrl+u)
    bind ^u swapp -U
    # swap with the next pane (prefix Ctrl+d)
    bind ^d swapp -D

    # Maximize and restore a pane
    unbind Up
    bind Up new-window -d -n tmp \; swap-pane -s tmp.1 \; select-window -t tmp
    unbind Down
    bind Down last-window \; swap-pane -s tmp.1 \; kill-window -t tmp

    # mouse support - set to on if you want to use the mouse
    setw -g mode-mouse off
    set -g mouse-select-pane off
    set -g mouse-resize-pane off
    set -g mouse-select-window off

    # misc
    # select the last pane (prefix e)
    bind e lastp
    # select the last window (prefix Ctrl+e)
    bind ^e last
    # kill pane (prefix q)
    bind q killp
    # kill window (prefix Ctrl+q)
    bind ^q killw

    # copy mode
    # enter copy mode (prefix Escape)
    bind Escape copy-mode
    # paste buffer (prefix Ctrl+p)
    bind ^p pasteb
    # select (v)
    bind -t vi-copy v begin-selection
    # copy (y)
    bind -t vi-copy y copy-selection

    # zoom pane <-> window
    #http://tmux.svn.sourceforge.net/viewvc/tmux/trunk/examples/tmux-zoom.sh
    bind ^z run "tmux-zoom"

    # app
    # htop (prefix !)
    bind ! splitw htop
    # man (prefix m)
    bind m command-prompt "splitw 'exec man %%'"
    # perl func (prefix @)
    bind @ command-prompt "splitw 'exec perldoc -t -f %%'"
    # perl var (prefix *)
    bind * command-prompt "splitw 'exec perldoc -t -v %%'"
    # perl doc (prefix %)
    bind % command-prompt "splitw 'exec perldoc -t %%'"
    # ruby doc (prefix /)
    bind / command-prompt "splitw 'exec ri %%'"

    #-- statusbar --#
    set -g status-utf8 on
    set -g status-interval 15
    set -g status-keys vi

    setw -g mode-keys vi
    setw -g automatic-rename off

    #-- colorscheme --#
    #https://github.com/daethorian/conf-tmux/blob/master/colors/zenburn.conf

    # modes
    setw -g clock-mode-colour colour223
    setw -g mode-attr bold
    setw -g mode-fg colour223
    setw -g mode-bg colour235

    # panes
    set -g pane-border-bg colour234
    set -g pane-border-fg colour234
    set -g pane-active-border-bg colour232
    set -g pane-active-border-fg colour232

    # statusbar
    set -g status-justify left
    set -g status-bg colour235
    set -g status-fg colour248
    set -g status-attr dim

    #[default]» #[fg=colour187]#S #[default]• #[fg=colour187]w#I.p#P#[default]"
    #set -g status-left
    set -g status-left-attr bright
    set -g status-left-length 20

    #set -g status-right
    set -g status-right-attr dim
    set -g status-right-length 80
    set -g status-right '#[fg=white][#(hostname)] %a %Y-%m-%d %H:%M'
    set -g window-status-format '#I:#W'

    setw -g window-status-current-fg colour223
    setw -g window-status-current-bg colour237
    setw -g window-status-current-attr bold
    setw -g window-status-current-format "[#I]#W#F"

    # messages
    set -g message-attr bold
    set -g message-fg colour223
    set -g message-bg colour235
    setw -g monitor-activity on
    set -g visual-activity on

    # bind to reload config
    bind r source-file ~/.tmux.conf \; display-message "Configuration Reloading..."

除了颜色的配色稍稍有点不感觉不足之外，其它的功能基本是十分满意了。改天有心情再去配配主题吧。

最后强烈推荐在使用tmux前先通篇阅读这不到百页的《[Productive Mouse-Free Development](http://book.douban.com/subject/10541112/)》小册子，不仅能让人对上面的配置的作用有更深刻的理解，而且还能发现tmux更加强大的功能（比如共享进行结对编程等）。不过话说回来，除了状态栏的自定义部分外，上面的配置其实已经很清晰明了了哈哈。

最后，吐槽一句虽然tmux这名字有个元音，但还是和其它的Linux命令名一样难念……