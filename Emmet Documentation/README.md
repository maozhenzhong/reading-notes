# Emmet Documentation

##### Example:

```html
#page>div.logo+ul#navigation>li*5>a{Item $}
```

##### Output:

```html
<div id="page">
	<div class="logo"></div>
	<ul id="navigation">
		<li><a href="">Item 1</a></li>
		<li><a href="">Item 2</a></li>
		<li><a href="">Item 3</a></li>
		<li><a href="">Item 4</a></li>
		<li><a href="">Item 5</a></li>
	</ul>
</div>
```

### Child: >

##### Example:

```html
div>ul>li>a

```

##### Output:

```html
<div>
	<ul>
		<li>
			<a href=""></a>
		</li>
	</ul>
</div>
```

### Sibling: +

##### Example:

```html
div+p+bq
```

##### Output:

```html
<div></div>
<p><p>
<blockquote></blockquote>
```

### Climb-up:

##### Example:

```html
div+div>p>span+em
```

##### Output:

```html
<div></div>
<div>
	<p><span><span><em></em></p>
</div>
```

##### Example:

```html
div+div>span+em^bq
```

##### Output:

```html
<div></div>
<div>
	<p><span><span><em><em></p>
	<blockquote></blockquote>
</div>
```

##### Example:

```html
div+div>p>span+em^^^bq
```

##### Output:

```html
<div></div>
<div>
	<p><span></span><em></em><p>
<div>
<blockquote></blockquote>
```

### Multiplication: *

##### Example:

```html
ul>li*5
```

##### Output:

```html
<ul>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
	<li></li>
</ul>
```

### Grouping:()

##### Example:

```html
div>(header>ul>li*2>a)+footer>p
```

##### Output:

```html
<div>
	<header>
		<ul>
			<li><a href=""></a></li>
			<li><a href=""></a></li>
		</ul>
	</header>
	<footer>
		<p></p>
	</footer>
</div>
```

##### Example:

```html
(div>dl>(dt+dd)*3)+footer>p
```

##### Output:

```html
<div>
	<dl>
		<dt></dt>
		<dd></dd>
		<dt></dt>
		<dd></dd>
		<dt></dt>
		<dd></dd>
	</dl>
<div>
<footer>
	<p></p>
</footer>
```

### Attribute operators

#### ID and CLASS

##### Example:

```html
div#header+div.page+div#footer.class1.class2.class3
```

##### Output:

```html
<div id="header"></div>
<div class="page"></div>
<div id="footer" class="class1 class2 class3"></div>
```

#### Custom attributes

##### Example:

```html
td[title="Hello word!" colspan=3]
```

##### Output:

```html
<td title="Hello word!" colspan="3"></td>
```

#### Item numbering:\$

##### Example:

```html
ul>li.item$*5
```

##### Output:

```html
<ul>
	<li class="item1"></li>
	<li class="item2"></li>
	<li class="item3"></li>
	<li class="item4"></li>
	<li class="item5"></li>
<ul>
```

##### Example:

```html
ul>li.item$$$*5
```

##### Output:

```html
<ul>
	<li class="item001"></li>
	<li class="item002"></li>
	<li class="item003"></li>
	<li class="item004"></li>
	<li class="item005"></li>
</ul>
```

#### Changing numbering base and direction

##### Example:

```html
ul>li.item$@-*5
```

##### Output:

```html
<ul>
	<li class="item5"></li>
	<li class="item4"></li>
	<li class="item3"></li>
	<li class="item2"></li>
	<li class="item1"></li>
</ul>
```

##### Example:

```html
ul>li.item@3*5
```

##### Output:

```html
<ul>
	<li class="item3"></li>
	<li class="item4"></li>
	<li class="item5"></li>
	<li class="item6"></li>
	<li class="item7"></li>
</ul>
```

##### Example:

```html
ul>li.item$@-3*5
```

##### Output:

```html
<ul>
	<li class="item7"></li>
	<li class="item6"></li>
	<li class="item5"></li>
	<li class="item4"></li>
	<li class="item3"></li>
</ul>
```

#### Text:{}

##### Example:

```html
a{Click me}
```

##### Output:

```html
<a href="">Click me</a>
```

```html
<!-- a{click}+b{here} -->
<a href="">click</a><b>here<b>

<!-- a>{click}+b{here} -->
<a href="">click<b>here</b></a>
```

##### Example:

```html
p>{Click }+a{here}+{ to continue}
```

##### Output:

```html
<p>Click <a href="">here</a> to continue</p>
```

##### Example:

```html
p{Click}+a{here}+{ to continue}
```

##### Output:

```html
<p>Click</p>
<a href="">here</a> to continue
```

##### Example

```html
(header > ul.nav > li*5) + footer
```

> But it won't work, because space is a stop ***symbol*** where Emmet stops abbreviation parsing.
