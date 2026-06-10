import { expect, Page } from '@playwright/test';
import { ElementHelper } from '../../utils/elementHelper';
import { MyAccountPageLocators } from '../../locators/idfc/MyAccountPageLocators';

export class MyAccountPage {

  // ---------------------------------------------------------------------------
  // Home page – my account navigation
  // ---------------------------------------------------------------------------
  static async clickMyAccount(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.myAccountProfile);
  }

  static async clickMyAccountSection(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.myAccountSection);
  }

  static async verifyMyBookingSectionVisible(page: Page): Promise<void> {
    await expect(page.locator(MyAccountPageLocators.myBookingSection)).toBeVisible();
  }

  static async clickMyBookingSection(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.myBookingSection);
    await page.waitForTimeout(6000);
  }

  // ---------------------------------------------------------------------------
  // My bookings page – flight booking tabs
  // ---------------------------------------------------------------------------
  static async clickFlightsUpcomingTab(page: Page): Promise<void> {
    await page.waitForTimeout(6000);
    await ElementHelper.clickElement(page, MyAccountPageLocators.flightsUpcomingTab);
  }

  static async clickFlightsCancelledTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.flightsCancelledTab);
  }

  static async verifyFlightsCompletedTabVisible(page: Page): Promise<void> {
    await expect(page.locator(MyAccountPageLocators.flightsCompletedTab)).toBeVisible();
  }

  // ---------------------------------------------------------------------------
  // My bookings page – booking card details (read & print)
  // ---------------------------------------------------------------------------
  static async printFromToText(page: Page): Promise<void> {
    console.log('From/To:', await page.textContent(MyAccountPageLocators.fromToText));
  }

  static async printBookingId(page: Page): Promise<void> {
    console.log('Booking ID:', await page.textContent(MyAccountPageLocators.bookingIdText));
  }

  static async printJourneyDate(page: Page): Promise<void> {
    console.log('Journey Date:', await page.textContent(MyAccountPageLocators.journeyDateText));
  }

  static async printTripType(page: Page): Promise<void> {
    console.log('Trip Type:', await page.textContent(MyAccountPageLocators.tripTypeText));
  }

  static async printPassengerName(page: Page): Promise<void> {
    console.log('Passenger:', await page.textContent(MyAccountPageLocators.passengerNameText));
  }

  static async printBookingDate(page: Page): Promise<void> {
    console.log('Booking Date:', await page.textContent(MyAccountPageLocators.bookingDateText));
  }

  static async printAmount(page: Page): Promise<void> {
    console.log('Amount:', await page.textContent(MyAccountPageLocators.amountText));
  }

  // ---------------------------------------------------------------------------
  // My bookings page – booking card actions (by status)
  // ---------------------------------------------------------------------------
  static async verifyButtonsBasedOnStatus(page: Page): Promise<void> {
    const status = (await page.textContent(MyAccountPageLocators.statusText))?.trim() ?? '';
    console.log(`📌 Booking Status: ${status}`);

    if (status.includes('Confirmed')) {
      console.log('✅ Status is Confirmed - Verifying View, Cancel, and Modify buttons');

      await expect(page.locator(MyAccountPageLocators.viewButton)).toBeVisible();
      console.log('✔️ View button is visible');

      await expect(page.locator(MyAccountPageLocators.cancelButton)).toBeVisible();
      console.log('✔️ Cancel button is visible');

      await expect(page.locator(MyAccountPageLocators.modifyButton)).toBeVisible();
      console.log('✔️ Modify button is visible');
    } else {
      console.log(`⏳ Status is '${status}' - Verifying Pending Booking View button`);

      await expect(
        page.locator(MyAccountPageLocators.bookingpendingviewButton).first()
      ).toBeVisible();

      console.log('✔️ Pending Booking View button is visible');
    }

    console.log('🎉 Button verification completed successfully');
  }

  // ---------------------------------------------------------------------------
  // NOT USED METHODS
  // ---------------------------------------------------------------------------
  static async clickFlightsCompletedTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.flightsCompletedTab);
  }

  static async clickHotelTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.hotelTab);
  }

  static async clickHotelsUpcomingTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.hotelsUpcomingTab);
  }

  static async clickHotelsCompletedTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.hotelsCompletedTab);
  }

  static async clickHotelsCancelledTab(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyAccountPageLocators.hotelsCancelledTab);
  }

  static async printStatusText(page: Page): Promise<string | undefined> {
    const status = await page.textContent(MyAccountPageLocators.statusText);
    console.log(`Status: ${status}`);
    return status?.trim();
  }
}
