# Webpack极限优化

---

## 分析页面打包存在的问题

### `stats`：构建系统的信息

+ package.json中使用`stats`

```
"scripts": {
	"build:stats": "webpack --env production --json > stats.json"
}
```

+ Node API 中使用

```
const webpack = require("webpack")
const config = require("./webpack.config.js")("production")

webpack(config,(err, stats) => {
	if (err) {
		return console.log(err)
	}
	
	if (status.hasErrors) {
		return console.log(stats.toString("errors-only"))
	}
	
	console.log(stats);
});
```

## 体积分析-使用`webpack-bundle-analyzer`

```
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
	plugins: {
		new BundleAnalyzerPlugin()
	}
}

```

## 多进程/多实例-使用HappyPack解析资源

原理：每次webpack解析一个模块，HappyPack会将它及它的依赖分配给worker线程中

```
export.plugins = {
	new HappyPack({
		id: "jsx",
		threads: 4,
		loaders: ["babel-loader"]
	}),
	
	new HappyPack({
		id: "styles",
		threads: 2,
		loaders: ["style-loader","css-loader","scss-loader"]
	})
}
```

## 多进程/多实例-并行压缩

+ 方法一：使用`parallel-uglify-plugin`插件(webpack3推荐)

```
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = {
	plugins: [
		new ParallelUglifyPlugin({
			uglifyJS: {
				output: {
					beautify: false,
					comments: false
				},
				compress: {
					warnings: false,
					drop_console: true,
					collapse_vars: true,
					reduce_vars: true
				}
			}
		})
	]
}
```
+ 方法二：`uglifyjs-webpack-plugin`开启parallel参数(webpack4推荐)

```
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
	plugins: [
		new UglifyJsPlugin({
			uglifyOptions: {
				warnings: false,
				parse: {},
				compress: {},
				mangle: true,
				output: null,
				toplevel: false,
				nameCache: null,
				ie8: false,
				keep_fnames: false
			},
			parallel: true
		})
	]
}
```

## 分包-设置Externals

思路：将react、react-dom基础包通过cdn引入，不打入bundle中

方法：使用`html-webpack-externals-plugin`

```
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");

plugins: [
	new HtmlWebpackExternalsPlugin({
		externals: [
			{
				module: 'react',
				entry: '/dir',
				global: 'React'
			},
			{
				module: 'react-dom',
				entry: '/dir',
				global: 'ReactDOM'
			}
		]
	});
];
```

## 进一步分包-预编译资源模块

思路：将react、react-dom、redux、react-redux基础包和业务基础包打包成一个文件。

方法： 使用	`DllPlugin`进行分包，DllReferencePlugin对manifest.json引用。

```
const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: process.cwd(),
	resolve: {
		extensions: ['.js','.jsx','.json','.scss','.css'],
		modules: [__dirname, 'node_modules']
	},
	entry: {
		library: [
			'react',
			'react-dom',
			'redux',
			'react-redux'
		]
	},
	output: {
		filename: '[name].dll.js',
		path: path.resolve(__dirname, './build/library'),
		library: '[name]'
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: './build/library/[name].json'
		})
	]
}
```

## 缓存

目的：提升二次构建速度

方法：使用`HardSourceWebpackPlugin`或者`cache-loader`

```
mudule.exports = {
	plugins: new HardSourceWebpackPlugin({
		cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
		configHash: function(webpackConfig) {
			return require('node-object-hash')({sort: false}).hash(webpackConfig);
		},
		environmentHash: {
			root: process.cwd(),
			directories: [],
			files: ['package-lock.json', 'yarn.lock']
		},
		info: {
			mode: 'none',
			level: 'debug'
		},
		cachePrune: {
			maxAge: 2 * 24 * 60 * 60 * 1000,
			sizeThreshold: 50 * 1024 * 1024 
		}
	})
}
```

## 体积优化策略

### Scope Hoisting

原理：将所有模块的代码按照引用顺序放在一个函数作用域里，然后适当的重命名一些变量以防止变量名冲突

对比： Scope Hoisting可以减少函数声明代码

```
module.exports = {
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
}

// 要求：必须是ES6的语法，CJS的方式不支持
```
### Tree-shaking

概念：2个模块可能有多个方法，只要其中的某个方法使用到了，则整个文件都会被打到bundle里面去，Tree-shaking就是只把用到的方法打入bundle，没用到的方法会在uglify阶段被擦除掉。

使用：webpack默认的支持，在.babelrc里设置modules:false即可

要求：必须是ES6的语法，CJS的方式不支持。

### 公共资源分离

目的：提取多页面公共JS chunk代码

使用：

+ webpack3使用`CommonsChunkPlugin`
+ webpack4使用`SplitChunksPlugin`

```
module.exports = {
	optimization: {
		splitChunks: {
			chunks: 'async',
			minSize: 30000,
			maxSize: 0,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			automaticNameDelimiter: '~',
			name: true,
			cacheGroups: {
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				},
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				}
			}
		}
	}
}
```

### 图片压缩

要求：基于Node库的imagemin或者tinypng API

使用：配置`image-webpack-loader`

### 动态Polyfill

