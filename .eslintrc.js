module.exports = {
  plugins: ['cypress'],
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
    'cypress/globals': true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 0,
    'no-console': 0,
    'no-underscore-dangle': 0,
    'no-restricted-globals': 0,
    'linebreak-style': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
      },
    ],
    'quote-props': [
      'error',
      'as-needed',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
  },
};
