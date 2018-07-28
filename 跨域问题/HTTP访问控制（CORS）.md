# HTTP访问控制（CORS）
----

当一个资源从与该资源本身所在的服务器不同的域或端口请求一个资源时，资源会发起一个**跨域HTTP请求**。

出于安全原因，浏览器限制从脚本内发起的跨源HTTP请求。例如，XMLHttpRequest和FetchAPI遵循同源策略。这意味着使用这些API的Web应用程序只能从加载应用程序的同一个域请求HTTP资源，除非使用CORS头文件。

***注：***跨域并非不一定是浏览器限制了发起跨站请求，而也可能是跨站请求可以正常发起，但是返回结果被浏览器拦截了。最好的例子是CSRF跨站攻击原理，请求是发送到了后端服务器无论是否跨域！注意：有些浏览器不允许从HTTPS的跨域访问HTTP，比如Chrome和Firefox，这些浏览器在请求还未发出的时候就会拦截请求，这是一个特例。

跨域资源共享（CORS）机制允许Web应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。浏览器支持在API容器中（例如XMLHttpRequest或Fetch）使用CORS，以降低跨域HTTP请求所带来的风险。

跨域资源共享标准（cross-origin sharing standard）允许在下列场景中使用跨域HTTP请求：

+ 前文提到的由XMLHttpRequest或Fetch发起的跨域HTTP请求。
+ Web字体（CSS中通过 @font-face使用跨域字体资源），因此，网站就可以发布TrueType字体资源，并只允许已授权网站进行跨域调用。
+ WebGL贴图
+ 使用drawImage将Image/video画面绘制到canvas
+ 样式表（使用CSSOM）
+ Scrits（未处理的异常）

跨域资源共享标准新增了一组HTTP首部字段，允许服务器声明哪些源站有权限访问哪些资源。另外，规范要求，对那些可能对服务器数据产生副作用的HTTP请求方法（特别是GET以外的HTTP请求，或者搭配某些MIME类型的POST请求），浏览器必须首先使用OPTIONS方法发起一个预检请求（preflight request），从而获知服务端是否允许该跨域请求。服务器确认允许之后，才发起实际的HTTP请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括Cookies和HTTP认证相关数据）。

### 简单请求
----

某些请求不会触发CORS预检请求。本文称这样的请求为“简单请求”，请注意，该术语并不属于Fetch（其中定义了CORS）规范。若请求满足所有下述条件，则该请求可视为“简单请求”。

+ 使用下列方法之一：

	+ GET
	+ HEAD
	+ POST

+ Fetch规范定义了对CORS安全的首部字段集合，不得人为设置该集合之外的其他首部字段。该集合为：

	+ Accept
	+ Accept-Language
	+ Content-Language
	+ Content-Type（需要注意额外的限制）
	+ DPR
	+ Downlink
	+ Save-Data
	+ Viewport-Width
	+ Width

+ Content-Type的值仅限于下列三者之一：

	+ text/plain
	+ multipart/from-data
	+ application/x-www-form-urlencoded
+ 请求中的任意XMLHttpRequestUpload对象均没有注册任何事件监听器；XMLHttpRequestUpload对象可以使用XMLHttpRequest.upload属性访问。
+ 请求中没有使用ReadableStream对象。

**注意：**这些跨域请求与浏览器发出的其他跨域请求并无二致。如果服务器未返回正确的响应首部，则请求方不会收到任何数据。

### 预检请求
----

“需预检的请求”要求必须首先使用OPTIONS方法发起一个预检请求到服务器，以获知服务器是否允许该实际请求。“预检请求”的使用，可以避免跨域请求对服务器的用户数据产生未预期的影响。

当请求满足以下任一条件时，即应首先发送预检请求：

+ 使用了下面任一HTTP方法：

	+ PUT
	+ DELETE
	+ CONNECT
	+ OPTIONS
	+ TRACE
	+ PATCH

+ 人为设置了对CORS安全的首部字段集合之外的其他首部字段。该集合为：

	+ Accept
	+ Accept-Language
	+ Content-Language
	+ Content-Type（but note the additional requirements below）
	+ DPR
	+ Downlink
	+ Save-Data
	+ Viewport-Width
	+ Width

+ Content-Type的值不属于下列之一：

	+ application/x-www-form-urlencoded
	+ multipart/form-data
	+ text/plain

+ 请求中的XMLHttpRequestUpload对象注册了任意多个事件监听器。
+ 请求中使用了ReadableStream对象。

在浏览器的实现跟上规范之前，有两种方式规避上述报错行为：
	
