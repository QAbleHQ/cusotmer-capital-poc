# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/LoginPage.test.ts >> SC_001: Verify user can Login with mobile number and OTP
- Location: TripStacc/tests/LoginPage.test.ts:20:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/runner/.cache/ms-playwright/chromium_headless_shell-1223/chrome-headless-shell-linux64/chrome-headless-shell
╔════════════════════════════════════════════════════════════╗
║ Looks like Playwright was just installed or updated.       ║
║ Please run the following command to download new browsers: ║
║                                                            ║
║     npx playwright install                                 ║
║                                                            ║
║ <3 Playwright Team                                         ║
╚════════════════════════════════════════════════════════════╝
```

```
TypeError: Cannot read properties of undefined (reading 'close')
```

# Test source

```ts
  1  | import { test, Page, BrowserContext } from '@playwright/test';
  2  | import { CommonHelper } from '../../utils/commonHelper';
  3  | import { HotelHomePage } from '../pages/HotelHomePage';
  4  | import { LoginPage } from '../pages/LoginPage';
  5  | import { HomePage } from '../pages/Homepage';
  6  | 
  7  | let context: BrowserContext;
  8  | let page: Page;
  9  | 
  10 | test.beforeEach(async ({ browser }) => {
  11 |   context = await browser.newContext();
  12 |   page = await context.newPage();
  13 |   await CommonHelper.navigateToHomePage(page);
  14 | });
  15 | test.afterEach(async () => {
> 16 |   await page.close();
     |              ^ TypeError: Cannot read properties of undefined (reading 'close')
  17 |   await context.close();
  18 | });
  19 | 
  20 | test('SC_001: Verify user can Login with mobile number and OTP', { tag: ['@IDFC','@BOB', '@Loginpage','@Smoke','@Sanity'] }, async () => {
  21 |   await test.step('Step 1: Enter valid mobile number', async () => {
  22 |     await LoginPage.verifyMobileNumberFieldAcceptsInput(page);
  23 |   });
  24 | 
  25 |   await test.step('Step 2: Click Get OTP Button', async () => {
  26 |     await LoginPage.clickGetOtpButton(page);
  27 |     await LoginPage.verifyOtpPageVisible(page);
  28 |   });
  29 | 
  30 |   await test.step('Step 3: Enter valid OTP and verify OTP field accepts input', async () => {
  31 |     await LoginPage.verifyOtpFieldAcceptsInput(page);
  32 |   });
  33 | 
  34 |   await test.step('Step 4: Click Login button and verify login action', async () => {
  35 |     await LoginPage.verifyLoginButtonWorks(page);
  36 |   });
  37 | 
  38 |   await test.step('Step 5: Verify Hotel Home Page is loaded', async () => {
  39 |     await page.waitForTimeout(5000);
  40 |     await HotelHomePage.verifyHotelHomePageLoaded(page);
  41 |   });
  42 | });
  43 | 
  44 | test('SC_002: Home page with multiple card and without multiple cards selection',{ tag: [ '@BOBTest', '@Loginpage', '@Smoke', '@Sanity'] },async ({}) => {
  45 |  
  46 |     await test.step('Step 1: Enter valid mobile number', async () => {
  47 |       await LoginPage.verifyMobileNumberFieldAcceptsInput(page);
  48 |     });
  49 | 
  50 |     await test.step('Step 2: Click Get OTP and verify OTP screen', async () => {
  51 |       await LoginPage.clickGetOtpButton(page);
  52 |       await LoginPage.verifyOtpPageVisible(page);
  53 |     });
  54 | 
  55 |     await test.step('Step 3: Enter valid OTP', async () => {
  56 |       await LoginPage.verifyOtpFieldAcceptsInput(page);
  57 |     });
  58 | 
  59 |     await test.step('Step 4: Click Login button', async () => {
  60 |       await LoginPage.verifyLoginButtonWorks(page);
  61 |     });
  62 | 
  63 |     await test.step('Step 5: Handle post-login flow (IDFC / BOB)', async () => {
  64 |       await page.waitForLoadState('domcontentloaded')
  65 |       await HomePage.handlePostLoginFlow(page);
  66 |     });
  67 | });
```