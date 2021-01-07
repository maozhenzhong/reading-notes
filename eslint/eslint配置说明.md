# eslint配置说明

---

## [`eslint-config-standard`](https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json)

```JSON
{
  "parserOptions": {
    "ecmaVersion": 2021,
    "ecmaFeatures": {
      "jsx": true
    },
    "sourceType": "module"
  },

  "env": {
    "es2021": true,
    "node": true
  },

  "plugins": [
    "import",
    "node",
    "promise"
  ],

  "globals": {
    "document": "readonly",
    "navigator": "readonly",
    "window": "readonly"
  },

  "rules": {
    "no-var": "warn",
    "accessor-pairs": ["error", { "setWithoutGet": true, "enforceForClassMembers": true }],
    "array-bracket-spacing": ["error", "never"],
    "array-callback-return": ["error", {
      "allowImplicit": false,
      "checkForEach": false
    }],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    "block-spacing": ["error", "always"],
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": ["error", {
      "allow": ["^UNSAFE_"],
      "properties": "never",
      "ignoreGlobals": true
    }],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    }],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-style": ["error", "last"],
    "computed-property-spacing": ["error", "never", { "enforceForClassMembers": true }],
    "constructor-super": "error",
    "curly": ["error", "multi-line"],
    "default-case-last": "error",
    "dot-location": ["error", "property"],
    "dot-notation": ["error", { "allowKeywords": true }],
    "eol-last": "error",
    "eqeqeq": ["error", "always", { "null": "ignore" }],
    "func-call-spacing": ["error", "never"],
    "generator-star-spacing": ["error", { "before": true, "after": true }],
    "indent": ["error", 2, {
      "SwitchCase": 1,
      "VariableDeclarator": 1,
      "outerIIFEBody": 1,
      "MemberExpression": 1,
      "FunctionDeclaration": { "parameters": 1, "body": 1 },
      "FunctionExpression": { "parameters": 1, "body": 1 },
      "CallExpression": { "arguments": 1 },
      "ArrayExpression": 1,
      "ObjectExpression": 1,
      "ImportDeclaration": 1,
      "flatTernaryExpressions": false,
      "ignoreComments": false,
      "ignoredNodes": ["TemplateLiteral *", "JSXElement", "JSXElement > *", "JSXAttribute", "JSXIdentifier", "JSXNamespacedName", "JSXMemberExpression", "JSXSpreadAttribute", "JSXExpressionContainer", "JSXOpeningElement", "JSXClosingElement", "JSXFragment", "JSXOpeningFragment", "JSXClosingFragment", "JSXText", "JSXEmptyExpression", "JSXSpreadChild"],
      "offsetTernaryExpressions": true
    }],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
    "keyword-spacing": ["error", { "before": true, "after": true }],
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
    "multiline-ternary": ["error", "always-multiline"],
    "new-cap": ["error", { "newIsCap": true, "capIsNew": false, "properties": true }],
    "new-parens": "error",
    "no-array-constructor": "error",
    "no-async-promise-executor": "error",
    "no-caller": "error",
    "no-case-declarations": "error",
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",
    "no-cond-assign": "error",
    "no-const-assign": "error",
    "no-constant-condition": ["error", { "checkLoops": false }],
    "no-control-regex": "error",
    "no-debugger": "error",
    "no-delete-var": "error",
    "no-dupe-args": "error",
    "no-dupe-class-members": "error",
    "no-dupe-keys": "error",
    "no-duplicate-case": "error",
    "no-useless-backreference": "error",
    "no-empty": ["error", { "allowEmptyCatch": true }],
    "no-empty-character-class": "error",
    "no-empty-pattern": "error",
    "no-eval": "error",
    "no-ex-assign": "error",
    "no-extend-native": "error",
    "no-extra-bind": "error",
    "no-extra-boolean-cast": "error",
    "no-extra-parens": ["error", "functions"],
    "no-fallthrough": "error",
    "no-floating-decimal": "error",
    "no-func-assign": "error",
    "no-global-assign": "error",
    "no-implied-eval": "error",
    "no-import-assign": "error",
    "no-invalid-regexp": "error",
    "no-irregular-whitespace": "error",
    "no-iterator": "error",
    "no-labels": ["error", { "allowLoop": false, "allowSwitch": false }],
    "no-lone-blocks": "error",
    "no-loss-of-precision": "error",
    "no-misleading-character-class": "error",
    "no-prototype-builtins": "error",
    "no-useless-catch": "error",
    "no-mixed-operators": ["error", {
      "groups": [
        ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
        ["&&", "||"],
        ["in", "instanceof"]
      ],
      "allowSamePrecedence": true
    }],
    "no-mixed-spaces-and-tabs": "error",
    "no-multi-spaces": "error",
    "no-multi-str": "error",
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    "no-new": "error",
    "no-new-func": "error",
    "no-new-object": "error",
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",
    "no-proto": "error",
    "no-redeclare": ["error", { "builtinGlobals": false }],
    "no-regex-spaces": "error",
    "no-return-assign": ["error", "except-parens"],
    "no-self-assign": ["error", { "props": true }],
    "no-self-compare": "error",
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-tabs": "error",
    "no-template-curly-in-string": "error",
    "no-this-before-super": "error",
    "no-throw-literal": "error",
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": ["error", { "defaultAssignment": false }],
    "no-unreachable": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true,
      "allowTaggedTemplates": true
    }],
    "no-unused-vars": ["error", {
      "args": "none",
      "caughtErrors": "none",
      "ignoreRestSiblings": true,
      "vars": "all"
    }],
    "no-use-before-define": ["error", { "functions": false, "classes": false, "variables": false }],
    "no-useless-call": "error",
    "no-useless-computed-key": "error",
    "no-useless-constructor": "error",
    "no-useless-escape": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-void": "error",
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
    "one-var": ["error", { "initialized": "never" }],
    "operator-linebreak": ["error", "after", { "overrides": { "?": "before", ":": "before", "|>": "before" } }],
    "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
    "prefer-const": ["error", {"destructuring": "all"}],
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": ["error", { "disallowRedundantWrapping": true }],
    "quote-props": ["error", "as-needed"],
    "quotes": ["error", "single", { "avoidEscape": true, "allowTemplateLiterals": false }],
    "rest-spread-spacing": ["error", "never"],
    "semi": ["error", "never"],
    "semi-spacing": ["error", { "before": false, "after": true }],
    "space-before-blocks": ["error", "always"],
    "space-before-function-paren": ["error", "always"],
    "space-in-parens": ["error", "never"],
    "space-infix-ops": "error",
    "space-unary-ops": ["error", { "words": true, "nonwords": false }],
    "spaced-comment": ["error", "always", {
      "line": { "markers": ["*package", "!", "/", ",", "="] },
      "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
    }],
    "symbol-description": "error",
    "template-curly-spacing": ["error", "never"],
    "template-tag-spacing": ["error", "never"],
    "unicode-bom": ["error", "never"],
    "use-isnan": ["error", {
      "enforceForSwitchCase": true,
      "enforceForIndexOf": true
    }],
    "valid-typeof": ["error", { "requireStringLiterals": true }],
    "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
    "yield-star-spacing": ["error", "both"],
    "yoda": ["error", "never"],
    // eslint-plugin-import // https://github.com/benmosher/eslint-plugin-import
    "import/export": "error",
    "import/first": "error",
    "import/no-absolute-path": ["error", { "esmodule": true, "commonjs": true, "amd": false }],
    "import/no-duplicates": "error",
    "import/no-named-default": "error",
    "import/no-webpack-loader-syntax": "error",

    "node/handle-callback-err": ["error", "^(err|error)$" ],
    "node/no-callback-literal": "error",
    "node/no-deprecated-api": "error",
    "node/no-exports-assign": "error",
    "node/no-new-require": "error",
    "node/no-path-concat": "error",
    "node/process-exit-as-throw": "error",

    "promise/param-names": "error"
  }
}
```

