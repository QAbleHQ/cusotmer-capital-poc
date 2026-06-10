import { expect, Page } from '@playwright/test';
import { HotelPageLocators } from '../../locators/idfc/HotelPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
import { PaymentPageLocators } from '../../locators/idfc/PaymentPageLocators';
const idfcTestData = require('../../testdata/idfctestdata.json');

export class HotelBookingPage {

  // ---------------------------------------------------------------------------
  // Hotel detail page – room selection
  // ---------------------------------------------------------------------------
  static async clickFirstRoomSelectionButton(page: Page) {
    await page.locator(HotelPageLocators.firstRoomSelectButton).click();
    console.log('Clicked on first room selection button');
  }

  static async confirmRoomSelection(page: Page) {
    await page.locator(HotelPageLocators.roomSelectionConfirmationButton).click();
    console.log('Room selection confirmed');
  }

  static async firstTabNextButton(page: Page) {
    const nextButton = HotelPageLocators.firstTabNextButton;
    await ElementHelper.clickElement(page, nextButton);
  }

  // ---------------------------------------------------------------------------
  // Guest details page – header & add guest actions
  // ---------------------------------------------------------------------------
  static async verifyPrimaryGuestDetailsHeaderVisible(page: Page) {
    await expect(page.locator(HotelPageLocators.primaryGuestDetailsHeader)).toBeVisible();
    console.log('Primary guest details header is visible');
  }

  static async clickAddGuestButton(page: Page) {
    await page.locator(HotelPageLocators.addGuestButton).click();
    console.log('Clicked Add Guest button');
  }

  static async clickAddNewGuestButton(page: Page) {
    await page.locator(HotelPageLocators.addGuestBtn).click();
    console.log('Clicked Add New Guest button');
  }

  static async clickEditTraveler(page: Page) {
    await page.locator(HotelPageLocators.editTravelerButton).click();
  }

  static async verifyCannotProceedWithoutConditions(page: Page) {
    await page.locator(HotelPageLocators.assignGuestToRoomButton).click();
    const isErrorVisible = await page.locator(HotelPageLocators.conditionsErrorMessage).isVisible();
    if (isErrorVisible) {
      console.log('User cannot proceed without accepting mandatory conditions');
    }
  }

  static async clickCheckboxAfterRedeam(page: Page) {
    const checkboxLocator = HotelPageLocators.clickCheckboxAfterRedeam;
    await ElementHelper.clickElement(page, checkboxLocator);
    console.log('Clicked checkbox after redeem action');
  }

  // ---------------------------------------------------------------------------
  // Guest details page – guest form fields
  // ---------------------------------------------------------------------------
  static async fillGuestDetailsInsideForm(page: Page) {
    await page.locator(HotelPageLocators.radioButtonMr).click();
    await page.waitForTimeout(2000);
    await page.locator(HotelPageLocators.firstNameField).fill(idfcTestData.hotelBookingDataFill.firstName);
    await page.waitForTimeout(2000);
    await page.locator(HotelPageLocators.lastNameField).fill(idfcTestData.hotelBookingDataFill.lastName);
    await page.waitForTimeout(2000);
    console.log('Filled guest details form');
  }
  static async fillGuestDetailsoutsideForm(page: Page) {
    await page.locator(HotelPageLocators.contactNumberField).fill(idfcTestData.hotelBookingDataFill.contactNumber);
    await page.waitForTimeout(2000);
    await page.locator(HotelPageLocators.emailField).fill(idfcTestData.hotelBookingDataFill.email);
    await page.waitForTimeout(2000);
    console.log('Filled guest details form');
  }
  static async clickEditGuestButton(page: Page) {
    const editGuestButtonLocator = HotelPageLocators.editGuestButton;
    await ElementHelper.clickElement(page, editGuestButtonLocator);
    console.log('Clicked edit guest button');
  }

  static async updateFirstName(page: Page, firstName: string) {
    await page.locator(HotelPageLocators.firstNameField).clear();
    await page.locator(HotelPageLocators.firstNameField).fill(firstName);
  }

  static async verifyGuestDetailsFormVisible(page: Page) {
    await expect(page.locator(HotelPageLocators.guestDetailsForm)).toBeVisible();
    console.log('Guest Details form is visible with required fields');
  }

