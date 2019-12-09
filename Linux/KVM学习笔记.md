# KVM学习笔记

---

## 简介

Kernel-based Virtual Machine的简称，是一个开源的系统虚拟化模块，自Linux 2.6.20之后集成在Linux的各个主要发行版本中。它使用Linux自身的调度器进行管理，所以相对于Xen，其核心源码很少。KVM目前已成为学术界的主流VMM之一。


之前提到我搭建了一台NAS，用的是J4105，虽然这玩意比J3455性能高了那么一丢丢，但如果用来视频转码的话，HEVC 1080P 60fps的视频已经会卡的一顿一顿的了，而且我还想在上面跑点游戏服务器什么的，所以升级配置就成了我的下一步计划（你说直接上服务器？准备起飞嘛？

我准备在升级配置后使用虚拟化平台，一是方便管理，二是方便迁移，虽然我现在还没钱买硬件，但可以在虚拟机中预演嘛！

## 目录

## 操作

```
# 安装
yum install -y qemu-kvm qemu-kvm-tools qemu-img libvirt libvirt-python virt-install python-virtinst bridge-utils
```

> * qemu-kvm  主要的KVM程序包
> * qemu-kvm-tools  KVM调试工具
> * qemu-img  qemu组件，创建磁盘、启动虚拟机等
> * libvirt  C语言工具包，提供libvirt服务，虚拟机管理工具
> * virt-install  基于libvirt服务的虚拟机创建命令
> * python-virtinst  创建虚拟机所需要的命令行工具和程序库
> * bridge-utils  创建和管理桥接设备的工具