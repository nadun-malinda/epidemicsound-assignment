module.exports = {
  extends: ["react-app", "react-app/jest", "plugin:playwright/playwright-test"],
  overrides: [
    {
      files: ["tests/e2e/**/*.{ts,tsx}"],
      rules: {
        "testing-library/prefer-screen-queries": "off",
      },
    },
  ],
};
