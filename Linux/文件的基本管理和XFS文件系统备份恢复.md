# 文件的基本管理和XFS文件系统备份恢复

---

## Linux系统目录结构和想对/绝对路径

## 文件管理

文件管理方式有多种:
改变目录: cd
创建/修改/移动/删除: touch mkdir mv vi rm cp

创建文件和文件夹 

命令之:touch

作用:常用来创建空文件,如果文件存在，则修改这个文件的时间 

补充: 文件的三种时间

### 文件的三个时间

```
[root@localhost ~]# stat /etc/passwd
  File: ‘/etc/passwd’
  Size: 2362      	Blocks: 8          IO Block: 4096   regular file
Device: 802h/2050d	Inode: 9232027     Links: 1
Access: (0644/-rw-r--r--)  Uid: (    0/    root)   Gid: (    0/    root)
Context: system_u:object_r:passwd_file_t:s0
Access: 2019-12-15 13:19:01.911000000 +0800
Modify: 2019-12-10 22:54:14.466165391 +0800
Change: 2019-12-10 22:54:14.468165394 +0800
```
注:

* 访问时间:atime 查看内容 cat a.txt
* 修改时间:mtime 修改内容 vim a.txt
* 改变时间:ctime 文件属性，比如权限 change time。 chmod +x a.sh