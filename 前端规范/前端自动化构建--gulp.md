# 前端自动化构建--Gulp

### 目录Table of Contents

+ [gulp简介](#user-content-gulp简介)
+ [package.json](#user-content-package.json)
+ [gulp安装](#user-content-安装gulp)
+ [常用API](#user-content-gulpAPI文档)
+ [创建gulpfile.js](#user-content-创建gulpfile.js)

### gulp简介

gulp是基于Nodejs的自动任务运行器。它能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

> **注意：**基于Nodejs，故名思义您的计算机必须有安装Nodejs。这里我假设您的Nodejs已安装完毕。不再赘述nodejs的安装。

### package.json

package.json 是一个JSON文件，它是定义该项目所需要的各种模块，以及项目的配置信息。`npm install`命令根据这个配置文件自动下载所需的模块，也就是配置项目所需的运行和开发环境。

+ 创建package.json文件通过

```npm
npm init
```

通过引导的方式在当前模块下创建package.json文件

如果不想根据引导创建package.json也可以使用以下命令直接创建：

```npm
npm init --yes || npm init -y
```

+ package.json 的标准文件

```JSON
{
	"name": "my-app",
	"version": "1.0.1",
	"description": "",
	"main": "gulpfile.js",
	"scripts": {
		"preinstall": "echo here it comes!",
		"postinstall": "echo there it goes!",
		"start": "node index.js",
		"test": "tap test/*.js"
	},
	"keywords": [],
	"author": {
		"name": "gtshen",
		"email": "sgt_ah@163.com"
	},
	"contributors": [
		{
			"name": "",
			"email": ""
		}, 
		{
			"name": "",
			"email": ""
		}, 
		{
			"name": "",
			"email": ""
		}
	],
	"engines": {
		"node": "0.10.x"
	},
	"repository": {
		"type": "git",
		"url": "git+https://github.com/shenguotao2015/st.git"
	},
	"bugs": {
		"url": "",
		"email": ""
	},
	"homepage": "http://st.cn",
	"license": "MIT",
	"dependencies": {
		"gulp": "^3.9.1"
	},
	"devDependencies": {
		"rimraf": "2.6.1"
	}
}
```

**name**

name用于定义模块或者包名，它是package.json中非常重要的属性之一。如果你向npm提交这个模块时，你必须保证name的名称是唯一的。

**version**

用于设置模块的版本号。在package.json中最重要的就是name和version字段了。

**description**

描述内容，值为一个字符串。用于方便 `npm search`进行搜索

**keywords**

关键字。值可以为一个字符串也可以是一个数组。用于方便`npm search`进行搜索。

```JSON
keywords:'keywords content' 
keywords:['k1','k2']
```

**homepage**

项目官网的URL

**bugs**
用于指明反馈bug的方式。

**license**
许可证，用于说明该模块受到何种保护以及授权人具有哪些权利。"MIT" 和 "SIC"

**"MIT"**  
> 
> + MIT许可证之名源自麻省理工学院（Massachusetts Institute of Technology, MIT），又称“X条款”（X License）或“X11条款”（X11 License）。
> + MIT是和BSD一样宽范的许可协议，作者只想保留版权,而无任何其他了限制。也就是说，你必须在你的发行版里包含原许可协议的声明，无论你是以二进制发布的还是以源代码发布的。


**"SIC"**

> + ISC许可证是一种开放源代码许可证，在功能上与两句版的BSD许可证相同。
> + 这份许可证是由ISC（Internet Systems Consortium）所发明，在ISC释出软件时所使用的。

**author**
作者

**contributors**

协助开发的相关人员，值是一个数组。

**repository**

指定一个代码存放地址。

**main**

用于指定该模块的入口的文件，这个入口文件一般都是模块根目录下的js文件，例如：index.js。
后期，在我们使用该模块时，例如:require('st')就是加载的这个 index.js文件。


```JSON
{
    "name":"st",
    "version":"1.0.1",
    "main":"index.js"
}
```

**engines**

engines用于说明该模块需要依赖的node版本。

**scripts**

scripts 可以为当前模块自定义一些脚步动作或命令。

```JSON
{
    "scripts": {
        "preinstall": "echo here it comes!",
        "postinstall": "echo there it goes!",
        "start": "node index.js",
        "test": "tap test/*.js"
      }
}
```

如上所示，现在就可以在该模块内执行如下命令

`node postinstall`  
`node start`  
`node test`  

**dependencies**

dependencies是一个对象，用于声明该模块所依赖的模块列表，其中key是模块的名称，value则是模块的版本。其中版本常用的书写格式有：

```JSON
/**
* version 精确匹配版本
* >version 必须大于某个版本
* >=version 大于等于
* <version 小于
* <=version 小于
* ~version "约等于"，具体规则详见semver文档
* ^version "兼容版本"具体规则详见semver文档
* 1.2.x 仅一点二点几的版本
* range1 || range2 范围1和范围2满足任意一个都行
*/

{
	"dependencies":{
		"foo":"3.0.1",
		"baz" : ">1.0.2 <=2.3.4",
		"boo" : "2.0.1",
		"qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0",
		"til" : "~1.2",
		"two" : "2.x"
	}
}
```

**devDependencies**

它的功能与 dependencies 相同。  
不同的是 devDependencies 只用于声明开发环境的依赖列表，而dependencies则是用于声明正式环境的依赖列表。  
如果有人想要下载并使用你的模块，也许他们并不希望或需要下载一些你在开发过程中使用的额外的测试或者文档框架。在这种情况下，最好的方法是把这些依赖添加到devDependencies属性的对象中。

### 安装gulp

**全局安装**

```npm
$ npm install -g gulp
```

> 注意：检查是否正确安装：终端执行`gulp -v`，出现gulp版本号 `CLI version 3.9.1`即为正确安装。否则重新安装。

**作为项目的开发依赖（devDependencies）安装**

```NPM
$ npm install --save-dev
```

### gulp API 文档

+ **gulp.src(globs[, options]):** 读取文件或文件夹

****

> src方法是指定需要处理的源文件的路径，gulp借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，gulp.src返回当前文件流至可用插件；

**globs：`String` 或 `Array`，需要处理的源文件匹配符路径**

**通配符路径匹配:**

+ `src/a.js`：指定具体文件
+ `*`：匹配所有文件 `src/*.js`(包含src下的所有js文件)
+ `**`：匹配0个或多个子文件夹  `src/**/*.js`(包含src的0个或多个子文件夹下的js文件)；
+ {}：匹配多个属性 `src/{a,b}.js`(包含`a.js`和`b.js`文件)  `src/*.{jpg,png,gif}`(`src`下的所有`jpg`/`png`/`gif`文件)；
+ `!`：排除文件 `!src/a.js`(不包含`src`下的`a.js`文件)；

```JavaScript
var gulp = require('gulp'),
    less = require('gulp-less');
 
gulp.task('testLess', function () {
    //gulp.src('less/test/style.less')
    gulp.src(['less/**/*.less','!less/{extend,page}/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});
```

**options：(可选) Object，有3个属性buffer、read、base**

+ `options.buffer`：`Boolean` 默认：true 设置为false，将返回file.content的流并且不缓冲文件，处理大文件时非常有用；
+ `options.read`：`Boolean` 默认：true 设置false，将不执行读取文件操作，返回null；
+ `options.base`：`String` 设置输出路径以某个路径的某个组成部分为基础向后拼接，具体看下面示例

```JavaScript
gulp.src('client/js/**/*.js') 
  .pipe(minify())
  .pipe(gulp.dest('build'));  // Writes 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // Writes 'build/js/somedir/somefile.js'
```

**异步任务支持**
  
只有当fn接受一个 callback，或者返回一个 promise 或 stream任务 才可以异步执行,且task默认以最大的并发数执行，即gulp 会一次性运行所有的 task 并且不做任何等待。

```JavaScript
//接受一个 callback
var exec = require('child_process').exec;
gulp.task('jekyll', function(cb) {
  // 编译 Jekyll
  exec('jekyll build', function(err) {
    if (err) return cb(err); // 返回 error
    cb(); // 完成 task
  });
});

//返回一个 stream
gulp.task('somename', function() {
  var stream = gulp.src('client/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('build'));
  return stream;
});

//返回一个 promise
var Q = require('q');
gulp.task('somename', function() {
  var deferred = Q.defer();
  // 执行异步的操作
  setTimeout(function() {
    deferred.resolve();
  }, 1);
  return deferred.promise;
});
```

当然，如果你想要任务按照一定的顺序执行。例如有两个task，"one" 和 "two"，在 "one" 中返回一个cb，或stream，promise，让系统知道什么时候它会执行完毕; 在 "two" 中添加提示告诉系统 "two" 需要依赖 "one" 完成，即下面给出的栗子:

```JavaScript
var gulp = require('gulp');

// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('one', function(cb) {
    // 做一些事 -- 异步的或者其他的
    cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});

// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('two', ['one'], function() {
    // 'one' 完成后
});

gulp.task('default', ['one', 'two']);
```

+ **gulp.dest(path[, options])** 生成文件，也就是写文件

****

> dest方法是指定处理完后文件输出的路径

path：`String or Function` 指定文件输出路径，或者定义函数返回文件输出路径亦可

options：`Object`，有2个属性cwd、mode

+ `options.cwd`：`String` 默认：`process.cwd()`：当前脚本的工作目录的路径 当文件输出路径为相对路径将会用到
+ `options.mode`：`String` 默认：0777 指定被创建文件夹的权限


+ **gulp.watch(glob [, opts], tasks)orgulp.watch(glob [, opts, cb])** 监控文件

****

> watch方法是用于监听文件变化，文件一修改就会执行指定的任务

1. glob：`String or StringArray` 需要处理的源文件匹配符路径。

2. opts：`Object`(可选) 具体参看 gaze；

+ **gulp.task(name[, deps], fn)** `StringArray` 需要执行的任务的名称数组；

****

```JavaScript
gulp.task('somename', function() {
  // 做一些事
});
```

**name**

任务的名字，如果你需要在命令行中运行你的某些任务，那么，请不要在名字中使用空格。

**deps**
类型： `Array`

一个包含任务列表的数组，这些任务会在你当前任务运行之前完成。

```JavaScript
gulp.task('mytask', ['array', 'of', 'task', 'names'], function() {
  // 做一些事
});
```

> **注意：** 你的任务是否在这些前置依赖的任务完成之前运行了？请一定要确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。

**fn**

该函数定义任务所要执行的一些操作。通常来说，它会是这种形式：gulp.src().pipe(someplugin())。

异步任务支持
任务可以异步执行，如果 fn 能做到以下其中一点：

接受一个 callback

+ cb(event)：`Function()` 每次文件变化执行的回调函数；

1. `event.type: String` 发生的变动的类型：`added`, `changed` 或者 `deleted`
2. `event.path: String` 触发了该事件的文件的路径。

### 创建gulpfile.js

#### 安装常用的gulp插件

```JavaScript
//首先我们需要安装一下gulp插件，再来分析一下需要编写的任务

//文件操作
del //(替代gulp-clean)
gulp-rename //描述：重命名文件。
gulp-concat //描述：合并文件。
gulp-filter //描述：在虚拟文件流中过滤文件。

//压缩
gulp-uglify //描述：压缩js文件大小。
gulp-csso //描述：压缩优化css。
gulp-html-minify //描述：压缩HTML。
gulp-imagemin //描述：压缩图片。
gulp-zip //描述：ZIP压缩文件。

//JS/CSS自动注入
gulp-autoprefixer //描述：自动为css添加浏览器前缀。
gulp-useref //描述：解析构建块在HTML文件来代替引用未经优化的脚本和样式表。
gulp-rev //描述：给静态资源文件名添加hash值:unicorn.css => unicorn-d41d8cd98f.css
gulp-rev-replace //描述：重写被gulp-rev重命名的文件名。
gulp-html-replace //描述：替换html中的构建块。

//流控制
gulp-if //描述：有条件地运行一个任务。

//工具
gulp-load-plugins //描述：从包的依赖和附件里加载gulp插件到一个对象里给你选择。
gulp-sass //描述：编译sass。
gulp-babel //描述：将ES6代码编译成ES5。
gulp-base64 //描述：将css文件里引用的图片转为base64。
gulp-less //描述：编译less。

gulp-plumber 一旦编译CSS或者JS发生错误，不会立即中断线程，而只是抛出错误
//在分析一下需要编写的任务
lib
html
json
css
js
images
clean
reload
watch
```
在项目根目录下创建`gulpfile.js`文件

```JavaScript
/*
思路小结:
1、首先我们需要引入gulp模块
2、编写各个文件的拷贝、合并、压缩、发布任务
3、编写一个叫build的总任务将前面的各个任务合并起来
4、编写清除任务,每次发布任务之前对之前的任务进行清除
5、编写服务器serve任务,让服务器启动之后自动执行build任务
6、编写open,让服务器启动之后,自动拉起浏览器打开对应网址
7、编写监控任务watch,对对应的源文件进行监控
8、编写gulp默认任务,让gulp启动后直接启动serve任务
*/
```