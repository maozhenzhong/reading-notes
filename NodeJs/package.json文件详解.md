# package.json文件详解

---

## `package.json`创建

```
yarn init -y
```

## `package.json`示例

```json
//package.json
{
	"name": "project",
	"version": "0.0.1",
	"author": "maozhenzhong",
	"description": "project description",
	"keywords": ["node.js", "javascript", "typescript"],
	"private": true,
	"bugs": {
		"url": "https:/github.com/maozhenzhong/bugs",
		"email": "maozhenzhong2008@163.com"
	},
	"contributors": [
		{
			"name": "maozhenzhong",
			"email": "maozhenzhong2008@163.com"
		}
	],
	"repository": {
		"type": "git",
		"url": "https://git.org"
	},
	"homepage": "http://github.io/normalize.css",
	"license": "MIT",
	"dependencies": {
		"webpack": "^4.43.0"
	},
	"devDependencies": {
		"browserify": "~13.0.0"
	},
	"scripts": {
		"serve": "vue-cli-service serve --mode development",
		"build": "vue-cli-service build --mode production",
		"lint": "vue-cli-service lint"
	},
	"bin": {
		"webpack": "./bin/webpack.config.js"
	},
	"main": "./webpack.config.js",
	"module": "es/index.js",
	"eslintConfig": {
		"root": true,
		"env": {
			"node": true
		},
		"extends": [
			"plugin:vue/essential",
			"eslint:recommended",
			"@vue/prettier"
		],
		"parserOptions": {
			"parser": "babel-eslint"
		},
		"rules": {}
	},
	"engines": {
		"node": ">=10.0.1 <12.18.2"
	},
	"browserslist": [
		"> 1%",
		"last 2 versions",
		"not dead"
	],
	"style": [],
	"files": []
}
```

## `package.json` 文件配置说明

1. `name`：项目/模块名称，长度必须小于等于214个字符，不能以"."(点)或者"_"(下划线)开头，不能包含大写字母
2. `version`：项目版本
3. `author`：项目开发者，它的值是你在[https://npmjs.org](https://npmjs.org)网站的有效账户名，遵循“账户名<邮件>”的规则，例如：`maozhenzhong maozhenzhong2008@163.com`
4. `description`：项目描述，是一个字符串。它可以帮助人们在使用`npm search`时找到这个包
5. `keywords`：项目关键字，是一个字符串数组。它可以帮助人们在使用`npm search`时找到这个包
6. `private`：是否私有，设置为 true 时，npm 拒绝发布
7. `license`：软件授权条款，让用户知道他们的使用权利和限制
8. `bugs`：`bug` 提交地址
9. `contributors`：项目贡献者
10. `repository`：项目仓库地址
11. `homepage`：项目包的官网 URL
12. `dependencies`：生产环境下，项目运行所需依赖
13. `devDependencies`：开发环境下，项目所需依赖
14. `scripts`：执行 `npm` 脚本命令简写，比如 "serve": "vue-cli-service serve --mode development", 执行 `npm run serve` 就是运行 “vue-cli-service serve --mode development”
15. `bin`：内部命令对应的可执行文件的路径
16. `main`：项目默认执行文件，比如 `require(‘webpack’)`；就会默认加载 `lib` 目录下的 `webpack.js` 文件，如果没有设置，则默认加载项目跟目录下的 `index.js` 文件
17. `module`：是以 ES Module(也就是 ES6)模块化方式进行加载，因为早期没有 ES6 模块化方案时，都是遵循 CommonJS 规范，而 CommonJS 规范的包是以 `main` 的方式表示入口文件的，为了区分就新增了 `module` 方式，但是 ES6 模块化方案效率更高，所以会优先查看是否有 `module` 字段，没有才使用 `main` 字段
18. `eslintConfig`：EsLint 检查文件配置，自动读取验证
19. `engines`：项目运行的平台
20. `browserslist`：供浏览器使用的版本列表
21. `style`：供浏览器使用时，样式文件所在的位置；样式文件打包工具`parcelify`，通过它知道样式文件的打包位置
22.` files`：被项目包含的文件名数组