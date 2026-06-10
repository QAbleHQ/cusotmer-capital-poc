import { expect, Page } from '@playwright/test';
import { FlightPageLocators } from '../../locators/idfc/FlightPageLocators';
import { VerificationHelpers } from '../../utils/verificationHelper';
import { ElementHelper } from '../../utils/elementHelper';
import { CommonHelper } from '../../utils/commonHelper';

export class FlightHomePage {

  // ---------------------------------------------------------------------------
  // Flight search form – trip type (one-way / round-trip)
  // ---------------------------------------------------------------------------
  static async clickOnRoundTripOption(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.roundtripbox);
  }

  // ---------------------------------------------------------------------------
  // Flight search form – from / to city
  // ---------------------------------------------------------------------------
  static async clickOnCityFromAirport(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.fromCity);
  }

  static async clickOnToAirport(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.toCity);
  }

  static async EnterCityFromAirport(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.fromCity, data);
  }

  static async EnterCityToAirport(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.toCity, data);
  }

  static async VerifyFromAirpotDropdownVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.fromCityDropdown);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.fromCityDropdown);
  }

  static async VerifyToAirpotDropdownVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.toCityDropdown);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.toCityDropdown);
  }

  static async clickOnFirstSearchResultfromCityDropdown(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResultfromCityDropdown);
  }

  static async clickOnfirstSearchResultToCityDropdown(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.firstSearchResulttoCityDropdown);
  }

  // ---------------------------------------------------------------------------
  // Flight search form – departure / return dates
  // ---------------------------------------------------------------------------
  static async clickOnDepartureDate(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.departureDate);
  }

  static async clickOnReturnDate(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.returnDate);
  }

  static async selectTomorrowDateForDeparture(page: any) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 10);

    const targetDay = tomorrow.getDate().toString();
    const targetMonth = tomorrow.toLocaleString('en-US', { month: 'long' });
    const targetYear = tomorrow.getFullYear().toString();

    const currentMonth = await page.locator(FlightPageLocators.currentMonth).textContent();
    const currentYear = await page.locator(FlightPageLocators.currentYear).textContent();

    if (
      currentMonth?.trim() !== targetMonth || currentYear?.trim() !== targetYear
    ) {
      await page.locator(FlightPageLocators.nextMonthButton).click();
    }

    await page.locator(FlightPageLocators.dateCell(targetDay)).click();
  }

  static async select2dayDateForReturn(page: any) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 15);

    const targetDay = tomorrow.getDate().toString();
    const targetMonth = tomorrow.toLocaleString('en-US', { month: 'long' });
    const targetYear = tomorrow.getFullYear().toString();

    const currentMonth = await page.locator(FlightPageLocators.currentMonth).textContent();
    const currentYear = await page.locator(FlightPageLocators.currentYear).textContent();

    if (
      currentMonth?.trim() !== targetMonth || currentYear?.trim() !== targetYear
    ) {
      await page.locator(FlightPageLocators.nextMonthButton).click();
    }

    await page.locator(FlightPageLocators.dateCell(targetDay)).click();
  }

  static async VerifyOneWayRoundTripCalendarVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
  }

  // ---------------------------------------------------------------------------
  // Flight search form – travellers & cabin class
  // ---------------------------------------------------------------------------
  static async clickOntravellersAndCabinClass(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersAndCabinClass);
  }

  static async VerifytravellersAndCabinClassDropdownVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.roomCountDropdown);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.roomCountDropdown);
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
    await ElementHelper.scrollToElement(page, FlightPageLocators.travelAdvisoryText);
  }

  // ---------------------------------------------------------------------------
  // Flight search form – search CTA
  // ---------------------------------------------------------------------------
  static async clickOnSearchFlightsButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.searchFlightsButton);
    await page.waitForTimeout(15000);
  }

  // ---------------------------------------------------------------------------
  // Flight search results page – flight cards
  // ---------------------------------------------------------------------------
  static async VerifyFirstFlightCardVisible(page: any) {
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

  // ---------------------------------------------------------------------------
  // Flight search results page – sort & filter panel (open / apply)
  // ---------------------------------------------------------------------------
  static async clickOnFilterListButton(page: any) {
    await page.waitForTimeout(5000);
    await ElementHelper.clickElement(page, FlightPageLocators.flightListFilterButton);
  }

  static async clickOnFilterApplyButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.filterApplyButton);
  }

  static async clickOnClearAllButton(page: any) {
    await page.waitForTimeout(3000);
    await ElementHelper.clickElement(page, FlightPageLocators.filterClearButton);
  }

  // ---------------------------------------------------------------------------
  // Flight search results page – filter (stops)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Flight search results page – filter (departure time)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Flight search results page – filter (arrival time)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Flight search results page – filter (fare type)
  // ---------------------------------------------------------------------------
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
    await ElementHelper.clickElement(page, FlightPageLocators.filterTabFareTypeNonRefundable);
    const airlineText = await page.locator(FlightPageLocators.filterTabFareTypeNonRefundable).textContent();
    FlightHomePage.selectedNonStop = airlineText?.split('(')[0].trim() || '';
    console.log(`Selected Non-Refundable Filter: ${FlightHomePage.selectedNonStop}`);
  }

  static async verifyNonRefundableDetails(page: Page): Promise<void> {
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
        await ElementHelper.clickElement(page, FlightPageLocators.flightListFilterButton);
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Flight search results page – filter (airlines)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Flight details page – fare selection & booking CTA
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // Travellers details page – add / edit traveller
  // ---------------------------------------------------------------------------
  static selectedName: string;

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
    FlightHomePage.selectedName = firstNameText?.split('(')[0].trim() || '';
    console.log(`Entered First Name: ${FlightHomePage.selectedName}`);
  }

  static async EnterLastName(page: any, data: any) {
    await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.lastNameInput, data);
    const lastNameText = await page.locator(FlightPageLocators.lastNameInput).inputValue();
    FlightHomePage.selectedName = lastNameText?.split('(')[0].trim() || '';
    console.log(`Entered Last Name: ${FlightHomePage.selectedName}`);
  }

  static async verifyFirstTravellerNameOnTravellerDetailPage(page: Page): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.FirstTravellerNameOnSummary).textContent();
    console.log(`Result Page Text: ${summaryText}`);
    expect(summaryText).toContain(FlightHomePage.selectedName);
    console.log(`Verified First Traveller Name: ${FlightHomePage.selectedName}`);
  }

  static async verifyLastTravellerNameOnTravellerDetailPage(page: Page): Promise<void> {
    const summaryText = await page.locator(FlightPageLocators.FirstTravellerNameOnSummary).textContent();
    console.log(`Result Page Text: ${summaryText}`);
    expect(summaryText).toContain(FlightHomePage.selectedName);
    console.log(`Verified Last Traveller Name: ${FlightHomePage.selectedName}`);
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

  // ---------------------------------------------------------------------------
  // Travellers details page – contact & GST
  // ---------------------------------------------------------------------------
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
    FlightHomePage.selectedName = travellerEmail?.split('(')[0].trim() || '';
    console.log(`Default Traveller Email: ${FlightHomePage.selectedName}`);
  }

  static async VerifyDefaultTravellerPhone(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.defaultTravellerPhone);
    const travellerPhone = await page.locator(FlightPageLocators.defaultTravellerPhone).inputValue();
    FlightHomePage.selectedName = travellerPhone?.split('(')[0].trim() || '';
    console.log(`Default Traveller Phone: ${FlightHomePage.selectedName}`);
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

  // ---------------------------------------------------------------------------
  // Travellers details page – passport (international)
  // ---------------------------------------------------------------------------
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

  static async selectTomorrowExpireDateForPassport(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.expireDate);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
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
    await page.waitForTimeout(3000); // Wait for navigation to complete
}

