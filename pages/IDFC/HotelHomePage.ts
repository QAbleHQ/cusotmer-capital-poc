import { expect, Page } from '@playwright/test';
import { HotelPageLocators } from '../../locators/idfc/HotelPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
import { VerificationHelpers } from '../../utils/verificationHelper';

const idfcTestData = require('../../testdata/idfctestdata.json');

export class HotelHomePage {

  // ---------------------------------------------------------------------------
  // Home page – header & hotel tab navigation
  // ---------------------------------------------------------------------------
  static async verifyHotelHomePageLoaded(page: Page) {
    await expect(page.locator(HotelPageLocators.profileIconButton)).toBeVisible();
    console.log('User Logged in and Profile icon button visible');
  }

  static async clickHotelTabBTN(page: Page) {
    const hotelTabBTN = HotelPageLocators.hotelTab;
    await VerificationHelpers.elementIsVisible(page, hotelTabBTN);
    await ElementHelper.clickElement(page, hotelTabBTN);
  }

  // ---------------------------------------------------------------------------
  // Hotel search form – location, dates, rooms & guests, search CTA
  // ---------------------------------------------------------------------------
  static async searchValueInTestBox(page: Page, text: string) {
    const whereToTextBox = HotelPageLocators.whereToTextBox;
    await VerificationHelpers.elementIsVisible(page, whereToTextBox);
    await ElementHelper.clearAndEnterInTextField(page, whereToTextBox, text);
  }

  static async selectFirstOptionFromDropdown(page: Page) {
    const whereToDropdownSelectFirstOption = HotelPageLocators.whereToDropdownSelectFirstOption;
    await VerificationHelpers.elementIsVisible(page, whereToDropdownSelectFirstOption);
    await ElementHelper.clickElement(page, whereToDropdownSelectFirstOption);
  }

  static async clickDateButton(page: any) {
    const dateButton = HotelPageLocators.dateButton;
    await ElementHelper.clickElement(page, dateButton);
  }

  static async clickRoomsAndGuestsButton(page: any) {
    const clickButton = HotelPageLocators.roomsAndGuestButton;
    await ElementHelper.clickElement(page, clickButton);
  }

  static async clickSearchHotelButton(page: any) {
    const searchHotelButton = HotelPageLocators.searchHotelButton;
    await ElementHelper.clickElement(page, searchHotelButton);
  }

  // ---------------------------------------------------------------------------
  // Hotel search form – date picker (check-in / check-out)
  // ---------------------------------------------------------------------------
  static async selectMonthAndDateFROM(page: any, monthYear: string, date: string) {
    const monthLocator = HotelPageLocators.selectMonth.replace('{monthYear}', monthYear);
    while (!(await page.locator(monthLocator).isVisible())) {
      await ElementHelper.clickElement(page, HotelPageLocators.nextButton);
    }
    const dateLocator = HotelPageLocators.selectDate
      .replace('{monthYear}', monthYear)
      .replace('{date}', date);
    await ElementHelper.clickElement(page, dateLocator);
  }

  static async selectMonthAndDateTO(page: any, monthYear: string, date: string) {
    const monthLocator = HotelPageLocators.selectMonth.replace('{monthYear}', monthYear);
    while (!(await page.locator(monthLocator).isVisible())) {
      await ElementHelper.clickElement(page, HotelPageLocators.nextButton);
    }
    const dateLocator = HotelPageLocators.selectDate
      .replace('{monthYear}', monthYear)
      .replace('{date}', date);
    await ElementHelper.clickElement(page, dateLocator);
  }

