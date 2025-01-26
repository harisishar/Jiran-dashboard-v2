module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Disable all rules
    'no-unused-vars': 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'no-undef': 'off',
    'no-redeclare': 'off',
    'no-dupe-keys': 'off',
    'no-duplicate-case': 'off',
    'no-empty': 'off',
    'no-ex-assign': 'off',
    'no-extra-boolean-cast': 'off',
    'no-extra-semi': 'off',
    'no-func-assign': 'off',
    'no-inner-declarations': 'off',
    'no-invalid-regexp': 'off',
    'no-irregular-whitespace': 'off',
    'no-obj-calls': 'off',
    'no-sparse-arrays': 'off',
    'no-unreachable': 'off',
    'use-isnan': 'off',
    'valid-typeof': 'off',
    // Add more rules as needed
  },
} 