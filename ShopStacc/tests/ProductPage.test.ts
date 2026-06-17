import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { VerificationHelpers } from '../../utils/verificationHelper';
import { LoginPage } from '../pages/LoginPage';
import bobTestData from '../../testdata/shopStacc.json';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    await CommonHelper.navigateToHomePage(page);
    await LoginPage.LoginCredEnterBeforeEach(page);
    await LoginPage.RestrictionPageBeforeEach(page);
    await page.pause();
  });
   