## [`@qxy/eslint-config`](https://github.com/qxy-fe/configs/blob/main/packages/eslint-config/lib/index.js)

```JavaScript
/**
 * Based on Standard JavaScript Style
 *
 * @see https://github.com/standard/eslint-config-standard
 */

module.exports = {
  extends: [
    // Standard JavaScript style
    'standard',
  ],

  rules: {
    /**
     * Requires the use of single quotes wherever possible
     *
     * @see https://eslint.org/docs/rules/quotes
     */
    quotes: ['error', 'single', {
      allowTemplateLiterals: true,
    }],

    /**
     * Requires the use of `const` or `let` instead of `var`
     *
     * @see https://eslint.org/docs/rules/no-var
     */
    'no-var': ['error'],

    /**
     * Requires the use of trailing commas in object and array literals
     *
     * @see https://eslint.org/docs/rules/comma-dangle
     */
    'comma-dangle': ['error', 'always-multiline'],

    /**
     * Enforce a maximum file length
     *
     * @see https://eslint.org/docs/rules/max-lines
     */
    'max-lines': ['error', {
      max: 1000,
      skipComments: true,
      skipBlankLines: true,
    }],

    /**
     * Limit Cyclomatic Complexity
     *
     * @see https://eslint.org/docs/rules/complexity
     */
    complexity: ['error', { max: 30 }],

    /**
     * Enforce a maximum number of parameters in function definitions
     *
     * @see https://eslint.org/docs/rules/max-params
     */
    'max-params': ['error', { max: 5 }],

    /**
     * Enforce a maximum line length
     *
     * @see https://eslint.org/docs/rules/max-len
     */
    'max-len': ['error', {
      code: 200,
      tabWidth: 2,
      comments: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
      ignoreTrailingComments: true,
    }],

    /**
     * Enforce a maximum depth that callbacks can be nested
     *
     * @see https://eslint.org/docs/rules/max-nested-callbacks
     */
    'max-nested-callbacks': ['error', { max: 10 }],

    /**
     * Enforce a maximum function length
     *
     * @see https://eslint.org/docs/rules/max-lines-per-function
     */
    'max-lines-per-function': ['error', {
      max: 100,
      skipBlankLines: true,
      skipComments: true,
    }],

    /**
     * Enforce a maximum number of statements allowed per line
     *
     * @see https://eslint.org/docs/rules/max-statements-per-line
     */
    'max-statements-per-line': ['error', { max: 2 }],

    /**
     * Enforce a maximum depth that blocks can be nested
     *
     * @see https://eslint.org/docs/rules/max-depth
     */
    'max-depth': ['error', { max: 5 }],
  },
}
```

## [`@qxy/eslint-config-vue`](https://github.com/qxy-fe/configs/blob/main/packages/eslint-config-vue/lib/index.js)

```JavaScript
/**
 * Based on Vue.js rules
 *
 * @see https://eslint.vuejs.org/rules
 */

module.exports = {
  extends: [
    '@qxy',
    // Vue style guide
    'plugin:vue/recommended',
  ],

  plugins: ['vue'],

  parserOptions: {
    parser: require.resolve('babel-eslint'),
  },

  // Rules overrides
  rules: {
    /**
     * Disallow use of v-html to prevent XSS attack
     *
     * @see https://eslint.vuejs.org/rules/no-v-html.html
     */
    'vue/no-v-html': 'off',

    /**
     * Require a line break before and after the contents of a multiline element
     *
     * @see https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html
     */
    'vue/multiline-html-element-content-newline': ['error', {
      ignoreWhenEmpty: true,
      ignores: [],
      allowEmptyLines: false,
    }],

    /**
     * Require a line break before and after the contents of a singleline element
     *
     * @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
     */
    'vue/singleline-html-element-content-newline': ['error', {
      ignoreWhenNoAttributes: true,
      ignoreWhenEmpty: true,
      ignores: [],
    }],

    /**
     * Disallow usage of this in template
     *
     * @see https://eslint.vuejs.org/rules/this-in-template.html
     */
    'vue/this-in-template': ['error', 'never'],

    /**
     * Require or disallow trailing commas
     *
     * @see https://eslint.vuejs.org/rules/comma-dangle.html
     */
    'vue/comma-dangle': ['error', 'always-multiline'],

    /**
     * Enforce consistent spacing before and after commas
     *
     * @see https://eslint.org/docs/rules/comma-spacing
     */
    'vue/comma-spacing': ['error', {
      before: false,
      after: true,
    }],

    /**
     * Enforce consistent spacing inside braces
     *
     * @see https://eslint.vuejs.org/rules/object-curly-spacing.html
     */
    'vue/object-curly-spacing': ['error', 'always', {}],

    /**
     * Disallow static inline style attributes
     *
     * @see https://eslint.vuejs.org/rules/no-static-inline-styles.html
     */
    'vue/no-static-inline-styles': ['error', {
      allowBinding: true,
    }],

    /**
     * Enforce order of component top-level elements
     *
     * @see https://eslint.vuejs.org/rules/component-tags-order.html
     */
    'vue/component-tags-order': ['error', {
      order: ['template', 'script', 'style'],
    }],

    /**
     * Enforce order of attributes
     *
     * @see https://eslint.vuejs.org/rules/attributes-order.html
     */
    'vue/attributes-order': ['error', {
      order: [
        'EVENTS', // '@click="functionCall"', 'v-on="event"'
        'TWO_WAY_BINDING', // 'v-model'
        'OTHER_DIRECTIVES', // 'v-custom-directive'
        'LIST_RENDERING', // 'v-for item in items'
        'CONDITIONALS', //  'v-if', 'v-show', 'v-cloak'
        'CONTENT', // 'v-text', 'v-html'
        'UNIQUE', // 'ref', 'key', 'v-slot', 'slot'
        'DEFINITION', // 'is', 'v-is'
        'OTHER_ATTR', // 'custom-prop="foo"', ':prop="foo"'
        'RENDER_MODIFIERS', // 'v-once', 'v-pre'
        'GLOBAL', // 'id'
      ],
      alphabetical: false,
    }],

    /**
     * Enforce order of properties in components
     *
     * @see https://eslint.vuejs.org/rules/order-in-components.html
     */
    'vue/order-in-components': ['error', {
      order: [
        'el',
        'name',
        'key',
        'parent',
        'functional',
        ['provide', 'inject'],
        ['delimiters', 'comments'],
        ['components', 'directives', 'filters'],
        'extends',
        'mixins',
        'layout',
        'middleware',
        'validate',
        'scrollToTop',
        'transition',
        'loading',
        'inheritAttrs',
        'model',
        ['props', 'propsData'],
        'emits',
        'setup',
        'asyncData',
        'computed',
        'data',
        'fetch',
        'head',
        'methods',
        ['template', 'render'],
        'watch',
        'watchQuery',
        'LIFECYCLE_HOOKS',
        'renderError',
        'ROUTER_GUARDS',
      ],
    }],

    /**
     * Put multiple attrs in multiple lines
     *
     * @see https://eslint.vuejs.org/rules/max-attributes-per-line.html
     */
    'vue/max-attributes-per-line': ['error', {
      singleline: 1,
      multiline: {
        max: 1,
        allowFirstLine: false,
      },
    }],

    // ===========================================================
    // Rules below are uncategorized
    // ===========================================================

    /**
     * Enforce specific casing for the component naming style in template
     *
     * @see https://eslint.vuejs.org/rules/component-name-in-template-casing.html
     */
    'vue/component-name-in-template-casing': ['error', 'kebab-case', {
      registeredComponentsOnly: true,
      ignores: [],
    }],

    /**
     * Enforce unified line brake in HTML comments
     *
     * @see https://eslint.vuejs.org/rules/html-comment-content-newline.html
     */
    'vue/html-comment-content-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],

    /**
     * Enforce unified spacing in HTML comments
     *
     * @see https://eslint.vuejs.org/rules/html-comment-content-spacing.html
     */
    'vue/html-comment-content-spacing': ['error', 'always'],

    // vue/html-comment-indent
    // vue/match-component-file-name
    // vue/no-bare-strings-in-template
    // vue/no-boolean-default

    /**
     * Disallow the <template> <script> <style> block to be empty
     *
     * @see https://eslint.vuejs.org/rules/no-empty-component-block.html
     */
    'vue/no-empty-component-block': 'error',

    // vue/no-multiple-objects-in-class

    /**
     * Disallow a potential typo in your component property
     *
     * @see https://eslint.vuejs.org/rules/no-potential-component-option-typo.html
     */
    'vue/no-potential-component-option-typo': ['error', {
      presets: ['all'],
      custom: [],
    }],

    /**
     * Disallow target="_blank" attribute without rel="noopener noreferrer"
     *
     * @see https://eslint.vuejs.org/rules/no-template-target-blank.html
     */
    'vue/no-template-target-blank': ['error', {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
    }],

    /**
     * Disallow unsupported Vue.js syntax on the specified version
     *
     * @see https://eslint.vuejs.org/rules/no-unsupported-features.html
     */
    'vue/no-unsupported-features': ['error', {
      version: '2.6.0',
    }],

    /**
     * Disallow unnecessary mustache interpolations
     *
     * @see https://eslint.vuejs.org/rules/no-useless-mustaches.html
     */
    'vue/no-useless-mustaches': ['error', {
      ignoreIncludesComment: false,
      ignoreStringEscape: false,
    }],

    /**
     * Disallow unnecessary v-bind directives
     *
     * @see https://eslint.vuejs.org/rules/no-useless-v-bind.html
     */
    'vue/no-useless-v-bind': ['error', {
      ignoreIncludesComment: false,
      ignoreStringEscape: false,
    }],

    /**
     * Require or disallow padding lines between blocks
     *
     * @see https://eslint.vuejs.org/rules/padding-line-between-blocks.html
     */
    'vue/padding-line-between-blocks': ['error', 'always'],

    /**
     * Require the component to be directly exported
     *
     * @see https://eslint.vuejs.org/rules/require-direct-export.html
     */
    'vue/require-direct-export': ['error', {
      disallowFunctionalComponentFunction: false,
    }],

    /**
     * Require a name property in Vue components
     *
     * @see https://eslint.vuejs.org/rules/require-name-property.html
     */
    'vue/require-name-property': 'error',

    /**
     * Enforce consistent indentation in <script>
     *
     * @see https://eslint.vuejs.org/rules/script-indent.html
     */
    'vue/script-indent': ['error', 2, {
      baseIndent: 0,
      switchCase: 1,
      ignores: [],
    }],

    /**
     * Enforce static class names order
     *
     * @see https://eslint.vuejs.org/rules/static-class-names-order.html
     */
    'vue/static-class-names-order': 'error',

    /**
     * Enforce v-for directive's delimiter style
     *
     * @see https://eslint.vuejs.org/rules/v-for-delimiter-style.html
     */
    'vue/v-for-delimiter-style': ['error', 'in'],

    /**
     * Enforce or forbid parentheses after method calls without arguments in v-on directives
     *
     * @see https://eslint.vuejs.org/rules/v-on-function-call.html
     */
    'vue/v-on-function-call': ['error', 'never', {
      ignoreIncludesComment: true,
    }],

    /**
     * Enforce new lines between multi-line properties in Vue components
     *
     * @see https://eslint.vuejs.org/rules/new-line-between-multi-line-property.html
     */
    'vue/new-line-between-multi-line-property': ['error', {
      minLineOfMultilineProperty: 2,
    }],
  },
}
```

