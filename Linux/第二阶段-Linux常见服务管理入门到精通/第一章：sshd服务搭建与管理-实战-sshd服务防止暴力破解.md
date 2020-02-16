# 第一章：sshd服务搭建与管理-实战-sshd服务防止暴力破解

---

## 目录

* [学习 Linux 服务前期环境准备、搭建 CentOS 7 环境](#installCentOS7)
* [sshd 服务安装-ssh 命令使用方法](#installSsh)
* [sshd 服务配置和管理](#systemConfigSsh)
* [sshd 服务防止暴力破解](#sshdServicePreventsBruteForceCracking)

## 内容

```
# 和后面的内容如果有空格就是注释项，如果没有空格就是缺省项
```

### <a href="#installCentOS7" id="installCentOS7">学习 Linux 服务前期环境准备、搭建 CentOS 7 环境</a>

#### 1.1 清空关闭防火墙

```
[root@spring ~]# iptables -F # 清空防火墙规则
[root@spring ~]# systemctl stop firewalld # 关闭防火墙
[root@spring ~]# systemctl disable firewalld # 设置开机不启动防火墙
```

#### 1.2 关闭 SElinux

```
[root@hye ~]# getenforce # 查看 SElinux 状态
Disabled

[root@spring ~]# setenforce 0 # 修改 SElinux 配置文件
```

修改SELINUX=disabled，如图 1-1 所示，修改完成后并保存退出，修改文件后需要重启主机则会生效

```
[root@spring ~]# vim /etc/selinux/config
# This file controls the state of SELinux on the system.
# SELINUX= can take one of these three values:
#     enforcing - SELinux security policy is enforced.
#     permissive - SELinux prints warnings instead of enforcing.
#     disabled - No SELinux policy is loaded.
# SELINUX=enforcing
SELINUX=disabled # 修改这里
# SELINUXTYPE= can take one of three values:
#     targeted - Targeted processes are protected,
#     minimum - Modification of targeted policy. Only selected processes are protected.
#     mls - Multi Level Security protection.
SELINUXTYPE=targeted
```

> 注意：永久关闭 SElinux 需要重启主机则生效，如果当前主机是生产环境不能重启主机的条件下，但又要实现永久关闭 SElinux 的情况下，需要先做临时关闭，再修改其配置文件实现永久关闭，但不需要重启主机

#### 1.3 配置静态 IP

```
[root@spring ~]# vim /etc/sysconfig/network-scripts/ifcfg-enp0s3
TYPE="Ethernet"
PROXY_METHOD="none"
BROWSER_ONLY="no"
BOOTPROTO="static" # 改为static
DEFROUTE="yes"
IPV4_FAILURE_FATAL="no"
IPV6INIT="yes"
IPV6_AUTOCONF="yes"
IPV6_DEFROUTE="yes"
IPV6_FAILURE_FATAL="no"
IPV6_ADDR_GEN_MODE="stable-privacy"
NAME="enp0s3"
UUID="ed24b447-da46-4f2b-af3f-d6be431c5fbf"
DEVICE="enp0s3"
ONBOOT="yes" # 这里修改为yes
IPADDR="192.168.2.220" # 静态IP地址
PREFIX="24"
GATEWAY="192.168.2.1" # 网关
DNS1="8.8.8.8" # dns
NETMASK="255.255.255.0" # 子网掩码
IPV6_PRIVACY="no"
```

**关闭 NetworkManager 服务**

```
[root@spring ~]# systemctl stop NetworkManager # 关闭 NetworkManager
[root@spring ~]# systemctl disable NetworkManager # 设置开启不启动
Removed symlink /etc/systemd/system/multi-user.target.wants/NetworkManager.service.
Removed symlink /etc/systemd/system/dbus-org.freedesktop.nm-dispatcher.service.
Removed symlink /etc/systemd/system/network-online.target.wants/NetworkManager-wait-online.service.
```

#### 1.4 配置主机和 IP 映射关系

```
[root@spring ~]# vim /etc/hosts
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
192.168.2.220 notfoget.com spring # 修改 /etc/hosts 配置文件
```

#### 1.5 修改主机名

```
[root@spring ~]# vim /etc/hostname # 修改主机名配置文件（永久生效，需要重启）
spring
[root@spring ~]# hostname spring # 临时设置，立即生效（需要重启当前终端）
```

#### 1.6 配置 Yum 源

**1、配置本地 Yum 源**

```
[root@spring ~]# mount /dev/sr0 /mnt/ # 挂载光驱
mount: /dev/sr0 is write-protected, mounting read-only
mount: /dev/sr0 is already mounted or /mnt busy
       /dev/sr0 is already mounted on /mnt 

[root@spring ~]# echo "dev/sr0 /mnt iso9660 defaults 0 0" >> /etc/fstab # 设置开机自动挂载光驱   

[root@spring ~]# rm -rf /etc/yum.repos.d/* # 删 除/etc/yum.repos.d/ 目 录的所有文件
[root@spring ~]# cat > /etc/yum.repos.d/CentOS7.repo <<EOF
> [centos7-source]
> name=centos7-source
> baseurl=file:///mnt
> enabled=1
> gpgcheck=0
> EOF

# 或者

[root@spring ~]# vim /etc/yum.repos.d/CentOS7.repo # 使用 vim 创建一个新的文件，并写入如下内容
[centos7-source]
name=centos7-source
baseurl=file:///mnt
enabled=1
gpgcheck=0
```

**2、配置网络yum源：**

```
# 打开centos的yum文件夹
[root@localhost ~]# cd /etc/yum.repos.d/
```

```
# 备份
[root@localhost ~]# mv CentOS-Base.repo CentOS-Base.repo.backup
```

**可以下载后更改名称**

```
# 用wget 下载
[root@localhost ~]# wget http://mirrors.aliyun.com/repo/Centos-7.repo
```

> 如果wget命令不生效，说明还没有安装wget工具，输入yum -y install wget 回车进行安装。  
> 当前目录是/etc/yum.repos.d/，刚刚下载的Centos-7.repo也在这个目录上

```
# 替换系统原来的repo文件
[root@localhost ~]# mv CentOS-7.repo CentOS-Base.repo
```

**也可以下载直接更换名称**

```
[root@localhost ~]# wget -O CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

```
# 执行yum源更新命令
[root@localhost ~]# yum clean all

[root@localhost ~]# yum makecache

[root@localhost ~]# yum update

# 查看配置好的包
[root@localhost yum.repos.d]# yum repolist
```

#### 1.7 安装 epel 源

```
[root@spring ~]# yum -y install epel-release
```

### <a href="#installSsh" id="installSsh">sshd 服务安装-ssh 命令使用方法</a>

#### 2.1 SSHD 服务

介绍：SSH 协议：安全外壳协议。为 Secure Shell 的缩写。SSH 为建立在应用层和传输层基础上的安全协议。

作用：SSHD 服务使用 SSH 协议可以用来进行远程控制，或在计算机之间传送文件。

相比较之前用 Telnet 方式来传输文件要安全很多，因为 Telnet 使用明文传输，SSH 是加密传输。

服务安装：

OpenSSH 软件包，提供了服务端后台程序和客户端工具，用来加密远程控件和文件传输过程中的数
据，并由此来代替原来的类似服务 Telnet 或 Ftp。

需要安装 OpenSSH 四个安装包：  

* `openssh-5.3p1-114.el6_7.x86_64`：              包含OpenSSH服务器及客户端需要的核心文件。
* `openssh-clients-5.3p1-114.el6_7.x86_64`：   OpenSSH客户端软件包。
* `openssh-server-5.3p1-114.el6_7.x86_64`：   OpenSSH服务器软件包。
* `openssh-askpass-5.3p1-114.el6_7.x86_64`：支持对话框窗口的显示，是一个基于X系统的密码诊断工具

注释：这四个软件包在我们的CentOS7镜像软件安装包里有

```
[root@spring ~]# ls /mnt/Packages/openssh*
/mnt/Packages/openssh-7.4p1-21.el7.x86_64.rpm
/mnt/Packages/openssh-askpass-7.4p1-21.el7.x86_64.rpm
/mnt/Packages/openssh-clients-7.4p1-21.el7.x86_64.rpm
/mnt/Packages/openssh-keycat-7.4p1-21.el7.x86_64.rpm
/mnt/Packages/openssh-server-7.4p1-21.el7.x86_64.rpm
```

#### 2.2 安装 SSH 服务

**1、通过Yum安装（推荐使用）**

```
[root@spring ~]# yum -y install openssh openssh-clinets openssh-server
```

**2、本地直接安装rpm包文件**

```
[root@spring ~]# rpm -ivh /mnt/Packages/openssh*.rpm
```

**3、确认软件包是否已经安装**

```
[root@spring ~]# rpm -qa | grep openssh # 使用rpm -qa查看所有安装的程序包，并过虑openssh的程序包。
openssh-7.4p1-21.el7.x86_64
openssh-server-7.4p1-21.el7.x86_64
openssh-clients-7.4p1-21.el7.x86_64
```

**4、查看软件安装生产的文件**

```
[root@spring ~]# rpm -ql openssh
/etc/ssh
/etc/ssh/moduli
/usr/bin/ssh-keygen
/usr/libexec/openssh
/usr/libexec/openssh/ctr-cavstest
/usr/libexec/openssh/ssh-keysign
/usr/share/doc/openssh-7.4p1
/usr/share/doc/openssh-7.4p1/CREDITS
/usr/share/doc/openssh-7.4p1/ChangeLog
/usr/share/doc/openssh-7.4p1/INSTALL
/usr/share/doc/openssh-7.4p1/OVERVIEW
/usr/share/doc/openssh-7.4p1/PROTOCOL
/usr/share/doc/openssh-7.4p1/PROTOCOL.agent
/usr/share/doc/openssh-7.4p1/PROTOCOL.certkeys
/usr/share/doc/openssh-7.4p1/PROTOCOL.chacha20poly1305
/usr/share/doc/openssh-7.4p1/PROTOCOL.key
/usr/share/doc/openssh-7.4p1/PROTOCOL.krl
/usr/share/doc/openssh-7.4p1/PROTOCOL.mux
/usr/share/doc/openssh-7.4p1/README
/usr/share/doc/openssh-7.4p1/README.dns
/usr/share/doc/openssh-7.4p1/README.platform
/usr/share/doc/openssh-7.4p1/README.privsep
/usr/share/doc/openssh-7.4p1/README.tun
/usr/share/doc/openssh-7.4p1/TODO
/usr/share/licenses/openssh-7.4p1
/usr/share/licenses/openssh-7.4p1/LICENCE
/usr/share/man/man1/ssh-keygen.1.gz
/usr/share/man/man8/ssh-keysign.8.gz
```

**5、OpenSSH 配置文件**

`OpenSSH` 常用配置文件有两个`/etc/ssh/ssh_config` 和`/etc/sshd_config`

* `ssh_config` 为客户端配置文件，设置与客户端相关的应用可通过此文件实现
* `sshd_config` 为服务器端配置文件，设置与服务端相关的应用可通过此文件实现

**6、服务启动关闭脚本**

```
[root@spring ~]# systemctl restart | stop | start | status sshd
```

**7、开机启动服务**

```
[root@spring ~]# chkconfig sshd on
Note: Forwarding request to 'systemctl enable sshd.service'.
```

查看所有开机管理服务，过虑 sshd 服务

```
[root@spring ~]# systemctl list-unit-files | grep sshd
sshd-keygen.service                           static
sshd.service                                  enabled
sshd@.service                                 static
sshd.socket                                   disabled
```

#### 2.3 如何使用 SSH 来远程连接主机

方法一：  

```
[root@spring ~]# ssh [远程主机用户名] @[远程服务器主机名或IP地址] -p port  
```

当在 Linux 主机上远程连接另一台 Linux 主机时，如当前所登录的用户是 root 的话，当连接另一台主机时也是用 root 用户登录时，可以直接使用 ssh IP，端口默认即可，如果端口不是默认的情况下，需要使用-p 指定端口。

```
[root@hye ~]# ssh 192.168.2.220
The authenticity of host '192.168.2.220 (192.168.2.220)' can't be established.
ECDSA key fingerprint is SHA256:PCJjNdRPBe2N5d18T6Z+sSy60sOKqLHI7Ac9BKURfTU.
ECDSA key fingerprint is MD5:70:16:a9:4b:10:2f:e6:9d:92:06:6b:13:30:14:a1:0e.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '192.168.2.220' (ECDSA) to the list of known hosts.
root@192.168.2.220's password:
Last login: Mon Feb 17 00:13:24 2020 from 192.168.2.198
```

第一次登录服务器时系统没有保存远程主机的信息，为了确认该主机身份会提示用户是否继续连接，输入yes 后登录，这时系统会将远程服务器信息写入用户主目录下的`$HOME/.ssh/known_hosts`文件中，下次再进行登录时因为保存有该主机信息就不会再提示了。

```
[root@hye ~]# cat /root/.ssh/known_hosts
192.168.2.220 ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBBLi9Nh4JIv0fqJKDYH8xHn1zYsM3x81DDBCE/4Lcwxht9nUPI24ozDEwoVAgh7lCfkwsDOJRXoUZ5xpFC3l6qc=
```

RSA算法基于一个十分简单的数论事实：将两个大素数相乘十分容易，但是想要对其乘积进行因式分解却极其困难，因此可以将乘积公开作为加密密钥。

```
# 使用普通用户登录
[root@spring ~]# ssh hye@192.168.2.218
```

方法二：

```
ssh -l [远程主机用户名] [远程服务器主机名或IP 地址] -p port
```

* `-l`：选项指定登录名称。
* `-p`：选项指定登录端口（当服务端的端口非默认时，需要使用-p 指定端口进行登录）。

```
[root@spring ~]# ssh -l hye 192.168.2.218
hye@192.168.2.218's password:
Last login: Mon Feb 17 00:38:01 2020 from 192.168.2.220
```

### <a href="#systemConfigSsh" id="systemConfigSsh">sshd 服务配置和管理</a>

#### 3.1 配置文件详解

> 注：在配置文件中参数前面有#号，表示是默认值，当然#号也表示注释。

`/etc/ssh/sshd_config` 配置文件内容详解

1、Port 22设置SSHD监听端口号

*  SSH 预设使用 22 这个port，也可以使用多个port，即重复使用 port 这个设定项！
*  例如想要开放SSHD端口为 22和2020，则多加一行内容为： Port 2020 即可
*  然后重新启动SSHD这样就好了。 建议大家修改 port number 为其它端口，防止别人暴力破解

例1.1：修改SSHD服务默认监听的端口为2020

```

[root@spring ~]# vim /etc/ssh/sshd_config # 修改ssh服务端配置文件
 ...
 15 # semanage port -a -t ssh_port_t -p tcp #PORTNUMBER
 16 #
 17 #Port 22
 18 Port 2020 # 修改Port为2020
 19 #AddressFamily any
 20 #ListenAddress 0.0.0.0
 ...
 
 [root@spring ~]# systemctl restart sshd # 重启sshd服务
```

```
# 查看修改结果
[root@spring ~]# netstat -tlunp | grep sshd
tcp        0      0 0.0.0.0:2020              0.0.0.0:*               LISTEN      1106/sshd
tcp6       0      0 :::22                   :::*                    LISTEN      1106/sshd
```

```
# 修改完端口默认端口后，登录方法
[root@spring ~]# ssh -p 2020 192.168.2.220
```

2、ListenAddress 0.0.0.0

设置SSHD服务器绑定的IP 地址，0.0.0.0 表示侦听所有地址  
安全建议：如果主机不需要从公网ssh访问，可以把监听地址改为内网地址  
这个值可以写成本地IP地址，也可以写成所有地址，即0.0.0.0 表示所有IP。

```
...
 17 #Port 22
 18 #AddressFamily any
 19 #ListenAddress 0.0.0.0
 20 #ListenAddress ::
 21
 ...
```

3、Protocol 2

选择的 SSH 协议版本，可以是 1 也可以是 2，CentOS 5.x 预设是仅支援V2版本，出于安全考虑，设置为最新的协议版本。

4、`#HostKey /etc/ssh/ssh_host_key`

设置包含计算机私人密钥的文件

```
 22 HostKey /etc/ssh/ssh_host_rsa_key
 23 #HostKey /etc/ssh/ssh_host_dsa_key
 24 HostKey /etc/ssh/ssh_host_ecdsa_key
 ```
 
 5、SyslogFacility AUTHPRIV 

当有人使用 SSH 登入系统的时候，SSH 会记录信息，这个信息要记录的类型为AUTHPRIV，sshd 服务日志存放在：`/var/log/secure`。

例：为什么sshd配置文件中没有指定日志，但日志却存放在了/var/log/secure？

```
[root@spring ~]# vim /etc/rsyslog.conf
...
 51
 52 # Log anything (except mail) of level info or higher.
 53 # Don't log private authentication messages!
 54 *.info;mail.none;authpriv.none;cron.none                /var/log/messages
 55
 56 # The authpriv file has restricted access.
 57 authpriv.*                                              /var/log/secure
 58
 59 # Log all the mail messages in one place.
 60 mail.*                                                  -/var/log/maillog
 61
 62
 ...
```

6、`#LogLevel INFO` 定义登录记录的等级

```
...
 29
 30 # Logging
 31 #SyslogFacility AUTH
 32 SyslogFacility AUTHPRIV
 33 #LogLevel INFO
 34
 35 # Authentication:
 36
 ...
```

#### 3.2 安全调优的重点

1. `LoginGraceTime 2m `
	1. grace 意思是系统给与多少秒来进行登录。
	2. 当使用者连上 SSH server 之后，会出现输入密码的画面，在该画面中。
	3. 在多久时间内没有成功连上 SSH server 就强迫断线！若无单位则默认时间为秒。可以根据实际情况来修改实际
2. `# PermitRootLogin yes`
	1. 是否允许 root 登入，默认是允许的，但是建议设定成 no，真实的生产环境服务器，是不允许root 账号直接登陆的，仅允许普通用户登录，需要用到 root 用户再切换到 root 用户。
3. `PasswordAuthentication yes `
	1. 密码验证当然是需要的！所以这里写 yes，也可以设置为 no，在真实的生产服务器上，根据不同安全级别要求，有的是设置不需要密码登陆的，通过认证的秘钥来登陆。
4. `# PermitEmptyPasswords no` 
	1. 是否允许空密码的用户登录，默认为no，不允许空密码登录。
5. `# PrintLastLog yes` 
	1. 显示上次登入的信息！默认为 yes
6. `# UseDNS yes`
	1. 一般来说，为了要判断客户端来源是正常合法的，因此会使用 DNS 去反查客户端的主机名，但通常在内网互连时，该基设置为 no，因此使联机速度会快些。

例1.2：给sshd服务添加一些警告信息。

```
[root@spring ~]# echo 'Warning ! From now on, all of your operation has been record!'> /etc/motd

[root@hye ~]# ssh 192.168.2.220
root@192.168.2.220's password:
Last login: Mon Feb 17 00:32:07 2020 from 192.168.2.218
Warning ! From now on, all of your operation has been
record!
```

例1.3：显示上次登入的信息

```
[root@hye ~]# ssh 192.168.2.220 # 登录主机
root@192.168.2.220's password:
Last login: Mon Feb 17 01:34:58 2020 from 192.168.2.218 # PrintLastLog yes 项定义即是该回显上次登录的信息
```

### <a href="#sshdServicePreventsBruteForceCracking" id="sshdServicePreventsBruteForceCracking">sshd 服务防止暴力破解</a>

#### 4.1 配置安全的 SSHD 服务（方法一）

1. 密码足够的复杂，密码的长度要大于 8 位最好大于 20 位。密码的复杂度是密码要尽可能有数字、大小写字母和特殊符号混合组成。
2. 修改默认端口号。
3. 不允许 root 账号直接登陆到系统，添加普通账号，使用普通账号登录系统，授予 root 的权限，必要时再从普通用户切换到 root 用户。
4. 不允许密码登陆，只能通过认证的密钥来登陆系统。


1、通过密钥认证实现 SSHD 认证

```
[root@spring ~]# ssh-keygen -t rsa -C "maozhenzhong2008@163.com"
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:dkSdAnZpdO9WcqMVD7JRxSHWWUwcU/TLBTFfzXC3jJI maozhenzhong2008@163.com
The key's randomart image is:
+---[RSA 2048]----+
|        oo+o+=O/^|
|       . o+.==+O#|
|         ..E..o=B|
|         .  ..+++|
|        S .  .oo |
|       . .   .   |
|                 |
|                 |
|                 |
+----[SHA256]-----+

[root@spring ~]# ls /root/.ssh/ # 查看到生成的 id_rsa、id_rsa.pub 文件
id_rsa  id_rsa.pub  known_hosts
```

2、发布公钥到服务端。  
使用 `ssh-copy-id` 命令将客户端生成的公钥发布到远程服务器 `192.168.2.218` `hye`

```
[root@spring ~]# ssh-copy-id -i 192.168.2.218
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/root/.ssh/id_rsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
root@192.168.2.218's password: # 输入 192.168.2.218 主机登录密码。

Number of key(s) added: 1

Now try logging into the machine, with:   "ssh '192.168.2.218'"
and check to make sure that only the key(s) you wanted were added.

[root@spring ~]# ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.2.218
```

#### 4.2 通过开源的防护软件来防护安全（方法二）

实战背景：

最近公网网站一直被别人暴力破解 SSHD 服务密码。虽然没有成功，但会导致系统负载很高，原因是在暴力破解的时候，系统会不断地认证用户，从而增加了系统资源额外开销，导致访问公司网站速度很慢。

然而 fail2ban 程序可以监视你的系统日志，然后匹配日志的错误信息（正则式匹配）执行相应的屏蔽动作（一般情况下是防火墙），而且可以发送 e-mail 通知系统管理员，很实用、很强大！

简单来说其功能就是防止暴力破解。工作的原理是通过分析一定时间内的相关服务日志，将满足动作的相关 IP 利用 iptables 加入到 dorp 列表一定时间。

1、 下载软件包

官方地址：[http://www.fail2ban.org](http://www.fail2ban.org)

2、 需要安装 python 开发环境，并且版本要大于

```
[root@spring ~]#  python -V
Python 3.7.4
```

3、使用 Yum 安装 fail2ban

```
[root@spring ~]# yum -y install epel-release
[root@spring ~]# yum -y install fail2ban
```

4、相关主要文件说明

```
[root@spring ~]# ls /etc/fail2ban/
action.d  fail2ban.conf  fail2ban.d  filter.d  jail.conf  jail.d  paths-common.conf  paths-fedora.conf
```

* `/etc/fail2ban/action.d`        # 动作文件夹，内含默认文件。iptables 以及 mail 等动作配置。
* `/etc/fail2ban/fail2ban.conf` # 定义了 fai2ban 日志级别、日志位置及 sock 文件位置。
* `/etc/fail2ban/filter.d`          # 条件文件夹，内含默认文件。过滤日志关键内容设置。
* `/etc/fail2ban/jail.conf`        # 主要配置文件，模块化。主要设置启用 ban 动作的服务及动作阀值。

5、应用实例

设置条件：SSH 远程登录 5 分钟内 3 次密码验证失败，禁止用户 IP 访问主机 1 小时，1 小时该限制自动解除，用户可重新登录。

因为动作文件（action.d/iptables.conf）以及日志匹配条件文件（filter.d/sshd.conf ）安装后是默认存在的。基本不用做任何修改。所有主要需要设置的就只有 jail.conf 文件。启用 SSHD 服务的日志分析，指定动作阀值即可。

```
[root@spring ~]# vim /etc/fail2ban/jail.conf 

251 # 新添加配置
252 
253 enabled  = true # 是否激活此项（true/false）修改成 true。
254 filter   = sshd   # 过滤规则 filter 的名字，对应 filter.d 目录下的 sshd.conf
255 action   = iptables[name=SSH, port=ssh, protocol=tcp] # 动作的相关参数，对应action.d/iptables.conf 文件
256 sendmail-whois[name=SSH, dest=631544100@qq.com, sender=maozhenzhong2008@163.com,sendername="Fail2Ban"] # 触发报警的收件人
257 logpath  = /var/log/secure # 检测的系统的登陆日志文件。这里要写 sshd 服务日志文件。默认为 logpath = /var/log/sshd.log
# 5 分钟内 3 次密码验证失败，禁止用户 IP 访问主机 1 小时。 配置如下
258 bantime  = 3600 # 禁止用户 IP 访问主机 1 小时
259 findtime = 300    # 在 5 分钟内内出现规定次数就开始工作
260 maxretry = 3       # 3 次密码验证失败
```

6、启动服务

```
[root@spring ~]# systemctl start fail2ban    # 启动 fail2ban 服务
[root@spring ~]# systemctl enable fail2ban # 设置开机自动启动
Created symlink from /etc/systemd/system/multi-user.target.wants/fail2ban.service to /usr/lib/systemd/system/fail2ban.service.
```

7、测试

```
[root@spring ~]# > /var/log/secure            # 清空日志内容
[root@spring ~]# systemctl restart fail2ban # 重启 fail2ban 服务

[root@spring ~]# iptables -L -n
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         

Chain FORWARD (policy ACCEPT)
target     prot opt source               destination         

Chain OUTPUT (policy ACCEPT)
target     prot opt source               destination 
```

8、测试：故意输入错误密码 3 次，再进行登录时，会拒绝登录

```
[root@hye ~]# ssh 123.56.164.211
The authenticity of host '123.56.164.211 (123.56.164.211)' can't be established.
ECDSA key fingerprint is SHA256:Ojcd9Hc0WlGM8dov50YNEOLyiT+OyA9boV6URZZ0BO8.
ECDSA key fingerprint is MD5:8c:a9:b2:74:27:53:a5:ba:c6:30:0f:e8:da:a0:80:aa.
Are you sure you want to continue connecting (yes/no)? yes
Warning: Permanently added '123.56.164.211' (ECDSA) to the list of known hosts.
root@123.56.164.211's password:
Permission denied, please try again.
root@123.56.164.211's password:
Permission denied, please try again.
root@123.56.164.211's password:
Permission denied (publickey,gssapi-keyex,gssapi-with-mic,password).
```

```
[root@hye ~]# ssh 123.56.164.211
ssh: connect to host 123.56.164.211 port 22: Connection refused
```

```
[root@spring ~]# iptables -L | tail -4 # 可以查看到 192.168.2.218 该 IP 被 iptables 禁止访问
Chain fail2ban-SSH (1 references)
target prot opt source destination
REJECT all -- 192.168.2.218 anywhere
RETURN all -- anywhere anywhere
```

```
[root@spring ~]# fail2ban-client status # #配置好之后我们检测下 fail2ban是否工作
Status
|- Number of jail: 1 `- Jail list: sshd #具体看某一项的状态也可以看，如果显示被 ban 的 ip 和数目就表示成功了，如果都是 0，说明没有成功。

[root@spring ~]# fail2ban-client status sshd

Status for the jail: sshd
|- Filter
| |- Currently failed: 0
| |- Total failed: 0
| `- Journal matches: _SYSTEMD_UNIT=sshd.service + _COMM=sshd
`- Actions
|- Currently banned: 1 |- Total banned: 1 `- Banned IP list: 192.168.2.218
```

9、查看 fail2ban 的日志能够看到相关的信息

```
[root@spring ~]# tail /var/log/fail2ban.log
2020-02-17 03:26:36,476 fail2ban.actions [27932]: NOTICE [sshd] Ban 192.168.2.218
```

需要注意的2点：

1. 另外如果后期需要把iptables清空后或iptables重启后，也需要把fail2ban重启一下
2. 如果修改ssh默认端口22为2015后，配置fail2ban来监控SSHD服务需要修改配置文件

```
[root@spring ~]# vim /etc/ssh/sshd_config

改 17 # Port 22
为 17 Port 2015

[root@spring ~]# systemctl restart sshd
[root@spring ~]# vim /etc/fail2ban/jail.conf
# 修改 iptables 动作中的端口号，默认为 SSH，如图 1-11 所示。
改：port=ssh 
为:  port=2015

[root@spring ~]# systemctl restart fail2ban

# fail2ban从黑名单中移除IP的方法：
[root@spring ~]# fail2ban-client set sshd unbanip 192.168.1.64
```