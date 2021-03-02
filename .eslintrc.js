// .eslintrc.js
module.exports = {
  plugins: ['react'],
  extends: ['airbnb-typescript-prettier', 'plugin:react/recommended'],
  rules: {
    'no-plusplus': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'no-use-before-define': 'off',
    'react/require-default-props': 'off',
  },
  env: {
    jest: true,
  },
};
