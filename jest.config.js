module.exports = {
  // Automatically clear mock calls and instances between every test
  clearMocks: true,

  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',

  // Runs special logic, such as cleaning up components
  // when using React Testing Library and adds special
  // extended assertions to Jest
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],

  // The test environment that will be used for testing
  testEnvironment: 'jsdom',

  // Enable css modules support
  transform: {
    '.+\\.(css|styl|less|sass|scss)$': 'jest-css-modules-transform',
  },
};
