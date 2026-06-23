# Playwright Framework — Coding Rules & Standards

This document is the authoritative guide for writing and organising code in this repository.
Any AI assistant or developer must follow these rules when creating or editing files.

---

## Project Structure

```
cusotmer-capital-poc/
├── locators/
│   ├── bob/          ← lowercase client name
│   └── idfc/
├── pages/
│   ├── BOB/          ← UPPERCASE client name
│   ├── IDFC/
│   └── Common/
├── tests/
│   ├── BOB/          ← UPPERCASE client name
│   └── IDFC/
├── utils/
│   ├── elementHelper.ts
│   ├── verificationHelper.ts
│   ├── commonHelper.ts
│   ├── browserHelper.ts
│   └── deviceHelper.ts
├── testdata/
│   ├── bobtestdata.json
│   └── idfctestdata.json
└── config/
    ├── BOB.config.ts
    └── IDFC.config.ts
```

**Folder name casing rule:**
- `locators/` subfolders → **lowercase** (`bob/`, `idfc/`)
- `pages/` and `tests/` subfolders → **UPPERCASE** (`BOB/`, `IDFC/`)

---

## 1. Locators

### File naming
- Pattern: `{PageName}Locators.ts`
- Examples: `LoginPageLocators.ts`, `HomePageLocators.ts`, `CheckoutPageLocators.ts`
- Location: `locators/{client}/` where client is **lowercase** (`bob`, `idfc`)

### File structure
```typescript
export const {PageName}Locators = {
  keyName: `xpath_or_selector`,
  keyName: `xpath_or_selector`,
};
```

### Key naming
- **camelCase** only
- Names must describe what the element IS, not what it does
- Good: `mobileNumberField`, `getOtpButton`, `skipButtonInsideDialogBox`
- Bad: `clickOtp`, `btn1`, `elem`

### Selector rules
- **Prefer XPath** over CSS selectors
- Use template literals (backticks) for most selectors
- Use double-quoted strings `"..."` only for XPath that contains single quotes inside
- For indexed elements use `(//xpath)[n]` — example: `(//span[@class='price'])[1]`
- Prefer `[@id='...']` and `[@class='...']` attributes for stability
- Never hardcode dynamic values (prices, counts, user data) into locators

```typescript
// Correct
export const LoginPageLocators = {
  mobileNumberField: `//input[@id='txtMobileNo']`,
  getOtpButton:      `//button[@id='btnLogin']`,
  otpInputField:     `//div[@class='otp-warpper']//input`,
  DialogBox:         `//dialog[@aria-describedby="tour_step_0-description"]`,
};
```

### One file per page
Each page in the application gets exactly one locator file.
Do not mix BOB and IDFC locators in the same file.

---

## 2. Pages

### File naming
- Pattern: `{PageName}.ts`
- Examples: `LoginPage.ts`, `HomePage.ts`, `Checkoutpage.ts`
- Location: `pages/{CLIENT}/` where CLIENT is **UPPERCASE** (`BOB`, `IDFC`)
- Shared helpers go in `pages/Common/`

### Class structure
```typescript
import { Page } from '@playwright/test';
import { {PageName}Locators } from '../../locators/{client}/{PageName}Locators';
import { ElementHelper } from '../../utils/elementHelper';
import { VerificationHelpers } from '../../utils/verificationHelper';
import {client}TestData from '../../testdata/{client}testdata.json';

export class {PageName} {
  static async methodName(page: Page): Promise<void> {
    // implementation
  }
}
```

### Method rules

**All methods must be:**
- `static async`
- First parameter is always `page: Page`
- Return type is `Promise<void>` unless returning data

**Method naming:**
| Prefix | Use for |
|--------|---------|
| `verify…` | Assert something is visible / has a value |
| `click…` | Click an element |
| `enter…` | Type into a field |
| `navigate…` | Go to a URL or page |
| `scroll…` | Scroll to an element or position |
| `get…` | Return a value from the page |
| `wait…` | Wait for a condition |
| `select…` | Choose a dropdown option |

**Locator assignment:**
Always assign the locator to a named `const` before passing to a helper — do not inline the locator call.

```typescript
// Correct
static async clickGetOtpButton(page: Page): Promise<void> {
  const otpButton = LoginPageLocators.getOtpButton;
  await ElementHelper.clickElement(page, otpButton);
}

