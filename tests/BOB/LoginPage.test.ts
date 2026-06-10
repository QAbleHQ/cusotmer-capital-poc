import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { VerificationHelpers } from '../../utils/verificationHelper';
import { LoginPage } from '../../pages/BOB/LoginPage';
import bobTestData from '../../testdata/bobtestdata.json';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
   
});

test('IF Login Page Displayed', async () => {
  await test.step('Step 1: Verify and Enter Mobile Number', async () => {
    await LoginPage.verifyMobileNumberFieldDisplayed(page);
    await LoginPage.enterMobileNumber(page, bobTestData.loginDataFill.mobileNumber);
  });

  await test.step('Step 2: Click Get OTP Button and Enter OTP', async () => {
    await LoginPage.clickGetOtpButton(page);
    await LoginPage.verifyOtpPageVisible(page);
    await LoginPage.enterOtp(page, bobTestData.loginDataFill.otp);
  });

  await test.step('Step 4: Verify and Click Login Button', async () => {
    await LoginPage.verifyLoginButtonDisplayed(page);
    await LoginPage.clickLoginButton(page);
  });
});

test('Verify Login Before Each Works', async () => {
  await LoginPage.RestrictionPageBeforeEach(page);
});

test('SC_001, Login with valid mobile number and OTP', { tag: ['@BOB', '@Loginpage'] }, async () => {
  
  await test.step('If login button is displayed, then uncomment this', async () => {
    await LoginPage.LoginCredEnterBeforeEach(page);
  });
  
  await test.step('Step 1: Verify and Enter User ID', async () => {
    await LoginPage.verifyUserIdDisplayed(page);
    await LoginPage.enterUserID(page);
  });

  await test.step('Step 2: Verify and Enter User Password', async () => {
    await LoginPage.verifyUserPasswordDisplayed(page);
    await LoginPage.enterUserPassword(page);
  });

  await test.step('Step 3: Verify and Click Enter Login Button', async () => {
    await LoginPage.verifyEnterLoginButtonDisplayed(page);
    await LoginPage.clickEnterLoginButton(page);
  });
  await test.step('Step 4: Wait until Dialog Box is Displayed', async () => {
    await LoginPage.waitUntilDialogBoxDisplayed(page);
  });
  await test.step('Step 5: Click Skip Button Inside Dialog Box', async () => {
    await LoginPage.clickSkipButtonInsideDialogBox(page);
  });
}); 