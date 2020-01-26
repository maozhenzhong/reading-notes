# Linux 网络相关概念

---

### 网卡的命名规则

CentOS6的网卡命名方式：它会根据情况有所改变而非唯一且固定，在CentOS6之前，网络接口使用连续号码命名：eth0、eth1等，当增加或者删除网卡时，名称可能会发生变化

CentOS7采用dmidecode采集命名方案，以此来得到主板信息，它可以实现网卡名字永久唯一化（dmidecode这个命令可以采集有关硬件方面的信息）

对网络设备的命名方式：

1. 如果Firmware（固件）或BIOS为主板上集成的设备提供的索引信息可用，且可预算则根据此索引进行命名，例如：ifcfg-ens33
2. 如果Firmware（固件）或BIOS为PCI-E扩展槽所提供的索引信息可用，且可预测，则根据此索引进行命名，例如：ifcfg-enp33
3. 如果硬件接口的物理位置信息可用，则根据此信息进行命名，例如enp2s0

以上均不可用，则使用传统命名机制。

扩展：

在CentOS7中，en表示：ethernet以太网，就是咱们现在使用的局域网

enX（X常见有以下3种类型）：

* o: 主板板载网卡，集成设备的设备索引号。
* p: 独立网卡，PCI网卡
* s: 热插拔网卡，USB之类，扩展槽的索引号
* nnn(数字)表示:MAC地址+主板信息计算得出唯一的序列

ifconfig 命令使用方法

> 注意：下面的操作使用root用户(动态修改)

命令： ifconfig

作用：用来配置网络或显示当前网络接口的状态

```
[root@root ~]# ifconfig 
-bash: ifconfig: command not found
[root@root ~]# yum install net-tools 
```

```
[root@root ~]# ifconfig 

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.63 netmask 255.255.255.0 broadcast 192.168.1.255  
	inet6 fe80::c09d:975d:89cd:fd3f prefixlen 64 scopeid 0x20<link>  
	ether 00:0c:29:02:83:db txqueuelen 1000 (Ethernet)  
	RX packets 3255 bytes 4458479 (4.2 MiB)    
	RX errors 0 dropped 26 overruns 0 frame 0  
	TX packets 1130 bytes 81645 (79.7 KiB)  
	TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0 
```

上图信息大概说明： 

* 第一行：
	+ up-->网卡开启状态 
	+ RUNNING-->网线处理连接状态 
	+ MULTICAST-->支持组播 
	+ mtu 1500-->（Maximum Transmission Unit）最大传输单元大小为 1500 字节 
* 第二行：该网卡的 IP 地址，子网掩码，广播地址 
* 第三行：IPV6 的配置信息 
* 第四行：网卡的 MAC 地址 ether 表示连接类型为以太网 txqueuelen 1000 -->传输队列的长度 
* 第五六行：网卡接收数据包的统计信息和接收错误的统计信息 
* 第七八行：网卡发送数据包的统计信息和发送错误的统计信息

### 临时修改网卡IP地址

ifconfig 网卡名称 IP 地址 --直接修改网卡的IP地址，重启失效

```
[root@spring network-scripts]# ifconfig enp0s3
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.2.220  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::b990:81cf:812c:c4a5  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:7b:1b:62  txqueuelen 1000  (Ethernet)
        RX packets 526  bytes 39621 (38.6 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 172  bytes 23182 (22.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

```

```
[root@root ~]# ifconfig enp0s3 192.168.2.110 netmask 255.255.255.0

# 说明：修改后当前终端会中断，需要重新使用新的IP地址进行连接

enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.2.220 netmask 255.255.255.0 broadcast 192.168.2.255 

```

```
[root@spring network-scripts]# ifconfig enp0s3
enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.2.110  netmask 255.255.255.0  broadcast 192.168.2.255
        inet6 fe80::b990:81cf:812c:c4a5  prefixlen 64  scopeid 0x20<link>
        ether 08:00:27:7b:1b:62  txqueuelen 1000  (Ethernet)
        RX packets 526  bytes 39621 (38.6 KiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 172  bytes 23182 (22.6 KiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

```
[root@root ~]# systemctl restart network #CentOS7的网卡重启方法
[root@root ~]# service network restart #CentOS6的网卡重启方法
```

### 添加多个临时IP地址

ifconfig 网卡名称：0 第一个IP地址（network 子网掩码） -- 增加一个IP  
ifconfig 网卡名称：1 第二个IP地址（network 子网掩码） -- 增加一个IP

```
[root@root ~]# ifconfig enp0s3:0 192.168.1.110 netmask 255.255.255.0 up
[root@root ~]# ifconfig 

enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.63 netmask 255.255.255.0 broadcast 192.168.1.255  

