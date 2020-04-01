const { defaults } = require('jest-config');

module.exports = {
  // preset: 'ts-jest',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  projects: [
    '<rootDir>/packages/server/jest.config.js',
    '<rootDir>/packages/viewer/jest.config.js',
  ],
  coverageDirectory: './coverage',
  verbose: true,
};
