# stylelint配置说明

---

## 配置对象

`stylelint` 支持 `consmiconfig` 的配置方式，按如下顺序查找配置对象：

* 在 `package.json` 中的 `stylelint` 属性
* JSON/YAML/JS 格式的 .stylelintrc[.json/.yaml/.yml/.js] 文件（可带后缀）
* 导出 JS 对象的 `stylelint.config.js`

```Bash
`.stylelintrc.json`、`.stylelintrc.yaml`、`.stylelintrc.yml`、`.stylelintrc.js`
```

## 配置项说明

 * `rules`:  规则决定检测器要查找什么和要解决什么。stylelint 有超过 150条规则。属性是个对象，其键为规则名称，值为规则配置。每个规则配置符合以下形式之一：
	 * 【】一个值 (主要选项)
	 * 【】包含两个值的数组 ([primary option, secondary options])
	 * 【】null (关闭规则)
 * `extends`: 你的配置可以 extend 一个已存在的配置文件(无论是你自己的还是第三方的配置)。当一个配置继承了里一个配置，它将会添加自己的属性并覆盖原有的属性。
 * `plugins`: 插件是由社区创建的规则或规则集，支持方法论、工具集，非标准 的 CSS 特性，或非常特定的用例
 * `processors`: 是 stylelint 的钩子函数，可以以它的方式修改代码，也可以在它们退出时修改结果.只能用在 命令行 和 Node API，不适用于 PostCSS 插件 (PostCSS 插件将忽略它们。).可以使 stylelint 检测非样式表文件中的 CSS
 * `ignoreFiles`:  提供一个 glob 或 globs 数组，忽略特定的文件
 * `defaultSeverity`: 只支持 "warning" 和 "error" 两种，用于定义全局默认的报错等级

## `stylelint.config.js` 主要用于解决以下格式问题
 
