# 通信方式进阶

### AJAX

+ 创建 xht对象
+ 监听请求
+ 设置回调
+ 设置参数
+ 发送xhr
+ 获得数据执行回调

```JavaScript
	var sendAjax = (function() {
		var getXHR = (function(){
			var xhr;
			if(window.XHRHttpRequest){
				xhr = new XHRHttpRequest();
			}else{
				xhr = new ActiveObject('Microsoft.XMLHTTP');
			}
			return xhr;
		})();	
		return function(url,opts){
			var xhr = getXHR(),
				data;
			xhr.onreadystatechange = function(){
				if(xhr.readyState === 4 || xhr.status === 200){
					data = JSON.parse(xhr.responseText);
					opts.callback(data);
				}
			}
			xhr.setRequestHeader('Content-Type', 'application/json');
			xhr.open(opts.method,url);
			xhr.send(JSON.stringify(opts.data));
		}
	})();
	sendAjax('www.example.com', {
		callback: function(data){
			//...
		},
		data: {
			name: 'JIMMY',
			age: 18
		}
	});
```

### JSONP

```JavaScript
<script>
	function processJSON(json){
		//Do something with the JSON response
	}
</script>
<script src="http://www.example.com?callback=processJSON&name=boy&age=18"></script>
```

```JavaScript
	processJSON({
		message:"I've already received"
	});
```

```JavaScript
	const util = require('util'),
		http = require('http'),
		url = require('url');
	let data = JSON.stringify({
		message: "I've already received"
	});
	http.createServer(function(req, res){
		req = url.parse(req.url, true);
		if(!req.query.callback) res.end();
		console.log(`name is ${req.query.name} and his age is ${req.query.age}`);
		res.writeHead(200, {'Content-Type': 'application/javascript'})
		res.end(req.query.callback + "(" + data + ")")
	}).listen(80)
```

```JavaScript
	var sendJSONP = function(url, callbackName){
		var script = document.createElement('script');
		script.src = `${url}&callback=${callbackName}`;
		document.head.appendChild(script);;
	}
	var sayName = function(name) {
		console.log(`your name is ${name}`);
	}
	sendJSONP('http://www.example.com?name=test', 'sayName');
```

```jQuery
	$.ajax({
		url: 'http://www.example.com?name=test',
		dataType: 'jsonp',
		success: function(name){
			console.log(name);
		}
	});
```

# SSE

ajax 和JSONP都是client-fetch的操作。但是有时候，我们更需要服务器主动给我们发信息。比如，现在的APP应用，完全可以实现服务器发送，然后Client再处理。而，SSE就是帮助我们向WebAPP靠近。SSE全称是Server-Sent Events即服务器推送。

SSE技术不是很难，和websocket不同，他依赖原生的HTTP，所以对于开发者来说更好理解。比如，在nodeJS，只要我不执行res.end()，并且一定时间持续发送信息的话，那么该链接就会持续打开（keep-alive）。其实通俗来说，就是一个长链接。所以，以前我们通常使用ajax，iframe长轮询来代替它。但是这样有个缺点就是，可操控性弱，错误率高。所以，正对于这点W3C，觉得需要在客户端另外指定一个机制--能够保证服务器推送，实现连接的keep-alive。

SSE和AJAX具体的区别：

+ 数据类型不同：SSE只能接受type/event-stream类型。AJAX可以接受任意类型。
+ 结束机制不同：虽然使用AJAX长轮询也可以实现这样的效果，但是，服务器端（nodeJS）必须在一定时间内执行res.end（）
才行。而SSE，只需要执行res.write（）即可。

```JavaScript
	var source = new EventSource('/dates');//指定路由发送
	source.onmessage = function(e){//监听信息的传输
		var data = JSON.parse(e.data),
			origin = e.origin;
	}
	source.onerror = function(e){//当连接发生error时触发
		console.log(e);
	}
	source.onopen = function(e){//当连接正式建立时触发
		console.log(e);
	}
```

