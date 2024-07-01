import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './testOptions';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  //timeout: 10000,

  //globalTimeout: 60000,

  // expect:{
  //   timeout: 2000
  // },

  testDir: './tests',
  
  /* Run tests in files in parallel 
  * When set to false it means the whole framework and tests will run in sequence
  * When set to trueit means playwright will run whole framework tests in parallel
  */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only 
  * if 2nd value us set to 0 then it will not retry means it is OFF (locally)
  * It will however retry on CI
  * if set to 1 then it will retry 1x (locally)
  * this is where you can set the retries globally for the whole project
  * It can be overwritten for each specific test in the function/test code
  */
  retries: process.env.CI ? 2 : 1,
  
  /* Opt out of parallel tests on CI. 
  * if set to undefined playwright allocates 5 workers by default
  * if set to a specific number then that is the amount of workers that will be used
  * if for e.g. set to 1 you can remame spec files with prefix of 001-test.spec.ts etc and it will pick them in that order
  * otherwise it will pick it at random
  */
  workers: process.env.CI ? 1 : undefined,
  
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:4200/',
    globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    // baseURL: process.env.DEV === '1' ?'http://localhost:4200/'
    //       : process.env.STAGE == '1' ? 'http://localhost:4202/'
    //       :process.env.PROD == '1' ? 'http://localhost:4203/'
    //       : 'http://localhost:4200/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    //actionTimeout: 5000,
    // navigationTimeout: 5000,

  /***
   * here is to insert code to help save video when test is running
   * by default it is off
   * you have options to select when to recod etc
   * choose appropriate one
   * if you want to specify the video resolution then you can do this as well see below
   */
    video: {
      mode: 'on',
      size: {width: 1920, height: 1080}
    }

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'Dev',
      use: { 
        ...devices['Desktop Chrome'],
       // baseURL: 'http://localhost:4205/',
        globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
       },
      fullyParallel: true
      //can set parallel for each borwser excluding the other browsers
    },
    {
      name: 'stage',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4202/',
        globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
       },
      fullyParallel: true
      //can set parallel for each borwser excluding the other browsers
    },
    {
      name: 'prod',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4203/',
        globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/'
       },
      fullyParallel: true
      //can set parallel for each borwser excluding the other browsers
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true
      //can set parallel for each borwser excluding the other browsers
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});