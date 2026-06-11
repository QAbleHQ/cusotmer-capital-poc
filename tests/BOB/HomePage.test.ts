import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { VerificationHelpers } from '../../utils/verificationHelper';
import { LoginPage } from '../../pages/BOB/LoginPage';
import { HomePage } from '../../pages/BOB/HomePage';
import { homedir } from 'node:os';
const bobTestData = require('../../testdata/bobtestdata.json');

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
  await LoginPage.LoginCredEnterBeforeEach(page);
  await LoginPage.RestrictionPageBeforeEach(page);
});
test('SC_002, Home page — Trending Categories section visible and clickable', { tag: ['@BOB', '@Homepage'] }, async () => {
  
  await test.step('Verify All homepage sections is visible: banner, categories, trending section Displayed', async () => {
    await HomePage.verifyBannerSectionDisplayed(page);
    await HomePage.imgInsideBannerIsVisible(page);
    await HomePage.verifyCategorySectionDisplayed(page);
    await HomePage.verifyTrendingSectionDisplayed(page);
  });

  await test.step(' Category cards is clearly displayed with images and labels and Clicking a category is navigate to the respective PLP', async () => {
      await HomePage.verifyCategoryImagesAndTextsDisplayed(page);
      // await HomePage.verifyCategoryNavigationToProductPage(page);
  });

  
}); 

test('Verify Runs Properly', { tag: ['@BOB', '@Test'] }, async () => {

  await test.step(' Category cards is clearly displayed with images and labels and Clicking a category is navigate to the respective PLP', async () => {
      await HomePage.verifyCategoryNavigationToProductPage(page);
  });
  
}); 


test("Gift Card PLP — product card details and layout", { tag: ['@BOB', '@Giftcard'] }, async ({ }) => {

  await test.step("Click Gift Card option", async () => {
    await page.waitForLoadState('domcontentloaded')
    await HomePage.clickGiftCardOption(page);
    
  });

  await test.step("Verify Gift Card PLP page is visible", async () => {
    await HomePage.verifyGiftCardPLPPageVisible(page);
  });

  await test.step("Verify section title is visible", async () => {
    await HomePage.verifySectionTitleVisible(page);
  });

  await test.step("Verify product cards are visible", async () => {
    await page.waitForLoadState('domcontentloaded')
    await HomePage.verifyProductCardsVisible(page);
  });

  await test.step("Verify product titles are visible", async () => {
    await HomePage.verifyProductTitleVisible(page);
    await page.waitForTimeout(3000)
  });

  await test.step("Verify Earn Points badge is visible", async () => {
    await HomePage.verifyEarnPointsBadgeVisible(page);
  });

  await test.step("Verify Points + Cash pricing is visible", async () => {
    await HomePage.verifyPointsAndCashVisible(page);
  });

  await test.step("Verify grid layout consistency", async () => {
    await HomePage.verifyGridLayout(page);
  });

  await test.step("Click on second Gift Card", async () => {
    await HomePage.clickGiftCard(page);
  });

});
