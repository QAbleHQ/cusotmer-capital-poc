import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { HotelHomePage } from '../../pages/IDFC/HotelHomePage';
import { LoginPage } from '../../pages/IDFC/LoginPage';
import idfcTestData from '../../testdata/idfctestdata.json';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
});

test('SC_001, SC_002: Verify user can login with valid credentials and Home page with multiple card and without multiple cards selection', { tag: ['@IDFC', '@Loginpage','@Smoke','@Sanity'] }, async () => {
  await test.step('Step 1: Enter valid mobile number', async () => {
    await LoginPage.verifyMobileNumberFieldAcceptsInput(page, idfcTestData.loginDataFill.mobileNumber);
  });

  await test.step('Step 2: Click Get OTP Button', async () => {
    await LoginPage.clickGetOtpButton(page);
    await LoginPage.verifyOtpPageVisible(page);
  });

  await test.step('Step 3: Enter valid OTP and verify OTP field accepts input', async () => {
    await LoginPage.verifyOtpFieldAcceptsInput(page, idfcTestData.loginDataFill.otp);
  });

  await test.step('Step 4: Click Login button and verify login action', async () => {
    await LoginPage.verifyLoginButtonWorks(page);
  });

  await test.step('Step 5: Verify Hotel Home Page is loaded', async () => {
    await page.waitForTimeout(5000);
    await HotelHomePage.verifyHotelHomePageLoaded(page);
  });
});