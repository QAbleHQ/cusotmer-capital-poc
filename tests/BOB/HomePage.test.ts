import { test, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../../pages/BOB/HomePage';
import { BaseHelper } from '../../pages/Common/CommonMethods';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await BaseHelper.launchAndLogin(page);
});


test('SC_002, Home page — Trending Categories section visible and clickable', { tag: ['@BOB', '@Homepage', '@Smoke', '@Sanity'] }, async () => {
  
  await test.step('Verify All homepage sections is visible: banner, categories, trending section Displayed', async () => {
    await HomePage.verifyBannerSectionDisplayed(page);
    await HomePage.imgInsideBannerIsVisible(page);
    await HomePage.verifyCategorySectionDisplayed(page);
    await HomePage.verifyTrendingSectionDisplayed(page);
  });

  await test.step(' Category cards is clearly displayed with images and labels and Clicking a category is navigate to the respective PLP', async () => {
      await HomePage.verifyCategoryImagesAndTextsDisplayed(page);
      await HomePage.verifyCategoryNavigationToProductPage(page);
  });
  
}); 

test("SC_004, Gift Card PLP — product card details and layout", { tag: ['@BOB', '@Homepage','@Giftcard', '@Regression'] }, async ({ }) => {

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

test("SC_003 - Earn More Deals → PDP Verification", { tag: ['@BOB', '@Homepage', '@Regression','@Smoke'] }, async ({ }) => {
  let productData: any;

  await test.step("Step 2: Scroll to section", async () => {
    await HomePage.scrollToEarnMoreSection(page);
  });

  await test.step("Step 3: Verify products", async () => {
    await HomePage.verifyProductsVisible(page);
    productData = await HomePage.getProductDetails(page);
  });

  await test.step("Step 4: Click product", async () => {
    await HomePage.clickProduct(page);
  });

  await test.step("Step 5: Verify PDP", async () => {
    await HomePage.verifyPDP(page, productData);
  });

});