static async clickOncontinueButtonOnTravellerPage(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellerDetailsPageContinuebutton);
    await page.waitForTimeout(3000); // Wait for navigation to complete
}
static async travellersAndAddonsContinueButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.travellersAndAddonsContinueButton);
    await page.waitForTimeout(3000); // Wait for navigation to complete
}


static async verifySeatSelectionOptionVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatSelectionOption);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatSelectionOption);
}

static async verifyBaggageSelectionOptionVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.baggageSelectionOption);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.baggageSelectionOption);
}

static async verifySeatMapVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatMapContainer);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatMapContainer);
}

static async verifyPriceIncreasesAfterSeatSelection(page: any) {

    // Get current price
    const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
    const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price Before Seat Selection: ${beforePrice}`);
    // Click first available seat
    await ElementHelper.clickElement(page, FlightPageLocators.availableSeat);

    // Wait for price update
    await page.waitForTimeout(2000);

    // Get updated price
    const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();

    const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price After Seat Selection: ${afterPrice}`);

    // Verify increase
    expect(afterPrice).toBeGreaterThan(beforePrice);

    console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
}

static async clickOnbaggageOption(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.baggageSelectionOption);
    await page.waitForTimeout(3000); // Wait for navigation to complete
}

static async verifyPriceIncreasesAfterWeeightIncrease(page: any) {

    // Get current price
    const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
    const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price Before Seat Selection: ${beforePrice}`);
    // Click first available seat
    await ElementHelper.clickElement(page, FlightPageLocators.weightIncreasePlusButton);

    // Wait for price update
    await page.waitForTimeout(2000);

    // Get updated price
    const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();

    const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
    console.log(`Price After Seat Selection: ${afterPrice}`);

    // Verify increase
    expect(afterPrice).toBeGreaterThan(beforePrice);

    console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
}

static async clickOnSkipButton(page: any) {
    await ElementHelper.clickElement(page, FlightPageLocators.skipAndPayButton);
    await page.waitForTimeout(3000); // Wait for navigation to complete
}

static async verifyTravellerAndAddOneHeadingVisible(page: any) {
    await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerAndAddoneHeading);
    await VerificationHelpers.elementIsVisible(page, FlightPageLocators .travellerAndAddoneHeading);
}

static async reloadIfNoRecordFound(page: any) {
    const noFlightsTextLocator = FlightPageLocators.noFlightsText;
    // Keep refreshing while "no flights" is visible
    while (await page.locator(noFlightsTextLocator).isVisible()) {
        await page.reload();
        // Optionally give the page some time to load after reload
        await page.waitForTimeout(10000);
    }
}


}
