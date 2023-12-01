const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  stylistic: true,
  stylistic: {
    indent: 2,
    quotes: 'single',
  },
}, {
  rules: {
    'no-console': 'off',

    'ts/consistent-type-imports': 'off',
    'node/prefer-global/process': 'off',
    'node/prefer-global/buffer': 'off',


    'import/order': [
      2,
      {
        'pathGroups': [
          {
            pattern: '~/**',
            group: 'external',
            position: 'after',
          },
        ],
        'alphabetize': { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        'warnOnUnassignedImports': true,
      },
    ],
  },
})
