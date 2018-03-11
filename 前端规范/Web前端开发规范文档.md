# Web前端开发规范文档

****

### 目录 Table of Contents

+ [规范目的](#user-content-规范目的)
+ [HTML书写规范](#user-content-html书写规范)
+ [CSS书写规范](#user-content-css书写规范)
+ [JavaScript书写规范](#user-content-javascript书写规范)
+ [编辑器配置](#user-content-ide编辑器配置)

### 黄金定律 

永远遵循同一套编码规范 -- 不管有多少人共同参与同一项目，一定要确保每一行代码都像是同一个人编写的。 

## HTML书写规范

#### 语法

+ 用四个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
+ 嵌套元素应当缩进一次（即四个空格）。
+ 对于属性的定义，确保全部使用双引号，绝不要使用单引号。
+ 不要在自闭合（self-closing）元素的尾部添加斜线 -- [HTML5 规范](https://dev.w3.org/html5/spec-author-view/syntax.html#syntax-start-tag)中明确说明这是可选的。
+ 不要省略可选的结束标签（closing tag）（例如，`</li>` 或 `</body>`）。

```HTML
<!DOCTYPE html>
<html lang="zh-cn">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Style Guide</title>
    <meta name="description" content="不超过150个字符">
    <meta name="keywords" content="">
    <meta name="author" content="name, email@gmail.com">

    <!-- 为移动设备添加 viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- IOS 图标 -->
    <link rel="apple-touch-icon-precomposed" href="/apple-touch-icon-57x57-precomposed.png">
    <link rel="shortcut icon" href="path/to/favicon.ico">
    
    <!-- Styles -->
    <link rel="stylesheet" href="path/to/style.css">
</head>
<body>
	<!-- wrapper -->
	<div class="wrap">
		<header>
			<h1>LOGO</h1>
			<nav></nav>
		</header>
		<aside>
			<ul class="side-menu">
				<li>
					<a href="javascript:;"></a>
				</li>
			</ul>
		</aside>
		<div></div>
		<footer></footer>
	</div>
	<!-- JavaScript -->
	<script src="example.js"></script>
</body>
</html>
```

#### HTML5 doctype

为每个 HTML 页面的第一行添加标准模式（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。  

```HTML
<!DOCTYPE html>
<html>
	<head>
	</head>
</html>
```

#### 语言属性

根据 HTML5 规范：

>	强烈建议为 html 根元素指定 lang 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。
>

更多关于 lang 属性的知识可以从[此规范](https://www.sitepoint.com/iso-2-letter-language-codes/) 中了解。

```HTML
<html lang="zh-cn">
  <!-- ... -->
</html>
```

#### IE 兼容模式

IE 支持通过特定的 `<meta>` 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 edge mode，从而通知 IE 采用其所支持的最新的模式。

[阅读这篇 stack overflow ](https://stackoverflow.com/questions/6771258/what-does-meta-http-equiv-x-ua-compatible-content-ie-edge-do)上的文章可以获得更多有用的信息。

```HTML
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

#### 字符编码

通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的渲染方式。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 UTF-8 编码）。

```HTML
<head>
  <meta charset="UTF-8">
</head>
```

#### 引入 CSS 和 JavaScript 文件

根据 `HTML5` 规范，在引入 `CSS` 和 `JavaScript` 文件时一般不需要指定 `type` 属性，因为 `text/css` 和 `text/javascript` 分别是它们的默认值。

```HTML
<head>
<!-- External CSS -->
<link rel="stylesheet" href="code-guide.css">

<!-- In-document CSS -->
<style>
  /* ... */
</style>
<head>

<body>
<!-- JavaScript -->
<script src="code-guide.js"></script>
</body>
```

引入`JS`库文件, 文件名须包含库名称及版本号及是否为压缩版, 比如：`jquery-3.2.1.min.js`; 引入插件, 文件名格式为库名称+插件名称, 比如：`jQuery.cookie.js`。

#### 实用为王

尽量遵循 HTML 标准和语义，但是不要以牺牲实用性为代价。任何时候都要尽量使用最少的标签并保持最小的复杂度。

#### 属性顺序

HTML 属性应当按照以下给出的顺序依次排列，确保代码的易读性。

+ `class`
+ `id`, `name`
+ `data-*`
+ `src`, `for`, `type`, `href`, `value`
+ `title`, `alt`
+ `role`, `aria-*`

class 用于标识高度可复用组件，因此应该排在首位。id 用于标识具体组件，应当谨慎使用（例如，页面内的书签），因此排在第二位。

```HTML
<a class="..." id="..." data-toggle="modal" href="#">
  Example link
</a>

<input class="form-control" type="text">

<img src="..." alt="...">
```

#### 布尔（boolean）型属性

布尔型属性可以在声明时不赋值。XHTML 规范要求为其赋值，但是 HTML5 规范不需要。

更多信息请参考 [WhatWG section on boolean attributes：](http://www.whatwg.org/specs/web-apps/current-work/multipage/common-microsyntaxes.html#boolean-attributes)

***元素的布尔型属性如果有值，就是 true，如果没有值，就是 false。***

如果一定要为其赋值的话，请参考 WhatWG 规范：

***如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要在首尾添加空白符。***

简单来说，就是不用赋值。

```HTML
<input type="text" disabled>

<input type="checkbox" value="1" checked>

<select>
  <option value="1" selected>1</option>
</select>
```

#### 减少标签的数量

编写 HTML 代码时，尽量避免多余的父元素。很多时候，这需要迭代和重构来实现。请看下面的案例：

```HTML
<!-- Not so great -->
<span class="avatar">
  <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

#### 避免重定向

书写链接地址时, 必须避免重定向，例如：`href="http://itaolun.com/"`, 即须在`URL`地址后面加上“/”

#### JavaScript 生成的标签

通过 JavaScript 生成的标签让内容变得不易查找、编辑，并且降低性能。能避免时尽量避免。

## CSS书写规范


#### 语法

+ 用四个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。
+ 为选择器分组时，将单独的选择器单独放在一行。
+ 为了代码的易读性，在每个声明块的左花括号前添加一个空格。
+ 声明块的右花括号应当单独成行。
+ 每条声明语句的`: `后应该插入一个空格。
+ 为了获得更准确的错误报告，每条声明都应该独占一行。
+ 所有声明语句都应当以分号结尾。最后一条声明语句后面的分号是可选的，但是，如果省略这个分号，你的代码可能更易出错。
+ 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，`box-shadow`）。
+ 不要在 `rgb()`、`rgba()`、`hsl()`、`hsla()` 或 `rect()` 值的内部的逗号后面插入空格。这样利于从多个属性值（既加逗号也加空格）中区分多个颜色值（只加逗号，不加空格）。
+ 对于属性值或颜色参数，省略小于 1 的小数前面的 0 （例如，.5 代替 0.5；-.5px 代替 -0.5px）。
+ 十六进制值应该全部小写，例如，`#fff`。在扫描文档时，小写字符易于分辨，因为他们的形式更易于区分。
+ 尽量使用简写形式的十六进制值，例如，用 `#fff` 代替 `#ffffff`。
+ 为选择器中的属性添加双引号，例如，`input[type="text"]`。只有在[某些情况下是可选的](https://mathiasbynens.be/notes/unquoted-attribute-values#css)，但是，为了代码的一致性，建议都加上双引号。
+ 避免为 0 值指定单位，例如，用 `margin: 0;` 代替 `margin: 0px;`。

```CSS
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

#### 声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

+ Positioning
+ margin
+ padding
+ Box model
+ Typographic
+ Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面。

完整的属性列表及其排列顺序请参考 [Recess](http://twitter.github.io/recess/)。

```CSS
.declaration-order {
	/* Positioning */
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 100;
	  
	/* Margin */
	margin-top: 0;
	margin-right: 0;
	margin-bottom: 0;
	margin-left: 0;
	
	/* Padding */
	padding-top: 0;
	padding-right: 0;
	padding-bottom: 0;
	padding-left: 0;
	
	/* Box-model */
	display: block;
	float: right;
	width: 100px;
	height: 100px;
	
	/* Typography */
	font: normal 13px "Helvetica Neue", sans-serif;
	line-height: 1.5;
	color: #333;
	text-align: center;
	
	/* Visual */
	background-color: #f5f5f5;
	border: 1px solid #e5e5e5;
	border-radius: 3px;
	
	/* Misc */
	opacity: 1;
}
```

#### 不要使用 `@import`

与 `<link>` 标签相比，`@import` 指令要慢很多，不光增加了额外的请求次数，还会导致不可预料的问题。替代办法有以下几种：

+ 使用多个 `<link>` 元素
+ 通过 `Sass` 或 `Less` 类似的 `CSS` 预处理器将多个 `CSS` 文件编译为一个文件
+ 通过 `Rails`、`Jekyll` 或其他系统中提供过 `CSS` 文件合并功能
+ 请参考 [Steve Souders](http://www.stevesouders.com/blog/2009/04/09/dont-use-import/) 的文章了解更多知识。

#### 媒体查询（Media query）的位置

将媒体查询放在尽可能相关规则的附近。不要将他们打包放在一个单一样式文件中或者放在文档底部。如果你把他们分开了，将来只会被大家遗忘。下面给出一个典型的实例。

```CSS
.element { ... }
.element-avatar { ... }
.element-selected { ... }

@media (min-width: 480px) {
  .element { ...}
  .element-avatar { ... }
  .element-selected { ... }
}
```

```CSS
<!-- Use link elements -->
<link rel="stylesheet" href="core.css">

<!-- Avoid @imports -->
<style>
  @import url("more.css");
</style>
```


#### CSS初始化

>
> 使用 `Normalize.css` 初始化样式,使浏览器统一样式。
> @url: `https://necolas.github.io/normalize.css/`
>

#### 带前缀的属性

当使用特定厂商的带有前缀的属性时，通过缩进的方式，让每个属性的值在垂直方向对齐，这样便于多行编辑。

在 Textmate 中，使用 **Text → Edit Each Line in Selection** (⌃⌘A)。在 Sublime Text 2 中，使用 **Selection → Add Previous Line** (⌃⇧↑) 和 **Selection → Add Next Line** (⌃⇧↓)。

```CSS
/* Prefixed properties */
.selector {
  -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
          box-shadow: 0 1px 2px rgba(0,0,0,.15);
}

```

#### 单行规则声明

对于**只包含一条声明**的样式，为了易读性和便于快速编辑，建议将语句放在同一行。对于带有多条声明的样式，还是应当将声明分为多行。

这样做的关键因素是为了错误检测 -- 例如，CSS 校验器指出在 183 行有语法错误。如果是单行单条声明，你就不会忽略这个错误；如果是单行多条声明的话，你就要仔细分析避免漏掉错误了。

```CSS
/* Single declarations on one line */
.span1 { width: 60px; }
.span2 { width: 140px; }
.span3 { width: 220px; }

/* Multiple declarations, one per line */
.sprite {
  display: inline-block;
  width: 16px;
  height: 15px;
  background-image: url(../img/sprite.png);
}
.icon           { background-position: 0 0; }
.icon-home      { background-position: 0 -20px; }
.icon-account   { background-position: 0 -40px; }
```

#### 简写形式的属性声明

在需要显示地设置所有值的情况下，应当尽量限制使用简写形式的属性声明。常见的滥用简写属性声明的情况如下：

+ `padding`
+ `margin`
+ `font`
+ `background`
+ `border`
+ `border-radius`

大部分情况下，我们不需要为简写形式的属性声明指定所有值。例如，HTML 的 heading 元素只需要设置上、下边距（margin）的值，因此，在必要的时候，只需覆盖这两个值就可以。过度使用简写形式的属性声明会导致代码混乱，并且会对属性值带来不必要的覆盖从而引起意外的副作用。

在 MDN（Mozilla Developer Network）上一篇非常好的关于[shorthand properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Shorthand_properties) 的文章，对于不太熟悉简写属性声明及其行为的用户很有用。

```CSS
/* Bad example */
.element {
  margin: 0 0 10px;
  background: red;
  background: url("image.jpg");
  border-radius: 3px 3px 0 0;
}

/* Good example */
.element {
  margin-bottom: 10px;
  background-color: red;
  background-image: url("image.jpg");
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
```

#### Less 和 Sass 中的嵌套

避免不必要的嵌套。这是因为虽然你可以使用嵌套，但是并不意味着应该使用嵌套。只有在必须将样式限制在父元素内（也就是后代选择器），并且存在多个需要嵌套的元素时才使用嵌套。

```CSS

// Without nesting
.table > thead > tr > th { … }
.table > thead > tr > td { … }

// With nesting
.table > thead > tr {
  > th { … }
  > td { … }
}

```

#### Less 和 Sass 中的操作符

为了提高可读性，在圆括号中的数学计算表达式的数值、变量和操作符之间均添加一个空格。

```CSS
// Bad example
.element {
  margin: 10px 0 @variable*2 10px;
}

// Good example
.element {
  margin: 10px 0 (@variable * 2) 10px;
}
```

#### 注释

代码是由人编写并维护的。请确保你的代码能够自描述、注释良好并且易于他人理解。好的代码注释能够传达上下文关系和代码目的。不要简单地重申组件或 class 名称。

对于较长的注释，务必书写完整的句子；对于一般性注解，可以书写简洁的短语。

```CSS
/* Bad example */
/* Modal header */
.modal-header {
  ...
}

/* Good example */
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
  ...
}
```

#### class 命名

+ class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，`.btn` 和 `.btn-danger`）。
+ 避免过度任意的简写。`.btn` 代表 button，但是 `.s` 不能表达任何意思。
+ class 名称应当尽可能短，并且意义明确。
+ 使用有意义的名称。使用有组织的或目的明确的名称，不要使用表现形式（presentational）的名称。
+ 基于最近的父 class 或基本（base） class 作为新 class 的前缀。
+ 使用 `.js-*` class 来标识行为（与样式相对），并且不要将这些 class 包含到 CSS 文件中。

在为 Sass 和 Less 变量命名时也可以参考上面列出的各项规范。

```CSS
/* Bad example */
.t { ... }
.red { ... }
.header { ... }

/* Good example */
.tweet { ... }
.important { ... }
.tweet-header { ... }
```

#### 选择器

+ 对于通用元素使用 class ，这样利于渲染性能的优化。
+ 对于经常出现的组件，避免使用属性选择器（例如，`[class^="..."]`）。浏览器的性能会受到这些因素的影响。
+ 选择器要尽可能短，并且尽量限制组成选择器的元素个数，建议不要超过 3 。
+ 只有在必要的时候才将 class 限制在最近的父元素内（也就是后代选择器）（例如，不使用带前缀的 class 时 -- 前缀类似于命名空间）。

扩展阅读：

+ [Scope CSS classes with prefixes](http://markdotto.com/2012/02/16/scope-css-classes-with-prefixes/)
+ [Stop the cascade](http://markdotto.com/2012/03/02/stop-the-cascade/)

```CSS
/* Bad example */
span { ... }
.page-container #stream .stream-item .tweet .tweet-header .username { ... }
.avatar { ... }

/* Good example */
.avatar { ... }
.tweet-header .username { ... }
.tweet .avatar { ... }
```

#### 代码组织

+ 以组件为单位组织代码段。
+ 制定一致的注释规范。
+ 使用一致的空白符将代码分隔成块，这样利于扫描较大的文档。
+ 如果使用了多个 CSS 文件，将其按照组件而非页面的形式分拆，因为页面会被重组，而组件只会被移动。

```CSS
/*
 * Component section heading
 */

.element { ... }


/*
 * Component section heading
 *
 * Sometimes you need to include optional context for the entire component. Do that up here if it's important enough.
 */

.element { ... }

/* Contextual sub-component or modifer */
.element-heading { ... }
```

## JavaScript书写规范

### 目录 Table of Contents

+ [类型](#type类型)
+ [引用](#references引用)
+ [对象](#objects对象)
+ [数组](#arrays)
+ [解构](#destructuring)
+ [字符串](#strings)
+ [函数](#functions)
+ [箭头函数](#arrow-functions)
+ [类 和 构造函数](#classes--constructors)
+ [模块](#modules)
+ [迭代器 和 生成器](#iterators-and-generators)
+ [属性](#properties)
+ [变量](#variables)
+ [提升](#hoisting)
+ [比较运算符 和 等号](#comparison-operators--equality)
+ [代码块](#blocks)
+ [控制语句](#control-statements)
+ [注释](#comments)
+ [空白](#whitespace)
+ [逗号](#commas)
+ [分号](#semicolons)
+ [类型转换](#type-casting--coercion)
+ [命名规则](#naming-conventions)
+ [存取器](#accessors)
+ [事件](#events)
+ [jQuery](#jquery)
+ [ECMAScript 5 兼容性](#ecmascript-5-compatibility)
+ [ECMAScript 6+ (ES 2015+) 编码风格](#ecmascript-6-es-2015-styles)
+ [标准库](#standard-library)
+ [测试](#testing)
+ [性能](#performance)
+ [相关资源](#resources)

用四个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。

#### Types类型

**基本类型:** 相当于传值(JavaScript对象都提供了字面量)，使用字面量创建对象。

+ `string`
+ `number`
+ `boolean`
+ `null`
+ `undefined`
+ `symbols`

+ `Symbols` 不能被完全 `polyfill`, 所以不应该在目标浏览器/环境不支持它们的情况下使用它们。

**复合类型:** 当你访问一个复合类型时，你需要引用它的值。

+ `Object`
+ `Array`
+ `Function`

#### References引用 

+ 对所有的引用使用 `const` ；不要使用 `var`。eslint: `prefer-const`, `no-const-assign`

> 为什么？ 这可以确保你无法对引用重新分配，重新分配可能会导致 bug 和难以理解的代码。

+ 如果你一定需要可变动的引用，使用 `let` 代替 `var`。eslint: `no-var` jscs: `disallowVar`

> 为什么？因为 `let` 是块级作用域，而 `var` 是函数作用域。

> 注意 `let` 和 `const` 都是块级作用域。


#### Objects对象

+ 使用字面量语法创建对象。 eslint: `no-new-object`
+ 当创建带有动态属性名称的对象时使用计算的属性名称。

> 为什么? 它们允许你在一个地方定义一个对象的所有属性。

+ 使用对象方法速记语法。 eslint: `object-shorthand` jscs: `requireEnhancedObjectLiterals`

```JavaScript
// bad
const atom = {
    value: 1,
 
    addValue: function (value) {
    return atom.value + value;
    },
};
 
// good
const atom = {
    value: 1,
 
    addValue(value) {
    return atom.value + value;
    },
};
```

+ 使用对象属性速记语法。eslint: `object-shorthand` jscs: `requireEnhancedObjectLiterals`

> 为什么？编写代码和描述更加简短。

```JavaScript
const lukeSkywalker = 'Luke Skywalker';
 
// bad
const obj = {
    lukeSkywalker: lukeSkywalker,
};
 
// good
const obj = {
    lukeSkywalker,
};
```

+ 将速记属性分组写在对象声明的开始处。

> 为什么?更容易看出哪些属性在使用速记语法。

```JavaScript
const anakinSkywalker = 'Anakin Skywalker';
const lukeSkywalker = 'Luke Skywalker';
 
// bad
const obj = {
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    lukeSkywalker,
    episodeThree: 3,
    mayTheFourth: 4,
    anakinSkywalker,
};
 
// good
const obj = {
    lukeSkywalker,
    anakinSkywalker,
    episodeOne: 1,
    twoJediWalkIntoACantina: 2,
    episodeThree: 3,
    mayTheFourth: 4,
};
```

+ 只用引号引无效标识符的属性。 eslint: `quote-props` jscs: `disallowQuotedKeysInObjects`

> 为什么?一般来说，我们认为比较容易阅读。它改进了语法高亮显示，并且更容易被许多JS引擎优化。

```JavaScript
// bad
const bad = {
    'foo': 3,
    'bar': 4,
    'data-blah': 5,
};
 
// good
const good = {
    foo: 3,
    bar: 4,
    'data-blah': 5,
};
```

+ 不要直接调用 `Object.prototype` 的方法，比如 `hasOwnProperty`, `propertyIsEnumerable`, 和 `isPrototypeOf`.

> 为什么？这些方法可能会被对象的属性所覆盖 – 比如 { hasOwnProperty: false } – 或者，对象可能是空( null )对象(Object.create(null))。

```JavaScript
// bad
console.log(object.hasOwnProperty(key));
 
// good
console.log(Object.prototype.hasOwnProperty.call(object, key));
 
// best
const has = Object.prototype.hasOwnProperty; // 在模块作用域内，缓存查找一次。
/* or */
import has from 'has';
// ...
console.log(has.call(object, key));
```

+ 用对象展开操作符浅复制对象，优先于`Object.assign` 。使用对象剩余操作符来获得一个省略某些属性的新对象。

```JavaScript
// very bad
const original = { a: 1, b: 2 };
const copy = Object.assign(original, { c: 3 }); //  `original` 是可变的 ಠ_ಠ
delete copy.a; // so does this
 
// bad
const original = { a: 1, b: 2 };
const copy = Object.assign({}, original, { c: 3 }); // copy => { a: 1, b: 2, c: 3 }
 
// good
const original = { a: 1, b: 2 };
const copy = { ...original, c: 3 }; // copy => { a: 1, b: 2, c: 3 }
 
const { a, ...noA } = copy; // noA => { b: 2, c: 3 }
```

#### Arrays数组 

+ 使用字面量创建数组。 eslint: `no-array-constructor`
+ 在向数组添加元素时使用 `Array#push` 替代直接赋值。

```JavaScript
const someStack = [];
 
// bad
someStack[someStack.length] = 'abracadabra';
 
// good
someStack.push('abracadabra');
```

+ 使用数组展开操作符 ... 复制数组。

```JavaScript
// bad
const len = items.length;
const itemsCopy = [];
let i;
 
for (i = 0; i < len; i += 1) {
    itemsCopy[i] = items[i];
}
 
// good
const itemsCopy = [...items];
```

+ 使用展开操作符 ... 代替 [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)，来将一个类数组(`array-like`) 对象转换成数组。

```JavaScript
const foo = document.querySelectorAll('.foo');
 
// good
const nodes = Array.from(foo);
 
// best
const nodes = [...foo];
```

+ 实用 `Array.from` 代替展开操作符 ... 来映射迭代，因为它避免了创建媒介数组。

```JavaScript
// bad
const baz = [...foo].map(bar);
 
// good
const baz = Array.from(foo, bar);
```

+ 在数组方法回调中使用 return 语句。如果函数体由一个返回无副作用的表达式的单个语句组成，那么可以省略返回值，查看8.2 说明。 eslint: `array-callback-return`

```JavaScript
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
 
// good
[1, 2, 3].map(x => x + 1);
 
// bad - 没有返回值意味着  `memo` 在第一次迭代后变成 undefined
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
    const flatten = memo.concat(item);
    memo[index] = flatten;
});
 
// good
[[0, 1], [2, 3], [4, 5]].reduce((memo, item, index) => {
    const flatten = memo.concat(item);
    memo[index] = flatten;
    return flatten;
});
 
// bad
inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
    } else {
    return false;
    }
});
 
// good
inbox.filter((msg) => {
    const { subject, author } = msg;
    if (subject === 'Mockingbird') {
    return author === 'Harper Lee';
    }
 
    return false;
});
```

+ 如果数组有多行，请在打开和关闭数组括号之前使用换行符。

```JavaScript
// bad
const arr = [
[0, 1], [2, 3], [4, 5],
];
 
const objectInArray = [{
id: 1,
}, {
id: 2,
}];
 
const numberInArray = [
1, 2,
];
 
// good
const arr = [[0, 1], [2, 3], [4, 5]];
 
const objectInArray = [
{
    id: 1,
},
{
    id: 2,
},
];
 
const numberInArray = [
1,
2,
];
```

#### Destructuring解构

+ 当访问和使用对象的多个属性时，请使用对象解构。eslint: `prefer-destructuring` jscs:  `requireObjectDestructuring`

> 为什么?解构可以在你建这些属性的临时引用时，为你节省时间。

```JavaScript
// bad
function getFullName(user) {
    const firstName = user.firstName;
    const lastName = user.lastName;
 
    return `${firstName} ${lastName}`;
}
 
// good
function getFullName(user) {
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
}
 
// best
function getFullName({ firstName, lastName }) {
    return `${firstName} ${lastName}`;
}
```

+ 使用数组解构。 eslint: `prefer-destructuring` jscs: `requireArrayDestructuring`

```JavaScript
const arr = [1, 2, 3, 4];
 
// bad
const first = arr[0];
const second = arr[1];
 
// good
const [first, second] = arr;
```

+ 使用对象解构来实现多个返回值，而不是数组解构。jscs: `disallowArrayDestructuringReturn`

> 为什么？ 您可以随着时间的推移添加新的属性或更改排序，而不会改变调用时的位置。

```JavaScript
// bad
function processInput(input) {
    // 那么奇迹发生了
    return [left, right, top, bottom];
}
 
// 调用者需要考虑返回数据的顺序
const [left, __, top] = processInput(input);
 
// good
function processInput(input) {
    // 那么奇迹发生了
    return { left, right, top, bottom };
}
 
// 调用者只选择他们需要的数据
const { left, top } = processInput(input);
```

#### Strings字符串

+ 字符串使用单引号 ''。 eslint: `quotes` jscs: `validateQuoteMarks`

```JavaScript
// bad
const name = "Capt. Janeway";
 
// bad - 模板字面量应该包含插值或换行符
const name = `Capt. Janeway`;
 
// good
const name = 'Capt. Janeway';
```

+ 超过100个字符，导致换行的字符串不应使用字符串连接符写成多行。

> 为什么？ 连接字符串是痛苦的工作，而且使代码不易于搜索。

```JavaScript
// bad
const errorMessage = 'This is a super long error that was thrown because \
of Batman. When you stop to think about how Batman had anything to do \
with this, you would get nowhere \
fast.';
 
// bad
const errorMessage = 'This is a super long error that was thrown because ' +
    'of Batman. When you stop to think about how Batman had anything to do ' +
    'with this, you would get nowhere fast.';
 
// good
const errorMessage = 'This is a super long error that was thrown because of Batman. When you stop to think about how Batman had anything to do with this, you would get nowhere fast.';
```

+ 以编程方式构建字符串时，请使用模板字符串而不是字符串连接。eslint: `prefer-template` `template-curly-spacing` jscs: `requireTemplateStrings`

> 为什么？ 模板字符串为你提供了更好的可读性，简洁的语法，正确的换行符和字符串插值功能。

```JavaScript
// bad
function sayHi(name) {
    return 'How are you, ' + name + '?';
}
 
// bad
function sayHi(name) {
    return ['How are you, ', name, '?'].join();
}
 
// bad
function sayHi(name) {
    return `How are you, ${ name }?`;
}
 
// good
function sayHi(name) {
    return `How are you, ${name}?`;
}
```

+ 永远不要在字符串上使用 `eval()` ，它会打开太多的漏洞。 eslint: `no-eval`
+ 不要转义字符串中不必要转义的字符。 eslint: `no-useless-escape`

> 为什么?反斜杠会破坏可读性，因此只有在必要时才转义。

```JavaScript
// bad
const foo = '\'this\' \i\s \"quoted\"';
 
// good
const foo = '\'this\' is "quoted"';
const foo = `my name is '${name}'`;
```

#### Functions函数

使用命名函数表达式而不是函数声明。 eslint: `func-style` jscs:  `disallowFunctionDeclarations`

>为什么？ 函数声明很容易被提升（Hoisting），你可以在函数被定义之前引用该函数。这对可读性和可维护性来说都是不利的。如果你发现一个函数的定义很大或很复杂，以至于妨碍了解文件的其他部分，那么也许是时候把它提取到自己的模块中去！不要忘记显式地命名表达式，不管该名称是否从包含变量中推断出来的（在现代浏览器中，或在使用编译器如Babel 时经常出现这种情况）。这消除了关于Error的调用堆栈的任何假设。

```JavaScript
// bad
function foo() {
    // ...
}
 
// bad
const foo = function () {
    // ...
};
 
// good 
// 用明显区别于变量引用调用的词汇命名
const short = function longUniqueMoreDescriptiveLexicalFoo() {
    // ...
};
```

+ 用圆括号包裹立即调用函数表达式 (IIFE)。 eslint: `wrap-iife` jscs: `requireParenthesesAroundIIFE`

> 为什么？一个立即调用函数表达式是一个单独的单元 – 将函数表达式包裹在括号中，后面再跟一个调用括号，这看上去很赶紧。请注意，在模块的世界中，你几乎不需要 IIFE。

+ 永远不要在一个非函数代码块（`if`、`while` 等）中声明一个函数，把那个函数赋给一个变量代替。浏览器允许你这么做，但是它们都以不同的方式解析。 eslint: `no-loop-func`

+ **注意：** ECMA-262 把 `block` 定义为一组语句。函数声明不是语句。

```JavaScript
// bad
if (currentUser) {
	function test() {
		console.log('Nope.');
	}
}
 
// good
let test;
if (currentUser) {
	test = () => {
		console.log('Yup.');
	};
}
```

+ 永远不要把参数命名为 `arguments`。这将会覆盖原来函数作用域内的 `arguments` 对象。

```JavaScript
// bad
function foo(name, options, arguments) {
    // ...
}
 
// good
function foo(name, options, args) {
    // ...
}
```

+ 不要使用 `arguments`。可以选择 `rest` 语法 ... 替代。eslint: `prefer-rest-params`

> 为什么？使用 ... 能明确你要传入的参数。另外 rest（剩余）参数是一个真正的数组，而  arguments 是一个类数组（Array-like）。

```JavaScript
// bad
function concatenateAll() {
    const args = Array.prototype.slice.call(arguments);
    return args.join('');
}
 
// good
function concatenateAll(...args) {
    return args.join('');
}
```

+ 使用默认参数语法，而不要使用一个变化的函数参数。

```JavaScript
// really bad
function handleThings(opts) {
    // 不！我们不应该改变函数参数。
    // 更加糟糕: 如果参数 opts 是 falsy(假值) 的话，它将被设置为一个对象，
    // 这可能是你想要的，但它可以引起一些小的错误。
    opts = opts || {};
    // ...
}
 
// still bad
function handleThings(opts) {
    if (opts === void 0) {
    opts = {};
    }
    // ...
}
 
// good
function handleThings(opts = {}) {
    // ...
}
```

+ 避免默认参数的副作用。

> 为什么？因为这样写会让人感到很困惑。

```JavaScript
var b = 1;
// bad
function count(a = b++) {
	console.log(a);
}
count();  // 1
count();  // 2
count(3); // 3
count();  // 3
```

+ 始终将默认参数放在最后。

```JavaScript
// bad
function handleThings(opts = {}, name) {
    // ...
}
 
// good
function handleThings(name, opts = {}) {
    // ...
}
```

+ 切勿使用 `Function` 构造函数来创建新函数。 eslint: `no-new-func`

> 为什么？ 以这种方式创建一个函数，与 eval() 类似，会对字符串求值，这会打开漏洞。

```JavaScript
// bad
var add = new Function('a', 'b', 'return a + b');
 
// still bad
var subtract = Function('a', 'b', 'return a - b');
```

+ 隔开函数签名，括号两边用空格隔开。 eslint: `space-before-function-paren` `space-before-blocks`

> 为什么？这样做有益代码的一致性，添加或删除函数名时不需要添加或删除空格。

```JavaScript
// bad
const f = function(){};
const g = function (){};
const h = function() {};
 
// good
const x = function () {};
const y = function a() {};
```

+ 不要改变参数。 eslint: `no-param-reassign`

> 为什么？操作作为参数传入的对象，可能会在调用原始对象时造成不必要的变量副作用。（愚人码头注：对象是引用类型）

```JavaScript
// bad
function fn(obj) {
    obj.key = 1;
}
 
// good
function fn(obj) {
    const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
}
```

+ 参数不要重新赋值。 eslint: `no-param-reassign`

> 为什么？ 重新分配参数可能会导致意外的行为，特别是在访问 `arguments` 对象时。它也可能导性能化问题，特别是在V8中。

```JavaScript
// bad
function f1(a) {
    a = 1;
    // ...
}
 
function f2(a) {
    if (!a) { a = 1; }
    // ...
}
 
// good
function f3(a) {
    const b = a || 1;
    // ...
}
 
function f4(a = 1) {
    // ...
}
```

+ 优先使用展开运算符 ... 来调用可变参数函数。 eslint: `prefer-spread`

> 为什么？ 它更清洁，你不需要提供一个上下文，而且你不能轻易地实用 `apply` 和 `new`。

```JavaScript
// bad
const x = [1, 2, 3, 4, 5];
console.log.apply(console, x);
 
// good
const x = [1, 2, 3, 4, 5];
console.log(...x);
 
// bad
new (Function.prototype.bind.apply(Date, [null, 2016, 8, 5]));
 
// good
new Date(...[2016, 8, 5]);
```

+ 具有多行签名或调用的函数，应该像本指南中的其他多行列表一样缩进：每一项都独占一行，最后一项上有一个尾逗号。

```JavaScript
// bad
function foo(bar,
                baz,
                quux) {
    // ...
}
 
// good
function foo(
    bar,
    baz,
    quux,
) {
    // ...
}
 
// bad
console.log(foo,
    bar,
    baz);
 
// good
console.log(
    foo,
    bar,
    baz,
);
```

#### Arrow Functions箭头函数 

+ 当您必须使用匿名函数（如在传递一个内联回调时），请使用箭头函数表示法。 eslint: `prefer-arrow-callback`, `arrow-spacing` jscs: `requireArrowFunctions`

> 为什么？ 它创建了一个在 this 上下文中执行的函数的版本，这通常是你想要的，而且这样的写法更为简洁。（愚人码头注：参考 [Arrow functions – JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) 和 [ES6 arrow functions, syntax and lexical scoping](https://toddmotto.com/es6-arrow-functions-syntaxes-and-lexical-scoping/)）

>为什么不？ 如果你有一个相当复杂的函数，你或许可以把逻辑部分转移到一个声明函数上。

```JavaScript
// bad
[1, 2, 3].map(function (x) {
    const y = x + 1;
    return x * y;
});
 
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
```

+ 如果函数体由一个返回无副作用(side effect)的[expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)(表达式)的单行语句组成，那么可以省略大括号并使用隐式返回。否则，保留大括号并使用 `return` 语句。eslint: `arrow-parens`,  `arrow-body-style` jscs: `disallowParenthesesAroundArrowParam`,  `requireShorthandArrowFunctions`

愚人码头注，什么是副作用(side effect)？一段代码，即在不需要的情况下，创建一个变量并在整个作用域内可用。

> 为什么？ 语法糖。 当多个函数链式调用时，可读性更高。

```JavaScript
// bad
[1, 2, 3].map(number => {
    const nextNumber = number + 1;
    `A string containing the ${nextNumber}.`;
});
 
// good
[1, 2, 3].map(number => `A string containing the ${number}.`);
 
// good
[1, 2, 3].map((number) => {
    const nextNumber = number + 1;
    return `A string containing the ${nextNumber}.`;
});
 
// good
[1, 2, 3].map((number, index) => ({
    [index]: number,
}));
 
// No implicit return with side effects
function foo(callback) {
    const val = callback();
    if (val === true) {
    // Do something if callback returns true
    }
}
 
let bool = false;
 
// bad
foo(() => bool = true);
 
// good
foo(() => {
    bool = true;
});
```

+ 如果表达式跨多行，将其包裹在括号中，可以提高可读性。

> 为什么？ 它清楚地显示了函数开始和结束的位置

```JavaScript
// bad
['get', 'post', 'put'].map(httpMethod => Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
    )
);
 
// good
['get', 'post', 'put'].map(httpMethod => (
    Object.prototype.hasOwnProperty.call(
    httpMagicObjectWithAVeryLongName,
    httpMethod,
    )
));
```

+ 如果你的函数只有一个参数并且不使用大括号，则可以省略参数括号。否则，为了清晰和一致性，总是给参数加上括号。  
**注意：**总是使用圆括号也是可以被lint工具接受的，在这种情况下 使用 eslint 的 “[always](https://eslint.org/docs/rules/arrow-parens#always)” 选项，或者 jscs 中不要包含 `disallowParenthesesAroundArrowParam` 选项。 eslint: `arrow-parens` jscs:  `disallowParenthesesAroundArrowParam`

> 为什么？ 不造成视觉上的混乱。

```JavaScript
// bad
[1, 2, 3].map((x) => x * x);
 
// good
[1, 2, 3].map(x => x * x);
 
// good
[1, 2, 3].map(number => (
    `A long string with the ${number}. It’s so long that we don’t want it to take up space on the .map line!`
));
 
// bad
[1, 2, 3].map(x => {
    const y = x + 1;
    return x * y;
});
 
// good
[1, 2, 3].map((x) => {
    const y = x + 1;
    return x * y;
});
```

+ 避免使用比较运算符(`&lt;=`, `&gt;=`)时，混淆箭头函数语法(`=&gt;`)。 eslint:  `no-confusing-arrow`

```JavaScript
// bad
const itemHeight = item => item.height > 256 ? item.largeSize : item.smallSize;
 
// bad
const itemHeight = (item) => item.height > 256 ? item.largeSize : item.smallSize;
 
// good
const itemHeight = item => (item.height > 256 ? item.largeSize : item.smallSize);
 
// good
const itemHeight = (item) => {
    const { height, largeSize, smallSize } = item;
    return height > 256 ? largeSize : smallSize;
};
```

#### Classes类 & Constructors构造函数

+ 总是使用 `class`。避免直接操作 `prototype`。

> 为什么? 因为 `class` 语法更为简洁更易读。

```JavaScript
// bad
function Queue(contents = []) {
    this.queue = [...contents];
}
Queue.prototype.pop = function () {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
};
 
// good
class Queue {
    constructor(contents = []) {
    	this.queue = [...contents];
    }
    pop() {
	    const value = this.queue[0];
	    this.queue.splice(0, 1);
	    return value;
    }
}
```

+ 使用 `extends` 继承。

> 为什么？因为 `extends` 是一个内置的原型继承方法并且不会破坏 `instanceof`。

```JavaScript
// bad
const inherits = require('inherits');
function PeekableQueue(contents) {
    Queue.apply(this, contents);
}

inherits(PeekableQueue, Queue);

PeekableQueue.prototype.peek = function () {
    return this.queue[0];
};
 
// good
class PeekableQueue extends Queue {
    peek() {
    return this.queue[0];
    }
}
```

方法可以返回 `this` 来帮助链式调用。

```JavaScript
// bad
Jedi.prototype.jump = function () {
    this.jumping = true;
    return true;
};
 
Jedi.prototype.setHeight = function (height) {
    this.height = height;
};
 
const luke = new Jedi();
luke.jump(); // => true
luke.setHeight(20); // => undefined
 
// good
class Jedi {
    jump() {
	    this.jumping = true;
	    return this;
    }
 
    setHeight(height) {
	    this.height = height;
	    return this;
    }
}
 
const luke = new Jedi();
 
luke.jump()
    .setHeight(20);
```

+ 可以写一个自定义的 toString() 方法，但要确保它能正常运行并且不会引起副作用。

```JavaScript
class Jedi {
    constructor(options = {}) {
    	this.name = options.name || 'no name';
    }
 
    getName() {
    	return this.name;
    }
 
    toString() {
    	return `Jedi - ${this.getName()}`;
    }
}
```

+ 如果没有指定，类有一个默认的构造函数。一个空的构造函数或者只是委托给父类则不是必须的。 eslint: `no-useless-constructor`

```JavaScript
// bad
class Jedi {
    constructor() {}
 
    getName() {
    	return this.name;
    }
}
 
// bad
class Rey extends Jedi {
    constructor(...args) {
    	super(...args);
    }
}
 
// good
class Rey extends Jedi {
    constructor(...args) {
	    super(...args);
	    this.name = 'Rey';
    }
}
```

+ 避免重复类成员。 eslint: `no-dupe-class-members`

> 为什么？ 重复类成员声明将默认使用最后一个 – 重复类成员几乎肯定是一个错误。

```JavaScript
// bad
class Foo {
    bar() { return 1; }
    bar() { return 2; }
}
 
// good
class Foo {
    bar() { return 1; }
}
 
// good
class Foo {
    bar() { return 2; }
}
```

#### Modules模块

+ 总是使用模块 (`import`/`export`) 而不是其他非标准模块系统。你可以编译为你喜欢的模块系统。

> 为什么？模块就是未来，让我们开始迈向未来吧。

```JavaScript
// bad
const AirbnbStyleGuide = require('./AirbnbStyleGuide');
module.exports = AirbnbStyleGuide.es6;
 
// ok
import AirbnbStyleGuide from './AirbnbStyleGuide';
export default AirbnbStyleGuide.es6;
 
// best
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

+ 不要使用通配符 `import`(导入)。

> 为什么？这样能确保你只有一个默认 export(导出)。

```JavaScript
// bad
import * as AirbnbStyleGuide from './AirbnbStyleGuide';
 
// good
import AirbnbStyleGuide from './AirbnbStyleGuide';
```

+ 不要从 `import`(导入) 中直接 `export`(导出)。

> 为什么？虽然一行代码简洁明了，但有一个明确的 import(导入) 方法和一个明确的 export(导出) 方法，使事情能保持一致。


```JavaScript
// bad
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide';
 
// good
// filename es6.js
import { es6 } from './AirbnbStyleGuide';
export default es6;
```

+ 一个地方只在一个路径中 `import`(导入) 。  
eslint: `no-duplicate-imports`

> 为什么？ 从同一路径 import(导入) 多个模块分散在多行代码中，可能会使代码难以维护。

```JavaScript
// bad
import foo from 'foo';
// … 其他一些 imports … //
import { named1, named2 } from 'foo';
 
// good
import foo, { named1, named2 } from 'foo';
 
// good
import foo, {
    named1,
    named2,
} from 'foo';
```

+ 不要 `export`(导出) 可变绑定。eslint: `import/no-mutable-exports`

> 为什么？ 一般应该避免可变性，特别是在导出可变绑定时。虽然一些特殊情况下，可能需要这种技术，但是一般而言，只应该导出常量引用。

```JavaScript
// bad
let foo = 3;
export { foo };
 
// good
const foo = 3;
export { foo };
```

+ 在只有单个导出的模块中，默认 export(导出) 优于命名 `export`(导出)。eslint: `import/prefer-default-export`

> 为什么？为了鼓励更多的文件只有一个 export(导出)，这有利于模块的可读性和可维护性。

```JavaScript
// bad
export function foo() {}
 
// good
export default function foo() {}
```

+ 将所有 import 导入放在非导入语句的上面。eslint: `import/first`

> 由于 `import` 被提升，保持他们在顶部，防止意外的行为。

```JavaScript
// bad
import foo from 'foo';
foo.init();
 
import bar from 'bar';
 
// good
import foo from 'foo';
import bar from 'bar';
 
foo.init();
```

+ 多行导入应该像多行数组和对象字面量一样进行缩进。

> 为什么？ 花括号应遵循与编码风格指南中的每个其他花括号相同的缩进规则，末尾的逗号也一样。

```JavaScript
// bad
import {longNameA, longNameB, longNameC, longNameD, longNameE} from 'path';
 
// good
import {
    longNameA,
    longNameB,
    longNameC,
    longNameD,
    longNameE,
} from 'path';
```

+ 禁止在模块 `import`(导入) 语句中使用 `Webpack` 加载器语法。
eslint: `import/no-webpack-loader-syntax`

> 为什么？由于在 `import`(导入) 中使用 `Webpack` 语法会将代码耦合到模块打包器。 首选在  `webpack.config.js` 中使用加载器语法。

```JavaScript
// bad
import fooSass from 'css!sass!foo.scss';
import barCss from 'style!css!bar.css';
 
// good
import fooSass from 'foo.scss';
import barCss from 'bar.css';
```

### Iterators迭代器 和 Generators生成器

+ 不要使用 iterators（迭代器） 。请使用高阶函数，例如 `map()` 和 `reduce()` 等，而不是像  `for-in` 或 `for-of` 这样的循环。 eslint: `no-iterator` `no-restricted-syntax`

> 为什么？ 这是强制执行我们不变性的规则。 处理返回值的纯函数比 Side Effects(副作用) 更容易推理。

> 使用 `map()` / `every()` / `filter()` / `find()` / `findIndex()` / `reduce()` / `some()` / … 来迭代数组, 使用 `Object.keys()` / `Object.values()` / `Object.entries()` 来生成数组，以便可以迭代对象。

```JavaScript
const numbers = [1, 2, 3, 4, 5];
 
// bad
let sum = 0;
for (let num of numbers) {
    sum += num;
}
sum === 15;
 
// good
let sum = 0;
numbers.forEach((num) => {
    sum += num;
});
sum === 15;
 
// best (use the functional force)
const sum = numbers.reduce((total, num) => total + num, 0);
sum === 15;
 
// bad
const increasedByOne = [];
for (let i = 0; i < numbers.length; i++) { increasedByOne.push(numbers[i] + 1); } // good const increasedByOne = []; numbers.forEach((num) => {
    increasedByOne.push(num + 1);
});
 
// best (keeping it functional)
const increasedByOne = numbers.map(num => num + 1);
```

+ 现在不要使用 `generators` (生成器)。

> 为什么？ 因为目前没有很好地办法将他们转译成 ES5 。

+ 如果您必须使用 `generators` (生成器)，或者如果漠视我们的建议，请确保它们的函数签名恰当的间隔。 eslint: `generator-star-spacing`

> 为什么？ `function` 和 `*` 都是同一概念关键字的组成部分 – `*` 不是 `function` 的修饰符，`function*` 是一个独特的构造，与function不同。

```JavaScript
// bad
function * foo() {
    // ...
}
 
// bad
const bar = function * () {
    // ...
};
 
// bad
const baz = function *() {
    // ...
};
 
// bad
const quux = function*() {
    // ...
};
 
// bad
function*foo() {
    // ...
}
 
// bad
function *foo() {
    // ...
}
 
// very bad
function
*
foo() {
    // ...
}
 
// very bad
const wat = function
*
() {
    // ...
};
 
// good
function* foo() {
    // ...
}
 
// good
const foo = function* () {
    // ...
};
```

#### Properties属性

+ 使用 点语法(.) 来访问对象的属性。 eslint: `dot-notation` jscs: `requireDotNotation`

```JavaScript
const luke = {
    jedi: true,
    age: 28,
};
 
// bad
const isJedi = luke['jedi'];
 
// good
const isJedi = luke.jedi;
```

+ 当通过变量访问属性时使用中括号 `[]`。

```JavaScript
const luke = {
    jedi: true,
    age: 28,
};
 
function getProp(prop) {
    return luke[prop];
}
 
const isJedi = getProp('jedi');
```

+ 求幂时使用求幂运算符 `**` 。eslint: `no-restricted-properties`.

```JavaScript
// bad
const binary = Math.pow(2, 10);
 
// good
const binary = 2 ** 10;

```

#### Variables变量

+ 总是使用 `const` 或 `let` 来声明变量。 不这样做会导致产生全局变量。 我们希望避免污染全局命名空间。 eslint: `no-undef prefer-const`

```JavaScript
// bad
superPower = new SuperPower();
 
// good
const superPower = new SuperPower();
```

+ 使用 `const` 或 `let`声明每个变量。 eslint: `one-var` jscs: `disallowMultipleVarDecl`

> 为什么？ 以这种方式添加新的变量声明更容易，你永远不必担心是否需要将 `,` 换成 `;`，或引入标点符号差异。您也可以在调试器中遍历每个声明，而不是一次跳过所有的变量。

```JavaScript
// bad
const items = getItems(),
    goSportsTeam = true,
    dragonball = 'z';
 
// bad
// (与上面的比较，并尝试找出错误)
const items = getItems(),
    goSportsTeam = true;
    dragonball = 'z';
 
// good
const items = getItems();
const goSportsTeam = true;
const dragonball = 'z';
```

+ 将所有的 `const` 和 `let` 分组 。

> 为什么？当你需要把已分配的变量分配给一个变量时非常有用。

```JavaScript
// bad
let i, len, dragonball,
    items = getItems(),
    goSportsTeam = true;
 
// bad
let i;
const items = getItems();
let dragonball;
const goSportsTeam = true;
let len;
 
// good
const goSportsTeam = true;
const items = getItems();
let dragonball;
let i;
let length;
```

+ 在你需要的地方分配变量，但请把它们放在一个合理的位置。

> 为什么？`let` 和 `const` 是块级作用域而不是函数作用域。

```JavaScript
// bad - 不必要的函数调用
function checkName(hasName) {
    const name = getName();
 
    if (hasName === 'test') {
    return false;
    }
 
    if (name === 'test') {
    this.setName('');
    return false;
    }
 
    return name;
}
 
// good
function checkName(hasName) {
    if (hasName === 'test') {
    return false;
    }
 
    const name = getName();
 
    if (name === 'test') {
    this.setName('');
    return false;
    }
 
    return name;
}
```

+ 变量不要链式赋值。eslint: `no-multi-assign`

> 为什么？ 链接变量赋值会创建隐式全局变量。

```JavaScript
// bad
(function example() {
    // JavaScript 将其解析为
    // let a = ( b = ( c = 1 ) );
    // let关键字只适用于变量a;
    // 变量b和c变成了全局变量。
    let a = b = c = 1;
}());
 
console.log(a); // 抛出 ReferenceError（引用错误）
console.log(b); // 1
console.log(c); // 1
 
// good
(function example() {
    let a = 1;
    let b = a;
    let c = a;
}());
 
console.log(a); // 抛出 ReferenceError（引用错误）
console.log(b); // 抛出 ReferenceError（引用错误）
console.log(c); // 抛出 ReferenceError（引用错误）
 
// 同样适用于 `const`
```

+ 避免使用一元递增和递减运算符(`++`, `--`)。 eslint `no-plusplus`

> 为什么？ 根据 eslint 文档，一元递增和递减语句会受到自动插入分号的影响，并可能导致应用程序中的值递增或递减，从而导致无提示错误。使用像 `num += 1` 而不是 `num++` 或 `num ++` 这样的语句来改变你的值也更具有表现力。不允许一元递增和递减语句也会阻止您无意中预先递增/递减值，这也会导致程序中的意外行为。

```JavaScript
// bad
 
const array = [1, 2, 3];
let num = 1;
num++;
--num;
 
let sum = 0;
let truthyCount = 0;

for (let i = 0; i < array.length; i++) {
	let value = array[i]; 
	
	sum += value; 
	if (value) { 
		truthyCount++; 
	} 
} 

// good 

const array = [1, 2, 3]; 
let num = 1; 
num += 1; 
num -= 1; 

const sum = array.reduce((a, b) => a + b, 0);
const truthyCount = array.filter(Boolean).length;
```

#### Hoisting

+ `var` 声明会被提升至他们作用域的顶部，但它们赋值不会提升。`let` 和 `const` 声明被赋予了一种称为「暂时性死区（[Temporal Dead Zones, TDZ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#Temporal_dead_zone_and_errors_with_let)）」的概念。这对于了解为什么 type of 不再安全相当重要。

```JavaScript
// 我们知道这样运行不了
// （假设没有 notDefined 全局变量）
function example() {
    console.log(notDefined); // => 抛出一个 ReferenceError（引用错误）
}
 
// 在引用变量后创建变量声明
// 将因变量提升而起作用。
// 注意：赋值的 `true`没有被提升。
function example() {
    console.log(declaredButNotAssigned); // => undefined
    var declaredButNotAssigned = true;
}
 
// 解析器将变量声明提升到作用域的顶部，
// 这意味着我们的例子可以被重写为：
function example() {
    let declaredButNotAssigned;
    console.log(declaredButNotAssigned); // => undefined
    declaredButNotAssigned = true;
}
 
// 使用 const 和 let
function example() {
    console.log(declaredButNotAssigned); // => 抛出一个 ReferenceError（引用错误）
    console.log(typeof declaredButNotAssigned); // => 抛出一个 ReferenceError（引用错误）
    const declaredButNotAssigned = true;
}
```

+ 匿名函数表达式的变量名会被提升，但函数分配不会。

```JavaScript
function example() {
    console.log(anonymous); // => undefined
 
    anonymous(); // => TypeError anonymous is not a function 输入错误，anonymous 不是一个函数
 
    var anonymous = function () {
    console.log('anonymous function expression');
    };
}
```

+ 命名的函数表达式的变量名会被提升，但函数名和函数体并不会。

```JavaScript
function example() {
    console.log(named); // => undefined
 
    named(); // => TypeError named is not a function，输入错误，named 不是一个函数
 
    superPower(); // => ReferenceError superPower is not defined， ReferenceError（引用错误）superPower 未定义
 
    var named = function superPower() {
    console.log('Flying');
    };
}
 
// 当函数名称与变量名称相同时
// 也是如此。
function example() {
    console.log(named); // => undefined
 
    named(); // => TypeError named is not a function，输入错误，named 不是一个函数
 
    var named = function named() {
    console.log('named');
    };
}
```

+ 函数声明的名称和函数体都会被提升。

```JavaScript
function example() {
    superPower(); // => Flying
 
    function superPower() {
    console.log('Flying');
    }
}
```

#### Comparison Operators比较运算符  和 Equality等号

+ 使用 `===` 和 `!==` 优先于 `==` 和 `!=`。 eslint: `eqeqeq`
+ 诸如 if 语句之类的条件语句使用 ToBoolean 抽象方法来强制求值它们的表达式，并始终遵循以下简单规则：
	+ **Objects** 求值为 true
	+ **Undefined** 求值为 false
	+ **Null** 求值为 false
	+ **Booleans** 求值为 布尔值
	+ **Numbers** 如果是 +0、-0、或 NaN 求值为 false ， 否则为 true
	+ **Strings** 如果是空字符串 '' 求值为 false ， 否则为 true 

```JavaScript
if ([0] && []) {
    // true
    // 一个数组 (即使是一个空数组) 是一个 object, objects 被求值为 true
}
```

+ 对于布尔值使用简写，但对于字符串和数字使用显式比较。

```JavaScript
// bad
if (isValid === true) {
    // ...
}
 
// good
if (isValid) {
    // ...
}
 
// bad
if (name) {
    // ...
}
 
// good
if (name !== '') {
    // ...
}
 
// bad
if (collection.length) {
    // ...
}
 
// good
if (collection.length > 0) {
    // ...
}
```

+ 在 `case` 和 `default` 子句中，使用大括号来创建包含词法声明的语句块(例如 `let`,  `const`, `function`, 和 `class`). eslint: `no-case-declarations`

> 为什么？ 词法声明在整个 `switch` 语句块中都是可见的，但是只有在分配时才被初始化，这只有当它到达 `case` 时才会发生。这在多个 `case` 子句试图定义相同的变量时会导致问题。

```JavaScript
// bad
switch (foo) {
    case 1:
	    let x = 1;
	    break;
    case 2:
	    const y = 2;
	    break;
    case 3:
	    function f() {
	        // ...
	    }
	    break;
    default:
    	class C {}
}
 
// good
switch (foo) {
    case 1: {
	    let x = 1;
	    break;
    }
    case 2: {
	    const y = 2;
	    break;
    }
    case 3: {
	    function f() {
	        // ...
	    }
	    break;
    }
    case 4:
	    bar();
	    break;
    default: {
    	class C {}
    }
}
```

+ 三元表达式不应该嵌套，通常写成单行表达式。 eslint: `no-nested-ternary`

```JavaScript
// bad
const foo = maybe1 > maybe2
    ? "bar"
    : value1 > value2 ? "baz" : null;
 
// 拆分成2个分离的三元表达式
const maybeNull = value1 > value2 ? 'baz' : null;
 
// better
const foo = maybe1 > maybe2
    ? 'bar'
    : maybeNull;
 
// best
const foo = maybe1 > maybe2 ? 'bar' : maybeNull;
```

+ 避免不必要的三元表达式语句。 eslint: `no-unneeded-ternary`

```JavaScript
// bad
const foo = a ? a : b;
const bar = c ? true : false;
const baz = c ? false : true;
 
// good
const foo = a || b;
const bar = !!c;
const baz = !c;
```

+ 当运算符混合在一个语句中时，请将其放在括号内。混合算术运算符时，不要将 `**` 和 `%` 与  `+` ， `-`，`*`，`/` 混合在一起。eslint: `no-mixed-operators`

> 为什么？ 这可以提高可读性，并清晰展现开发者的意图。

```JavaScript
// bad
const foo = a && b < 0 || c > 0 || d + 1 === 0;
 
// bad
const bar = a ** b - 5 % d;
 
// bad
if (a || b && c) {
    return d;
}
 
// good
const foo = (a && b < 0) || c > 0 || (d + 1 === 0);
 
// good
const bar = (a ** b) - (5 % d);
 
// good
if ((a || b) && c) {
    return d;
}
 
// good
const bar = a + b / c * d;
```

#### Blocks代码块

+ 使用大括号包裹所有的多行代码块。 eslint: `nonblock-statement-body-position`

```JavaScript
// bad
if (test)
    return false;
 
// good
if (test) return false;
 
// good
if (test) {
    return false;
}
 
// bad
function foo() { return false; }
 
// good
function bar() {
    return false;
}
```

+ 如果通过 `if` 和 `else` 使用多行代码块，把 `else` 放在 `if` 代码块闭合括号的同一行。eslint: `brace-style` jscs: `disallowNewlineBeforeBlockStatements`

```JavaScript
// bad
if (test) {
    thing1();
    thing2();
}
else {
    thing3();
}
 
// good
if (test) {
    thing1();
    thing2();
} else {
    thing3();
}
```

+ 如果一个 `if` 块总是执行一个 `return` 语句，后面的 `else` 块是不必要的。在 `else if` 块中的 `return`，可以分成多个 `if` 块来 `return` 。eslint: `no-else-return`

```JavaScript
// bad
function foo() {
    if (x) {
    return x;
    } else {
    return y;
    }
}
 
// bad
function cats() {
    if (x) {
    return x;
    } else if (y) {
    return y;
    }
}
 
// bad
function dogs() {
    if (x) {
    return x;
    } else {
    if (y) {
        return y;
    }
    }
}
 
// good
function foo() {
    if (x) {
    return x;
    }
 
    return y;
}
 
// good
function cats() {
    if (x) {
    return x;
    }
 
    if (y) {
    return y;
    }
}
 
//good
function dogs(x) {
    if (x) {
    if (z) {
        return y;
    }
    } else {
    return z;
    }
}
```

#### Control Statements控制语句 

+ 如果您的控制语句(`if`, `while` 的)太长或超过最大行长度，那么每个（分组）条件可以放单独一行。逻辑运算符应该放在每行起始处。

> 为什么？ 在每行起始处要求运算符可以使运算符保持一致，并遵循与方法链式调用类似的模式。这样可以使复杂逻辑更易于查看，以提高可读性。

```JavaScript
// bad
if ((foo === 123 || bar === 'abc') && doesItLookGoodWhenItBecomesThatLong() && isThisReallyHappening()) {
    thing1();
}
 
// bad
if (foo === 123 &&
    bar === 'abc') {
    thing1();
}
 
// bad
if (foo === 123
    && bar === 'abc') {
    thing1();
}
 
// bad
if (
    foo === 123 &&
    bar === 'abc'
) {
    thing1();
}
 
// good
if (
    foo === 123
    && bar === 'abc'
) {
    thing1();
}
 
// good
if (
    (foo === 123 || bar === "abc")
    && doesItLookGoodWhenItBecomesThatLong()
    && isThisReallyHappening()
) {
    thing1();
}
 
// good
if (foo === 123 && bar === 'abc') {
    thing1();
}
```

#### Comments注释

+ 多行注释使用 `/** ... */`。

```JavaScript
// bad
// make() returns a new element
// based on the passed in tag name
//
// @param {String} tag
// @return {Element} element
function make(tag) {
 
    // ...
 
    return element;
}
 
// good
/**
    * make() returns a new element
    * based on the passed-in tag name
    */
function make(tag) {
 
    // ...
 
    return element;
}
```

+ 单行注释使用 `//` 。将单行注释放在续注释的语句上方。在注释之前放置一个空行，除非它位于代码块的第一行。

```JavaScript
// bad
const active = true;  // is current tab
 
// good
// is current tab
const active = true;
 
// bad
function getType() {
    console.log('fetching type...');
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
 
// good
function getType() {
    console.log('fetching type...');
 
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
 
// also good
function getType() {
    // set the default type to 'no type'
    const type = this.type || 'no type';
 
    return type;
}
```

+ 所有注释符和注释内容用一个空格隔开，让它更容易阅读。 eslint: `spaced-comments`

```JavaScript
// bad
//is current tab
const active = true;
 
// good
// is current tab
const active = true;
 
// bad
/**
    *make() returns a new element
    *based on the passed-in tag name
    */
function make(tag) {
 
    // ...
 
    return element;
}
 
// good
/**
    * make() returns a new element
    * based on the passed-in tag name
    */
function make(tag) {
 
    // ...
 
    return element;
}
```

+ 给注释增加 `FIXME` 或 `TODO` 的前缀，可以帮助其他开发者快速了解这个是否是一个需要重新复查的问题，或是你正在为需要解决的问题提出解决方案。这将有别于常规注释，因为它们是可操作的。使用 FIXME -- `need to figure this out` 或者 TODO -- `need to implement`。
+ 使用 `// FIXME:` 来标识需要修正的问题。愚人码头注：如果代码中有该标识，说明标识处代码需要修正，甚至代码是错误的，不能工作，需要修复，如何修正会在说明中简略说明。

```JavaScript
class Calculator extends Abacus {
    constructor() {
    super();
 
    // FIXME: shouldn’t use a global here
    total = 0;
    }
}
```

+ 使用 `// TODO:` 来标识需要实现的问题。愚人码头注：如果代码中有该标识，说明在标识处有功能代码待编写，待实现的功能在说明中会简略说明。

```JavaScript
class Calculator extends Abacus {
    constructor() {
    super();
 
    // TODO: total should be configurable by an options param
    this.total = 0;
    }
}
```

**注：** 还有 **// XXX:** 注释，如果代码中有该标识，说明标识处代码虽然实现了功能，但是实现的方法有待商榷，希望将来能改进，要改进的地方会在说明中简略说明。部分 IDE 有这些注释的收集视图，例如任务（task）视图，TODO视图等，在项目发布前，检查一下任务视图是一个很好的习惯。

#### Whitespace空白

+ 使用 4 个空格作为缩进。 eslint: `indent` jscs: `validateIndentation`

```JavaScript
// bad
function foo() {
	∙∙∙∙let name;
}
 
// bad
function bar() {
	∙let name;
}
 
// good
function baz() {
	∙∙let name;
}
```

+ 在大括号前放置 1 个空格。eslint: `space-before-blocks` jscs:  `requireSpaceBeforeBlockStatements`

```JavaScript
// bad
function test(){
    console.log('test');
}
 
// good
function test() {
    console.log('test');
}
 
// bad
dog.set('attr',{
    age: '1 year',
    breed: 'Bernese Mountain Dog',
});
 
// good
dog.set('attr', {
    age: '1 year',
    breed: 'Bernese Mountain Dog',
});
```

+ 在控制语句（`if`、`while` 等）的小括号前放一个空格。在函数调用及声明中，不在函数的参数列表前加空格。 eslint: `keyword-spacing` jscs: `requireSpaceAfterKeywords`

```JavaScript
// bad
if(isJedi) {
    fight ();
}
 
// good
if (isJedi) {
    fight();
}
 
// bad
function fight () {
    console.log ('Swooosh!');
}
 
// good
function fight() {
    console.log('Swooosh!');
}
```

+ 使用空格把运算符隔开。 eslint: `space-infix-ops` jscs:  `requireSpaceBeforeBinaryOperators`, `requireSpaceAfterBinaryOperators`

```JavaScript
// bad
const x=y+5;
 
// good
const x = y + 5;
```

+ 在文件末尾插入一个空行。 eslint: `eol-last`

```JavaScript
// bad
import { es6 } from './AirbnbStyleGuide';
    // ...
export default es6;
```

```JavaScript
// bad
import { es6 } from './AirbnbStyleGuide';
    // ...
export default es6;↵
↵
```

```JavaScript
// good
import { es6 } from './AirbnbStyleGuide';
    // ...
export default es6;↵
```

+ 长方法链式调用时使用缩进（2个以上的方法链式调用）。使用一个点 `.` 开头，强调该行是一个方法调用，不是一个新的声明。eslint: `newline-per-chained-call` `no-whitespace-before-property`

```JavaScript
// bad
$('#items').find('.selected').highlight().end().find('.open').updateCount();
 
// bad
$('#items').
    find('.selected').
    highlight().
    end().
    find('.open').
    updateCount();
 
// good
$('#items')
    .find('.selected')
    .highlight()
    .end()
    .find('.open')
    .updateCount();
 
// bad
const leds = stage.selectAll('.led').data(data).enter().append('svg:svg').classed('led', true)
    .attr('width', (radius + margin) * 2).append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);
 
// good
const leds = stage.selectAll('.led')
    .data(data)
    .enter().append('svg:svg')
    .classed('led', true)
    .attr('width', (radius + margin) * 2)
    .append('svg:g')
    .attr('transform', `translate(${radius + margin},${radius + margin})`)
    .call(tron.led);
 
// good
const leds = stage.selectAll('.led').data(data);
```

+ 在语句块后和下条语句前留一个空行。jscs: `requirePaddingNewLinesAfterBlocks`

```JavaScript
// bad
if (foo) {
    return bar;
}
return baz;
 
// good
if (foo) {
    return bar;
}
 
return baz;
 
// bad
const obj = {
    foo() {
    },
    bar() {
    },
};
return obj;
 
// good
const obj = {
    foo() {
    },
 
    bar() {
    },
};
 
return obj;
 
// bad
const arr = [
    function foo() {
    },
    function bar() {
    },
];
return arr;
 
// good
const arr = [
    function foo() {
    },
 
    function bar() {
    },
];
 
return arr;
```

+ 不要用空行来填充块。 eslint: `padded-blocks` jscs: `disallowPaddingNewlinesInBlocks`

```JavaScript
// bad
function bar() {
 
    console.log(foo);
 
}
 
// bad
if (baz) {
 
    console.log(qux);
} else {
    console.log(foo);
 
}
 
// bad
class Foo {
 
    constructor(bar) {
    this.bar = bar;
    }
}
 
// good
function bar() {
    console.log(foo);
}
 
// good
if (baz) {
    console.log(qux);
} else {
    console.log(foo);
}
```

+ 不要在圆括号内加空格。 eslint: `space-in-parens` jscs: `disallowSpacesInsideParentheses`

```JavaScript
// bad
function bar( foo ) {
    return foo;
}
 
// good
function bar(foo) {
    return foo;
}
 
// bad
if ( foo ) {
    console.log(foo);
}
 
// good
if (foo) {
    console.log(foo);
}
```

+ 不要在中括号内添加空格。 eslint: `array-bracket-spacing` jscs:  `disallowSpacesInsideArrayBrackets`

```JavaScript
// bad
const foo = [ 1, 2, 3 ];
console.log(foo[ 0 ]);
 
// good
const foo = [1, 2, 3];
console.log(foo[0]);
```

+ 在大括号内添加空格。 eslint: `object-curly-spacing` jscs:  `requireSpacesInsideObjectBrackets`

```Javascript
// bad
const foo = {clark: 'kent'};
 
// good
const foo = { clark: 'kent' };
```

+ 避免有超过100个字符（包括空格）的代码行。注意：根据上面的规则，长字符串可以免除这个规则，不应该被破坏。eslint: `max-len` jscs: `maximumLineLength`

> 为什么？ 这可以确保可读性和可维护性。

```JavaScript
// bad
const foo = jsonData && jsonData.foo && jsonData.foo.bar && jsonData.foo.bar.baz && jsonData.foo.bar.baz.quux && jsonData.foo.bar.baz.quux.xyzzy;
 
// bad
$.ajax({ method: 'POST', url: 'https://airbnb.com/', data: { name: 'John' } }).done(() => console.log('Congratulations!')).fail(() => console.log('You have failed this city.'));
 
// good
const foo = jsonData
    && jsonData.foo
    && jsonData.foo.bar
    && jsonData.foo.bar.baz
    && jsonData.foo.bar.baz.quux
    && jsonData.foo.bar.baz.quux.xyzzy;
 
// good
$.ajax({
    method: 'POST',
    url: 'https://airbnb.com/',
    data: { name: 'John' },
})
    .done(() => console.log('Congratulations!'))
    .fail(() => console.log('You have failed this city.'));
```

#### Commas逗号

+ 行开头处不要实用使用逗号。 eslint: `comma-style` jscs: `requireCommaBeforeLineBreak`

```JavaScript
// bad
const story = [
    once
    , upon
    , aTime
];
 
// good
const story = [
    once,
    upon,
    aTime,
];
 
// bad
const hero = {
    firstName: 'Ada'
    , lastName: 'Lovelace'
    , birthYear: 1815
    , superPower: 'computers'
};
 
// good
const hero = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    birthYear: 1815,
    superPower: 'computers',
};
```

+ 添加结尾的逗号。 eslint: `comma-dangle` jscs: `requireTrailingComma`

> 为什么？这会让 git diff(差异比较) 更干净。另外，像Babel这样的转译器会删除转译后代码中的结尾逗号，这意味着您不必担心传统浏览器中的结尾逗号问题。

```JavaScript
// bad - 没有结尾逗号的 git diff 差异比较
const hero = {
        firstName: 'Florence',
-    lastName: 'Nightingale'
+    lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing']
};
 
// good - 有结尾逗号的 git diff 差异比较
const hero = {
        firstName: 'Florence',
        lastName: 'Nightingale',
+    inventorOf: ['coxcomb chart', 'modern nursing'],
};
```

```JavaScript
// bad
const hero = {
    firstName: 'Dana',
    lastName: 'Scully'
};
 
const heroes = [
    'Batman',
    'Superman'
];
 
// good
const hero = {
    firstName: 'Dana',
    lastName: 'Scully',
};
 
const heroes = [
    'Batman',
    'Superman',
];
 
// bad
function createHero(
    firstName,
    lastName,
    inventorOf
) {
    // does nothing
}
 
// good
function createHero(
    firstName,
    lastName,
    inventorOf,
) {
    // does nothing
}
 
// good (请注意，逗号不能出现在 “rest” 元素的后面)
function createHero(
    firstName,
    lastName,
    inventorOf,
    ...heroArgs
) {
    // does nothing
}
 
// bad
createHero(
    firstName,
    lastName,
    inventorOf
);
 
// good
createHero(
    firstName,
    lastName,
    inventorOf,
);
 
// good (请注意，逗号不能出现在 “rest” 元素的后面)
createHero(
    firstName,
    lastName,
    inventorOf,
    ...heroArgs
);
```

#### Semicolons分号

+ 当然要使用分号 eslint: `semi` jscs: `requireSemicolons`

> 为什么？ 当 JavaScript 遇到没有分号的换行符时，它使用一组称为[自动分号](https://tc39.github.io/ecma262/#sec-automatic-semicolon-insertion)插入的规则来确定是否应该将换行符视为语句的结尾，并且（顾名思义）如果被这样认为的话，在换行符前面自动插入一个分号。ASI（自动分号插入）包含了一些稀奇古怪的的行为，不过，如果 JavaScript 错误地解释了你的换行符，你的代码将会被中断执行。随着新功能成为 JavaScript 的一部分，这些规则将变得更加复杂。明确地结束你的语句并配置你的 linter 来捕获缺少的分号，将有助于防止遇到问题。

```JavaScript
// bad - 引发异常
const luke = {}
const leia = {}
[luke, leia].forEach(jedi => jedi.father = 'vader')
 
// bad - 引发异常
const reaction = "No! That's impossible!"
(async function meanwhileOnTheFalcon(){
    // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    // ...
}())
 
// bad - 返回`undefined`，而不是下一行的值 - 当 `return` 独占一行时，自动分号插入总是会发生。
function foo() {
    return
    'search your feelings, you know it to be foo'
}
 
// good
const luke = {};
const leia = {};
[luke, leia].forEach((jedi) => {
    jedi.father = 'vader';
});
 
// good
const reaction = "No! That's impossible!";
(async function meanwhileOnTheFalcon(){
    // handle `leia`, `lando`, `chewie`, `r2`, `c3p0`
    // ...
}());
 
// good
function foo() {
    return 'search your feelings, you know it to be foo';
}
```

#### Type Casting & Coercion类型转换 

+ 在声明语句的开始处就执行强制类型转换.
+ 字符串: eslint: `no-new-wrappers`

```JavaScript
// => this.reviewScore = 9;
 
// bad
const totalScore = new String(this.reviewScore); // typeof totalScore 是 "object" 而不是 "string"
 
// bad
const totalScore = this.reviewScore + ''; // 调用 this.reviewScore.valueOf()
 
// bad
const totalScore = this.reviewScore.toString(); // 不能保证返回一个字符串
 
// good
const totalScore = String(this.reviewScore);
```

+ 数字: 使用 `Number` 进行转换，而 `parseInt` 则始终以基数解析字串。 eslint: `radix` `no-new-wrappers`

```JavaScript
const inputValue = '4';
 
// bad
const val = new Number(inputValue);
 
// bad
const val = +inputValue;
 
// bad
const val = inputValue >> 0;
 
// bad
const val = parseInt(inputValue);
 
// good
const val = Number(inputValue);
 
// good
const val = parseInt(inputValue, 10);
```

+ 如果你因为某个原因正在做些疯狂的事情，但是 parseInt 是你的瓶颈，所以你对于 性能方面的原因而必须使用位运算，请留下评论并解释为什么使用，及你做了哪些事情。

```JavaScript
// good
/**
    * parseInt was the reason my code was slow.
    * Bitshifting the String to coerce it to a
    * Number made it a lot faster.
    */
const val = inputValue >> 0;
```

+ **注意:** 使用位运算请小心。 数字使用 64位值表示, 但是位运算只返回32位整数 (来源)。 小于32位整数的位运算会导致不可预期的行为. 讨论。最大的有符号整数是 2,147,483,647:

```JavaScript
2147483647 >> 0; // => 2147483647
2147483648 >> 0; // => -2147483648
2147483649 >> 0; // => -2147483647
```

+ 布尔值: eslint: `no-new-wrappers`

```JavaScript
const age = 0;
 
// bad
const hasAge = new Boolean(age);
 
// good
const hasAge = Boolean(age);
 
// best
const hasAge = !!age;
```

#### Naming Conventions命名规则 

+ 避免使用单字母名称。使你的命名具有描述性。 eslint: `id-length`

```JavaScript
// bad
function q() {
    // ...
}
 
// good
function query() {
    // ...
}
```

+ 当命名对象，函数和实例时使用驼峰式命名。 eslint: `camelcase` jscs:  `requireCamelCaseOrUpperCaseIdentifiers`

```JavaScript
// bad
const OBJEcttsssss = {};
const this_is_my_object = {};
function c() {}
 
// good
const thisIsMyObject = {};
function thisIsMyFunction() {}
```

+ 当命名构造函数或类的时候使用 `PascalCase` 式命名，（愚人码头注：即单词首字母大写）。 eslint: `new-cap` jscs: `requireCapitalizedConstructors`

```JavaScript
// bad
function user(options) {
    this.name = options.name;
}
 
const bad = new user({
    name: 'nope',
});
 
// good
class User {
    constructor(options) {
    this.name = options.name;
    }
}
 
const good = new User({
    name: 'yup',
});
```

+ 不要使用下划线开头或结尾。 eslint: `no-underscore-dangle` jscs:  `disallowDanglingUnderscores`

```JavaScript
// bad
this.__firstName__ = 'Panda';
this.firstName_ = 'Panda';
this._firstName = 'Panda';
 
// good
this.firstName = 'Panda';
```

+ 不要存储 `this` 引用。请实用箭头函数或者 [Function#bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)。 jscs: `disallowNodeTypes`

```JavaScript
// bad
function foo() {
    const self = this;
    return function () {
    console.log(self);
    };
}
 
// bad
function foo() {
    const that = this;
    return function () {
    console.log(that);
    };
}
 
// good
function foo() {
    return () => {
    console.log(this);
    };
}
```

+ basename 应与其默认导出的名称正好匹配。

```JavaScript
// file 1 contents
class CheckBox {
    // ...
}
export default CheckBox;
 
// file 2 contents
export default function fortyTwo() { return 42; }
 
// file 3 contents
export default function insideDirectory() {}
 
// in some other file
// bad
import CheckBox from './checkBox'; // import/export 单词首字母大写命名 , filename 驼峰式命名
import FortyTwo from './FortyTwo'; // import/filename 单词首字母大写命名, export 驼峰式命名
import InsideDirectory from './InsideDirectory'; // import/filename 单词首字母大写命名, export 驼峰式命名
 
// bad
import CheckBox from './check_box'; // import/export 单词首字母大写命名, filename 下划线命名
import forty_two from './forty_two'; // import/filename 下划线命名, export 驼峰式命名
import inside_directory from './inside_directory'; // import 下划线命名, export 驼峰式命名
import index from './inside_directory/index'; // 明确地 require 索引文件
import insideDirectory from './insideDirectory/index'; //  明确地 require 索引文件
 
// good
import CheckBox from './CheckBox'; // export/import/filename 单词首字母大写命名
import fortyTwo from './fortyTwo'; // export/import/filename 驼峰式命名
import insideDirectory from './insideDirectory'; // camelCase export/import/directory name/implicit "index"
// ^ supports both insideDirectory.js and insideDirectory/index.js
```

+ 当导出(export) 一个默认函数时使用驼峰式命名。你的文件名应该和你的函数的名字一致。

```JavaScript
function makeStyleGuide() {
    // ...
}
 
export default makeStyleGuide;
```

+ 当导出一个 构造函数 / 类 / 单例 / 函数库 / 纯对象时使用 PascalCase 式命名。

```JavaScript
const AirbnbStyleGuide = {
    es6: {
    },
};
 
export default AirbnbStyleGuide;
```

+ 首字母缩写词应该总是全部大写，或全部小写。

> 为什么？ 名字是更具可读性，而不是为了满足计算机算法。

```JavaScript
// bad
import SmsContainer from './containers/SmsContainer';
 
// bad
const HttpRequests = [
    // ...
];
 
// good
import SMSContainer from './containers/SMSContainer';
 
// good
const HTTPRequests = [
    // ...
];
 
// also good
const httpRequests = [
    // ...
];
 
// best
import TextMessageContainer from './containers/TextMessageContainer';
 
// best
const requests = [
    // ...
];
```

#### Accessors存取器

+ 属性的存取器函数不是必须的。
+ 別使用 JavaScript 的 getters/setters，因为它们会导致意想不到的副作用，而且很难测试，维护和理解。相反，如果要使用存取器函数，使用 getVal() 及 setVal(‘hello’)。

```JavaScript
// bad
class Dragon {
    get age() {
    // ...
    }
 
    set age(value) {
    // ...
    }
}
 
// good
class Dragon {
    getAge() {
    // ...
    }
 
    setAge(value) {
    // ...
    }
}
```

+ 如果属性/方法是一个 boolean, 使用 isVal() 或 hasVal() 方法。

```JavaScript
// bad
if (!dragon.age()) {
    return false;
}
 
// good
if (!dragon.hasAge()) {
    return false;
}
```

+ 也可以创建 get() 和 set() 函数, 但要保持一致。

```JavaScript
class Jedi {
    constructor(options = {}) {
    const lightsaber = options.lightsaber || 'blue';
    this.set('lightsaber', lightsaber);
    }
 
    set(key, val) {
    this[key] = val;
    }
 
    get(key) {
    return this[key];
    }
}
```

#### Events事件

+ 将绑定数据到事件时 (不论是 DOM 事件还是其他像Backbone一类的事件), 传递 hash 而不是原始值。 这将允许后续的贡献者不用查找和更新事件的每一个处理程序就可以给事件添加更多的数据。例如，不要使用下边的：

```JavaScript
// bad
$(this).trigger('listingUpdated', listing.id);
 
// ...
 
$(this).on('listingUpdated', (e, listingId) => {
    // do something with listingId
});
```

prefer:

```JavaScript
// good
$(this).trigger('listingUpdated', { listingId: listing.id });
 
// ...
 
$(this).on('listingUpdated', (e, data) => {
    // do something with data.listingId
});
```

#### jQuery

+ jQuery 对象变量命名以 `$` 为前缀。 jscs: requireDollarBeforejQueryAssignment

```JavaScript
// bad
const sidebar = $('.sidebar');
 
// good
const $sidebar = $('.sidebar');
 
// good
const $sidebarBtn = $('.sidebar-btn');
```

+ 缓存 jQuery 选择器的查询结果。

```JavaScript
// bad
function setSidebar() {
    $('.sidebar').hide();
 
    // ...
 
    $('.sidebar').css({
    'background-color': 'pink',
    });
}
 
// good
function setSidebar() {
    const $sidebar = $('.sidebar');
    $sidebar.hide();
 
    // ...
 
    $sidebar.css({
    'background-color': 'pink',
    });
}
```

+ DOM 查询使用后代选择器 `$('.sidebar ul')` 或者 父类 > 子类 `$('.sidebar &gt; ul')`选择器。
+ 在某个 jQuery 对象范围内查询使用 find 。

```JavaScript
// bad
$('ul', '.sidebar').hide();
 
// bad
$('.sidebar').find('ul').hide();
 
// good
$('.sidebar ul').hide();
 
// good
$('.sidebar > ul').hide();
 
// good
$sidebar.find('ul').hide();
```

## 注释规范

* `html`注释: 注释格式 , `<!-- Comments -->`只能在注释的始末位置,不可置入注释文字区域;
* `css`注释: 注释格式 `/* Comments */`;
* `JavaScript`注释:
单行注释使用`// Comments`,
多行注释使用:

```JavaScript
/**
 * Comments 
 * @param
 **/
```

* 多行注释中间可跟以下内容：

```JavaScript
	@file 文件名
	@addon 把一个函数标记为另一个函数的扩张，另一个函数的定义不在源文件中
	@argument 用大括号中的自变量类型描述一个自变量
	@author 函数/类作者的姓名
	@base 如果类是继承得来，定义提供的类名称
	@class 用来给一个类提供描述，不能用于构造器的文档中
	@constructor 描述一个类的构造器
	@deprecated 表示函数/类已被忽略
	@exception 描述函数/类产生的一个错误
	@exec @extends 表示派生出当前类的另一个类
	@fileoverview 表示文档块将用于描述当前文件，这个标签应该放在其它任何标签之前
	@final 指出函数/类
	@ignore 让jsdoc忽视随后的代码
	@link 类似于@link标签，用于连接许多其它页面
	@member 定义随后的函数为提供的类名称的一个成员
	@param 用大括号中的参数类型描述一个参数
	@private 表示函数/类为私有，不应包含在生成的文档中
	@requires 表示需要另一个函数/类
	@return 描述一个函数的返回值
	@see 连接到另一个函数/类
	@throws 描述函数/类可能产生的错误
	@type 指定函数/成员的返回类型
	@version 函数/类的版本号
```


## IDE编辑器配置

将你的编辑器按照下面的配置进行设置，以避免常见的代码不一致和差异：

+ 用四个空格代替制表符（soft-tab 即用空格代表 tab 符）。
+ 保存文件时，删除尾部的空白符。
+ 设置文件编码为 UTF-8。
+ 在文件结尾添加一个空白行。

```
// .editorconfig

root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 4
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.py]
indent_size = 4
```