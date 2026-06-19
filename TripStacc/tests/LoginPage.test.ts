import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { HotelHomePage } from '../pages/HotelHomePage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/Homepage';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
});
test.afterEach(async () => {
  await page.close();
  await context.close();
});

test('SC_001: Verify user can Login with mobile number and OTP', { tag: ['@IDFC','@BOB', '@Loginpage','@Smoke','@Sanity'] }, async () => {
  await test.step('Step 1: Enter valid mobile number', async () => {
    await LoginPage.verifyMobileNumberFieldAcceptsInput(page);
  });

  await test.step('Step 2: Click Get OTP Button', async () => {
    await LoginPage.clickGetOtpButton(page);
    await LoginPage.verifyOtpPageVisible(page);
  });

  await test.step('Step 3: Enter valid OTP and verify OTP field accepts input', async () => {
    await LoginPage.verifyOtpFieldAcceptsInput(page);
  });

  await test.step('Step 4: Click Login button and verify login action', async () => {
    await LoginPage.verifyLoginButtonWorks(page);
  });

  await test.step('Step 5: Verify Hotel Home Page is loaded', async () => {
    await page.waitForTimeout(5000);
    await HotelHomePage.verifyHotelHomePageLoaded(page);
  });
});

test('SC_002: Home page with multiple card and without multiple cards selection',{ tag: [ '@BOBTest', '@Loginpage', '@Smoke', '@Sanity'] },async ({}) => {
 
    await test.step('Step 1: Enter valid mobile number', async () => {
      await LoginPage.verifyMobileNumberFieldAcceptsInput(page);
    });

    await test.step('Step 2: Click Get OTP and verify OTP screen', async () => {
      await LoginPage.clickGetOtpButton(page);
      await LoginPage.verifyOtpPageVisible(page);
    });

    await test.step('Step 3: Enter valid OTP', async () => {
      await LoginPage.verifyOtpFieldAcceptsInput(page);
    });

    await test.step('Step 4: Click Login button', async () => {
      await LoginPage.verifyLoginButtonWorks(page);
    });

    await test.step('Step 5: Handle post-login flow (IDFC / BOB)', async () => {
      await page.waitForLoadState('domcontentloaded')
      await HomePage.handlePostLoginFlow(page);
    });
});