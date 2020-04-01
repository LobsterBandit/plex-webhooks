module.exports = {
  displayName: { name: 'VIEWER', color: 'green' },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
