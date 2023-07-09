module.exports = {
  'env': {
    'browser': true,
    'es6'    : true,
    'node'   : true
  },
  'extends': [
    'eslint:recommended',
    'plugin:svelte/recommended'
  ],
  'parserOptions': {
    'ecmaVersion': 2022,
    'sourceType' : 'module'
  },
  'rules': {
    'no-useless-return'          : 'error',
    'max-len'                    : ['error', { 'code': 150, 'comments': 200 }],
    'no-var'                     : 'error',
    'prefer-const'               : 'error',
    'no-unused-vars'             : ['error', { 'args': 'none' }],
    'key-spacing'                : ['error', { 'align': 'colon' }],
    'block-spacing'              : 'error',
    'comma-style'                : ['error', 'last'],
    'lines-between-class-members': ['error', 'always'],
    'no-multiple-empty-lines'    : ['error', {'max': 1}],
    'space-before-blocks'        : 'error',
    'operator-linebreak'         : ['error', 'after'],
    'no-trailing-spaces'         : 'error',
    'comma-spacing'              : ['error', { 'before': false, 'after': true }],
    'comma-dangle'               : ['error', 'never'],
    'no-console'                 : 'off',
    'require-atomic-updates'     : 'off',
    'indent'                     : [
      'error',
      2
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'svelte/valid-compile': ['error', {'ignoreWarnings': true}]
  }
}