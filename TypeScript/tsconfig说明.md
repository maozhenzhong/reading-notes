# tsconfig.json

---

```
{
  "compilerOptions": {

    /* Basic Options */                       
    "target": "es5",                       /* 指定ECMAScript目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'. */
    "module": "commonjs",                  /* 指定生成哪个模块系统代码: 'commonjs', 'amd', 'system', 'umd' or 'es2015'. */
    "lib": [],                             /* 编译过程中需要引入的库文件:  */
	   /*
	    ► ES5 
	    ► ES6 
	    ► ES2015 
	    ► ES7 
	    ► ES2016 
	    ► ES2017 
	    ► ES2018 
	    ► ESNext 
	    ► DOM 
	    ► DOM.Iterable 
	    ► WebWorker 
	    ► ScriptHost 
	    ► ES2015.Core 
	    ► ES2015.Collection 
	    ► ES2015.Generator 
	    ► ES2015.Iterable 
	    ► ES2015.Promise 
	    ► ES2015.Proxy 
	    ► ES2015.Reflect 
	    ► ES2015.Symbol 
	    ► ES2015.Symbol.WellKnown 
	    ► ES2016.Array.Include 
	    ► ES2017.object 
	    ► ES2017.Intl 
	    ► ES2017.SharedMemory 
	    ► ES2017.String 
	    ► ES2017.TypedArrays 
	    ► ES2018.Intl 
	    ► ES2018.Promise 
	    ► ES2018.RegExp 
	    ► ESNext.AsyncIterable 
	    ► ESNext.Array 
	    ► ESNext.Intl 
	    ► ESNext.Symbol 
	   */
    "allowJs": true,                       /* 允许编译JS文件. */
    "checkJs": true,                       /* 报出js文件中的错误 */
    "jsx": "preserve",                     /* 在 .tsx文件里支持JSX: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                   /* 生成相应的 '.d.ts' file. */
    "sourceMap": true,                     /* 生成相应的 '.map' file. */
    "outFile": "./",                       /* 合并输出到单个文件. */
    "outDir": "./",                        /* 最终编译代码保存路径. */
    "rootDir": "./",                       /* 指定输入文件的根目录。使用 --outDir 控制输出目录结构. */
    "removeComments": true,                /* 编译时移除注释. */
    "noEmit": true,                        /* 不生成输出文件. */
    "importHelpers": true,                 /* 从 tslib 导入辅助工具函数（比如 __extends， __rest等）. */
    "downlevelIteration": true,            /* 当以“ES5”或“ES3”为目标时，在“for-of”、“spread”和“destroy”中提供对迭代的全面支持. */
    "isolatedModules": true,               /* 将每个文件作为单独的模块（与“ts.transpileModule”类似）. */

    /* Strict Type-Checking Options */        
    "strict": true,                        /* 启用所有严格的类型检查选项. */
    "noImplicitAny": true,                 /* 在表达式和声明上有隐含的 any类型时报错. */
    "strictNullChecks": true,              /* 在严格的 null检查模式下， null和 undefined值不包含在任何类型里，只允许用它们自己和 any来赋值（有个例外， undefined可以赋值到 void）. */
    "noImplicitThis": true,                /* 当 this表达式的值为 any类型的时候，生成一个错误. */
    "alwaysStrict": true,                  /* 以严格模式解析并为每个源文件生成 "use strict"语句. */

    /* Additional Checks */                   
    "noUnusedLocals": true,                /* 若有未使用的局部变量则抛错. */
    "noUnusedParameters": true,            /* 若有未使用的参数则抛错. */
    "noImplicitReturns": true,             /* 不是函数的所有返回路径都有返回值时报错. */
    "noFallthroughCasesInSwitch": true,    /* 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）. */

    /* Module Resolution Options */           
    "moduleResolution": "node",            /* 决定如何处理模块。或者是"Node"对于Node.js/io.js，或者是"Classic"（默认）。查看模块解析了解详情. */
    "baseUrl": "./",                       /* 解析非相对模块名的基准目录. */
    "paths": {},                           /* 模块名到基于 baseUrl 的路径映射的列表. */
    "rootDirs": [],                        /* 根（root）文件夹列表，表示运行时组合工程结构的内容. */
    "typeRoots": [],                       /* 要包含的类型声明文件路径列表. */
    "types": [],                           /* 要包含的类型声明文件名列表. */
    "allowSyntheticDefaultImports": true,  /* 允许从没有设置默认导出的模块中默认导入。这并不影响代码的输出，仅为了类型检查. */

    /* Source Map Options */                  
    "sourceRoot": "./",                    /* 指定TypeScript源文件的路径，以便调试器定位。当TypeScript文件的位置是在运行时指定时使用此标记。路径信息会被加到 sourceMap里. */
    "mapRoot": "./",                       /* 为调试器指定指定sourcemap文件的路径，而不是使用生成时的路径。当 .map文件是在运行时指定的，并不同于 js文件的地址时使用这个标记。*/
                                           /* 指定的路径会嵌入到 sourceMap里告诉调试器到哪里去找它们. */

    "inlineSourceMap": true,               /* 生成单个sourcemaps文件，而不是将每sourcemaps生成不同的文件. */
    "inlineSources": true,                 /* 将代码与sourcemaps生成到一个文件中，要求同时设置了 --inlineSourceMap或 --sourceMap属性. */

    /* Experimental Options */                
    "experimentalDecorators": true,        /* 启用实验性的ES装饰器. */
    "emitDecoratorMetadata": true          /* 给源码里的装饰器声明加上设计类型元数据. */
  }
}

```