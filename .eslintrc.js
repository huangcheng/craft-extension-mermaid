module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 10,
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:typescript-sort-keys/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  plugins: ['react-hooks', '@typescript-eslint/eslint-plugin'],
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  rules: {
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'no-debugger': 'error',
    'no-console': 'error',
    'no-undefined': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    '@typescript-eslint/explicit-function-return-type': ['error'],
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'sort-keys': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/prevent-abbreviations': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'react/prop-types': 'off',
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    '@typescript-eslint/restrict-template-expressions': 'off',
    'typescript-sort-keys/interface': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'unicorn/no-null': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    'unicorn/prefer-array-some': 'off',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['tsconfig.json'],
        createDefaultProgram: false,
      },
    },
  ],
  settings: {
    react: {
      version: '18',
    },
  },
};
