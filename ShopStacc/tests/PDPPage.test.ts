import { test, Page, BrowserContext } from '../../utils/testBase';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { PdpPage } from '../pages/PdpPage';

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

test('SC_008, PDP — verify product page is loaded from Deals section', { tag: ['@BOBCard', '@PDP', '@Regression', '@Smoke'] }, async () => {
  await test.step('Scroll to Deals section and open a product', async () => {
    await HomePage.scrollToEarnMoreSection(page);
    await HomePage.clickProduct(page);
  });

  await test.step('Verify PDP page details are visible', async () => {
    await PdpPage.verifyPdpPageVisible(page);
  });
});

test('SC_009, PDP — increase quantity and verify Buy Now action', { tag: ['@BOBCard', '@PDP', '@Regression'] }, async () => {
  await test.step('Open a product from Deals section', async () => {
    await HomePage.scrollToEarnMoreSection(page);
    await HomePage.clickProduct(page);
  });

  await test.step('Increase quantity to 2 and click Buy Now', async () => {
    await PdpPage.verifyPdpPageVisible(page);
    await PdpPage.increaseQuantityToMaximum(page, 2);
    await PdpPage.clickBuyNow(page);
  });
});
