# box-sizing

> box-sizing属性用于更改用于计算元素宽度和高度的默认的CSS盒子模型。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为。
> 

```Styles
	/* 关键字 值 */
	box-sizing: content-box;
	box-sizing: border-box;
	
	/* 全局 值*/
	box-sizing: inherit;
	box-sizing: initial;
	box-sizing: unset;
```

`content-box` 默认值，标准盒子模型。`width`与`height`只包括内容的宽和高，不包括（`border`），内边距（`padding`），外边距（`margin`）。注意：内边距，边框&外边距都在这个盒子的外部。


`border-box` `width`与`height`属性包括内容，内边距和边框，但不包括外边距。这是当文档处于Quirks模式时Internet Explorer使用的盒子模型。注意：填充和边框将在盒子内。

#### 例子：

```Styles
	/* 支持Firefox, Chrome, Safari, Opera, IE8+ 和老的Android浏览器 */
	.example {   
		-moz-box-sizing: border-box;  
			  box-sizing: border-box;  
	}
```