module.exports = {
  displayName: 'CLIENT',
  testPathIgnorePatterns: ['/node_modules/', '.vscode', 'server'],
  modulePaths: ['<rootDir>/src', '<rootDir>/test'],
  moduleNameMapper: {
    '@components': '<rootDir>/src/components',
    '@modules': '<rootDir>/src/modules',
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/test/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.js'],
};
