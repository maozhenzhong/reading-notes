# 第十九章：SHELL脚本基础

---

## 目录

* [SHELL 基本语法](#basicShellSyntax)
* [SHELL 变量及运用](#shellVariablesAndOperations)
* [数学运算](#computation)
* [实战：升级系统中的 java 版本到 1.8 版本-为后期安装 Hadoop 集群做准备](#actualCCombat)

## 内容

### <a href="#basicShellSyntax" id="basicShellSyntax">SHELL 基本语法</a>

#### 1.1 什么是 shell?

Shell 是一个命令解释器，它在操作系统的最外层，负责直接与用户进行对话，把用户的输入解释给操作系统，并处理各种各样的操作系统的输出结果，输出到屏幕反馈给用户。这种对话方式可是交互也可以是非交互式的

![shell](./img/shell-kernel.png)

我们所输入的命令计算机是不识别的，这时就需要一种程序来帮助我们进行翻译，变成计算机能识别的二进制程序，同时又把计算机生成的结果返回给我们。

 shell是一个解释型的程序设计语言，shell 程序设计语言支持在高级语言里所能见到的绝大多数程序控制结构，比如循环，函数，变量和数组。
 
 在Linux 和 UNIX系统里最常用的几种是 `Bourne shell (sh)`, `C shell (csh)`, 和 `Korn shell (ksh)`。

1. Bourne Shell（/usr/bin/sh或/bin/sh）的作者是 Steven Bourne。它是 UNIX 最初使用的shell 并且在每种 UNIX 上都可以使用。Bourne shell 在 shell 编程方面相当优秀，但在处理与用户的交互方面作得不如其他几种 shell。
2.  Bourne Again Shell（/bin/bash）
3. C Shell（/usr/bin/csh） 由 Bill Joy 所写，它更多的考虑了用户界面的友好性。它支持象命令补齐（command-line completion）等一些 Bourne shell 所不支持的特性。普遍认为C shell 的编程接口做的不如 Bourne shell, 但 C shell 被很多 C  程序员使用因为 C shell的语法和 C语言的很相似，这也是C shell名称的由来。
4. Korn shell（/usr/bin/ksh） 由 Dave Korn 所写。它集合了C shell 和 Bourne shell 的优点并且和 Bourne shell 完全兼容。
5. Shell for Root（/sbin/sh）

#### 1.2 编程语言分类

编程语言主要用：低级语言和高级语言

1. 低级语言：
	* 机器语言：二进制语言
	* 汇编语言：符号语言，使用助记符来代替操作码，也就是用符号代替机器语言的二进制码它们都是面向机器的语言
2. 它是比较接近自然语言或者说人类语言的一种编程，用人们能够容易理解的方式进行编写程序，
	* 静态语言：编译型语言需通过编译器（compiler）将源代码编译成机器码，之后才能执行的语言。一般需经过编译（compile）、链接（linker）这两个步骤。编译是把源代码编译成机器码，链接是把各个模块的机器码和依赖库串连起来生成可执行文件 如：C、C++、Pascal、Object-C、swift
	* 动态语言：解释型语言，在运行程序的时候才逐行翻译 如： JavaScript、Python、Erlang、PHP、Perl、Ruby
	* gcc 编译器：（解释器） 将人类理解的语言翻译成机器理解的语言

![](./img/programming-language-classification.png)

#### 1.3 什么是 SHELL 脚本？

shell脚本（shell script），是一种为shell编写的脚本程序。shell script是一种解释型语言，必须由解释器来执行这些脚本，执行时，解释器将脚本一行一行地转换为代码。

```
[root@spring ~]# vim hello.sh

#!/bin/bash

echo "Hello World!!!"

[root@spring ~]# chmod +x hello.sh
[root@spring ~]# ./hello.sh
Hello World!!!
[root@spring ~]# hello.sh
-bash: hello.sh: command not found
[root@spring ~]# /root/hello.sh
Hello World!!!
```

注释：

1. “#!”是一个约定的标记，它告诉系统这个脚本需要哪一种解释器来执行。如不指 shell，以当前 shell 作为执行的 shell。
2. 在 shell 中以#表示开头，整个行就被当作一个注释。执行时被忽略。
3. shell 程序一般以.sh 结尾

创建 shell 程序的步骤：

* 第一步：创建一个包含命令和控制结构的文件。
* 第二步：修改这个文件的权限使它可以执行。使用 chmod +x test.sh
* 第三步：检测语法错误
* 第四步：执行 ./example.sh

shell 脚本的执行通常有以下几种方式:

1. `/root/test.sh` 或者 `./test.sh` (当前路径下执行脚本的话要有执行权限 chmod +x test.sh)
2. `bash test.sh` 或 `sh test.sh` （这种方式可以不对脚本文件添加执行权限）
3. `source test.sh` (可以没有执行权限)
4. `sh < test.sh` 或者 `cat test.sh` | sh(bash)

```
[root@spring ~]# /root/hello.sh
Hello World!!!
[root@spring ~]# bash hello.sh
Hello World!!!
[root@spring ~]# sh hello.sh
Hello World!!!
[root@spring ~]# source hello.sh
Hello World!!!
[root@spring ~]# sh < hello.sh
Hello World!!!
[root@spring ~]# cat hello.sh | sh
Hello World!!!
[root@spring ~]# cat hello.sh | bash
Hello World!!!
```

### <a href="#shellVariablesAndOperations" id="shellVariablesAndOperations">SHELL 变量及运用</a>

#### 2.1 shell 变量

**变量名的命名须遵循如下规则：**

* 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
* 中间不能有空格，可以使用下划线（_）。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）。

**使用变量**

使用一个定义过的变量，只要在变量名前面加美元符号即可。

```
[root@spring ~]# HOST_NAME="Spring"
[root@spring ~]# echo $HOST_NAME
Spring
```

变量名外面的花括号是可选的，加不加都行，加花括号是为了帮助解释器识别变量的边界

```
[root@spring ~]# echo ${HOST_NAME}
Spring
```

**只读变量**

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。

```
[root@spring ~]#
[root@spring ~]# BASE_URL="http:www.notfoget.com"
[root@spring ~]# readonly BASE_URL
[root@spring ~]# echo $BASE_URL
http:www.notfoget.com
[root@spring ~]# BASE_URL="http//:www.notfoget.com"
-bash: BASE_URL: readonly variable
```

**删除变量**

使用 `unset` 命令可以删除变量

```
[root@spring ~]# unset BASE_URL
-bash: unset: BASE_URL: cannot unset: readonly variable
[root@spring ~]# BASE_URLS="https://www.notfoget.com"
[root@spring ~]# echo $BASE_URLS
https://www.notfoget.com
[root@spring ~]# unset BASE_URLS
[root@spring ~]# echo $BASE_URLS # 该实例执行没有任何输出

```

**变量类型**

1. **局部变量** 局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
2. **环境变量** 所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
3. **shell变量** shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

**命令的替换,使用\$()或反引号**

```
[root@spring ~]# echo `date`
Tue Feb 11 16:53:54 CST 2020

[root@spring ~]# echo $(date)
Tue Feb 11 16:54:21 CST 2020
```

**命令的嵌套使用，使用\$( \$( ))**

```
[root@spring ~]#  VAR=$(tar zcvf root.tar.gz $(find /root/ -name "*.txt"))
tar: Removing leading `/' from member names
[root@spring ~]# echo $VAR
/root/test2.txt /root/test3.txt /root/test4.txt /root/test5.txt /root/test6.txt /root/test7.txt /root/test8.txt /root/test9.txt /root/test10.txt /root/test1.txt
```

#### 2.5 shell 中单引号和双引号区别

**单引号字符串的限制：**

* 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
* 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

**双引号的优点：**

* 双引号里可以有变量
* 双引号里可以出现转义字符

**获取字符串长度**

```
[root@spring ~]# STR="xuegod is great training institution"
[root@spring ~]# echo ${#STR}
36
```

**提取子字符串**

```
[root@spring ~]# STR="xuegod is great training institution"
[root@spring ~]# echo ${STR:1:12}
uegod is gre
```

**注意：**第一个字符的索引值为 0。

**查找子字符串**

```
[root@spring ~]# STR="xuegod is great training institution"
[root@spring ~]# echo `expr index "$STR" training`
4
```

**Shell 数组**

```
[root@spring ~]# ARRAY_USERS=(zhangyonge chenziyan linwei wangxinling)
[root@spring ~]# echo $ARRAY_USERS
zhangyonge
[root@spring ~]# echo ${ARRAY_USERS[0]}
zhangyonge
[root@spring ~]# echo ${ARRAY_USERS[1]}
chenziyan
[root@spring ~]# echo ${ARRAY_USERS[2]}
linwei
[root@spring ~]# echo ${ARRAY_USERS[3]}
wangxinling

[root@spring ~]# echo ${#ARRAY_USERS[@]} # 取得数组元素的个数
4
[root@spring ~]# echo ${#ARRAY_USERS[*]} # 取得数组元素的个数
4
[root@spring ~]# echo ${#ARRAY_USERS[0]} # 取得数组单个元素的长度
10
[root@spring ~]# echo ${#ARRAY_USERS[1]} # 取得数组单个元素的长度
9
[root@spring ~]# echo ${#ARRAY_USERS[2]} # 取得数组单个元素的长度
6
[root@spring ~]# echo ${#ARRAY_USERS[3]} # 取得数组单个元素的长度
11
```

使用 export 把这个局部变量输出为全局变量

```
[root@spring ~]# export HOST_NAME="spring.CentOS7"
[root@spring ~]# echo $HOST_NAME
spring.CentOS7
[root@spring ~]# vim a.sh

#!/bin/bash
echo $HOST_NAME

[root@spring ~]# chmod +x a.sh
[root@spring ~]# ./a.sh
spring.CentOS7
```

**让变量永久生效，可以把定义好的变量写入配置文件**

```
# 当登录系统或新开启一个 ssh 连接启动 bash 进程时，一定会加载这 4 个配置文件：
[root@spring ~]# vim /etc/profile            # 系统全局环境和登录系统的一些配置
[root@spring ~]# vim /etc/bashrc           # shell 全局自义配置文件，用于自定义 shell
[root@spring ~]# vim /root/.bashrc         # 用于单独自定义某个用户的 bash
[root@spring ~]# vim /root/.bash_profile # 用户单独自定义某个用户的系统环境
```

**加载这 4 个配置文件先后顺序**

```
[root@spring ~]# echo 'echo /etc/profile' >> /etc/profile
[root@spring ~]# echo 'echo /etc/bashrc' >> /etc/bashrc
[root@spring ~]# echo 'echo /root/.bashrc' >> /root/.bashrc
[root@spring ~]# echo 'echo /root/.bash_profile' >> /root/.bash_profile

maozhenongdeMBP:~ root# ssh root@192.168.2.220
root@192.168.2.220's password:
Last login: Tue Feb 11 17:46:49 2020
/etc/profile
/etc/bashrc
/root/.bashrc
/root/.bash_profile
```

<font color="#f00">互动：知道加载的顺序有什么用？</font>  
答：可以在这里添加木马程序，只要管理登录系统，就触发木马程序！ 现在大家知道学习操作系统原理的作用了吧。

```
[root@spring ~]# vim /etc/profile

export STR_USERNAME=MaoZhenzhong
[root@spring ~]# source /etc/profile # 重新加载 profile 文件
```

#### 2.7 设置 PATH 环境变量

SHELL 要执行某一个程序，它要在系统中去搜索这个程序的路径，path 变量是用来定义命令和查找命令的目录，当我们安装了第三方程序后，可以把第三方程序 bin 目录添加到这个 path 路径内，就可以在全局调用这个第三方程序的

```
[root@spring ~]# vim /opt/backup

#!/bin/bash
echo "Backup data is OK!"

[root@spring ~]# chmod +x /opt/backup
[root@spring ~]# /opt/backup
Backup data is OK!
[root@spring ~]# backup
-bash: backup: command not found

# 将 backup 命令添加 PATH 中

[root@spring ~]# PATH=/opt/:$PATH
[root@spring ~]# backup
Backup data is OK!

[root@spring ~]# vim /etc/profile # 在文件最后追加以下内容，永久生效

export PATH=/opt/:$PATH

[root@spring ~]# source /etc/profile # 重新加载配置文件，使用配置生效
/etc/profile
[root@spring ~]# backup
Backup data is OK!
```

#### 2.8 shell 位置变量

Shell 解释执行用户的命令时，将命令行的第一个字符作为命令名，而其它字符作为参数。

* \$0 获取当前执行 shell 脚本的文件文件名，包括脚本路径,命令本身
* \$n 获取当前脚本的第 n 个参数 n=1,2.....n 当 n 大于 9 时 用${10}表示。

```
[root@spring ~]# vim print.sh

#!/bin/bash
echo "本 shell 脚本的文件名： $0"
echo "第 1 个参数： $1"
echo "第 2 个参数： $2"
echo "第 3 个参数： $3"
echo "第 4 个参数： $4"

[root@spring ~]# chmod +x print.sh
[root@spring ~]# ./print.sh
本shell脚本的文件名：./print.sh
第一个参数：
第二个参数：
第三个参数：
第四个参数：

[root@spring ~]# ./print.sh 111 222 a.txt 444
本shell脚本的文件名：./print.sh
第一个参数：111
第二个参数：222
第三个参数：a.txt
第四个参数：444
```

```
# 使用场景：服务器启动传参数
[root@spring ~]# /etc/init.d/network restart
Restarting network (via systemctl):                        [  OK  ]
```

#### 2.9 特殊变量

有些变量是一开始执行 Script 脚本时就会设定，且不能被修改，但我们不叫它只读的系统变量，而叫它特殊变量。这些变量当一执行程序时就有了

| 变量 | 说明 |
|:----:|:----|
| \$* | 以一个单字符串显示所有向脚本传递的参数；<br>如"\$*"用【"】括起来的情况、以"\$1 \$2 … \$n"的形式输出所有参数 |
| \$# | 传递到脚本的参数个数 |
| \$\$ | 当前进程的进程号 PID |
| \$? | 显示最后命令的退出状态；0 表示没有错误，其他任何值表明有错误 |
| \$! | 后台运行的最后一个进程的进程号 pid |

```
[root@spring ~]# vim special_variable.sh

#!/bin/bash
echo "$* 表示这个程序的所有参数"
echo "$# 表示这个程序的参数个数"
echo "$$ 表示程序的进程ID"

touch /tmp/b.txt &

echo "$! 执行上一个后台指令的PID"
echo "$$ 表示程序的进程ID"
echo "$? 表示上一个程序执行返回结果"
~

[root@spring ~]# bash special_variable.sh 11 22 33 44 55
11 22 33 44 55 表示这个程序的所有参数
5 表示这个程序的参数个数
1456 表示程序的进程ID
1457 执行上一个后台指令的PID
1456 表示程序的进程ID
0 表示上一个程序执行返回结果
```

```
[root@spring opt]# vim env.sh

#!/bin/bash
#!/bin/bash
echo $HOME
echo $PATH
echo $PWD

[root@spring opt]# bash env.sh
/root
/opt/:/opt/:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin
/opt
```

### <a href="#computation" id="computation">数学运算</a>

**3.1 expr 命令**

对数字的基本计算，做比较时，输出结果假为 0，1 为真；特殊符号用转义符

```
[root@spring opt]# expr 2 \> 5
0
[root@spring opt]# expr 5 \>3
expr: syntax error
[root@spring opt]# expr 5 \> 3
1
[root@spring opt]# expr 5 * 3
expr: syntax error
[root@spring opt]# expr 5*3
5*3
[root@spring opt]# expr 5 \* 3
15
[root@spring opt]# expr 4 \+ 5
9

[root@spring opt]# expr length 'Hello Wrold!!!'
14
[root@spring opt]# expr substr "ni hao" 2 4
i ha
```

#### 3.2 使用\$(( ))

格式：\$((表达式 1，表达 2))

特点：

1. 在双括号结构中，所有表达式可以像 c 语言一样，如：a++,b--等。a++ 等价于 a=a+1 
1. 在双括号结构中，所有变量可以不加入：“\$”符号前缀。
1. 双括号可以进行逻辑运算，四则运算
1. 双括号结构 扩展了 for，while,if 条件测试运算
1. 支持多个表达式运算，各个表达式之间用“，”分开

常用的算数运算符

| 运算符 | 描述 |
|:-----:|:----|
| ++ -- | 递增及递减，可前置也可以后置 |
| + - ! ~ | 一元运算的正负号 逻辑与取反 |
| + - * / % | 加减乘除与余数 |
| < <= > >= | 比较大小符号 |
| == != | 相等 不相等 |
| >> << | 向左位移 向右位移 |
| & ^ \| | 位的与 位的异或 位的或 |
| && \|\| | 逻辑与 逻辑或 |
| ？ : | 条件判断 |

```
[root@spring opt]# a=$((1 + 2))
[root@spring opt]# echo a
a
[root@spring opt]# echo $a
3
[root@spring opt]# echo $(( 2 * 3 ))
6
[root@spring opt]# echo $((b++))
0
[root@spring opt]# echo $((++b))
2
[root@spring opt]# echo $((100 * (1 + 100) / 2 ))
5050
```

### <a href="#actualCCombat" id="actualCCombat">实战：升级系统中的 java 版本到 1.8 版本-为后期安装 Hadoop 集群做准备</a>

Linux参考计算机BIOS时间做参考，以BIOS系统+8小时

```
# Linux pstree shows running processes as a tree. The tree is rooted at either pid or init if pid is omitted. If a user name is specified, all process trees rooted at processes owned by that user are shown.

# Install pstree

#On Mac OS
[~]$ brew install pstree

#On Fedora/Red Hat/CentOS
[root@spring ~]# yum install psmisc # using psmisc package for pstree
 
#On Ubuntu/Debian APT
[root@spring ~]# apt-get install psmisc
After above opeation, we can use

# man pstree | less

to check whether the installation is successful.
```

