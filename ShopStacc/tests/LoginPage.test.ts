import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../pages/LoginPage';
import bobTestData from '../../testdata/shopStacc.json';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
   
});


test('SC_001, Login with valid mobile number and OTP', { tag: ['@BOB','@Login', '@Smoke', '@Sanity'] }, async () => {
  
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