## [ESLint Rules](https://cn.eslint.org/docs/rules/#nodejs-and-commonjs)

### Possible Errors

> 这些规则与 JavaScript 代码中可能的错误或逻辑错误有关

```JSON
{
  "extends": "eslint:recommended"
}
```

* for-direction: 强制 “for” 循环中更新子句的计数器朝着正确的方向移动
* getter-return: 强制 getter 函数中出现 return 语句
* no-async-promise-executor: 禁止使用异步函数作为 Promise executor
  * [eslint-config-standard]
* no-await-in-loop: 禁止在循环中出现 await
* no-compare-neg-zero: 禁止与 -0 进行比较
  * [eslint-config-standard]
* no-cond-assign: 禁止条件表达式中出现赋值操作符
  * [eslint-config-standard]
* no-console: 禁用 console
* no-constant-condition: 禁止在条件中使用常量表达式
  * [eslint-config-standard]
* no-control-regex: 禁止在正则表达式中使用控制字符
  * [eslint-config-standard]
* no-debugger: 禁用 debugger
  * [eslint-config-standard]
* no-dupe-args: 禁止 function 定义中出现重名参数
  * [eslint-config-standard]
* no-dupe-keys: 禁止对象字面量中出现重复的 key
  * [eslint-config-standard]
* no-duplicate-case: 禁止出现重复的 case 标签
  * [eslint-config-standard]
* no-empty: 禁止出现空语句块
  * [eslint-config-standard]
* no-empty-character-class: 禁止在正则表达式中使用空字符集
  * [eslint-config-standard]
* no-ex-assign: 禁止对 catch 子句的参数重新赋值
  * [eslint-config-standard]
* no-extra-boolean-cast: 禁止不必要的布尔转换
  * [eslint-config-standard]
* no-extra-parens: 禁止不必要的括号
  * [eslint-config-standard]
* no-extra-semi: 禁止不必要的分号
* no-func-assign: 禁止对 function 声明重新赋值
  * [eslint-config-standard]
* no-inner-declarations: 禁止在嵌套的块中出现变量声明或 function 声明
* no-invalid-regexp: 禁止 RegExp 构造函数中存在无效的正则表达式字符串
  * [eslint-config-standard]
* no-irregular-whitespace: 禁止不规则的空白
  * [eslint-config-standard]
* no-misleading-character-class: 不允许在字符类语法中出现由多个代码点组成的字符
  * [eslint-config-standard]
* no-obj-calls: 禁止把全局对象作为函数调用
  * [eslint-config-standard]
* no-prototype-builtins: 禁止直接调用 Object.prototypes 的内置属性
  * [eslint-config-standard]
* no-regex-spaces: 禁止正则表达式字面量中出现多个空格
  * [eslint-config-standard]
* no-sparse-arrays: 禁用稀疏数组
  * [eslint-config-standard]
* no-template-curly-in-string: 禁止在常规字符串中出现模板字面量占位符语法
  * [eslint-config-standard]
* no-unexpected-multiline: 禁止出现令人困惑的多行表达式
  * [eslint-config-standard]
* no-unreachable: 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
  * [eslint-config-standard]
* no-unsafe-finally: 禁止在 finally 语句块中出现控制流语句
  * [eslint-config-standard]
* no-unsafe-negation: 禁止对关系运算符的左操作数使用否定操作符
  * [eslint-config-standard]
* require-atomic-updates: 禁止由于 await 或 yield的使用而可能导致出现竞态条件的赋值
* use-isnan: 要求使用 isNaN() 检查 NaN
  * [eslint-config-standard]
* valid-typeof: 强制 typeof 表达式与有效的字符串进行比较
  * [eslint-config-standard]

### Best Practices

> 这些规则是关于最佳实践的，帮助你避免一些问题

