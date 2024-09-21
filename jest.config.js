module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|expo|@react-native|@react-navigation|react-redux|redux)).*/',
  ],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
};