* 【】不推荐使用 id 选择器来定义样式；
* 【】多重选择器（multiple selectors）没有换行，不清晰直观；
* 【】多个 css 规则没有换行，挤在单行太长；
* 【】使用了 -webkit- 前缀，但是项目中已经支持 autoprefixer ；
* 【】属性和值之间的空格时有时无等。
*  `rules`各项解释请查阅网站：[http://stylelint.cn/user-guide/rules](http://stylelint.cn/user-guide/rules)

## plugins 插件

* `stylelint-csstree-validator`：验证 CSS 的值是否匹配 W3C 标准和浏览器扩展。
* `stylelint-declaration-strict-value`：指定变量(`$sass`，`@less`，`var(--cssnext)`)，函数或自定义的 CSS 关键字(`inherit`，`none`等) 的属性是否必须用来做它的值。
* `stylelint-declaration-use-variable`：指定哪个变量的属性必须用作它的值
* `stylelint-order`：指定排序，比如声明的块内(插件包)属性的顺序。
* `stylelint-rscss`：验证 RSCSS约定。
* `stylelint-scss`：执行各种各样的SCSS语法特性检测规则(插件包)
* `stylelint-selector-bem-pattern`: 为选择器指定BEM模式(合并了postcss-bem-linter。

## [`stylelint-config-recommended`](https://github.com/stylelint/stylelint-config-recommended/blob/master/index.js)

```JavaScript
"use strict";

// version: "stylelint-config-recommended": "^3.0.0"

module.exports = {
  rules: {
    "at-rule-no-unknown": true,
    "block-no-empty": true,
    "color-no-invalid-hex": true,
    "comment-no-empty": true,
    "declaration-block-no-duplicate-properties": [
      true,
      {
        ignore: ["consecutive-duplicates-with-different-values"],
      },
    ],
    "declaration-block-no-shorthand-property-overrides": true,
    "font-family-no-duplicate-names": true,
    "font-family-no-missing-generic-family-keyword": true,
    "function-calc-no-invalid": true,
    "function-calc-no-unspaced-operator": true,
    "function-linear-gradient-no-nonstandard-direction": true,
    "keyframe-declaration-no-important": true,
    "media-feature-name-no-unknown": true,
    "no-descending-specificity": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-extra-semicolons": true,
    "no-invalid-double-slash-comments": true,
    "property-no-unknown": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "string-no-newline": true,
    "unit-no-unknown": true,
  },
};
```

## [`stylelint-config-standard`](https://github.com/stylelint/stylelint-config-standard/blob/master/index.js)

```JavaScript
"use strict";

// version: "stylelint-config-standard": "^20.0.0",

module.exports = {
  extends: "stylelint-config-recommended",
  rules: {
    "at-rule-empty-line-before": [
      "always",
      {
        except: ["blockless-after-same-name-blockless", "first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "at-rule-name-case": "lower",
    "at-rule-name-space-after": "always-single-line",
    "at-rule-semicolon-newline-after": "always",
    "block-closing-brace-empty-line-before": "never",
    "block-closing-brace-newline-after": "always",
    "block-closing-brace-newline-before": "always-multi-line",
    "block-closing-brace-space-before": "always-single-line",
    "block-opening-brace-newline-after": "always-multi-line",
    "block-opening-brace-space-after": "always-single-line",
    "block-opening-brace-space-before": "always",
    "color-hex-case": "lower",
    "color-hex-length": "short",
    "comment-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["stylelint-commands"],
      },
    ],
    "comment-whitespace-inside": "always",
    "custom-property-empty-line-before": [
      "always",
      {
        except: ["after-custom-property", "first-nested"],
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
    "declaration-bang-space-after": "never",
    "declaration-bang-space-before": "always",
    "declaration-block-semicolon-newline-after": "always-multi-line",
    "declaration-block-semicolon-space-after": "always-single-line",
    "declaration-block-semicolon-space-before": "never",
    "declaration-block-single-line-max-declarations": 1,
    "declaration-block-trailing-semicolon": "always",
    "declaration-colon-newline-after": "always-multi-line",
    "declaration-colon-space-after": "always-single-line",
    "declaration-colon-space-before": "never",
    "declaration-empty-line-before": [
      "always",
      {
        except: ["after-declaration", "first-nested"],
        ignore: ["after-comment", "inside-single-line-block"],
      },
    ],
    "function-comma-newline-after": "always-multi-line",
    "function-comma-space-after": "always-single-line",
    "function-comma-space-before": "never",
    "function-max-empty-lines": 0,
    "function-name-case": "lower",
    "function-parentheses-newline-inside": "always-multi-line",
    "function-parentheses-space-inside": "never-single-line",
    "function-whitespace-after": "always",
    indentation: 2,
    "length-zero-no-unit": true,
    "max-empty-lines": 1,
    "media-feature-colon-space-after": "always",
    "media-feature-colon-space-before": "never",
    "media-feature-name-case": "lower",
    "media-feature-parentheses-space-inside": "never",
    "media-feature-range-operator-space-after": "always",
    "media-feature-range-operator-space-before": "always",
    "media-query-list-comma-newline-after": "always-multi-line",
    "media-query-list-comma-space-after": "always-single-line",
    "media-query-list-comma-space-before": "never",
    "no-eol-whitespace": true,
    "no-missing-end-of-source-newline": true,
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "property-case": "lower",
    "rule-empty-line-before": [
      "always-multi-line",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
    "selector-attribute-brackets-space-inside": "never",
    "selector-attribute-operator-space-after": "never",
    "selector-attribute-operator-space-before": "never",
    "selector-combinator-space-after": "always",
    "selector-combinator-space-before": "always",
    "selector-descendant-combinator-no-non-space": true,
    "selector-list-comma-newline-after": "always",
    "selector-list-comma-space-before": "never",
    "selector-max-empty-lines": 0,
    "selector-pseudo-class-case": "lower",
    "selector-pseudo-class-parentheses-space-inside": "never",
    "selector-pseudo-element-case": "lower",
    "selector-pseudo-element-colon-notation": "double",
    "selector-type-case": "lower",
    "unit-case": "lower",
    "value-keyword-case": "lower",
    "value-list-comma-newline-after": "always-multi-line",
    "value-list-comma-space-after": "always-single-line",
    "value-list-comma-space-before": "never",
    "value-list-max-empty-lines": 0,
  },
};
```

### [`@qxy/stylelint-config`](https://github.com/qxy-fe/configs/blob/main/packages/stylelint-config/README.md)

```JavaScript

// version: "@qxy/stylelint-config": "0.1.0",

module.exports = {
  extends: [
    'stylelint-config-standard',
  ],

  plugins: [
    'stylelint-scss',
  ],

  // Globs to ignore specific files
  ignoreFiles: [
    'node_modules',
    '*.min.css',
    '*.min.scss',
  ],

  rules: {
    // Disabled rules
    'at-rule-no-unknown': null,

    // Specify double quotes around strings
    'string-quotes': 'double',

    // Specify lowercase or uppercase for keywords values
    'value-keyword-case': ['lower', {
      ignoreProperties: ['/^($?)font/'],
    }],

    // Disallow selectors of lower specificity from coming after overriding selectors of higher specificity
    'no-descending-specificity': [true, {
      ignore: ['selectors-within-list'],
    }],

    // Require a newline or disallow whitespace after the colon of declarations
    'declaration-colon-newline-after': 'always-multi-line',

    // Disallow shorthand properties that override related longhand properties
    // TODO: ignore background for compatible
    'declaration-block-no-shorthand-property-overrides': null,

    // Require a leading zero for fractional numbers less than 1
    'number-leading-zero': 'always',

    // Require quotes for attribute values
    'selector-attribute-quotes': 'always',

    // Specify single or double colon notation for applicable pseudo-elements
    'selector-pseudo-element-colon-notation': 'single',

    // Specify a pattern for class selectors
    'selector-class-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',

    // Specify a pattern for id selectors
    'selector-id-pattern': '^([a-z][a-z0-9]*)(_[a-z0-9]+)*$',

    // Disallow unknown pseudo-element selectors
    // Allow v-deep for VueJS compatibility
    'selector-pseudo-element-no-unknown': [true, {
      ignorePseudoElements: ['v-deep'],
    }],

    // Require or disallow an empty line before at-rules
    'at-rule-empty-line-before': ['always', {
      except: ['inside-block', 'blockless-after-same-name-blockless'],
      ignore: ['first-nested', 'after-comment'],
      ignoreAtRules: ['import', 'else'],
    }],

    // Disallow whitespace before the colon in $-variable declarations
    // 官方文档rules没有该规则
    'dollar-variable-colon-space-before': 'never',

    // =============================== //
    // SCSS Rules //
    // =============================== //

    // Disallow unknown at-rules
    'scss/at-rule-no-unknown': true,

    // Requires a whitespace before the colon in $-variable declarations
    'scss/dollar-variable-colon-space-after': 'always',

    // Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers
    'scss/dollar-variable-no-missing-interpolation': true,

    // Specify a pattern for Sass-like variables
    'scss/dollar-variable-pattern': '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',

    // Require whitespace after the // in //-comments
    'scss/double-slash-comment-whitespace-inside': 'always',

    // Disallow linebreaks before Sass operators
    'scss/operator-no-newline-before': true,

    // Disallow unspaced operators in Sass operations
    'scss/operator-no-unspaced': true,

    // Disallow redundant nesting selectors (&)
    'scss/selector-no-redundant-nesting-selector': true,
  },
}
```

## rules

### Color

* color-hex-case: Specify lowercase or uppercase for hex colors .
* color-hex-case: 指定十六进制颜色大小写 。
  * [stylelint-config-standard]
* color-hex-length: Specify short or long notation for hex colors .
* color-hex-length: 指定十六进制颜色是否使用缩写 。
  * [stylelint-config-standard]
* color-named: Require (where possible) or disallow named colors.
* color-named: 要求 (可能的情况下) 或 禁止使用命名的颜色。
* color-no-hex: Disallow hex colors.
* color-no-hex: 禁止使用十六进制颜色。
* color-no-invalid-hex: Disallow invalid hex colors.
* color-no-invalid-hex: 禁止使用无效的十六进制颜色。
  * [stylelint-config-recommended] true

### Font family

* font-family-name-quotes: Specify whether or not quotation marks should be used around font family names.
* font-family-name-quotes：指定字体名称是否需要使用引号引起来。
* font-family-no-duplicate-names: Disallow duplicate font family names.
* font-family-no-duplicate-names: 禁止使用重复的字体名称。
  * [stylelint-config-recommended]
* font-family-no-missing-generic-family-keyword 禁止在字体族名称列表中缺少通用字体族关键字。
  * [stylelint-config-recommended]


### Font weight

* font-weight-notation: Require numeric or named (where possible) font-weight values.
* font-weight-notation：要求使用数字或命名的 (可能的情况下) font-weight 值。

### Function

* function-blacklist: Specify a blacklist of disallowed functions.
* function-blacklist：指定一个禁用的函数的黑名单。
* function-calc-no-unspaced-operator: Disallow an unspaced operator within calc functions.
* function-calc-no-unspaced-operator：禁止在 calc 函数内使用不加空格的操作符。
  * [stylelint-config-recommended]
* function-comma-newline-after: Require a newline or disallow whitespace after the commas of functions.
* function-comma-newline-after：在函数的逗号之后要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
* function-comma-newline-before: Require a newline or disallow whitespace before the commas of functions.
* function-comma-newline-before：在函数的逗号之前要求有一个换行符或禁止有空白。
* function-comma-space-after: Require a single space or disallow whitespace after the commas of functions.
* function-comma-space-after：在函数的逗号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* function-comma-space-before: Require a single space or disallow whitespace before the commas of functions.
* function-comma-space-before：在函数的逗号之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* function-linear-gradient-no-nonstandard-direction: Disallow direction values in linear-gradient() calls that are not valid according to the standard syntax.
* function-linear-gradient-no-nonstandard-direction：根据标准语法，禁止 linear-gradient() 中无效的方向值。
  * [stylelint-config-recommended]
* function-max-empty-lines: Limit the number of adjacent empty lines within functions.
* function-max-empty-lines：限制函数中相邻的空行数量。
  * [stylelint-config-standard]
* function-name-case: Specify lowercase or uppercase for function names.
* function-name-case：指定函数名称的大小写。
  * [stylelint-config-standard]
* function-parentheses-newline-inside: Require a newline or disallow whitespace on the inside of the parentheses of functions.
* function-parentheses-newline-inside：在函数的括号内要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
* function-parentheses-space-inside: Require a single space or disallow whitespace on the inside of the parentheses of functions.
* function-parentheses-space-inside：在函数的括号内要有一个空格或禁止有空白。
  * [stylelint-config-standard]
* function-url-data-uris: Require or disallow data URIs for urls.
* function-url-data-uris：要求或禁止在 url 中使用 data URI。
* function-url-no-scheme-relative: Disallow scheme-relative urls.
* function-url-no-scheme-relative：禁止使用相对协议的链接。
* function-url-quotes: Require or disallow quotes for urls.
* function-url-quotes：要求或禁止 url 使用引号。
* function-url-scheme-whitelist: Specify a whitelist of allowed url schemes.
* function-url-scheme-whitelist：指定一个允许的 url 协议的白名单。
* function-whitelist: Specify a whitelist of allowed functions.
* function-whitelist：指定一个允许的函数的白名单。
* function-whitespace-after: Require or disallow whitespace after functions.
* function-whitespace-after: 要求或禁止在函数之后有空白。
  * [stylelint-config-standard]
* function-calc-no-invalid: 禁止在 calc 函数中使用无效表达式

### Number

* number-leading-zero: Require or disallow a leading zero for fractional numbers less than 1 .
* number-leading-zero：要求或禁止小于 1 的小数的前导 0 。
  * [stylelint-config-standard]
  * [@qxy/stylelint-config]
* number-max-precision: Limit the number of decimal places allowed in numbers.
* number-max-precision：限制小数位数。
* number-no-trailing-zeros: Disallow trailing zeros in numbers .
* number-no-trailing-zeros：禁止数字中的拖尾 0 。
  * [stylelint-config-standard]

### String

* string-no-newline: Disallow (unescaped) newlines in strings.
* string-no-newline：禁止在字符串中使用（非转义的）换行符。
  * [stylelint-config-recommended]
* string-quotes: Specify single or double quotes around strings .
* string-quotes：指定字符串使用单引号还是双引号 。
  * [@qxy/stylelint-config]

### Length

* length-zero-no-unit: Disallow units for zero lengths .
* length-zero-no-unit: 长度为0时，禁止使用单位 。
  * [stylelint-config-standard]

### Time

* time-no-imperceptible: Disallow animation and transition less than or equal to 100ms.
* time-no-imperceptible：禁止 animation 和 transition 小于或等于 100ms。

### Unit

* unit-blacklist: Specify a blacklist of disallowed units.
* unit-blacklist：指定一个禁止使用的单位的黑名单。
* unit-case: Specify lowercase or uppercase for units.
* unit-case：指定单位的大小写。
  * [stylelint-config-standard]
* unit-no-unknown: Disallow unknown units.
* unit-no-unknown：禁止使用未知单位。
  * [stylelint-config-recommended]
* unit-whitelist: Specify a whitelist of allowed units.
* unit-whitelist：指定一个所允许的单位的白名单。

### Value

* value-keyword-case: Specify lowercase or uppercase for keywords values.
* value-keyword-case：指定关键字的值的大小写。
  * [stylelint-config-standard]
  * [@qxy/stylelint-config]
* value-no-vendor-prefix: Disallow vendor prefixes for values.
* value-no-vendor-prefix：禁止给值添加浏览器引擎前缀。

### Value list

* value-list-comma-newline-after: Require a newline or disallow whitespace after the commas of value lists.
* value-list-comma-newline-after：在值列表的逗号之后要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
* value-list-comma-newline-before: Require a newline or disallow whitespace before the commas of value lists.
* value-list-comma-newline-before：在值列表的逗号之前要求有一个换行符或禁止有空白。
* value-list-comma-space-after: Require a single space or disallow whitespace after the commas of value lists.
* value-list-comma-space-after：在值列表的逗号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* value-list-comma-space-before: Require a single space or disallow whitespace before the commas of value lists.
* value-list-comma-space-before：在值列表的逗号之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* value-list-max-empty-lines: Limit the number of adjacent empty lines within value lists.
* value-list-max-empty-lines：限制值列表中相邻空行数量。
  * [stylelint-config-standard]

### Custom property

* custom-property-empty-line-before: Require or disallow an empty line before custom properties.
* custom-property-empty-line-before：要求或禁止在自定义属性之前有一行空行。
  * [stylelint-config-standard]
* custom-property-no-outside-root: Disallow custom properties outside of :root rules.
* custom-property-no-outside-root：禁止在 :root 规则之外使用自定义属性。
* custom-property-pattern: Specify a pattern for custom properties.
* custom-property-pattern：为自定义属性指定一个匹配模式。

### Shorthand property

* shorthand-property-no-redundant-values: Disallow redundant values in shorthand properties .
* shorthand-property-no-redundant-values：禁止在简写属性中使用冗余值 。

### Property

* property-blacklist: Specify a blacklist of disallowed properties.
* property-blacklist：指定一个禁止使用的属性的黑名单。
* property-case: Specify lowercase or uppercase for properties.
* property-case：指定属性的大小写。
  * [stylelint-config-standard]
* property-no-unknown: Disallow unknown properties.
* property-no-unknown：禁止使用未知属性。
  * [stylelint-config-recommended]
* property-no-vendor-prefix: Disallow vendor prefixes for properties.
* property-no-vendor-prefix：禁止属性使用浏览器引擎前缀。
* property-whitelist: Specify a whitelist of allowed properties.
* property-whitelist：指定一个允许使用的属性的白名单。

### Keyframe declaration

* keyframe-declaration-no-important: Disallow !important within keyframe declarations.
* keyframe-declaration-no-important：禁止在 keyframe 声明中使用 !important。
  * [stylelint-config-recommended]

### Declaration

* declaration-bang-space-after: Require a single space or disallow whitespace after the bang of declarations.
* declaration-bang-space-after：在感叹号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* declaration-bang-space-before: Require a single space or disallow whitespace before the bang of declarations.
* declaration-bang-space-before：在感叹号之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* declaration-colon-newline-after: Require a newline or disallow whitespace after the colon of declarations.
* declaration-colon-newline-after：在冒号之后要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
  * [@qxy/stylelint-config]
* declaration-colon-space-after: Require a single space or disallow whitespace after the colon of declarations .
* declaration-colon-space-after：在冒号之后要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]
* declaration-colon-space-before: Require a single space or disallow whitespace before the colon of declarations .
* declaration-colon-space-before：在冒号之前要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]
* declaration-empty-line-before: Require or disallow an empty line before declarations.
* declaration-empty-line-before：要求或禁止在声明语句之前有空行。
  * [stylelint-config-standard]
