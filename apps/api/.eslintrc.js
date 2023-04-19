module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
    extraFileExtensions: ['.json']
  },
  root: true,
  env: {
    node: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',

    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/naming-convention': 'off',

    "max-classes-per-file": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",

    'unused-imports/no-unused-imports': 1,
    'unused-imports/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],

    'import/extensions': 0,
    'import/prefer-default-export': 0,
    'import/no-cycle': 0,
    'import/no-import-module-exports': 0,

    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: '@/**',
            group: 'external',
            position: 'after',
          },
        ],
        alphabetize: { order: 'asc', caseInsensitive: false },
        'newlines-between': 'always-and-inside-groups',
        warnOnUnassignedImports: true,
      },
    ],

    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
  },
};
