module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:effector/recommended',
    'plugin:effector/scope',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
  },
  plugins: ['effector', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
  },
}