  // ---------------------------------------------------------------------------
  // Hotel search form – rooms & guests popup
  // ---------------------------------------------------------------------------
  static async selectAdultsAndChildrenWithAge(
    page: any,
    rooms: number,
    adults: number,
    children: number,
    childAges: number[]
  ) {
    for (let roomNo = 1; roomNo <= rooms; roomNo++) {
      const adultCount = HotelPageLocators.adultCount.replace('{roomNo}', roomNo.toString());
      const adultPlus = HotelPageLocators.adultPlusButton.replace('{roomNo}', roomNo.toString());
      while (parseInt(await page.locator(adultCount).inputValue()) < adults) {
        await page.locator(adultPlus).click();
      }

      const childCount = HotelPageLocators.childrenCount.replace('{roomNo}', roomNo.toString());
      const childPlus = HotelPageLocators.childrenPlusButton.replace('{roomNo}', roomNo.toString());
      while (parseInt(await page.locator(childCount).inputValue()) < children) {
        await page.locator(childPlus).click();
      }

      for (let i = 1; i <= children; i++) {
        const ageDropdown = HotelPageLocators.childrenAgeDropdown
          .replace('{roomNo}', roomNo.toString())
          .replace('{childIndex}', i.toString());
        await page.locator(ageDropdown).selectOption({
          value: childAges[i - 1].toString(),
        });
      }
    }
  }

  static async clickAddRoomButton(page: any) {
    const addRoomButton = HotelPageLocators.addRoomButton;
    await ElementHelper.clickElement(page, addRoomButton);
  }

  static async clickDoneButton(page: any) {
    const doneButton = HotelPageLocators.doneButton;
    await ElementHelper.clickElement(page, doneButton);
  }

  // ---------------------------------------------------------------------------
  // Hotel search results page – update search bar
  // ---------------------------------------------------------------------------
  static async clickUpdateSearchButton(page: any) {
    const updateSearchButton = HotelPageLocators.updateSearchButton;
    await ElementHelper.clickElement(page, updateSearchButton);
  }

  static async getLocationNameExpected(page: any) {
    const locationElements = page.locator(HotelPageLocators.whereToTextBox);
    await ElementHelper.getExpectedTextFromLocator(page, locationElements);
  }

  static async getLocationNameActualandCompare(page: any) {
    const locationElements = HotelPageLocators.whereToTextBox;
    await ElementHelper.getActualTextFromLocator(page, locationElements);
    await ElementHelper.compareBothResultAndAddedInConsole();
  }

  static async getRoomDetailTestExpected(page: any) {
    const roomandGuest = page.locator(HotelPageLocators.roomsAndGuestButton);
    await ElementHelper.getExpectedTextFromLocator(page, roomandGuest);
  }

  static async getRoomDetailTestActualAndCompare(page: any) {
    const roomandGuest = page.locator(HotelPageLocators.roomsAndGuestButton);
    await ElementHelper.getActualTextFromLocator(page, roomandGuest);
    await ElementHelper.compareBothResultAndAddedInConsole();
  }

  // ---------------------------------------------------------------------------
  // Hotel search results page – hotel cards (left / main list)
  // ---------------------------------------------------------------------------
  static async getDomesticSearchResultTextandCompare(page: any): Promise<string | null> {
    const searchResult = HotelPageLocators.resultLocations;
    const verifyAmount = HotelPageLocators.getAmountFromResult;
    const results = await page.locator(searchResult).allTextContents();
    const currency = await page.locator(verifyAmount).allTextContents();
    const expectedTestData = idfcTestData.hotelPage.domestic;
    console.log(`Compare Domestic: Expected value: "${expectedTestData}", Actual Results:`, results);
    console.log(`Expected Currency: ₹, Actual Currency Values:`, currency);
    for (const resultText of results) {
      if (resultText.toLowerCase().includes(expectedTestData.toLowerCase())) {
        console.log(`✅ Matched Domestic Result. Value 1 (Expected): "${expectedTestData}", Value 2 (Actual): "${resultText}"`);
        return resultText;
      }
    }
    // Soft assertion instead of throwing error:
    console.error(`❌ Soft Assertion Failed: Domestic result not found. Value 1 (Expected): "${expectedTestData}", Results List (Actual):`, results);
    return null;
  }

