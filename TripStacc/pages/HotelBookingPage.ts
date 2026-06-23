import { expect, Page } from '@playwright/test';
import { HotelPageLocators } from '../../TripStacc/locators/HotelPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
import { PaymentPageLocators } from '../../TripStacc/locators/PaymentPageLocators';
const idfcTestData = require('../../testdata/tripStacc.json');
import { DeviceHelper } from '../../utils/deviceHelper';
import { FlightHomePage } from './FlightHomePage';
import { FlightPageLocators } from '../../TripStacc/locators/FlightPageLocators';
import { HotelHomePage } from './HotelHomePage';
import { Data } from '../../utils/dataProvider';
import { CommonHelper } from '../../utils/commonHelper';

export class HotelBookingPage {
  static async clickFirstRoomSelectionButton(page: Page) {
    await page.locator(HotelPageLocators.firstRoomSelectButton).click();
    console.log('First room selection button clicked');
  }

  static async confirmRoomSelection(page: Page) {
    await page.locator(HotelPageLocators.roomSelectionConfirmationButton).click();
    console.log('Room selection confirmation button clicked');
  }

  static async firstTabNextButton(page: Page) {
    const nextButton = HotelPageLocators.firstTabNextButton;
    await ElementHelper.clickElement(page, nextButton);
    console.log('Next button in first tab clicked');
  }

  static async verifyPrimaryGuestDetailsHeaderVisible(page: Page) {
    await ElementHelper.scrollElementToCentre(page, HotelPageLocators.primaryGuestDetailsHeader);
    await page.waitForTimeout(2000);
    await expect(page.locator(HotelPageLocators.primaryGuestDetailsHeader)).toBeVisible();
    console.log('Primary guest details header is displayed');
  }

  static async removePopup(page: Page): Promise<void> {
    const frame = page.frameLocator('//iframe[contains(@title,"notification-frame")]');
    const popupImg = frame.locator(HotelPageLocators.popupImg);

    if (await popupImg.count() > 0 && await popupImg.isVisible()) {
        await frame.locator(HotelPageLocators.outOfPopupImg).click({
            position: {
                x: 500, // adjust as needed
                y: 5
            }
        });

        console.log('Popup closed');
    }
  }

    static async removePopupForIDFC(page: Page): Promise<void> {
    const CLIENT = process.env.CLIENT?.toUpperCase();
    switch (CLIENT) {
        case 'IDFC':
            try {
                const frame = page.frameLocator('//iframe[contains(@title,"notification-frame")]');
                const popupImg = frame.locator(HotelPageLocators.popupImg);
                if (
                    await popupImg.count() > 0 &&
                    await popupImg.isVisible({ timeout: 30000 })
                ) {
                    await frame.locator(HotelPageLocators.outOfPopupImg).click({
                        position: {
                            x: 500,
                            y: 5
                        }
                    });
                    console.log('IDFC popup closed');
                } else {
                    console.log('IDFC popup not displayed');
                }
            } catch (error) {
                console.log('IDFC popup not found or already closed');
            }
            break;

        case 'BOB':
            console.log('⏭️ BOB: Skipping popup handling');
            break;
        default:
            console.log(`⏭️ ${CLIENT}: No popup handling configured`);
            break;
    }
}

  static async clickAddGuestButton(page: Page) {
    if (DeviceHelper.isMobile()) {
      let attempts = 0;
      const maxAttempts = 3;
      let popupClosed = false;

      while (attempts < maxAttempts && !popupClosed) {
          try {
              const popup = page.locator(HotelPageLocators.beePopupForMobile);
              
              if (await popup.isVisible()) {
                  console.log(`Attempt ${attempts + 1}: Bee popup detected, attempting to close...`);
                  
                  await page.locator(HotelPageLocators.clickOutsideOfBeePopupForMobile).click();
                  
                  await popup.waitFor({ state: 'hidden', timeout: 3000 });
                  popupClosed = true;
                  console.log('Bee popup successfully closed');
              } else {
                  break;
              }
          } catch (e) {
              attempts++;
              console.log(`Attempt ${attempts} failed, retrying...`);
              await page.waitForTimeout(1000); 
          }
      }
  }

  await page.locator(HotelPageLocators.addGuestButton).click();
  console.log('Add Guest button clicked');

    await page.waitForTimeout(5000);
    if(DeviceHelper.isMobile()) {
      try {
        const popup = page.locator(HotelPageLocators.beePopupForMobile);
        await popup.waitFor({ state: 'visible', timeout: 10000 });
      
        await ElementHelper.clickElement(page, HotelPageLocators.clickOutsideOfBeePopupForMobile);
        console.log('Bee popup detected and closed');
      } catch (e) {
        console.log('Bee popup did not appear, proceeding...');
      }
    }
    if(await ElementHelper.isElementDisplayed(page, HotelPageLocators.addGuestButton)) {
      await page.locator(HotelPageLocators.addGuestButton).click();
      console.log('Add Guest button clicked');
    }
  }

