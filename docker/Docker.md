# Docker

## 1. 什么是Docer

Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括VMs（虚拟机）、 [bare metal](http://www.whatis.com.cn/word_5275.htm)、OpenStack 集群和其他的基础应用平台。 参考资料:<http://dockone.io/article/6051>

### Docker特点

**1.上手快**

用户只需要几分钟，就可以把自己的程序“Docker 化”。Docker 依赖于“写时复制” (copy-on-write)模型，使修改应用程序也非常迅速，可以说达到“随心所致，代码即改” 的境界。

随后，就可以创建容器来运行应用程序了。大多数 Docker 容器只需要不到 1 秒中即可 启动。由于去除了管理程序的开销，Docker 容器拥有很高的性能，同时同一台宿主机中也 可以运行更多的容器，使用户尽可能的充分利用系统资源。

**2.职责的逻辑分类**

使用 Docker，开发人员只需要关心容器中运行的应用程序，而运维人员只需要关心如 何管理容器。Docker 设计的目的就是要加强开发人员写代码的开发环境与应用程序要部署 的生产环境一致性。从而降低那种“开发时一切正常，肯定是运维的问题(测试环境都是正 常的，上线后出了问题就归结为肯定是运维的问题)”

**3.快速高效的开发生命周期**

Docker 的目标之一就是缩短代码从开发、测试到部署、上线运行的周期，让你的应用 程序具备可移植性，易于构建，并易于协作。(通俗一点说，Docker 就像一个盒子，里面 可以装很多物件，如果需要这些物件的可以直接将该大盒子拿走，而不需要从该盒子中一件 件的取。)

**4.鼓励使用面向服务的架构**

Docker 还鼓励面向服务的体系结构和微服务架构。Docker 推荐单个容器只运行一个应 用程序或进程，这样就形成了一个分布式的应用程序模型，在这种模型下，应用程序或者服 务都可以表示为一系列内部互联的容器，从而使分布式部署应用程序，扩展或调试应用程序 都变得非常简单，同时也提高了程序的内省性。(当然，可以在一个容器中运行多个应用程 序)

## 2. Docker组件

### 1.Docker 客户端和服务器

Docker 是一个客户端-服务器(C/S)架构程序。Docker 客户端只需要向 Docker 服务器 或者守护进程发出请求，服务器或者守护进程将完成所有工作并返回结果。Docker 提供了 一个命令行工具 Docker 以及一整套 RESTful API。你可以在同一台宿主机上运行 Docker 守护 进程和客户端，也可以从本地的 Docker 客户端连接到运行在另一台宿主机上的远程 Docker 守护进程。

### 2.Docker镜像

镜像是构建 Docker 的基石。用户基于镜像来运行自己的容器。镜像也是 Docker 生命周 期中的“构建”部分。镜像是基于联合文件系统的一种层式结构，由一系列指令一步一步构 建出来。例如:

添加一个文件;

执行一个命令;

打开一个窗口。

也可以将镜像当作容器的“源代码”。镜像体积很小，非常“便携”，易于分享、存储和更新。

### 3.Registry（注册中心）

Docker 用 Registry 来保存用户构建的镜像。Registry 分为公共和私有两种。Docker 公司 运营公共的 Registry 叫做 Docker Hub。用户可以在 Docker Hub 注册账号，分享并保存自己的 镜像(说明:在 Docker Hub 下载镜像巨慢，可以自己构建私有的 Registry)。

### 4.Docker容器

Docker 可以帮助你构建和部署容器，你只需要把自己的应用程序或者服务打包放进容 器即可。容器是基于镜像启动起来的，容器中可以运行一个或多个进程。我们可以认为，镜 像是Docker生命周期中的构建或者打包阶段，而容器则是启动或者执行阶段。 容器基于 镜像启动，一旦容器启动完成后，我们就可以登录到容器中安装自己需要的软件或者服务。

所以 Docker 容器就是: 一个镜像格式; 一些列标准操作; 一个执行环境。

Docker 借鉴了标准集装箱的概念。标准集装箱将货物运往世界各地，Docker 将这个模 型运用到自己的设计中，唯一不同的是:集装箱运输货物，而 Docker 运输软件。

和集装箱一样，Docker 在执行上述操作时，并不关心容器中到底装了什么，它不管是 web 服务器，还是数据库，或者是应用程序服务器什么的。所有的容器都按照相同的方式将 内容“装载”进去。

Docker 也不关心你要把容器运到何方:我们可以在自己的笔记本中构建容器，上传到 Registry，然后下载到一个物理的或者虚拟的服务器来测试，在把容器部署到具体的主机中。 像标准集装箱一样，Docker 容器方便替换，可以叠加，易于分发，并且尽量通用。

使用 Docker，我们可以快速的构建一个应用程序服务器、一个消息总线、一套实用工 具、一个持续集成(CI)测试环境或者任意一种应用程序、服务或工具。我们可以在本地构 建一个完整的测试环境，也可以为生产或开发快速复制一套复杂的应用程序栈。

## 3. 使用Docker做什么

容器提供了隔离性，结论是，容器可以为各种测试提供很好的沙盒环境。并且，容器本

身就具有“标准性”的特征，非常适合为服务创建构建块。Docker 的一些应用场景如下:

- 加速本地开发和构建流程，使其更加高效、更加轻量化。本地开发人员可以构建、 运行并分享 Docker 容器。容器可以在开发环境中构建，然后轻松的提交到测试环境中，并 最终进入生产环境。
- 能够让独立的服务或应用程序在不同的环境中，得到相同的运行结果。这一点在 面向服务的架构和重度依赖微型服务的部署由其实用。
- 用 Docker 创建隔离的环境来进行测试。例如，用 Jenkins CI 这样的持续集成工具 启动一个用于测试的容器。
- Docker 可以让开发者先在本机上构建一个复杂的程序或架构来进行测试，而不是 一开始就在生产环境部署、测试。

# 安装Docker

## 1.安装Docker

更新ubuntu的apt源索引

```shell
sudo apt-get update
sudo apt-get upgrade
```

安装包允许apt通过HTTPS使用仓库

```shell
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
```

添加Docker官方GPG key

```shell
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
```

设置Docker稳定版仓库

```shell
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

添加仓库后，更新apt源索引

```shell
sudo apt-get update
sudo apt-get upgrade
```

安装最新版Docker CE（社区版）

```shell
sudo apt-get install docker-ce
```

检查Docker CE是否安装正确

```shell
sudo docker run hello-world
```

为了避免每次命令都输入sudo，可以设置用户权限，**注意执行后须注销重新登录**

```shell
# 创建docker用户组
sudo groupadd docker
# 向docker组中添加用户。
sudo usermod -aG docker $USER
```

- ### 将 Docker 配置为在启动时启动

大多数最新的 Linux 分发版（RHEL、CentOS、Fedora、Ubuntu 16.04 及更高版本）都使用 [`systemd`](https://docs.docker-cn.com/engine/installation/linux/linux-postinstall/#systemd) 来管理在系统启动时启动的服务。 Ubuntu 14.10 及更低版本使用 [`upstart`](https://docs.docker-cn.com/engine/installation/linux/linux-postinstall/#upstart)。

```bash
sudo systemctl enable docker
```

如需禁用此性能，请改为使用 `disable`。

```bash
sudo systemctl disable docker
```

## 2. 启动与停止

安装完成Docker后，默认已经启动了docker服务，如需手动控制docker服务的启停，可执行如下命令

```shell
# 启动docker
sudo service docker start

# 停止docker
sudo service docker stop

# 重启docker
sudo service docker restart
```

### 列出镜像

```shell
docker image ls
```

- REPOSITORY：镜像所在的仓库名称
- TAG：镜像标签
- IMAGEID：镜像ID
- CREATED：镜像的创建日期(不是获取该镜像的日期)
- SIZE：镜像大小

### 拉取镜像

Docker维护了镜像仓库，分为共有和私有两种，共有的官方仓库[Docker Hub(https://hub.docker.com/)](https://hub.docker.com/)是最重要最常用的镜像仓库。私有仓库（Private Registry）是开发者或者企业自建的镜像存储库，通常用来保存企业 内部的 Docker 镜像，用于内部开发流程和产品的发布、版本控制。

```shell
docker image pull hello-world
```

### 删除镜像

```shell
docker image rm 镜像名或镜像id
```

如

```shell
docker image rm hello-world
```

## 3. Docker 容器操作

### 创建容器

```shell
docker run [option] 镜像名 [向启动容器中传入的命令]
```

常用可选参数说明：

- **-i** 表示以“交互模式”运行容器
- **-t** 表示容器启动后会进入其命令行。加入这两个参数后，容器创建就能登录进去。即 分配一个伪终端。
- **--name** 为创建的容器命名
- **-v** 表示目录映射关系(前者是宿主机目录，后者是映射到宿主机上的目录，即 宿主机目录:容器中目录)，可以使 用多个-v 做多个目录或文件映射。注意:最好做目录映射，在宿主机上做修改，然后 共享到容器上。
- **-d** 在run后面加上-d参数,则会创建一个守护式容器在后台运行(这样创建容器后不会自动登录容器，如果只加-i -t 两个参数，创建后就会自动进去容器)。
- **-p** 表示端口映射，前者是宿主机端口，后者是容器内的映射端口。可以使用多个-p 做多个端口映射
- **-e** 为容器设置环境变量
- **--network=host** 表示将主机的网络环境映射到容器中，容器的网络与主机相同

### 交互式容器

例如，创建一个交互式容器，并命名为myubuntu

需先拉取一个ubuntu镜像

```shell
docker run -it --name=myubuntu ubuntu /bin/bash
```

在容器中可以随意执行linux命令，就是一个ubuntu的环境，当执行exit命令退出时，该容器也随之停止。

### 守护式容器

创建一个守护式容器:如果对于一个需要长期运行的容器来说，我们可以创建一个守护式容器。在容器内部exit退出时，容器也不会停止。

```shell
docker run -dit --name=myubuntu2 ubuntu
```

### 进入已运行的容器

```shell
docker exec -it 容器名或容器id 进入后执行的第一个命令
```

如

```shell
docker exec -it myubuntu2 /bin/bash
```

### 查看容器

```shell
# 列出本机正在运行的容器
docker container ls

# 列出本机所有容器，包括已经终止运行的
docker container ls -a
```

### 停止与启动容器

```shell
# 停止一个已经在运行的容器
docker container stop 容器名或容器id

# 启动一个已经停止的容器
docker container start 容器名或容器id

# kill掉一个已经在运行的容器
docker container kill 容器名或容器id
```

### 删除容器

```shell
docker container rm 容器名或容器id
```

## 4. 将容器保存为镜像

我们可以通过如下命令将容器保存为镜像

```shell
docker commit 容器名 镜像名
```

## 5. 镜像备份与迁移

我们可以通过save命令将镜像打包成文件，拷贝给别人使用

```shell
docker save -o 保存的文件名 镜像名
```

如

```shell
docker save -o ./ubuntu.tar ubuntu
```

在拿到镜像文件后，可以通过load方法，将镜像加载到本地

```shell
docker load -i ./ubuntu.tar
```