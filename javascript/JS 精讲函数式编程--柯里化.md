# JS 精讲函数式编程--柯里化

---

### 柯里化

在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。

简化代码结构，提高系统性能维护性。一个方法，只有一个参数，强制了功能的单一性，很自然就做到了功能内聚，降低耦合。

柯里化的优点是降低代码的重复，提高代码的适应性。

```
// fixed parmas 4
function add(a,b,c,d) {
	return a + b + c + d;
}

add(1, 2, 3, 4);
```

```
function FixedParmasCurry(fn) {
 // [add, 1, 2]
 var _arg =[].slice.call(arguments, 1)
 return function() {
 	// arguments [2, 3];
 	var newArg = _arg.concat([].slice.call(arguments, 0))
 	return fn.apply(this, newArg);
 }
}

var newArr = FixedParmasCurry(add, 1, 2);
newAdd(2, 3);
```

```
function Curry (fn, length) {
	var length = length || fn.length;
	
	return function() {
		if (arguments.length < length) {
			var combined = [fn].concat([].slice.call(arguments, 0));
			return Curry(FixedParmasCurry.apply(this, combined), length - arguments.length);
		} else {
			return fn.apply(this, arguments);
		}
	}
}

var newAdd = Curry(add);
newAdd(1);
```

### 应用柯里化

```
//示意而已
function ajax(type, url, data) {
	var xhr = new XMLHttpRequest();
	xhr.open(type, url, true);
	xhr.send(data);
}

//虽然ajax这个函数非常通用，但在重复调用的时候多数冗余
ajax('POST', 'www.example.com', 'name=kevin')
ajax('POST', 'www.example2.com', 'name=kevin')
ajax('POST', 'www.example3.com', 'name=kevin')

//利用 curry
var ajaxCurry = curry(ajax);

// 以POST类型请求数据
var post = ajaxCurry('POST');
post('www.example.com', 'name=kevin');

// 以POST类型请求来自于www.example.com的数据
var postFromTest = post('www.example.com');
postFromTest('name=kevin');
```