* accessor-pairs: 强制 getter 和 setter 在对象中成对出现
  * [eslint-config-standard]
* array-callback-return: 强制数组方法的回调函数中有 return 语句
  * [eslint-config-standard]
* block-scoped-var: 强制把变量的使用限制在其定义的作用域范围内
* class-methods-use-this: 强制类方法使用 this
* complexity: 指定程序中允许的最大环路复杂度
  * [@qxy/eslint-config]
* consistent-return: 要求 return 语句要么总是指定返回的值，要么不指定
* curly: 强制所有控制语句使用一致的括号风格
  * [eslint-config-standard]
* default-case: 要求 switch 语句中有 default 分支
* dot-location: 强制在点号之前和之后一致的换行
  * [eslint-config-standard]
* dot-notation: 强制尽可能地使用点号
  * [eslint-config-standard]
* eqeqeq: 要求使用 === 和 !==
  * [eslint-config-standard]
* guard-for-in: 要求 for-in 循环中有一个 if 语句
* max-classes-per-file: 强制每个文件中包含的的类的最大数量
* no-alert: 禁用 alert、confirm 和 prompt
* no-caller: 禁用 arguments.caller 或 arguments.callee
  * [eslint-config-standard]
* no-case-declarations: 不允许在 case 子句中使用词法声明
  * [eslint-config-standard]
* no-div-regex: 禁止除法操作符显式的出现在正则表达式开始的位置
* no-else-return: 禁止 if 语句中 return 语句之后有 else 块
* no-empty-function: 禁止出现空函数
* no-empty-pattern: 禁止使用空解构模式
  * [eslint-config-standard]
* no-eq-null: 禁止在没有类型检查操作符的情况下与 null 进行比较
* no-eval: 禁用 eval()
  * [eslint-config-standard]
* no-extend-native: 禁止扩展原生类型
  * [eslint-config-standard]
* no-extra-bind: 禁止不必要的 .bind() 调用
  * [eslint-config-standard]
* no-extra-label: 禁用不必要的标签
* no-fallthrough: 禁止 case 语句落空
  * [eslint-config-standard]
* no-floating-decimal: 禁止数字字面量中使用前导和末尾小数点
  * [eslint-config-standard]
* no-global-assign: 禁止对原生对象或只读的全局对象进行赋值
  * [eslint-config-standard]
* no-implicit-coercion: 禁止使用短符号进行类型转换
* no-implicit-globals: 禁止在全局范围内使用变量声明和 function 声明
* no-implied-eval: 禁止使用类似 eval() 的方法
  * [eslint-config-standard]
* no-invalid-this: 禁止 this 关键字出现在类和类对象之外
* no-iterator: 禁用 __iterator__ 属性
  * [eslint-config-standard]
* no-labels: 禁用标签语句
  * [eslint-config-standard]
* no-lone-blocks: 禁用不必要的嵌套块
  * [eslint-config-standard]
* no-loop-func: 禁止在循环语句中出现包含不安全引用的函数声明
* no-magic-numbers: 禁用魔术数字
* no-multi-spaces: 禁止使用多个空格
  * [eslint-config-standard]
* no-multi-str: 禁止使用多行字符串
  * [eslint-config-standard]
* no-new: 禁止使用 new 以避免产生副作用
  * [eslint-config-standard]
* no-new-func: 禁止对 Function 对象使用 new 操作符
  * [eslint-config-standard]
* no-new-wrappers: 禁止对 String，Number 和 Boolean 使用 new 操作符
  * [eslint-config-standard]
* no-octal: 禁用八进制字面量
  * [eslint-config-standard]
* no-octal-escape: 禁止在字符串中使用八进制转义序列
  * [eslint-config-standard]
* no-param-reassign: 禁止对 function 的参数进行重新赋值
* no-proto: 禁用 __proto__ 属性
  * [eslint-config-standard]
* no-redeclare: 禁止多次声明同一变量
  * [eslint-config-standard]
* no-restricted-properties: 禁止使用对象的某些属性
* no-return-assign: 禁止在 return 语句中使用赋值语句
  * [eslint-config-standard]
* no-return-await: 禁用不必要的 return await
* no-script-url: 禁止使用 javascript: url
* no-self-assign: 禁止自我赋值
  * [eslint-config-standard]
* no-self-compare: 禁止自身比较
  * [eslint-config-standard]
* no-sequences: 禁用逗号操作符
  * [eslint-config-standard]
* no-throw-literal: 禁止抛出异常字面量
  * [eslint-config-standard]
* no-unmodified-loop-condition: 禁用一成不变的循环条件
  * [eslint-config-standard]
* no-unused-expressions: 禁止出现未使用过的表达式
  * [eslint-config-standard]
* no-unused-labels: 禁用出现未使用过的标
* no-useless-call: 禁止不必要的 .call() 和 .apply()
  * [eslint-config-standard]
* no-useless-catch: 禁止不必要的 catch 子句
  * [eslint-config-standard]
* no-useless-concat: 禁止不必要的字符串字面量或模板字面量的连接
* no-useless-escape: 禁用不必要的转义字符
  * [eslint-config-standard]
* no-useless-return: 禁止多余的 return 语句
  * [eslint-config-standard]
* no-void: 禁用 void 操作符
  * [eslint-config-standard]
* no-warning-comments: 禁止在注释中使用特定的警告术语
* no-with: 禁用 with 语句
  * [eslint-config-standard]
* prefer-named-capture-group: 建议在正则表达式中使用命名捕获组
* prefer-promise-reject-errors: 要求使用 Error 对象作为 Promise 拒绝的原因
  * [eslint-config-standard]
* radix: 强制在 parseInt() 使用基数参数
* require-await: 禁止使用不带 await 表达式的 async 函数
* require-unicode-regexp: 强制在 RegExp 上使用 u 标志
* vars-on-top: 要求所有的 var 声明出现在它们所在的作用域顶部
* wrap-iife: 要求 IIFE 使用括号括起来
  * [eslint-config-standard]
* yoda: 要求或禁止 “Yoda” 条件
  * [eslint-config-standard]
* default-case-last: 强制switch语句中的默认子句为last（default-case-last）
  * [eslint-config-standard]
* no-useless-backreference: 在正则表达式中禁止无用的反向引用
  * [eslint-config-standard]
* no-import-assign: 禁止分配给导入的绑定
  * [eslint-config-standard]
* no-loss-of-precision: 禁止丢失精度的数字文字
  * [eslint-config-standard]
* no-unreachable-loop: 禁止仅允许一次迭代的主体进行循环
  * [eslint-config-standard]
* prefer-regex-literals: 禁止使用RegExp构造函数来支持正则表达式文字
  * [eslint-config-standard]

### Strict Mode

> 该规则与使用严格模式和严格模式指令有关

* strict: 要求或禁止使用严格模式指令

### Variables

> 这些规则与变量声明有关

* init-declarations: 要求或禁止 var 声明中的初始化
* no-delete-var: 禁止删除变量
  * [eslint-config-standard]
* no-label-var: 不允许标签与变量同名
* no-restricted-globals: 禁用特定的全局变量
* no-shadow: 禁止变量声明与外层作用域的变量同名
* no-shadow-restricted-names: 禁止将标识符定义为受限的名字
  * [eslint-config-standard]
* no-undef: 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
  * [eslint-config-standard]
* no-undef-init: 禁止将变量初始化为 undefined
  * [eslint-config-standard]
* no-undefined: 禁止将 undefined 作为标识符
* no-unused-vars: 禁止出现未使用过的变量
  * [eslint-config-standard]
* no-use-before-define: 禁止在变量定义之前使用它们
  * [eslint-config-standard]

### Node.js and CommonJS

> 这些规则是关于Node.js 或 在浏览器中使用CommonJS 的

