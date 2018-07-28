# Promise

Promise对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值。

```JavaScript
new Promise( function(resolve, reject) {...} /* executor */)
```

#### 参数

***executor***

executor是带有resolve和reject两个参数的函数。Promise构造函数执行时立即调用executor函数，resolve和reject两个函数作为参数传递给executor（executor函数在Promise构造函数返回新建对象钱被调用）。resolve和reject函数被调用时，分别将Promise的状态改为fulfilled（完成）或rejected（失败）。executor内部通常会执行一些异步操作，一旦完成，可以调用resolve函数来将promise状态改成fulfilled，或者在发生错误时将它的状态改为rejected。

如果在executor函数中抛出一个错误，那么该promise状态为rejected。executor函数的返回值被忽略。

### 描述

Promise对象时一个代理对象（代理一个值），被代理的值在Promise对象创建时可能时未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。这让异步方法可以像同步方法那样返回值，但并不时立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象。

一个Promise有以下几种状态：

+ pending：初始状态，既不是成功，也不是失败状态。
+ fulfilled：意味着操作成功完成。
+ rejected：意味着操作失败。

pending状态的Promise对象可能触发fulfilled状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。当其中任一种情况出现时，Promise对象的then方法绑定的处理方法（handlers）就会被调用（then方法包含两个参数：onfulfilled和onrejected，它们都是Function类型。当Promise状态为fulfilled时，调用then的onfulfilled方法，当Promise状态为rejected时，调用then的onrejected方法，所以在异步操作的完成和绑定处理方法之间不存在竞争）。

因为Promise.prototype.then和Promise.prototype.catch方法返回promise对象，所以它们可以被链式调用。

> 不要和惰性求值混淆：有一些语言中有惰性求值和延时计算的特性，它们也被称为“promises”，例如Scheme.JavaScript中的promise代表一种已经发生的状态，而且可以通过回调方法链在一起。如果你想要的是表达式的延时计算，考虑无参数的“箭头方法”：`f = () => 表达式`创建惰性求值的表达式，使用f()求值

> 注意：如果一个promise对象处在fulfilled或rejected状态而不是pending状态，那么它也可以被称为settled状态。你可以能也会听到一个术语resolved，它表示promise对象处于fulfilled状态。

### 属性

`Promise.length`

length属性，其值总是为1（构造器参数的数目）

`Promise.prototype`

表示Promise构造器的原型。

### 方法

`Promise.all(iterable)`

这个方法返回一个新的promise对象，该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。

`Promise.race(iterable)`

当iterable参数里的任意一个子promise被成功或失败后，父promise马上也会用子promise的成功返回值或失败详情作为参数调用父promise绑定的相应句柄，并返回该promise对象。

`Promise.reject(reason)`

返回一个状态作为失败的Promise对象，并将给定的失败信息传递给对应的处理方法。

`Promise.resolve(value)`

返回一个状态由给定value决定的Promise对象。如果该值是一个Promise对象，则直接返回该对象；如果该值是thenable（即，带有then方法的对象），返回的Promise对象的最终状态由then方法执行决定；否则的话（该value为空，基本类型或者不带then方法的对象），返回的Promise对象状态为fulfilled，并且将该value传递给对应的then方法。通常而言，如果你不知道一个值是否是Promise对象，使用Promise.resolve(value)

### Promise原型

#### 属性

`Promise.prototype.constructor`

返回被创建的实例函数。默认为Promise函数。

#### 方法

`Promise.prototype.catch（onRejected）`

添加一个拒绝（rejection）回调到当前promise，返回一个新的promise。当这个回调函数被调用，新promise将以它的返回值来resolve，否则如果当前promise进入fulfilled状态，则以当前promise的完成结果为新promise的完成结果。

`Promise.prototype.then(ofFulfilled, onRejected)`

添加解决（fulfillment）和拒绝（rejection）回调到当前promise,返回一个新的promise，将以回调的返回值来resolve。

`Promise.prototype.finally(onFinally)`

添加一个事件处理回调于当前promise对象，并且在原promise对象解析完毕后，返回一个新的promise对象。回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成（fulfilled）还是失败(rejected)

### 创建Promise

Promise对象是由关键字new及其构造函数来创建的。该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。这个“处理器函数”接收两个函数--resolve和reject--作为其参数。当异步任务顺利完成并且返回结果值时，会调用resolve函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用reject函数。

```JavaScript
const myFirstPromise = new Promise((resolve, reject) => {
	//做一些异步操作，最终会调用下面两者之一：
	
	//resolve(someValue)//fulfilled
	//或
	//reject('failure reason')//rejected
})
```

想要某个函数？拥有promise功能，只需让其返回一个promise即可。

```JavaScript
function myAsyncFunction(url) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequset();
		xhr.open('GET', url),
		xhr.onload = () => resolve(xhr.responseText)
		xhr.onerror = () => reject(xhr.statusText)
		xhr.send()
	})
}
```