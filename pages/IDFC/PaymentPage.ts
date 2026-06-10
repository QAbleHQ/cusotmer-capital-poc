import { expect, Page } from '@playwright/test';
import { PaymentPageLocators } from '../../locators/idfc/PaymentPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
const idfcTestData = require('../../testdata/idfctestdata.json');

export class PaymentPage {

  // ---------------------------------------------------------------------------
  // Payment page – checkout summary & pay CTA
  // ---------------------------------------------------------------------------
  static async clickCheckoutPayButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.checkoutPayButton);
  }

  static async verifyCheckoutPayButton(page: Page) {
    await page.waitForSelector(PaymentPageLocators.checkoutPayButton, { state: 'visible' });
    const payableText = await page.textContent(PaymentPageLocators.checkoutPayButton);
    console.log(`This amount is payable: ${payableText}`);
  }

  static async clickProceedButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.proceedButton);
  }

  static async proceedWithPayment(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.proceedButton);
    console.log('Proceeded with payment.');
  }

  static async clickBackIconButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.backIconButton);
  }

  static async clickConfirmBackButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.confirmBackButton);
  }

  // ---------------------------------------------------------------------------
  // Payment page – payment method selection
  // ---------------------------------------------------------------------------
  static async verifyCardOptions(page: Page) {
    await page.waitForSelector(PaymentPageLocators.cardOptionSelector, { state: 'visible' });
    const options = await page.$$eval(PaymentPageLocators.cardOptionSelector, els => els.map(el => el.textContent?.trim()));
    console.log('Available card options:', options);
  }

  static async clickCardOptionSelector(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.cardOptionSelector);
  }

  static async clickDebitCreditCardOption(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.debitcreditcardOption);
  }

  // ---------------------------------------------------------------------------
  // Payment page – card details form
  // ---------------------------------------------------------------------------
  static async enterCardNumber(page: Page, cardNumber: string) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardNumberField, cardNumber);
  }

  static async enterCardExpiry(page: Page, expiry: string) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardExpiryField, expiry);
  }

  static async enterCardCvv(page: Page, cvv: string) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardCvvField, cvv);
  }

  static async enterCardOwnerName(page: Page, name: string) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardownername, name);
  }

  static async fillCardNumber(page: Page) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardNumberField, idfcTestData.paymentDataFill.cardNumber);
  }

  static async fillCardExpiry(page: Page) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardExpiryField, idfcTestData.paymentDataFill.cardExpiry);
  }

  static async fillCardCvv(page: Page) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardCvvField, idfcTestData.paymentDataFill.cardCvv);
  }

  static async fillCardName(page: Page) {
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardownername, idfcTestData.paymentDataFill.cardName);
  }

  static async verifyCardDetailsPageVisible(page: Page) {
    await expect(page.locator(PaymentPageLocators.cardNumberField)).toBeVisible();
    console.log('Card details page is visible.');
  }

  static async verifyCardFieldsVisible(page: Page) {
    await expect(page.locator(PaymentPageLocators.cardNumberField)).toBeVisible();
    await expect(page.locator(PaymentPageLocators.cardExpiryField)).toBeVisible();
    await expect(page.locator(PaymentPageLocators.cardCvvField)).toBeVisible();
    await expect(page.locator(PaymentPageLocators.cardownername)).toBeVisible();
    console.log('Card fields are visible.');
  }

  // ---------------------------------------------------------------------------
  // Payment page – save card consent popup
  // ---------------------------------------------------------------------------
  static async acceptSaveCardConsent(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.saveCardPopup);
  }

  static async verifySaveCardPopup(page: Page) {
    await page.waitForSelector(PaymentPageLocators.saveCardPopup, { state: 'visible' });
    console.log('Save card popup is visible.');
  }

  static async verifySaveCardPopupVisible(page: Page) {
    await expect(page.locator(PaymentPageLocators.saveCardPopup)).toBeVisible();
    console.log('Save card popup is visible.');
  }

  static async clickWithoutSavingCardOption(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.withoutSavingCardOption);
  }

  static async selectWithoutSavingCard(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.withoutSavingCardOption);
  }

  static async clickCloseWithoutSaveButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.closeWithoutSaveButton);
  }
  // ---------------------------------------------------------------------------
  // Payment page – cancel payment dialog
  // ---------------------------------------------------------------------------
  static async clickCancelPaymentSubmit(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.cancelButton);
  }

  static async clickCancelPaymentDismiss(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.nocancelbutton);
  }

  // ---------------------------------------------------------------------------
  // Payment page – OTP verification
  // ---------------------------------------------------------------------------
  static async verifyOtpPageVisibleandFillValue(page: Page) {
    await expect(page.locator(PaymentPageLocators.otpInputField)).toBeVisible();
    console.log('OTP page is visible.');
    await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.otpInputField, idfcTestData.paymentDataFill.otp)
  }
  static async clickSubmitButton(page: Page) {
    await ElementHelper.clickElement(page, PaymentPageLocators.submitButton);
  }

  static async verifyOtpErrorMessage(page: Page) {
    await expect(page.locator(PaymentPageLocators.otpErrorMessage)).toBeVisible();
    console.log('OTP error message is visible for expired/invalid OTP.');
  }

  // ---------------------------------------------------------------------------
  // Payment page – booking confirmation
  // ---------------------------------------------------------------------------
  static async verifyBookingConfirmationPageVisible(page: Page) {
    await expect(page.locator(PaymentPageLocators.bookingConfirmationPage)).toBeVisible();
    console.log('Booking confirmation page is visible.');
  }

  static async verifyBookingNotCreated(page: Page) {
    const bookingExists = await page.isVisible(PaymentPageLocators.bookingConfirmationPage);
    expect(bookingExists).toBeFalsy();
    console.log('Booking not created after cancellation.');
  }

}
