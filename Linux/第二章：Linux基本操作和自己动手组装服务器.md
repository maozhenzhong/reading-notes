# 第二章：Linux基本操作和自己动手组装服务器

---

## 目录

* [Linux网络相关概念和修改IP地址的方法](#Linux网络相关概念和修改IP地址的方法)
* [关闭防火墙并设置开机不启动](#关闭防火墙并设置开机不启动)
* [临时和永久关闭Selinux](#临时和永久关闭Selinux)
* [设置系统光盘开机自动挂载](#设置系统光盘开机自动挂载)
* [配置本地YUM源](#配置本地YUM源)
* [创建可用实验快照](#创建可用实验快照)
* [实战：DIY一台1U服务器](#实战：DIY一台1U服务器)

## 课程内容

### <a id="Linux网络相关概念和修改IP地址的方法">Linux网络相关概念和修改IP地址的方法</a>

网卡的命名规则：

CentOS6的网卡命名方式：它会根据情况有所改变而非唯一且固定，在CentOS6之前，网络接口使用连续号码命名：eth0、eth1等，当增加或删除网卡时，名称可能会发生变化

CentOS7采用dmidecode采集命名方案，以此来得到主板信息；它可以实现网卡名字永久唯一化（dmidecode这个命令可以采集有关硬件方面的信息）

2.1.1 对网络设备的命名方式：

1. 如果Firmware（固件）或BIOS为主板上集成的设备提供的索引信息可用，且可预测则根据此索引进行命名，例如：ifcfg-ens33
2. 如果Firmware（固件）或BIOS为PCI-E扩展槽所提供的索引信息可用，且可预测则根据此索引进行命名，例如：ifcfg-enp33
3. 如果硬件接口的物理位置信息可用，则根据此信息进行命名，例如enp2s0
4. 上述均不可用，则使用传统命名机制
5. CentOS8=ens160 `ifcfg-enp0s3`

enX（X常见有以下3种类型）：

* o: 主板板载网卡，集成设备的设备索引号。
* p: 独立网卡，PCI网卡
* s: 热插拔网卡，USB之类，扩展槽的索引号
* nnn(数字)表示:MAC地址+主板信息计算得出唯一的序列

2.1.2 ifconfig命名使用方法

注意：下面操作使用root用户（动态修改）

命令`ifconfig`

作用：用来配置网络或显示当前的网络接口的状态

```
[root@localhost ~]# ifconfig

-bash: ifconfig: command not found

[root@localhost ~]# yum install net-tools

[root@localhost ~]# ifconfig
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.2.216  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::b990:81cf:812c:c4a5  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:7b:1b:62  txqueuelen 1000  (Ethernet)
        RX packets 624  bytes 359150 (350.7 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 258  bytes 46939 (45.8 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 4  bytes 344 (344.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 4  bytes 344 (344.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

上图信息说明： 

* 第一行：
	+ UP-->网卡开启状态 
	+ RUNNING-->网线处理连接状态 
	+ MULTICAST-->支持组播 
	+ mtu 1500-->（Maximum Transmission Unit）最大传输单元大小为 1500 字节 
* 第二行：该网卡的 IP 地址，子网掩码，广播地址 
* 第三行：IPV6 的配置信息 
* 第四行：网卡的 MAC 地址 ether 表示连接类型为以太网 txqueuelen 1000 -->传输队列的长度 
* 第五六行：网卡接收数据包的统计信息和接收错误的统计信息 
* 第七八行：网卡发送数据包的统计信息和发送错误的统计信息

```
临时修改IP信息
[root@localhost ~]# ifconfig enp0s3 192.168.2.220 netmask 255.255.255.0
```

```
# 永久修改IP
[root@localhost ~]# cd /etc/sysconfig/network-scripts/

[root@localhost network-scripts]# vim ifcfg-enp0s3

TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static"
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="enp0s3"
UUID="56724705-d76b-483a-9c6d-a5f4413844c7"
DEVICE="enp0s3"
ONBOOT="yes"
IPADDR="192.168.2.220"
NETMASK="255.255.255.0"
PREFIX="24"
GATEWAY="192.168.2.1"
DNS1="192.168.2.1"
DNS2="8.8.8.8"
IPV6_PRIVACY="no"

# 重启网卡
[root@localhost network-scripts]# systemctl restart network # CentOS7
[root@localhost network-scripts]# service network restart # CentOS6
```

参数说明： 

```
DEVICE：# 此配置文件应用到的设备 
HWADDR：# 对应的设备的 MAC 地址 
BOOTPROTO：# 激活此设备时使用的地址配置协议，常用的 dhcp, static, none, bootp
NM_CONTROLLED： # NM 是 NetworkManager 的简写，此网卡是否接受 NM 控制；建议 CentOS6 为“no” 
ONBOOT：# 在系统引导时是否激活此设备 
TYPE：# 接口类型；常见有的 Ethernet, Bridge 
UUID：# 设备的惟一标识 
IPADDR：# 指明 IP 地址 
NETMASK：# 子网掩码 
GATEWAY: # 默认网关
DNS1：# 第一个 DNS 服务器指向 
DNS2：# 第二个 DNS 服务器指向 
USERCTL：# 普通用户是否可控制此设备 
IPV4_FAILURE_FATAL # 如果为 yes，则 ipv4 配置失败禁用设备
```

```
# 零时添加多个网卡
[root@localhost network-scripts]# ifconfig enp0s3:1 192.168.2.221 netmask 255.255.255.0
[root@localhost network-scripts]# ifconfig enp0s3:2 192.168.2.222 netmask 255.255.255.0
```

```
# 删除网卡
ifconfig enp0s3:1 del
```

```
[root@localhost network-scripts]# systemctl status NetworkManager
● NetworkManager.service - Network Manager
   Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled; vendor preset: enabled)
   Active: active (running) since Mon 2020-01-13 22:27:47 CST; 1h 52min ago
     Docs: man:NetworkManager(8)
 Main PID: 615 (NetworkManager)
   CGroup: /system.slice/NetworkManager.service
           └─615 /usr/sbin/NetworkManager --no-daemon

Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Jan 14 00:05:43 localhost.localdomain NetworkManager[615]: <info>  [157893154...
Hint: Some lines were ellipsized, use -l to show in full.
```

```
# CentOS 8
[root@spring ~]# systemctl status NetworkManager
● NetworkManager.service - Network Manager
   Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled; ven>
   Active: active (running) since Wed 2020-02-05 13:54:30 CST; 18min ago
     Docs: man:NetworkManager(8)
 Main PID: 660 (NetworkManager)
    Tasks: 3 (limit: 6084)
   Memory: 7.4M
   CGroup: /system.slice/NetworkManager.service
           └─660 /usr/sbin/NetworkManager --no-daemon

Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.1823] device (e>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2128] device (e>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2207] device (e>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2218] device (e>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2244] manager: >
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2357] manager: >
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2364] policy: s>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2517] device (e>
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2547] manager: >
Feb 05 13:54:33 spring NetworkManager[660]: <info>  [1580882073.2802] manager: >
lines 1-20/20 (END)
```

```
# 修改完网卡，后重新启动CentOS6、7、8都可用
ifdown enp0s3 && ifup enp0s3
```

```
# 永久改变主机名
[root@localhost ~]# hostnamectl set-hostname spring
[root@localhost ~]# vim /etc/hostname
# 修改完以后重启终端就会改变
```

```
# 永久修改网卡地址
[root@spring network-scripts]# nmcli connection modify enp0s3 ipv4.addresses 192.168.2.223/24 ipv4.method manual ipv4.gateway 192.168.2.1 ipv4.dns 8.8.8.8

# 关闭网卡
[root@spring network-scripts]# nmcli connection down enp0s3

# 重启网卡
[root@spring network-scripts]# nmcli connection up enp0s3
```

`NeworkManager`概述

`NeworkManager` 服务是管理和监控网络设置的守护进程，CENTOS7更加注重实用`NeworkManager`服务来实现网络的配置和管理，7.0 以前是通过network服务管理网络，以后的版本，所有网络管理和设置统一由`NeworkManager`服务来维护。它是一个动态的，事件驱动的网络管理服务。

```
# 查看NetworkManager 服务是否启动
[root@spring network-scripts]# systemctl status NetworkManager 
● NetworkManager.service - Network Manager
   Loaded: loaded (/usr/lib/systemd/system/NetworkManager.service; enabled; vendor preset: enabled)
   Active: active (running) since Thu 2020-01-23 22:24:52 CST; 1h 45min ago
     Docs: man:NetworkManager(8)
 Main PID: 598 (NetworkManager)
   CGroup: /system.slice/NetworkManager.service
           └─598 /usr/sbin/NetworkManager --no-daemon

Jan 23 22:24:52 spring NetworkManager[598]: <info>  [1579789492.9848] device...)
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0022] device...)
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0081] device...)
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0101] device...)
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0122] manage...L
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0805] manage...E
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0806] policy...S
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0857] device....
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0890] manage...L
Jan 23 22:24:53 spring NetworkManager[598]: <info>  [1579789493.0924] manage...e
Hint: Some lines were ellipsized, use -l to show in full.
```

### <a id="关闭防火墙并设置开机不启动">关闭防火墙并设置开机不启动</a>

```
# 查看firewalld状态
[root@spring ~]# systemctl status firewalld.service
● firewalld.service - firewalld - dynamic firewall daemon
   Loaded: loaded (/usr/lib/systemd/system/firewalld.service; enabled; vendor preset: enabled)
   Active: active (running) since Wed 2020-01-15 00:07:34 CST; 22min ago
     Docs: man:firewalld(1)
 Main PID: 616 (firewalld)
   CGroup: /system.slice/firewalld.service
           └─616 /usr/bin/python2 -Es /usr/sbin/firewalld --nofork --nopid

