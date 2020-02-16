# 第二十二章：跳出循环-shift参数左移-函数的使用

---

## 目录

* [跳出循环](#outOfTheLoop)
* [Shift 参数左移指令](#shift)
* [函数的使用](#function)
* [实战-自动备份 mysql 数据库和 nginx 服务启动脚本](#actual)

## 内容

### <a href="#outOfTheLoop" id="outOfTheLoop">跳出循环</a>

我们在使用循环语句进行循环的过程中，有时候需要在未达到循环结束条件时强制跳出循环，那么Shell给我们提供了两个命令来实现该功能：`break`和`continue`

#### 1.1 `break` 和 `continue`

* `break`跳出整个循环：跳出当前整个循环或结束当前循环，在 for、while 等循环语句中，用于跳出当前所在的循环体，执行循环体之后的语句，后面如果什么也不加，表示跳出当前循环等价于 break 1，也可以在后面加数字,假设 break 3 表示跳出第三层循环
* `continue`跳过本次循环，进行下次循环：忽略本次循环剩余的代码，直接进行下一次循环；在 for、while 等循环语句中，用于跳出当前所在的循环体，执行循环体之后的语句，如果后面加的数字是 1，表示忽略本次条件循环，如果是 2 的话，忽略下来 2 次条件的循环

例 1：写一个 shell 菜单，当按数字键 4 时退出，否则一直循环显示

```
#!/bin/bash
while true
        echo "========================="
        echo "Please select your operation"
        echo "1 Copy"
        echo "2 Delete"
        echo "3 BackUp"
        echo "4 Quit"
        echo "========================="
	read op
	case $op in
        1)
                continue # 这里加了 continue 后，后面的 echo 命令就不执行了
                echo "You selection is Copy"
                ;;
        2)
                echo "You selection is Delete"
                ;;
        3)
                echo "You selection is BackUp"
                ;;
        4)
                echo "Exit..."
                break # 跳出循环体
                ;;
        *)
                echo "Invalide selection, please try again."
        esac
done
[root@spring ~]# sh break-continue.sh
=========================
Please select your operation
1 Copy
2 Delete
3 BackUp
4 Quit
=========================
1
=========================
Please select your operation
1 Copy
2 Delete
3 BackUp
4 Quit
=========================
2
You selection is Delete
=========================
Please select your operation
1 Copy
2 Delete
3 BackUp
4 Quit
=========================
3
You selection is BackUp
=========================
Please select your operation
1 Copy
2 Delete
3 BackUp
4 Quit
=========================
4
Exit...
```

例 2：使用交互式方法批量添加用户

```
[root@spring ~]# vim useradd.sh
#!/bin/bash
echo "============================"
read -p "Please input a username to create: " USERNAME
read -p "Please input the number of users to create: " NUMBER
read -p "Please input the password of the user to be created: " PASSWORD
for (( i=1; i<$NUMBER; i++))
do
        useradd $USERNAME$i &> "/dev/null"
        echo "$PASSWORD" | passwd --stdin $USERNAME$i &> "/dev/null"
done
echo "The user is created and the result is: "
tail -$NUMBER /etc/passwd

[root@spring ~]# sh !$
sh useradd.sh
============================
Please input a username to create: spring
Please input the number of users to create: 3
Please input the password of the user to be created: 123456
The user is created and the result is:
hye4:x:1020:1020::/home/hye4:/bin/bash
spring1:x:1021:1021::/home/spring1:/bin/bash
spring2:x:1022:1022::/home/spring2:/bin/bash
```

批量删除怎么做？删除所有普通用户怎么做？

1、查看所有用户名称

```
[root@spring ~]# cat /etc/passwd | grep -v nologin | grep -v halt | grep -v shutdown | awk -F":" '{ print $1 }'
```

```
# 获取所有普通用户名
[root@spring ~]# cat /etc/passwd | grep "/bin/bash" | grep -v root | cut -d ":" -f 1
```

2、永久性删除用户账号：

```
userdel testuser
groupdel testgroup
usermod –G testgroup testuser //（强制删除该用户的主目录和主目录下的所有文件和子目录）
```

3、删除用户密码:

```
sudo passwd --delete <username> , 或者
sudo passwd -d <username>
```

```
[root@spring ~]# vim delete-users.sh
#!/bin/bash
grep "/bin/bash" /etc/passwd|grep -v "root"|cut -d ":" -f 1 > user.txt
for user in $(cat ./user.txt)
do
        passwd --delete $user
        echo "delete $user passwd"
        userdel -r $user
        echo "delete user $user"
        groupdel ${user}group
        echo "delete usergroup ${user}group"
done
rm -rf user.txt

[root@spring ~]# sh delete-users.sh
Removing password for user spring1.
passwd: Success
delete spring1 passwd
delete user spring1
groupdel: group 'spring1group' does not exist
delete usergroup spring1group
Removing password for user spring2.
passwd: Success
delete spring2 passwd
delete user spring2
groupdel: group 'spring2group' does not exist
delete usergroup spring2group
Removing password for user spring3.
passwd: Success
delete spring3 passwd
delete user spring3
groupdel: group 'spring3group' does not exist
delete usergroup spring3group
Removing password for user spring4.
passwd: Success
delete spring4 passwd
delete user spring4
groupdel: group 'spring4group' does not exist
delete usergroup spring4group
```

```
[root@spring ~]# sh useradd.sh
============================
Please input a username to create: hye_
Please input the number of users to create: 10
Please input the password of the user to be created: 123456
The user is created and the result is:
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin
hye_1:x:1000:1000::/home/hye_1:/bin/bash
hye_2:x:1001:1001::/home/hye_2:/bin/bash
hye_3:x:1002:1002::/home/hye_3:/bin/bash
hye_4:x:1003:1003::/home/hye_4:/bin/bash
hye_5:x:1004:1004::/home/hye_5:/bin/bash
hye_6:x:1005:1005::/home/hye_6:/bin/bash
hye_7:x:1006:1006::/home/hye_7:/bin/bash
hye_8:x:1007:1007::/home/hye_8:/bin/bash
hye_9:x:1008:1008::/home/hye_9:/bin/bash
[root@spring ~]# cat /etc/sh
shadow   shadow-  shells
[root@spring ~]# cat /etc/sh
shadow   shadow-  shells
[root@spring ~]# cat /etc/shadow
root:$6$D63dhmhbnFGsuImD$mo98xGuLfzwoirF3CO8mF2dWG9TR1t1ZfPj4D9aMziBb67MNHNXCJVSJB0xqb769t/0U04zaCFmtGP5lR39.60::0:99999:7:::
bin:*:17834:0:99999:7:::
daemon:*:17834:0:99999:7:::
adm:*:17834:0:99999:7:::
lp:*:17834:0:99999:7:::
sync:*:17834:0:99999:7:::
shutdown:*:17834:0:99999:7:::
halt:*:17834:0:99999:7:::
mail:*:17834:0:99999:7:::
operator:*:17834:0:99999:7:::
games:*:17834:0:99999:7:::
ftp:*:17834:0:99999:7:::
nobody:*:17834:0:99999:7:::
systemd-network:!!:18292::::::
dbus:!!:18292::::::
polkitd:!!:18292::::::
sshd:!!:18292::::::
postfix:!!:18292::::::
nginx:!!:18292::::::
apache:!!:18304::::::
hye_1:$6$hqNZXL/J$now7CUBJDmd3ves0uTydkwGmI2afEr/tFqHu3AjAwFuCIyoSXLvak0zWDGz/weaNMd78esoMpaNQD0M8nUYjO1:18305:0:99999:7:::
hye_2:$6$F/2mcq48$JsL645VW.1GTnMmR6AfAsp0ctUKTQIKwnIPeZDCdmdIuShcfMpr1TuFUAob9I0VM1KKnmS9ZyFfFIhHB6Xy2o0:18305:0:99999:7:::
hye_3:$6$Mcp9au.k$Yem8l6DYRWjc/FEoStlBjivuJVKezKUTZL45KgLwtF9eQOzWUV1YSOitWyH60iZCB5rsazsuK6J1/qRgP1Cmo.:18305:0:99999:7:::
hye_4:$6$4LnV2PGu$13pxdIkLHun8YIYBUAiBp5jbO7Z29SHacWaoXQwbT5bc7V4GDCM6EigUu4W8dffKd7nzL7X19PdmiZSsTgxPz0:18305:0:99999:7:::
hye_5:$6$oWFEGEXo$lIh4MkUtJPceKZmsNt2q5gB3gQ7AcOG6OoIP5ByotZBA4RBMBU2DA2RlVlVd8f3eO0vf2xVTcxg/ZgMZzoG6p.:18305:0:99999:7:::
hye_6:$6$4cgiwE0M$LuWURwysUJYyreGw9KgHNjhnmfEIBcZXu1yquK6TxMfm2qM8GrrIy1yAxPsCVJGC0Z0o2dJai1UlE4PqjJIG8.:18305:0:99999:7:::
hye_7:$6$emX4YrE.$G9ZtY3n0FwyjyLTfyR9PGrjyfRiXXoVLgjS7572OJ61jkqKATfOkt.rS/m7qjkYSbBulAKjLMq2J2ir2lNm87/:18305:0:99999:7:::
hye_8:$6$w1rm9Pxn$js8lsLUdXc0reW6WvRu40Fsf3Jt44eOk8qc5P4ll0NhtZwDHPAEx5KcDr3p1IG9L4z9snYG6CvJcQWClU4wyv0:18305:0:99999:7:::
hye_9:$6$zAA7lA8V$og/vb9./cswR8QxPyNY6mt/CSu.cFSe/IWNLXsT9oIt1vvf/4FXL7e0QChtBL7CMu4yQQ4vXP2upb3d6oPbrf/:18305:0:99999:7:::
```

```
[root@spring ~]# sh delete-users.sh
Removing password for user hye_1.
passwd: Success
delete hye_1 passwd
delete user hye_1
groupdel: group 'hye_1group' does not exist
delete usergroup hye_1group
Removing password for user hye_2.
passwd: Success
delete hye_2 passwd
delete user hye_2
groupdel: group 'hye_2group' does not exist
delete usergroup hye_2group
Removing password for user hye_3.
passwd: Success
delete hye_3 passwd
delete user hye_3
groupdel: group 'hye_3group' does not exist
delete usergroup hye_3group
Removing password for user hye_4.
passwd: Success
delete hye_4 passwd
delete user hye_4
groupdel: group 'hye_4group' does not exist
delete usergroup hye_4group
Removing password for user hye_5.
passwd: Success
delete hye_5 passwd
delete user hye_5
groupdel: group 'hye_5group' does not exist
delete usergroup hye_5group
Removing password for user hye_6.
passwd: Success
delete hye_6 passwd
delete user hye_6
groupdel: group 'hye_6group' does not exist
delete usergroup hye_6group
Removing password for user hye_7.
passwd: Success
delete hye_7 passwd
delete user hye_7
groupdel: group 'hye_7group' does not exist
delete usergroup hye_7group
Removing password for user hye_8.
passwd: Success
delete hye_8 passwd
delete user hye_8
groupdel: group 'hye_8group' does not exist
delete usergroup hye_8group
Removing password for user hye_9.
passwd: Success
delete hye_9 passwd
delete user hye_9
groupdel: group 'hye_9group' does not exist
delete usergroup hye_9group

[root@spring ~]# cat /etc/passwd
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
nginx:x:998:996:nginx user:/var/cache/nginx:/sbin/nologin
apache:x:48:48:Apache:/usr/share/httpd:/sbin/nologin

[root@spring ~]# cat /etc/shadow
root:$6$D63dhmhbnFGsuImD$mo98xGuLfzwoirF3CO8mF2dWG9TR1t1ZfPj4D9aMziBb67MNHNXCJVSJB0xqb769t/0U04zaCFmtGP5lR39.60::0:99999:7:::
bin:*:17834:0:99999:7:::
daemon:*:17834:0:99999:7:::
adm:*:17834:0:99999:7:::
lp:*:17834:0:99999:7:::
sync:*:17834:0:99999:7:::
shutdown:*:17834:0:99999:7:::
halt:*:17834:0:99999:7:::
mail:*:17834:0:99999:7:::
operator:*:17834:0:99999:7:::
games:*:17834:0:99999:7:::
ftp:*:17834:0:99999:7:::
nobody:*:17834:0:99999:7:::
systemd-network:!!:18292::::::
dbus:!!:18292::::::
polkitd:!!:18292::::::
sshd:!!:18292::::::
postfix:!!:18292::::::
nginx:!!:18292::::::
apache:!!:18304::::::
```

### <a href="#shift" id="shift">Shift 参数左移指令</a>

shift 命令用于对参数的移动(左移)，<font color="#f00">通常用于在不知道传入参数个数的情况下依次遍历每个参数然后进行相应处理</font>（常见于 Linux 中各种程序的启动脚本）

在扫描处理脚本程序的参数时，经常要用到的 shift 命令，如果你的脚本需要 10 个或 10 个以上的参数，你就需要用 shift 命令来访问第 10 个及其后面的参数

作用：每执行一次，参数序列顺次左移一个位置，\$#的值减 1，用于分别处理每个参数，移出去的参数，不再可用

![shift示例](./img/shift.png)

例子：加法计算器

```
[root@spring ~]# vim shift-plus.sh
#!/bin/bash
if [ $# -le 0 ]; then
        echo “No parameters”
        exit
fi

SUM=0

while [ $# -gt 0 ]; do
        # sum=$(expr $sum + $1)
        SUM=$[ $SUM + $1 ]
        shift
        # shift 2 # 一次移动2哥参数
done

echo "Result is : " $SUM

[root@spring ~]# sh !$ 1 3 4 6
sh shift-plus.sh 1 3 4 6
Result is :  14
```

### <a href="#function" id="function">函数的使用</a>

函数是一个脚本代码块，你可以对它进行自定义命名，并且可以在脚本中任意位置使用这个函数，要使用这个函数，只要使用这个函数名称就可以了。使用函数的好处：模块化，代码可读性强。

#### 3.1 函数创建语法

```
# name是函数唯一的名称
function name {
	commands
}

# or

# name后面的括号表示你正在定义一个函数
name() {
	commands
}
```

调用函数语法：  
函数名 参数 1 参数 2 …  
调用函数时，可以传递参数。在函数中用$1、$2…来引用传递的参数  

#### 3.2 函数的使用

```
[root@spring ~]# vim fun-1.sh
#!/bin/bash
function fun_echo {
        echo "This is function: fun_echo"
}
fun_echo

[root@spring ~]# sh !$
sh fun-1.sh
This is function fun_echo
```

> 注意：函数名的使用，如果在一个脚本中定义了重复的函数名，那么以最后一个为准

```
[root@spring ~]# vim fun-2.sh
#!/bin/bash
function fun {
        echo "This function name is: fun"
}

function fun {
        echo "This is next function, and this name is: fun"
}

fun

[root@spring ~]# sh !$
sh fun-2.sh
This is next function, and this name is: fun
```

#### 3.3 返回值

使用 <font color="#f00">return 命令</font>来退出函数并返回特定的退出码

```
[root@spring ~]# vim fun-3.sh
#!/bin/bash
function fun_return {
        echo "This is function: fun_return"
        ls /etc/passwd
        return 3
}

fun_return

[root@spring ~]# sh !$
sh fun-3.sh
This is function: fun_return
/etc/passwd
[root@spring ~]# echo $?
3
```

> 注：状态码的确定必需要在函数一结束就运行 return 返回值；状态码的取值范围（0~255）

互动： exit 数字 和 return 数字的区别？  
答：exit 整个脚本就直接退出，往回数字 ； return 只是在函数最后添加一行，然后返回数字，只能让函数后面的命令不执行，无法强制退出整个脚本的。

#### 3.4 把函数值赋给变量使用

例子： 函数名就相当于一个命令

```
[root@spring ~]# vim fun-4.sh
#!/bin/bash
fun() {
        read -p "Input a value: " VA
        echo $[ $VA*5 ]
}

num=$(fun)

echo "Current num is $num"

[root@spring ~]# sh !$
sh fun-4.sh
Input a value: 12
Current num is 60
```

#### 3.5 函数的参数传递

第一种：通过脚本传递参数给函数中的位置参数$1

```
[root@spring ~]# vim fun-5.sh
#!/bin/bash
fun() {
        rm -rf $1
}

fun $1
[root@spring ~]# ls
anaconda-ks.cfg    delete-users.sh  fun-2.sh  fun-4.sh  sh-file        useradd.sh
break-continue.sh  fun-1.sh         fun-3.sh  fun-5.sh  shift-plus.sh
[root@spring ~]# touch a.txt
[root@spring ~]# ls
anaconda-ks.cfg  break-continue.sh  fun-1.sh  fun-3.sh  fun-5.sh  shift-plus.sh
a.txt            delete-users.sh    fun-2.sh  fun-4.sh  sh-file   useradd.sh
[root@spring ~]# sh fun-5.sh
[root@spring ~]# sh fun-5.sh a.txt
[root@spring ~]# ls
anaconda-ks.cfg    delete-users.sh  fun-2.sh  fun-4.sh  sh-file        useradd.sh
break-continue.sh  fun-1.sh         fun-3.sh  fun-5.sh  shift-plus.sh
```

第二种：调用函数时直接传递参数

```
[root@spring ~]# touch a.txt
[root@spring ~]# vim fun-6.sh
#!/bin/bash
fun() {
        rm -rf $1
}

fun /root/a.txt


[root@spring ~]# sh !$
sh fun-6.sh
[root@spring ~]# ls /root/a.txt
ls: cannot access /root/a.txt: No such file or directory
```

第三种：函数中多参数传递和使用方法

```
[root@spring ~]# vim fun-7.sh
#!/bin/bash
fun() {
        echo $[ $1*5 ]
        echo $[ $2*2 ]
}

fun 4 2

[root@spring ~]# sh !$
sh fun-7.sh
20
4
```

#### 3.6 函数中变量的处理

函数使用的变量类型有两种：局部变量、全局变量

1、全局变量，默认情况下，你在脚本中定义的变量都是全局变量，你在函数外面定义的变量在函数内也可以使用

```
[root@spring ~]# vim fun-8.sh
#!/bin/bash
function fun {
        num=$[ var*2 ]
}

read -p "Input a number: " var

fun

echo "The new value is: $num"

[root@spring ~]# sh !$
sh fun-8.sh
Input a number: 12
The new value is: 24
```

### <a href="#actual" id="actual">实战-自动备份 mysql 数据库和 nginx 服务启动脚本</a>

#### 4.1 自动备份 mysql 数据库脚本

从 centos7.0 开始，系统中自带的 mysql 数据库包，改为 mariadb 数据库。  
MariaDB 数据库概述：MariaDB 数据库管理系统是 MySQL 的一个分支，主要由开源社区在维护，采用 GPL授权许可 MariaDB 的目的是完全兼容 MySQL，包括 API 和命令行，使之能轻松成为 MySQL 的代替品。MariaDB由 MySQL 的创始人 Michael Widenius（迈克尔·维德纽斯）主导开发，他早前曾以 10 亿美元的价格，将自己创建的公司 MySQL AB 卖给了 SUN，此后，随着 SUN 被甲骨文收购，MySQL 的所有权也落入 Oracle 的手中。MariaDB 名称来自 Michael Widenius 的女儿 Maria（玛丽亚）的名字。

甲骨文公司收购了 MySQL 后，有将 MySQL 闭源的潜在风险，因此社区采用分支的方式来避开这个风险。 过去一年中，大型互联网用户以及 Linux 发行商纷纷抛弃 MySQL，转投 MariaDB 阵营。MariaDB 是目前最受关注的 MySQL 数据库衍生版，也被视为开源数据库 MySQL 的替代品。

```
[root@xuegod63 ~]# yum install -y mariadb mariadb-server -y # mariadb 是 mysql 的客户端命令 ；mariadb mariadb-server 是 mysql 服务端命令
[root@spring ~]# rpm -qf /usr/bin/mysql
mariadb-5.5.64-1.el7.x86_64
[root@spring ~]# systemctl start mariadb
[root@spring ~]# mysqladmin -u root password "Maomao@1213" # 给 root 用户配置一个密码
123456
[root@spring ~]# mysql -u root -pMaomao@1213 # 登录 mysql 数据库
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 3
Server version: 5.5.64-MariaDB MariaDB Server

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]>

MariaDB [(none)]> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| test               |
+--------------------+
4 rows in set (0.00 sec)

MariaDB [(none)]> create database spring; # 创建 spring 数据库
Query OK, 1 row affected (0.00 sec)
MariaDB [(none)]> use spring # 选择数据库
Database changed
MariaDB [spring]> create table user (id int); # 创建 user 表，只有一个 id 字段
Query OK, 0 rows affected (0.01 sec)

MariaDB [spring]> insert into user values(1); # 插入一条记录，id 字段值 1
Query OK, 1 row affected (0.01 sec)

MariaDB [spring]> insert into user values(2); # 插入一条记录，id 字段值 2
Query OK, 1 row affected (0.00 sec)

MariaDB [spring]> select * from user; # 查看表中的数据
+------+
| id   |
+------+
|    1 |
|    2 |
+------+
2 rows in set (0.00 sec)
```

mysql 自动化备份脚本：  

1. 检查一下运行环境： 目录是否存在，时间，权限，用户
2. 运行要执行的命令：备份，导出数据。。。
3. 把命令执行过程中的没有用的文件删除一下
4. 弹出命令运行成功的消息

```
[root@spring ~]# vim mysql-back-auto.sh
#!/bin/bash
#auto backup mysql
#Define PATH 定义变量
BAKDIR=/data/backup/mysql/`date +%Y-%m-%d`
MYSQLDB=learn
#MYSQLDB=webapp
MYSQLUSR=root
#MYSQLUSR=backup
MYSQLPW=Maomao@1213
#MYSQLPW=backup
# must use root user run scripts
if [ $UID -ne 0 ]; then
        echo "This scripts must use the root user!!!"
        sleep 2
        exit 0
fi
#Define DIR and mkdir DIR
if [ ! -d $BAKDIR ]; then
        mkdir -p $BAKDIR
else
        echo "This is $BAKDIR exists..."
fi
#Use mysqldump backup mysql
/usr/bin/mysqldump -u$MYSQLUSR -p$MYSQLPW $MYSQLDB > $BAKDIR/${MYSQLDB}_db.sql
cd $BAKDIR; tar -czf ${MYSQLDB}_db.tar.gz *.sql
#查找备份目录下以.sql结尾的文件并删除
find $BAKDIR -type f -name *.sql -exec rm -rf {} \;
#或
#如果数据库备份成功，则打印成功，并删除备份目录 30 天以前的目录
[ $? -eq 0 ] && echo "This `date +%Y-%m-%d` MySQL BACKUP is SUCCESS"
cd /data/backup/mysql/ && find . -type d -mtime +30 | xargs rm -rf
echo "The MySQL BACKUP SUCCESSFULLY"

[root@spring ~]# sh mysql-back-auto.sh
This is /data/backup/mysql/2020-02-13 exists...
This 2020-02-13 MySQL BACKUP is SUCCESS
The MySQL BACKUP SUCCESSFULLY
```

#### 4.2 nginx 服务启动脚本

此 nginx 脚本中使用了函数功能，让脚本具有更强的可读性

```
#!/bin/bash
#!/bin/bash
#chkconfig: 2345 80 90
#description:nginx run

# nginx 启动脚本
# @author spring
# @version 1.1
# @date 2020-02-13

PATH=/data/soft/nginx
DESC="nginx daemon"
NAME=nginx
DAEMON=$PATH/sbin/$NAME #/data/soft/nginx/sbin/nginx
CONFIGFILE=$PATH/$NAME.conf
PIDFILE=$PATH/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME
[ -x "$DAEMON" ] || exit 0
do_start()
{
        $DAEMON -c $CONFIGFILE || echo -n "nginx already running"
}
do_stop()
{
        $DAEMON -s stop || echo -n "nginx not running"
}
do_reload()
{
        $DAEMON -s reload || echo -n "nginx can't reload"
}
case "$1" in
        start)
                echo -n "Starting $DESC: $NAME"
                do_start
                echo "."
        ;;
        stop)
                echo -n "Stopping $DESC: $NAME"
                do_stop
                echo "."
        ;;
        reload|graceful)
                echo -n "Reloading $DESC configuration..."
                do_reload
                echo "."
        ;;
        restart)
                echo -m "Restarting $DESC: $NAME"
                do_stop
                do_start
                echo "."
        ;;
        *)
                echo "Usage: $SCRIPTNAME {start|stop|reload|restart}" >&2
                exit 3
        ;;
esca
exit 0
```