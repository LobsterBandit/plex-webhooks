module.exports = {
  settings: {
    node: {
      tryExtensions: ['.js', '.json', '.node', '.ts'],
    },
  },
  extends: ['plugin:node/recommended'],
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    'node/no-unsupported-features/es-syntax': [
      'error',
      {
        version: '>=12.0.0',
        ignores: ['modules'],
      },
    ],
  },
};