* callback-return: 强制数组方法的回调函数中有 return 语句
* global-require: 要求 require() 出现在顶层模块作用域中
* handle-callback-err: 要求回调函数中有容错处理
* no-buffer-constructor: 禁用 Buffer() 构造函数
* no-mixed-requires: 禁止混合常规变量声明和 require 调用
* no-new-require: 禁止调用 require 时使用 new 操作符
* no-path-concat: 禁止对 __dirname 和 __filename 进行字符串连接
* no-process-env: 禁用 process.env
* no-process-exit: 禁用 process.exit()
* no-restricted-modules: 禁用通过 require 加载的指定模块
* no-sync: 禁用同步方法

### Stylistic Issues

> 这些规则是关于风格指南的，而且是非常主观的

* array-bracket-newline: 在数组开括号后和闭括号前强制换行
* array-bracket-spacing: 强制数组方括号中使用一致的空格
  * [eslint-config-standard]
* array-element-newline: 强制数组元素间出现换行
* block-spacing: 禁止或强制在代码块中开括号前和闭括号后有空格
  * [eslint-config-standard]
* brace-style: 强制在代码块中使用一致的大括号风格
  * [eslint-config-standard]
* camelcase: 强制使用骆驼拼写法命名约定
  * [eslint-config-standard]
* capitalized-comments: 强制或禁止对注释的第一个字母大写
* comma-dangle: 要求或禁止末尾逗号
  * [eslint-config-standard]
  * [@qxy/eslint-config]
* comma-spacing: 强制在逗号前后使用一致的空格
  * [eslint-config-standard]
* comma-style: 强制使用一致的逗号风格
  * [eslint-config-standard]
* computed-property-spacing: 强制在计算的属性的方括号中使用一致的空格
  * [eslint-config-standard]
* consistent-this: 当获取当前执行环境的上下文时，强制使用一致的命名
* eol-last: 要求或禁止文件末尾存在空行
  * [eslint-config-standard]
* func-call-spacing: 要求或禁止在函数标识符和其调用之间有空格
  * [eslint-config-standard]
* func-name-matching: 要求函数名与赋值给它们的变量名或属性名相匹配
* func-names: 要求或禁止使用命名的 function 表达式
* func-style: 强制一致地使用 function 声明或表达式
* function-paren-newline: 强制在函数括号内使用一致的换行
* id-blacklist: 禁用指定的标识符
* id-length: 强制标识符的最小和最大长度
* id-match: 要求标识符匹配一个指定的正则表达式
* implicit-arrow-linebreak: 强制隐式返回的箭头函数体的位置
* indent: 强制使用一致的缩进
  * [eslint-config-standard]
* jsx-quotes: 强制在 JSX 属性中一致地使用双引号或单引号
* key-spacing: 强制在对象字面量的属性中键和值之间使用一致的间距
  * [eslint-config-standard]
* keyword-spacing: 强制在关键字前后使用一致的空格
  * [eslint-config-standard]
* line-comment-position: 强制行注释的位置
* linebreak-style: 强制使用一致的换行风格
* lines-around-comment: 要求在注释周围有空行
* lines-between-class-members: 要求或禁止类成员之间出现空行
  * [eslint-config-standard]
* max-depth: 强制可嵌套的块的最大深度
  * [@qxy/eslint-config]
* max-len: 强制一行的最大长度
  * [@qxy/eslint-config]
* max-lines: 强制最大行数
  * [@qxy/eslint-config]
* max-lines-per-function: 强制函数最大代码行数
  * [@qxy/eslint-config]
* max-nested-callbacks: 强制回调函数最大嵌套深度
  * [@qxy/eslint-config]
* max-params: 强制函数定义中最多允许的参数数量
  * [@qxy/eslint-config]
* max-statements: 强制函数块最多允许的的语句数量
* max-statements-per-line: 强制每一行中所允许的最大语句数量
  * [@qxy/eslint-config]
* multiline-comment-style: 强制对多行注释使用特定风格
* multiline-ternary: 要求或禁止在三元操作数中间换行
  * [eslint-config-standard]
* new-cap: 要求构造函数首字母大写
  * [eslint-config-standard]
* new-parens: 强制或禁止调用无参构造函数时有圆括号
  * [eslint-config-standard]
* newline-per-chained-call: 要求方法链中每个调用都有一个换行符
* no-array-constructor: 禁用 Array 构造函数
  * [eslint-config-standard]
* no-bitwise: 禁用按位运算符
* no-continue: 禁用 continue 语句
* no-inline-comments: 禁止在代码后使用内联注释
* no-lonely-if: 禁止 if 作为唯一的语句出现在 else 语句中
* no-mixed-operators: 禁止混合使用不同的操作符
  * [eslint-config-standard]
* no-mixed-spaces-and-tabs: 禁止空格和 tab 的混合缩进
  * [eslint-config-standard]
* no-multi-assign: 禁止连续赋值
* no-multiple-empty-lines: 禁止出现多行空行
  * [eslint-config-standard]
* no-negated-condition: 禁用否定的表达式
* no-nested-ternary: 禁用嵌套的三元表达式
* no-new-object: 禁用 Object 的构造函数
  * [eslint-config-standard]
* no-plusplus: 禁用一元操作符 ++ 和 --
* no-restricted-syntax: 禁用特定的语法
* no-tabs: 禁用 tab
  * [eslint-config-standard]
* no-ternary: 禁用三元操作符
* no-trailing-spaces: 禁用行尾空格
  * [eslint-config-standard]
* no-underscore-dangle: 禁止标识符中有悬空下划线
* no-unneeded-ternary: 禁止可以在有更简单的可替代的表达式时使用三元操作符
  * [eslint-config-standard]
* no-whitespace-before-property: 禁止属性前有空白
  * [eslint-config-standard]
* nonblock-statement-body-position: 强制单个语句的位置
* object-curly-newline: 强制大括号内换行符的一致性
  * [eslint-config-standard]
* object-curly-spacing: 强制在大括号中使用一致的空格
  * [eslint-config-standard]
* object-property-newline: 强制将对象的属性放在不同的行上
  * [eslint-config-standard]
* one-var: 强制函数中的变量要么一起声明要么分开声明
  * [eslint-config-standard]
* one-var-declaration-per-line: 要求或禁止在变量声明周围换行
* operator-assignment: 要求或禁止在可能的情况下使用简化的赋值操作符
* operator-linebreak: 强制操作符使用一致的换行符
  * [eslint-config-standard]
* padded-blocks: 要求或禁止块内填充
  * [eslint-config-standard]
* padding-line-between-statements: 要求或禁止在语句间填充空行
* prefer-object-spread: 禁止使用以对象字面量作为第一个参数的 Object.assign，优先使用对象扩展。
* quote-props: 要求对象字面量属性名称用引号括起来
  * [eslint-config-standard]
* quotes: 强制使用一致的反勾号、双引号或单引号
  * [eslint-config-standard]
  * [@qxy/eslint-config]
* semi: 要求或禁止使用分号代替 ASI
  * [eslint-config-standard]
* semi-spacing: 强制分号之前和之后使用一致的空格
  * [eslint-config-standard]
* semi-style: 强制分号的位置
* sort-keys: 要求对象属性按序排列
* sort-vars: 要求同一个声明块中的变量按顺序排列
* space-before-blocks: 强制在块之前使用一致的空格
  * [eslint-config-standard]
* space-before-function-paren: 强制在 function的左括号之前使用一致的空格
  * [eslint-config-standard]
* space-in-parens: 强制在圆括号内使用一致的空格
  * [eslint-config-standard]
* space-infix-ops: 要求操作符周围有空格
  * [eslint-config-standard]
* space-unary-ops: 强制在一元操作符前后使用一致的空格
  * [eslint-config-standard]