* declaration-no-important: Disallow !important within declarations.
* declaration-no-important：禁止在声明中使用 !important。
* declaration-property-unit-blacklist: Specify a blacklist of disallowed property and unit pairs within declarations.
* declaration-property-unit-blacklist：指定一个在声明中禁止使用的属性和单位的黑名单。
* declaration-property-unit-whitelist: Specify a whitelist of allowed property and unit pairs within declarations.
* declaration-property-unit-whitelist：指定一个在声明中允许使用的属性和单位的白名单。
* declaration-property-value-blacklist: Specify a blacklist of disallowed property and value pairs within declarations.
* declaration-property-value-blacklist：指定一个在声明中禁止使用的属性和值的黑名单。
* declaration-property-value-whitelist: Specify a whitelist of allowed property and value pairs within declarations.
* declaration-property-value-whitelist：指定一个在声明中允许使用的属性和值的白名单。

### Declaration block

* declaration-block-no-duplicate-properties: Disallow duplicate properties within declaration blocks.
* declaration-block-no-duplicate-properties：在声明的块中中禁止出现重复的属性。
  * [stylelint-config-recommended]
* declaration-block-no-ignored-properties: Disallow property values that are ignored due to another property value in the same rule.
* declaration-block-no-ignored-properties：禁止使用由于其他属性的原因而被忽略的属性。
* declaration-block-no-redundant-longhand-properties: Disallow longhand properties that can be combined into one shorthand property.
* declaration-block-no-redundant-longhand-properties：禁止使用可以缩写却不缩写的属性。
* declaration-block-no-shorthand-property-overrides: Disallow shorthand properties that override related longhand properties within declaration blocks.
* declaration-block-no-shorthand-property-overrides：禁止缩写属性覆盖相关普通写法属性。
  * [stylelint-config-recommended] true
  * [@qxy/stylelint-config]
