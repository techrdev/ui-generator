module.exports = {
  roots: [
    '<rootDir>/src',
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts)$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  watchPathIgnorePatterns: ['__file_snapshots__'],
};
