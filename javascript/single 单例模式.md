# single 单例模式

定义：保证一个类仅有一个实例，并提供一个访问它的全局访问点。

用一个变量来标识是否已经为某个类创建了对象，如果是，则在下一次获取该类的时候，直接返回之前创建的实例

```JavaScript
var Singleton = function(name) {
	this.name = name;
	this.instance = null;
}

Singleton.prototype.getName = function() {
	console.log(name);
};

Singleton.getInstance = function(name) {
	if(!this.instance) {
		this.instance = new Singleton(name)
	}
	return this.instance;
};

var a = Singleton.getInstance('a');
var b = Singleton.getInstance('b');

console.log(a === b);
```