SSE主要就是创建一个EventSource对象。里面的参数就是发送的路由，不过目前还不支持CORS，所以也被限制在同源策略下。在返回的source里面包含了，需要处理的一切信息。SSE也是通过事件驱动的，如上面demo所述。这里SSE通常有以下几类重要的事件。|eventName|effect| |:---|:---| |open|当连接打开时触发|message|当有数据发送时触发，在event对象内包含了相关数据| |error|当发生错误时触发|

上面几个方法比较重要的还是message方法。message主要用来进行信息的接受，回调中的event包含了返回的相关数据。event包含的内容 |property|effect| |:---|:---| |data|服务器端传回的数据| |origin|服务器端URL的域名部分，有protocol，hostname，port| |lastEventId|用来指定当前数据的序号。主要用来断线重连时数据的有效性|

服务器返回数据格式

上文说过,SSE 是以event-stream格式进行传输的. 但具体内容是怎样的呢?

```
data: hi

data: second event
id: 100

event: myevent
data: third event
id: 101

: this is a comment
data: fourth event
data: fourth event continue
```

上面就是一个简单的demo. 每一段数据我们称之为事件, 每一个事件经过空行分隔. :前面是数据类型,后面是数据. 通常的类型有:

+ 空类型: 表示注释,在处理是会默认被删除.比如:this is a comment.
+ event: 声明该事件类型,比如message.
+ data: 最重要的一个类型, 表示传输的数据。可以为string格式或者JSON格式. 比如:data: {"username": "bobby"}
+ id: 其实就是lastEventId. 用来表明该次事件在整个流中的序号
+ retry: 用来表明浏览器断开再次连接之前等待的事件(不常用)

其实上面最重要的两个字段就是data,id. 所以，我们一般获取的话就可以使用 ```event.data```和```event.lastEventId``` 上文说道, 每一段内容是通过换行实现的, 那服务器端应该怎么实现, 写入的操作呢？ 同样, 这里以nodeJS 为例:

```
res.write("id: " + i + "\n");
res.write("data: " + i + "\n\n");
```

### 服务端使用SSE

由于使用的是HTTP协议，所以对于服务端基本上没什么太大的改变. 唯一注意的就是, 发送数据使用res.write()即可，断开的时候使用res.end();

```
res.writeHead(200, {
	"Content-Type": "text/event-stream",
	"Cache-Control": "no-cache",
	"Access-Control-Allow-Origin": "*" //允许跨域
});
var num =0;
var f = function(){
	if(num===10){
		res.end();
	}else{
		res.write("id: " + num + "\n");
		res.write("data: " + num + "\n\n");
		num++;
	}
	setTimeout(f,1000);
}
f();
```

# websocket

websocket 不同于其他的HTTP协议，他是独立于HTTP存在的另外一种通信协议。比如,像这样的一个路径ws://websocket.example.com/,就是一个websocket 通信. 通常的实时通信并不会传输大量的内容, 所以,对于HTTP协议那种，进行连接时需要传递，cookie和request Headers来说, 这种方式的通信协议，会造成一定的时延(latency). websocket通信协议就是在这样的背景下诞生了, 他与SSE,ajax polling不同的是--双向通信.

> talk is cheap, show the code

```JavaScript
var socket = new WebSocket('ws://localhost:8080');
socket.onopen = function(){
	console.log('Connected!');
};
socket.onmessage = function(event){
	console.log('Received data: ' + event.data);
	socket.close();
};
socket.onclose = function(){
	console.log('Lost connection!');
};
socket.onerror = function(){
	console.log('Error!');
};
socket.send('Hello, word!');
```

可以说上面就是一个健全的websocket 通信了. 和SSE一样，我们需要创建一个WebSocket对象, 里面的参数指定连接的路由. 而且，他也是事件驱动的. 常见的事件监听有. |event|effect| |:---|:---| |open|当ws连接建立时触发| |message|当有信息到来时触发| |error|当连接发生错误时触发| |close|当连接断开时触发|

### websocket 发送数据

另外，websocket 最大的特点就是可以双向通信。这里可以使用.ws.send()方法发送数据, 不过只能发送String和二进制. 这里，我们通常call 数据叫做Frames. 他是数据发送的最小单元.包含数据的长度和数据内容. 下面就是几种常用的发送方式