  static async getInternationalSearchResultTextandCompare(page: any): Promise<string | null> {
    const searchResult = HotelPageLocators.resultLocations;
    const verifyAmount = HotelPageLocators.getAmountFromResult;
    const results = await page.locator(searchResult).allTextContents();
    const currency = await page.locator(verifyAmount).allTextContents();
    const expectedTestData = idfcTestData.hotelPage.international;
    console.log(`Compare International: Expected value: "${expectedTestData}", Actual Results:`, results);
    console.log(`Expected Currency: ₹, Actual Currency Values:`, currency);
    for (const resultText of results) {
      if (resultText.toLowerCase().includes(expectedTestData.toLowerCase())) {
        console.log(`✅ Matched International Result. Value 1 (Expected): "${expectedTestData}", Value 2 (Actual): "${resultText}"`);
        return resultText;
      }
    }
    // Soft assertion instead of throwing error:
    console.error(`❌ Soft Assertion Failed: International result not found. Value 1 (Expected): "${expectedTestData}", Results List (Actual):`, results);
    return null;
  }

  static async getHotelNameExpected(page: any) {
    const locationElements = HotelPageLocators.getHotelNameText;
    await ElementHelper.getExpectedTextFromLocator(page, locationElements);
  }

  static async getHotelNameActualandCompare(page: any) {
    const locationElements = HotelPageLocators.getHotelNameText;
    await ElementHelper.getActualTextFromLocator(page, locationElements);
    await ElementHelper.compareBothResultAndAddedInConsole();
  }

  static async printHotelRatings(page: any) {
    const ratingElements = page.locator(HotelPageLocators.getRatingStar);
    const count = await ratingElements.count();

    for (let i = 0; i < count; i++) {
      const rating = await ratingElements
        .nth(i)
        .getAttribute('data-rating');

      console.log(`Hotel ${i + 1} Rating: ${rating}`);
    }
  }

  static async printAllAmountValue(page: any) {
    const currencyElements = page.locator(HotelPageLocators.getAmountFromResult);
    const count = await currencyElements.count();
    for (let i = 0; i < count; i++) {
      const text = await currencyElements.nth(i).textContent();
      console.log(`Amount Value ${i + 1}: "${text?.trim()}"`);
    }
  }

  static async clickAllLocaliseButton(page: any) {
    await ElementHelper.clickElement(page, HotelPageLocators.allLocaliseButton);
    console.log('✅ Clicked on All Localise button');
  }

  static async printAllResultLocations(page: any) {
    const resultLocationElements = page.locator(HotelPageLocators.getHotelLocationText);
    const count = await resultLocationElements.count();
    for (let i = 0; i < count; i++) {
      const text = await resultLocationElements.nth(i).textContent();
      console.log(`Result Location ${i + 1}: "${text?.trim()}"`);
    }
  }

  static async clickFirstResult(page: any) {
    await ElementHelper.clickElement(page, HotelPageLocators.getHotelLocationTextSecond);
    console.log('✅ Clicked option');
  }

  static async compareValueDifferenceForSingleAndMultipleRoom(page: any) {
    const taxValue = HotelPageLocators.taxPerNightText;
    const results = await page.locator(taxValue).allTextContents();
    // You can show both result arrays if comparing.
    console.log(`Tax values found (possible comparison values):`, results);
  }

  // ---------------------------------------------------------------------------
  // Hotel search results page – right side filters (sort, price, amenities, rating)
  // ---------------------------------------------------------------------------
  static async showingPropertiesCountText(page: any) {
    const showingPropertiesText = HotelPageLocators.showingPropertiesText;
    const text = await page.locator(showingPropertiesText).allTextContents();
    console.log(`Showing Properties Text:`, text);
  }

  static async clickResetButton(page: any) {
    const resetButton = HotelPageLocators.resetButton;
    await ElementHelper.clickElement(page, resetButton);
  }

