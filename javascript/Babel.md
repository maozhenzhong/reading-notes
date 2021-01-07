# Babel

---

## 背景

一直做前端开发，但是对项目中的好多配置只会应用，不懂配置，这里参考网上的资料，整理一份自己的文档

## 目录

* [Babel简介](#introduction)

## 内容

### <a href="#introduction" id="introduction">Babel简介</a>

**Babel 是一个 JS 编译器**

`Babel` 是一个工具链，主要用于将 `ECMAScript 2015+` （又可称为`ES6`，`ES7`，`ES8`等）版本的代码转换为向后兼容的 `JavaScript` 语法，以便能够运行在当前和旧版本的浏览器或其他环境中（如低版本的 `Node` 环境中）。

**Babel 具体做了什么**

* 语法转换
* 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)
* 源码转换 (codemods)

通俗点

* ES2015+ 的语法转化（如箭头函数转成普通函数）
* ES2015+ 新增的方法转化（如数组新增的includes方法转化兼容低版本游览器）

* 预设（preset）：插件的封装版
* 插件（plugin）：一个个转换插件

**`@babel/cli` 与 `babel-cli` 区别？**

在网上找资料的时候，经常看到有的babel配置的是 `babel-cli` 有的是配置 `@babel/cli` 。为什么会不一样呢？
因为`babel`升级到了`babel7`。原先babel6的时候用的包都是如`bable-cli`这类的。升级babel7以后，用的包都是以 `@` 开头的如`@babel/cli`,`@babel/core` 这样的包。所以有`@`开头的是babel7 没有`@`开头的是babel6。所以安装包的时候别安装错了。

Babel 是一个编译器（输入源码 => 输出编译后的代码）。就像其他编译器一样，编译过程分为三个阶段：解析、转换和打印输出。

babel提供了一个叫做 preset 的概念，说好听点叫预设，直白点就是插件包的意思，意味着babel会预先替我们做好了一系列的插件包。

常用的插件包

* `@babel/preset-env`
* `@babel/preset-flow`
* `@babel/preset-react`
* `@babel/preset-typescript`
* `babel-plugin-import`
* `babel-preset-remax`

### babel配置

```Bash
npm install -D @babel/cli @babel/core
```

`@babel/cli` 是`babel`提供的命令行工具，主要是提供`babel`这个命令

`Babel` 的核心功能包含在 `@babel/core` 模块中。

### 插件的使用

```Bash
# 转换
npm install --save @babel/plugin-transform-arrow-functions
```

```Bash
# @babel/preset-env 解决的是将高版本写法转化成低版本写法的问题
npm install --save-dev @babel/preset-env
```

```Bash
# es6 新增的方法 入 includes 转换
npm install --save @babel/polyfill
```

`@babel/polyfill` 模块包括 `core-js` 和一个自定义的 `regenerator runtime` 模块，可以模拟完整的 `ES2015+` 环境（不包含第4阶段前的提议）。

这意味着可以使用诸如 `Promise` 和 `WeakMap` 之类的新的内置组件、 `Array.from` 或 `Object.assign` 之类的静态方法、`Array.prototype.includes` 之类的实例方法以及生成器函数(前提是使用了 `@babel/plugin-transform-regenerator` 插件)。为了添加这些功能，`polyfill` 将添加到全局范围和类似 `String` 这样的内置原型中

```Bash
npm install --save-dev webpack webpack-cli babel-loader
```

```Bash
npm install --save core-js@3
```

```JavaScript
// babel.config.js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "targets": {
                    "browsers": [
                        "> 1%",
                        "last 2 versions"
                    ]
                },
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

使用 `@babel/plugin-transform-runtime` 插件，所有帮助程序都将引用模块 `@babel/runtime`，这样就可以避免编译后的代码中出现重复的帮助程序，有效减少包体积

`@babel/plugin-transform-runtime` 是一个可以重复使用 `Babel` 注入的帮助程序，以节省代码大小的插件

```Bash
npm install --save-dev @babel/plugin-transform-runtime
```

```Bash
npm install --save @babel/runtime
```