# typeof bar

---

typeof bar = "object" 是检查bar是否是对象的可靠方法，但JavaScript中令人惊讶的问题null页被认为是一个对象。

因此对于大多数开发人员来说，下面的代码会讲true（而不是false）打印到控制台

```JavaScript
var bar = null;
console.log(typeof bar ==='object'); //logs true
```

只要知道这一点，就可以通过检查bar是否为空来轻松避免该问题：


```JavaScript
console.log((bar !== null) && (typeof bar === 'object')); //logs false
```

为了让我们的答案更加完整，还有两件事值得注意：首先如果bar是一个函数，上面的解决方案将返回false。在大多数情况下，这是所期望的行为，但是在您希望函数返回true的情况下，您可以将上述解决方案修改为：


```JavaScript
console.log((bar !== null) && ((typeof bar === 'object') || (typeof bar == 'function')))
```

其次，如果bar是数组，则上述解决方案将会返回true(例如，如果var bar = [];)。在大多数情况下，这是所希望的行为，因为数组确实是对象，但是在您想要对数组也是false的情况下，可以将上述解决方案修改为：


```JavaScript
console.log((bar !== null) && (typeof bar === 'object') && (toString.call(bar) !== '[object Array]'));
```

但是，还有一个替换方法对空值，数组和函数返回false，但对于对象则为true：


```JavaScript
console.log((bar !== null) && (bar.constructor === object));
```

或者，如果您使用jQuery：


```JavaScript
console.log((bar !== null) && (typeof bar === 'object') && (! $.isArray(bar)));
```

ES5使得数组的情况非常简单，包括它自己的空检查：

```JavaScript
console.log(Array.isArray(bar));
```

```JavaScript
Object.prototype.toString.call(obj) = '[object Object]';

Object.prototype.toString.call(null) = '[object Null]';

Object.prototype.toString.call(Array) = '[object Array]';
```