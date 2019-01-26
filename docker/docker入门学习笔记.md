# docker入门学习笔记

----

### 简介

docker入门学习、学习docker简介、存在的条件……

### 一、环境配置难题

软件开发中的困难，环境配置。
操作系统、硬件、开发环境、以及相关依赖导致其环境各异。这就使得项目的迁移困难重重。

### 二、虚拟机

虚拟机（virtual machine）带环境安装的一种解决方案。它可以在一种操作系统中运行另一种操作系统，比如在Windows系统里运行Linux系统。

存在的缺点：

* **资源占用少**

	虚拟机会独占一部分内存和硬盘空间。它运行的时候，其他程序就不能使用这些资源了。哪怕虚拟机里面的应用程序，真正使用的内存只有1MB，虚拟机依然需要几百MB的内存才可以运行。
	
* **冗余步骤多**

	虚拟机是完整的操作系统，一些系统级别的操作步骤，往往无法跳过，比如用户登录。
	
* **启动慢**

	启动操作系统需要很久，启动虚拟机就需要多久。
	
### 三、Linux容器

由于虚拟机存在这些缺点，Linux发展出了一另一种虚拟化技术：Linux容器（Linux Containers，缩写为LXC）。
	
**Linux容器不是模拟一个完整的操作系统，而是对进程进行隔离**。或者说，在正常进程的外面套了一个保护层。对于容器面的进程来说，它接触到的各种资源都是虚拟的，从而实现了底层系统的隔离。

由于容器是进程级别的，相比虚拟机有很多优势。

* 1）启动快

	容器里面的应用，直接就是底层系统的一个进程，而不是虚拟机内部的进程。所以，启动容器相当于启动本机的一个进程，而不是启动一个操作系统，速度就非常快。
	
* 2）资源占用少

	容器只占用需要的资源，不占用哪些没有用到的资源；虚拟机由于是完整的操作系统，不可避免要占用所有资源。另外，多个容器可以共享资源，虚拟机就独享资源。
	
* 3）体积小

	容器只要包含用到的组件即可，而虚拟机是整个操作系统的打包，所以容器文件比虚拟机文件要小得多。
	
### 四、Docker是什么？

**Docker属于Linux容器的一种封装，提供简单的易用的容器使用接口。**它是目前最流行的Linux容器解决方案。

Docker将应用程序与该程序的依赖，打包在一个文件里面。运行这个文件，就会生成一个虚拟器。程序在这个虚拟容器里运行，就好像在真实的物理机上运行一样。有了Docker就不用担心环境问题。

总体来说，Docker的接口相当简单，用户可以方便地创建和使用容器，把自己的应用放在容器中。容器还可以进行版本管理、复制、分享、修改、就像管理普通代码一样。

### 五、Docker的用途

Docker 的主要用途，目前三大类

* 1）**提供一次性的环境**。比如，本地测试他人的软件、持续集成的时候提供单元测试和构建环境。
* 2）**提供弹性的云服务**。因为Docker容器可以随开随关，很适合动态扩容和缩容。
* 3）**组件微服务架构**。通过多个容器，一台机器可以跑多个服务，因此在本机就可以模拟出微服务架构。

### 六、Docker的安装

安装文档请参考Docker官网的文档。

