# 第十五章：LVM管理和ssm存储管理器使用

---

## 目录

* [LVM的工作原理](#lvm)
* [创建LVM的基本步骤](#createLvm)
* [实战：使用SSM工具为公司的邮件服务器创建可动态扩容的存储池](#ssm)

## 内容

### <a href="#lvm" id="lvm">LVM的工作原理</a>

LVM （Logical Volume Manager）逻辑卷管理，是在磁盘分区和文件系统之间添加的一个逻辑层，来为文件系统屏蔽下层磁盘分区布局，提供一个抽象的盘卷，在盘卷上建立文件系统。管理员利用LVM可以在磁盘不用重新分区的情况下动态调整文件系统的大小，并且利用LVM管理的文件系统可以跨越磁盘，当服务器添加了新的磁盘后，管理员不必将原有的文件移动到新的磁盘上，而是通过LVM可以直接扩展文件系统跨越磁盘。

它就是通过将底层的物理硬盘封装起来，然后以逻辑卷的方式呈现给上层应用。在LVM中，其通过对底层的硬盘进行封装，当我们对底层的物理硬盘进行操作时，其不再是针对于分区进行操作，而是通过一个叫做逻辑卷的东西来对其进行底层的磁盘管理操作。

**1.1 LVM常用的术语**

* 物理存储介质（The physical media）：LVM存储介质可以是磁盘分区，整个磁盘，RAID阵列或SAN磁盘，设备必须初始化为LVM物理卷，才能与LVM结合使用。
* 物理卷PV（physical volume）：物理卷就是LVM的基本存储逻辑块，但和基本的物理存储介质（如分区、磁盘等）比较，却包含有与LVM相关的管理参数，创建物理卷它可以用硬盘分区，也可以用硬盘本身。
* 卷组VG（Volume Group）：一个LVM卷组由一个或多个物理卷组成。
* 逻辑卷LV（logical volume）：LV建立在VG之上，可以在LV之上建立文件系统
* PE（physical extents）：PV物理卷中可以分配的最小存储单元，PE的大小是可以指定的，默认为4MB
* LE（logical extent）：LV逻辑卷中可以分配的最小存储单元，在同一个卷组中，LE的大小和PE是相同的，并一一对应。

最小存储单位总结：

| 名称 | 最小存储单位 |
|:----|:----------|
| 硬盘 | 扇区（512字节） |
| 文件系统 | block（1K或4K）# mkfs.ext4 -b 2048 /dev/sdb1 最大支持到4096 |
| raid | chunk（512K） # mdadm -C -v /dev/md5 -l 5 -n 3 -c 512 -x 1 /dev/sde[1,2,3,5] |
| LVM | PE（4M） # vgcreate -s 4M vg1 /dev/sdb[1,2] |

LVM主要元素构成：

![LVM主要元素构成](./img/lvm-1.png)

总结：多个磁盘/分区raid-〉多个物理卷PV-〉合成卷组-〉从VG划出逻辑卷LV-〉格式化LV挂载使用

**1.2 LVM 优点**

* 使用卷组，使多个硬盘空间看起来像是一个大硬盘
* 使用逻辑卷，可以跨多个硬盘空间的分区 `sdb1`、 `sdb2`、 `sdc1`、 `sdd2`、 `sdf`
* 在使用逻辑卷时，它可以在空间不足的时候动态调整它的大小
* 在调整逻辑卷大小时，不需要考虑逻辑卷在硬盘上的位置，不用担心没有可用的连续空间。
* 可以在线对LV，VG进行创建、删除、调整大小等操作。LVM上的文件系统也需要重新调整大小。
* 允许创建快照，可以用来保存文件系统的备份。
* <font color="#f00">RAID+LVM一起使用：LVM是软件的卷管理方式，而RAID是磁盘管理的方法。对于重要的数据，使用RAID用来保护物理的磁盘不会因为故障而中断业务，再用LVM用来实现对卷的良性的管理，更好的利用磁盘资源。</font>

### <a href="#createLvm" id="createLvm">创建LVM的基本步骤</a>

1. 物理磁盘被格式化为PV，（空间被划分为一个个的PE）# PV包含PE
2. 不同的PV加入到同一个VG中，（不同PV的PE全部进入到了VG的PE池内）#VG包含PV
3. 在VG中创建LV逻辑卷，基于PE创建，（组成LV的PE可能来自不同的物理磁盘）# LV基于PE创建。
4. LV直接可以格式化后挂载使用 # 格式化挂载使用
5. LV的扩充缩减实际上就是增加或减少组成该LV的PE数量，其过程不会丢失原始数据

**2.1 lvm 常用的命令**

| 功能 | PV管理命令 | VG管理命令 | LV管理命令 |
|:---:|:--------:|:---------:|:--------:|
| scan扫描 | pvscan | vgscan | lvscan |
| create 创建 | pvcreate | vgcreate | lvcreate |
| display 显示 | pvdisplay | vgdisplay | lvdisplay |
| remove 移除 | pvremove | vgremove | lvremove |
| extend 扩充 |  | vgextend | lvextend |
| reduce 减少 |  | vgreduce | lvreduce |

下面的操作会用的一些查看命令：

<table>
	<thead>
		<tr>
			<th>查看卷名</th>
			<th>简单对应卷信息的查看</th>
			<th>扫描相关的所有对应卷</th>
			<th>详细对应卷信息的查看</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>物理卷</th>
			<td>pvs</td>
			<td>pvscan</td>
			<td>pvdisplay</td>
		</tr>
		<tr>
			<th>卷组</th>
			<td>vgs</td>
			<td>vgscan</td>
			<td>vgdisplay</td>
		</tr>
		<tr>
			<th>逻辑卷</th>
			<td>lvs</td>
			<td>lvscan</td>
			<td>lvdisplay</td>
		</tr>
	</tbody>
</table>

**2.2 创建并使用LVM逻辑卷**

1创建PV

```
# 添加一个sdb磁盘
[root@spring ~]# fdisk /dev/sdb # 创建4个主分区，每个分区1G
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table
Building a new DOS disklabel with disk identifier 0x4badb433.

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System

Command (m for help): n
Partition type:
   p   primary (0 primary, 0 extended, 4 free)
   e   extended
Select (default p):
Using default response p
Partition number (1-4, default 1):
First sector (2048-16777215, default 2048):
Using default value 2048
Last sector, +sectors or +size{K,M,G} (2048-16777215, default 16777215): +1G
Partition 1 of type Linux and of size 1 GiB is set

Command (m for help): n
Partition type:
   p   primary (1 primary, 0 extended, 3 free)
   e   extended
Select (default p):
Using default response p
Partition number (2-4, default 2):
First sector (2099200-16777215, default 2099200):
Using default value 2099200
Last sector, +sectors or +size{K,M,G} (2099200-16777215, default 16777215): +1G
Partition 2 of type Linux and of size 1 GiB is set

Command (m for help): n
Partition type:
   p   primary (2 primary, 0 extended, 2 free)
   e   extended
Select (default p): p
Partition number (3,4, default 3):
First sector (4196352-16777215, default 4196352):
Using default value 4196352
Last sector, +sectors or +size{K,M,G} (4196352-16777215, default 16777215): +1G
Partition 3 of type Linux and of size 1 GiB is set

Command (m for help): n
Partition type:
   p   primary (3 primary, 0 extended, 1 free)
   e   extended
Select (default e):
Using default response e
Selected partition 4
First sector (6293504-16777215, default 6293504):
Using default value 6293504
Last sector, +sectors or +size{K,M,G} (6293504-16777215, default 16777215): +1G
Partition 4 of type Extended and of size 1 GiB is set

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   83  Linux
/dev/sdb2         2099200     4196351     1048576   83  Linux
/dev/sdb3         4196352     6293503     1048576   83  Linux
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
[root@spring ~]# ls /dev/sdb*
/dev/sdb  /dev/sdb1  /dev/sdb2  /dev/sdb3  /dev/sdb4
```

设定分区类型代码：fdisk /dev/sdb ===> t ===> 选择分区号 ====> 8e ====> w

注：现在系统已经很智能了， 直接使用默认的 83 Linux 分区，也可以创建 pv 的。

```

[root@spring ~]# fdisk /dev/sdb
Welcome to fdisk (util-linux 2.23.2).

Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   83  Linux
/dev/sdb2         2099200     4196351     1048576   83  Linux
/dev/sdb3         4196352     6293503     1048576   83  Linux
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 1
Hex code (type L to list all codes):
Hex code (type L to list all codes): L

 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden C:  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi eb  BeOS fs
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         ee  GPT
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ef  EFI (FAT-12/16/
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        f0  Linux/PA-RISC b
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f1  SpeedStor
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f4  SpeedStor
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f2  DOS secondary
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      fb  VMware VMFS
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fc  VMware VMKCORE
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fd  Linux raid auto
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fe  LANstep
1c  Hidden W95 FAT3 75  PC/IX           be  Solaris boot    ff  BBT
1e  Hidden W95 FAT1 80  Old Minix
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   83  Linux
/dev/sdb3         4196352     6293503     1048576   83  Linux
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 2
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): t
Partition number (1-4, default 4): 3
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): t
Partition number (1-4, default 4): 4
Hex code (type L to list all codes): 8e

You cannot change a partition into an extended one or vice versa.
Delete it first.

Type of partition 4 is unchanged: Extended

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4):
Hex code (type L to list all codes): 8e

You cannot change a partition into an extended one or vice versa.
Delete it first.

Type of partition 4 is unchanged: Extended

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 4
Hex code (type L to list all codes): 8e

You cannot change a partition into an extended one or vice versa.
Delete it first.

Type of partition 4 is unchanged: Extended

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 1
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux LVM' to 'Linux LVM'

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4):
Hex code (type L to list all codes): 8e

You cannot change a partition into an extended one or vice versa.
Delete it first.

Type of partition 4 is unchanged: Extended

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 3
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux LVM' to 'Linux LVM'

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576    5  Extended

Command (m for help): t
Partition number (1-4, default 4): 4
Hex code (type L to list all codes): 8e

You cannot change a partition into an extended one or vice versa.
Delete it first.

Type of partition 4 is unchanged: Extended

Command (m for help): d
Partition number (1-4, default 4): 4
Partition 4 is deleted

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM

Command (m for help): n
Partition type:
   p   primary (3 primary, 0 extended, 1 free)
   e   extended
Select (default e): p
Selected partition 4
First sector (6293504-16777215, default 6293504):
Using default value 6293504
Last sector, +sectors or +size{K,M,G} (6293504-16777215, default 16777215): +1G
Partition 4 of type Linux and of size 1 GiB is set

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576   83  Linux

Command (m for help): t
Partition number (1-4, default 4):
Hex code (type L to list all codes): 8e
Changed type of partition 'Linux' to 'Linux LVM'

Command (m for help): p

Disk /dev/sdb: 8589 MB, 8589934592 bytes, 16777216 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk label type: dos
Disk identifier: 0x4badb433

   Device Boot      Start         End      Blocks   Id  System
/dev/sdb1            2048     2099199     1048576   8e  Linux LVM
/dev/sdb2         2099200     4196351     1048576   8e  Linux LVM
/dev/sdb3         4196352     6293503     1048576   8e  Linux LVM
/dev/sdb4         6293504     8390655     1048576   8e  Linux LVM

Command (m for help): w
The partition table has been altered!

Calling ioctl() to re-read partition table.
Syncing disks.
```

```
[root@spring ~]# pvcreate /dev/sdb[1,2,3,4]
-bash: pvcreate: command not found

[root@spring ~]# yum install lvm2 -y

[root@spring ~]# rpm -qa | grep lvm
lvm2-libs-2.02.185-2.el7_7.2.x86_64
lvm2-2.02.185-2.el7_7.2.x86_64

[root@spring ~]# pvcreate /dev/sdb{1,2,3,4} # 创建 pv
WARNING: dos signature detected on /dev/sdb4 at offset 510. Wipe it? [y/n]: y
  Wiping dos signature on /dev/sdb4.
  Physical volume "/dev/sdb1" successfully created.
  Physical volume "/dev/sdb2" successfully created.
  Physical volume "/dev/sdb3" successfully created.
  Physical volume "/dev/sdb4" successfully created.
```

```
[root@spring ~]# pvdisplay /dev/sdb1 # 查看物理卷信息
  "/dev/sdb1" is a new physical volume of "1.00 GiB"
  --- NEW Physical volume ---
  PV Name               /dev/sdb1
  VG Name
  PV Size               1.00 GiB
  Allocatable           NO
  PE Size               0
  Total PE              0
  Free PE               0
  Allocated PE          0
  PV UUID               G9NakX-M3Ik-DO2n-whxE-Bbzb-jwYL-UPQrZe
```

创建vg卷组：

语法： vgcreate vg 名字 pv 的名字

```
[root@spring ~]# vgcreate vg01 /dev/sdb1
  Volume group "vg01" successfully created

[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg01   1   0   0 wz--n- 1020.00m 1020.00m
  

[root@spring ~]# vgdisplay vg01
  --- Volume group ---
  VG Name               vg01
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               1020.00 MiB
  PE Size               4.00 MiB
  Total PE              255
  Alloc PE / Size       0 / 0
  Free  PE / Size       255 / 1020.00 MiB
  VG UUID               c127fg-OKdd-aLHv-jGr0-G5UM-BDrT-4nWMj4  
```

创建LV

lvcreate -n 指定新逻辑卷的名称 -L 指定 lv 大小的 SIZE(M,G) （-l：小 l 指定 LE 的数量） vgname

```
[root@spring ~]# lvcreate -n lv01 -L 16M vg01
  Logical volume "lv01" created.

[root@spring ~]# lvcreate -n lv02 -l 4 vg01
  Logical volume "lv02" created.
 
[root@spring ~]# lvs
  LV   VG   Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv01 vg01 -wi-a----- 16.00m
  lv02 vg01 -wi-a----- 16.00m
  
[root@spring ~]# pvdisplay /dev/sdb1
  --- Physical volume ---
  PV Name               /dev/sdb1
  VG Name               vg01
  PV Size               1.00 GiB / not usable 4.00 MiB
  Allocatable           yes
  PE Size               4.00 MiB
  Total PE              255
  Free PE               247
  Allocated PE          8 #  Allocated ['æləkeɪtɪd] 分配 ，已经使用了 8 个 PE
  PV UUID               G9NakX-M3Ik-DO2n-whxE-Bbzb-jwYL-UPQrZe  
```

```
[root@spring ~]# vgdisplay vg01
  --- Volume group ---
  VG Name               vg01
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  3
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                2
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               1020.00 MiB
  PE Size               4.00 MiB
  Total PE              255
  Alloc PE / Size       8 / 32.00 MiB # 已经使用 8M
  Free  PE / Size       247 / 988.00 MiB
  VG UUID               c127fg-OKdd-aLHv-jGr0-G5UM-BDrT-4nWMj4
```  

**2.2.1 文件系统格式与挂载**

```
[root@spring ~]# mkdir /lv01
[root@spring ~]# ls /dev/vg01/ # 查看逻辑卷
lv01  lv02
[root@spring ~]# ll /dev/vg01//lv01 # #其实 lv01 是 dm-0 的软链接
lrwxrwxrwx 1 root root 7 Feb  5 20:42 /dev/vg01//lv01 -> ../dm-0
[root@spring ~]# mkfs.ext4 /dev/vg01/lv01
mke2fs 1.42.9 (28-Dec-2013)
Filesystem label=
OS type: Linux
Block size=1024 (log=0)
Fragment size=1024 (log=0)
Stride=0 blocks, Stripe width=0 blocks
4096 inodes, 16384 blocks
819 blocks (5.00%) reserved for the super user
First data block=1
Maximum filesystem blocks=16777216
2 block groups
8192 blocks per group, 8192 fragments per group
2048 inodes per group
Superblock backups stored on blocks:
	8193

Allocating group tables: done
Writing inode tables: done
Creating journal (1024 blocks): done
Writing superblocks and filesystem accounting information: done

[root@spring ~]# mount /dev/vg01/lv01 /lv01/
[root@spring ~]# df -Th /lv01/
Filesystem            Type  Size  Used Avail Use% Mounted on
/dev/mapper/vg01-lv01 ext4   15M  268K   14M   2% /lv01
```

**2.3 指定 PE 大小用**

指定 PE 大小用的参数： -s ,如果存储的数据都是大文件，那么 PE 尽量调大，读取速度快

```
[root@spring ~]# vgcreate -s 16M vg02 /dev/sdb2 
  Volume group "vg02" successfully created
```

PE 的大小只有为 2 的幂数，且最大为 512M

```
[root@spring ~]# vgdisplay vg02
  --- Volume group ---
  VG Name               vg02
  System ID
  Format                lvm2
  Metadata Areas        1
  Metadata Sequence No  1
  VG Access             read/write
  VG Status             resizable
  MAX LV                0
  Cur LV                0
  Open LV               0
  Max PV                0
  Cur PV                1
  Act PV                1
  VG Size               1008.00 MiB
  PE Size               16.00 MiB # 已经是 16MB
  Total PE              63
  Alloc PE / Size       0 / 0
  Free  PE / Size       63 / 1008.00 MiB
  VG UUID               Wg6ZxC-NdSq-kHxV-c1xc-6FA3-MPc7-nQBBm4
```

**2.4 LV 扩容**

首先，确定一下是否有可用的扩容空间，因为空间是从 VG 里面创建的，并且 LV 不能跨 VG 扩容

```
[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg01   1   2   0 wz--n- 1020.00m  988.00m
  vg02   1   0   0 wz--n- 1008.00m 1008.00m
```

命令如下

| extend 扩展 | vgextend | lvextend  |
|:---|:---|:---|

扩容逻辑卷

```
[root@spring ~]# lvextend -L +30m /dev/vg01/lv01
  Rounding size to boundary between physical extents: 32.00 MiB.
  Size of logical volume vg01/lv01 changed from 16.00 MiB (4 extents) to 48.00 MiB (12 extents).
  Logical volume vg01/lv01 successfully resized.
```

说明：在指定大小的时候，扩容30M和扩容到30M是不一样的写法

* 扩容 30m    ===> -L +30M
* 扩容到 30m ===> -L 30M

```
[root@spring ~]# lvextend -L + 30m /dev/vg01/lv01
  Size requires number argument.
  Invalid argument for --size: +
  Error during parsing of command line.
```  

```
[root@spring ~]# lvs
  LV   VG   Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv01 vg01 -wi-ao---- 48.00m # LV已经扩容成功
  lv02 vg01 -wi-a----- 16.00m
```

```
[root@spring ~]# df -Th /lv01/
Filesystem            Type  Size  Used Avail Use% Mounted on
/dev/mapper/vg01-lv01 ext4   15M  268K   14M   2% /lv01
```

注：可以看到 LV 虽然扩展了，但是文件系统大小还是原来的，下面开始扩容文件系统


* <font color="#f00">ext4 文件系统扩容使用命令语法： resize2fs 逻辑卷名称</font>
* <font color="#f00">xfs 文件系统扩容使用命令语法： xfs_growfs 挂载点</font>
* <font color="#f00">resize2fs 和 xfs_growfs 两者的区别是传递的参数不一样的，xfs_growfs 是采用的挂载点；resize2fs 是逻辑卷名称，而且 resize2fs 命令不能对 xfs 类型文件系统使用  </font>

```
[root@spring ~]# resize2fs /dev/vg01/lv01
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/vg01/lv01 is mounted on /lv01; on-line resizing required
old_desc_blocks = 1, new_desc_blocks = 1
The filesystem on /dev/vg01/lv01 is now 49152 blocks long.

[root@spring ~]# df -Th /lv01
Filesystem            Type  Size  Used Avail Use% Mounted on
/dev/mapper/vg01-lv01 ext4   46M  522K   43M   2% /lv01
```

**2.5 VG 扩容**

```
[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg01   1   2   0 wz--n- 1020.00m  956.00m
  vg02   1   0   0 wz--n- 1008.00m 1008.00m
```

vg 扩容的场景：vg 卷组中的空间不了够，需要添加新的硬盘进来  

```
[root@spring ~]# pvcreate /dev/sdb3 # 创建 pv
  Physical volume "/dev/sdb3" successfully created.

[root@spring ~]# vgextend vg01 /dev/sdb3 # 扩容成功
  Volume group "vg01" successfully extended  

[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg01   2   2   0 wz--n-    1.99g   <1.93g
  vg02   1   0   0 wz--n- 1008.00m 1008.00m  
```

**2.6 LVM 缩小**

> 问：LVM 可以动态增加，可以动态缩小吗？  
> 答：LVM 可以动态增加，也可以动态缩小，但是 XFS 不支持动态缩小，所以我们无法实现基于 xfs 的动态缩小。btrfs 文件系统支持在线缩小。

```
[root@spring ~]# lvreduce -L -20m /dev/vg01/lv01
  WARNING: Reducing active and open logical volume to 28.00 MiB.
  THIS MAY DESTROY YOUR DATA (filesystem etc.)
Do you really want to reduce vg01/lv01? [y/n]: y
  Size of logical volume vg01/lv01 changed from 48.00 MiB (12 extents) to 28.00 MiB (7 extents).
  Logical volume vg01/lv01 successfully resized. # 缩小成功
```

但是文件系统没有缩小成功：

```
[root@spring ~]# df -h /lv01/
Filesystem             Size  Used Avail Use% Mounted on
/dev/mapper/vg01-lv01   46M  522K   43M   2% /lv01 # 发现文件系统上空间没有变
```

```
[root@spring ~]# lvextend -L 10M -r /dev/vg01/lv01 # 这两个命令也是不能执行成功的
  Rounding size to boundary between physical extents: 12.00 MiB.
  New size given (3 extents) not larger than existing size (7 extents)
[root@spring ~]# resize2fs /dev/vg01/lv01 # 这两个命令也是不能执行成功的
resize2fs 1.42.9 (28-Dec-2013)
Filesystem at /dev/vg01/lv01 is mounted on /lv01; on-line resizing required
resize2fs: On-line shrinking not supported
```

<font color="#f00">VG 的缩减，要保证你的物理卷是否被使用，是因为它无法缩减一个正在使用的 PV</font>

```
[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg01   2   2   0 wz--n-    1.99g   <1.95g
  vg02   1   0   0 wz--n- 1008.00m 1008.00m
```

```
[root@spring ~]# pvs
  PV         VG   Fmt  Attr PSize    PFree
  /dev/sdb1  vg01 lvm2 a--  1020.00m  976.00m
  /dev/sdb2  vg02 lvm2 a--  1008.00m 1008.00m
  /dev/sdb3  vg01 lvm2 a--  1020.00m 1020.00m
  /dev/sdb4       lvm2 ---     1.00g    1.00g
``` 

```
[root@spring ~]# cp -r /boot/grub /lv01/ # 复制一些测试数据
[root@spring ~]# vgreduce vg01 /dev/sdb1 # 将 sdb1 移出失败，因 sdb1 正在被使用
  Physical volume "/dev/sdb1" still in use
```   

<font color="#f00">如果 sdb1 是一个磁盘阵列，而这个磁盘阵列使用年代太久，我们必须移出怎么办？</font>

```
[root@spring ~]# pvmove /dev/sdb1 /dev/sdb3 # 将 sdb1 上数据移到新增加 sdb3 pv 上
  /dev/sdb1: Moved: 18.18%
  /dev/sdb1: Moved: 36.36%
  /dev/sdb1: Moved: 63.64%
  /dev/sdb1: Moved: 100.00%
  
[root@spring ~]# vgreduce vg01 /dev/sdb1 # 移完数据再移出
  Removed "/dev/sdb1" from volume group "vg01" 
```

```
[root@spring ~]# pvs
  PV         VG   Fmt  Attr PSize    PFree
  /dev/sdb1       lvm2 ---     1.00g    1.00g
  /dev/sdb2  vg02 lvm2 a--  1008.00m 1008.00m
  /dev/sdb3  vg01 lvm2 a--  1020.00m  976.00m # vg01 中只有 sdb3 了
  /dev/sdb4       lvm2 ---     1.00g    1.00g
```

**2.7 LVM 删除**

创建 LVM 流程:   
pvcreate 创建 pv -> vgcreate 创建卷组 -> lvcreate 创建逻辑卷 -> mkfs.xfs lv 格式化-> mount 挂载

删除 LVM 流程：  
umount 卸载 -> lvremove lv 移出卷组中所有逻辑卷-> vgremove vg 移出卷组-> pvremove 移出 pv

```
[root@spring ~]# umount /lv01/
[root@spring ~]# lvremove /dev/vg01/lv01
Do you really want to remove active logical volume vg01/lv01? [y/n]: y
  Logical volume "lv01" successfully removed
[root@spring ~]# lvs
  LV   VG   Attr       LSize  Pool Origin Data%  Meta%  Move Log Cpy%Sync Convert
  lv02 vg01 -wi-a----- 16.00m # 已经看不到 lv01
```

```
[root@spring ~]# vgremove vg01 # 直接移出卷组
Do you really want to remove volume group "vg01" containing 1 logical volumes? [y/n]: y
Do you really want to remove active logical volume vg01/lv02? [y/n]: y # 如果卷组中还有 lv，移出时，会提示，是否也移出，咱们这里直接移出
  Logical volume "lv02" successfully removed
  Volume group "vg01" successfully removed
  
[root@spring ~]# vgs
  VG   #PV #LV #SN Attr   VSize    VFree
  vg02   1   0   0 wz--n- 1008.00m 1008.00m  # 没有 vg01
```    

移出 pv sdb1

```
[root@spring ~]# pvs
  PV         VG   Fmt  Attr PSize    PFree
  /dev/sdb1       lvm2 ---     1.00g    1.00g
  /dev/sdb2  vg02 lvm2 a--  1008.00m 1008.00m
  /dev/sdb3       lvm2 ---     1.00g    1.00g
  /dev/sdb4       lvm2 ---     1.00g    1.00g

[root@spring ~]# pvremove /dev/sdb1 # 已经移出
  Labels on physical volume "/dev/sdb1" successfully wiped.
  
[root@spring ~]# pvs
  PV         VG   Fmt  Attr PSize    PFree
  /dev/sdb2  vg02 lvm2 a--  1008.00m 1008.00m
  /dev/sdb3       lvm2 ---     1.00g    1.00g
  /dev/sdb4       lvm2 ---     1.00g    1.00g  
```

### <a href="#ssm" id="ssm">实战：使用SSM工具为公司的邮件服务器创建可动态扩容的存储池</a>

安装 SSM 

```
[root@spring ~]# yum -y install system-storage-manager
```

SSM：检查关于可用硬驱和LVM卷的信息。显示关于现有磁盘存储设备、存储池、LVM卷和存储快照的信息

**3.1 查看磁盘信息**

```
[root@spring ~]# ssm list dev
------------------------------------------------------------
Device           Free     Used      Total  Pool  Mount point
------------------------------------------------------------
/dev/sda                         20.00 GB
/dev/sda1                       500.00 MB        /boot
/dev/sda2                         2.00 GB        SWAP
/dev/sda3                        10.00 GB        /
/dev/sdb                          8.00 GB
/dev/sdb1                         1.00 GB
/dev/sdb2  1008.00 MB  0.00 KB    1.00 GB  vg02
/dev/sdb3                         1.00 GB
/dev/sdb4                         1.00 GB
/dev/sdc                          8.00 GB
/dev/sdd                          8.00 GB
/dev/sde                          8.00 GB
/dev/sdf                          8.00 GB
/dev/sdg                          8.00 GB
/dev/sdh                          8.00 GB
/dev/sdi                          8.00 GB
/dev/sdj                          8.00 GB
/dev/sdk                          8.00 GB
/dev/sdl                          8.00 GB
/dev/sdm                          8.00 GB
/dev/sdn                          8.00 GB
/dev/sdo                          8.00 GB
/dev/sdp                          8.00 GB
------------------------------------------------------------
```

存储池信息

```
[root@spring ~]# ssm list pool
----------------------------------------------------
Pool  Type  Devices        Free     Used       Total
----------------------------------------------------
vg02  lvm   1        1008.00 MB  0.00 KB  1008.00 MB
----------------------------------------------------
```

**3.2 实战：为公司的邮件服务器创建基于 LVM 的邮件存储**

实战场景：公司要搭建一台邮件服务器，考虑到后期公司发展规模扩张，需要你创建一个名为 mail 的 LVM存储池，并在其上创建一个名为 mail-lv，初始大小为 1G 的 lvm 卷，格式化为 xfs 文件系统，并将其挂载/mail-lv目录下。此存储池中的空间后期要可以动态扩容。

将 sdb 上所有卷组信息删除：

```
[root@spring ~]# vgremove vg02
  Volume group "vg02" successfully removed

[root@spring ~]# pvremove /dev/sdb{1,2,3,4}
  No PV found on device /dev/sdb1.
  Labels on physical volume "/dev/sdb2" successfully wiped.
  Labels on physical volume "/dev/sdb3" successfully wiped.
  Labels on physical volume "/dev/sdb4" successfully wiped.  
```

创建目录

```
[root@spring ~]# mkdir /mail-lv
```

用的命令如下：

ssm create -s lv 大小 -n lv 名称 --fstype lv 文件系统类型 -p 卷组名 设备 挂载点  
自动把设备变成 pv，创建 vg , lv ,格式化文件系统, 自动挂载

```
[root@spring ~]# ssm create -s 1G -n mail-lv --fstype xfs -p mail /dev/sdb[1-4] /mail-lv/
  Physical volume "/dev/sdb1" successfully created.
  Physical volume "/dev/sdb2" successfully created.
  Physical volume "/dev/sdb3" successfully created.
  Physical volume "/dev/sdb4" successfully created.
  Volume group "mail" successfully created
WARNING: ext4 signature detected on /dev/mail/mail-lv at offset 1080. Wipe it? [y/n]: y
  Wiping ext4 signature on /dev/mail/mail-lv.
  Logical volume "mail-lv" created.
meta-data=/dev/mail/mail-lv      isize=512    agcount=4, agsize=65536 blks
         =                       sectsz=512   attr=2, projid32bit=1
         =                       crc=1        finobt=0, sparse=0
data     =                       bsize=4096   blocks=262144, imaxpct=25
         =                       sunit=0      swidth=0 blks
naming   =version 2              bsize=4096   ascii-ci=0 ftype=1
log      =internal log           bsize=4096   blocks=2560, version=2
         =                       sectsz=512   sunit=0 blks, lazy-count=1
realtime =none                   extsz=4096   blocks=0, rtextents=0
```

```
[root@spring ~]# df -h /mail-lv/
Filesystem                 Size  Used Avail Use% Mounted on
/dev/mapper/mail-mail--lv 1014M   33M  982M   4% /mail-lv
```

