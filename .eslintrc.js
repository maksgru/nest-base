module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {


    /* error rules code-style */
    'no-trailing-spaces': 'error',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'no-multi-spaces': 'error',
    'no-empty-function': ['error', { 'allow': ['constructors'] }],
    'lines-between-class-members': ['error', 'always'],
    'arrow-parens': ['error', 'as-needed'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'comma-dangle': ['error', 'always-multiline'],
    'semi': 'error',
    'indent': 'off',
    '@typescript-eslint/indent': ['error', 2],
    'sort-imports': ["error", { "ignoreDeclarationSort": true }],
    // 'max-len': ["error", { "code": 100, "ignoreUrls": true, "ignoreComments": true }],
    /* error rules ts */
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'error',
    '@typescript-eslint/explicit-member-accessibility': ['error', { overrides: { constructors: 'no-public' } }],
    '@typescript-eslint/no-explicit-any': 'error',
  },
};
