# 第三章：Linux基本命令操作和文件管理

---

## 目录

* [Linux终端介绍Shell提示符Bash Shell 基本语法](#shell)
* [基本命令使用 ls、pwd、cd、history](#basicCommands)
* [查看系统和BIOS硬件时间](#time)
* [Linux 如何获得帮助](#help)
* [开关机命令及7个启动级别](#switchLevel)
* [CentOS7 时间与网络时间同步](#networkTime)
* [实战：设置服务器来电后自动开机](#actualCall)
* [实战：设置服务器定时开机](#actualCombat)

## 内容

### <a href="#shell" id="shell">Linux终端介绍Shell提示符Bash Shell 基本语法</a>

#### 登录LINUX终端

两种终端仿真器：

1. GNOME桌面的GHOME Terminal
2. KDE桌面的Konsole Terminal

远程连接终端工具：Xshell、CRT。

通过`tty`命令看到当前所属的虚拟终端

```
[root@spring ~]# tty
/dev/pts/0
```

```
# 终端之间的通信
[root@spring ~]# echo spring > /dev/tty1
```

```
# 在所有的终端上进行一次广播
[root@spring ~]# wall 'hello word'
[root@spring ~]#
Broadcast message from root@spring (pts/0) (Fri Jan 24 02:00:09 2020):

hello word
```

```
# 十分钟后关机
[root@spring ~]# shutdown +10
Shutdown scheduled for Fri 2020-01-24 02:11:11 CST, use 'shutdown -c' to cancel.
[root@spring ~]#
Broadcast message from root@spring (Fri 2020-01-24 02:01:11 CST):
The system is going down for power-off at Fri 2020-01-24 02:11:11 CST!
```

```
# 取消关机
[root@spring ~]# shutdown -c
Broadcast message from root@spring (Fri 2020-01-24 02:01:38 CST):
The system shutdown has been cancelled at Fri 2020-01-24 02:02:38 CST!
```

#### 认识 `shell`

Shell俗称壳，它提供了用户与内核进行交互操作的一种接口，它接受用户输入的命令并把它送入内核去执行

Shell实际上是一个命令解释器，它通过解释用户输入的命令并把它传输给系统内核去执行。

Shell有自己的编程语言用于对命令的编辑，它允许用户编写由shell命令组成的程序。shell编程语言具有普通编程语言的很多特点，比如它也有循环结构和分支控制结构等，用这种编程语言编写的shell程序与其他应用程序具有同样的效果。

![shell流程图](./img/shell.png)

**内部命令：** 在系统启动时就调入内存，是常驻内存的，所以执行效率高

**外部命令：**是系统软件的功能，用户需要时才从硬盘中读入内存

区分内部外部命令的方法`type`

使用`type`命令语法type 要检查的命令

```
[root@localhost ~]# type pwd
# 显示结果
pwd is a shell builtin
```

```
[root@localhost ~]# type cat
# 显示结果
cat is /usr/bin/cat
```

### shell 提示符`#`与`$`的区别

```
[root@localhost ~]# # “#”号表示root用户登录，管理员账号
```

```
# 切换账户
[root@localhost ~]# su - spring
# 显示结果
Last login: Sun Dec 15 21:26:56 CST 2019 on :0
```

```
[spring@localhost ~]$ # "$"号表示普通用户登录
```

上面各位置对应的内容代表的意思如下：

**用户名@主机名 当前工作目录(~表示当前用户的家目录)**

### 认识`shell`

```
# 查看shell类型
[root@localhost ~]# cat /etc/shells
# 结果
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
/bin/tcsh
/bin/csh
```

具体你使用的是哪一个，取决于你的用户配置，也就是说你可以看一下/etc/passwd 文件的每一行的最后一个字段

```
[root@root ~]# head -1 /etc/passwd
# 结果
root:x:0:0:root:/root:/bin/bash
```

### <a href="#basicCommands" id="basicCommands">基本命令使用 ls、pwd、cd、history</a>

命令格式为：

命令 【选项】【参数】 对象

* 命令：具体执行的命令，比如：pwd、head
* 选项：会影响到命令的一些行为操作，通常以“-”“--”实现
* 参数：命令作用的对象

### 1. 基本命令之 `ls`

作用：查看当前目录下有哪些文件（list）

语法:ls 目录/文件 ，如果什么也不加，那么查看的是当前目录下的内容 常用选项:

```
[root@root ~]# ls 后面什么也不加
```

==》-l 列出文件的详细信息，如创建者，创建时间，文件有什么权限等

```
[root@root ~]# ls -l a.txt
```

![文件基本信息](./img/file.png)

第一个字符表示的是文件类型: 

* d: 目录文件
* l: 链接文件 
* b: 块设备文件 
* c: 字符设备文件 
* p: 管道文件
* -: 表示普通文件

Linux 系统中不同的颜色代表了不同的文件类型

|   颜色   | 代表内容     |  举例                |
|:-------:|:-----------:|:--------------------:|
|  蓝色    |  目录       |  /etc                 |
|  黑色    |  文件       |  /etc/passwd          |
|  浅蓝色  |  链接       |  /etc/grub2.cfg       |
|  红色    |  压缩包     |  boot.tar.gz          |
|  绿色    |  可执行文件  |  /etc/init.d/network |
|  黑底黄色 |  设备文件   |  /dev/sda             |

==> -a 列出目 录下所有的文件，包括以“.“开头的隐藏文件(linux 下隐藏文件是以 . 开头的，如果存在 2 个点代表存在着父目 录,1 个点表示当前目录)

```
[root@localhost ~]# ls -a
.   anaconda-ks.cfg  .bash_logout   .bashrc  .config  .dbus                 .tcshrc
..  .bash_history    .bash_profile  .cache   .cshrc   initial-setup-ks.cfg  .viminfo
```

==> -d 查看目录(不查看目录里面内容) 

```
[root@localhost ~]# ls -d /etc
/etc
[root@localhost ~]# ls -d -l /etc
drwxr-xr-x. 140 root root 8192 Dec 20 19:37 /etc [root@xuegod63 ~]# ls -ld /etc
drwxr-xr-x. 140 root root 8192 Dec 20 19:37 /etc
```
==> -S 以文件的大小进行排序

```
[root@localhost ~]# ls -lS
```

ls -l 和 ll 这两个命令是等价的 

```
[root@localhost ~]# ls -l /mnt
     total 32
-rwxrw-rw-. 1 root root 4074 Sep 7 20:19 vimrc.zip
-rw-r--r--. 1 root root -rw-------. 1 root root -rw-r--r--. 1 root root -rw-r--r--. 1 root root -rwxr-xr-x. 1 root root
2063 Sep 19 07:02 initial-setup-ks.cfg 2015 Sep 18 22:02 anaconda-ks.cfg
26 Dec 11 22:26 a.sed 25 Dec 14 22:08 a.txt
21 Dec 11 20:42 test1.sh
  total 4
-rw-r--r--. 1 root root 646 Nov 27 16:46 menu.sh
[root@xuegod63 ~]# ll /mnt
[root@xuegod63 ~]# type ll
ll is aliased to `ls -l --color=auto'
```

### 别名的使用

```
# 定义一个别名
[root@root ~]# vim /etc/sysconfig/network-scripts/ifcfg-ens33
[root@root ~]# alias vimens33='vim /etc/sysconfig/network-scripts/ifcfg-ens33'
[root@root ~]# vimens33
```

```
# 删除别名
[root@root ~]# unalias vimens33
[root@root ~]# vimens33

# 输出
bash: vimens33: command not found...
```

设置别名永久生效:

==> 当前用户

```
[root@root ~]# vim /root/.bashrc 
# 插入以下内容
alias vimenss33="vim /etc/sysconfig/network-scripts/ifcfg-ens33" 

# 执行一下命令
[root@root ~]# source /root/.bashrc
[root@root ~]# vimenss33
```

==> 全局使用

```
[root@root ~]# vim /etc/bashrc 

#在文件最后插入
alias vimenss33="vim /etc/sysconfig/network-scripts/ifcfg-ens33" 

测试:

[root@root ~]# su - spring
Last login: Wed Dec 20 21:46:46 CST 2017 on pts/1
[hr@root ~]$ vimens33
```

#### 基本命令之 `cd`

作用：切换目录(change directory)

说明：直接输入 cd 表示回到当前用户的宿主(家)目录 

```
[root@root ~]# cd /etc/sysconfig/network-scripts/ 
[root@root network-scripts]# cd
[root@root ~]# cd ~
cd .. 表示返回到上级目录位置，也就是父目录
cd . 表示进入到当前目录
[root@root ~]# pwd
/root
[root@root ~]# cd ..
[root@root /]# pwd
/
[root@root /]# cd .
[root@root /]#
cd - #表示返回切换前的目录
[root@root /]# cd /etc/sysconfig/network-scripts/ 
[root@root network-scripts]# cd -
/
```

#### 历史命令之 `history`

命令:history

4 个快速查找 linux 历史命令的技巧:

* 方法 1: 光标上下键
* 方法 2: ctrl+r -》输入某条命令的关键字-》找出来对应的命令，按右光标键
* 方法 3: !数字 // 执行历史命令中第 N 条命令
* 方法 4: !字符串 // 搜索历史命令中最近一个以 xxxx 字符开头的命令，例如!vim

#### Liunx 快捷键

都是用 Ctrl+下面的单词， ^表示 Ctrl 

**^C**  
终止前台运行的程序 , 如:ping g.cn 后，想停止按下 Ctrl+C 

**^D**  
退出 等价 exit
 
**^L**  
清屏与 clear 功能一样

**^R**  
搜索历史命令，可以利用好关键词

**!$**   
引用上一个命令的最后一个参数

命令补全使用 **tab** 键，tab 只能补全命令和文件(前提这个命令或文件要存在)

### <a href="#time" id="time">查看系统和BIOS硬件时间</a>

在 Linux 中有硬件时钟与系统时钟等两种时钟。硬件时钟是指主机板上的时钟设备，也就是通常可在 BIOS 画 面设定的时钟;系统时钟则是指 kernel 中 的时钟;所有 Linux 相关指令与函数都是读取系统时钟的设定
当 Linux 启动时，系统时钟会去读取硬件时钟的设定，之后系统时钟即独立运作

```
# 查看硬件时间
[root@localhost ~]# hwclock
Sun 15 Dec 2019 11:10:08 PM CST  -0.931344 seconds
```

```
# 查看系统时间
[root@localhost ~]# date
Sun Dec 15 23:10:56 CST 2019
```

时区:

* UTC (Universal Time Coordinated):世界标准时间 
* GMT (Greenwich Mean Time):格林尼治时间
* CST (China standard Time):中国标准时间

#### 修改时间

```
[root@localhost ~]# date '+%Y-%m-%d %H:%M:%S'
2019-12-15 23:18:50
```

```
# %F 完整日期格式，等价于 %Y-%m-%d
[root@spring ~]# date "+%F"
2020-01-24
```

date 命令相关参数：

date --help

-s, --set=STRING 把时间设为字符串所描述的时间

```
[root@spring ~]# date "+%Y 年 %m 月 %d 日 %H : %M : %S"
2020 年 01 月 24 日 09 : 07 : 45
```

#### 使用 time 命令测试一个命令运行的时间

time 作用:一般用来测量一个命令的运行时间 

使用方法:time 在后面直接跟上命令和参数

```
[root@localhost ~]# time ls -l /etc/

real	0m0.032s
user	0m0.001s
sys 	0m0.028s
```

说明:

* `real`: 实际使用时间 
* `user`: 用户状态使用的时间 
* `sys` : 内核状态使用的时间

### <a href="#help" id="help">Linux 如何获得帮助</a>

man 手册:查看命令的手册页

```
man date
```

使用`-h`或`--help`查看命令选项

```
[root@localhost ~]# find --help 
[root@localhost ~]# help time
```

### <a href="#switchLevel" id="switchLevel">开关机命令及7个启动级别</a>

常用的几个关机，重启命令：

* shutdown
* init
* reboot
* poweroff

### shutdown

作用:关机，重启，定时关机  
语法:shutdown [选项]  
参数：

* -r => 重新启动计算机
* -h =>关机
* -h 时间 =>定时关机

```
shutdown -h 1 //1分钟后关机，1是以分钟为单位。
shutdown now //立即关机
shutdown -H now // 挂起CPU
shutdown -r now // 立即重启
shutdown -c // 取消关机
```

7 个启动级别  
作用:切换系统运行级别  
语法:init 0-6  
Linux 7 个启动级别:

* 0 系统停机模式，系统默认运行级别不能设置为 0，否则不能正常启动，机器关的
* 1 单用户模式，root 权限，用于系统维护，禁止远程登陆，就像 Windows 下的安全模式登录 
* 2 多用户模式，没有 NFS 和网络支持
* 3 完整的多用户文本模式，有 NFS 和网络，登陆后进入控制台命令行模式
* 4 系统未使用，保留一般不用，在一些特殊情况下可以用它来做一些事情。例如在笔记本电脑的电池用尽时，可以 切换到这个模式来做一些设置
* 5 图形化模式，登陆后进入图形 GUI 模式，X Window 系
* 6 重启模式，默认运行级别不能设为 6，否则不能正常启动。运行 init 6 机器就会重启

```
 [root@localhost ~]# init 0 # 关机
 [root@localhost ~]# init 3 # 进入 3 级别字符界面
 [root@localhost ~]# init 5 # 进入 5 级别图形界面
```

设置默认的运行界别

centos7 不再使用/etc/inittab 文件进行默认的启动级别配置，而使用比 sysvinit 的运行级更为自由的 target 替 代。

第 3 运行级用 multi-user.target 替代。  
第 5 运行级用 graphical.target 替代。  

设置默认第三启动级别

```
[root@localhost ~]# systemctl set-default multi-user.target 设置默认第五启动级别
[root@spring ~]# systemctl set-default multi-user.target
Removed symlink /etc/systemd/system/default.target.
Created symlink from /etc/systemd/system/default.target to /usr/lib/systemd/system/multi-user.target.
[root@localhost ~]# systemctl set-default graphical.target
[root@localhost ~]# runlevel
N 5 # 表示从 N 级别切换到了 5 级别
```

### <a href="#networkTime" id="networkTime">CentOS7 时间与网络时间同步</a>

**1、NTP 和 NTPDATE**

在 Linux 系统中，可以通过 ntpdate 和 ntpd 两种方式实现 NTP 时间同步，ntpdate 为断点更新，ntpd 为步进式地逐渐调整时间。对于新服务器，可以使用 ntpdate 同步时间，对于已经承载有运行中业务的服务器，建议使用 ntpd 同步时间。

```
[root@spring ~]# yum -y install ntp ntpdate # 安装ntpdate工具
```

```
[root@spring ~]# ntpdate 0.asia.pool.ntp.org # 设置系统时间与网络时间同步
 8 Feb 23:57:43 ntpdate[1280]: step time server 211.19.59.28 offset 28802.276867 sec
```

**NTP服务器**


为了同步系统时钟,首先需要找一个NTP服务器使用, 一下这个同步时间的速度比较快,如：

1. `pool.ntp.org`、
2. `cn.pool.ntp.org`、
3. `0.pool.ntp.org`、
4. `2.pool.ntp.org`、
5. `time.nist.gov`、
6. `time.nuri.net`、
7. `0.asia.pool.ntp.org`、
8. `1.asia.pool.ntp.org`、
9. `2.asia.pool.ntp.org`、
10. `3.asia.pool.ntp.org`

选择多个服务器的好处: 当某个服务器不通的时候，或者时钟不可靠的时候可以有别的选择,因为`ntpd`会智能选择智能地选择它收到的响应──它会更倾向于使用可靠的服务器。

```
[root@spring ~]# hwclock --systohc # 将系统时间写入硬件时间
```

这里是为了防止系统重启后时间被还原，因此需要写到硬件设备中去。

* `timedatectl`：Linux 7中的新增功能，也是systemd其中的一部分。
* `date`：系统时钟，也成为软件时钟，一旦系统启动并且系统时钟被初始化，系统时钟就完全独立硬件时钟。
* `hwclock`：  real-time clock (RTC)通常被称为硬件时钟，（在系统集成电路板上）,即使在机器关闭时也能正常工作。实时时钟可以使用UTC（ Universal Time）或本地时间，建议使用UTC。

```
[root@spring ~]# date # 查看系统时间
Sun Feb  9 00:26:47 CST 2020
[root@spring ~]# hwclock # 查看硬件时间
Sun 09 Feb 2020 12:26:54 AM CST  -0.386609 seconds
[root@spring ~]# timedatectl # 查看系统时间方面的各种状态
      Local time: Sun 2020-02-09 00:27:13 CST
  Universal time: Sat 2020-02-08 16:27:13 UTC
       Time zone: Asia/Shanghai (CST, +0800)
     NTP enabled: no
NTP synchronized: no
 RTC in local TZ: yes
      DST active: n/a

Warning: The system is configured to read the RTC time in the local time zone.
         This mode can not be fully supported. It will create various problems
         with time zone changes and daylight saving time adjustments. The RTC
         time is never updated, it relies on external facilities to maintain it.
         If at all possible, use RTC in UTC by calling
         'timedatectl set-local-rtc 0'.

```

```
[root@spring ~]# timedatectl list-timezones # 列出所有时区
Africa/Abidjan
Africa/Accra
Africa/Addis_Ababa
Africa/Algiers
Africa/Asmara
Africa/Bamako
Africa/Bangui
Africa/Banjul
Africa/Bissau
Africa/Blantyre
Africa/Brazzaville
Africa/Bujumbura
Africa/Cairo
Africa/Casablanca
Africa/Ceuta
Africa/Conakry
Africa/Dakar
Africa/Dar_es_Salaam
Africa/Djibouti
Africa/Douala
Africa/El_Aaiun
Africa/Freetown
Africa/Gaborone
Africa/Harare
lines 1-24
[root@spring ~]# timedatectl set-local-rtc 1 # 将硬件时钟调整为与本地时钟一致, 0 为设置为 UTC 时间
[root@spring ~]# timedatectl set-timezone Asia/Shanghai # 设置系统时区为上海
```

### <a href="#actualCall" id="actualCall">实战：设置服务器来电后自动开机</a>

进入 bios，一般是在开机后出现主板画面是按 Delete 这个键，部分品牌机可能按 F2，F1

选择 Integrated Peripharals（外围设备设置）中的 SuperIO Device

Integrated [ˈɪntɪgreɪtɪd] 集成 ； Peripharals [pəˈrɪfərəl] 外围

将其中的 Restore On AC Power Loss 选项修改:Power On

（若要加电不开机选择 Power Off，若要加电之前断电状态选择 Last State）

### <a href="#actualCombat" id="actualCombat">实战：设置服务器定时开机]</a>

设置服务器定时开机

Power Management Setup，就进入电源管理设置了

通过回车进入这个设置后，选择 Wake Up Event Setup，回车选择 Press Enter

找到 RTC Alarm（[əˈlɑ:m] 报警），将 Disabied 更改为 Enabled，然后继续回车确定。然后再继续设置时间点和日期

按 F10 保存，退出。