import { test, Page, BrowserContext } from '@playwright/test';
import { HotelHomePage } from '../pages/HotelHomePage';
import { HotelBookingPage } from '../pages/HotelBookingPage';
import { PaymentPage } from '../pages/PaymentPage';
const idfcTestData = require('../../testdata/tripStacc.json');
import { BaseHelper } from '../pages/CommonMethods';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await BaseHelper.launchAndLogin(page);
});


test.afterEach(async () => {
  await page.close();
  await context.close();
});

test('SC_009: Checkout with and without Redeem Points (without redeem it should be an earning)', { tag: ['@IDFC','@BOB', '@Checkout', '@Smoke', '@Regression'] }, async () => {
  await test.step('Step 1: Open Hotels Section', async () => {
    await page.waitForTimeout(5000);
    await HotelHomePage.clickHotelTabBTN(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 2: Enter Domestic Hotel Location', async () => {
    await HotelHomePage.searchValueInTestBox(page, idfcTestData.hotelPage.domestic);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 3: Choose First Domestic Hotel Option', async () => {
    await HotelHomePage.selectFirstOptionFromDropdown(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 4: Set Check-in and Check-out Dates', async () => {
    await HotelHomePage.clickDateButton(page);
    await page.waitForTimeout(5000);
    await HotelHomePage.selectMonthAndDateFROM(page, idfcTestData.dateSelector.fromMonth, idfcTestData.dateSelector.fromDate);
    await page.waitForTimeout(5000);
    await HotelHomePage.selectMonthAndDateTO(page, idfcTestData.dateSelector.toMonth, idfcTestData.dateSelector.toDate);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 5: Search for Hotels (Single Room Default)', async () => {
    await HotelHomePage.clickSearchHotelButton(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 6: Search Hotel Name in Search Box', async () => {
    await HotelBookingPage.searchHotelNameInTestBox(page, idfcTestData.hotelPage.searcHotelName);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 7: Click the first hotel result', async () => {
    await HotelHomePage.clickFirstResult(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 8: Click the First Room Selection Button', async () => {
    await HotelBookingPage.clickFirstRoomSelectionButton(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 9: Click Next button on first tab', async () => {
    await HotelBookingPage.firstTabNextButton(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 10: Click Add Guest button on Primary Guest Details section', async () => {
    await HotelBookingPage.clickAddGuestButton(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 11: Verify and count the saved guest list also click first option', async () => {
    await HotelBookingPage.clickFirstOptionFromsavedGuestList(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.verifyAndCountSavedGuestList(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.clickFirstOptionFromsavedGuestList(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 12: Click Add and Next button after selecting guest', async () => {
    await HotelBookingPage.addButtonAfterAddingGuest(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.nextButtonAfterAddingGuest(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 13: Redeem Point Toggle Button', async () => {
    await HotelBookingPage.redeampointTogglebutton(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 14: Enter redeem points and click Save button', async () => {
    await HotelBookingPage.redeamPointInputField(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.savebuttonAfterRedeemEnter(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.editIconButtonForRedeem(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.savebuttonAfterRedeemEnter(page);
    await page.waitForTimeout(5000);
  });

  await test.step('Step 15: Verify discount calculation via HotelBookingPage method', async () => {
    await HotelBookingPage.verifyDiscountCalculation(page);
    await page.waitForTimeout(5000);
  });
  await test.step('Step 16: Click Verify Checkout Pay Button displays correct amount', async () => {
    await HotelBookingPage.clickCheckboxAfterRedeam(page);
    await page.waitForTimeout(5000);
    await HotelBookingPage.payButtonAfterDiscount(page);
    await page.waitForTimeout(5000);
    // await HotelBookingPage.getCheckoutPayButtonText(page);
    // await HotelBookingPage.verifyCheckoutPayButtonAmount(page);
    // await page.waitForTimeout(5000);
  });

  await test.step('Step 17: Click Back icon on Checkout/Payment page and confirm', async () => {
    await PaymentPage.clickBackIconButton(page);
    await page.waitForTimeout(2000);
    await PaymentPage.clickConfirmBackButton(page);
    await page.waitForTimeout(3000);
  });
});

test('SC_011: Proceed with payment', { tag: ['@IDFC','@BOB', '@Payment', '@Regression'] }, async () => {
  await test.step('Step 1: Open Hotels Section', async () => {
    await page.waitForTimeout(5000);
    // await HotelHomePage.clickHotelTabBTN(page);
    await page.waitForTimeout(5000);
  });

  // await test.step('Step 2: Enter Domestic Hotel Location', async () => {
  //   await HotelHomePage.searchValueInTestBox(page, idfcTestData.hotelPage.domestic);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 3: Choose First Domestic Hotel Option', async () => {
  //   await HotelHomePage.selectFirstOptionFromDropdown(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 4: Set Check-in and Check-out Dates', async () => {
  //   await HotelHomePage.clickDateButton(page);
  //   await page.waitForTimeout(5000);
  //   await HotelHomePage.selectMonthAndDateFROM(page, idfcTestData.dateSelector.fromMonth, idfcTestData.dateSelector.fromDate);
  //   await page.waitForTimeout(5000);
  //   await HotelHomePage.selectMonthAndDateTO(page, idfcTestData.dateSelector.toMonth, idfcTestData.dateSelector.toDate);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 5: Search for Hotels (Single Room Default)', async () => {
  //   await HotelHomePage.clickSearchHotelButton(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 6: Search Hotel Name in Search Box', async () => {
  //   await HotelBookingPage.searchHotelNameInTestBox(page, idfcTestData.hotelPage.searcHotelName);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 7: Click the first hotel result', async () => {
  //   await HotelHomePage.clickFirstResult(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 8: Click the First Room Selection Button', async () => {
  //   await HotelBookingPage.clickFirstRoomSelectionButton(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 9: Click Next button on first tab', async () => {
  //   await HotelBookingPage.firstTabNextButton(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 10: Click Add Guest button on Primary Guest Details section', async () => {
  //   await HotelBookingPage.clickAddGuestButton(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 11: Verify and count the saved guest list also click first option', async () => {
  //   await HotelBookingPage.clickFirstOptionFromsavedGuestList(page);
  //   await page.waitForTimeout(5000);
  //   await HotelBookingPage.verifyAndCountSavedGuestList(page);
  //   await page.waitForTimeout(5000);
  //   await HotelBookingPage.clickFirstOptionFromsavedGuestList(page);
  //   await page.waitForTimeout(5000);
  // });

  // await test.step('Step 12: Click Add and Next button after selecting guest', async () => {
  //   await HotelBookingPage.addButtonAfterAddingGuest(page);
  //   await page.waitForTimeout(5000);
  //   await HotelBookingPage.nextButtonAfterAddingGuest(page);
  //   await page.waitForTimeout(5000);
  // });
  // await test.step('Step 16: Click Verify Checkout Pay Button displays correct amount', async () => {
  //   await HotelBookingPage.payButtonAfterDiscount(page);
  //   await page.waitForTimeout(5000);
  // });

    await test.step('Step 17: Card Options visible and click selector', async () => {
      await page.pause();
      await PaymentPage.completeCardPaymentFlow(page);
    });

});