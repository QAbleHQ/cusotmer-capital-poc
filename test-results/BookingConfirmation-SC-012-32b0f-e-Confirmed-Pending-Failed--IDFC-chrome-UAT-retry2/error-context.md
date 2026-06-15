# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\IDFC\BookingConfirmation.test.ts >> SC_012: Booking Confirmation Page (Confirmed/Pending/Failed)
- Location: tests\IDFC\BookingConfirmation.test.ts:18:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('//input[@id="password"]')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('//input[@id="password"]')

```

```yaml
- img
- paragraph: Processing Payment Please wait while we redirect you
- text: DO NOT CLOSE OR REFRESH THE PAGE
```

# Test source

```ts
  33  |     }
  34  |   }
  35  | 
  36  |   static async clickConfirmBackButton(page: Page) {
  37  |     await ElementHelper.clickElement(page, PaymentPageLocators.confirmBackButton);
  38  |   }
  39  | 
  40  |   static async verifyCardOptions(page: Page) {
  41  |     await page.waitForSelector(PaymentPageLocators.cardOptionSelector, { state: 'visible' });
  42  |     const options = await page.$$eval(PaymentPageLocators.cardOptionSelector, els => els.map(el => el.textContent?.trim()));
  43  |     console.log('Available card options:', options);
  44  |   }
  45  | 
  46  |   static async clickCardOptionSelector(page: Page) {
  47  |     await ElementHelper.clickElement(page, PaymentPageLocators.cardOptionSelector);
  48  |   }
  49  | 
  50  |   static async clickDebitCreditCardOption(page: Page) {
  51  |     await ElementHelper.clickElement(page, PaymentPageLocators.debitcreditcardOption);
  52  |   }
  53  | 
  54  |   static async enterCardNumber(page: Page, cardNumber: string) {
  55  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardNumberField, cardNumber);
  56  |   }
  57  | 
  58  |   static async enterCardExpiry(page: Page, expiry: string) {
  59  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardExpiryField, expiry);
  60  |   }
  61  | 
  62  |   static async enterCardCvv(page: Page, cvv: string) {
  63  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardCvvField, cvv);
  64  |   }
  65  | 
  66  |   static async enterCardOwnerName(page: Page, name: string) {
  67  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardownername, name);
  68  |   }
  69  | 
  70  |   static async fillCardNumber(page: Page) {
  71  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardNumberField, idfcTestData.paymentDataFill.cardNumber);
  72  |   }
  73  | 
  74  |   static async fillCardExpiry(page: Page) {
  75  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardExpiryField, idfcTestData.paymentDataFill.cardExpiry);
  76  |   }
  77  | 
  78  |   static async fillCardCvv(page: Page) {
  79  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardCvvField, idfcTestData.paymentDataFill.cardCvv);
  80  |   }
  81  | 
  82  |   static async fillCardName(page: Page) {
  83  |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.cardownername, idfcTestData.paymentDataFill.cardName);
  84  |   }
  85  | 
  86  |   static async verifyCardDetailsPageVisible(page: Page) {
  87  |     await expect(page.locator(PaymentPageLocators.cardNumberField)).toBeVisible();
  88  |     console.log('Card details page is visible.');
  89  |   }
  90  | 
  91  |   static async verifyCardFieldsVisible(page: Page) {
  92  |     await expect(page.locator(PaymentPageLocators.cardNumberField)).toBeVisible();
  93  |     await expect(page.locator(PaymentPageLocators.cardExpiryField)).toBeVisible();
  94  |     await expect(page.locator(PaymentPageLocators.cardCvvField)).toBeVisible();
  95  |     await expect(page.locator(PaymentPageLocators.cardownername)).toBeVisible();
  96  |     console.log('Card fields are visible.');
  97  |   }
  98  | 
  99  |   static async acceptSaveCardConsent(page: Page) {
  100 |     await ElementHelper.clickElement(page, PaymentPageLocators.saveCardPopup);
  101 |   }
  102 | 
  103 |   static async verifySaveCardPopup(page: Page) {
  104 |     await page.waitForSelector(PaymentPageLocators.saveCardPopup, { state: 'visible' });
  105 |     console.log('Save card popup is visible.');
  106 |   }
  107 | 
  108 |   static async verifySaveCardPopupVisible(page: Page) {
  109 |     await expect(page.locator(PaymentPageLocators.saveCardPopup)).toBeVisible();
  110 |     console.log('Save card popup is visible.');
  111 |   }
  112 | 
  113 |   static async clickWithoutSavingCardOption(page: Page) {
  114 |     await ElementHelper.clickElement(page, PaymentPageLocators.withoutSavingCardOption);
  115 |   }
  116 | 
  117 |   static async selectWithoutSavingCard(page: Page) {
  118 |     await ElementHelper.clickElement(page, PaymentPageLocators.withoutSavingCardOption);
  119 |   }
  120 | 
  121 |   static async clickCloseWithoutSaveButton(page: Page) {
  122 |     await ElementHelper.clickElement(page, PaymentPageLocators.closeWithoutSaveButton);
  123 |   }
  124 |   static async clickCancelPaymentSubmit(page: Page) {
  125 |     await ElementHelper.clickElement(page, PaymentPageLocators.cancelButton);
  126 |   }
  127 | 
  128 |   static async clickCancelPaymentDismiss(page: Page) {
  129 |     await ElementHelper.clickElement(page, PaymentPageLocators.nocancelbutton);
  130 |   }
  131 | 
  132 |   static async verifyOtpPageVisibleandFillValue(page: Page) {
> 133 |     await expect(page.locator(PaymentPageLocators.otpInputField)).toBeVisible();
      |                                                                   ^ Error: expect(locator).toBeVisible() failed
  134 |     console.log('OTP page is visible.');
  135 |     await ElementHelper.clearAndEnterInTextField(page, PaymentPageLocators.otpInputField, idfcTestData.paymentDataFill.otp)
  136 |   }
  137 |   static async clickSubmitButton(page: Page) {
  138 |     await ElementHelper.clickElement(page, PaymentPageLocators.submitButton);
  139 |   }
  140 | 
  141 |   static async verifyOtpErrorMessage(page: Page) {
  142 |     await expect(page.locator(PaymentPageLocators.otpErrorMessage)).toBeVisible();
  143 |     console.log('OTP error message is visible for expired/invalid OTP.');
  144 |   }
  145 | 
  146 |   static async verifyBookingConfirmationPageVisible(page: Page): Promise<boolean> {
  147 |     const isVisible = await ElementHelper.isElementDisplayed(page, PaymentPageLocators.bookingConfirmationPage);
  148 |     if (isVisible) console.log('Booking confirmation page is visible.');
  149 |     return isVisible;
  150 |   }
  151 | 
  152 |   static async verifyBookingPendingPageVisible(page: Page): Promise<boolean> {
  153 |     const isVisible = await ElementHelper.isElementDisplayed(page, PaymentPageLocators.bookingPendingPage);
  154 |     if (isVisible) console.log('Booking pending page is visible.');
  155 |     return isVisible;
  156 |   }
  157 | 
  158 | 
  159 | 
  160 |   static async verifyBookingNotCreated(page: Page) {
  161 |     const bookingExists = await page.isVisible(PaymentPageLocators.bookingConfirmationPage);
  162 |     expect(bookingExists).toBeFalsy();
  163 |     console.log('Booking not created after cancellation.');
  164 |   }
  165 | 
  166 | }
  167 | 
```