import { test, Page, BrowserContext } from '../../utils/testBase';
import { HomePage } from '../pages/HomePage';
import { PLPPage } from '../pages/PlpPage';
import { BaseHelper } from '../../TripStacc/pages/CommonMethods';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../pages/LoginPage';
import { HomePageLocators } from '../locators/HomePageLocators';
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


test("T001, Verify Price filter is visible in the Filters panel", { tag: ['@PLP', '@Regression'] }, async ({ }) => {

  await test.step("Navigate to the rewards catalog PLP", async () => {
    await page.waitForLoadState('domcontentloaded');
    await HomePage.waitForHeader(page);
    await page.locator(HomePageLocators.productsoption).click();
    await page.waitForLoadState('domcontentloaded');
    console.log("PLP loaded with list of products.");
  });

  await test.step("Open the Filters panel", async () => {
    await PLPPage.openFilterPanel(page);
  });

  await test.step("Verify Filters panel and Price filter are visible", async () => {
    await PLPPage.verifyPriceFilterVisible(page);
  });

});

test("SC_005,Gift Card PDP - Verify details and actions", { tag: ['@BOBCard', '@PLP', '@Regression', '@Sanity'] }, async ({ }) => {

  await test.step("Click Gift Card option", async () => {
    await page.waitForLoadState('domcontentloaded');
    await HomePage.waitForHeader(page);
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