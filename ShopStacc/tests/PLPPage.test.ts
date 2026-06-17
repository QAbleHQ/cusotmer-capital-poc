import { test, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { PLPPage } from '../pages/PlpPage';
import { BaseHelper } from '../../TripStacc/pages/CommonMethods';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await BaseHelper.launchAndLogin(page);
});

test("SC_005,Gift Card PDP - Verify details and actions", { tag: ['@BOB', '@PLP','@Regression', '@Sanity'] },async ({ }) => {

  await test.step("Click Gift Card option", async () => {
    await page.waitForLoadState('domcontentloaded')
    await HomePage.clickGiftCardOption(page);
  });

  await test.step("Click Gift Card", async () => {
    await HomePage.clickGiftCard(page);
  });

  await test.step("Verify Gift Card Details", async () => {
    await page.waitForLoadState('domcontentloaded')
    await PLPPage.verifyGiftCardDetailsVisible(page);
  });

  await test.step("Click Quantity Increase", async () => {
    await PLPPage.clickQuantityIncreaseButton(page);
  });

  await test.step("Click Buy Now", async () => {
    await PLPPage.clickBuyNowButton(page);
  });
});