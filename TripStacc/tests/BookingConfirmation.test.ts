import { test, Page, BrowserContext } from '@playwright/test';
import { FlightBookingPage } from '../pages/FlightBookingPage';
import { PaymentPage } from '../pages/PaymentPage';
import { FlightHomePage } from '../pages/FlightHomePage';
import { HotelBookingPage } from '../pages/HotelBookingPage';
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

test('SC_012: Booking Confirmation Page (Confirmed/Pending/Failed)', { tag: ['@SC_012','@IDFC','@BOB', '@Bookingconfirmation', '@Regression'] }, async () => {
    await test.step("Step 1: Enter City From Airport", async () => {
      await page.waitForTimeout(8000);
      await FlightHomePage.clickOnCityFromAirport(page);
      await page.waitForTimeout(8000);
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
      await FlightHomePage.clickOnCloseTravellersAndCabinClassDropdown(page);
      await page.waitForTimeout(3000);
    });
    
    await test.step("Step 7: Click search flights button", async () => {
      await FlightHomePage.clickOnSearchFlightsButton(page);
      await page.waitForTimeout(7000);
    });
    
    await test.step("Step 8: Verify first flight card visible", async () => {
      // await FlightHomePage.reloadIfNoRecordFound(page);
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
      await page.waitForTimeout(5000); 
      await FlightHomePage.clickOncontinueButtonOnTravellerPage(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 14: Click on Skip Option", async () => {
      await page.waitForTimeout(5000); 
      await FlightHomePage.clickOnSkipButton(page);
      await page.waitForTimeout(1000);
    });
    
    await test.step("Step 15: Click on Travellers and Addons Continue Button", async () => {
      await page.waitForTimeout(5000); 
      await FlightHomePage.travellersAndAddonsContinueButton(page);
      await page.waitForTimeout(1000);
    });

    await test.step('Step 16: Click Verify Checkout Pay Button displays correct amount', async () => {
      await page.waitForTimeout(5000); 
      await HotelBookingPage.payButtonAfterDiscount(page);
      await page.waitForTimeout(3000);
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
      await page.waitForTimeout(10000);
    });
  
  await test.step('Verify after payment page content on booking confirmation', async () => {

    await page.waitForTimeout(8000);
    const isConfirmationVisible = await PaymentPage.verifyBookingConfirmationPageVisible(page);    
    const isPendingVisible = await PaymentPage.verifyBookingPendingPageVisible(page);
  
  
    if (isConfirmationVisible) {
  
      await FlightBookingPage.verifyBookingIdVisible(page);
      await FlightBookingPage.verifyBookingDateVisible(page);
      await FlightBookingPage.verifyFlightDetailsVisible(page);
      await FlightBookingPage.verifyHotelDetailsVisible(page);
      await FlightBookingPage.verifyFareSummaryVisible(page);
      await FlightBookingPage.verifyTopHotelsSectionVisible(page);
      await FlightBookingPage.verifyTopHotelCardsVisible(page);
      await FlightBookingPage.verifyHotelRedirectLinkVisible(page);
      await FlightBookingPage.expandFlightDetails(page);
      await FlightBookingPage.expandFareSummary(page);
  
    } else if (isPendingVisible) {
        await FlightBookingPage.verifyBookingIdVisible(page);
        console.log('Booking Pending Is Displayed instead of Booking Confirmation')
    } else {
        throw new Error(
          'Seems like Payment has failed'
        );
      }
    });
  
  });