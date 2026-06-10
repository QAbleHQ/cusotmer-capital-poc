import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../../pages/IDFC/LoginPage';
import { MyAccountPage } from '../../pages/IDFC/MyAccountPage';
import { FlightBookingPage } from '../../pages/IDFC/FlightBookingPage';
import { PaymentPage } from '../../pages/IDFC/PaymentPage';
import { HotelHomePage } from '../../pages/IDFC/HotelHomePage';
import { HotelBookingPage } from '../../pages/IDFC/HotelBookingPage';
const idfcTestData = require('../../testdata/idfctestdata.json');
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
  await LoginPage.loginWithValidCredentials(page);
});
 
test('SC_012: Booking Confirmation Page (Confirmed/Pending/Failed)', { tag: ['@IDFC', '@Payment'] }, async () => {
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

  // Insert wait where missing actions:
  await test.step('Step 16: Click Verify Checkout Pay Button displays correct amount', async () => {
    await HotelBookingPage.payButtonAfterDiscount(page);
    await page.waitForTimeout(5000);
  });

    await test.step('Step 17: Card Options visible and click selector', async () => {
      await PaymentPage.verifyCardOptions(page);
      await page.waitForTimeout(5000);
      await PaymentPage.clickCardOptionSelector(page);
      await page.waitForTimeout(5000);
      await PaymentPage.verifyCardFieldsVisible(page);
      await page.waitForTimeout(5000);
    });

    await test.step('Step 18: Fill Card Details', async () => {
      await PaymentPage.fillCardNumber(page);
      await page.waitForTimeout(5000);
      await PaymentPage.fillCardExpiry(page);
      await page.waitForTimeout(5000);
      await PaymentPage.fillCardCvv(page);
      await page.waitForTimeout(5000);
      await PaymentPage.fillCardName(page);
      await page.waitForTimeout(5000);
    });

    await test.step('Step 19: Proceed and handle Save Card Popup', async () => {
      await PaymentPage.verifySaveCardPopupVisible(page);
      await page.waitForTimeout(5000);
      await PaymentPage.clickProceedButton(page);
      await page.waitForTimeout(5000);
      await PaymentPage.clickCloseWithoutSaveButton(page);
      await page.waitForTimeout(5000);
      await PaymentPage.verifyOtpPageVisibleandFillValue(page);
      await page.waitForTimeout(5000);
      await PaymentPage.clickSubmitButton(page);
      await page.waitForTimeout(5000);

    });

 
  await test.step('Step 1: Verify Booking Confirmation Page is visible', async () => {
    await FlightBookingPage.verifyBookingConfirmationPageVisible(page);
  });

  await test.step('Step 2: Verify Confirmed Voucher is visible', async () => {
    await FlightBookingPage.verifyConfirmedVoucherVisible(page);
  });

  await test.step('Step 3: Verify Booking ID is visible', async () => {
    await FlightBookingPage.verifyBookingIdVisible(page);
  });

  await test.step('Step 4: Verify Booking Date is visible', async () => {
    await FlightBookingPage.verifyBookingDateVisible(page);
  });

  await test.step('Step 5: Verify Flight Details are visible', async () => {
    await FlightBookingPage.verifyFlightDetailsVisible(page);
  });

  await test.step('Step 6: Verify Hotel Details are visible', async () => {
    await FlightBookingPage.verifyHotelDetailsVisible(page);
  });

  await test.step('Step 7: Verify Fare Summary Section is visible', async () => {
    await FlightBookingPage.verifyFareSummaryVisible(page);
  });

  await test.step('Step 8: Verify Top Hotels Section is visible', async () => {
    await FlightBookingPage.verifyTopHotelsSectionVisible(page);
  });

  await test.step('Step 9: Verify Top Hotel Cards are visible', async () => {
    await FlightBookingPage.verifyTopHotelCardsVisible(page);
  });

  await test.step('Step 10: Verify Hotel Redirect Link is visible', async () => {
    await FlightBookingPage.verifyHotelRedirectLinkVisible(page);
  });

  await test.step('Step 11: Expand Flight Details', async () => {
    await FlightBookingPage.expandFlightDetails(page);
  });

  await test.step('Step 12: Expand Fare Summary', async () => {
    await FlightBookingPage.expandFareSummary(page);
  });

});

test('SC:013: Booking Status on My Account Section', { tag: ['@IDFC', '@Myaccount'] }, async () => {
  await test.step('Step 1: Click My Account', async () => {
    await page.waitForTimeout(6000);
    await MyAccountPage.clickMyAccount(page);
  });

  await test.step('Step 2: Click My Account Section', async () => {
    await page.waitForTimeout(6000);
    await MyAccountPage.clickMyAccountSection(page);
  });

  await test.step('Step 3: Verify My Booking Section is visible', async () => {
    await MyAccountPage.verifyMyBookingSectionVisible(page);
  });

  await test.step('Step 4: Click My Booking Section', async () => {
    await MyAccountPage.clickMyBookingSection(page);
  });

  await test.step('Step 5: Click Flights Upcoming Tab', async () => {
    await MyAccountPage.clickFlightsUpcomingTab(page);
  });

  await test.step('Step 6: Click Flights Cancelled Tab', async () => {
    await MyAccountPage.clickFlightsCancelledTab(page);
  });

  await test.step('Step 7: Verify Flights Completed Tab is visible', async () => {
    await MyAccountPage.verifyFlightsCompletedTabVisible(page);
  });

  await test.step('Step 8: Print From/To Text', async () => {
    await MyAccountPage.printFromToText(page);
  });

  await test.step('Step 9: Print Booking ID', async () => {
    await MyAccountPage.printBookingId(page);
  });

  await test.step('Step 10: Print Journey Date', async () => {
    await MyAccountPage.printJourneyDate(page);
  });

  await test.step('Step 11: Print Trip Type', async () => {
    await MyAccountPage.printTripType(page);
  });

  await test.step('Step 12: Print Passenger Name', async () => {
    await MyAccountPage.printPassengerName(page);
  });

  await test.step('Step 13: Print Booking Date', async () => {
    await MyAccountPage.printBookingDate(page);
  });

  await test.step('Step 14: Print Amount', async () => {
    await MyAccountPage.printAmount(page);
  });

  await test.step('Step 15: Verify Buttons Based on Status', async () => {
    await MyAccountPage.verifyButtonsBasedOnStatus(page);
  });
});