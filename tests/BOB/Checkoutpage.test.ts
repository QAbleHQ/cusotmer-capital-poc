import { test, Page, BrowserContext } from '@playwright/test';
import { HomePage } from '../../pages/BOB/HomePage';
import { PLPPage } from '../../pages/BOB/PlpPage';
import { Checkoutpage } from '../../pages/BOB/Checkoutpage';
import { BaseHelper } from '../../pages/Common/CommonMethods';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await BaseHelper.launchAndLogin(page);
});


test("SC_006, PDP — 'Buy Now' CTA redirects to Checkout page", { tag: ['@BOB', '@Checkout', '@Regression', '@Smoke'] },async ({ }) => {

  await test.step("Click Gift Card option", async () => {
    await page.waitForLoadState('domcontentloaded');
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
    await page.waitForLoadState('domcontentloaded')
    await Checkoutpage.verifyCartProductDetailsVisible(page);
  });
});