Jan 15 00:07:33 spring systemd[1]: Starting firewalld - dynamic firewall da.....
Jan 15 00:07:34 spring systemd[1]: Started firewalld - dynamic firewall daemon.
Hint: Some lines were ellipsized, use -l to show in full.
```

```
# 关闭
[root@spring ~]# systemctl stop firewalld
# 开启
[root@spring ~]# systemctl start firewalld
# 开机不启动// RHLE7
[root@spring ~]# systemctl disable firewalld
Removed symlink /etc/systemd/system/multi-user.target.wants/firewalld.service.
Removed symlink /etc/systemd/system/dbus-org.fedoraproject.FirewallD1.service.

# 查看开机是否启动 // RHLE6
[root@spring ~]# chkconfig --list|grep network

# 开机自动启动
[root@spring ~]# systemctl enable firewalld
# // RHLE8
[root@spring ~]# systemctl is-enabled firewalld.service
```

### <a id="临时和永久关闭Selinux">临时和永久关闭Selinux</a>

```
# 查看
[root@spring ~]# getenforce
```

```
[root@spring ~]# setenforce
```

```
# 永久修改关闭Selinux
[root@spring ~]# vim /etc/selinux/config

# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
# SELINUX=enforcing
SELINUX=disabled
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted

# 执行
[root@spring ~]# setenforce 0
```

### <a id="设置系统光盘开机自动挂载">设置系统光盘开机自动挂载</a>

```
# 查看挂载的情况
[root@spring ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
devtmpfs        990M     0  990M   0% /dev
tmpfs          1000M     0 1000M   0% /dev/shm
tmpfs          1000M  8.6M  991M   1% /run
tmpfs          1000M     0 1000M   0% /sys/fs/cgroup
/dev/sda3        17G  1.3G   16G   8% /
/dev/sda1       497M  124M  374M  25% /boot
tmpfs           200M     0  200M   0% /run/user/0
```

mount 设备文件位置 挂载点 
umount 

```
[root@spring ~]# vim /etc/fstab

/dev/sr0                                  /mnt                    iso9660 defaults        0 0
```

### <a id="配置本地YUM源">配置本地YUM源</a>

```
[root@spring ~]# cd /etc/yum.repos.d/

[root@spring yum.repos.d]# vim CentOS-Media.repo

mount: /dev/sr0 is write-protected, mounting read-only
# CentOS-Media.repo
#
#  This repo can be used with mounted DVD media, verify the mount point for
#  CentOS-7.  You can use this repo and yum to install items directly off the
#  DVD ISO that we release.
#
# To use this repo, put in your DVD and use it with the other repos too:
#  yum --enablerepo=c7-media [command]
#
# or for ONLY the media repo, do this:
#
#  yum --disablerepo=\* --enablerepo=c7-media [command]

[c7-media]
name=CentOS-$releasever - Media
# baseurl=file:///media/CentOS/
#       file:///media/cdrom/
#      file:///media/cdrecorder/
baseurl=file:///mnt
gpgcheck=1
# enabled=0
enabled=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-CentOS-7

```

```
[root@spring yum.repos.d]# mv ./CentOS-Base.repo ./CentOS-Base.repo.bak

```

### <a id="创建可用实验快照">创建可用实验快照</a>

### <a id="实战：DIY一台1U服务器">实战：DIY一台1U服务器</a>
