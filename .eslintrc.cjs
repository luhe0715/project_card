module.exports = {
  root: true,
  // 运行环境
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    // 'airbnb-base',
    './.eslintrc-auto-import.json',
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  parserOptions: {
    // parser: '@typescript-eslint/parser', // 解析器选项。指定你想支持的语言，默认支持es5
    sourceType: 'module', // 指定源代码存在的位置，script | module，默认为script
    ecmaVersion: 12, // ES的版本
    ecmaFeatures: {
      // 指定要使用其他那些语言对象
      experimentalObjectRestSpread: true, // 启用对对象的扩展
      jsx: true, // 启用jsx语法
      globalReturn: true, // 允许return在全局使用
      impliedStrict: true, // 启用严格校验模式
    },
  },
  plugins: ['vue', 'prettier', 'import'],
  rules: {
    'no-alert': 0, // 禁止使用alert confirm prompt
    // indent: [2, 2], // 缩进风格
    indent: 'off', // 缩进风格
    // '@typescript-eslint/indent': [2, 2],
    'vue/no-multiple-template-root': 0, // vue3多根组件
    'vue/multi-word-component-names': 0,
    'no-console': 'off',
    'no-unused-vars': 'off', //变量未使用时候禁止报错
    'import/no-unresolved': 'off',
    'import/no-absolute-path': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
  },
}
