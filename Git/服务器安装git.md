# 服务器安装git

---

## 检查版本

* 移除旧版本git

centos自带Git，7.x版本自带git 1.8.3.1（应该是，也可能不是），
安装新版本之前需要使用yum remove git卸载（安装后卸载也可以）。

```
[root@Git ~]# git --version    ## 查看自带的版本git version 1.8.3.1
[root@Git ~]# yum remove git   ## 移除原来的版本
```

* 安装所需软件包

```
sudo yum -y install zlib-devel openssl-devel cpio expat-devel
```

* 下载&安装

```
[root@Git ~]# cd /usr/src
[root@Git ~]# wget https://www.kernel.org/pub/software/scm/git/git-2.7.3.tar.gz  ## 2.7.3为git版本号，可以选择最新版本
```

* 解压

```
[root@Git ~]# tar xf git-2.7.3.tar.gz
```

* 配置编译安装

```
[root@Git ~]# cd git-2.7.3
[root@Git ~]# make configure
[root@Git ~]# ./configure --prefix=/usr/git ##配置目录
[root@Git ~]# make profix=/usr/git
[root@Git ~]# make install
```

> 解决错误  
> autoconf: command not found (centos 6.7 install git-2.10.0 from source code)
> 解决方法: ```yum  install autoconf```
> make[1]: *** [perl.mak] Error 2
> 解决方法: ```yum install perl-ExtUtils-MakeMaker package```
> git clone出现https错误：(重新编译即可)
> 解决方法: ```yum install curl-devel```

* 加入环境变量

```

[root@Git ~]# echo "export PATH=$PATH:/usr/git/bin" >> /etc/profile
[root@Git ~]# source /etc/profile
```

* 检查版本

```
[root@Git git-2.7.3]# git --version 
git version 2.7.3
```

* 创建一个git用户组和用户，用来运行git服务：

```
$ groupadd git
$ useradd git -g git
```

* 创建证书登录

收集所有需要登录的用户的公钥，公钥位于id_rsa.pub文件中，把我们的公钥导入到/home/git/.ssh/authorized_keys文件里，一行一个。

如果没有该文件创建它：

```
$ cd /home/git/
$ mkdir .ssh
$ chmod 700 .ssh
$ touch .ssh/authorized_keys
$ chmod 600 .ssh/authorized_keys
```

* 初始化Git仓库

```
$ cd /home
$ mkdir gitrepo
$ chown git:git gitrepo/
$ cd gitrepo

$ git init --bare runoob.git
Initialized empty Git repository in /home/gitrepo/runoob.git/
```

以上命令Git创建一个空仓库，服务器上的Git仓库通常都以.git结尾。然后，把仓库所属用户改为git：

```
$ chown -R git:git runoob.git
```

* 克隆仓库

```

$ git clone git@192.168.45.4:/home/gitrepo/runoob.git
Cloning into 'runoob'...
warning: You appear to have cloned an empty repository.
Checking connectivity... done.

```

192.168.45.4 为 Git 所在服务器 ip ，你需要将其修改为你自己的 Git 服务 ip。

这样我们的 Git 服务器安装就完成了，接下来我们可以禁用 git 用户通过shell登录，可以通过编辑/etc/passwd文件完成。找到类似下面的一行：

```
git:x:503:503::/home/git:/bin/bash
```

改为：

```
git:x:503:503::/home/git:/sbin/nologin
```