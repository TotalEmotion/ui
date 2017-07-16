const { resolve } = require('path');

module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'parserOptions': {
    'ecmaFeatures': {
      'experimentalObjectRestSpread': true,
      'jsx': true,
    },
    'sourceType': 'module',
  },
  'extends': [
    '@team-griffin/eslint-config/frontend-config/core',
    '@team-griffin/eslint-config/frontend-config/flowtype',
    '@team-griffin/eslint-config/frontend-config/import',
    '@team-griffin/eslint-config/frontend-config/jsx-a11y',
    '@team-griffin/eslint-config/frontend-config/react',
  ],
  // 'settings': {
  //   'import/resolver': {
  //     'webpack': {
  //       'config': {
  //         'resolve': {
  //           'alias': {
  //           }
  //         }
  //       }
  //     }
  //   }
  // }
};