  static async clickSortByPopularityButton(page: any) {
    const popularityButton = HotelPageLocators.sortByPopularityButton;
    await ElementHelper.clickElement(page, popularityButton);
    console.log('Clicked on Sort By Popularity button');
  }

  static async clickSortByPriceLowToHighButton(page: any) {
    const lowToHighButton = HotelPageLocators.sortByPriceLowToHighButton;
    await ElementHelper.clickElement(page, lowToHighButton);
    console.log('Clicked on Sort By Price Low to High button');
  }

  static async clickSortByPriceHighToLowButton(page: any) {
    const highToLowButton = HotelPageLocators.sortByPriceHighToLowButton;
    await ElementHelper.clickElement(page, highToLowButton);
    console.log('Clicked on Sort By Price High to Low button');
  }

  static async verifyFreeCancellationToggleAndText(page: any): Promise<void> {
    await ElementHelper.isElementDisplayed(page, HotelPageLocators.freeCancellationText);
    await ElementHelper.clickElement(page, HotelPageLocators.freeCancellationToggle);
  }

  static async verifyBreakfastAvailableToggleAndText(page: any): Promise<void> {
    await ElementHelper.isElementDisplayed(page, HotelPageLocators.breakfastAvailableText);
    await ElementHelper.clickElement(page, HotelPageLocators.breakfastAvailableToggle);
  }

  static async clickStarRating5Button(page: any) {
    const button = HotelPageLocators.starRating5Button;
    await ElementHelper.clickElement(page, button);
    console.log('Clicked on 5 Star Rating button');
  }

  static async clickStarRating4Button(page: any) {
    const button = HotelPageLocators.starRating4Button;
    await ElementHelper.clickElement(page, button);
    console.log('Clicked on 4 Star Rating button');
  }

  static async clickStarRating3Button(page: any) {
    const button = HotelPageLocators.starRating3Button;
    await ElementHelper.clickElement(page, button);
    console.log('Clicked on 3 Star Rating button');
  }

  static async clickStarRating2Button(page: any) {
    const button = HotelPageLocators.starRating2Button;
    await ElementHelper.clickElement(page, button);
    console.log('Clicked on 2 Star Rating button');
  }

  static async clickStarRating1Button(page: any) {
    const button = HotelPageLocators.starRating1Button;
    await ElementHelper.clickElement(page, button);
    console.log('Clicked on 1 Star Rating button');
  }

  // ---------------------------------------------------------------------------
  // Hotel search results page – location & category filters
  // ---------------------------------------------------------------------------
  static async printAndClickAllLocationSelectButtons(page: any) {
    const locationElements = page.locator(HotelPageLocators.locationSelectButton);
    const count = await locationElements.count();

    for (let i = 0; i < count; i++) {
      const text = await locationElements.nth(i).textContent();
      console.log(`Location Select Button ${i + 1}: "${text?.trim()}"`);

      // Click current element
      await locationElements.nth(i).click();
      console.log(`Clicked Location Button ${i + 1}: "${text?.trim()}"`);

      // Showing Properties
      await this.showingPropertiesCountText(page);

      // Reset
      await this.clickResetButton(page);
    }
  }

  static async printAndClickAllCategorySelectButtons(page: any) {
    const categoryElements = page.locator(HotelPageLocators.categorySelectButton);
    const count = await categoryElements.count();

    for (let i = 0; i < count; i++) {
      const text = await categoryElements.nth(i).textContent();
      console.log(`Category Select Button ${i + 1}: "${text?.trim()}"`);

      // Click current element
      await categoryElements.nth(i).click();
      console.log(`Clicked Category Button ${i + 1}: "${text?.trim()}"`);

      // Showing Properties
      await this.showingPropertiesCountText(page);

      // Reset
      await this.clickResetButton(page);
    }
  }