* [Mac Docker安装文档](https://docs.docker.com/docker-for-mac/install/)
* [Windows Docker安装文档](https://docs.docker.com/docker-for-windows/install/)
* [Centos Docker安装文档](https://docs.docker.com/install/linux/docker-ce/centos/)


安装完成以后，运行下面的命令，验证是否安装成功。

	$ docker version
	# or
	$ docker info
	

Docker需要用户具有sudo权限，为了避免每次命令都输入sudo，可以把用户加入Docker用户组[官方文档](https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user)	

	$ sudo usermod -aG docker $USER
	
Docker 是服务器--客户端架构。命令行运行docker命令的时候，需要本机有Docker服务。如果这项服务没有启动，可以用下面的命令启动[官方文档](https://docs.docker.com/config/daemon/systemd/)

	# service 命令的用法
	$ sudo service docker start
	# systemctl 命令的用法
	$ sudo systemctl start docker
	
### 七、image文件

Docker 把应用程序及其依赖，打包在image文件里面。只有通过这个文件，才能生成Docker容器。image文件可以看作是容器的模版。Docker根据image文件生成容器的实例。同一个image文件，可以生成多个同时运行的容器实例。

image是二进制文件。实际开发中，一个image文件往往通过继承另一个image文件，加上一些个性化的设置而成的。举例来说，你可以在Ubuntu的image的基础上，往里面加入Apache服务器，形成你的image。

	#列出本机的所有image文件
	$ docker image ls
	
	# 删除 image 文件
	$ docker image rm(imageName) 
	
image 文件是通用的，一台机器的image文件拷贝到另一台机器，照样可以使用。一般来说，为了节省时间，我们应该尽量使用别人制作好的image文件，而不是自己制作的。即使要定制，也应该基于别人的image文件进行加工，而不是从零开始。

为了方便共享，image文件制作完成，可以上传到网上的仓库。Docker的官方仓库[Docker Hub](https://hub.docker.com/)

### 八、实例：hello word

运行下面的命令、将image文件从仓库抓去到本地

	$ docker image pull library/hello-word
	
上面代码`docker image pull`是抓取image文件的命令。`library/hello-word`是image文件在仓库里面的位置，其中library是image文件所在的组，hello-word是image文件的名字。

由于Docker官方提供的image文件，都放在library组里面，所以它是默认组，可以省略。因此，上面的命令可以写成下面这样。

	$ docker image pull hello-word
	
抓取成功以后，就可以在本机看到这个image文件了。

	$ docker image ls
	
现在，运行这个image文件

	$ docker container run hello-world
	
`docker container run`命令会从image文件，生成一个正在运行的容器实例。

***注意：***`docker container run`命令具有自动抓取image文件的功能。如果发现本地没有指定的image文件，就会从仓库自动抓取。因此，前面的`docker image pull`命令并不是必须的步骤。

运行成功，就会输出这些信息：

```
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/engine/userguide/
 
 ```
 
 输出这段提示以后，hello world就会停止运行，容器自动终止。
 
 
有些容器不会自动终止，因为提供的是服务。比如，安装运行Ubuntu的image，就可以在命令行体验Ubuntu系统。

	$ docker container run -it ubuntu bash
	
对于那些不会自动终止的容器，必须使用`docker container kill`命令手动终止。

	¥ docker container kill [containID]

### 九、容器文件

**image文件生成的容器实例，本身也是一个文件，称为容器文件。**也就是说，一旦容器生成，就会同时存在两个文件：image文件和容器文件。而且关闭容器并不会删除容器文件，只是容器停止运行而已。

	# 列出本机正在运行的容器
	$ docker container ls
	
	# 列出本机所有容器，包括终止运行的容器
	$ docker contaienr ls --all
	
上面命令的输出结结果之中，包括容器的ID。很多地方都需要提供这个ID，比如上一节终止容器运行的`docker container kill`命令。

终止运行的容器文件，依然会占据硬盘空间，可以使用`docker contaiener rm` 命令删除。

	$ docker container rm [containerID]
	
运行上面的命令之后，再使用`docker container ls --all`命令，就会发现被删除的容器文件已经消失了。

### 十、Dockerfile文件

学会使用image文件以后，接下来的问题就是，如何可以生成image文件？如果你要推广自己的软件，势必要自己制作image文件。

这就需要用到了Dockerfile文件。它是一个文本文件，用来配置image。Docker根据该文件生成二进制的image文件。

### 十一、为什么要使用Docker
	
+ 更高效的利用系统资源
+ 更快速的启动时间
+ 一致的运行环境
+ 持续交付和部署
+ 更轻松的迁移
+ 更轻松的维护和扩展
+ 对比传统虚拟机总结

### 十二、Docker包括三个基本概念

+ 镜像（Image）
+ 容器（Container）
+ 仓库（Repository）