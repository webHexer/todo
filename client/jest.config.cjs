module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",

  testMatch: [
    "<rootDir>/src/tests/**/*.test.ts",
    "<rootDir>/src/tests/**/*.test.tsx",
  ],

  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
};
