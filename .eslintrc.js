// .eslintrc.js
module.exports = {
  extends: ['airbnb-typescript-prettier'],
  rules: {
    'no-plusplus': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react-hooks/exhaustive-deps': 'off'
  },
  env: {
    jest: true,
  },
};
