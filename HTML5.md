# HTML5 Web解决Fixed布局的解决方案

```HTML5
<!DOCUTYPE>
<html lang="zh-cn">
<head>
	<meta charset="utf-8"/>
	<title></title>
</head>
<body class="layout-fixed">
	<!-- fixed定位到顶部 -->
	<header>
	
	</header>
	
	<main>
		<section class="container">
			<!-- 内容区域... -->
		</section>
	</main>
	
	<!-- fixed定位到底部 -->
	<footer>
		<input type="text" placeholder="Footer ..." />
		<button type="submit" class="submit">Submit</button>
	</footer>
</body>
</html>

```
对应的样式如下：

```CSS3
header, footer, main {
	display: block;
}

header {
	position: fixed;
	height:50px;
	left:0;
	right:0;
	top:0;
}

footer {
	position: fixed;
	height:34px;
	left:0;
	right:0;
	bottom:0;
}

main{
	/* main绝对定位，进行内部滚动 */
    position: absolute;
    top: 50px;
    bottom: 34px;
    /* 使之可以滚动 */
    overflow-y: scroll;
    /* 增加该属性，可以增加弹性 */
    -webkit-overflow-scrolling: touch;
}
main .container {
    height: 2000px;
}
```

```JavaScript
// 防止内容区域滚到底后引起页面整体的滚动
var content = document.querySelector('main');
var startY;

content.addEventListener('touchstart', function (e) {
    startY = e.touches[0].clientY;
});

content.addEventListener('touchmove', function (e) {
    // 高位表示向上滚动
    // 底位表示向下滚动
    // 1容许 0禁止
    var status = '11';
    var ele = this;

    var currentY = e.touches[0].clientY;

    if (ele.scrollTop === 0) {
        // 如果内容小于容器则同时禁止上下滚动
        status = ele.offsetHeight >= ele.scrollHeight ? '00' : '01';
    } else if (ele.scrollTop + ele.offsetHeight >= ele.scrollHeight) {
        // 已经滚到底部了只能向上滚动
        status = '10';
    }

    if (status != '11') {
        // 判断当前的滚动方向
        var direction = currentY - startY > 0 ? '10' : '01';
        // 操作方向和当前允许状态求与运算，运算结果为0，就说明不允许该方向滚动，则禁止默认事件，阻止滚动
        if (!(parseInt(status, 2) & parseInt(direction, 2))) {
            stopEvent(e);
        }
    }
});
```