* declaration-block-properties-order: Specify the order of properties within declaration blocks .
* declaration-block-properties-order：指定声明块中的属性顺序 。待调整
* declaration-block-semicolon-newline-after: Require a newline or disallow whitespace after the semicolons of declaration blocks.
* declaration-block-semicolon-newline-after：在声明块的分号之后要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
* declaration-block-semicolon-newline-before: Require a newline or disallow whitespace before the semicolons of declaration blocks.
* declaration-block-semicolon-newline-before：在声明块的分号之前要求有一个换行符或禁止有空白。
* declaration-block-semicolon-space-after: Require a single space or disallow whitespace after the semicolons of declaration blocks.
* declaration-block-semicolon-space-after：在声明块的分号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* declaration-block-semicolon-space-before: Require a single space or disallow whitespace before the semicolons of declaration blocks.
* declaration-block-semicolon-space-before：在声明块的分号之后前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* declaration-block-single-line-max-declarations: Limit the number of declaration within single line declaration blocks.
* declaration-block-single-line-max-declarations：限制单行声明块中声明的数量。
  * [stylelint-config-standard]
* declaration-block-trailing-semicolon: Require or disallow a trailing semicolon within declaration blocks.
* declaration-block-trailing-semicolon：要求或禁止在声明块中使用拖尾分号。
  * [stylelint-config-standard]