```JavaScript
socket.send('Hello serve!');
socket.send(JSON.stringify({'msg': 'payload'}));

var buffer = new ArrayBuffer(128);
socket.send(buffer);

var intview = new Uint32Array(buffer);
socket.send(intview);

var blob = new Blob(buffer);
socket.send(blob);
```

另外还可以使用binaryType指定传输的数据格式,不过一般都用不上，就不说了. 不过需要提醒的是, send方法，一般在open和message的回调函数中调用.

### websocket 接受数据

同理，和SSE差不多, 通过监听message事件，来接受server发送回来的数据. 接受其实就是通过event.data来获取. 不过, 需要和server端商量好data的类型.

```
ws.onmessage = function(msg){
	if(msg.data instanceof Blob){
		processBlob(msg.data);
	}else {
		processText(JSON.parse(msg.data));//接受JSON数据
	}
}
```

那server端应该怎样处理websocket通信呢？ websocket虽然是另外一种协议，不过底层还是封装了TCP通信, 所以使用nodeJS的net模块，基本就可以满足，不过里面需要设置很多的头. 这里推荐使用ws模块.

### NodeJS 发送websocket数据

简单的websocket demo

```JavaScript
var WebSocketServer = require('ws').Server, wss = new WebSocketServer({port: 8080});

//通过ws+ssl的方式通信. 和HTTPS类似
wss.on('connection', function connection(ws){
	ws.on('message', function incoming(message){
		console.log('received: %s', message);	
	});

	ws.send('something');
});
```

### how does CORS work

CORS 是Cross-Origin Resource Sharing--跨域资源分享. CORS 是W3C 规范中 一项很重要的spec. 一开始,ajax 收到 the same origin policy 的限制 奈何不得。 结果出来了JSONP 等 阿猫阿狗. 这让ajax很不安呀~ 但是,W3C 大手一挥, 亲, 我给你开个buff. 结果CORS 就出来了。 CORS 就是用来帮助AJAX 进行跨域的。 而且支持性也超级好. IE8+啊，亲~ 但是IE 是使用XDomainRequest 发送的.(真丑的一逼) 所以，这里安利一下Nicholas Zakas大神写的一个函数.(我把英文改为中文了)

```
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // 检查xhr是否含有withCredentials属性
    //withCredentials 只存在于XHR2对象中.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // 检查是否是IE，并且使用IE的XDomainRequest
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // 否则..基本上就不能跨域了
    xhr = null;

  }
  return xhr;
}
```

然后, 就可以直接，xhr.send(body). 那CORS其实就完成了. 但,withCredentials是什么意思呢?

### CORS中的withCredentials

该属性就是用来表明，你的request的时候，是否带上你的cookie. 默认情况下是不带的. 如果你要发送cookie给server的话, 就需要将withCredentials设置为true了. xhr.withCredentials = true;但是,server并不是随便就能接受并返回新的cookie给你的。 在server端,还需要设置. Access-Control-Allow-Credentials: true这样server才能返回新的cookie给你. 不过，这还有一个问题,就是cookie还是遵循same-origin policy的。 所以, 你无法使用去访问他. 他的CRUD(增删查改)只能由 server控制.

### CORS 的preflight 验证

CORS的preflight request, 应该算是CORS中里面 巨坑的一个。 因为在使用CORS 的时候， 有时候我命名只发送一次请求，但是,结果出来了两个。 有时候又只有一个, 这时候, 我就想问，还有谁能不懵逼. 这里，我们就需要区分一下. preflight request的作用到底是什么。 preflight request 是为了, 更好节省宽带而设计的. 因为CORS 要求的网络质量更高, 而且 花费的时间也更多. 万一, 你发送一个PUT 请求(这个不常见吧). 但是服务端又不支持, 那么你这次的 请求是失败了， 浪费资源还不说，关键用户不能忍呀~ 所以, 这里我们就需要区分，什么是简单请求, 什么是比较复杂的请求 简单请求 简单请求的内容其实就两块, 一块是method 一块是Header

+ Method
+ GET
+ POST
+ Header
+ Accept
+ Accept-Language
+ Content-Language
+ Last-Event-ID //这是SSE的请求头
+ Content-Type ,但只有一下头才能算简单 application/x-www-form-urlencoded
+ multipart/form-data
+ text/plain

