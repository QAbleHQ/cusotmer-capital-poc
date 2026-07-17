import { test, Page, BrowserContext } from '../../utils/testBase';
import { HomePage } from '../pages/HomePage';
import { PLPPage } from '../pages/PlpPage';
import { Checkoutpage } from '../pages/Checkoutpage';
import { PdpPage } from '../pages/PdpPage';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../pages/LoginPage';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
  await LoginPage.LoginCredEnterBeforeEach(page);
  await LoginPage.RestrictionPageBeforeEach(page);
  await page.waitForLoadState('domcontentloaded');
});

test.afterEach(async () => {
  await page.close();
  await context.close();
});

test("SC_006, PDP — 'Buy Now' CTA redirects to Checkout page", { tag: ['@BOBCard', '@Checkout', '@Regression', '@Smoke'] }, async ({ }) => {

  await test.step("Click Gift Card option", async () => {
    await page.waitForLoadState('domcontentloaded');
    await HomePage.waitForHeader(page);
    await HomePage.clickGiftCardOption(page);
  });

  await test.step("Click Gift Card", async () => {
    await HomePage.clickGiftCard(page);
  });

  await test.step("Verify Gift Card Details", async () => {
    await page.waitForLoadState('domcontentloaded');
    await page.waitForTimeout(5000);
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

test("SC_007, Home page — merchandise purchase from Deals section using cash only", { tag: ['@BOBCard', '@Checkout', '@Regression', '@Smoke'] }, async ({ }) => {

  await test.step("Open a merchandise product from the Deals section", async () => {
    await HomePage.scrollToEarnMoreSection(page);
    await HomePage.clickProduct(page);
  });

  await test.step("Verify PDP and increase quantity to a maximum of 2", async () => {
    await PdpPage.verifyPdpPageVisible(page);
    await PdpPage.increaseQuantityToMaximum(page, 2);
    await PdpPage.clickBuyNow(page);
  });

  await test.step("Verify checkout page, choose Ashva card and complete purchase", async () => {
    await Checkoutpage.verifyCartProductDetailsVisible(page);
    const cardSelected = await Checkoutpage.selectSavedCard(page, 'Ashva');
    if (cardSelected) {
      await Checkoutpage.enterCardDetails(page, '4405 2300 0000 2093', '05/29', '123');
    } else {
      console.warn('Ashva card selection failed; proceeding directly to Buy Now button click.');
    }
    await Checkoutpage.clickBuyNow(page);
  });
});