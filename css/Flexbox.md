# Flexbox

---

```html
<ul>
	<li></li>
	<li></li>
	<li></li>
</ul>

```

```css3
ul {
	display: flex; /* 或者display: inline-flex;*/
}

ul li {
	width: 100px;
	height: 100px;
	background-color: f40;
	margin: 8px;
}
```

显式设置了`display`属性的值为`flex`，无序列表ul就会自动变成`flex`容器，而其子元素（`li`）就变成了flex项目。

* **`Flex`容器（`Flex Container`）**：父元素显式设置了`display: flex;`
* **Flex项目（Flex Items）**：Flex容器内的子元素

### Flex容器属性

> 1. 主轴（Mai-Axis）水平方向，从左到右

> 2. 侧轴（Cross-Axis）垂直方向，从上往下

> 3. `Flex`容器会在一行内容纳所有的`Flex`项目。这是因为`flex-wrap`属性的默认值是`nowrap`。也就是说，`Flex`项目在`Flex`容器内是不换行排列。

> 4. 和space-between有点不同，第一个Flex项目和最后一个Flex项目距Main-Axis开始边缘和结束边缘的间距是其他相邻Flex项目间距的一半。


* `flex-direction`
	+ `flex-direction`属性控制Flex项目沿着主轴（Main Axis）的排列方向，有四个值：
		- `row`(默认值) // 它让Flex项目沿着Main-Axis排列（从左向右，水平排列）
		- `column` // 它让Flex项目沿着Cross-Axis从上到下垂直排列。不再是从左到右排列。
		- `row-reverse` // 表现和row相同，但是置换了主轴起点和主轴终点
		- `column-reverse` // 表现和column相同，但是置换了主轴起点和主轴终点
* flex-wrap
	+ `flex-wrap` 属性有三个属性值：
		- wrap /* Flex容器中没有足够的空间放置Flex项目（Flex项目默认宽度）,那么Flex项目将会换行排列*/
		- nowrap /* Flex容器内的Flex项目不换行排列*/
		- wrap-reverse // Flex多行排列，方向相反
* flex-flow
	+ flex-flow 是 flex-direction和flex-wrap两个属性的速记属性
* justify-content
	+ justify-content定义了Flex项目在Main-Axis上的对齐方式，有五个值：
		- flex-start(默认属性) // 让所有Flex项目靠Main-Axis开始边缘（左对齐）
		- flex-end // 让所有Flex项目靠Main-Axis结束边缘（右对齐）
		- center // 让所有Flex项目排在Main-Axis中间（居中对齐）
		- space-between // 让出了第一个和最后一个Flex项目的两者间间距相同（两端对齐）
		- space-around // 让每个Flex项目具有相同的空间
* align-items
	+ align-items属性类似justify-content属性。主要用来控制Flex项目在Cross-Axis对齐方式。这也是align-items和justify-content两个属性之间的不同之处，有五个值：
		- flex-start // 让所有Flex项目靠Cross-Axis开始边缘（顶部对齐）。
		- flex-end // 让所有Flex项目靠Cross-Axis结束边缘（底部对齐）。
		- center // 让所有Flex项目在Cross-Axis中间（居中对齐）。
		- stretch(默认值) // 让所有的Flex项目高度和Flex容器高度一样
		- baseline // 让所有Flex项目在Cross-Axis上沿着它们自己的基线对齐。
* align-content
	+ align-content 属性用于多行的Flex容器。它也是用来控制Flex项目在Flex容器里的排列方式，排列效果和align-items值一样，但除了baseline属性值。
		- start
		- end
		- flex-start
		- flex-end
		- center
		- normal
		- baseline
		- first baseline
		- last baseline
		- space-between
		- space-around
		- space-evenly
		- stretch
		- safe
		- unsafe

## Flex项目属性

* order
	+ order // 允许Flex项目在一个Flex容器中重新排序。基本上，你可以改变Flex项目的顺序，从一个位置移动到另一个地方。默认情况下，所有Flex项目的order值都是0
* flex-grow
* flex-shrink
	+ flex-grow和flex-shrink属性控制Flex项目在容器有多余的空间如何放大（扩展），在没有额外空间又如何缩小。他们可能接受0或者大于0的任何正数。0 || positive number。
* flex-basis
	+ flex-basis属性可以指定Flex项目的初始大小。也就是flex-grow和flex-shrink属性调整它的大小以适应Flex容器之前。

```HTML
<ul>
	<li>1</li>
	<li>2</li>
	<li>3</li>
	<li>4</li>
</ul>
```

```CSS3
ul {
	display: flex;
}

li:nth-child(1) {
	order: 1; // 设置一个比0更大的值
}
```

Flex项目2、3和4的order值都是0。HTML源代码秩序并没有修改过。如果给Flex项目2的order设置为2呢？

是的，你猜对了。它也增加堆栈。现在代表Flex项目的最高的order值。

当两个Flex项目具有相同的order值呢？在下面的示例中，把Flex项目1和3设置相同的order值。

现在仍是从低到高排列。这次Flex项目3排在Flex项目1后面，那是因为在HTML文档中Flex项目3出现在Flex项目1后面。

如果两个以下Flex项目有相同的order值时，Flex项目重新排序是基于HTML源文件的位置进行排序。这个属性就不做过多的解释。接下来继续介绍其他的属性。


### flex速记

flex是flex-grow、flex-shrink和flex-basis三个属性的速记（简写）。

### align-self

改变一个弹性项目沿着侧轴的位置，而不影响相邻的弹性项目值为：


auto || flex-start || flex-end || center || baseline || stretch

### Auto-margin

当在Flex项目上使用 margin: auto 时，值为 auto 的方向（左、右或者二者都是）会占据所有剩余空间。

原文出处:[https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html](https://www.w3cplus.com/css3/understanding-flexbox-everything-you-need-to-know.html)

[深入理解 flex 布局以及计算](https://www.w3cplus.com/css3/flexbox-layout-and-calculation.html?from=groupmessage)