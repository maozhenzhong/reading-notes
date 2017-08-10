# PHP开发APP接口

***

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

###### PHP生成json数据```json_encode($data)```

> json_encode() //只能生成UTF-8格式的数据

###### 通信数据标准格式

> code 		状态码（200，400等）
> message 	提示信息（邮箱格式不正确；数据返回成功）
> data 			返回数据

###### PHP生成json：

```PHP
class Response
{
	/**
	* 按``json``格式输出数据
	* @param integer $code 状态码
	* @param string $message 提示信息
	* @param array $data 数据
	* return string
	*/
	public static function json($code, $message, $data = array())
	{
		if(!is_numeric($code))
		{
			return '';
		}

		$result = array(
			'code' => $code,
			'message' => $message,
			'data' => $data,
		);

		return json_encode($result);
	}
}
```

```PHP
$arr = (
	'id' => 1,
	'name' => 'maozhenzhong',
);

Response::json(200, '数据返回成功', $arr);
```

###### PHP生成xml：

```PHP
class Response
{
	/**
	* 按``xml``格式输出数据
	* @param integer $code 状态码
	* @param string $message 提示信息
	* @param array $data 数据
	* return string
	*/
	public static function xmlEncode($code, $message, $data = array())
	{
		if(!is_numeric($code))
		{
			return '';
		}

		$result = array(
			'code' => $code,
			'message' => $message,
			'data' => $data
		);

		header("Content-type: text/xml");
		$xml = '<?xml version="1.0" encoding="UTF_8"?>\n';
		$xml .= '<root>\n'
		self::xmlToEncode($result);
		$xml .= '</root>';
			return $xml;
	}

	public static function xmlToEncode($data)
	{
		$xml = '';
		$attr = '';

		foreach($data as $key => $value)
		{
			if(is_numeric($key))
			{
				$attr = "id=\"{$key}\"";
				$key = "item";
			}

			$xml .= "<{$key} {$attr}>";
			$xml .= is_array($value)?self::xmlToEncode($value):$value;
			$xml .= "</{$key}>\n";
		}

		return $xml;
	}
}
```

```PHP
	$data = array(
		'id' => 1,
		'name' => 'MaoZhenzhong'
	);
	Response::xmlEncode(200, 'success', $data);
```
### 封装通信接口数据方法

###### 