enp0s3: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.110 netmask 255.255.255.0 broadcast 192.168.1.255  
```

### 删除临时IP

```
[root@root ~]# ifconfig enp0s3:0 del 192.168.1.110
```

### `NeworkManager`概述

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

### RHEL/CentOS Linux网络相关的配置文件

RHEL/CentOS 网络相关的配置文件路径：

```
[root@root ~]# ls /etc/sysconfig/network-scripts/ifcfg-enp0s3 # IP地址，子网掩码等配置文件
[root@root ~]# ls /etc/sysconfig/network-scripts/ifcfg-lo # 网卡回环地址
[root@root ~]# cat /etc/resolv.conf # DNS配置文件
[root@root ~]# cat /etc/hosts # 设置主机和IP绑定信息
[root@root ~]# cat /etc/hostname # 设置主机名
```

### 永久修改网卡地址

方法1: 使用nmtui文本框方式修改IP

```
[root@root ~]# nmtui
```

方法2: 通过修改网卡配置文件改IP地址

```
[root@root ~]# ls /etc/sysconfig/network-scripts/ifcfg-ens33

TYPE=Ethernet 
BOOTPROTO=none # 等号后面写：dhcp 表示动态获取 IP 地址， static 表示静态 IP，none 表示不指定， 以下就是静态。 DEFROUTE=yes 
IPV4_FAILURE_FATAL=no 
IPV6INIT=yes 
IPV6_AUTOCONF=yes 
IPV6_DEFROUTE=yes 
IPV6_FAILURE_FATAL=no 
NAME=ens33 #网卡名 
UUID=50eff37c-72b4-407a-a3ee-9ef8ca746b95 
DEVICE=ens33 
ONBOOT=yes 
DNS1=8.8.8.8 
DNS2=192.168.1.1 
NETMASK=255.255.255.0 
IPADDR=192.168.1.222 
PREFIX=24 
GATEWAY=192.168.1.1 
IPV6_PEERDNS=yes 
IPV6_PEERROUTES=yes 
IPV6_PRIVACY=no
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

### 关闭防火墙

```
[root@root ~]# systemctl status firewalld.service # 查看firewalld状态
[root@root ~]# systemctl stop firewalld # 关闭
[root@root ~]# systemctl start firewalld # 开启
[root@root ~]# systemctl disable firewalld # 开机自动关闭 RHLE7
[root@root ~]# chkconfig --list | grep network # 查看开机是否启动 RHLE6
[root@root ~]# systemctl enable firewalld # 开机自动启动
```

### 临时和永久关闭Selinux

```
[root@root ~]# getenforce # 临时关闭
Enforcing

[root@root ~]# setenforce 0
setenforce: SELinux is disabled

[root@root ~]#  vi /etc/selinux/config

改： 7 SELINUX=enforcing # 前面的7，表示文档中第7行，方便你查找
为：7 SELINUX=disable 

[root@root ~]# reboot
```

### 设置系统光盘开机自动挂在

```
# 在文档最后，添加以下红色内容
# /dev/cdrom /mnt iso9660 defaults 0 0
[root@spring ~]# vim /etc/fstab 

# 卸载挂载
[root@spring ~]# umount /mnt
```

```
[root@spring ~]# mount -a
# 可以查看到此目录下有内容，说明挂载成功
[root@spring ~]# ls /mnt
CentOS_BuildTag  EULA  images    LiveOS    repodata              RPM-GPG-KEY-CentOS-Testing-7
EFI              GPL   isolinux  Packages  RPM-GPG-KEY-CentOS-7  TRANS.TBL
```

### 配置本地 YUM 源

yum 的一切配置信息都储存在一个叫 yum.repos.d 的配置文件中，通常位于/etc/yum.repos.d 目录下

```
删除原有的文件
[root@spring yum.repos.d]# rm -rf /etc/yum.repos.d/*
创建一个新的 yum 源配置文件，yum 源配置文件的结尾必须是.repo
[root@spring yum.repos.d]# vim CentOS7.repo #写入以下红色内容
[CentOS7] 
name=CentOS-server 
baseurl=file:///mnt 
enabled=1 
gpgcheck=0
```

> **参数说明：**
> 
> * [CentOS7] --->yum 的 ID，必须唯一
> * name=CentOS-server ----->描述信息
> * baseurl=file:///mnt -------> /mnt 表示的是光盘的挂载点 . file:后面有 3 个///
> * enabled=1 ------>启用
>*  gpgcheck=0 ---->取消验证

```
# 清空并生成缓存列表
[root@spring yum.repos.d]# yum clean all #清空 yum 缓存
[root@spring yum.repos.d]# yum list #生成缓存列表
验证一下
[root@spring yum.repos.d]# yum -y install httpd
```