// Wrong — do not inline
static async clickGetOtpButton(page: Page): Promise<void> {
  await ElementHelper.clickElement(page, LoginPageLocators.getOtpButton);
}
```

**Logging:**
Every method must have a `console.log()` that describes what happened.

```typescript
static async enterMobileNumber(page: Page, mobileNumber: string): Promise<void> {
  const field = LoginPageLocators.mobileNumberField;
  await ElementHelper.clearAndEnterInTextField(page, field, mobileNumber);
  console.log('Mobile number entered');
}
```

**Composite methods (BeforeEach helpers):**
Group related login / setup steps into a single composite method so tests can call one line in `beforeEach`.

```typescript
static async LoginCredEnterBeforeEach(page: Page): Promise<void> {
  await LoginPage.enterMobileNumber(page, bobTestData.loginDataFill.mobileNumber);
  await LoginPage.clickGetOtpButton(page);
  await LoginPage.enterOtp(page, bobTestData.loginDataFill.otp);
  await LoginPage.clickLoginButton(page);
}
```

**Use helpers, not raw Playwright:**
Always go through `ElementHelper` or `VerificationHelpers` for interactions and assertions.
Use raw `page.locator()` only when the helper does not cover the use case (e.g., iterating a list, `nth()`, `count()`).

**Mobile vs desktop branching:**
Use `DeviceHelper.isMobile()` from `utils/deviceHelper.ts` when behaviour differs between viewports.

```typescript
import { DeviceHelper } from '../../utils/deviceHelper';

