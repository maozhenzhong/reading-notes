# Linux的基本原则

----

### Linux的基本原则

* 由目的单一的小程序组成，组合小程序完成复杂任务
* 一切皆文件
* 尽量避免捕获用户接口
* 配置文件保存为纯文本格式

GUI接口

CLI接口
	命令提示符，prompt、bash{shell}
	#: root
	$: 普通用户
	命令：
	
	命令格式：
	命令、选项、参数
	选项：
		短选项：-
			多个选项可以组合：-a -b = -ab
		长选项：--
			参数：命令的作用对象
			
使用凭证：
su: switch user //切换用户名

	# su [-l] student
	# passwd
	密码复杂性规则
10^6
36^6
62^6
100^6

1. 使用四种类别字符中至少三种
2. 足够长，大于7位
3. 使用随机字符串
4. 定期更换
5. 循环周期足够大

路径：从指定起始点到目的地所经过位置

文件系统：file system


ls
	-l:长格式
		文件类型：
			-: 普通文件
			d: 目录文件
			b: 块设备文件（block）
			c: 字条设备文件（character）
			l: 富豪链接文件（symbolic link file）
			p: 命令管道文件（pipe）
			s: 套接字文件（socket）
文件权限：9位，每三位一组，每一组：rwx（读，写，执行），r--
文件硬链接的次数
文件的属主（owner）
文件的属主（group）
文件的大小（size），单位是字节
时间戳（timestamp）：最近一次被修改的时间
	访问：access
	修改：modify，文件内容发生了改变
	改变：change，metadata，元数据
-h：做单位转换
-a：显示以.开头的隐藏文件
	.表示当前目录
	..表示父目录
-A
-d：显示目录自身属性
-i：index node, inode
-r：逆序显示
-R：递归（recursive）显示

cd: change directory
家目录，主目录，home directory

解压
需要用xz -d xxx.tar.xz 将 xxx.tar.xz解压成 xxx.tar 然后，再用 tar xvf xxx.tar来解包

rm -rf dir/file