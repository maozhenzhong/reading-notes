# 第一章：Linux课程介绍-学习环境搭建

---

## 目录

* [Linux 云计算集群架构师课程介绍及 Linux 发展史](#introductionToLinux)
* [centos7.6 操作系统安装](#installCentOS)
* [Linux 常用命令](#linuxCommonCommands)
* [Linux 扩展](#extension)
* []()

## 内容

### <a href="#introductionToLinux" id="introductionToLinux">Linux 云计算集群架构师课程介绍及 Linux 发展史</a>

**UNIX诞生**

1969年UNIX操作系统诞生，它由美国贝尔实验室的Ken Thompson（肯 汤普森）、Dennis Ritchie（丹尼斯 里奇）发明。unics-1970年=unix元年。

**C语言诞生**

* 1972年期间C语言诞生 汇编->硬件
* 1973年，UNIX用C语言改写完成
* 最为著名的有加州大学柏克莱（伯克利）分校的BSD unix系统。
* 从1990年AT&T认识到了UNIX价值，因此他起诉包括伯克利在内的很多厂商。IBM、HP
* 伯克利不得不推出不包含任何AT&T源代码的4.4 free BSD Lite
* 1991年，这时候Linux系统正式发布

林纳斯.本纳迪克特.托瓦斯 Linux Benedict Torvalds

里查德.斯托尔曼 自由软件运动精神领袖、GNU计划以及自由软件基金会（Free Software Foundation）的创立者、著名黑客

**GNU**吉祥物牛羚/**Linux**吉祥企鹅

[http://www.gnu.org](http://www.gnu.org)

* GNU计划，是由Richard Stallman公开发起。它的目的是创建一套完全自由的操作系统
* GNU是“GNU 's Not Unix”的缩写
* “free”指的是自由（freedom），而不是价格

**Linux内核**

内核网址：[http://www.kernel.org](http://www.kernel.org)

**各服务器操作系统行业分析**

* Unix小型机
* x86稳定、集群】价格低
* Windows易用
* 版权
* Linux redhat 
* centos

### <a href="#installCentOS" id="installCentOS">CentOS 7 操作系统安装</a>

第一步：进入安装界面

![](../img/install-linux-1.png)

**界面说明：**

* `Install CentOS7` 安装CentOS7 **[推荐]**
* `Test this media & CentOS 7` 测试安装的光盘镜像并安装CentOS7 **（检测时间较长）**
* `Troubleshooting` 修复故障

第二步：进入语言选择，可以选择中文-简体中文（中国）我选择默认英语

![语言选择](../img/install-linux-1-1.png)

第三步：进入一站式安装界面，在此界面只需要把带⚠️内容的感叹号全部消除，便可进行安装

![语言选择](../img/install-linux-2.png)

时区选择亚洲上海

![时区选择](../img/install-linux-3.png)

语言选择

![语言选择](../img/install-linux-4.png)

键盘默认

安装源使用默认

![安装源](../img/install-linux-5.png)

软件包源，初学者建议选择带GUI的服务器，同时把“开发工具”相关的软件包也安装上

![软件包源](../img/install-linux-6.png)

选择-系统-安装位置，进入磁盘分区界面

![安装位置](../img/install-linux-7.png)

![进入磁盘分区界面](../img/install-linux-8.png)

分区方案有:

1. Standard Partition，**[选择这项，标准分区]**
2. btrfs，
3. LVM，
4. LVM Thin Pprovisioning，

![分区方案](../img/install-linux-9.png)

然后单击 创建新的分区，分区提前规划好， /boot 分区 500M，一般 swap 分区为物理内存 的 1.5~2 倍，当物理机内存多于 16G 后，swap 分区给 8-16G 都可以。 /根分区 10G，实际工作中 可以创建数据分区，一般把数据和系统分开。

`/boot` 分区

![`/boot` 分区](../img/install-linux-10.png)

`/swap` 分区

![`/swap` 分区](../img/install-linux-11.png)

`/` 分区

![`/` 分区](../img/install-linux-12.png)

选择接受更改选项

![选择接受更改选项](../img/install-linux-13.png)

**[注：]**

1. `boot` 分区： 是引导分区，作用：系统启动，在 `boot` 分区存放着 `grub`，内核文件等，一般 200M 就够，考虑到内核升级建议500M。
2. `swap` 交换分区：内存扩展分区 交换分区 给多大？ 一般最多：8G，16G，如果系统使用到了 swap 分区，就直接添加物理内存或排查一下服务器有没有被黑，我这里给2G。 
3.  `/` 根 ： 所有文件的根 绝对路径的开始标志

关闭 kdump

![关闭 kdump](../img/install-linux-14.png)

网络配置，默认 centos7 是关闭网络的，我们在这里一定要开启以太网连接，将会自动获取 IP 地址。我们配置主机名为： test 并修改为静表态 IP 地址：

![网络配置](../img/install-linux-15.png)

![网络配置](../img/install-linux-16.png)

手动配置

![手动配置](../img/install-linux-17.png)

安全策略使用默认

进入安装界面，这里需要配置用户密码

![安装界面](../img/install-linux-18.png)

输入密码

![输入密码](../img/install-linux-19.png)

系统成功启动

![系统启动界面](../img/install-linux-20.png)

这里分两个分支：如果安装了GUI进入GUI设置界面，如果是最小安装，则进入命令界面

进入命令界面

输入登录的账号和密码

![输入账户](../img/install-linux-20-1.png)

![输入密码](../img/install-linux-20-2.png)

GUI设置界面

点击 Licensing

![Licensing](../img/install-linux-21.png)

同意许可协议

![Licensing](../img/install-linux-22.png)

首次登陆进行 Gnome-initial-setup（GNOME 初始化设置） 语言选择，默认就可以，直接前进

![语言选择](../img/install-linux-23.png)

选择键盘布局，默认前进即可

![键盘布局](../img/install-linux-24.png)

![位置服务](../img/install-linux-25.png)

关闭定位服务

![定位服务](../img/install-linux-26.png)

在线账号设置，如果有可以进行设置，没有的话，直接跳过即可

![在线账号设置](../img/install-linux-27.png)

设置一个登录账号

![登录账号](../img/install-linux-28.png)

![登录账号密码](../img/install-linux-29.png)

一切准备就绪，开始使用 centos7.4 系统

![开始使用](../img/install-linux-30.png)

弹出使用介绍界面，关闭即可

![使用介绍界面](../img/install-linux-31.png)

到此 centos7.4 操作系统安装完成

打开终端

![打开终端](../img/install-linux-32.png)

### <a href="#linuxCommonCommands" id="linuxCommonCommands">Linux 常用命令</a>

* `man`: Manual
* `pwd`: Print working directory
* `su`: Swith user
* `cd`: Change directory
* `ls`: List files
* `ps`: Process Status
* `mkdir`: Make directory
* `mkfs`: Make file system
* `fsck`: File system check
* `cat`: Concatenate
* `uname`: Unix name
* `df`: Disk free
* `du`: Disk usage
* `lsmod`: List modules
* `mv`: Move file
* `rm`: Remove file
* `cp`: Copy file
* `ln`: Link files
* `fg`: Foreground
* `bg`: Background
* `chown`: Change owner
* `chgrp`: Change group
* `chmod`: Change mode
* `umount`: Unmount
* `dd`: 本来应根据其功能描述“Convert an copy”命名为“cc”，但“cc”已经被用以代表“C Complier”，所以命名为“dd” 
* `tar`: Tape archive
* `ldd`: List dynamic dependencies
* `insmod`: Install module
* `rmmod`: Remove module
* `lsmod`: List module

### <a href="#extension" id="extension">扩展</a>

CentOS6与CentOS7的区别：

* 文件系统的区别：ext4 xfs
* 硬盘默认调度算法不一样：cfq deadline
* 内核版本不一样2.6 3.10
* 在7中，支持动态补丁机制kpatch，这个也是作为技术预览的，和btrfs文件系统一样
* 支持内核模块黑名单机制：modproble.blacklist=module
* 支持嵌套虚拟化技术，对虚拟机cpu更流畅
* 内核级支持资源调优和分配 在7中cgroup
* 在6中对usb2.0在7中usb3.0支持
* lvm快照。在7中。qcow2格式文件型快照的支持
* 加强了对vmware的技术支持，自带open-vmtools替换了vm-tools
* 启动工具，在7中用的全新服务器启动管理器 systemctl，在6中做一些服务的启停用service
* 在7中内核出现错误了。导出core文件最大支持3TB，6中最大支持2TB