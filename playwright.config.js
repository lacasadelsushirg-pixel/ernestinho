const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 7000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.ernestinhocarioca.com.br',
    trace: 'off', screenshot: 'only-on-failure', video: 'off',
    ignoreHTTPSErrors: true
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit-mobile', use: { ...devices['iPhone 14'] } }
  ]
});