* spaced-comment: 强制在注释中 // 或 /* 使用一致的空格
  * [eslint-config-standard]
* switch-colon-spacing: 强制在 switch 的冒号左右有空格
* template-tag-spacing: 要求或禁止在模板标记和它们的字面量之间有空格
  * [eslint-config-standard]
* unicode-bom: 要求或禁止 Unicode 字节顺序标记 (BOM)
  * [eslint-config-standard]
* wrap-regex: 要求正则表达式被括号括起来

### ECMAScript 6

> 这些规则只与 ES6 有关, 即通常所说的 ES2015

* arrow-body-style: 要求箭头函数体使用大括号
* arrow-parens: 要求箭头函数的参数使用圆括号
* arrow-spacing: 强制箭头函数的箭头前后使用一致的空格
  * [eslint-config-standard]
* constructor-super: 要求在构造函数中有 super() 的调用
  * [eslint-config-standard]
* generator-star-spacing: 强制 generator 函数中 * 号周围使用一致的空格
  * [eslint-config-standard]
* no-class-assign: 禁止修改类声明的变量
  * [eslint-config-standard]
* no-confusing-arrow: 禁止在可能与比较操作符相混淆的地方使用箭头函数
* no-const-assign: 禁止修改 const 声明的变量
  * [eslint-config-standard]
* no-dupe-class-members: 禁止类成员中出现重复的名称
  * [eslint-config-standard]
* no-duplicate-imports: 禁止重复模块导入
* no-new-symbol: 禁止 Symbolnew 操作符和 new 一起使用
  * [eslint-config-standard]
* no-restricted-imports: 禁止使用指定的 import 加载的模块
* no-this-before-super: 禁止在构造函数中，在调用 super() 之前使用 this 或 super
  * [eslint-config-standard]
* no-useless-computed-key: 禁止在对象中使用不必要的计算属性
  * [eslint-config-standard]
* no-useless-constructor: 禁用不必要的构造函数
  * [eslint-config-standard]
* no-useless-rename: 禁止在 import 和 export 和解构赋值时将引用重命名为相同的名字
  * [eslint-config-standard]
* no-var: 要求使用 let 或 const 而不是 var
  * [eslint-config-standard]
  * [@qxy/eslint-config]
* object-shorthand: 要求或禁止对象字面量中方法和属性使用简写语法
* prefer-arrow-callback: 要求回调函数使用箭头函数
* prefer-const: 要求使用 const 声明那些声明后不再被修改的变量
  * [eslint-config-standard]
* prefer-destructuring: 优先使用数组和对象解构
* prefer-numeric-literals: 禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量
* prefer-rest-params: 要求使用剩余参数而不是 arguments
* prefer-spread: 要求使用扩展运算符而非 .apply()
* prefer-template: 要求使用模板字面量而非字符串连接
* require-yield: 要求 generator 函数内有 yield
* rest-spread-spacing: 强制剩余和扩展运算符及其表达式之间有空格
  * [eslint-config-standard]
* sort-imports: 强制模块内的 import 排序
* symbol-description: 要求 symbol 描述
  * [eslint-config-standard]
* template-curly-spacing: 要求或禁止模板字符串中的嵌入表达式周围空格的使用
  * [eslint-config-standard]
* yield-star-spacing: 强制在 yield* 表达式中 * 周围使用空格
  * [eslint-config-standard]

## [eslint-plugin-vue](https://eslint.vuejs.org/rules/)

### Base Rules (Enabling Correct ESLint Parsing)

> Enforce all the rules in this category, as well as all higher priority rules, with:

```JSON
{
  "extends": "plugin:vue/base"
}
```

* vue/comment-directive	support comment-directives in	
* vue/jsx-uses-vars	prevent variables used in JSX to be marked as unused	

### Priority A: Essential (Error Prevention) for <small>Vue.js 3.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/vue3-essential"
}
```

* vue/custom-event-name-casing	enforce custom event names always use "kebab-case"
* vue/no-arrow-functions-in-watch	disallow using arrow functions to define watcher
* vue/no-async-in-computed-properties	disallow asynchronous actions in computed properties
* vue/no-deprecated-data-object-declaration disallow using deprecated object declaration on data (in Vue.js 3.0.0+)
* vue/no-deprecated-destroyed-lifecycle	disallow using deprecated destroyed and beforeDestroy lifecycle hooks (in Vue.js 3.0.0+)
* vue/no-deprecated-dollar-listeners-api disallow using deprecated $listeners (in Vue.js 3.0.0+)
* vue/no-deprecated-dollar-scopedslots-api disallow using deprecated $scopedSlots (in Vue.js 3.0.0+)
* vue/no-deprecated-events-api	disallow using deprecated events api (in Vue.js 3.0.0+)
* vue/no-deprecated-filter	disallow using deprecated filters syntax (in Vue.js 3.0.0+)
* vue/no-deprecated-functional-template	disallow using deprecated the functional template (in Vue.js 3.0.0+)
* vue/no-deprecated-html-element-is	disallow using deprecated the is attribute on HTML elements (in Vue.js 3.0.0+)
* vue/no-deprecated-inline-template	disallow using deprecated inline-template attribute (in Vue.js 3.0.0+)
* vue/no-deprecated-scope-attribute	disallow deprecated scope attribute (in Vue.js 2.5.0+)
* vue/no-deprecated-slot-attribute	disallow deprecated slot attribute (in Vue.js 2.6.0+)
* vue/no-deprecated-slot-scope-attribute	disallow deprecated slot-scope attribute (in Vue.js 2.6.0+)
* vue/no-deprecated-v-bind-sync	disallow use of deprecated .sync modifier on v-bind directive (in Vue.js 3.0.0+)
* vue/no-deprecated-v-on-native-modifier disallow using deprecated .native modifiers (in Vue.js 3.0.0+)
* vue/no-deprecated-v-on-number-modifiers disallow using deprecated number (keycode) modifiers (in Vue.js 3.0.0+)
* vue/no-deprecated-vue-config-keycodes	disallow using deprecated Vue.config.keyCodes (in Vue.js 3.0.0+)
* vue/no-dupe-keys	disallow duplication of field names
* vue/no-dupe-v-else-if	disallow duplicate conditions in v-if / v-else-if chains
* vue/no-duplicate-attributes	disallow duplication of attributes
* vue/no-lifecycle-after-await	disallow asynchronously registered lifecycle hooks
* vue/no-mutating-props	disallow mutation of component props
* vue/no-parsing-error	disallow parsing errors in
* vue/no-ref-as-operand	disallow use of value wrapped by ref() (Composition API) as an operand
* vue/no-reserved-keys	disallow overwriting reserved keys
* vue/no-setup-props-destructure	disallow destructuring of props passed to setup
* vue/no-shared-component-data	enforce component's data property to be a function
* vue/no-side-effects-in-computed-properties disallow side effects in computed properties
* vue/no-template-key	disallow key attribute on
* vue/no-textarea-mustache	disallow mustaches in
* vue/no-unused-components	disallow registering components that are not used inside templates
* vue/no-unused-vars	disallow unused variable definitions of v-for directives or scope attributes
* vue/no-use-v-if-with-v-for	disallow use v-if on the same element as v-for
* vue/no-watch-after-await	disallow asynchronously registered watch
* vue/require-component-is	require v-bind:is of elements
* vue/require-prop-type-constructor	require prop type to be a constructor
* vue/require-render-return	enforce render function to always return value
* vue/require-slots-as-functions	enforce properties of $slots to be used as a function
* vue/require-toggle-inside-transition	require control the display of the content inside
* vue/require-v-for-key	require v-bind:key with v-for directives
* vue/require-valid-default-prop	enforce props default values to be valid
* vue/return-in-computed-property	enforce that a return statement is present in computed property
* vue/return-in-emits-validator	enforce that a return statement is present in emits validator
* vue/use-v-on-exact	enforce usage of exact modifier on v-on
* vue/valid-template-root	enforce valid template root
* vue/valid-v-bind	enforce valid v-bind directives
* vue/valid-v-cloak	enforce valid v-cloak directives
* vue/valid-v-else-if	enforce valid v-else-if directives
* vue/valid-v-else	enforce valid v-else directives
* vue/valid-v-for	enforce valid v-for directives
* vue/valid-v-html	enforce valid v-html directives
* vue/valid-v-if	enforce valid v-if directives
* vue/valid-v-is	enforce valid v-is directives
* vue/valid-v-model	enforce valid v-model directives
* vue/valid-v-on	enforce valid v-on directives
* vue/valid-v-once	enforce valid v-once directives
* vue/valid-v-pre	enforce valid v-pre directives
* vue/valid-v-show	enforce valid v-show directives
* vue/valid-v-slot	enforce valid v-slot directives
* vue/valid-v-text	enforce valid v-text directives	

### Priority B: Strongly Recommended (Improving Readability) for <small>Vue.js 3.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/vue3-strongly-recommended"
}
```

