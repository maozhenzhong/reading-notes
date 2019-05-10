# Webpack插件

---

## 一个完整的插件需要满足以下需求

+ 是一个独立的模块
+ 模块对外暴露一个js函数
+ 函数的原型（`prototype`）上定义了一个注入 `compiler` 对象的 `apply` 方法
+ apply 函数中需要有通过 `compiler` 对象挂载的`webpack`事件钩子，钩子的回调中能拿到当前编译的 `compilation` 对象，如果是异步编译插件的话可以拿到回调`callback`
+ 完成自定义编译流程并处理`complition`对象的内部数据
+ 如果异步编译插件的话，数据处理完成后执行`callback`回调

**示例：**

```JavaScript
// 1、example-webpack-plugin.js

// 2、模块对外暴露的 js 函数
function ExampleWebpackPlugin(pluginOptions){
	this.options = pluginOptions
}

// 3、原型定义一个 apply 函数，并注入了 complier 对象
ExampleWebpackPlugin.prototype.apply = function(compiler) {
	// 4、挂载 webpack 事件钩子（这里挂载的是 emit 事件）
	compiler.plugin('emit', function(compiation, callback) {
		// ... 内部进行自定义的编译操作
		// 5、操作 compilation 对象的内部数据
		console.log(compilation)
		// 6、执行 callback 回调
		callback()
	})
}

module.exports = ExampleWebpackPlugin
```

## compiler & compliation 对象

### compiler

compiler 对象是 webpack 的编译对象，前文已经提到过，webpack 的核心就是编译器， compiler 对象会在启动 webpack 的时候就被一次性的初始化， compiler 对象中包含了所有webpack 可自定义操作的配置，例如 loader 的配置，plugin 的配置， entry 的配置等各种原始 webpack配置等，在webpack插件中的自定义编译流程中，我们肯定会用到compiler对象中的相关配置信息，我们相当于可以通过compiler对象拿到webpack的主环境所有信息。

**示例：**

```JavaScript
// webpack/lib/webpack.js
const Compiler = require("./Compiler")

const webpack = (options, callback) = > {
	...
	options = new WebpackOptionsDefaulter().process(options) // 初始化 webpack 各配置参数
	let compiler = new Compiler(options.context) // 初始化 compiler 对象，这里options.context 为process.cwd() // 往compiler 添加初始化参数
	new NodeEnvironmentPlugin().apply(compiler) // 往 compiler 添加 Node 环境相关方法
	for (const plugin of options.plugins) {
		plugin.apply(compiler)
	}
	...
}

### compilation 对象

***扩展：编译资源*** 编译资源是 webpack 通过配置生成的一份静态资源管理 Map（一切都在内存中保存），以 key-value 的形式描述一个 webpack 打包后的文件，编译资源就是这一个个 key-value组成的Map。而编译资源就是需要由 compilation 对象生成的。

compilation 实例继承于 compiler，compilation 对象代表了一次单一的版本 webpack 构建和生成编译资源的过程。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源以及新的 compilation 对象。一个 compilation 对象包含了 当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

**示例：**

```JavaScript
// webpack/lib/Compiler.js
const Compilation = require("./Compilation")

newCompilation(params) {
	const compilation = new Compilation(this)
	...
	return compilation
}
```

## Tapable & Tapable 实例

webpack 的插件架构主要基于 Tapable 实现的，Tapable 是 webpack 项目组的内部库，主要是抽象了一套插件机制。 webpack 源代码中的一些 Tapable 实例都继承或混合了 Tapable 类。 Tapable 能够让我们为 JavaScript 模块添加并应用插件。它可以被其他模块继承或混合。它类似于 NodeJs 的 EventEmitter 类，专注于自定义事件的触发和操作。除此之外， Tapable 允许你通过回调函数的参数访问事件的生产者。

Tapable 实例对象都有四组成员函数：

+ plugin(name<string>, handler<function>) 这个方法允许给 Tapable 实例事件注册一个自定义插件。这个操作类似于 EventEmitter的 on()，注册一个处理函数 -> 监听到某个信号 -> 事件发生时执行(开发者自定义的插件需要频繁的用到此方法来自定义事件钩子的处理函数，以便被主编译流程 emit 触发)
+ apply(...pluginInstances<AnyPlugin|function>[])-AnyPlugin 是AbstractPlugin 的子类，或者是一个有 apply 方法的类（或者，少数情况下是一个对象），或者是一个有注册代码的函数。这个方法只是 apply 插件的定义，所以真正的事件监听会被注册到 Tapable 实例的注册表。
+ applyPlugins*(name<string>,...)这是一组函数，使用这组函数， Tapable实例可以对指定 hash 下的所有插件执行 apply。这些方法执行类似于 EventEmitter 的 emit()，可以针对不同的使用情况采用不同的策略控制事件发射(webpack 内部实现机制中再主流程序的编译过程中频繁的使用此方法来 emit 外界插件的自定义的插件自定义的事件钩子)。
+ mixin(pt<Object>) 一个简单的方法能够以混合的方式扩展 Tapable 的原型而非继承。

***注意：*** applyPlugin* 方法， * 表示着不同情况的事件注册，这组 applyPlugin* 方法在 webpack 的源码中随处可见，它们也涉及到 webpack 插件的执行顺序，不同的 applyPlugins* 对应着以下不同的情况： 

+ 同步串行执行插件 applyPlugins()
+ 并行执行插件 applyPluginsParallel()
+ 插件一个接一个的执行，并且每个插件接收上一个插件的返回值（瀑布）applyPluginsWaterfall()
+ 异步执行插件 applyPluginsAsync()
+ 保护模式终止插件执行：一旦某个插件返回非 undefined，会退出运行流程并返回这个插件的返回值。这看起来像 EventEmitter 的 once()，但它们是完全不同的applyPluginsBailResult() 