+ 在服务端去掉对预检请求的重定向；
+ 将实际请求变成一个简单请求。

如果上面两种方式难以做到，我们仍有其他办法：

+ 发出一个简单请求（使用  Response.url 或 XHR.responseURL）以判断真正的预检请求会返回什么地址。
+ 发出另一个请求（真正的请求），使用在上一步通过Response.url 或 XMLHttpRequest.responseURL获得的URL。

不过，如果请求是由于存在 Authorization 字段而引发了预检请求，则这一方法将无法使用。这种情况只能由服务端进行更改。


### 附带身份凭证的请求
----

Fetch 与 CORS 的一个有趣的特性是，可以基于  HTTP cookies 和 HTTP 认证信息发送身份凭证。一般而言，对于跨域 XMLHttpRequest 或 Fetch 请求，浏览器不会发送身份凭证信息。如果要发送凭证信息，需要设置 XMLHttpRequest 的某个特殊标志位。

附带身份凭证的请求与通配符

对于附带身份凭证的请求，服务器不得设置 Access-Control-Allow-Origin 的值为“*”。

这是因为请求的首部中携带了 Cookie 信息，如果 Access-Control-Allow-Origin 的值为“*”，请求将会失败。而将 Access-Control-Allow-Origin 的值设置为 http://foo.example，则请求将成功执行。

另外，响应首部中也携带了 Set-Cookie 字段，尝试对 Cookie 进行修改。如果操作失败，将会抛出异常。

### HTTP 响应首部字段
----

#### Access-Control-Allow-Origin

响应首部中可以携带一个 Access-Control-Allow-Origin 字段，其语法如下:

```bash
Access-Control-Allow-Origin: <origin> | *
```

其中，origin 参数的值指定了允许访问该资源的外域 URI。对于不需要携带身份凭证的请求，服务器可以指定该字段的值为通配符，表示允许来自所有域的请求。

如果服务端指定了具体的域名而非“*”，那么响应首部中的 Vary 字段的值必须包含 Origin。这将告诉客户端：服务器对不同的源站返回不同的内容。

#### Access-Control-Expose-Headers

在跨域访问时，XMLHttpRequest对象的getResponseHeader()方法只能拿到一些最基本的响应头，Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma，如果要访问其他头，则需要服务器设置本响应头。

Access-Control-Expose-Headers 头让服务器把允许浏览器访问的头放入白名单，例如：

```bash
Access-Control-Expose-Headers: X-My-Custom-Header, X-Another-Custom-Header
```

#### Access-Control-Max-Age

Access-Control-Max-Age 头指定了preflight请求的结果能够被缓存多久，请参考本文在前面提到的preflight例子。

```bash
Access-Control-Max-Age: <delta-seconds>
```

`delta-seconds` 参数表示preflight请求的结果在多少秒内有效。

#### Access-Control-Allow-Credentials

Access-Control-Allow-Credentials 头指定了当浏览器的credentials设置为true时是否允许浏览器读取response的内容。当用在对preflight预检测请求的响应中时，它指定了实际的请求是否可以使用credentials。请注意：简单 GET 请求不会被预检；如果对此类请求的响应中不包含该字段，这个响应将被忽略掉，并且浏览器也不会将相应内容返回给网页。

```bash
Access-Control-Allow-Credentials: true
```

#### Access-Control-Allow-Methods

Access-Control-Allow-Methods 首部字段用于预检请求的响应。其指明了实际请求所允许使用的 HTTP 方法。

```bash
Access-Control-Allow-Methods: <method>[, <method>]*
```

#### Access-Control-Allow-Headers

Access-Control-Allow-Headers 首部字段用于预检请求的响应。其指明了实际请求中允许携带的首部字段。

```bash
Access-Control-Allow-Headers: <field-name>[, <field-name>]*
```

### HTTP 请求首部字段
----

#### Origin

Origin 首部字段表明预检请求或实际请求的源站。

```bash
Origin: <origin>
```

origin参数的值为源站URI。它不包含任何路径信息，只是服务器名称。

**注意：**有时候讲该字段的值设为空字符串是有用的。例如，当源站是一个data URL时。

是不是跨域请求，ORIGIN字段总是被发送。

#### Access-Control-Request-Method

Access-Control-Request-Method首部字段用于预检请求。其作用是，将实际请求所使用的HTTP方法告诉服务器。


```bash
Access-Control-Request-Method:<method>
```

#### Access-Control-Request-Headers

Access-Control-Request-Headers首部字段用于预检请求。其作用是，将实际请求所携带的首部字段告诉服务器。


```bash
Access-control-Request-Headers: <field-name>[, <field-name>]*
```
