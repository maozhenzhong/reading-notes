# PHP 学习

***

#### MVC Model View Controller

**Model：** 处理数据和业务逻辑

**View：** 通过布局向用户展示数据

**Controller：** 接受用户的请求，并调用相应的模型处理

#### 什么是框架


### PHP开发APP接口

1.  APP接口简介
2. 封装通信接口方法
3. 核心技术
4. APP接口实例

***

#### PHP面向对象接口

PHP面向对象接口：是一个 ``interface`` 关键词声明 ``implements``关键字实现 

```PHP
interface video
{
	public function getVideos();
	public function getCount();
}

class movie implements video
{
	public function getVideos()
	{
		echo 1;
	}
	public function getCount()
	{
		echo 2;
	}
}

movie::getVideos();
movie::getCount();
```

##### APP接口（通信接口）

1. 接口地址：```http://www.example.com/api.php?format=xml```
2. 接口文件：```api.php```处理一些业务逻辑
3. 接口数据：

###### 操作流程：

> 请求App地址：（接口地址）-> 返回接口数据 -> 解析数据 （XML | JSON）-> 客户端；

###### 通信：

> 客户端-->（发送http请求）-->服务器-->(返回数据)-->客户端

```PHP
$data = array(
	"id" => 0,
	"username" => "MaoZhenzhong",
	"sex" => "Man",
	"job" => "Software Engineer",
	"email" => "maozhenzhong@sina.com",
	"address" => "Shaanxi Province, Weiyang District, North Second Ring Road on the 8th Jintai Fortune Center A1401",
	"status" => "1"
);

function json($data)
{
	echo json_encode($data);
	exit;
}

function xml($data)
{
	header("Content-type: text/xml");
	$result = "<?xml version='1.0' encoding=''UTF_8 ?>"
		."<item>\n"
		."<id>". $data["id"] . "</id>\n"
		."<username>" . $data["username"] . "</username>"
		."<sex>" . $data["sex"] . "</sex>"
		."<job>" . $data["job"] . "</job>"
		."<email>" . $data["email"] . "</email>"
		."<address>" . $data["address"] . "</address>"
		."<status>" . $data["status"] . "</status>"
		."</item>";

	echo $result; 
	exit;
}

if($_GET['format'] == 'xml')
{
	xml($data);
}
elseif($_GET['format'] == 'json')
{
	json($data);
}

```