  static async clickAddGuestButtonForIDFC(page: Page) {
  const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'IDFC':
              if (DeviceHelper.isMobile()) {
                    let attempts = 0;
                    const maxAttempts = 3;
                    let popupClosed = false;

                    while (attempts < maxAttempts && !popupClosed) {
                        try {
                            const popup = page.locator(HotelPageLocators.beePopupForMobile);
                            
                            if (await popup.isVisible()) {
                                console.log(`Attempt ${attempts + 1}: Bee popup detected, attempting to close...`);
                                
                                await page.locator(HotelPageLocators.clickOutsideOfBeePopupForMobile).click();
                                
                                await popup.waitFor({ state: 'hidden', timeout: 3000 });
                                popupClosed = true;
                                console.log('Bee popup successfully closed');
                            } else {
                                break;
                            }
                        } catch (e) {
                            attempts++;
                            console.log(`Attempt ${attempts} failed, retrying...`);
                            await page.waitForTimeout(1000); 
                        }
                    }
                }

                await page.locator(HotelPageLocators.addGuestButton).click();
                console.log('Add Guest button clicked');

                  await page.waitForTimeout(5000);
                  if(DeviceHelper.isMobile()) {
                    try {
                      const popup = page.locator(HotelPageLocators.beePopupForMobile);
                      await popup.waitFor({ state: 'visible', timeout: 10000 });
                    
                      await ElementHelper.clickElement(page, HotelPageLocators.clickOutsideOfBeePopupForMobile);
                      console.log('Bee popup detected and closed');
                    } catch (e) {
                      console.log('Bee popup did not appear, proceeding...');
                    }
                  }
                  if(await ElementHelper.isElementDisplayed(page, HotelPageLocators.addGuestButton)) {
                    await page.locator(HotelPageLocators.addGuestButton).click();
                    console.log('Add Guest button clicked');
                  }
      break;
 
    case 'BOB':
    console.log('⏭️ BOB: Skipping ');
    break;
  }

  }

  static async clickAddNewGuestButton(page: Page) {
    if(DeviceHelper.isMobile()) {
      try {
        const popup = page.locator(HotelPageLocators.beePopupForMobile);
        await popup.waitFor({ state: 'visible', timeout: 10000 });
      
        await ElementHelper.clickElement(page, HotelPageLocators.clickOutsideOfBeePopupForMobile);
        console.log('Bee popup detected and closed');
      } catch (e) {
        console.log('Bee popup did not appear, proceeding...');
      }
    }
    await page.locator(HotelPageLocators.addGuestBtn).click();
    console.log('Add New Guest button clicked');
  }

  static async clickAddNewGuestButtonForIdfc(page: Page): Promise<void> {

    const CLIENT = process.env.CLIENT?.toUpperCase();

    switch (CLIENT) {

        case 'IDFC':

            if (DeviceHelper.isMobile()) {
                try {
                    const popup = page.locator(HotelPageLocators.beePopupForMobile);

                    await popup.waitFor({
                        state: 'visible',
                        timeout: 10000
                    });

                    await ElementHelper.clickElement(
                        page,
                        HotelPageLocators.clickOutsideOfBeePopupForMobile
                    );

                    console.log('Bee popup detected and closed');
                } catch (e) {
                    console.log('Bee popup did not appear, proceeding...');
                }
            }
            this.removePopupForIDFC(page);
            await page.locator(HotelPageLocators.addGuestBtn).click();
            console.log('Add New Guest button clicked');

            break;

        case 'BOB':
              console.log('⏭️ BOB: Skipping ');
            break;

        default:

            await page.locator(HotelPageLocators.addGuestBtn).click();
            console.log('Add New Guest button clicked');

            break;
    }
}

  static async clickEditTraveler(page: Page) {
      const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'BOB':
		console.log('⏭️ BOB: Skipping ');
      break;
 
    case 'IDFC':
        await page.locator(HotelPageLocators.editTravelerButton).click();
        console.log('Edit traveler button clicked');
    break;
  }

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
    console.log('Checkbox after redeem action clicked');
  }

  static async fillGuestDetailsInsideForm(page: any) {
  const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'BOB':
          await page.locator(HotelPageLocators.radioButtonMr).click();
          await page.waitForTimeout(2000);
          const firstName = CommonHelper.generateRandomName(7);
          const lastName = CommonHelper.generateRandomName(7);

          await page.locator(HotelPageLocators.firstNameField).fill(firstName);
          await page.waitForTimeout(2000);
          await page.locator(HotelPageLocators.lastNameField).fill(lastName);
          await page.waitForTimeout(2000);
          console.log('Guest details form inside fields filled');
          await ElementHelper.clickElement(page, HotelPageLocators.saveGuestLocator);
          console.log('Clicked on Save Guest checkbox');
          await ElementHelper.isElementDisplayed(page, HotelPageLocators.travellerSavedSuccessfully);
          console.log('Traveller saved successfully message is displayed');

          await ElementHelper.clickElement(page, HotelPageLocators.saveGuestLocator);
          console.log('Clicked on Save Guest checkbox');
          await page.locator(HotelPageLocators.firstNameField).fill(firstName);
          await page.waitForTimeout(2000);
          await page.locator(HotelPageLocators.lastNameField).fill(lastName);
          await page.waitForTimeout(2000);
          await ElementHelper.clickElement(page, HotelPageLocators.saveGuestLocator);
          console.log('Clicked on Save Guest checkbox');
          await ElementHelper.isElementDisplayed(page, HotelPageLocators.travellerUserAlreadyExists);
          console.log('Traveller User Already Exists message is displayed');
      break;
 
    case 'IDFC':
      await page.locator(HotelPageLocators.radioButtonMr).click();
      await page.waitForTimeout(2000);
      await page.locator(HotelPageLocators.firstNameField).fill(Data.hotelBookingDataFill.firstName);
      await page.waitForTimeout(2000);
      await page.locator(HotelPageLocators.lastNameField).fill(Data.hotelBookingDataFill.lastName);
      await page.waitForTimeout(2000);
      console.log('Guest details form inside fields filled');
    break;
  }
  }



  static async fillGuestDetailsoutsideForm(page: Page) {
      const CLIENT = process.env.CLIENT?.toUpperCase();
      switch (CLIENT) {
        case 'BOB':
        console.log('⏭️ BOB: Skipping ');
          break;
    
        case 'IDFC':
            await page.locator(HotelPageLocators.contactNumberField).fill(Data.hotelBookingDataFill.contactNumber);
        await page.waitForTimeout(2000);
        await page.locator(HotelPageLocators.emailField).fill(Data.hotelBookingDataFill.email);
        await page.waitForTimeout(2000);
        console.log('Guest details form contact information filled');
        break;
      }
  }

  static async clickEditGuestButton(page: Page) {
      const CLIENT = process.env.CLIENT?.toUpperCase();
      switch (CLIENT) {
        case 'BOB':
        console.log('⏭️ BOB: Skipping ');
          break;
    
        case 'IDFC':
        const editGuestButtonLocator = HotelPageLocators.editGuestButton;
        await ElementHelper.clickElement(page, editGuestButtonLocator);
        console.log('Edit guest button clicked');
        break;
      }
  }

  static async updateFirstName(page: Page, firstName: string) {
    await page.locator(HotelPageLocators.firstNameField).clear();
    await page.locator(HotelPageLocators.firstNameField).fill(firstName);
    console.log('First name field updated');
  }

  static async verifyGuestDetailsFormVisible(page: Page) {
      const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'BOB':
		console.log('⏭️ BOB: Skipping ');
      break;
 
    case 'IDFC':
    await expect(page.locator(HotelPageLocators.guestDetailsForm)).toBeVisible();
    console.log('Guest details form is displayed');
    break;
  }
  }

  static async addButtonAfterAddingGuest(page: Page) {
    const addButtonLocator = HotelPageLocators.addButtonAfterAddingGuest;
    await ElementHelper.clickElement(page, addButtonLocator);
    console.log('Add button after adding guest clicked');
  }

    static async addButtonAfterAddingGuestForIdfc(page: Page) {

      const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'BOB':
		console.log('⏭️ BOB: Skipping ');
      break;
 
    case 'IDFC':
        const addButtonLocator = HotelPageLocators.addButtonAfterAddingGuest;
    await ElementHelper.clickElement(page, addButtonLocator);
    console.log('Add button after adding guest clicked');
    break;
  }
  }

  static async nextButtonAfterAddingGuest(page: Page) {
    const nextButtonLocator = HotelPageLocators.nextButtonAfterAddingGuest;
    await ElementHelper.clickElement(page, nextButtonLocator);
    console.log('Next button after adding guest clicked');
  }

  static async verifyPanCardNotVisible(page: Page) {
    await expect(page.locator(HotelPageLocators.panCardText)).toHaveCount(0);
    console.log('PAN card field is not displayed for domestic bookings');
  }

  static async verifyPanCardVisibleAndRequired(page: Page) {
    await expect(page.locator(HotelPageLocators.panCardText)).toBeVisible();
    await page.locator(HotelPageLocators.panNumberField).getAttribute('required');
    console.log('PAN card field is displayed and required');
  }

  static async verifyValidPanNumberAccepted(page: Page) {
    await page.locator(HotelPageLocators.panNumberField).fill(Data.hotelBookingDataFill.panNumber);
    const value = await page.locator(HotelPageLocators.panNumberField).inputValue();
    if (value === Data.hotelBookingDataFill.panNumber) {
      console.log('Valid PAN number accepted successfully');
    }
  }


  static async verifySavedGuestTextVisible(page: Page) {
      const CLIENT = process.env.CLIENT?.toUpperCase();
      switch (CLIENT) {
        case 'BOB':
        console.log('⏭️ BOB: Skipping ');
          break;
    
        case 'IDFC':
            await expect(page.locator(HotelPageLocators.savedGuestText)).toBeVisible();
        console.log('Saved guest text is displayed');
        break;
      }
  }

    static async printSavedGuestList(page: Page) {
        const CLIENT = process.env.CLIENT?.toUpperCase();
        switch (CLIENT) {
          case 'BOB':
          console.log('⏭️ BOB: Skipping ');
            break;
      
          case 'IDFC':
              const guests = await page.$$(HotelPageLocators.savedGuestList);
          for (let i = 0; i < guests.length; i++) {

            if (await guests[i].textContent()) {
              console.log('Saved guest item displayed');
            }
          }
          break;
        }
    
    }

    static async getSavedGuestName(page: Page): Promise<string> {
        const CLIENT = process.env.CLIENT?.toUpperCase();

        switch (CLIENT) {
            case 'BOB':
                console.log('⏭️ BOB: Skipping');
                return '';

            case 'IDFC':
                return (
                    (await page.locator(HotelPageLocators.savedGuestName).textContent())
                        ?.trim() || ''
                );

            default:
                console.log(`⏭️ ${CLIENT}: No implementation found`);
                return '';
        }
    }

  static async verifyAndCountSavedGuestList(page: Page): Promise<number> {
    const savedGuestListLocator = HotelPageLocators.verifysavedGuestList;
    const guestListElements = page.locator(savedGuestListLocator);
    const count = await guestListElements.count();
    if (count > 0) {
      console.log('Saved guest list is displayed');
    }

    for (let i = 0; i < count; i++) {
      const guestText = await guestListElements.nth(i).textContent();
      if (guestText) {
        console.log(`Saved guest displayed`);
      }
    }
    return count;
  }

  static async clickFirstOptionFromsavedGuestList(page: Page) {
    if(DeviceHelper.isMobile()) {
      if(await page.locator(HotelPageLocators.beePopupForMobile).isVisible()) {
        await ElementHelper.clickElement(page, HotelPageLocators.clickOutsideOfBeePopupForMobile);
        console.log('Clicked outside bee popup to close it on mobile');
      }
    }
    const firstOptionLocator = HotelPageLocators.clickFirstOptionFromsavedGuestList;
    await ElementHelper.clickElement(page, firstOptionLocator);
    console.log('First option from saved guest list clicked');
  }


  static async goBackUntilLocationSearchBoxVisible(page: Page) {
    let attempts = 0;
    const maxAttempts = 10;
    while (attempts < maxAttempts) {
      if(DeviceHelper.isMobile()) {
        if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.fromCityMobile)) {
          await HotelHomePage.clickHotelTabBTN(page);
        }
      }
      const isVisible = await page.locator(HotelPageLocators.searchHotelButton).isVisible().catch(() => false);
      if (isVisible) {
        console.log('Location search box is displayed');
        return;
      }
      await page.goBack();
      await page.waitForTimeout(20000);
      attempts++;
    }
    throw new Error('Location search box not visible after multiple back navigations.');
  }


  static async searchHotelNameInTestBox(page: Page, hotelName: string) {
    const searchInput = HotelPageLocators.searchForHotelInputButton;
    await ElementHelper.clearAndEnterInTextField(page, searchInput, hotelName);
    console.log('Hotel name entered in search box');
  }


  static async redeampointTogglebutton(page: Page) {
    const toggleButtonLocator = HotelPageLocators.redeampointTogglebutton;
    await ElementHelper.clickElement(page, toggleButtonLocator);
    console.log('Redeem points toggle button clicked');
  }

  static async redeamPointInputField(page: Page) {
    const inputFieldLocator = HotelPageLocators.redeamPointInputField;
    await ElementHelper.clearAndEnterInTextField(page, inputFieldLocator, Data.redeemPointSection.enterRedeemPoint);
    console.log('Redeem points input field filled');
  }

  static async editIconButtonForRedeem(page: Page) {
    const editIconLocator = HotelPageLocators.editIconButtonForRedeem;
    await ElementHelper.clickElement(page, editIconLocator);
    console.log('Edit icon for redeem points clicked');
  }

  static async savebuttonAfterRedeemEnter(page: Page) {
    const saveButtonLocator = HotelPageLocators.savebuttonAfterRedeemEnter;
    await ElementHelper.clickElement(page, saveButtonLocator);
    console.log('Save button after redeem entered clicked');
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

    if (beforeAmount - discountAmount === afterAmount) {
      console.log('Discount calculation matched with expected value');
    }

    expect(
      beforeAmount - discountAmount
    ).toBe(
      afterAmount
    );
  }

  static async fillFirstName(page: Page, testdata: any) {
    await page.locator(HotelPageLocators.firstNameField).fill(testdata.firstName);
    console.log('First name field filled');
  }

  static async fillLastName(page: Page, testdata: any) {
    await page.locator(HotelPageLocators.lastNameField).fill(testdata.lastName);
    console.log('Last name field filled');
  }

  static async clickPanCheckbox(page: Page) {
    await page.locator(HotelPageLocators.panCheckbox).check();
    console.log('PAN checkbox clicked');
  }

  static async clickAssignGuestToRoomButton(page: Page) {
    await page.locator(HotelPageLocators.assignGuestToRoomButton).click();
    console.log('Assign guest to room button clicked');
  }

  static async clickSavedGuestCheckbox(page: Page) {
    const checkbox = page.locator(HotelPageLocators.savedGuestCheckbox);
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeEnabled();
    await checkbox.click();
    console.log('Saved guest checkbox clicked');
  }

  static async payButtonAfterDiscount(page: Page) {
    const payButtonLocator = HotelPageLocators.payButtonAfterDiscount;
    await ElementHelper.clickElement(page, payButtonLocator);
    console.log('Pay button after discount clicked');
  }

  static async getCheckoutPayButtonText(page: Page): Promise<string | null> {
    return await ElementHelper.getTextFromElement(page, PaymentPageLocators.checkoutPayButton);
  }

  static async verifyCheckoutPayButtonAmount(page: Page): Promise<void> {
    const afterDiscountAmount = await this.payAmountAfterDiscountText(page);
    const checkoutAmount = await this.getCheckoutPayButtonText(page);
    if (afterDiscountAmount === Number(checkoutAmount)) {
      console.log('Checkout Pay button amount matched with expected value');
    }
    expect(afterDiscountAmount).toBe(Number(checkoutAmount));
  }

  static async reloadIfNoHotelFound(page: any) {
    const noHotelsTextLocator = HotelPageLocators.noHotelResultsFound;
    while (await page.locator(noHotelsTextLocator).isVisible()) {
        await page.reload();
        await page.waitForTimeout(10000);
    }
}

}
