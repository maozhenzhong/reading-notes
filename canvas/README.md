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

#### rect(x, y, width, height);绘制一个左上角坐标为（x,y），宽高为width以及height的矩形。

#### `canvas`有三种方法绘制矩形：

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

### 图像绘制颜色

#### fillStyle = color //设置图形的填充颜色。

#### strokeStyle = color//设置图形轮廓的颜色。

```JavaScript
    var canvas = document.getElementById('canvas');
    function draw(canvas){
        if(canvas.getContext){
            var ctx = canvas.getContext('2d');

            for(var i = 0; i < 6; i++){
                for(var j = 0; j < 6; j++){
                    ctx.fillStyle = 'rgb(' + Math.floor(255 - 42.5 * i) + ',' + Math.floor(255 - 42.5 * j) + ',0)';
                    ctx.fillRect(25 * i, 25 * j, 25, 25);
                }
            }
        }
    }
    draw(canvas);
```

### globalAlpha = transparencyValue //这个属性影响到 canvas 里所有图形的透明度，有效的值范围是 0.0 （完全透明）到 1.0（完全不透明），默认是 1.0。

### 线型 Line styles

#### lineWidth = value //这个属性设置当前绘线的粗细。属性值必须为正数。默认值是1.0。

#### lineCap = type //属性 lineCap 的值决定了线段端点显示的样子。它可以为下面的三种的其中之一：butt，round 和 square。默认是 butt。

#### lineJoin = type //属性值决定了图形中两线段连接处所显示的样子。它可以是这三种之一：round, bevel 和 miter。默认是 miter。

#### miterLimit = value //限制当两条线相交时交接处最大长度；所谓交接处长度（斜接长度）是指线条交接处内角顶点到外角顶点的长度。

#### getLineDash()//返回一个包含当前虚线样式，长度为非负偶数的数组。

### 用 setLineDash 方法和 lineDashOffset 属性来制定虚线样式. setLineDash 方法接受一个数组，来指定线段与间隙的交替；lineDashOffset 属性设置起始偏移量.

#### setLineDash(segments)//设置当前虚线样式。

#### lineDashOffset = value//设置虚线样式的起始偏移量。

#### createLinearGradient(x1, y1, x2, y2)//createLinearGradient 方法接受 4 个参数，表示渐变的起点 (x1,y1) 与终点 (x2,y2)。

#### createRadialGradient(x1, y1, r1, x2, y2, r2)//createRadialGradient 方法接受 6 个参数，前三个定义一个以 (x1,y1) 为原点，半径为 r1 的圆，后三个参数则定义另一个以 (x2,y2) 为原点，半径为 r2 的圆。

#### 创建出 canvasGradient 对象后，我们就可以用 addColorStop 方法给它上色了。

> gradient.addColorStop(position, color)
> addColorStop 方法接受 2 个参数，position 参数必须是一个 0.0 与 1.0 之间的数值，表示渐变中颜色所在的相对位置。例如，0.5 表示颜色会出现在正中间。color 参数必须是一个有效的 CSS 颜色值（如 #FFF， rgba(0,0,0,1)，等等）。

```JavaScript
    var lineargradient = ctx.createLinearGradient(0,0,150,150);
    lineargradient.addColorStop(0,'white');
    lineargradient.addColorStop(1,'black');
```

#### createPattern(image, type)//该方法接受两个参数。Image 可以是一个 Image 对象的引用，或者另一个 canvas 对象。Type 必须是下面的字符串值之一：repeat，repeat-x，repeat-y 和 no-repeat。

```JavaScript
    function draw() {
        var ctx = document.getElementById('canvas').getContext('2d');

        // 创建新 image 对象，用作图案
        var img = new Image();
        img.src = 'images/wallpaper.png';
        img.onload = function(){

            // 创建图案
            var ptrn = ctx.createPattern(img,'repeat');
            ctx.fillStyle = ptrn;
            ctx.fillRect(0,0,150,150);

        }
    }
```

### 阴影 Shadows

#### shadowOffsetX = float//shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

#### shadowOffsetY = float//shadowOffsetX 和 shadowOffsetY 用来设定阴影在 X 和 Y 轴的延伸距离，它们是不受变换矩阵所影响的。负值表示阴影会往上或左延伸，正值则表示会往下或右延伸，它们默认都为 0。

#### shadowBlur = float//shadowBlur 用于设定阴影的模糊程度，其数值并不跟像素数量挂钩，也不受变换矩阵的影响，默认为 0。

#### shadowColor = color//shadowColor 是标准的 CSS 颜色值，用于设定阴影颜色效果，默认是全透明的黑色。

### 绘制文本

#### fillText(text, x, y [, maxWidth])//在指定的(x,y)位置填充指定的文本，绘制的最大宽度是可选的.

#### strokeText(text, x, y [, maxWidth])//在指定的(x,y)位置绘制文本边框，绘制的最大宽度是可选的.

### 文本样式

#### font = value//当前我们用来绘制文本的样式. 这个字符串使用和 CSS font 属性相同的语法. 默认的字体是 10px sans-serif。

#### textAlign = value//文本对齐选项. 可选的值包括：start, end, left, right or center. 默认值是 start。

#### textBaseline = value//基线对齐选项. 可选的值包括：top, hanging, middle, alphabetic, ideographic, bottom。默认值是 alphabetic。

#### direction = value//文本方向。可能的值包括：ltr, rtl, inherit。默认值是 inherit。

#### measureText()//将返回一个 TextMetrics对象的宽度、所在像素，这些体现文本特性的属性。
