# HTTP的特性

+ HTTP构建于TCP/IP协议之上，默认端口是80
+ HTTP是无连接状态的

# HTTP报文

### 请求报文

HTTP协议是以ASCII码传输，建立在TCP/IP协议之上的应用层规范。规范把HTTP请求分为三部分：状态行、请求头、消息主体。

```bash
<method><request-URL><version>
<headers>
<entity-body>
```

HTTP定义了与服务器交互的不同方法，最基本的方法有4种，分别是GET、POST、PUT、DELETE。URL全程是资源描述符：一个URL地址，它用于描述一个网络上的资源，而HTTP中的GET、POST、PUT、DELETE就对应着这个资源的查、增、改、删4个操作。

1. GET用于信息获取，而且应该是安全的和幂等的