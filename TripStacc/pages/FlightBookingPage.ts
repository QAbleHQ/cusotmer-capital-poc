import { expect, Page } from '@playwright/test';
import { ElementHelper } from '../../utils/elementHelper';
import { FlightPageLocators } from '../../TripStacc/locators/FlightPageLocators';
import { PaymentPage } from './PaymentPage';
const idfcTestData = require('../../testdata/tripStacc.json');


export class FlightBookingPage {

  static async verifyBookingConfirmationPageVisible(page: Page) {
    const bookingStatus = FlightPageLocators.bookingStatus;
  
    await ElementHelper.waitForElementVisible(page, bookingStatus);
    console.log("Booking confirmation page is visible.");
  }

  static async verifyBookingPendingPageVisible(page: Page) {
    const bookingStatus = FlightPageLocators.bookingStatus;
  
    await ElementHelper.waitForElementVisible(page, bookingStatus);
    console.log("Booking confirmation page is visible.");
  }
  
  static async verifyConfirmedVoucherVisible(page: Page) {
    const confirmedVoucher = FlightPageLocators.confirmedVoucher;
  
    await ElementHelper.waitForElementVisible(page, confirmedVoucher);
    console.log("Confirmed voucher is visible.");
  }
  
  static async verifyBookingIdVisible(page: Page) {
    const bookingId = FlightPageLocators.bookingId;
  
    await ElementHelper.waitForElementVisible(page, bookingId);
    console.log("Booking ID is visible.");
  }
  
  static async verifyBookingDateVisible(page: Page) {
    const bookingDate = FlightPageLocators.bookingDate;
  
    await ElementHelper.waitForElementVisible(page, bookingDate);
    console.log("Booking date is visible.");
  }
  
  static async verifyFlightDetailsVisible(page: Page) {
    const flightDropdown = FlightPageLocators.flightDropdown;
    const flightName = FlightPageLocators.flightName;
    const departureCity = FlightPageLocators.departureCity;
    const arrivalCity = FlightPageLocators.arrivalCity;
    const departureTime = FlightPageLocators.departureTime;
    const arrivalTime = FlightPageLocators.arrivalTime;
  
    await ElementHelper.clickElement(page, flightDropdown);
  
    await ElementHelper.waitForElementVisible(page, flightName);
    await ElementHelper.waitForElementVisible(page, departureCity);
    await ElementHelper.waitForElementVisible(page, arrivalCity);
    await ElementHelper.waitForElementVisible(page, departureTime);
    await ElementHelper.waitForElementVisible(page, arrivalTime);
  
    console.log("Flight details are visible.");
  }
  
  static async verifyHotelDetailsVisible(page: Page) {
    const hotelName = FlightPageLocators.hotelName;
    const hotelAddress = FlightPageLocators.hotelAddress;
  
    await ElementHelper.waitForElementVisible(page, hotelName);
    await ElementHelper.waitForElementVisible(page, hotelAddress);
  
    console.log("Hotel details are visible.");
  }
  static async verifyBookingOutcome(page: Page) {
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

    console.log('Booking Confirmation page is displayed');

  } else if (isPendingVisible) {
    await FlightBookingPage.verifyBookingIdVisible(page);
    console.log('Booking Pending is displayed instead of Booking Confirmation');

  } else {
    throw new Error('Seems like Payment has failed');
  }
}
  static async verifyFareSummaryVisible(page: Page) {
    const fareSummaryDropdown = FlightPageLocators.fareSummaryDropdown;
    const fareSummarySection = FlightPageLocators.fareSummarySection;
  
    await ElementHelper.clickElement(page, fareSummaryDropdown);
    await ElementHelper.waitForElementVisible(page, fareSummarySection);
  
    console.log("Fare summary section is visible.");
  }
  
  static async verifyTopHotelsSectionVisible(page: Page) {
    const topHotelsSection = FlightPageLocators.topHotelsSection;
  
    await ElementHelper.waitForElementVisible(page, topHotelsSection);
    console.log("Top Hotels section is visible.");
  }
  
  static async verifyTopHotelCardsVisible(page: Page) {
    const topHotelCards = FlightPageLocators.topHotelCards;
  
    await ElementHelper.waitForElementVisible(page, topHotelCards);
    console.log("Top Hotel cards are visible.");
  }
  
  static async verifyHotelRedirectLinkVisible(page: Page) {
    const hotelRedirectLink = FlightPageLocators.hotelRedirectLink;
  
    await ElementHelper.waitForElementVisible(page, hotelRedirectLink);
    console.log("Hotel redirection link is visible.");
  }
  
  static async expandFlightDetails(page: Page) {
    const flightDropdown = FlightPageLocators.flightDropdown;
  
    await ElementHelper.clickElement(page, flightDropdown);
    console.log("Flight details dropdown expanded.");
  }
  
  static async expandFareSummary(page: Page) {
    const fareSummaryDropdown = FlightPageLocators.fareSummaryDropdown;
  
    await ElementHelper.clickElement(page, fareSummaryDropdown);
    console.log("Fare summary dropdown expanded.");
  
  }
}