### Block

* block-closing-brace-empty-line-before: Require or disallow an empty line before the closing brace of blocks.
* block-closing-brace-empty-line-before：要求或禁止在闭括号之前有空行。
  * [stylelint-config-standard]
* block-closing-brace-newline-after: Require a newline or disallow whitespace after the closing brace of blocks .
* block-closing-brace-newline-after：在闭括号之后要求有一个换行符或禁止有空白 。
  * [stylelint-config-standard]
* block-closing-brace-newline-before: Require a newline or disallow whitespace before the closing brace of blocks .
* block-closing-brace-newline-before：在闭括号之前要求有一个换行符或禁止有空白 。
  * [stylelint-config-standard]
* block-closing-brace-space-after: Require a single space or disallow whitespace after the closing brace of blocks.
* block-closing-brace-space-after：在闭括号之后要求有一个空格或禁止有空格。
* block-closing-brace-space-before: Require a single space or disallow whitespace before the closing brace of blocks.
* block-closing-brace-space-before：在闭括号之前要求有一个空格或禁止有空格。
  * [stylelint-config-standard]
* block-no-empty: Disallow empty blocks.
* block-no-empty：禁止出现空块。
  * [stylelint-config-recommended] true
* block-no-single-line: Disallow single-line blocks.
* block-no-single-line：禁止出现单行块。
* block-opening-brace-newline-after: Require a newline after the opening brace of blocks .
* block-opening-brace-newline-after：在开括号之后要求有一个换行符 。
  * [stylelint-config-standard]
* block-opening-brace-newline-before: Require a newline or disallow whitespace before the opening brace of blocks .
* block-opening-brace-newline-before：在括开号之前要求有一个换行符或禁止有空白 。
* block-opening-brace-space-after: Require a single space or disallow whitespace after the opening brace of blocks .
* block-opening-brace-space-after：在开括号之后要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]
* block-opening-brace-space-before: Require a single space or disallow whitespace before the opening brace of blocks .
* block-opening-brace-space-before：在开括号之前要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]

### Selector

* selector-attribute-brackets-space-inside: Require a single space or disallow whitespace on the inside of the brackets within attribute selectors.
* selector-attribute-brackets-space-inside：在特性选择器的方括号内要求有空格或禁止有空白。
  * [stylelint-config-standard]
* selector-attribute-operator-blacklist: Specify a blacklist of disallowed attribute operators.
* selector-attribute-operator-blacklist：指定一个禁止使用的特性(attribute)操作符的黑名单。
* selector-attribute-operator-space-after: Require a single space or disallow whitespace after operators within attribute selectors.
* selector-attribute-operator-space-after：在特性选择器的操作符之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* selector-attribute-operator-space-before: Require a single space or disallow whitespace before operators within attribute selectors.
* selector-attribute-operator-space-before：在特性选择器的操作符之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* selector-attribute-operator-whitelist: Specify a whitelist of allowed attribute operators.
* selector-attribute-operator-whitelist：指定允许使用的特性(attribute)操作符的白名单。
* selector-attribute-quotes: Require or disallow quotes for attribute values.
* selector-attribute-quotes：要求或禁止特性值使用引号。
  * [@qxy/stylelint-config]
* selector-class-pattern: Specify a pattern for class selectors.
* selector-class-pattern：为类选择器指定一个匹配模式。
  * [@qxy/stylelint-config]
* selector-combinator-space-after: Require a single space or disallow whitespace after the combinators of selectors .
* selector-combinator-space-after：在关系选择符之后要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]
* selector-combinator-space-before: Require a single space or disallow whitespace before the combinators of selectors .
* selector-combinator-space-before：在关系选择符之前要求有一个空格或禁止有空白 。
  * [stylelint-config-standard]
* selector-descendant-combinator-no-non-space: Disallow non-space characters for descendant combinators of selectors.
* selector-descendant-combinator-no-non-space：禁止包含选择符出现非空格字符。
  * [stylelint-config-standard]
* selector-id-pattern: Specify a pattern for id selectors.
* selector-id-pattern：指定一个 id 选择器的匹配模式。
  * [@qxy/stylelint-config]
* selector-max-compound-selectors: Limit the number of compound selectors in a selector.
* selector-max-compound-selectors：限制复合选择器的数量。
* selector-max-specificity: Limit the specificity of selectors.
* selector-max-specificity：限制选择器的优先级。
* selector-nested-pattern: Specify a pattern for the selectors of rules nested within rules.
* selector-nested-pattern：指定一个嵌套选择器的匹配模式。
* selector-no-attribute: Disallow attribute selectors.
* selector-no-attribute：禁用特性选择器。
* selector-no-combinator: Disallow combinators in selectors.
* selector-no-combinator：禁用关系选择符。
* selector-no-empty: Disallow empty selectors.
* selector-no-empty：禁止出现空选择器。
* selector-no-id: Disallow id selectors.
* selector-no-id：禁用 id 选择器。
* selector-no-qualifying-type: Disallow qualifying a selector by type.
* selector-no-qualifying-type：禁止使用类型对选择器进行限制。
* selector-no-type: Disallow type selectors.
* selector-no-type：禁用类型选择器。
* selector-no-universal: Disallow the universal selector.
* selector-no-universal：禁用通配符选择器。
* selector-no-vendor-prefix: Disallow vendor prefixes for selectors.
* selector-no-vendor-prefix：禁止使用浏览器引擎前缀。
* selector-pseudo-class-blacklist: Specify a blacklist of disallowed pseudo-class selectors.
* selector-pseudo-class-blacklist：指定一个禁止使用的伪类选择器的黑名单。
* selector-pseudo-class-case: Specify lowercase or uppercase for pseudo-class selectors.
* selector-pseudo-class-case：指定伪类选择器的大小写。
  * [stylelint-config-standard]