* vue/attribute-hyphenation	enforce attribute naming style on custom components in template
* vue/component-definition-name-casing	enforce specific casing for component definition name
* vue/html-closing-bracket-newline	require or disallow a line break before tag's closing brackets
* vue/html-closing-bracket-spacing	require or disallow a space before tag's closing brackets
* vue/html-end-tags	enforce end tag style
* vue/html-indent	enforce consistent indentation in
* vue/html-quotes	enforce quotes style of HTML attributes
* vue/html-self-closing	enforce self-closing style
* vue/max-attributes-per-line	enforce the maximum number of attributes per line
  * [@qxy/eslint-config-vue]
* vue/multiline-html-element-content-newline	require a line break before and after the contents of a multiline element
  * [@qxy/eslint-config-vue]
* vue/mustache-interpolation-spacing	enforce unified spacing in mustache interpolations
* vue/no-multi-spaces	disallow multiple spaces
* vue/no-spaces-around-equal-signs-in-attribute	disallow spaces around equal signs in attribute
* vue/no-template-shadow	disallow variable declarations from shadowing variables declared in the outer scope	
* vue/one-component-per-file	enforce that each component should be in its own file	
* vue/prop-name-casing	enforce specific casing for the Prop name in Vue components	
* vue/require-default-prop	require default value for props	
* vue/require-explicit-emits	require emits option with name triggered by $emit()	
* vue/require-prop-types	require type definitions in props	
* vue/singleline-html-element-content-newline	require a line break before and after the contents of a singleline element
  * [@qxy/eslint-config-vue]
* vue/v-bind-style	enforce v-bind directive style
* vue/v-on-style	enforce v-on directive style
* vue/v-slot-style	enforce v-slot directive style

### Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead) for <small>Vue.js 3.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/vue3-recommended"
}
```

* vue/attributes-order	enforce order of attributes
  * [@qxy/eslint-config-vue]
* vue/component-tags-order	enforce order of component top-level elements
  * [@qxy/eslint-config-vue]
* vue/no-lone-template	disallow unnecessary
* vue/no-multiple-slot-args	disallow to pass multiple arguments to scoped slots	
* vue/no-v-html	disallow use of v-html to prevent XSS attack
* vue/order-in-components	enforce order of properties in components
  * [@qxy/eslint-config-vue]
* vue/this-in-template	disallow usage of this in template	
  * [@qxy/eslint-config-vue]

### Priority A: Essential (Error Prevention) for <small>Vue.js 2.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/essential"
}
```

* vue/custom-event-name-casing	enforce custom event names always use "kebab-case"	
* vue/no-arrow-functions-in-watch	disallow using arrow functions to define watcher	
* vue/no-async-in-computed-properties	disallow asynchronous actions in computed properties	
* vue/no-custom-modifiers-on-v-model	disallow custom modifiers on v-model used on the component	
* vue/no-dupe-keys	disallow duplication of field names	
* vue/no-dupe-v-else-if	disallow duplicate conditions in v-if / v-else-if chains	
* vue/no-duplicate-attributes	disallow duplication of attributes	
* vue/no-multiple-template-root	disallow adding multiple root nodes to the template	
* vue/no-mutating-props	disallow mutation of component props	
* vue/no-parsing-error	disallow parsing errors in 
* vue/no-reserved-keys	disallow overwriting reserved keys	
* vue/no-shared-component-data	enforce component's data property to be a function	
* vue/no-side-effects-in-computed-properties	disallow side effects in computed properties	
* vue/no-template-key	disallow key attribute on 
* vue/no-textarea-mustache	disallow mustaches in 	
* vue/no-unused-components	disallow registering components that are not used inside templates	
* vue/no-unused-vars	disallow unused variable definitions of v-for directives or scope attributes	
* vue/no-use-v-if-with-v-for	disallow use v-if on the same element as v-for	
* vue/no-v-model-argument	disallow adding an argument to v-model used in custom component	
* vue/require-component-is	require v-bind:is of elements	
* vue/require-prop-type-constructor	require prop type to be a constructor	
* vue/require-render-return	enforce render function to always return value	
* vue/require-v-for-key	require v-bind:key with v-for directives	
* vue/require-valid-default-prop	enforce props default values to be valid	
* vue/return-in-computed-property	enforce that a return statement is present in computed property	
* vue/use-v-on-exact	enforce usage of exact modifier on v-on	
* vue/valid-template-root	enforce valid template root	
* vue/valid-v-bind-sync	enforce valid .sync modifier on v-bind directives	
* vue/valid-v-bind	enforce valid v-bind directives	
* vue/valid-v-cloak	enforce valid v-cloak directives	
* vue/valid-v-else-if	enforce valid v-else-if directives	
* vue/valid-v-else	enforce valid v-else directives	
* vue/valid-v-for	enforce valid v-for directives	
* vue/valid-v-html	enforce valid v-html directives	
* vue/valid-v-if	enforce valid v-if directives	
* vue/valid-v-model	enforce valid v-model directives	
* vue/valid-v-on	enforce valid v-on directives	
* vue/valid-v-once	enforce valid v-once directives	
* vue/valid-v-pre	enforce valid v-pre directives	
* vue/valid-v-show	enforce valid v-show directives	
* vue/valid-v-slot	enforce valid v-slot directives	
* vue/valid-v-text	enforce valid v-text directives	

