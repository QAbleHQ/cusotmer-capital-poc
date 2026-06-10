import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../../pages/IDFC/LoginPage';
import { MyAccountPage } from '../../pages/IDFC/MyAccountPage';
import { FlightBookingPage } from '../../pages/IDFC/FlightBookingPage';
import { PaymentPage } from '../../pages/IDFC/PaymentPage';
import { HotelHomePage } from '../../pages/IDFC/HotelHomePage';
import { FlightHomePage } from '../../pages/IDFC/FlightHomePage';
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


test('SC_012: Booking Confirmation Page (Confirmed/Pending/Failed)', { tag: ['@IDFC', '@Bookingconfirmation'] }, async () => {
    await test.step("Step 1: Enter City From Airport", async () => {
      await FlightHomePage.clickOnCityFromAirport(page);
      await FlightHomePage.EnterCityFromAirport(page, idfcTestData.flightPage.enterCityFrom);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 2: Verify From Airport Dropdown Visible", async () => {
      await FlightHomePage.VerifyFromAirpotDropdownVisible(page);
      await FlightHomePage.clickOnFirstSearchResultfromCityDropdown(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 3: Enter City To Airport", async () => {
      await FlightHomePage.clickOnToAirport(page);
      await FlightHomePage.EnterCityToAirport(page, idfcTestData.flightPage.enterCityTo);
      await page.waitForTimeout(1000);
    });  
    
    await test.step("Step 4: Verify To Airport Dropdown Visible", async () => {
      await FlightHomePage.VerifyToAirpotDropdownVisible(page);
      await FlightHomePage.clickOnfirstSearchResultToCityDropdown(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 5: Enter date of departure", async () => {
      await FlightHomePage.clickOnDepartureDate(page);
      await FlightHomePage.selectTomorrowDateForDeparture(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 6: Click and verify travellers and cabin class dropdown", async () => {
      await FlightHomePage.clickOntravellersAndCabinClass(page);
      await FlightHomePage.VerifytravellersAndCabinClassDropdownVisible(page);
      await FlightHomePage.clickOntravellersAndCabinClass(page);
      await page.waitForTimeout(3000);
    });
    
    await test.step("Step 7: Click search flights button", async () => {
      await FlightHomePage.clickOnSearchFlightsButton(page);
      await page.waitForTimeout(7000);
    });
    
    await test.step("Step 8: Verify first flight card visible", async () => {
      await FlightHomePage.reloadIfNoRecordFound(page);
      await FlightHomePage.VerifyFirstFlightCardVisible(page);
      await page.waitForTimeout(1000);
    });

    await test.step("Step 9: Click on Next Button On Flight Details Page", async () => {
      await FlightHomePage.clickOnNextButtonOnFlightDetailsPage(page);
      await page.waitForTimeout(1000);
    });

    await test.step("Step 10: Click on Book Button On Flight Details Page", async () => {
      await FlightHomePage.clickOnBookButtonOnFlightDetailsPage(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 11: Click on Continue Button On Flight Details Page", async () => {
      await FlightHomePage.clickOnContinueButtonOnFlightDetailsPage(page);
      await page.waitForTimeout(1000);
    });

    await test.step("Step 12: Click on First Traveller Edit Button On Traveller Details Page", async () => {
      await FlightHomePage.clickOnFirstOptionCheckbox(page);
      await page.waitForTimeout(1000);
    });
     
    await test.step("Step 13: Click on continue button On Traveller Details Page", async () => {
      await FlightHomePage.clickOncontinueButtonOnTravellerPage(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 14: Click on Skip Option", async () => {
      await FlightHomePage.clickOnSkipButton(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 15: Click on Travellers and Addons Continue Button", async () => {
      await FlightHomePage.travellersAndAddonsContinueButton(page);
      await page.waitForTimeout(1000);
    });


    // Insert wait where missing actions:
    await test.step('Step 16: Click Verify Checkout Pay Button displays correct amount', async () => {
      await HotelBookingPage.payButtonAfterDiscount(page);
      await page.waitForTimeout(1000);
    });

    await test.step('Step 17: Card Options visible and click selector', async () => {
      await PaymentPage.verifyCardOptions(page);
      await page.waitForTimeout(1000);
      await PaymentPage.clickCardOptionSelector(page);
      await page.waitForTimeout(1000);
      await PaymentPage.verifyCardFieldsVisible(page);
      await page.waitForTimeout(1000);
    });

    await test.step('Step 18: Fill Card Details', async () => {
      await PaymentPage.fillCardNumber(page);
      await page.waitForTimeout(1000);
      await PaymentPage.fillCardExpiry(page);
      await page.waitForTimeout(1000);
      await PaymentPage.fillCardCvv(page);
      await page.waitForTimeout(1000);
      await PaymentPage.fillCardName(page);
      await page.waitForTimeout(1000);
    });

    await test.step('Step 19: Proceed and handle Save Card Popup', async () => {
      await PaymentPage.clickProceedButton(page);
      await page.waitForTimeout(1000);
      await PaymentPage.clickCloseWithoutSaveButton(page);
      await page.waitForTimeout(1000);
      await PaymentPage.verifyOtpPageVisibleandFillValue(page);
      await page.waitForTimeout(1000);
      await PaymentPage.clickSubmitButton(page);
      await page.waitForTimeout(1000);
    });
  await test.step('Step 20: Verify Booking Confirmation Page is visible', async () => {
    await PaymentPage.verifyBookingConfirmationPageVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 21: Verify Confirmed Voucher is visible', async () => {
    await FlightBookingPage.verifyConfirmedVoucherVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 22: Verify Booking ID is visible', async () => {
    await FlightBookingPage.verifyBookingIdVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 23: Verify Booking Date is visible', async () => {
    await FlightBookingPage.verifyBookingDateVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 24: Verify Flight Details are visible', async () => {
    await FlightBookingPage.verifyFlightDetailsVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 25: Verify Hotel Details are visible', async () => {
    await FlightBookingPage.verifyHotelDetailsVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 26: Verify Fare Summary Section is visible', async () => {
    await FlightBookingPage.verifyFareSummaryVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 27: Verify Top Hotels Section is visible', async () => {
    await FlightBookingPage.verifyTopHotelsSectionVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 28: Verify Top Hotel Cards are visible', async () => {
    await FlightBookingPage.verifyTopHotelCardsVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 29: Verify Hotel Redirect Link is visible', async () => {
    await FlightBookingPage.verifyHotelRedirectLinkVisible(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 30: Expand Flight Details', async () => {
    await FlightBookingPage.expandFlightDetails(page);
    await page.waitForTimeout(1000);
  });

  await test.step('Step 31: Expand Fare Summary', async () => {
    await FlightBookingPage.expandFareSummary(page);
    await page.waitForTimeout(1000);
  });

  });