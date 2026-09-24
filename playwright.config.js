const { defineConfig, devices } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/e2e',
  timeout: 20000,
  globalTimeout: 240000,
  expect: { timeout: 7000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.ernestinhocarioca.com.br',
    trace: 'off', screenshot: 'only-on-failure', video: 'off',
    ignoreHTTPSErrors: true,
    navigationTimeout: 12000,
    actionTimeout: 7000
  },
  projects: [
    { name: 'chromium-desktop', use: { ...devices['Desktop Chrome'] } }
  ]
});
