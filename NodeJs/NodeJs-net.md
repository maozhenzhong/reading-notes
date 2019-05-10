# NodeJs-net

---

## net 

```
const net = require('net')
```

## Socket

### 事件

+ connect // 已连接到服务器触发
+ data // 接收到消息触发
+ end
+ timeout
+ error
+ close // 服务关闭后触发


### 属性

+ remoteAddress // 服务端地址
+ remotePort // 服务端端口号
+ localAddress // 本地地址
+ localPort // 本地端口号


### 方法

+ setTimeout // 超时事件
+ write // 发送请求消息
+ setEncoding
+ end // 服务关闭触发

---

## Server

### 事件

+ listening // 服务已启动触发
+ connection // 有新的连接触发
+ close // 关闭触发
+ error // 出现错误触发

### 方法

+ listen // 监听端口
+ close // 关闭启动服务
+ address // 启动服务的地址，必须在 `listening` 回调方法中才能获取

```NodeJs
事件绑定用`on`
```