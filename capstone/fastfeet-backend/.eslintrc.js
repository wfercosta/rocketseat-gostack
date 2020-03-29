module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'eslint-plugin-import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'prettier/prettier': 'error',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@controllers', './src/app/controllers'],
          ['@models', './src/app/models'],
          ['@configurations', './src/configuration'],
          ['@infrastructure', './src/infrastructure'],
          ['@routes', './src/routes'],
          ['@middlewares', './src/middlewares'],
        ],
      },
    },
  },
};
