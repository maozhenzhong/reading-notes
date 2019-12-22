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

o:主板板载网卡，集成设备的设备索引号。
p:独立网卡，PCI网卡
s:热插拔网卡，USB之类，扩展槽的索引号
nnn(数字)表示:MAC地址+主板信息计算得出唯一的序列

ifconfig 命令使用方法

> 注意：下面的操作使用root用户(动态修改)

命令： ifconfig

作用：用来配置网络或显示当前网络接口的状态

```
[root@ root ~]# ifconfig 

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

* 第一行：up-->网卡开启状态 RUNNING-->网线处理连接状态 MULTICAST-->支持组播 mtu 1500-->（Maximum Transmission Unit）最大传输单元大小为 1500 字节 
* 第二行：该网卡的 IP 地址，子网掩码，广播地址 
* 第三行：IPV6 的配置信息 
* 第四行：网卡的 MAC 地址 ether 表示连接类型为以太网 txqueuelen 1000 --》传输队列的长度 
* 第五六行：网卡接收数据包的统计信息和接收错误的统计信息 
* 第七八行：网卡发送数据包的统计信息和发送错误的统计信息

### 临时修改网卡IP地址

ifconfig 网卡名称 IP 地址 --直接修改网卡的IP地址，重启失效

```
[root@ root ~]# ifconfig ens33

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.63 netmask 255.255.255.0 broadcast 192.168.1.255 

```

```
[root@ root ~]# ifconfig ens33 192.168.1.110 netmask 255.255.255.0

# 说明：修改后当前终端会中断，需要重新使用新的IP地址进行连接

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.63 netmask 255.255.255.0 broadcast 192.168.1.255 

```

```
[root@ root ~]# ifconfig 

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.110 netmask 255.255.255.0 broadcast 192.168.1.255  
	inet6 fe80::c09d:975d:89cd:fd3f prefixlen 64 scopeid 0x20<link>  
	ether 00:0c:29:02:83:db txqueuelen 1000 (Ethernet)  
	RX packets 3255 bytes 4458479 (194.0 KiB)    
	RX errors 0 dropped 26 overruns 0 frame 0  
	TX packets 1130 bytes 81645 (79.7 KiB)  
	TX errors 0 dropped 0 overruns 0 carrier 0 collisions 0 
```

```
[root@ root ~]# systemctl restart network #CentOS7的网卡重启方法
[root@ root ~]# service network restart #CentOS6的网卡重启方法
```

### 添加多个临时IP地址

ifconfig 网卡名称：0 第一个IP地址（network 子网掩码） -- 增加一个IP  
ifconfig 网卡名称：1 第二个IP地址（network 子网掩码） -- 增加一个IP

```
[root@ root ~]# ifconfig ens33:0 192.168.1.110 netmask 255.255.255.0 up
[root@ root ~]# ifconfig 

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.63 netmask 255.255.255.0 broadcast 192.168.1.255  

ens33: flags=4163<UP,BROADCAST,RUNNING,MULTICAST> mtu 1500  
	inet 192.168.1.110 netmask 255.255.255.0 broadcast 192.168.1.255  
```

### 删除临时IP

```
[root@ root ~]# ifconfig ens33:0 del 192.168.1.110
```

### RHEL/CentOS Linux网络相关的配置文件

RHEL/CentOS 网络相关的配置文件路径：

```
[root@ root ~]# ls /etc/sysconfig/network-scripts/ifcfg-ens33 # IP地址，子网掩码等配置文件
[root@ root ~]# ls /etc/sysconfig/network-scripts/ifcfg-lo # 网卡回环地址
[root@ root ~]# cat /etc/resolv.conf # DNS配置文件
[root@ root ~]# cat /etc/hosts # 设置主机和IP绑定信息
[root@ root ~]# cat /etc/hostname # 设置主机名
```

### 永久修改网卡地址

方法1: 使用nmtui文本框方式修改IP

```
[root@ root ~]# nmtui
```

方法2: 通过修改网卡配置文件改IP地址

```
[root@ root ~]# ls /etc/sysconfig/network-scripts/ifcfg-ens33

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
BOOTPROTO：# 激活此设备时使用的地址配置协议，常用的 dhcp, static, none,bootp 
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
[root@ root ~]# systemctl status firewalld.service # 查看firewalld状态
[root@ root ~]# systemctl stop firewalld # 关闭
[root@ root ~]# systemctl start firewalld # 开启
[root@ root ~]# systemctl disable firewalld # 开机自动关闭 RHLE7
[root@ root ~]# chkconfig --list | grep network # 查看开机是否启动 RHLE6
[root@ root ~]# systemctl enable firewalld # 开机自动启动
```

### 临时和永久关闭Selinux

```
[root@ root ~]# getenforce # 临时关闭
Enforcing

[root@ root ~]# setenforce 0
setenforce: SELinux is disabled

[root@ root ~]#  vi /etc/selinux/config

改： 7 SELINUX=enforcing # 前面的7，表示文档中第7行，方便你查找
为：7 SELINUX=disable 

[root@ root ~]# reboot
```

