# ESLint

---

```
/** .eslintrc.js */
module.exports = {
    "extends": "airbnb"
};
```

extends 可以是一个字符串，也可以是一个数组。其中可以包含以下内容： 以 eslint: 开头的字符串，如 eslint:recommended，这样写意味着使用 ESLint 的推荐配置，在这里可以查看其具体有哪些规则； 以 plugin: 开头的字符串，如 "plugin:react/recommended"，这些写意味着应用第三方插件，eslint-plugin-react 的所有推荐规则，关于 plugin 后文中我们还会讨论； 以 eslint-config-开头的包，这其实是第三方规则的集合，由于 eslint 中添加了额外的处理，我们也可以省略 eslint-config-，如上面的 eslint-config-airbnb-base也可以写作airbnb-base; 一个本地路径，指向本地的 ESLint 配置，如 ./rules/react;

```
module.exports = {
  extends: [
    './rules/best-practices',
    './rules/errors',
    './rules/node',
    './rules/style',
    './rules/variables',
    './rules/es6',
    './rules/imports',
  ].map(require.resolve),
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    strict: 'error',
  },
};
```

通过 parserOptions 我们可以告知 ESLint 我们想要支持什么版本的 JS 语法（ecmaVersion），源码类型sourceType，以及是否启用其它一些语法相关的特性（如 jsx）
 
```
module.exports = {
  rules: {
    // enforces getter/setter pairs in objects
    'accessor-pairs': 'off',

    // enforces return statements in callbacks of array's methods
    // https://eslint.org/docs/rules/array-callback-return
    'array-callback-return': ['error', { allowImplicit: true }],

    // treat var statements as if they were block scoped
    'block-scoped-var': 'error',

    // disallow the use of alert, confirm, and prompt
    'no-alert': 'warn',
      ...
    }
}
```

对代码的抽象被称作 AST（Abstract Syntax Tree（抽象语法树））

```
module.exports = {
    meta: {
        type: "problem",

        docs: {
            description: "disallow the use of `debugger`",
            category: "Possible Errors",
            recommended: true,
            url: "https://eslint.org/docs/rules/no-debugger"
        },

        fixable: null,
        schema: [],

        messages: {
            unexpected: "Unexpected 'debugger' statement."
        }
    },

    create(context) {

        return {
            DebuggerStatement(node) {
                context.report({
                    node,
                    messageId: "unexpected"
                });
            }
        };

    }
};
```

+ 一条 rule 就是一个 node 模块，其主要由 meta 和 create 两部分组成
+ meta 代表了这条规则的元数据，如其类别，文档，可接收的参数的 schema 等等，官方文档对其有详细的描述，这里不做赘述。
+ create:如果说 meta 表达了我们想做什么，那么 create 则用表达了这条 rule 具体会怎么分析代码；

Create 返回的是一个对象，其中最常见的键的名字可以是上面我们提到的选择器，在该选择器中，我们可以获取对应选中的内容，随后我们可以针对选中的内容作一定的判断，看是否满足我们的规则，如果不满足，可用 context.report()抛出问题，ESLint 会利用我们的配置对抛出的内容做不同的展示。

### code path analysis

一个 code path 由多个 CodePathSegment 组成，ESLint 将 code path 抽象为 5 个事件。

+ onCodePathStart
+ onCodePathEnd
+ onCodePathSegmentStart
+ onCodePathSegmentEnd
+ nCodePathSegmentLoop