* selector-pseudo-class-no-unknown: Disallow unknown pseudo-class selectors.
* selector-pseudo-class-no-unknown：禁止使用未知的伪类选择器。
  * [stylelint-config-recommended]
* selector-pseudo-class-parentheses-space-inside: Require a single space or disallow whitespace on the inside of the parentheses within pseudo-class selectors.
* selector-pseudo-class-parentheses-space-inside：在伪类选择器的括号内要求使用一个空格或禁止有空白。
  * [stylelint-config-standard]
* selector-pseudo-class-whitelist: Specify a whitelist of allowed pseudo-class selectors.
* selector-pseudo-class-whitelist：指定一个允许使用的伪类选择器的白名单。
* selector-pseudo-element-case: Specify lowercase or uppercase for pseudo-element selectors.
* selector-pseudo-element-case：指定伪元素的大小写。
  * [stylelint-config-standard]
* selector-pseudo-element-colon-notation: Specify single or double colon notation for applicable pseudo-elements.
* selector-pseudo-element-colon-notation:指定伪元素使用单冒号还是双冒号。
  * [stylelint-config-standard]
  * [@qxy/stylelint-config]
* selector-pseudo-element-no-unknown: Disallow unknown pseudo-element selectors.
* selector-pseudo-element-no-unknown：禁止使用未知的伪元素。
  * [stylelint-config-recommended]
  * [@qxy/stylelint-config]
* selector-root-no-composition: Disallow the composition of :root in selectors.
* selector-root-no-composition：禁止 :root 混合使用。
* selector-type-case: Specify lowercase or uppercase for type selector.
* selector-type-case：指定类型选择器的大小写。
  * [stylelint-config-standard]
* selector-type-no-unknown: Disallow unknown type selectors.
* selector-type-no-unknown：禁用未知的类型选择器。
  * [stylelint-config-recommended]
* selector-max-empty-lines: Limit the number of adjacent empty lines within selectors.
* selector-max-empty-lines：限制选择器中相邻空行数量。
  * [stylelint-config-standard]

### Selector list

* selector-list-comma-newline-after: Require a newline or disallow whitespace after the commas of selector lists .
* selector-list-comma-newline-after: 要求选择器列表的逗号之后有一个换行符或禁止在逗号之后有空白 。
  * [stylelint-config-standard]
* selector-list-comma-newline-before: Require a newline or disallow whitespace before the commas of selector lists .
* selector-list-comma-newline-before: 要求选择器列表的逗号之前有一个换行符或禁止在逗号之前有空白 。
* selector-list-comma-space-after: Require a single space or disallow whitespace after the commas of selector lists .
* selector-list-comma-space-after：要求在选择器列表的逗号之后有一个空格，或禁止有空白 。
* selector-list-comma-space-before: Require a single space or disallow whitespace before the commas of selector lists .
* selector-list-comma-space-before：要求在选择器列表的逗号之前有一个空格，或禁止有空白 。
  * [stylelint-config-standard]

### Root rule

* root-no-standard-properties: Disallow standard properties inside :root rules.
* root-no-standard-properties：禁止在 :root 中出现标准属性。

### Rule

* rule-nested-empty-line-before: Require or disallow an empty line before nested rules.
* rule-nested-empty-line-before：在嵌套的规则中要求或禁止有空行。
* rule-non-nested-empty-line-before: Require or disallow an empty line before non-nested rules.
* rule-non-nested-empty-line-before：在非嵌套的规则之前要求或禁止有空行。
* rule-empty-line-before: 要求或禁止在规则之前的空行
  * [stylelint-config-standard]

### Media feature

* media-feature-colon-space-after: Require a single space or disallow whitespace after the colon in media features.
* media-feature-colon-space-after：在 media 特性中的冒号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* media-feature-colon-space-before: Require a single space or disallow whitespace before the colon in media features.
* media-feature-colon-space-before：在 media 特性中的冒号之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* media-feature-name-blacklist: Specify a blacklist of disallowed media feature names.
* media-feature-name-blacklist：指定禁止使用的 media 特性名称的黑名单。
* media-feature-name-case: Specify lowercase or uppercase for media feature names.
* media-feature-name-case：指定 media 特性名称的大小写。
  * [stylelint-config-standard]
* media-feature-name-no-unknown: Disallow unknown media feature names.
* media-feature-name-no-unknown：禁止使用未知的 media 特性名称。
  * [stylelint-config-recommended] true
* media-feature-name-no-vendor-prefix: Disallow vendor prefixes for media feature names.
* media-feature-name-no-vendor-prefix：禁止 media 特性名称带有浏览器引擎前缀。
* media-feature-name-whitelist: Specify a whitelist of allowed media feature names.
* media-feature-name-whitelist：指定允许使用的 media 特性名称的白名单。
* media-feature-no-missing-punctuation: Disallow missing punctuation for non-boolean media features.
* media-feature-no-missing-punctuation：禁止非布尔类型的 media 特性缺少标点。
* media-feature-parentheses-space-inside: Require a single space or disallow whitespace on the inside of the parentheses within media features.
* media-feature-parentheses-space-inside：在media 特性的括号内要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* media-feature-range-operator-space-after: Require a single space or disallow whitespace after the range operator in media features.
* media-feature-range-operator-space-after：在 media 特性的范围操作符之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* media-feature-range-operator-space-before: Require a single space or disallow whitespace before the range operator in media features.
* media-feature-range-operator-space-before：在 media 特性的范围操作符之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]

### Custom media

* custom-media-pattern: Specify a pattern for custom media query names.
* custom-media-pattern：指定一个自定义媒体查询名称的匹配模式。

### Media query list

