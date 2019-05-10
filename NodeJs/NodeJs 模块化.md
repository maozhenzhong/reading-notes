# NodeJs 模块化

---

## 第一部分：

后端的规范与思想

1. 分层
	1. Web层 （接收和发送HTTP请求，封装；Web层、者Controller层） 
	2. 业务逻辑层（服务层：XXXService；）
	3. DAO（Data Access Object）层
	4. 持久层：存储在磁盘上
	 

	DataBase （DB）：存储数据
	业务：对对象进行操作
	如果要存储：对象转换为数据
	如果要读取：数据转换为对象
	文件，
	
	Web层：LoginController (接收参数，判断是否非法，传给服务层) 
	服务层：LoginService（获取这个用户的密码，进行比较）  
	DAO层：LoginDAO（从数据库获取数据并转换为对象）  
	Domain：User  

2. 模块化
	1. Es3、Es5缺点：缺少模块化概念；Es6导入和导出

```NodeJs

// NodeJs 的模块是在一个函数中运行
function sys(exportss,require,module,__filename,__dirname) {
	// ...
	// 中间是我们写的js
	// ...

	return module
}

console.log(arguments[0] === exports) // true
console.log(arguments[1] === require) // true
console.log(arguments[0] === module) // true
console.log(arguments[0] === __filename) // true
console.log(arguments[0] === __dirname) // true
```

网络：

应用层：http协议
运输层、传输层：tcp
网络层：ip

---
开发很少介入

数据链路层
物理层

TCP/IP


## 第二部分：

基础的API

## 第三部分：

常用的框架

## 第四部分：（Web项目）

1. 接收Web请求
2. 处理业务逻辑
3. 文件操作
4. 数据库（关系型数据库MySQL、非关系型数据库MongoDB）
5. 反向代理服务器（IP哈希，轮询）

## 第五部分：

大项目（NodeJs + VueJs）