if (DeviceHelper.isMobile()) {
  await ElementHelper.clickElement(page, HomePageLocators.bugerMenuMobile);
} else {
  await ElementHelper.clickElement(page, HomePageLocators.giftcardoption);
}
```

---

## 3. Tests

### File naming
- Pattern: `{PageName}.test.ts`
- Examples: `LoginPage.test.ts`, `HomePage.test.ts`, `CheckoutPage.test.ts`
- Location: `tests/{CLIENT}/` where CLIENT is **UPPERCASE**

### File structure
```typescript
import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { {PageName} } from '../../pages/{CLIENT}/{PageName}';
import {client}TestData from '../../testdata/{client}testdata.json';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
  // add login call here if the test requires authentication
});
```

### Test naming
Pattern: `'SC_NNN, Short description of what is being verified'`

```typescript
test('SC_001, Login with valid mobile number and OTP', ...)
test('SC_004, Gift Card PLP — product card details and layout', ...)
```

### Tags
Every test **must** include a `tag` array in the options object.

```typescript
test('SC_001, Login with valid mobile number and OTP', {
  tag: ['@BOB', '@Login', '@Smoke', '@Sanity']
}, async () => { ... });
```

**Mandatory tags:**
| Tag | Meaning |
|-----|---------|
| `@BOB` / `@IDFC` | Client this test belongs to |
| `@{PageArea}` | Page or feature (`@Login`, `@Homepage`, `@Checkout`, `@Payment`, etc.) |

**Optional tags (add as appropriate):**
| Tag | Meaning |
|-----|---------|
| `@Smoke` | Fast, high-value check |
| `@Sanity` | Quick regression gate |
| `@Regression` | Full regression suite |

### Steps
Every test must use `test.step()` to describe each logical action.
Step descriptions must be written in plain English from the user's perspective.

```typescript
test('SC_002, Home page — Trending Categories section visible and clickable', {
  tag: ['@BOB', '@Homepage', '@Smoke', '@Sanity']
}, async () => {

  await test.step('Verify banner, categories, and trending sections are displayed', async () => {
    await HomePage.verifyBannerSectionDisplayed(page);
    await HomePage.verifyCategorySectionDisplayed(page);
    await HomePage.verifyTrendingSectionDisplayed(page);
  });

  await test.step('Verify category cards show images and labels', async () => {
    await HomePage.verifyCategoryImagesAndTextsDisplayed(page);
  });

  await test.step('Clicking a category navigates to the correct PLP', async () => {
    await HomePage.verifyCategoryNavigationToProductPage(page);
  });
});
```

### Shared variables between steps
Declare shared variables before the first step at the test body level.

```typescript
test('SC_003, Earn More Deals — PDP Verification', { tag: [...] }, async () => {
  let productData: any;

  await test.step('Get product details from homepage', async () => {
    productData = await HomePage.getProductDetails(page);
  });

  await test.step('Verify product details on PDP match', async () => {
    await HomePage.verifyPDP(page, productData);
  });
});
```

### What tests must NOT do
- Do not put XPath selectors or locator strings directly inside test files
- Do not call `page.click()`, `page.fill()`, `page.locator()` directly — always go through a Page class method
- Do not import `ElementHelper` or `VerificationHelpers` directly in tests
- Do not add `console.log()` in test files — logs belong in Page methods

---

## 4. Utils

All utility classes are in `utils/`. They are **shared across all clients (BOB, IDFC)** — do not add client-specific logic to utils.

### `ElementHelper` — `utils/elementHelper.ts`
DOM interactions. Use for all element actions.

| Method | Use when |
|--------|----------|
| `clickElement(page, locator)` | Click any element |
| `clearAndEnterInTextField(page, locator, text)` | Type into an input field |
| `clearTextField(page, locator)` | Clear a field only |
| `waitForElementVisible(page, locator)` | Wait until element appears (retries once after 50s) |
| `waitForElementVisibleWithoutReload(page, locator)` | Poll until element appears — no page reload |
| `waitForElementClickable(page, locator)` | Wait until element is visible AND enabled |
| `waitForElementToDisappear(page, locator)` | Wait until element hides |
| `scrollToElement(page, locator)` | Scroll element into view |
| `scrollByAmount(page, x, y)` | Scroll by pixel amount |
| `isElementDisplayed(page, locator)` | Returns `boolean` — element visible? |
| `isElementEnabled(page, locator)` | Returns `boolean` — element enabled? |
| `isElementPresent(page, locator)` | Returns `boolean` — element in DOM? |
| `getTextFromElement(page, locator)` | Get text content |
| `getElementValue(page, locator)` | Get input value |
| `getAttributeValue(page, locator, attr)` | Get attribute value |
| `selectOptionByValue/Index/VisibleText` | Dropdown selection |
| `dragAndDropElement(page, source, target)` | Drag and drop |
| `hoverOverMenu(page, locator)` | Hover with retry |
| `clickElementWithRetry(page, locator)` | Click with retry |
| `doubleClickElement(page, locator)` | Double-click |
| `getExpectedTextFromLocator / getActualTextFromLocator` | Store text for later comparison |
| `compareBothResultAndAddedInConsole()` | Compare stored expected vs actual text |

### `VerificationHelpers` — `utils/verificationHelper.ts`
Assertions only. Every method has a **hard assert** version and a `SoftAssert` version.

| Method | Assert |
|--------|--------|
| `elementIsVisible(page, locator)` | Element is visible (retries with reload) |
| `elementIsHidden(page, locator)` | Element is hidden |
| `elementIsEnabled / Disabled` | Enabled/disabled state |
| `elementIsChecked(page, locator)` | Checkbox is checked |
| `elementIsEditable(page, locator)` | Field is editable |
| `elementContainsText(page, locator, text)` | Element text contains string |
| `elementHasText(page, locator, text)` | Exact text match |
| `elementHasAttribute(page, locator, attr, value)` | Attribute equals value |
| `elementHasClass(page, locator, className)` | Has CSS class |
| `elementHasCount(page, locator, count)` | Element count |
| `elementHasValue(page, locator, value)` | Input value equals |
| `checkUrlContainsKeyword(page, keyword)` | URL contains string |
| `validatePlaceholder(page, locator, text)` | Placeholder text |
| `validateHrefAttribute / validateSrcAttribute / validateAltText` | Link/image attributes |

**Hard assert** — fails the test immediately on mismatch.
**SoftAssert** (`…SoftAssert`) — logs the failure and continues the test.

Use hard asserts for critical checks. Use soft asserts when you want to continue collecting all failures before the test ends.

### `CommonHelper` — `utils/commonHelper.ts`
Navigation and general utilities.

| Method | Use |
|--------|-----|
| `navigateToHomePage(page)` | Navigate to baseURL (reads from Playwright project config) |
| `navigateToPage(page, url)` | Navigate to a specific path |
| `verifyUrl(page, expectedUrl)` | Assert current URL |
| `scrollAndClickElement(page, selector)` | Scroll to then click |
| `performKeyboardAction(page, key)` | Press a keyboard key |
| `generateRandomPassword(length?)` | Random password string |
| `generateRandomString(length?)` | Random alphabetic string |
| `generateRandomNumber(min?, max?)` | Random number in range |
| `generateTimestamp()` | ISO timestamp string |
| `generateUniqueIdentifier()` | string + number + timestamp combo |
| `pressEnterKey(page, selector)` | Focus element then press Enter |

> Window/tab/iframe methods exist in `CommonHelper` for legacy reasons.
> **Prefer `BrowserHelper` for all new window, tab, and iframe work.**

### `BrowserHelper` — `utils/browserHelper.ts`
Browser-level operations.

| Method | Use |
|--------|-----|
| `switchToWindow(page, targetUrl)` | Switch to a tab by URL |
| `switchToTab(page)` | Switch to the newly opened tab |
| `switchToIframe(page, iframeSelector)` | Return iframe context |
| `clickButtonInsideIframe(iframe, selector)` | Click inside an iframe |
| `setGeolocation(page, lat, lng)` | Set browser geolocation |
| `getWindowWidth / getWindowHeight` | Viewport size |
| `takeScreenshot` | Capture screenshot |
| `getCookies / setCookie / clearCookies` | Cookie management |
| `refreshPage` | Reload page |

### `DeviceHelper` — `utils/deviceHelper.ts`
Detect device context.

| Method | Returns |
|--------|---------|
| `DeviceHelper.isMobile()` | `boolean` — `true` if running on a mobile viewport |

---

## 5. Test Data

### Files

| File | Used by | Purpose |
|------|---------|---------|
| `testdata/bobtestdata.json` | BOB pages and tests | BOB login credentials and user data |
| `testdata/idfctestdata.json` | IDFC pages and tests | IDFC login, flight, hotel, payment, traveller data |
| `testdata/commontestdata.json` | Any client | Shared data that is not client-specific |

---

### `bobtestdata.json` — structure

```json
{
  "loginDataFill": {
    "regularEmail":    "...",
    "regularPassword": "...",
    "mobileNumber":    "...",
    "otp":             "...",
    "userId":          "...",
    "userPassword":    "..."
  }
}
```

| Section | Key | Use |
|---------|-----|-----|
| `loginDataFill` | `mobileNumber` | OTP login flow — mobile number field |
| `loginDataFill` | `otp` | OTP login flow — OTP digits |
| `loginDataFill` | `userId` | Restriction/admin page — username |
| `loginDataFill` | `userPassword` | Restriction/admin page — password |
| `loginDataFill` | `regularEmail` / `regularPassword` | Standard email login (if applicable) |

---

### `idfctestdata.json` — structure

```json
{
  "loginDataFill":      { "mobileNumber", "otp", "city", "checkInDate", "checkOutDate", ... },
  "hotelPage":          { "domestic", "international", "searcHotelName", "rooms", "adults", "children", ... },
  "dateSelector":       { "fromDate", "fromMonth", "toDate", "toMonth" },
  "hotelBookingDataFill": { "firstName", "lastName", "panNumber", "contactNumber", "email" },
  "flightPage":         { "enterCityFrom", "enterCityTo", "enterInternationalCityTo" },
  "travellername":      { "firstName", "lastName", "editedFirstName", "editedLastName", "email", "phone", "gst", "passport", "country" },
  "redeemPointSection": { "enterRedeemPoint" },
  "paymentDataFill":    { "cardNumber", "cardExpiry", "cardCvv", "cardName", "otp" }
}
```

| Section | Use |
|---------|-----|
| `loginDataFill` | IDFC OTP login — mobile, OTP, and search city pre-fill |
| `hotelPage` | Hotel search — city names, room/adult/child counts, multi-room scenarios |
| `dateSelector` | Date picker — from/to date and month values |
| `hotelBookingDataFill` | Hotel booking form — guest name, PAN, contact |
| `flightPage` | Flight search — origin and destination city partial names for autocomplete |
| `travellername` | Traveller profile — names, email, phone, GST, passport |
| `redeemPointSection` | Loyalty/redeem points — points value to enter |
| `paymentDataFill` | Payment form — card number, expiry, CVV, name, OTP |

---

### `commontestdata.json`

Currently empty — reserved for data that is reused across both BOB and IDFC clients.
Add shared values here (e.g. common city names, generic user details) instead of duplicating them in both client files.

---

### Import rules

Always use `import`, never `require`:

```typescript
// In BOB pages or tests
import bobTestData from '../../testdata/bobtestdata.json';

