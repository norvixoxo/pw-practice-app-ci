import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './testOptions';


require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 10000,
  // globalTimeout: 60000,
  expect:{
    timeout: 2000,
    toMatchSnapshot: {maxDiffPixels: 50}
  },

  testDir: './tests',

  fullyParallel: true,

  retries: 1,

  workers: process.env.CI ? 1 : undefined,
  
  reporter: [
    ['json', {outputFile: 'test-results/jsonReport.json'}],
    ['junit', {outputFile: 'test-results/junitReport.xml'}],
    // ['list'],
    // ['html', {open: 'on-failure'}],
    ['allure-playwright'],
    ['html']
  ],
  
  use: {
    // baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' ?'http://localhost:4201/'
          : process.env.STAGE == '1' ? 'http://localhost:4202/'
          :process.env.PROD == '1' ? 'http://localhost:4203/'
          : 'http://localhost:4200/',

    trace: 'on-first-retry',
    actionTimeout: 5000,
    navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: {width: 1920, height: 1080}
    }
  },

  projects: [
    {
      name: 'Dev',
      use: { 
        ...devices['Desktop Chrome'],
       // baseURL: 'http://localhost:4205/',
        globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
       },
      fullyParallel: true
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
         browserName: 'firefox',
         video: {
          mode: 'on',
          size: {width: 1920, height: 1080}
        }
    },
  },
  {
    name: 'pageObjectFullScreen',
    testMatch: 'usePageObject.spec.ts',
    use: {
      viewport: {width: 1920, height: 1080}
    }
  },
  {
    name: 'mobile',
    testMatch: 'testMobile.spec.ts',
    use: {
      ...devices['iPhone 13 Pro']
    }
  }
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200/'
  }
});