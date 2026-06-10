export const PaymentPageLocators = {

  // ---------------------------------------------------------------------------
  // Payment page – checkout summary & pay CTA
  // ---------------------------------------------------------------------------
  checkoutPayButton: `//small[@id='amount-impression']`,
  proceedButton: `//button[@class="common-btn" and normalize-space()="PROCEED"]`,
  backIconButton: `//button[@class='back-btn']`,
  confirmBackButton: `//button[@class="common-btn txt-btn"]`,

  // ---------------------------------------------------------------------------
  // Payment page – payment method selection
  // ---------------------------------------------------------------------------
  cardOptionSelector: `//div[@class='boxedPaymentOptions']//ul//li`,
  debitcreditcardOption: `//div[@class='boxedPaymentOptions']//ul//li[1]`,

  // ---------------------------------------------------------------------------
  // Payment page – card details form 
  // ---------------------------------------------------------------------------
  cardNumberField: `//input[@id='cardNumber']`,
  cardExpiryField: `//input[@id='cardExpiry']`,
  cardCvvField: `//input[@id='cardCvv']`,
  cardownername: `//input[@id='cardOwnerName']`,
  payotp:`//input[@id='password']`,

  // ---------------------------------------------------------------------------
  // Payment page – save card consent popup
  // ---------------------------------------------------------------------------
  saveCardPopup: `//input[@id='userConsentCheckbox']`,
  withoutSavingCardOption: `//label[@for='withoutSavingCard']`,
  closeWithoutSaveButton: `//button[@data-testid="closeWithoutSave"]`,


  // ---------------------------------------------------------------------------
  // Payment page – cancel payment dialog
  // ---------------------------------------------------------------------------
  canceltext: `//h3[text()='Cancel Payment']`,
  cancelButton: `//button[@data-testid='submit']`,
  nocancelbutton: `//button[@data-testid='cancel']`,

  // ---------------------------------------------------------------------------
  // Payment page – OTP verification
  // ---------------------------------------------------------------------------
  otpInputField: `//input[@id="password"]`,


  // ---------------------------------------------------------------------------
  // Payment page – booking confirmation
  // ---------------------------------------------------------------------------
  paybutton:`//input[@id='submitBtn']`,
  bookingConfirmationPage: `//h4[text()='Booking Confirmed']`,
  bookingreferenceNumber: `//p[@class='book_ref_no']`,
  invalidOtpError:`//p[@id='OTPStatus']`,

  // ---------------------------------------------------------------------------
  // Payment page – OTP error message
  // ---------------------------------------------------------------------------
  otpErrorMessage: `//span[contains(@class,'error')]`,
  submitButton: `//input[@id='submitBtn']`,

  
};
