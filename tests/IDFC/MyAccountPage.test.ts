import { test, Page, BrowserContext } from '@playwright/test';
import { MyAccountPage } from '../../pages/IDFC/MyAccountPage';
import { BaseHelper } from '../../pages/Common/CommonMethods';
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await BaseHelper.launchAndLogin(page);
});

 

test('SC:013: Booking Status on My Account Section', { tag: ['@IDFC', '@Myaccount', '@Sanity', '@Regression'] }, async () => {
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