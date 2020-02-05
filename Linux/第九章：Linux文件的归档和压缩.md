# 第九章：Linux文件的归档和压缩

---

## 目录

* [tar 命令进行文件的归档和压缩](#tar)
* [zip 管理压缩文件](#zip)
* [了解 gzip-bzip2-xz管理压缩文件-file-sort查看文件](#gzip)

## 内容

### <a href="#tar" id="tar">tar 命令进行文件的归档和压缩</a>

#### 1.1 归档和压缩文件

tar 命令 作用：打包、压缩文件

作用：打包、压缩文件；tar 文件是把几个文件和（或）目录集合在一个文件里，该存档文件可以通过使用 gzip、bzip2 或 xz 等压缩工具进行行压缩后传输

查看 man tar

用法：tar [OPTION...] [FILE]...

参数：

* -c create 创建文件
* -x -extract [ˈ ekstrækt] 提取 解压还原文件
* -v --verbose 显示执行详细过程
* -f --file 指定备份文件
* -t --list 列出压缩包中包括哪些文件，不解包，查看包中的内容
* -C （大写）--directory 指定解压位置

```
[root@spring ~]# tar -cvf grub.tar /boot/grub
tar: Removing leading `/' from member names
/boot/grub/
/boot/grub/splash.xpm.gz

[root@spring ~]# ll grub.tar
-rw-r--r-- 1 root root 10240 Jan 28 02:47 grub.tar

[root@spring ~]# tar -xvf grub.tar # 解压缩
boot/grub/
boot/grub/splash.xpm.gz

[root@spring ~]# ls boot/
grub
```

> 注意：在使用绝对路径名归档文件时，将默认从文件名中删除该路径中前面的 / 符号。这样解压时，会直接解压到当前目录。 如果不移出/压缩时，当解压缩时，直接按绝对路径来释放，会覆盖原系统中此路径的文件。

指定解压位置 -C

```
[root@spring ~]# mkdir back
[root@spring ~]# cp /etc/passwd back/
[root@spring ~]# ls
anaconda-ks.cfg  back  boot  fstab01  fstab02  grub.tar  index.html  rpm_check.txt
[root@spring ~]# tree back
back
└── passwd

0 directories, 1 file
[root@spring ~]# tar -cvf back.tar /boot/grub back/ /etc/passwd
tar: Removing leading `/' from member names
/boot/grub/
/boot/grub/splash.xpm.gz
back/
back/passwd
/etc/passwd
[root@spring ~]# ls
anaconda-ks.cfg  back  back.tar  boot  fstab01  fstab02  grub.tar  index.html  rpm_check.txt

[root@spring ~]# tar -tvf grub.tar
drwxr-xr-x root/root         0 2020-01-06 21:36 boot/grub/
-rw-r--r-- root/root      1350 2011-11-16 05:03 boot/grub/splash.xpm.gz
```

#### 1.2 tar 归档+压缩

语法：tar czvf newfile.tar.gz SOURCE

常用参数：

* -z, --gzip 以 gzip 方式压缩 扩展名： tar.gz
* -j ： 以 bz2 方式压缩的 扩展名：tar.bz2
* -J ： 以 xz 方式压缩 扩展名：tar.xz

```
[root@spring ~]# tar cvf etc.tar /etc
[root@spring ~]# tar zcvf etc.tar.gz /etc # 归档,注意备份的名字后缀
[root@spring ~]# tar -zxvf etc.tar.gz.     # 解压缩
```

语法： #tar jcvf newfile.tar.bz2 SOURCE

```
[root@spring ~]# tar -jcvf etc.tar.bz2 /etc
[root@spring ~]# tar jxvf etc.tar.bz2 -C /tmp
```

创建.tar.xz 包

```
[root@spring ~]# tar -Jcvf etc.tar.xz /etc
[root@spring ~]# tar -Jxvf etc.tar.xz
[root@spring ~]# ll -h etc.tar*
-rw-r--r-- 1 root root  29M Jan 28 03:02 etc.tar
-rw-r--r-- 1 root root 8.7M Jan 28 03:05 etc.tar.bz2
-rw-r--r-- 1 root root 9.9M Jan 28 03:03 etc.tar.gz
-rw-r--r-- 1 root root 7.1M Jan 28 03:08 etc.tar.xz
```

### <a href="#zip" id="zip">zip 管理压缩文件</a>

zip 软件包解压缩命令：

zip 是压缩程序，unzip 是解压程序。

```
# 压缩文件
[root@spring ~]# zip a.zip /etc/passwd
  adding: etc/passwd (deflated 58%)
```

```
# 将所有.jpg 的文件压缩成一个 zip 包
[root@spring ~]# zip all.zip *.jpg
	zip warning: name not matched: *.jpg

zip error: Nothing to do! (all.zip)
```

```
# 压缩一个目录
[root@spring ~]# zip -r grub.zip /boot/grub
  adding: boot/grub/ (stored 0%)
  adding: boot/grub/splash.xpm.gz (deflated 87%)
```

```
# 解压缩
[root@spring ~]# unzip grub.zip
[root@spring ~]# unzip grub.zip -d /tmp # -d 解压到指定的目标/opt
Archive:  grub.zip
   creating: /tmp/boot/grub/
  inflating: /tmp/boot/grub/splash.xpm.gz
[root@spring ~]# tree /tmp
/tmp
└── boot
    └── grub
        └── splash.xpm.gz

2 directories, 1 file
```

### <a href="#gzip" id="gzip">了解 gzip-bzip2-xz管理压缩文件-file-sort查看文件</a>

我们创建压缩的 TAR 存档，TAR 命令它支持三种不同的压缩方式。

* gzip 压缩速度最快；
* bzip2 压缩生成的文件比 gzip 小，但使用不如 gzip 广；
* xz 压缩工具相对较新，但是会提供最佳的压缩率

#### 3.1 压缩工具

压缩工具：`gzip`、 `bzip2`、 `zip`、 `xz`

常见的压缩格式： `.gz`、 `.bz2`、 `.xz`、 `.zip`

* gzip 文件    ====》 gzip a.txt   ====》 a.txt.gz
* bzip2 文件  ====》 bzip2 b.txt ====》 b.txt.bz2
* xz 文件      ====》  xz c.txt     ====》   c.txt.xz

```
[root@spring ~]# mkdir hye
[root@spring ~]# touch hye/a.txt
[root@spring ~]# gzip hye/a.txt
[root@spring ~]# ls hye/a*
hye/a.txt.gz

[root@spring ~]# tree hye
hye
└── a.txt.gz

0 directories, 1 file
```

注：只能对文件进行压缩，且压缩后源文件会消失，一般不用。
（bzip2，xz 这两个工具可以通过添加参数-k 来保留下源文件）

```
[root@spring ~]# cp /etc/passwd 1.txt
[root@spring ~]# bzip2 -k 1.txt
[root@spring ~]# ls 1.txt.bz2
1.txt.bz2
[root@spring ~]# ls 1.txt.xz
1.txt.xz
[root@spring ~]# xz -k 1.txt
```

解压：

* `gzip` -d 文件
* `bzip2` -d 文件 -k 保留源文件
* `xz` -d 文件 或 `unxz` 文件 -k 保留源文件

```
[root@spring ~]# gzip -d hye/a.txt.gz
[root@spring ~]# tree hye
hye
└── a.txt

0 directories, 1 file

[root@spring ~]# bzip2 -d 1.txt.bz2
bzip2: Output file 1.txt already exists.

[root@spring ~]# xz -d 1.txt.xz
xz: 1.txt: File exists
```

#### 3.2 file 查看文件

file 命令

作用： file - determine file type #确定文件类型

用法： file /etc/passwd

> 注：linux 系统不根据后缀名识别文件类型

用 file 命令查看文件的类型。

```
[root@spring ~]#
[root@spring ~]# file /etc/passwd
/etc/passwd: ASCII text
```

#### 3.3 按一定规则排序查看文件

```
[root@spring ~]# ls -ltr # 按时间排序 t 表示时间， -r 从小到大，不加 r 参数由大到小
total 12
-rw-------. 1 root root 1457 Jan 13 21:02 anaconda-ks.cfg
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab01
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab02

[root@spring ~]# ls -lSr # 按大小排序 -r 从小到大
total 12
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab02
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab01
-rw-------. 1 root root 1457 Jan 13 21:02 anaconda-ks.cfg

[root@spring ~]# ls -lSrh # 按大小排序 -r 从小到大 ，加-h 参数，看大小，更清楚
total 12K
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab02
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab01
-rw-------. 1 root root 1.5K Jan 13 21:02 anaconda-ks.cfg

[root@spring ~]# ls -lS # 从大到小
total 12
-rw-------. 1 root root 1457 Jan 13 21:02 anaconda-ks.cfg
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab01
-rw-r--r--. 1 root root  501 Jan 13 21:27 fstab02
```

```
# 看某个目录大小
[root@spring ~]# du -sh /etc
``` 

```
# 可以快速查看磁盘大小的存储空间
[root@spring ~]# df -h
Filesystem      Size      Used     Avail     Use%     Mounted on
devtmpfs        990M     0         990M      0%       /dev
tmpfs          1000M      0        1000M      0%       /dev/shm
tmpfs          1000M     8.6M     991M      1%        /run
tmpfs          1000M     0        1000M      0%        /sys/fs/cgroup
/dev/sda3        17G    1.9G        16G      11%       /
/dev/sr0        4.4G     4.4G          0    100%       /mnt
/dev/sda1       497M  151M    346M      31%       /boot
tmpfs           200M     0        200M      0%        /run/user/0
```

#### 3.4 排序：处理大量数据时会用到的命令 sort

```
[root@spring ~]# cat /etc/passwd | sort | more

[root@spring ~]# sort -n file2 # -n 默认从小到大
2
23
231

[root@spring ~]# sort -r file2 # -r 反序排序（升序变成降序进行排序） 从大小到
231
23
2

[root@spring ~]# sort -M file3 # 支持按月份排序
January
February
March
April
```

组合使用

* -t 指定一个用来区分键位置字符
* -k 后面跟数字，指定按第几列进行排序
* -r 反序排序（升序变成降序进行排序）计算机编码排序
* -n 以用户习惯的数字进行排序

```
# 按： 做分隔符，以第 3 列，也就是用户 UID，来从大到小排序
[root@spring ~]# sort -t ":" -k3 -r /etc/passwd | more
nobody:x:99:99:Nobody:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
halt:x:7:0:halt:/sbin:/sbin/halt
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
tss:x:59:59:Account used by the trousers package to sandbox the tcsd daemon:/dev/null:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
market:x:1202:1202::/mnt/market:/bin/bash
test:x:1201:1201::/home/test:sbin/nologin
hye:x:1200:1101::/home/hye:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
oracle:x:1100:1100::/home/oracle:/bin/bash
spring:x:1000:1000::/home/spring:/bin/bash
root:x:0:0:root:/root:/bin/bash
```

```
# 把 etc 目录下所有文件，按从大到小排序
[root@spring ~]# du -h /etc | sort -r | more
96K	/etc/dbus-1
9.3M	/etc/selinux/targeted/active/modules/100
9.3M	/etc/selinux/targeted/active/modules
92K	/etc/selinux/targeted/active/modules/100/sysadm
88K	/etc/dbus-1/system.d
836K	/etc/pki/ca-trust
824K	/etc/pki/ca-trust/extracted
8.0K	/etc/yum/vars
8.0K	/etc/yum/pluginconf.d
8.0K	/etc/sysconfig/cbq
8.0K	/etc/selinux/targeted/active/modules/100/permissivedomains
8.0K	/etc/polkit-1/rules.d
8.0K	/etc/polkit-1
8.0K	/etc/NetworkManager/dispatcher.d
8.0K	/etc/my.cnf.d
8.0K	/etc/libnl
8.0K	/etc/groff/site-tmac
8.0K	/etc/groff
8.0K	/etc/firewalld/zones
8.0K	/etc/cron.daily
8.0K	/etc/audisp/plugins.d
7.9M	/etc/udev
72K	/etc/httpd
72K	/etc/grub.d
68K	/etc/selinux/targeted/active/modules/100/staff
```