* media-query-list-comma-newline-after: Require a newline or disallow whitespace after the commas of media query lists.
* media-query-list-comma-newline-after：在媒体查询的逗号之后要求有一个换行符或禁止有空白。
  * [stylelint-config-standard]
* media-query-list-comma-newline-before: Require a newline or disallow whitespace before the commas of media query lists.
* media-query-list-comma-newline-before：在媒体查询的逗号之前要求有一个换行符或禁止有空白。
* media-query-list-comma-space-after: Require a single space or disallow whitespace after the commas of media query lists.
* media-query-list-comma-space-after：在媒体查询的逗号之后要求有一个空格或禁止有空白。
  * [stylelint-config-standard]
* media-query-list-comma-space-before: Require a single space or disallow whitespace before the commas of media query lists.
* media-query-list-comma-space-before：在媒体查询的逗号之前要求有一个空格或禁止有空白。
  * [stylelint-config-standard]

### At-rule

* at-rule-blacklist: Specify a blacklist of disallowed at-rules.
* at-rule-blacklist：指定一个禁止使用的 at 规则的黑名单。
* at-rule-empty-line-before: Require or disallow an empty line before at-rules .
* at-rule-empty-line-before：要求或禁止在 at 规则之前有空行 。
  * [stylelint-config-standard]
  * [@qxy/stylelint-config]
* at-rule-name-case: Specify lowercase or uppercase for at-rules names.
* at-rule-name-case：指定 at 规则名称的大小写。
  * [stylelint-config-standard]
* at-rule-name-newline-after: Require a newline after at-rule names.
* at-rule-name-newline-after：要求在 at 规则之后有一个换行符。
* at-rule-name-space-after: Require a single space after at-rule names.
* at-rule-name-space-after：要求在 at 规则之后有一个空格。
  * [stylelint-config-standard]
* at-rule-no-unknown: Disallow unknown at-rules.
* at-rule-no-unknown：禁止使用未知的 at 规则。
  * [stylelint-config-recommended] true
  * [@qxy/stylelint-config] null
* at-rule-no-vendor-prefix: Disallow vendor prefixes for at-rules.
* at-rule-no-vendor-prefix：禁止 at 规则使用浏览器引擎前缀。
* at-rule-semicolon-newline-after: Require a newline after the semicolon of at-rules .
* at-rule-semicolon-newline-after：要求在 at 规则的分号之后有一个换行符 。
  * [stylelint-config-standard]
* at-rule-whitelist: Specify a whitelist of allowed at-rules.
* at-rule-whitelist：指定一个允许使用的 at 规则的白名单。

###  stylelint-disable comment

* stylelint-disable-reason: Require a reason comment before or after stylelint-disable comments.
* stylelint-disable-reason：要求在 stylelint-disable 注释之前或之后有一个原因的描述注释。

### Comment

* comment-empty-line-before: Require or disallow an empty line before comments.
* comment-empty-line-before：要求或禁止在注释之前有空行。
  * [stylelint-config-standard]
* comment-no-empty: Disallow empty comments.
* comment-no-empty：禁止空注释。
  * [stylelint-config-recommended] true
* comment-whitespace-inside: Require or disallow whitespace on the inside of comment markers.
* comment-whitespace-inside：要求或禁止在注释标签内有空白。
  * [stylelint-config-standard]
* comment-word-blacklist: Specify a blacklist of disallowed words within comments.
* comment-word-blacklist：指定一个不允许出现在注释中的单词的黑名单。

### General / Sheet

* indentation: Specify indentation .
* indentation：指定缩进 。
* max-empty-lines: Limit the number of adjacent empty lines.
* max-empty-lines：限制相邻空行的数量。
  * [stylelint-config-standard]
* max-line-length: Limit the length of a line.
* max-line-length：限制单行的长度。
* max-nesting-depth: Limit the depth of nesting.
* max-nesting-depth：限制允许嵌套的深度。
* no-browser-hacks: Disallow browser hacks that are irrelevant to the browsers you are targeting.
* no-browser-hacks：禁用与你使用的浏览器无关的 browser hacks。
* no-descending-specificity: Disallow selectors of lower specificity from coming after overriding selectors of higher specificity.
* no-descending-specificity：禁止低优先级的选择器出现在高优先级的选择器之后。
  * [stylelint-config-recommended]
  * [@qxy/stylelint-config]
* no-duplicate-selectors: Disallow duplicate selectors.
* no-duplicate-selectors：在一个样式表中禁止出现重复的选择器。
  * [stylelint-config-recommended]
* no-empty-source: Disallow empty sources.
* no-empty-source：禁止空源。
* no-eol-whitespace: Disallow end-of-line whitespace.
* no-eol-whitespace：禁止行尾空白。
  * [stylelint-config-standard]
* no-extra-semicolons: Disallow extra semicolons.
* no-extra-semicolons：禁止多余的分号。
  * [stylelint-config-recommended]
