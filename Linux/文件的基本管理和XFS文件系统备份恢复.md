# 文件的基本管理和XFS文件系统备份恢复

---

## 目录

* [Linux 系统目录结构和相对/绝对路径](#path)
* [创建/复制/删除文件，rm -rf / 意外事故](#manipulatingFiles)
* [查看文件内容的命令](#checkTheFile)
* [实战：xfs文件系统的备份和恢复](#actualBackup)

## 内容

### <a href="#path" id="path">Linux 系统目录结构和相对/绝对路径</a>

#### 1.1 系统目录结构

```
[root@spring ~]# mount /dev/sr0 /media/
mount: /dev/sr0 is write-protected, mounting read-only
``` 

```
[root@spring ~]# rpm -ivh /media/Packages/tree-1.6.0-10.el7.x86_64.rpm
Preparing...                          ################################# [100%]
	package tree-1.6.0-10.el7.x86_64 is already installed
```

```
# tree 需要手动安装
[root@spring ~]# yum -y install tree

[root@spring ~]# tree /tmp
/tmp

0 directories, 0 files
```

```
[root@spring ~]# ls /
bin   dev  home  lib64  mnt  proc  run   srv  tmp  var
boot  etc  lib   media  opt  root  sbin  sys  usr
```

**根下的目录作用说明**

| 目录         | 说明 |
|:--------|:----|
| `/`     | 处于Linux系统树形结构的最顶端，它是Linux文件系统的入口，所有目录文件、设备都在 `/` 之下 |
| `/bin`  | `bin`是Binary的缩写。常用的二进制命令目录。比如 `ls`、`cp`、`mkdir`、`cut`等；和`/usr/bin`类似，一些用户级 gnu 工具 |
| `/boot` | 存放的系统启动相关的文件，例如：kernel.grub(引导装载程序) |
| `/dev`  | `dev`是Device的缩写。设备文件目录，比如声卡、磁盘……在Linux中一切都被看作文件。终端设备、磁盘等等都被看作文件<br>设备文件: /dev/sda,/dev/sda1,/dev/tty1,/dev/tty2,/dev/pts/1, /dev/zero, /dev/null, /dev/cdrom |
| `/etc`  | 常用系统及二进制安装包配置文件默认路径和服务器启动命令目录<br> `passwd` 用户信息文件<br> `shadow`用户密码文件<br>`group`存储用户组信息<br>`fstab`系统开机启动自动挂载分区列表<br>`hosts`设定用户自己的IP与主机对应的信息 |
| `/home` | 普通用户的家目录默认存放目录 |
| `/lib`  | 库文件存放目录，函数库目录 |
| `/mnt`<br>`/media` | 一般用来临时挂载存储设备的挂载目录，比如有cdrom、U盘等目录<br>在CENTOS7中会挂载到`/run`下面 |
| `/opt`  | 表示的是可选择的意思，有些软件包也会被安装在这里 |
| `/proc` | 操作系统运行时，进程（正在运行中的程序）信息及内核信息（比如 cpu、硬盘分区、内存信息等）存放在这里。/proc 目录是伪装的文件系统 proc 的挂载目录，proc 并不是真正的文件系统。因此，这个目录是一个虚拟的目录，它是系统内存的映射，我们可以通过直接访问这个目录来获取系统信息。也就是说，这个目录的内容不在硬盘上而是在内存里<br> 查看咱们的cpu信息<br> `cat /proc/cupinfo` |
| `/sys`  | 系统目录，存放硬件信息的相关文件 |
| `/run`  | 运行目录，存放的是系统运行时的数据，比如进程的PID文件 |
| `/srv`  | 服务目录，存放的是我们本地服务的相关文件 |
| `/sbin` | 大多数涉及系统管理的命令都存放在该目录中，它是超级权限用户 root 的可执行命令存放地，普通用户无权限执行这个目录下的命令，凡是目录 sbin 中包含的命令都是 root权限才能执行的 |
| `/tmp`  | 该目录用于存放临时文件，有时用户运行程序的时候，会产生一些临时文件。/tmp 就是用来存放临时文件的。/var/tmp 目录和该目录的作用是相似的,不能存放重要数据，它的权限比较特殊<br>[root@spring ~]# ls -ld /tmp<br>drwxrwxrwt. 7 root root 93 Jan 26 10:25 /tmp ->粘滞位（sticky bit）目录的sticky 位表示这个目录里的文件只能被 owner 和 root 删除 |
| `/var`  | 系统运行和软件运行时产生的日志信息，该目录的内容是经常变动的，存放的是一些变化的文件。比如/var 下有/var/log 目录用来存放系统日志的目录，还有 mail、/var/spool/cron |
| `/usr`  | 存放应用程序和文件<br>`/usr/bin` 普通用户使用的应用程序<br>`/usr/sbin` 管理员使用的应用程序<br>`/usr/lib` 库文件Glibc（32位）<br>`/usr/lib64` 库文件Glibc |
| /lib<br>/lib64<br>都在/usr/目录下 | 这个目录里存放着系统最基本的动态链接共享库，包含许多被/bin/和/sbin/中的程序使用的库文件，目录/usr/lib/中含有更多用于用户程序的库文件。作用类似于 windows里的 DLL 文件，几乎所有的应用程序都需要用到这些共享库<br>注：<br>lib***.a 是静态库<br>lib***.so 是动态库<br>静态库在编译时被加载到二进制文件中<br>动态库在运行时加载到进程的内存空间中<br>简单的说：这些库是为了让你的程序能够正常编译运行的<br>其实类似于 WIN 中.dll 文件，几乎所有的应用程序都需要用到这些共享库 |

#### 1.2 绝对路径和相对路径

* **路径：**在我们平时使用计算机时要找到需要的文件就必须知道文件的位置，而表示文件的位置的方式就是路径。
* **绝对路径：** 在Linux中国呢，绝对路径时从“/”开始的，比如/usr，/etc/passwd。如果一个路径是从根（/）开始的，它一定是绝对路径。
* **相对路径：** 相对路径是以`.` 或者`..`开始的

```
# 判断用户当前所处的位置
[root@spring ~]# pwd
/root
```

* **绝对路径：** 从/开始的路径 /home/mk
* **相对路径：** 相对于当前目录开始，a.txt ./a.txt ../miao/b.txt 当前目录在/etc

### <a href="#manipulatingFiles" id="manipulatingFiles">创建/复制/删除文件，rm -rf / 意外事故</a>

#### 2 文件管理

文件管理方式有多种:  
改变目录: `cd`  
创建/修改/移动/删除: `touch` `mkdir` `mv` `vi` `rm` `cp`

#### 2.1 创建文件和文件夹

命令之: `touch`

作用: 常用来创建空文件,如果文件存在，则修改这个文件的时间 

补充: 文件的三种时间

```
[root@spring ~]# stat /etc/passwd
  File: ‘/etc/passwd’
  Size: 851       	Blocks: 8          IO Block: 4096   regular file
Device: 803h/2051d	Inode: 17833276    Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Access: 2020-01-26 10:25:07.563000000 +0800
Modify: 2020-01-15 01:39:40.587000000 +0800
Change: 2020-01-15 01:39:40.589000000 +0800
 Birth: -
```
注:

* 访问时间:atime 查看内容 cat a.txt
* 修改时间:mtime 修改内容 vim a.txt
* 改变时间:ctime 文件属性，比如权限 change time。 chmod +x  a.sh

```
[root@spring opt]# touch file{6..20}
[root@spring opt]# ls
a.txt  file1   file12  file15  file18  file20        file{6...20}.txt  file9
dir1   file10  file13  file16  file19  file6         file7
dir2   file11  file14  file17  file2   file{6...20}  file8
```

命令之: `vim`

作用: 创建一个新文件

语法：mkdir (选项) 文件名

```
# 使用 vim 和重定向创建一个新文件
[root@spring opt]# vim tmp.txt
[root@spring opt]# ls
a.txt       file11      file14      file17      file2             file6.txt  file9.txt
dir1        file11.txt  file14.txt  file17.txt  file20            file7      tmp.txt
dir2        file12      file15      file18      file20.txt        file7.txt
file1       file12.txt  file15.txt  file18.txt  file6             file8
file10      file13      file16      file19      file{6...20}      file8.txt
file10.txt  file13.txt  file16.txt  file19.txt  file{6...20}.txt  file9
```

命令之：`mkdir`

作用：创建目录

语法：mkdir (选项) 文件名

```
[root@spring opt]# mkdir img
[root@spring opt]# ls
a.txt       file11      file14      file17      file2             file6.txt  file9.txt
dir1        file11.txt  file14.txt  file17.txt  file20            file7      img
dir2        file12      file15      file18      file20.txt        file7.txt  tmp.txt
file1       file12.txt  file15.txt  file18.txt  file6             file8
file10      file13      file16      file19      file{6...20}      file8.txt
file10.txt  file13.txt  file16.txt  file19.txt  file{6...20}.txt  file9
```

```
[root@spring opt]# mkdir tmpdir1 tmpdir2 /opt/tmpdir3
[root@spring opt]# ls
a.txt   file10.txt  file14      file17.txt  file20.txt        file8      tmpdir3
dir1    file11      file14.txt  file18      file6             file8.txt  tmp.txt
dir2    file11.txt  file15      file18.txt  file{6...20}      file9
dir3    file12      file15.txt  file19      file{6...20}.txt  file9.txt
dir4    file12.txt  file16      file19.txt  file6.txt         img
file1   file13      file16.txt  file2       file7             tmpdir1
file10  file13.txt  file17      file20      file7.txt         tmpdir2
```

```
[root@spring opt]# mkdir /a/b/c/d
mkdir: cannot create directory ‘/a/b/c/d’: No such file or directory
```

```
# 在创建一个目录的时候，如果这个目录的上一级不存在的话，要加参数-p
[root@spring opt]# mkdir -p /opt/a/b/c
[root@spring opt]# ls
a      file10      file13.txt  file17      file20            file7.txt  tmpdir2
a.txt  file10.txt  file14      file17.txt  file20.txt        file8      tmpdir3
dir1   file11      file14.txt  file18      file6             file8.txt  tmp.txt
dir2   file11.txt  file15      file18.txt  file{6...20}      file9
dir3   file12      file15.txt  file19      file{6...20}.txt  file9.txt
dir4   file12.txt  file16      file19.txt  file6.txt         img
file1  file13      file16.txt  file2       file7             tmpdir1
[root@spring opt]# cd a
[root@spring a]# ls
b
[root@spring a]# cd b
[root@spring b]# ls
c
```

命令之：rm

作用：可以删除一个目录中的一个或多个文件或目录，对于链接文件，只是删除整个链接文件，而原文件保持不变的

语法：rm (选项) 处理对象

选项：

* -f 强制删除，没有提示
* -r 删除目录

```
[root@spring opt]# ls
a       file10.txt  file14      file17.txt  file20.txt        file8      tmpdir3
dir1    file11      file14.txt  file18      file6             file8.txt  tmp.txt
dir2    file11.txt  file15      file18.txt  file{6...20}      file9
dir3    file12      file15.txt  file19      file{6...20}.txt  file9.txt
dir4    file12.txt  file16      file19.txt  file6.txt         img
file1   file13      file16.txt  file2       file7             tmpdir1
file10  file13.txt  file17      file20      file7.txt         tmpdir2
[root@spring opt]# rm -rf file*
[root@spring opt]# ls
a  dir1  dir2  dir3  dir4  img  tmpdir1  tmpdir2  tmpdir3  tmp.txt
```

> 注意：rm -rf (慎用,一定要在删除以前确定一下所在目录，防止误删除重要数据)

命令之：`cp`

语法：cp 源文件/目录 目录文件/目录

选项：-R/r：递归处理，将指定目录下的所有文件与子目录一并处理

```
[root@spring ~]# cd /tmp
[root@spring tmp]# cp /etc/passwd /tmp/
[root@spring tmp]# ls
passwd
[root@spring tmp]# cp -r /boot/grub /tmp/
[root@spring tmp]# ls
grub  passwd
```

命令之：`mv`

语法：mv 源文件/目录 目录文件/目录

```
[root@spring tmp]# mv passwd dir
[root@spring tmp]# ls
dir  grub
```

```
[root@spring tmp]# mkdir static
[root@spring tmp]# ls
dir  grub  static
[root@spring tmp]# mv dir ./static/passwd
[root@spring tmp]# ls ./static
passwd
```

### <a href="#checkTheFile" id="checkTheFile">查看文件内容的命令</a>

#### 3 查看文件

命令之：`cat`

语法：cat 文件名

作用：查看文件内容，一次显示整个文件的内容

```
[root@spring tmp]# ls
grub  static
[root@spring tmp]# ls ./static
passwd
[root@spring tmp]# cat ./static/passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
systemd-network:x:192:192:systemd Network Management:/:/sbin/nologin
dbus:x:81:81:System message bus:/:/sbin/nologin
polkitd:x:999:998:User for polkitd:/:/sbin/nologin
sshd:x:74:74:Privilege-separated SSH:/var/empty/sshd:/sbin/nologin
postfix:x:89:89::/var/spool/postfix:/sbin/nologin
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
```

命令之：`more`

作用：以分页形式显示文件内容

语法：more + 文件名

说明：按下回车刷新一行，按下空格刷新一屏，输入 q 键退出

```
[root@spring tmp]# more ./static/passwd
```

命令之：`less`

作用：和 `more` 功能一样

语法：less + 文件名

```
[root@spring tmp]# less ./static/passwd
```

说明：inux 中 more 与 less 的区别

* `more`：不支持后退，但几乎不需要加参数，空格键是向下翻页，Enter 键是向下翻一行，在不需要后退的情况下比较方便
* `less`：支持前后翻滚，既可以向上翻页（pageup 按键），也可以向下翻页（pagedown 按键）。，空格键是向下翻页
* Enter 键是向下翻一行

命令之：`head`

作用：用于显示文件的开头的内容。在默认情况下，head 命令显示文件的头 10 行内容

语法：head (选项) 文件名

参数：`-n` 显示从文件头开始的行数

```
[root@spring tmp]# head ./static/passwd
```

命令之：`tail`

作用：用于显示文件中的尾部内容。默认在屏幕上显示指定文件的末尾 10 行

语法：tail (选项)文件名

参数: 

* -n 显示文件尾部多少行的内容(n 为数字) 
* -f 动态显示数据（不关闭）,常用来查看日志

```
# 查看最后 3 行记录
[root@spring tmp]# tail -n 3 ./static/passwd
```

```
# 在一个终端执行此命令动态查看文件内容
[root@spring tmp]# tail -f ./static/passwd
```

```
[~]$ sudo su -
Password:
maozhenongdeMBP:~ root# ssh root@192.168.2.220
```

```
[root@spring tmp]# tail -f /var/log/secure
Jan 26 13:25:49 spring sshd[1281]: Accepted password for root from 192.168.2.198 port 52399 ssh2
Jan 26 13:25:50 spring sshd[1281]: pam_unix(sshd:session): session opened for user root by (uid=0)
```

### <a href="#actualBackup" id="actualBackup">实战：xfs文件系统的备份和恢复</a>

XFS 提供了 `xfsdump` 和 `xfsrestore` 工具协助备份 XFS 文件系统中的数据。xfsdump 按 inode 顺序备份一个XFS 文件系统。

centos7 选择 xfs 格式作为默认文件系统，而且不再使用以前的 ext，仍然支持 ext4，xfs 专为大数据产生，每个单个文件系统最大可以支持 8eb，单个文件可以支持 16tb，不仅数据量大，而且扩展性高。还可以通过 xfsdump，
xfsrestore 来备份和恢复。

与传统的 UNIX 文件系统不同，XFS 不需要在备份前被卸载；对使用中的 XFS 文件系统做备份就可以保证镜像的一致性。XFS 的备份和恢复的过程是可以被中断然后继续的，无须冻结文件系统。xfsdump 甚至提供了高性能的多线程首先了解一下 xfsdump 的备份级别有以下两种，默认为 0（即完全备份）

* 0 级别代表： 完全备份
* 1 到 9 级别代表： 增量备份

扩展：

* **完全备份：**每次都把指定的备份目录完整的复制一遍，不管目录下的文件有没有变化；
* **增量备份：**每次将之前（第一次、第二次、直到前一次）做过备份之后有变化的文件进行备份；
* **差异备份：**每次都将第一次完整备份以来有变化的文件进行备份。

```
# 对新添加的硬盘进行格式化，指定分区的设备
[root@spring ~]# fdisk /dev/sdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0xdf8fb4e0.
```

```

[root@spring ~]# ll /dev/sd*
brw-rw---- 1 root disk 8,  0 Jan 26 13:38 /dev/sda
brw-rw---- 1 root disk 8,  1 Jan 26 13:38 /dev/sda1
brw-rw---- 1 root disk 8,  2 Jan 26 13:38 /dev/sda2
brw-rw---- 1 root disk 8,  3 Jan 26 13:38 /dev/sda3
brw-rw---- 1 root disk 8, 16 Jan 26 13:51 /dev/sdb
[root@spring ~]# fdisk /dev/sdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0xa5efeed1.

Command (m for help): p

Disk /dev/sdb: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0xa5efeed1

   Device Boot      Start         End      Blocks   Id  System

Command (m for help): n # 创建一个新的分区
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p): p # 创建一个主分区
Partition number (1-4, default 1):
First sector (2048-20971519, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-20971519, default 20971519): +1G # 指定分区大小
Using default value 20971519
Partition 1 of type Linux and of size 10 GiB is set

Command (m for help): p # 打印分区表

Disk /dev/sdb: 10.7 GB, 10737418240 bytes, 20971520 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0xa5efeed1

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048    20971519    10484736   83  Linux

Command (m for help): w # 保存
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
```

```
[root@spring ~]# ls /dev/sdb*
/dev/sdb  /dev/sdb1
```

使用新的分区，格式化分区，并进行挂载

```
[root@spring ~]# mkfs.xfs /dev/sdb1
meta-data=/dev/sdb1              isize=512    agcount=4, agsize=655296 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0, sparse=0
data     =                       bsize=4096   blocks=2621184, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

```
[root@spring ~]# mkdir /sdb1
[root@spring ~]# mount /dev/sdb1 /sdb1/

```

#### 准备备份测试文件

```
[root@spring ~]# cd /sdb1
[root@spring sdb1]# mkdir test
[root@spring sdb1]# touch ./test/a.txt
[root@spring sdb1]# tree /sdb1/
/sdb1/
├── passwd
└── test
    └── a.txt

1 directory, 2 files
```

#### 备份

```
[root@spring sdb1]# yum install -y xfsdump
```

1、备份整个分区。 （这个功能就像是虚拟机的快照，服务器被黑后，进行快速恢复）

xfsdump -f 备份存放位置 要备份路径或设备文件

注意：备份的路径这里不能写成`/sdb1/`。 可以`是/dev/sdb1`或`/sdb1`

```
# 错误示例，就是因为`/sdb1/`这个错误

[root@spring ~]# xfsdump -f /opt/dump_sdb1 /sdb1/
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control

 ============================= dump label dialog ==============================

please enter label for this dump session (timeout in 300 sec)
 -> dump_sdb1
session label entered: "dump_sdb1"

 --------------------------------- end dialog ---------------------------------

xfsdump: ERROR: /sdb1/ does not identify a file system
xfsdump: usage: xfsdump [ -a (dump DMF dualstate files as offline) ]
                        [ -b <blocksize> ]
                        [ -c <media change alert program>  ]
                        [ -d <dump media file size>  ]
                        [ -e (allow files to be excluded) ]
                        [ -f <destination> ... ]
                        [ -h (help) ]
                        [ -l <level> ]
                        [ -m (force usage of minimal rmt) ]
                        [ -o (overwrite tape) ]
                        [ -p <seconds between progress reports> ]
                        [ -q <use QIC tape settings> ]
                        [ -s <subtree> ... ]
                        [ -t <file> (use file mtime for dump time ]
                        [ -v <verbosity {silent, verbose, trace}> ]
                        [ -z <maximum file size> ]
                        [ -A (don't dump extended file attributes) ]
                        [ -B <base dump session id> ]
                        [ -D (skip unchanged directories) ]
                        [ -E (pre-erase media) ]
                        [ -F (don't prompt) ]
                        [ -I (display dump inventory) ]
                        [ -J (inhibit inventory update) ]
                        [ -K (generate format 2 dump) ]
                        [ -L <session label> ]
                        [ -M <media label> ... ]
                        [ -O <options file> ]
                        [ -R (resume) ]
                        [ -T (don't timeout dialogs) ]
                        [ -Y <I/O buffer ring length> ]
                        [ - (stdout) ]
                        [ <source (mntpnt|device)> ]
xfsdump: Dump Status: ERROR
```

```
[root@spring ~]# xfsdump -f /opt/dump_sdb1 /sdb1
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control

 ============================= dump label dialog ==============================

please enter label for this dump session (timeout in 300 sec)
 -> dump_sdb1 # 指定备份会话标签
session label entered: "dump_sdb1"

 --------------------------------- end dialog ---------------------------------

xfsdump: level 0 dump of spring:/sdb1
xfsdump: dump date: Sun Jan 26 14:15:02 2020
xfsdump: session id: 61c29aa4-0472-4be9-8d8b-492dfbed6609
xfsdump: session label: "dump_sdb1"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: skipping (no pruning necessary)
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 25856 bytes
xfsdump: /var/lib/xfsdump/inventory created

 ============================= media label dialog =============================

please enter label for media in drive 0 (timeout in 300 sec)
 -> sdb1 # 指定设备标签，就是对要备份的设备做一个描述
media label entered: "sdb1"

 --------------------------------- end dialog ---------------------------------

xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 23008 bytes
xfsdump: dump size (non-dir files) : 1056 bytes
xfsdump: dump complete: 56 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/dump_sdb1 OK (success)
xfsdump: Dump Status: SUCCESS
```

2、指定备份时免交互操作，方便后期做定时备份

* `[root@spring ~]# xfsdump -f /opt/dump_passwd /sdb1 -L dump_passwd -M media1`
* -L ：xfsdump 纪录每次备份的 session 标头，这里可以填写针对此文件系统的简易说明
* -M ：xfsdump 可以纪录储存媒体的标头，这里可以填写此媒体的简易说明

```
[root@spring ~]# xfsdump -f /opt/dump_passwd /sdb1 -L dump_passwd -M media1
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 0 dump of spring:/sdb1
xfsdump: dump date: Sun Jan 26 14:22:02 2020
xfsdump: session id: fe436d1e-b0fc-423b-b19a-c1b697fd48a1
xfsdump: session label: "dump_passwd"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: skipping (no pruning necessary)
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 26176 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 23328 bytes
xfsdump: dump size (non-dir files) : 1056 bytes
xfsdump: dump complete: 0 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/dump_passwd OK (success)
xfsdump: Dump Status: SUCCESS
```

测试恢复：先删除文件

```
[root@spring ~]# cd /sdb1
[root@spring sdb1]# ls
passwd  test
[root@spring sdb1]# rm -rf ./*
[root@spring sdb1]# ls
```

3、指定只备份分区中某个目录

参数：-s 文件路径 只对指定的文件进行备份，-s 指定时，路径写的是相对路径(-s 可以是文件或目录)

```

[root@spring ~]# xfsdump -f /opt/dump_grub2 -s grub2/grub.cfg /boot -L dump_grub2 -M boot-sda1
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 0 dump of spring:/boot
xfsdump: dump date: Sun Jan 26 14:29:27 2020
xfsdump: session id: 58e97bed-82d3-47d2-b090-0af8019a502b
xfsdump: session label: "dump_grub2"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: skipping (no pruning necessary)
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 29632 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 27944 bytes
xfsdump: dump size (non-dir files) : 4640 bytes
xfsdump: dump complete: 5 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/dump_grub2 OK (success)
xfsdump: Dump Status: SUCCESS

[root@spring sdb1]# ls
passwd  test

[root@spring sdb1]# tree /sdb1
/sdb1
├── passwd
└── test
    └── a.txt

1 directory, 2 files
```

4、查看备份信息与内容

备份成功后，我们就可以在/var/lib/xfsdump/inventory 目录下看到生成的档案信息

```
[root@spring ~]# xfsdump -I
file system 0:
	fs id:		5cebdd0b-44ae-4341-89f0-43080ccdd20f
	session 0:
		mount point:	spring:/sdb1
		device:		spring:/dev/sdb1
		time:		Sun Jan 26 14:15:02 2020
		session label:	"dump_sdb1"
		session id:	61c29aa4-0472-4be9-8d8b-492dfbed6609
		level:		0
		resumed:	NO
		subtree:	NO
		streams:	1
		stream 0:
			pathname:	/opt/dump_sdb1
			start:		ino 67 offset 0
			end:		ino 70 offset 0
			interrupted:	NO
			media files:	1
			media file 0:
				mfile index:	0
				mfile type:	data
				mfile size:	23008
				mfile start:	ino 67 offset 0
				mfile end:	ino 70 offset 0
				media label:	"sdb1"
				media id:	a04d258a-bbde-43f2-8ff9-6a5e106d985e
	session 1:
		mount point:	spring:/sdb1
		device:		spring:/dev/sdb1
		time:		Sun Jan 26 14:22:02 2020
		session label:	"dump_passwd"
		session id:	fe436d1e-b0fc-423b-b19a-c1b697fd48a1
		level:		0
		resumed:	NO
		subtree:	NO
		streams:	1
		stream 0:
			pathname:	/opt/dump_passwd
			start:		ino 67 offset 0
			end:		ino 71 offset 0
			interrupted:	NO
			media files:	1
			media file 0:
				mfile index:	0
				mfile type:	data
				mfile size:	23328
				mfile start:	ino 67 offset 0
				mfile end:	ino 71 offset 0
				media label:	"media1"
				media id:	9924187f-7186-440e-b966-83867ccb28ec
file system 1:
	fs id:		f9835a75-e831-42e0-969e-bfe762910352
	session 0:
		mount point:	spring:/boot
		device:		spring:/dev/sda1
		time:		Sun Jan 26 14:29:27 2020
		session label:	"dump_grub2"
		session id:	58e97bed-82d3-47d2-b090-0af8019a502b
		level:		0
		resumed:	NO
		subtree:	YES
		streams:	1
		stream 0:
			pathname:	/opt/dump_grub2
			start:		ino 786501 offset 0
			end:		ino 786502 offset 0
			interrupted:	NO
			media files:	1
			media file 0:
				mfile index:	0
				mfile type:	data
				mfile size:	27944
				mfile start:	ino 786501 offset 0
				mfile end:	ino 786502 offset 0
				media label:	"boot-sda1"
				media id:	803eb461-05eb-47a3-8c2e-83c289f9fced
xfsdump: Dump Status: SUCCESS
```

```
[root@spring sdb1]# xfsrestore -f /opt/dump_sdb1 /sdb1
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /sdb1
xfsrestore: volume: /dev/sdb1
xfsrestore: session time: Sun Jan 26 14:15:02 2020
xfsrestore: level: 0
xfsrestore: session label: "dump_sdb1"
xfsrestore: media label: "sdb1"
xfsrestore: file system id: 5cebdd0b-44ae-4341-89f0-43080ccdd20f
xfsrestore: session id: 61c29aa4-0472-4be9-8d8b-492dfbed6609
xfsrestore: media id: a04d258a-bbde-43f2-8ff9-6a5e106d985e
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 2 directories and 3 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/dump_sdb1 OK (success)
xfsrestore: Restore Status: SUCCESS
[root@spring sdb1]# ls
passwd  test

[root@spring ~]# xfsrestore -f /opt/dump_grub2 -s grub2/grub.cfg /var/test
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /boot
xfsrestore: volume: /dev/sda1
xfsrestore: session time: Sun Jan 26 14:29:27 2020
xfsrestore: level: 0
xfsrestore: session label: "dump_grub2"
xfsrestore: media label: "boot-sda1"
xfsrestore: file system id: f9835a75-e831-42e0-969e-bfe762910352
xfsrestore: session id: 58e97bed-82d3-47d2-b090-0af8019a502b
xfsrestore: media id: 803eb461-05eb-47a3-8c2e-83c289f9fced
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 2 directories and 17 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/dump_grub2 OK (success)
xfsrestore: Restore Status: SUCCESS

[root@spring ~]# xfsrestore -f /opt/dump_grub2 -s grub2 /var/test
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /boot
xfsrestore: volume: /dev/sda1
xfsrestore: session time: Sun Jan 26 14:29:27 2020
xfsrestore: level: 0
xfsrestore: session label: "dump_grub2"
xfsrestore: media label: "boot-sda1"
xfsrestore: file system id: f9835a75-e831-42e0-969e-bfe762910352
xfsrestore: session id: 58e97bed-82d3-47d2-b090-0af8019a502b
xfsrestore: media id: 803eb461-05eb-47a3-8c2e-83c289f9fced
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 2 directories and 17 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/dump_grub2 OK (success)
xfsrestore: Restore Status: SUCCESS
```

> 使用 xfsdump 时，请注意下面下面的几个限制：
> 
> 1. xfsdump 不支持没有挂载的文件系统备份！所以只能备份已挂载的！
> 2. xfsdump 必须使用 root 的权限才能操作 (涉及文件系统的关系)
> 3. xfsdump 只能备份 XFS 文件系统
> 4. xfsdump 备份下来的数据 (档案或储存媒体) 只能让 xfsrestore 解析
> 5. xfsdump 是透过文件系统的 UUID 来分辨各个备份档的，因此不能备份两个具有相同 UUID 的文件系统

5、 增量备份

概念：增量备份是指在一次全备份或上一次增量备份后，以后每次的备份只需备份与前一次相比增加或者被修改的文件。这就意味着，第一次增量备份的对象是进行全备后所产生的增加和修改的文件；第二次增量备份的对象是进行第一次增量备份后所产生的增加和修改的文件，以此类推。

优缺点：

* 优点：没有重复的备份数据，因此备份的数据量不大，备份所需的时间很短。
* 缺点：数据恢复相对比较麻烦，它需要上一次全备份和所有增量备份的内容才能够完全恢复成功，并且它们必须沿着从

全备份到依次增量备份的时间顺序逐个反推恢复，因此可能会延长的恢复时间

```

[root@spring opt]# xfsdump -f /opt/test-full /sdb1 -L test-full -M media0
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 0 dump of spring:/sdb1
xfsdump: dump date: Sun Jan 26 19:42:55 2020
xfsdump: session id: 19f2fa41-cc81-499a-be75-fbc7043ecfd1
xfsdump: session label: "test-full"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: skipping (no pruning necessary)
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 25856 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 23008 bytes
xfsdump: dump size (non-dir files) : 1056 bytes
xfsdump: dump complete: 0 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/test-full OK (success)
xfsdump: Dump Status: SUCCESS
```

```
[root@spring ~]# xfsdump -f /opt/test-full /sdb1 -L test-back1 -M media0
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 0 dump of spring:/sdb1
xfsdump: dump date: Sun Jan 26 20:08:58 2020
xfsdump: session id: de83cf14-ba13-4b5f-920c-300ca0f86bec
xfsdump: session label: "test-back1"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: skipping (no pruning necessary)
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 25536 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 22696 bytes
xfsdump: dump size (non-dir files) : 1056 bytes
xfsdump: dump complete: 0 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/test-full OK (success)
xfsdump: Dump Status: SUCCESS
```

```
[root@spring ~]# touch /sdb1/1.txt /sdb1/2.txt
[root@spring ~]# tree /sdb1
/sdb1
├── 1.txt
├── 2.txt
├── passwd
└── test

1 directory, 3 files
```

```
[root@spring ~]# xfsdump -l 1 -f /opt/test-back1 /sdb1 -L test-back1 -M media0
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 1 incremental dump of spring:/sdb1 based on level 0 dump begun Sun Jan 26 20:08:58 2020
xfsdump: dump date: Sun Jan 26 20:10:39 2020
xfsdump: session id: c76536b9-3069-489b-8905-d033bca75f60
xfsdump: session label: "test-back1"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: pruning unneeded subtrees
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 21440 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 21696 bytes
xfsdump: dump size (non-dir files) : 0 bytes
xfsdump: dump complete: 0 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/test-back1 OK (success)
xfsdump: Dump Status: SUCCESS
```

```
[root@spring ~]# touch /sdb1/test/a.txt /sdb1/test/b.txt
[root@spring ~]# tree /sdb1/
/sdb1/
├── 1.txt
├── 2.txt
├── passwd
└── test
    ├── a.txt
    └── b.txt

1 directory, 5 files
```

```
[root@spring ~]# xfsdump -l 2 -f /opt/test-back2 /sdb1 -L test-back2 -M media0
xfsdump: using file dump (drive_simple) strategy
xfsdump: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsdump: level 2 incremental dump of spring:/sdb1 based on level 1 dump begun Sun Jan 26 20:10:39 2020
xfsdump: dump date: Sun Jan 26 20:15:24 2020
xfsdump: session id: b0e24f91-b993-43a0-a632-acefe59b4f09
xfsdump: session label: "test-back2"
xfsdump: ino map phase 1: constructing initial dump list
xfsdump: ino map phase 2: pruning unneeded subtrees
xfsdump: ino map phase 3: skipping (only one dump stream)
xfsdump: ino map construction complete
xfsdump: estimated dump size: 21760 bytes
xfsdump: creating dump session media file 0 (media 0, file 0)
xfsdump: dumping ino map
xfsdump: dumping directories
xfsdump: dumping non-directory files
xfsdump: ending media file
xfsdump: media file size 22024 bytes
xfsdump: dump size (non-dir files) : 0 bytes
xfsdump: dump complete: 0 seconds elapsed
xfsdump: Dump Summary:
xfsdump:   stream 0 /opt/test-back2 OK (success)
xfsdump: Dump Status: SUCCESS
```

```
[root@spring ~]# rm -rf /sdb1/*
[root@spring ~]# tree /sdb1/
/sdb1/

0 directories, 0 files
```

现在进行恢复，要想恢复全部数据，包括新添加的文件，如何恢复？

步骤：

1. 先恢复完全备份
2. 情况 1: 恢复最后一次增量备份（如果两次增量备份都是 1 级的，所以只需要恢复最后一个增量就可以了。
3. 情况 2：如果你做的是第一次是 1 级备，第二次是 2 级备，那么你在恢复的时候就需要先恢复完全备份，然后是 1 级备，最后是 2 级备）

```
[root@spring ~]# xfsrestore -f /opt/test-full /sdb1/
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /sdb1
xfsrestore: volume: /dev/sdb1
xfsrestore: session time: Sun Jan 26 20:08:58 2020
xfsrestore: level: 0
xfsrestore: session label: "test-back1"
xfsrestore: media label: "media0"
xfsrestore: file system id: 5cebdd0b-44ae-4341-89f0-43080ccdd20f
xfsrestore: session id: de83cf14-ba13-4b5f-920c-300ca0f86bec
xfsrestore: media id: 11891b55-5b69-4d93-a3df-71c902bcd2c4
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 2 directories and 2 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/test-full OK (success)
xfsrestore: Restore Status: SUCCESS
[root@spring ~]# tree /sdb1/
/sdb1/
├── passwd
└── test

1 directory, 1 file
```

```
[root@spring ~]# xfsrestore -f /opt/test-back2 /sdb1/
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /sdb1
xfsrestore: volume: /dev/sdb1
xfsrestore: session time: Sun Jan 26 20:15:24 2020
xfsrestore: level: 2
xfsrestore: session label: "test-back2"
xfsrestore: media label: "media0"
xfsrestore: file system id: 5cebdd0b-44ae-4341-89f0-43080ccdd20f
xfsrestore: session id: b0e24f91-b993-43a0-a632-acefe59b4f09
xfsrestore: media id: 7d38e0ab-89b3-49af-94fe-47706b9525fb
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 2 directories and 6 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/test-back2 OK (success)
xfsrestore: Restore Status: SUCCESS
```

```
[root@spring ~]# tree /sdb1/
/sdb1/
├── passwd
└── test
    ├── a.txt
    └── b.txt

1 directory, 3 files
```

```
[root@spring ~]# xfsrestore -f /opt/test-back1 /sdb1/
xfsrestore: using file dump (drive_simple) strategy
xfsrestore: version 3.1.7 (dump format 3.0) - type ^C for status and control
xfsrestore: searching media for dump
xfsrestore: examining media file 0
xfsrestore: dump description:
xfsrestore: hostname: spring
xfsrestore: mount point: /sdb1
xfsrestore: volume: /dev/sdb1
xfsrestore: session time: Sun Jan 26 20:10:39 2020
xfsrestore: level: 1
xfsrestore: session label: "test-back1"
xfsrestore: media label: "media0"
xfsrestore: file system id: 5cebdd0b-44ae-4341-89f0-43080ccdd20f
xfsrestore: session id: c76536b9-3069-489b-8905-d033bca75f60
xfsrestore: media id: b7b2d4c6-d70b-4379-b884-99f4c2de81fb
xfsrestore: using online session inventory
xfsrestore: searching media for directory dump
xfsrestore: reading directories
xfsrestore: 1 directories and 4 entries processed
xfsrestore: directory post-processing
xfsrestore: restoring non-directory files
xfsrestore: restore complete: 0 seconds elapsed
xfsrestore: Restore Summary:
xfsrestore:   stream 0 /opt/test-back1 OK (success)
xfsrestore: Restore Status: SUCCESS

[root@spring ~]# tree /sdb1/
/sdb1/
├── 1.txt
├── 2.txt
├── passwd
└── test
    ├── a.txt
    └── b.txt

1 directory, 5 files
```