// In IDFC pages or tests
import idfcTestData from '../../testdata/idfctestdata.json';

// For shared data
import commonTestData from '../../testdata/commontestdata.json';
```

Access by section then key:
```typescript
bobTestData.loginDataFill.mobileNumber
idfcTestData.hotelPage.domestic
idfcTestData.paymentDataFill.cardNumber
```

---

### Rules

- **Never hardcode** credentials, OTPs, mobile numbers, card numbers, names, or city names directly in page files or test files — always read from testdata JSON
- **Add new test data** in the correct section of the right file; if a section does not exist yet, create a new named section in the JSON
- **BOB data stays in `bobtestdata.json`**, IDFC data stays in `idfctestdata.json`, truly shared data goes in `commontestdata.json`
- When adding a new page for an existing client, add its test data as a new section in that client's file — do not create separate JSON files per page

---

## 6. Imports — Correct Paths

| From inside... | To reach utils | To reach locators | To reach testdata |
|----------------|----------------|-------------------|-------------------|
| `pages/BOB/` | `../../utils/` | `../../locators/bob/` | `../../testdata/` |
| `pages/IDFC/` | `../../utils/` | `../../locators/idfc/` | `../../testdata/` |
| `pages/Common/` | `../../utils/` | N/A | `../../testdata/` |
| `tests/BOB/` | `../../utils/` | N/A | `../../testdata/` |
| `tests/IDFC/` | `../../utils/` | N/A | `../../testdata/` |

Tests import from **pages** only — not from locators or utils directly.

---

## 7. Quick Checklist for AI

When creating or editing any file, verify:

**Locator file**
- [ ] Named `{PageName}Locators.ts`
- [ ] In `locators/{lowercase-client}/`
- [ ] Exported as `export const {Name}Locators = { ... }`
- [ ] All keys camelCase, all values XPath strings

**Page file**
- [ ] Named `{PageName}.ts` in `pages/{UPPERCASE-CLIENT}/`
- [ ] Class name matches filename exactly
- [ ] All methods are `static async`
- [ ] Locator assigned to `const` before use
- [ ] Every method has a `console.log()`
- [ ] Uses `ElementHelper` / `VerificationHelpers` — no raw `page.click()`

**Test file**
- [ ] Named `{PageName}.test.ts` in `tests/{UPPERCASE-CLIENT}/`
- [ ] Module-level `let context: BrowserContext; let page: Page;`
- [ ] `beforeEach` creates context, opens page, navigates
- [ ] Test name starts with `SC_NNN,`
- [ ] Tags include client tag + feature tag + at least one suite tag
- [ ] Every test uses `test.step()`
- [ ] No locators or `ElementHelper` calls directly in test file

**Utils**
- [ ] No client-specific logic inside utils
- [ ] New helper methods added to the correct class (`ElementHelper` for DOM, `VerificationHelpers` for assertions, `BrowserHelper` for browser/tab/window)
- [ ] Every new verification method has both a hard and a `SoftAssert` variant
