# Linux 挂载U盘

---

```
# 查看磁盘
[root@localhost ~]# fdisk -l
```

```
# 创建目录
[root@localhost ~]# mkdir /mnt/usb
```

```
# 挂载U盘
[root@localhost ~]# mount /dev/sdb /mnt/usb
```

```
# 卸载U盘可以：
[root@localhost ~]# umount /mnt/usb
# 或者
[root@localhost ~]# umount /dev/sdb
```

```
# 挂载本人格式为fat32的U盘：
[root@localhost ~]# mount -t vfat /dev/sdb /mnt/usb
# 万一U盘文件中文乱码可以使用如下方式挂载：
[root@localhost ~]# mount -t vfat -o iocharset=cp936 /dev/sdb /mnt/usb
```