### Priority B: Strongly Recommended (Improving Readability) for <small>Vue.js 2.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/strongly-recommended"
}
```

* vue/attribute-hyphenation	enforce attribute naming style on custom components in template
* vue/component-definition-name-casing	enforce specific casing for component definition name
* vue/html-closing-bracket-newline	require or disallow a line break before tag's closing brackets
* vue/html-closing-bracket-spacing	require or disallow a space before tag's closing brackets
* vue/html-end-tags	enforce end tag style
* vue/html-indent	enforce consistent indentation in
* vue/html-quotes	enforce quotes style of HTML attributes
* vue/html-self-closing	enforce self-closing style
* vue/max-attributes-per-line	enforce the maximum number of attributes per line
  * [@qxy/eslint-config-vue]
* vue/multiline-html-element-content-newline	require a line break before and after the contents of a multiline element
  * [@qxy/eslint-config-vue]
* vue/mustache-interpolation-spacing	enforce unified spacing in mustache interpolations
* vue/no-multi-spaces	disallow multiple spaces
* vue/no-spaces-around-equal-signs-in-attribute	disallow spaces around equal signs in attribute
* vue/no-template-shadow	disallow variable declarations from shadowing variables declared in the outer scope	
* vue/one-component-per-file	enforce that each component should be in its own file	
* vue/prop-name-casing	enforce specific casing for the Prop name in Vue components	
* vue/require-default-prop	require default value for props	
* vue/require-prop-types	require type definitions in props	
* vue/singleline-html-element-content-newline	require a line break before and after the contents of a singleline element
  * [@qxy/eslint-config-vue]
* vue/v-bind-style	enforce v-bind directive style
* vue/v-on-style	enforce v-on directive style
* vue/v-slot-style	enforce v-slot directive style

### Priority C: Recommended (Minimizing Arbitrary Choices and Cognitive Overhead) for <small>Vue.js 2.x</small>

> Enforce all the rules in this category, as well as all higher priority rules

```JSON
{
  "extends": "plugin:vue/recommended"
}
```

* vue/attributes-order	enforce order of attributes
  * [@qxy/eslint-config-vue]['plugin:vue/recommended']
* vue/component-tags-order	enforce order of component top-level elements	
  * [@qxy/eslint-config-vue]['plugin:vue/recommended']
* vue/no-lone-template	disallow unnecessary
* vue/no-multiple-slot-args	disallow to pass multiple arguments to scoped slots	
* vue/no-v-html	disallow use of v-html to prevent XSS attack	
  * [@qxy/eslint-config-vue]['plugin:vue/recommended']
* vue/order-in-components	enforce order of properties in components
  * [@qxy/eslint-config-vue]['plugin:vue/recommended']
* vue/this-in-template	disallow usage of this in template	
  * [@qxy/eslint-config-vue]['plugin:vue/recommended']

### Uncategorized

> No preset enables the rules in this category. Please enable each rule if you want.

```JSON
{
  "rules": {
    "vue/block-tag-newline": "error"
  }
}
```

* vue/block-tag-newline	enforce line breaks after opening and before closing block-level tags	
* vue/component-name-in-template-casing	enforce specific casing for the component naming style in template	
  * [@qxy/eslint-config-vue]
* vue/custom-event-name-casing	enforce specific casing for custom event name	
* vue/html-comment-content-newline	enforce unified line brake in HTML comments	
  * [@qxy/eslint-config-vue]
* vue/html-comment-content-spacing	enforce unified spacing in HTML comments	
  * [@qxy/eslint-config-vue]
* vue/html-comment-indent	enforce consistent indentation in HTML comments	
* vue/match-component-file-name	require component name property to match its file name	
* vue/new-line-between-multi-line-property	enforce new lines between multi-line properties in Vue components	
  * [@qxy/eslint-config-vue]
* vue/no-bare-strings-in-template	disallow the use of bare strings in <template>	
* vue/no-boolean-default	disallow boolean defaults	
* vue/no-duplicate-attr-inheritance	enforce inheritAttrs to be set to false when using v-bind="$attrs"	
* vue/no-empty-component-block	disallow the <template> <script> <style> block to be empty	
  * [@qxy/eslint-config-vue]
* vue/no-multiple-objects-in-class	disallow to pass multiple objects into array to class	
* vue/no-potential-component-option-typo	disallow a potential typo in your component property
  * [@qxy/eslint-config-vue]
* vue/no-reserved-component-names	disallow the use of reserved names in component definitions	
* vue/no-restricted-block	disallow specific block	
* vue/no-restricted-call-after-await	disallow asynchronously called restricted methods	
* vue/no-restricted-component-options	disallow specific component option	
* vue/no-restricted-custom-event	disallow specific custom event	
* vue/no-restricted-props	disallow specific props	
* vue/no-restricted-static-attribute	disallow specific attribute	
* vue/no-restricted-v-bind	disallow specific argument in v-bind	
* vue/no-static-inline-styles	disallow static inline style attributes	
  * [@qxy/eslint-config-vue]
* vue/no-template-target-blank	disallow target="_blank" attribute without rel="noopener noreferrer"	
  * [@qxy/eslint-config-vue]
* vue/no-unregistered-components	disallow using components that are not registered inside templates	
* vue/no-unsupported-features	disallow unsupported Vue.js syntax on the specified version	
  * [@qxy/eslint-config-vue]
* vue/no-unused-properties	disallow unused properties	
* vue/no-useless-mustaches	disallow unnecessary mustache interpolations	
  * [@qxy/eslint-config-vue]
* vue/no-useless-v-bind	disallow unnecessary v-bind directives	
  * [@qxy/eslint-config-vue]
* vue/padding-line-between-blocks	require or disallow padding lines between blocks	
  * [@qxy/eslint-config-vue]
* vue/require-direct-export	require the component to be directly exported	
  * [@qxy/eslint-config-vue]
* vue/require-name-property	require a name property in Vue components	
  * [@qxy/eslint-config-vue]
* vue/script-indent	enforce consistent indentation in <script>	
  * [@qxy/eslint-config-vue]
* vue/sort-keys	enforce sort-keys in a manner that is compatible with order-in-components	
* vue/static-class-names-order	enforce static class names order	
  * [@qxy/eslint-config-vue]
* vue/v-for-delimiter-style	enforce v-for directive's delimiter style	
  * [@qxy/eslint-config-vue]
* vue/v-on-event-hyphenation	enforce v-on event naming style on custom components in template	
* vue/v-on-function-call	enforce or forbid parentheses after method calls without arguments in v-on directives	
  * [@qxy/eslint-config-vue]

### Extension Rules

> The following rules extend the rules provided by ESLint itself and apply them to the expressions in the <template>.

* vue/array-bracket-newline	enforce linebreaks after opening and before closing array brackets
* vue/array-bracket-spacing	enforce consistent spacing inside array brackets
* vue/arrow-spacing	enforce consistent spacing before and after the arrow in arrow functions
* vue/block-spacing	disallow or enforce spaces inside of blocks after opening block and before closing block
* vue/brace-style	enforce consistent brace style for blocks
* vue/camelcase	enforce camelcase naming convention	
* vue/comma-dangle	require or disallow trailing commas
  * [@qxy/eslint-config-vue]
* vue/comma-spacing	enforce consistent spacing before and after commas
  * [@qxy/eslint-config-vue]
* vue/comma-style	enforce consistent comma style
* vue/dot-location	enforce consistent newlines before and after dots
* vue/dot-notation	enforce dot notation whenever possible
* vue/eqeqeq	require the use of === and !==
* vue/func-call-spacing	require or disallow spacing between function identifiers and their invocations
* vue/key-spacing	enforce consistent spacing between keys and values in object literal properties
* vue/keyword-spacing	enforce consistent spacing before and after keywords
* vue/max-len	enforce a maximum line length	
* vue/no-constant-condition	disallow constant expressions in conditions	
* vue/no-empty-pattern	disallow empty destructuring patterns	
* vue/no-extra-parens	disallow unnecessary parentheses
* vue/no-irregular-whitespace	disallow irregular whitespace	
* vue/no-restricted-syntax	disallow specified syntax	
* vue/no-sparse-arrays	disallow sparse arrays	
* vue/no-useless-concat	disallow unnecessary concatenation of literals or template literals	
* vue/object-curly-newline	enforce consistent line breaks inside braces
* vue/object-curly-spacing	enforce consistent spacing inside braces
  * [@qxy/eslint-config-vue]
* vue/object-property-newline	enforce placing object properties on separate lines
* vue/operator-linebreak	enforce consistent linebreak style for operators
* vue/prefer-template	require template literals instead of string concatenation
* vue/space-in-parens	enforce consistent spacing inside parentheses
* vue/space-infix-ops	require spacing around infix operators
* vue/space-unary-ops	enforce consistent spacing before or after unary operators
* vue/template-curly-spacing	require or disallow spacing around embedded expressions of template strings