* no-indistinguishable-colors: Disallow colors that are suspiciously close to being identical.
* no-indistinguishable-colors：禁用相似的颜色。
* no-invalid-double-slash-comments: Disallow double-slash comments (//...) which are not supported by CSS.
* no-invalid-double-slash-comments：禁用 CSS 不支持的双斜线注释 (//...)。
  * [stylelint-config-recommended]
* no-missing-end-of-source-newline: Disallow missing end-of-source newlines.
* no-missing-end-of-source-newline：禁止缺少文件末尾的换行符。
  * [stylelint-config-standard]
* no-unknown-animations: Disallow animation names that do not correspond to a @keyframes declaration.
* no-unknown-animations：禁止动画名称与 @keyframes 声明不符。
* no-unsupported-browser-features: Disallow features that are unsupported by the browsers that you are targeting.
* no-unsupported-browser-features：禁止使用浏览器不支持的特性。
* no-duplicate-at-import-rules: 禁止在样式表中使用重复的 @import 规则
  * [stylelint-config-recommended]
* "no-empty-source: 禁止空源码
  * [stylelint-config-recommended]

## [stylelint-scss](https://github.com/kristerkari/stylelint-scss/blob/master/README.md)

### `@-each`

* at-each-key-value-single-line: This is a rule that checks for situations where users have done a loop using map-keys and grabbed the value for that key inside of the loop.

### `@-else`

* at-else-closing-brace-newline-after: Require or disallow a newline after the closing brace of @else statements (Autofixable).
* at-else-closing-brace-space-after: Require a single space or disallow whitespace after the closing brace of @else statements (Autofixable).
* at-else-empty-line-before: Require an empty line or disallow empty lines before @-else (Autofixable).
* at-else-if-parentheses-space-before: Require or disallow a space before @else if parentheses (Autofixable).

### `@-extend`

* at-extend-no-missing-placeholder: Disallow at-extends (@extend) with missing placeholders.

### `@-function`

* at-function-named-arguments: Require named parameters in SCSS function call rule.
* at-function-parentheses-space-before: Require or disallow a space before @function parentheses (Autofixable).
* at-function-pattern: Specify a pattern for Sass/SCSS-like function names.

### `@-if`

* at-if-closing-brace-newline-after: Require or disallow a newline after the closing brace of @if statements (Autofixable).
* at-if-closing-brace-space-after: Require a single space or disallow whitespace after the closing brace of @if statements (Autofixable).
* at-if-no-null: Disallow null in @if statements.

### `@-import`

* at-import-no-partial-leading-underscore: Disallow leading underscore in partial names in @import.
* at-import-partial-extension: Require or disallow extension in @import commands.
* at-import-partial-extension-blacklist: Specify blacklist of disallowed file extensions for partial names in @import commands.
* at-import-partial-extension-whitelist: Specify whitelist of allowed file extensions for partial names in @import commands.

### `@-mixin`

* at-mixin-argumentless-call-parentheses: Require or disallow parentheses in argumentless @mixin calls (Autofixable).
* at-mixin-named-arguments: Require named parameters in at-mixin call rule.
* at-mixin-parentheses-space-before: Require or disallow a space before @mixin parentheses (Autofixable).
* at-mixin-pattern: Specify a pattern for Sass/SCSS-like mixin names.

### `@-rule`

* at-rule-conditional-no-parentheses: Disallow parentheses in conditional @ rules (if, elsif, while) (Autofixable).
* at-rule-no-unknown: Disallow unknown at-rules. Should be used instead of stylelint's at-rule-no-unknown.
  * [@qxy/stylelint-config]

### `$-variable`

* dollar-variable-colon-newline-after: Require a newline after the colon in $-variable declarations (Autofixable).
* dollar-variable-colon-space-after: Require or disallow whitespace after the colon in $-variable declarations (Autofixable).
  * [@qxy/stylelint-config]
* dollar-variable-colon-space-before: Require a single space or disallow whitespace before the colon in $-variable declarations (Autofixable).
  * [@qxy/stylelint-config]
* dollar-variable-default: Require !default flag for $-variable declarations.
* dollar-variable-empty-line-after: Require a single empty line or disallow empty lines after $-variable declarations (Autofixable).
* dollar-variable-empty-line-before: Require a single empty line or disallow empty lines before $-variable declarations (Autofixable).
* dollar-variable-first-in-block: Require for variables to be put first in a block (a rule or in root).
* dollar-variable-no-missing-interpolation: Disallow Sass variables that are used without interpolation with CSS features that use custom identifiers.
  * [@qxy/stylelint-config]
* dollar-variable-pattern: Specify a pattern for Sass-like variables.
  * [@qxy/stylelint-config]

### `%-placeholder`

* percent-placeholder-pattern: Specify a pattern for %-placeholders.

### `//-comment`

* double-slash-comment-empty-line-before: Require or disallow an empty line before //-comments (Autofixable).
* double-slash-comment-inline: Require or disallow //-comments to be inline comments.
* double-slash-comment-whitespace-inside: Require or disallow whitespace after the // in //-comments
  * [@qxy/stylelint-config]

### Comment

* comment-no-empty: Disallow empty comments.
* comment-no-loud: Disallow /*-comments.

### Declaration

* declaration-nested-properties: Require or disallow properties with - in their names to be in a form of a nested group.
* declaration-nested-properties-no-divided-groups: Disallow nested properties of the same "namespace" be divided into multiple groups.

### Dimension

* dimension-no-non-numeric-values: Disallow non-numeric values when interpolating a value with a unit.

### Function

* function-color-relative: Encourage the use of the scale-color function over regular color functions.
* function-quote-no-quoted-strings-inside: Disallow quoted strings inside the quote function (Autofixable).
* function-unquote-no-unquoted-strings-inside: Disallow unquoted strings inside the unquote function (Autofixable).

### Map

* map-keys-quotes: Require quoted keys in Sass maps.
* Media feature
* media-feature-value-dollar-variable: Require a media feature value be a $-variable or disallow $-variables in media feature values.

### Operator

* operator-no-newline-after: Disallow linebreaks after Sass operators.
* operator-no-newline-before: Disallow linebreaks before Sass operators.
  * [@qxy/stylelint-config]
* operator-no-unspaced: Disallow unspaced operators in Sass operations.
  * [@qxy/stylelint-config]

### Partial

* partial-no-import: Disallow non-CSS @imports in partial files.

### Selector

* selector-nest-combinators: Require or disallow nesting of combinators in selectors.
* selector-no-redundant-nesting-selector: Disallow redundant nesting selectors (&).
  * [@qxy/stylelint-config]
* selector-no-union-class-name: Disallow union class names with the parent selector (&).

### General / Sheet

* no-dollar-variables: Disallow dollar variables within a stylesheet.
* no-duplicate-dollar-variables: Disallow duplicate dollar variables within a stylesheet.
* no-duplicate-mixins: Disallow duplicate mixins within a stylesheet.
* no-global-function-names: Disallows the use of global function names, as these global functions are now located inside built-in Sass modules.
