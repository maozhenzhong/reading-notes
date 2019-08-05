module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: ['alloy', 'plugin:vue/recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    // 结尾不用写分号
    semi: ['error', 'never'],
    indent: [
      // 两个空格
      'error',
      2,
      {
        SwitchCase: 1,
        flatTernaryExpressions: true
      }
    ],
    complexity: [
      // 圈复杂度最大为10
      'error',
      {
        max: 10
      }
    ],
    'max-lines': [
      'error',
      {
        // 单文件最大行数为1000
        max: 1000,
        skipComments: true
      }
    ],
    radix: 'off', // parseInt 不是必须传入第二个参数
    'max-statements-per-line': [
      // 一行只能有一条语句
      'error',
      {
        max: 1
      }
    ]
  }
}