  static async addButtonAfterAddingGuest(page: Page) {
    const addButtonLocator = HotelPageLocators.addButtonAfterAddingGuest;
    await ElementHelper.clickElement(page, addButtonLocator);
  }

  static async nextButtonAfterAddingGuest(page: Page) {
    const nextButtonLocator = HotelPageLocators.nextButtonAfterAddingGuest;
    await ElementHelper.clickElement(page, nextButtonLocator);
  }

  // ---------------------------------------------------------------------------
  // Guest details page – PAN card (domestic / international)
  // ---------------------------------------------------------------------------
  static async verifyPanCardNotVisible(page: Page) {
    await expect(page.locator(HotelPageLocators.panCardText)).toHaveCount(0);
    console.log('PAN card field is NOT visible for domestic bookings');
  }

  static async verifyPanCardVisibleAndRequired(page: Page) {
    await expect(page.locator(HotelPageLocators.panCardText)).toBeVisible();
    const isRequired = await page.locator(HotelPageLocators.panNumberField).getAttribute('required');
    console.log(`PAN card field is visible. Required attribute: ${isRequired}`);
  }

  static async verifyValidPanNumberAccepted(page: Page) {
    await page.locator(HotelPageLocators.panNumberField).fill(idfcTestData.hotelBookingDataFill.panNumber);
    const value = await page.locator(HotelPageLocators.panNumberField).inputValue();
    if (value === idfcTestData.hotelBookingDataFill.panNumber) {
      console.log('Valid PAN number accepted successfully');
    }
  }

  // ---------------------------------------------------------------------------
  // Guest details page – saved guests
  // ---------------------------------------------------------------------------
  static async verifySavedGuestTextVisible(page: Page) {
    await expect(page.locator(HotelPageLocators.savedGuestText)).toBeVisible();
    console.log('Saved guest text is visible');
  }

  static async printSavedGuestList(page: Page) {
    const guests = await page.$$(HotelPageLocators.savedGuestList);
    for (let i = 0; i < guests.length; i++) {
      const guestText = await guests[i].textContent();
      console.log(`Saved guest ${i + 1}: ${guestText?.trim()} → This saved guest is there`);
    }
  }

  static async getSavedGuestName(page: Page): Promise<string> {
    return (await page.locator(HotelPageLocators.savedGuestName).textContent())?.trim() || '';
  }

  static async verifyAndCountSavedGuestList(page: Page): Promise<number> {
    const savedGuestListLocator = HotelPageLocators.verifysavedGuestList;
    const guestListElements = page.locator(savedGuestListLocator);
    const count = await guestListElements.count();
    console.log(`Number of saved guests found: ${count}`);

    for (let i = 0; i < count; i++) {
      const guestText = await guestListElements.nth(i).textContent();
      console.log(`Saved Guest #${i + 1}: ${guestText?.trim()}`);
    }
    return count;
  }

  static async clickFirstOptionFromsavedGuestList(page: Page) {
    const firstOptionLocator = HotelPageLocators.clickFirstOptionFromsavedGuestList;
    await ElementHelper.clickElement(page, firstOptionLocator);
  }