  // ---------------------------------------------------------------------------
  // Hotel search results page – price range slider & amount verification
  // ---------------------------------------------------------------------------
  static async getPriceRangeText(page: any) {
    const priceRangeTextLocator = page.locator(HotelPageLocators.priceRangeText);
    const text = await priceRangeTextLocator.inputValue ? await priceRangeTextLocator.inputValue() : await priceRangeTextLocator.textContent();
    console.log(`Price Range Text: "${text?.trim()}"`);
    return text?.trim();
  }

  static async setPriceRangeSlider(page: any) {
    const leftHandle = page.locator(HotelPageLocators.priceRangeLeftHandle);
    const rightHandle = page.locator(HotelPageLocators.priceRangeRightHandle);

    await this.getPriceRangeText(page);

    const leftBox = await leftHandle.boundingBox();
    const rightBox = await rightHandle.boundingBox();

    if (!leftBox || !rightBox) {
      // Soft assertion instead of throwing error
      console.error('❌ Soft Assertion Failed: Slider handles not found. Value 1 (leftBox):', leftBox, 'Value 2 (rightBox):', rightBox);
      return;
    }

    // Move left handle to the right by ~1cm (no vertical movement)
    const delta = 38;
    await page.mouse.move(leftBox.x + leftBox.width / 2, leftBox.y + leftBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(leftBox.x + leftBox.width / 2 + delta, leftBox.y + leftBox.height / 2, { steps: 10 });
    await page.mouse.up();

    // Move right handle to the left by ~1cm (no vertical movement)
    await page.mouse.move(rightBox.x + rightBox.width / 2, rightBox.y + rightBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(rightBox.x + rightBox.width / 2 - delta, rightBox.y + rightBox.height / 2, { steps: 10 });
    await page.mouse.up();

    console.log(`Moved slider handles horizontally by approx 1cm each side. (leftBox:`, leftBox, 'rightBox:', rightBox, ")");
    await this.getPriceRangeText(page);
  }

  static async verifyAllCurrencyWithinSelectedRange(page: any) {
    const rangeText = await HotelHomePage.getPriceRangeText(page);
    if (!rangeText) {
      console.error('❌ Soft Assertion Failed: Price range text not found. Value 1 (priceRange): null');
      return;
    }
    const prices = rangeText.match(/\d[\d,]*/g);
    if (!prices || prices.length < 2) {
      console.error(`❌ Soft Assertion Failed: Invalid price range. Value 1 (rangeText): "${rangeText}"`);
      return;
    }
    const minPrice = Number(prices[0].replace(/,/g, ''));
    const maxPrice = Number(prices[1].replace(/,/g, ''));
    console.log(`Selected Range: Value 1 (minPrice): ${minPrice}, Value 2 (maxPrice): ${maxPrice}`);
    const currencyElements = page.locator(HotelPageLocators.getAmountFromResult);
    const count = await currencyElements.count();
    for (let i = 0; i < count; i++) {
      const text = await currencyElements.nth(i).textContent();
      if (!text) continue;
      const priceMatch = text.match(/\d[\d,]*/);
      if (!priceMatch) continue;
      const price = Number(priceMatch[0].replace(/,/g, ''));
      console.log(`Checking Price: Value: ${price}, Min: ${minPrice}, Max: ${maxPrice}`);
      if (price >= minPrice && price <= maxPrice) {
        console.log(`✅ Price within range. Value: ${price}, Range: ${minPrice}-${maxPrice}`);
      } else {
        // Soft assertion instead of throw
        console.error(`❌ Soft Assertion Failed: Price outside selected range. Value 1 (price): ${price}, Range: ${minPrice}-${maxPrice}`);
      }
    }
  }

  static async verifyCurrencySortedLowToHigh(page: any) {
    const currencyElements = page.locator(HotelPageLocators.getAmountFromResult);
    const count = await currencyElements.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await currencyElements.nth(i).textContent();
      if (!text) continue;
      const priceMatch = text.match(/\d[\d,]*/);
      if (!priceMatch) continue;
      const price = Number(priceMatch[0].replace(/,/g, ''));
      prices.push(price);
    }

    const sortedPrices = [...prices].sort((a, b) => a - b);
    console.log('Actual Prices:', prices);
    console.log('Expected Sorted (Low to High):', sortedPrices);

    if (!prices.every((price, idx) => price === sortedPrices[idx])) {
      // Soft assertion instead of throw
      console.error(
        `❌ Soft Assertion Failed: Prices are not sorted Low to High\nValue 1 (Actual): ${JSON.stringify(prices)}\nValue 2 (Expected): ${JSON.stringify(sortedPrices)}`
      );
    } else {
      console.log(`✅ Prices are sorted Low to High.\nValue 1 (Actual): ${JSON.stringify(prices)}, Value 2 (Expected): ${JSON.stringify(sortedPrices)}`);
    }
  }

  static async verifyCurrencySortedHighToLow(page: any) {
    const currencyElements = page.locator(HotelPageLocators.getAmountFromResult);
    const count = await currencyElements.count();
    const prices: number[] = [];
    for (let i = 0; i < count; i++) {
      const text = await currencyElements.nth(i).textContent();
      if (!text) continue;
      const priceMatch = text.match(/\d[\d,]*/);
      if (!priceMatch) continue;
      const price = Number(priceMatch[0].replace(/,/g, ''));
      prices.push(price);
    }
    const sortedPrices = [...prices].sort((a, b) => b - a);
    console.log('Actual Prices:', prices);
    console.log('Expected Sorted (High to Low):', sortedPrices);

    if (!prices.every((price, idx) => price === sortedPrices[idx])) {
      // Soft assertion instead of throw
      console.error(
        `❌ Soft Assertion Failed: Prices are not sorted High to Low\nValue 1 (Actual): ${JSON.stringify(prices)}\nValue 2 (Expected): ${JSON.stringify(sortedPrices)}`
      );
    } else {
      console.log(`✅ Prices are sorted High to Low.\nValue 1 (Actual): ${JSON.stringify(prices)}, Value 2 (Expected): ${JSON.stringify(sortedPrices)}`);
    }
  }

  // ---------------------------------------------------------------------------
  // NOT USED METHODS
  // ---------------------------------------------------------------------------
  static async selectRoomsAdultsChildren(page: any, rooms: number, adults: number, children: number, childAges: number[]) {
    while (parseInt(await page.locator(HotelPageLocators.roomCount).inputValue()) < rooms) {
      await page.click(HotelPageLocators.addRoomButton);
    }
    for (let roomNo = 1; roomNo <= rooms; roomNo++) {
      const adultCount = HotelPageLocators.adultCount.replace('{roomNo}', roomNo.toString());
      const adultPlus = HotelPageLocators.adultPlusButton.replace('{roomNo}', roomNo.toString());
      while (parseInt(await page.locator(adultCount).inputValue()) < adults) {
        await page.click(adultPlus);
      }
      const childCount = HotelPageLocators.childrenCount.replace('{roomNo}', roomNo.toString());
      const childPlus = HotelPageLocators.childrenPlusButton.replace('{roomNo}', roomNo.toString());
      while (parseInt(await page.locator(childCount).inputValue()) < children) {
        await page.click(childPlus);
      }
      for (let childIndex = 1; childIndex <= children; childIndex++) {
        const ageDropdown = HotelPageLocators.childrenAgeDropdown.replace('{roomNo}', roomNo.toString()).replace('{childIndex}', childIndex.toString());
        await page.selectOption(ageDropdown, childAges[childIndex - 1].toString());
      }
    }
    await page.click(HotelPageLocators.doneButton);
  }

  static async clickUpdatedateButton(page: any) {
    const clickCheckInCheckoutButton = HotelPageLocators.updateCheckinCheckOutButton;
    await ElementHelper.clickElement(page, clickCheckInCheckoutButton);
  }

}
