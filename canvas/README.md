# Canvas 学习笔记

### 渲染上下文（The rendering context）

> canvas起初是空白的。js需要找到渲染上下文，然后在它的上面绘制。`<canvas>`元素有一个`getContext()`的方法，用来获取渲染上下文及其绘画功能。`getContext()`有一个参数，即上下文的格式`2d`
```HTML
    <canvas id="canvas" width="400" height="400"></canvas>
```

```JavaScript
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
```
### 检查支持情况

```JavaScript
    var canvas = document.getElementById('canvas');
    if(canvas.getContext){
        var ctx = canvas.getContext('2d');
    }
```

### 绘制矩形

#### `canvas`有三种方法绘制矩形：

>
> 1、fillRect(x,y,width,height);//绘制一个填充的矩形
>
> 2、strokeRect(x,y,width,height);//绘制一个矩形边框
>
> 3、clearRect(x,y,width,height);//清楚指定矩形区域，让清楚部分完全透明。
>
> x,y是与指定在canvas画布上所绘制的矩形的左上角（相对于原点）的坐标。width和height设置矩形的尺寸

```JavaScript
    var canvas = document.getElementById('canvas');

    function draw(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');
        }

        ctx.fillRect(25,25,100,100);
        ctx.clearRect(45,45,60,60,);
        ctx.strokeRect(50,50,50,50);
    }
    draw(canvas);
```

### 绘制路径

#### 绘制路径的基本步骤：

+ 创建路径的起始点
+ 使用画图命令画出路径。
+ 封闭路径
+ 生成路径后，通过描边或者填充路径区域来渲染图形。

#### 绘制路径的方法：

> beginPath()//新建一条路径，生成之后，图形绘制命令被指向到路径上生成路径。
>
> closePath() //闭合路径之后图形绘制命令又重新指向到上下文中。
>
> stroke()//通过线条来绘制图形轮廓
>
>fill()//通过填充路径的区域生成实心的图形。

> 注意：当前路径为空，即调用beginPath()之后，或者canvas刚建的时候，第一条路径构造命令通常被视为是moveTo()，无论最后的是什么。出于这个原因，你几乎总是要在设置路径之后专门指定你的起始位置。


> 注意：当调用fill()函数时，所有没有闭合的形状都会自动闭合，所以你不需要调用closePath()函数。但是调用stroke()时不会自动闭合。

```JavaScript
    var canvas = document.getElementById('canvas');
    function drawTriangle(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.moveTo(100,100);
            ctx.lineTo(200,100);
            ctx.lineTo(150,150);
            ctx.closePath();
            ctx.fill();
        }
    }
    drawTriangle(canvas);
```

### moveTo(x, y) //将笔触移动到指定的坐标x以及y上。

```JavaScript
    var canvas = document.getElementById('canvas');
    function drawFace(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            ctx.beginPath();
            ctx.arc(75,75,50,0,Math.PI*2,true);
            ctx.moveTo(110,75);
            ctx.arc(75,75,35,0,Math.PI, false);
            ctx.moveTo(65,65);
            ctx.arc(60,65,10,0,Math.PI*2,true);
            ctx.moveTo(95,65);
            ctx.arc(90,65,10,0,Math.PI*2,true);
            ctx.stroke();
        }
    }
    drawFace(canvas);
```

### lineTo(x, y);//绘制一条从当前位置到指定x以及y位置的直线。

```JavaScript
    var canvas = document.getElementById('canvas');
    function drawTriangle(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            //填充三角形
            ctx.beginPath();
            ctx.moveTo(25,25);
            ctx.lineTo(105,25);
            ctx.lineTo(25,105);
            ctx.fill();

            //描边三角形
            ctx.beginPath();
            ctx.moveTo(125,125);
            ctx.lineTo(125,45);
            ctx.lineTo(45,125);
            ctx.closePath();
            ctx.stroke();
        }
    }
    drawTriangle(canvas);
```

### arc(x,y,radius,startAngle,endAngle,anticlockwise);//绘制圆弧

>画一个以(x,y)为圆心的radius为半径的圆弧（圆），从startAngle开始到endAngle结束，按照anticlockwise给定的方向（默认为顺时针）来生成。
>
>参数anticlockwise为一个布尔值。为true时，是逆时针方向，否则为顺时针方向。
>

> 注意：arc()函数中的角度单位是弧度，不是度数。角度与弧度的js表达式：radians = (Math.PI/180) * degrees;
>

### arcTo(x1,y1,x2,y2,radius);//根据给定的控制点和半径画一段圆弧，再以直线连接两个控制点。

### 二次贝塞尔曲线及三次贝塞尔曲线

#### quadraticCurveTo(cp1x, cp1y, x, y)//绘制二次贝塞尔曲线，cp1x,cp1y为一个控制点，x,y为结束点。

#### bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)//绘制三次贝塞尔曲线，cp1x,cp1y为控制点一，cp2x,cp2y为控制点二，x,y为结束点。

```JavaScript
    var canvas = document.getElementById('canvas');
    function drawTriangle(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            // 二次贝塞尔曲线
            ctx.beginPath();
            ctx.moveTo(75,25);
            ctx.quadraticCurveTo(25,25,25,62.5);
            ctx.quadraticCurveTo(25,100,50,100);
            ctx.quadraticCurveTo(50,120,30,125);
            ctx.quadraticCurveTo(60,120,65,100);
            ctx.quadraticCurveTo(125,100,125,62.5);
            ctx.quadraticCurveTo(125,25,75,25);
            ctx.stroke();
        }
    }
    drawTriangle(canvas);
```

```JavaScript
    var canvas = document.getElementById('canvas');
    function drawTriangle(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            //三次贝塞尔曲线
            ctx.beginPath();
            ctx.moveTo(75,40);
            ctx.bezierCurveTo(75,37,70,25,50,25);
            ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
            ctx.bezierCurveTo(20,80,40,102,75,120);
            ctx.bezierCurveTo(110,102,130,80,130,62.5);
            ctx.bezierCurveTo(130,62.5,130,25,100,25);
            ctx.bezierCurveTo(85,25,75,37,75,40);
            ctx.fill();
        }
    }
    drawTriangle(canvas);
```