  // ---------------------------------------------------------------------------
  // Navigation – go back to hotel search
  // ---------------------------------------------------------------------------
  static async goBackUntilLocationSearchBoxVisible(page: Page) {
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      const isVisible = await page.locator(HotelPageLocators.searchHotelButton).isVisible().catch(() => false);
      if (isVisible) {
        console.log('Location search box is visible.');
        return;
      }
      await page.goBack();
      await page.waitForTimeout(1000);
      attempts++;
    }
    throw new Error('Location search box not visible after multiple back navigations.');
  }

  // ---------------------------------------------------------------------------
  // Checkout page – search hotel & guest flow
  // ---------------------------------------------------------------------------
  static async searchHotelNameInTestBox(page: Page, hotelName: string) {
    const searchInput = HotelPageLocators.searchForHotelInputButton;
    await ElementHelper.clearAndEnterInTextField(page, searchInput, hotelName);
  }

  // ---------------------------------------------------------------------------
  // Checkout page – redeem points
  // ---------------------------------------------------------------------------
  static async redeampointTogglebutton(page: Page) {
    const toggleButtonLocator = HotelPageLocators.redeampointTogglebutton;
    await ElementHelper.clickElement(page, toggleButtonLocator);
  }

  static async redeamPointInputField(page: Page) {
    const inputFieldLocator = HotelPageLocators.redeamPointInputField;
    await ElementHelper.clearAndEnterInTextField(page, inputFieldLocator, idfcTestData.redeemPointSection.enterRedeemPoint);
  }

  static async editIconButtonForRedeem(page: Page) {
    const editIconLocator = HotelPageLocators.editIconButtonForRedeem;
    await ElementHelper.clickElement(page, editIconLocator);
  }

  static async savebuttonAfterRedeemEnter(page: Page) {
    const saveButtonLocator = HotelPageLocators.savebuttonAfterRedeemEnter;
    await ElementHelper.clickElement(page, saveButtonLocator);
  }

  static async getDiscountAmountText(page: Page): Promise<number> {
    const discountAmountText =
      await ElementHelper.getTextFromElement(
        page,
        HotelPageLocators.getDiscountAmountText
      );
    return Number(
      discountAmountText?.replace(/[₹,\s]/g, '') || 0
    );
  }

  static async payAmountBeforeDiscountText(page: Page): Promise<number> {
    const beforeAmountText =
      await ElementHelper.getTextFromElement(
        page,
        HotelPageLocators.payButtonBeforeText
      );
    return Number(
      beforeAmountText?.replace(/[₹,\s]/g, '') || 0
    );
  }

  static async payAmountAfterDiscountText(page: Page): Promise<number> {
    const buttonText =
      await ElementHelper.getTextFromElement(
        page,
        HotelPageLocators.payButtonAfterDiscount
      );
    const match =
      buttonText?.match(/Pay\s*₹([\d,]+)/);
    return Number(
      match?.[1]?.replace(/,/g, '') || 0
    );
  }

  static async verifyDiscountCalculation(page: Page): Promise<void> {

    const discountAmount =
      await this.getDiscountAmountText(page);

    const beforeAmount =
      await this.payAmountBeforeDiscountText(page);

    const afterAmount =
      await this.payAmountAfterDiscountText(page);

    console.log(`Discount Amount : ${discountAmount}`);
    console.log(`Before Amount   : ${beforeAmount}`);
    console.log(`After Amount    : ${afterAmount}`);

    expect(
      beforeAmount - discountAmount
    ).toBe(
      afterAmount
    );

    console.log(
      `✅ Verified: ${beforeAmount} - ${discountAmount} = ${afterAmount}`
    );
  }

  // ---------------------------------------------------------------------------
  // NOT USED METHODS
  // ---------------------------------------------------------------------------
  static async fillFirstName(page: Page, testdata: any) {
    await page.locator(HotelPageLocators.firstNameField).fill(testdata.firstName);
    console.log(`Filled first name: ${testdata.firstName}`);
  }

  static async fillLastName(page: Page, testdata: any) {
    await page.locator(HotelPageLocators.lastNameField).fill(testdata.lastName);
    console.log(`Filled last name: ${testdata.lastName}`);
  }

  static async clickPanCheckbox(page: Page) {
    await page.locator(HotelPageLocators.panCheckbox).check();
    console.log('Clicked PAN checkbox');
  }

  static async clickAssignGuestToRoomButton(page: Page) {
    await page.locator(HotelPageLocators.assignGuestToRoomButton).click();
    console.log('Assigned guest to room');
  }

  static async clickSavedGuestCheckbox(page: Page) {
    const checkbox = page.locator(HotelPageLocators.savedGuestCheckbox);
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();
    await checkbox.click();
    console.log('Saved guest checkbox clicked successfully');
  }

  static async payButtonAfterDiscount(page: Page) {
    const payButtonLocator = HotelPageLocators.payButtonAfterDiscount;
    await ElementHelper.clickElement(page, payButtonLocator);
  }

  
  static async getCheckoutPayButtonText(page: Page): Promise<string | null> {
    return await ElementHelper.getTextFromElement(page,PaymentPageLocators.checkoutPayButton );
}  

static async verifyCheckoutPayButtonAmount(page: Page): Promise<void> {
  const afterDiscountAmount = await this.payAmountAfterDiscountText(page);
  const checkoutAmount = await this.getCheckoutPayButtonText(page);

  expect(afterDiscountAmount).toBe(checkoutAmount);

  console.log(`✅ Verified: ${checkoutAmount} = ${afterDiscountAmount}`);
}

}
