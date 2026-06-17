import { expect, Page } from '@playwright/test';
import { FlightPageLocators } from '../../TripStacc/locators/FlightPageLocators';
import { VerificationHelpers } from '../../utils/verificationHelper';
import { ElementHelper } from '../../utils/elementHelper';
import { CommonHelper } from '../../utils/commonHelper';
import { DeviceHelper } from '../../utils/deviceHelper';

export class FlightHomePage {
  static async clickOnRoundTripOption(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.roundtripbox);
  }
  static async clickOnCityFromAirport(page: any) {
    await page.waitForTimeout(10000);
    if(DeviceHelper.isMobile()){
      await page.waitForTimeout(5000);
      await ElementHelper.clickElement(page, FlightPageLocators.fromCityMobile);
      await ElementHelper.clickElement(page, FlightPageLocators.fromCitySearchMobile);
    } else {
      await page.waitForTimeout(5000);
      await ElementHelper.clickElement(page, FlightPageLocators.fromCity);
    }
  }

  static async clickOnToAirport(page: any) {
    if(DeviceHelper.isMobile()){
      await ElementHelper.clickElement(page, FlightPageLocators.toCitySearchMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.toCity);
    }
  }

  static async EnterCityFromAirport(page: any, data: any) {
    if(DeviceHelper.isMobile()){
      await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.fromCitySearchMobile, data);
    } else {
      await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.fromCity, data);
    }
  }

  static async EnterCityToAirport(page: any, data: any) {
    if(DeviceHelper.isMobile()){
      await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.toCitySearchMobile, data);
    } else {
      await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.toCity, data);
    }
  }

  static async VerifyFromAirpotDropdownVisible(page: any) {
    if(DeviceHelper.isMobile()) {
      await page.waitForTimeout(1000);
      await ElementHelper.waitForElementVisible(page, FlightPageLocators.cityDropDownMobile);
      await VerificationHelpers.elementIsVisible(page, FlightPageLocators.cityDropDownMobile);
    } else {
      await ElementHelper.waitForElementVisible(page, FlightPageLocators.fromCityDropdown);
      await VerificationHelpers.elementIsVisible(page, FlightPageLocators.fromCityDropdown);
    }
  }

  static async VerifyToAirpotDropdownVisible(page: any) {
    if(DeviceHelper.isMobile()) {
      await ElementHelper.waitForElementVisible(page, FlightPageLocators.firstSearchResultCityDropDownMobile);
      await VerificationHelpers.elementIsVisible(page, FlightPageLocators.firstSearchResultCityDropDownMobile);
    } else {
      await ElementHelper.waitForElementVisible(page, FlightPageLocators.toCityDropdown);
      await VerificationHelpers.elementIsVisible(page, FlightPageLocators.toCityDropdown);
    }
  }

  static async clickOnFirstSearchResultfromCityDropdown(page: any) {
    if(DeviceHelper.isMobile()) {
      await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResultCityDropDownMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResultfromCityDropdown);
    }
  }

  static async clickOnfirstSearchResultToCityDropdown(page: any) {
    if(DeviceHelper.isMobile()) {
      await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResultCityDropDownMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResulttoCityDropdown);
    }
  }

  static async clickOnDepartureDate(page: any) {
    if(DeviceHelper.isMobile()) {
      await ElementHelper.waitForElementVisible(page, FlightPageLocators.departureDateMobile);
      await ElementHelper.clickElement(page, FlightPageLocators.departureDateMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.departureDate);
    }
  }

  static async clickOnReturnDate(page: any) {
    if(DeviceHelper.isMobile()) {
      await ElementHelper.clickElement(page, FlightPageLocators.returnDateMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.returnDate);
    }
  }

  static async selectTomorrowDateForDeparture(page: any) {
    if(DeviceHelper.isMobile()) {
      const depDate = new Date();
      depDate.setDate(depDate.getDate() + 2);
      const depFormatted = depDate.toISOString().split('T')[0];

      await ElementHelper.clickElement(page, FlightPageLocators.dateCellMobile(depFormatted));
      await page.waitForTimeout(10000);

      const retDate = new Date();
      retDate.setDate(retDate.getDate() + 5);
      const retFormatted = retDate.toISOString().split('T')[0];

      await ElementHelper.clickElement(page, FlightPageLocators.dateCellMobile(retFormatted));
      await page.waitForTimeout(2000);
      
      await ElementHelper.clickElement(page, FlightPageLocators.doneCalendarButtonMobile);

    } else {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 2);
      const formattedDate = targetDate.toISOString().split('T')[0];

      const targetDay = targetDate.getDate().toString();
      const targetMonth = targetDate.toLocaleString('en-US', { month: 'long' });
      const targetYear = targetDate.getFullYear().toString();

      const currentMonth = await page.locator(FlightPageLocators.currentMonth).textContent();
      const currentYear = await page.locator(FlightPageLocators.currentYear).textContent();

      if (
        currentMonth?.trim() !== targetMonth || currentYear?.trim() !== targetYear
      ) {
        await page.locator(FlightPageLocators.nextMonthButton).click();
      }

      await page.locator(FlightPageLocators.dateCell(targetDay)).click();
    }
  }

  static async select2dayDateForReturn(page: any) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 20);
    const formattedDate = targetDate.toISOString().split('T')[0];
    if(DeviceHelper.isMobile()) {
      const mobileLocator = FlightPageLocators.dateCellMobile(formattedDate);
      await page.waitForTimeout(5000);
      await ElementHelper.clickElement(page, mobileLocator);
      await page.waitForTimeout(2000);

      await ElementHelper.clickElement(page, FlightPageLocators.doneCalendarButtonMobile);

    } else {
      const targetDay = targetDate.getDate().toString();
      const targetMonth = targetDate.toLocaleString('en-US', { month: 'long' });
      const targetYear = targetDate.getFullYear().toString();

      const currentMonth = await page.locator(FlightPageLocators.currentMonth).textContent();
      const currentYear = await page.locator(FlightPageLocators.currentYear).textContent();

      if (
        currentMonth?.trim() !== targetMonth || currentYear?.trim() !== targetYear
      ) {
        await page.locator(FlightPageLocators.nextMonthButton).click();
      }

      await page.locator(FlightPageLocators.dateCell(targetDay)).click();
    }
  }

  static async VerifyOneWayRoundTripCalendarVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
  }

  static async clickOntravellersAndCabinClass(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersAndCabinClass);
  }

  static async VerifytravellersAndCabinClassDropdownVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.roomCountDropdown);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.roomCountDropdown);
  }

  static async clickOnCloseTravellersAndCabinClassDropdown(page: any) {
    if(DeviceHelper.isMobile()) {
      await page.waitForTimeout(5000);
      await ElementHelper.clickElement(page, FlightPageLocators.closeTravellerAndCabinButtonMobile);
    }
  }

  static async clickOnAdultPlusButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersAdultPlusButton);
  }

  static async clickOnChildPlusButton(page: any) {
    await ElementHelper.doubleClickElement(page, FlightPageLocators.travellersChildrenPlusButton);
  }

  static async clickOnInfantPlusButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersInfantPlusButton);
  }

  static async clickOnApplyButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersApplyButton);
  }

  static selectedTravelClass: string;

  static async getTravelClass(page: Page): Promise<void> {
    const travelClass = await page.locator(FlightPageLocators.travelClassText).textContent();
    FlightHomePage.selectedTravelClass = travelClass?.trim() || '';
    console.log(`Selected Class: ${FlightHomePage.selectedTravelClass}`);
  }

  static async verifyTravelClass(page: Page): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.travelsummaryCount).textContent();
    console.log(`Result Page Text: ${summaryText}`);
    expect(summaryText).toContain(FlightHomePage.selectedTravelClass);
    console.log(`Verified Class: ${FlightHomePage.selectedTravelClass}`);
  }

  static async clickOnPremiumClassButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travelClassPremiumEconomyOption);
  }

  static async getTravellerCount(page: Page): Promise<string> {
    const count = await page.locator(FlightPageLocators.travellerCount).textContent();
    return count?.trim() || '';
  }

  static async verifyTravellerCount(page: Page, expectedTravellerCount: string): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.travelsummaryCount).textContent();
    const actualTravellerCount = summaryText?.match(/\d+(?=\s*Traveller)/i)?.[0];
    console.log(`Expected Count: ${expectedTravellerCount}`);
    console.log(`Actual Count: ${actualTravellerCount}`);
    expect(actualTravellerCount).toBe(expectedTravellerCount);
  }

  static async scrolltoViewTravelAdvisory(page: any) {
    if(await ElementHelper.isElementDisplayed(page, FlightPageLocators.travelAdvisoryText)) {
    await ElementHelper.scrollToElement(page, FlightPageLocators.travelAdvisoryText);
    }
  }
  static async clickOnSearchFlightsButton(page: any) {
    await ElementHelper.scrollToElement(page, FlightPageLocators.searchFlightsButton);
    await ElementHelper.clickElement(page, FlightPageLocators.searchFlightsButton);
    await page.waitForTimeout(15000);
  }
  static async VerifyFirstFlightCardVisible(page: any) {
    await FlightHomePage.reloadIfNoRecordFound(page);
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.firstFlightCard);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.firstFlightCard);
  }

  static async printFlightRoutes(page: Page) {
    const cards = page.locator(FlightPageLocators.FlightRoundTripDetailsBox);
    const count = await cards.count();

    console.log(`Total Flight Route Boxes: ${count}`);

    for (let i = 0; i < count; i++) {
      const text = await cards.nth(i).textContent();
      console.log(`Box ${i + 1}: ${text?.trim()}`);
    }
  }
  static async clickOnFilterListButton(page: any) {
    await page.waitForTimeout(5000);
    if (DeviceHelper.isMobile()) {
      await ElementHelper.clickElement(page, FlightPageLocators.filterIconMobile);
    } else {
      await ElementHelper.clickElement(page, FlightPageLocators.flightListFilterButton);
    }
    
  }

  static async clickOnFilterApplyButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.filterApplyButton);
  }

  static async clickOnClearAllButton(page: any) {
    await page.waitForTimeout(3000);
    await ElementHelper.clickElement(page, FlightPageLocators.filterClearButton);
  }
  static async VerifyStopsTabVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterTabStops);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterTabStops);
  }

  static selectedNonStop: string;

  static async selectNonStopFilter(page: Page): Promise<void> {
    const airlineText = await page.locator(FlightPageLocators.filterNonStop).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected Non-Stop Filter: ${FlightHomePage.selectedNonStop}`);
  }

  static async clickOnFilterNonStoputton(page: any) {
    await page.waitForTimeout(3000);
    await ElementHelper.clickElement(page, FlightPageLocators.filterNonStop);
  }

  static async verifyFilteredStopsDetails(page: Page): Promise<void> {
    const flightCards = page.locator(FlightPageLocators.FligthStopDetails);
    const count = await flightCards.count();
    console.log(`Total Flights Found: ${count}`);
    for (let i = 0; i < count; i++) {
      const airlineName = await flightCards.nth(i).textContent();
      console.log(`Flight ${i + 1}: ${airlineName?.trim()}`);
      expect(airlineName?.trim().toLowerCase()).toContain(FlightHomePage.selectedNonStop.toLowerCase());
    }
  }

  static async select1StopFilter(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, FlightPageLocators.filter1Stop);
    const airlineText = await page.locator(FlightPageLocators.filter1Stop).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected 1-Stop Filter: ${FlightHomePage.selectedNonStop}`);
  }

  static async verifyFiltered1StopsDetails(page: Page): Promise<void> {
    const flightCards = page.locator(FlightPageLocators.FligthStopDetails);
    const count = await flightCards.count();
    console.log(`Total Flights Found: ${count}`);
    for (let i = 0; i < count; i++) {
      const airlineName = await flightCards.nth(i).textContent();
      console.log(`Flight ${i + 1}: ${airlineName?.trim()}`);
      expect(airlineName?.trim().toLowerCase()).toContain(FlightHomePage.selectedNonStop.toLowerCase());
    }
  }
  static async clickOnDepartureTabButton(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterTabDepartureTime);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterTabDepartureTime);
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabDepartureTime);
  }

  static async VerifyfilterDepartureTimeEarlyMorningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterDepartureTimeEarlyMorning);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterDepartureTimeEarlyMorning);
  }

  static async VerifyfilterDepartureTimeMorningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterDepartureTimeMorning);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterDepartureTimeMorning);
  }

  static async VerifyfilterDepartureTimeAfternoonVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterDepartureTimeAfternoon);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterDepartureTimeAfternoon);
  }

  static async VerifyfilterDepartureTimeEveningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterDepartureTimeEvening);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterDepartureTimeEvening);
  }

  static async VerifyFilterDepartureTimeEarlyMorningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterDepartureTimeEarlyMorningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterDepartureTimeEarlyMorningReturn);
  }

  static async VerifyFilterDepartureTimeMorningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterDepartureTimeMorningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterDepartureTimeMorningReturn);
  }

  static async VerifyFilterDepartureTimeAfternoonReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterDepartureTimeAfternoonReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterDepartureTimeAfternoonReturn);
  }

  static async VerifyFilterDepartureTimeEveningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterDepartureTimeEveningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterDepartureTimeEveningReturn);
  }
  static async clickOnArrivalTabButton(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterTabArrivalTime);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterTabArrivalTime);
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabArrivalTime);
  }

  static async VerifyfilterArrivalTimeEarlyMorningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterArrivalTimeEarlyMorning);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterArrivalTimeEarlyMorning);
  }

  static async VerifyfilterArrivalTimeMorningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterArrivalTimeMorning);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterArrivalTimeMorning);
  }

  static async VerifyfilterArrivalTimeAfternoonVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterArrivalTimeAfternoon);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterArrivalTimeAfternoon);
  }

  static async VerifyfilterArrivalTimeEveningVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterArrivalTimeEvening);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterArrivalTimeEvening);
  }

  static async VerifyFilterArrivalTimeEarlyMorningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterArrivalTimeEarlyMorningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterArrivalTimeEarlyMorningReturn);
  }

  static async VerifyFilterArrivalTimeMorningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterArrivalTimeMorningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterArrivalTimeMorningReturn);
  }

  static async VerifyFilterArrivalTimeAfternoonReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterArrivalTimeAfternoonReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterArrivalTimeAfternoonReturn);
  }

  static async VerifyFilterArrivalTimeEveningReturnVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FilterArrivalTimeEveningReturn);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FilterArrivalTimeEveningReturn);
  }

  static async clickOnfilterTabFareTypeTabButton(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterTabFareType);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterTabFareType);
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabFareType);
  }

  static async clickOnfilterTabFareTypeRefundableButton(page: any) {
    await page.waitForTimeout(3000);
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabFareTypeRefundable);
  }

  static async selectRefundableFilter(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabFareTypeRefundable);
    const airlineText = await page.locator(FlightPageLocators.filterTabFareTypeRefundable).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected Refundable Filter: ${FlightHomePage.selectedNonStop}`);
  }

  static async verifyRefundableDetails(page: Page): Promise<void> {
    const flightCards = page.locator(FlightPageLocators.FlightRefundableText);
    const count = await flightCards.count();
    console.log(`Total Flights Found: ${count}`);
    for (let i = 0; i < count; i++) {
      const airlineName = await flightCards.nth(i).textContent();
      console.log(`Flight ${i + 1}: ${airlineName?.trim()}`);
      expect(airlineName?.trim().toLowerCase()).toContain(FlightHomePage.selectedNonStop.toLowerCase());
    }
  }

  static async selectNonRefundableFilter(page: Page): Promise<void> {
    if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.filterTabFareTypeNonRefundable)) {
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabFareTypeNonRefundable);
    const airlineText = await page.locator(FlightPageLocators.filterTabFareTypeNonRefundable).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected Non-Refundable Filter: ${FlightHomePage.selectedNonStop}`);
    }
  }

  static async verifyNonRefundableDetails(page: Page): Promise<void> {
    if (await page.locator(FlightPageLocators.FlightNonRefundableText).isVisible()) {
      if (await page.locator(FlightPageLocators.filterErrorMessage).isVisible()) {
        console.log('Filter Error Message Displayed:');
      } else {
        const flightCards = page.locator(FlightPageLocators.FlightNonRefundableText);
        const count = await flightCards.count();
        console.log(`Total Flights Found: ${count}`);
        for (let i = 0; i < count; i++) {
          const airlineName = await flightCards.nth(i).textContent();
          console.log(`Flight ${i + 1}: ${airlineName?.trim()}`);
          expect(airlineName?.trim().toLowerCase()).toContain(FlightHomePage.selectedNonStop.toLowerCase());
        }
      }
    }
  }
  static async clickOnfilterAirlineTabButton(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.filterTabAirlines);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.filterTabAirlines);
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabAirlines);
  }

  static async selectFirstAirlineFilter(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, FlightPageLocators.filterFirstAirlineInList);
    const airlineText = await page.locator(FlightPageLocators.filterFirstAirlineInList).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected Airline Filter: ${FlightHomePage.selectedNonStop}`);
  }

  static async verifyFilteredAirlines(page: Page): Promise<void> {
    const flightCards = page.locator(FlightPageLocators.FlightAirlineName);
    const count = await flightCards.count();
    console.log(`Total Flights Found: ${count}`);
    for (let i = 0; i < count; i++) {
      const airlineName = await flightCards.nth(i).textContent();
      console.log(`Flight ${i + 1}: ${airlineName?.trim()}`);
      expect(airlineName?.trim()).toContain(FlightHomePage.selectedNonStop);
    }
  }
  static async clickOnNextButtonOnFlightDetailsPage(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.nextButtonOnFlightDetailsPage);
    await page.waitForTimeout(3000);
  }

  static async clickOnBookButtonOnFlightDetailsPage(page: any) {
    await page.waitForTimeout(3000);
    await ElementHelper.clickElement(page, FlightPageLocators.bookButtonOnFairDetailsPage);
    await page.waitForTimeout(8000);
  }

  static async clickOnContinueButtonOnFlightDetailsPage(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.continueButtonOnFlightDetailsPage);
    await page.waitForTimeout(3000);
  }

  static selectedFirstName: string;
  static selectedLastName: string;
  static selectedEmail: string;
  static selectedPhone: string;

  static async clickOnAddNewTravellerButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.addnewTravellerButton);
    await page.waitForTimeout(3000);
  }

  static async clickOnMrGenderButton(page: any) {
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellerGenderMR);
    await ElementHelper.clickElement(page, FlightPageLocators.travellerGenderMR);
    await page.waitForTimeout(3000);
  }

  static async VerifyFirstNameErrorMessageVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FirstNameErrorMessage);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FirstNameErrorMessage);
  }

  static async VerifyLastNameErrorMessageVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.LastNameErrorMessage);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.LastNameErrorMessage);
  }

  static async EnterFirstName(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.firstNameInput, data);
    const firstNameText = await page.locator(FlightPageLocators.firstNameInput).inputValue();
    FlightHomePage.selectedFirstName = firstNameText?.split('(')[0].trim() || '';
    console.log(`Entered First Name: ${FlightHomePage.selectedFirstName}`);
  }

  static async EnterLastName(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.lastNameInput, data);
    const lastNameText = await page.locator(FlightPageLocators.lastNameInput).inputValue();
    FlightHomePage.selectedLastName = lastNameText?.split('(')[0].trim() || '';
    console.log(`Entered Last Name: ${FlightHomePage.selectedLastName}`);
  }

  static async verifyFirstTravellerNameOnTravellerDetailPage(page: Page): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.FirstTravellerNameOnSummary).textContent();
    console.log(`Result Page Text: ${summaryText}`);
    expect(summaryText).toContain(FlightHomePage.selectedFirstName);
    console.log(`Verified First Traveller Name: ${FlightHomePage.selectedFirstName}`);
  }

  static async verifyLastTravellerNameOnTravellerDetailPage(page: Page): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.FirstTravellerNameOnSummary).textContent();
    console.log(`Result Page Text: ${summaryText}`);
    expect(summaryText).toContain(FlightHomePage.selectedLastName);
    console.log(`Verified Last Traveller Name: ${FlightHomePage.selectedLastName}`);
  }

  static async clickOnAddTravellerButton(page: any) {
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.addTravellerButton);
    await ElementHelper.clickElement(page, FlightPageLocators.addTravellerButton);
    await page.waitForTimeout(3000);
  }

  static async clickOnFirstNameEditButton(page: any) {
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FirstTravellerNameEditButton);
    await ElementHelper.clickElement(page, FlightPageLocators.FirstTravellerNameEditButton);
  }
  
  
  static async clickOnFirstOptionCheckbox(page: any) {
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FirstOptionCheckbox);
    await ElementHelper.clickElement(page, FlightPageLocators.FirstOptionCheckbox);
  }

  static async clickOnEditConfirmButtonPage(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.firstTravellerNameEditConfirmButton);
    await page.waitForTimeout(3000);
  }
  static async VerifyEmailHeaderVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerEmail);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellerEmail);
  }

  static async VerifyPhoneHeaderVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerPhoneNumber);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellerPhoneNumber);
  }

  static async VerifyDefaultTravellerEmail(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.defaultTavellerEmail);
    const travellerEmail = await page.locator(FlightPageLocators.defaultTavellerEmail).inputValue();
    FlightHomePage.selectedEmail = travellerEmail?.split('(')[0].trim() || '';
    console.log(`Default Traveller Email: ${FlightHomePage.selectedEmail}`);
  }

  static async VerifyDefaultTravellerPhone(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.defaultTravellerPhone);
    const travellerPhone = await page.locator(FlightPageLocators.defaultTravellerPhone).inputValue();
    FlightHomePage.selectedPhone = travellerPhone?.split('(')[0].trim() || '';
    console.log(`Default Traveller Phone: ${FlightHomePage.selectedPhone}`);
  }

  static async ClearEmailAndVerifyEmailError(page: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultTavellerEmail, '');
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.emailErrorMessage);
  }

  static async ClearMobileAndVerifyMobileError(page: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultTravellerPhone, '');
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.phoneErrorMessage);
  }

  static async EnterNewTravellerEmail(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultTavellerEmail, data);
    await VerificationHelpers.elementIsHidden(page, FlightPageLocators.emailErrorMessage);
  }

  static async EnterNewTravellerPhone(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultTravellerPhone, data);
    await VerificationHelpers.elementIsHidden(page, FlightPageLocators.phoneErrorMessage);
  }

  static async VerifyGSTHeaderVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.GSTHeader);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.GSTHeader);
  }

  static async ClearGSTAndVerifyError(page: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultGSTNumber, '');
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.gstErrorMessage);
  }

  static async EnterNewTravellerGST(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultGSTNumber, data);
    await VerificationHelpers.elementIsHidden(page, FlightPageLocators.gstErrorMessage);
  }

  static async VerifyPassportHeaderVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.passportDetailHeading);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.passportDetailHeading);
  }

  static async VerifyPassportErrorMessageVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.passportErrorMessage);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.passportErrorMessage);
  }

  static async VerifyPassportCountryErrorMessageVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.passportCountryErrorMessage);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.passportCountryErrorMessage);
  }

  static async VerifyPassportDateErrorMessageVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.passportExpiryErrorMessage);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.passportExpiryErrorMessage);
  }

  static async EnterNewTravellerPassportNumber(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultPassportNumber, data);
    await VerificationHelpers.elementIsHidden(page, FlightPageLocators.passportErrorMessage);
  }

  static async EnterNewTravellerPassportCounty(page: any, _data: any) {
    await ElementHelper.selectOptionByVisibleText(page, FlightPageLocators.defualtpassportCountry, 'India');
    await CommonHelper.performKeyboardAction(page, 'Enter');
    await VerificationHelpers.elementIsHidden(page, FlightPageLocators.passportErrorMessage);
  }

  static async selectExpireDateForPassport(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.expireDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 8);
    const targetDay = tomorrow.getDate().toString();
    await page.locator(FlightPageLocators.dateCell(targetDay)).click();
  }

  static async ScrolltosaveTravellInfo(page: any) {
    await ElementHelper.scrollToElement(page, FlightPageLocators.saveTravellInfo);
  }

  static async verifyFlightFromAndToShotFormVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightToNameShotForm);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightToNameShotForm);
}

  static async verifyInternationalFlightFromAndToShotFormVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightTOInternationalName);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightTOInternationalName);
  }

  static async clickOnFirstTravellerName(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.FirstTravellerCheckbox);
    await page.waitForTimeout(3000);
}

static async clickOncontinueButtonOnTravellerPage(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellerDetailsPageContinuebutton);
    await page.waitForTimeout(3000);
}

static async travellersAndAddonsContinueButton(page: any) {
    if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellersAndAddonsContinueButton)) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersAndAddonsContinueButton);
  }
    await page.waitForTimeout(3000); // Wait for navigation to complete
}


static async verifySeatSelectionOptionVisible(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatSelectionOption)) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatSelectionOption);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatSelectionOption);
  }
}

static async verifyBaggageSelectionOptionVisible(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.baggageSelectionOption);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.baggageSelectionOption);
  }
}

static async verifySeatMapVisible(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatMapContainer)) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatMapContainer);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatMapContainer);
  }
}

static async verifyPriceIncreasesAfterSeatSelection(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatPrice)) {
    const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
    const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price Before Seat Selection: ${beforePrice}`);
    await ElementHelper.clickElement(page, FlightPageLocators.availableSeat);
    await page.waitForTimeout(2000);
    const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();

    const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price After Seat Selection: ${afterPrice}`);
    expect(afterPrice).toBeGreaterThan(beforePrice);
    console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
  }
}

static async clickOnbaggageOption(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
    await ElementHelper.clickElement(page, FlightPageLocators.baggageSelectionOption);
    await page.waitForTimeout(3000); 
  }
}

static async verifyPriceIncreasesAfterWeeightIncrease(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatPrice)) {
    const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
    const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price Before Seat Selection: ${beforePrice}`);
    await ElementHelper.clickElement(page, FlightPageLocators.weightIncreasePlusButton);
    await page.waitForTimeout(2000);
    const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();

    const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price After Seat Selection: ${afterPrice}`);
    expect(afterPrice).toBeGreaterThan(beforePrice);

    console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
  }
}

static async clickOnSkipButton(page: any) {
    if(await ElementHelper.isElementDisplayed(page, FlightPageLocators.skipAndPayButton)) {
      await ElementHelper.clickElement(page, FlightPageLocators.skipAndPayButton);
    }
    await page.waitForTimeout(3000); // Wait for navigation to complete
}

static async verifyTravellerAndAddOneHeadingVisible(page: any) {
  if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellerAndAddoneHeading)) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerAndAddoneHeading);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators .travellerAndAddoneHeading);
  }
}

static async reloadIfNoRecordFound(page: any) {
    const noFlightsTextLocator = FlightPageLocators.noFlightsText;
    while (await page.locator(noFlightsTextLocator).isVisible()) {
        await page.reload();
        await page.waitForTimeout(15000);
        if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.firstFlightCard)) {
          break;
        }
    }
}


}
