
A Playwright-based end-to-end test automation framework for **Travel Loyalty** web applications. It supports multiple products (IDFC, BOB), environments (QA, UAT, PROD), browsers, and mobile device emulation using a **Page Object Model (POM)** architecture.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Architecture Overview](#architecture-overview)
- [Prerequisites & Setup](#prerequisites--setup)
- [Configuration](#configuration)
- [Running Tests](#running-tests)
- [Writing New Tests](#writing-new-tests)
- [Utilities Reference](#utilities-reference)
- [Test Data](#test-data)
- [Reporting](#reporting)
- [Email Reporting](#email-reporting)
- [Best Practices](#best-practices)

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| [Playwright Test](https://playwright.dev/) | ^1.60.0 | Browser automation & test runner |
| TypeScript | ES2022 | Test & page object language |
| Node.js | — | Runtime |

---

## Project Structure

```
POC/
├── config/                  # Environment URLs per product
│   ├── BOB.config.ts
│   └── IDFC.config.ts
├── locators/                # Element selectors (XPath/CSS)
│   └── idfc/
│       ├── FlightPageLocators.ts
│       ├── HotelPageLocators.ts
│       ├── LoginPageLocators.ts
│       ├── MyAccountPageLocators.ts
│       └── PaymentPageLocators.ts
├── pages/                   # Page Object classes (actions & verifications)
│   └── IDFC/
│       ├── FlightHomePage.ts
│       ├── FlightBookingPage.ts
│       ├── HotelHomePage.ts
│       ├── HotelBookingPage.ts
│       ├── LoginPage.ts
│       └── PaymentPage.ts
├── tests/                   # Test specifications
│   ├── BOB/
│   │   └── homepage.test.ts
│   └── IDFC/
│       ├── FlightPage.test.ts
│       ├── HotelPage.test.ts
│       ├── LoginPage.test.ts
│       └── CheckoutAndMyAccount.test.ts
├── testdata/                # JSON test data files
│   └── idfctestdata.json
├── utils/                   # Reusable helper classes
│   ├── browserHelper.ts
│   ├── commonHelper.ts
│   ├── elementHelper.ts
│   └── verificationHelper.ts
├── reports/                 # JSON test result output
├── playwright-report/       # HTML report output
├── mobileDevices.js         # Supported mobile device list
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json
└── package.json
```

---

## Architecture Overview

The framework follows a layered **Page Object Model**:


### Data Flow Example

```
test("SC_03 - Search @HOMEPAGE @FLIGHT")
  └── FlightHomePage.EnterCityFromAirport(page, "ahmeda")
        └── ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.fromCity, data)
              └── page.waitForSelector(FlightPageLocators.fromCity)
```

---

## Prerequisites & Setup

1. **Install Node.js** (LTS recommended).

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Install Playwright browsers:**

   ```bash
   npx playwright install
   ```

4. **Verify setup** by running a sample test (see [Running Tests](#running-tests)).

---

## Configuration

### Environment URLs

Product-specific base URLs are defined in `config/`:

| Product | Config File | Environments |
|---------|-------------|--------------|
| IDFC | `config/IDFC.config.ts` | QA, UAT, PROD |
| BOB | `config/BOB.config.ts` | QA, UAT, PROD |

### Playwright Config (`playwright.config.ts`)

The framework uses a dynamic project setup driven by the `PROJECT` environment variable.

**Format:** `{PRODUCT}-{BROWSER}-{ENVIRONMENT}[-{DEVICE}][-{TAG}]`

| Segment | Values | Example |
|---------|--------|---------|
| Product | `BOB`, `IDFC` | `IDFC` |
| Browser | `chrome`, `firefox`, `webkit`, `edge` | `chrome` |
| Environment | `QA`, `UAT`, `PROD` | `UAT` |
| Device (optional) | `iPhone13`, `GalaxyS21`, etc. | `iPhone13` |
| Tag (optional) | Any `@tag` in test title | `FLIGHT` |

**Examples:**

| PROJECT Value | Description |
|---------------|-------------|
| `IDFC-chrome-UAT` | IDFC on Chrome, UAT, desktop |
| `BOB-chrome-QA-TEST` | BOB on Chrome, QA, run only `@TEST` tagged tests |
| `IDFC-chrome-UAT-iPhone13` | IDFC on Chrome, UAT, mobile (iPhone 13) |
| `IDFC-chrome-UAT-iPhone13-FLIGHT` | Mobile run filtered to `@FLIGHT` tests |

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PROJECT` | **Required.** Selects product, browser, env, device, and tag filter | — |
| `HEADED` | Set to `true` to run in headed (visible) browser mode | headless |
| `CI` | When set, uses 4 parallel workers instead of 2 | — |

project: Playwright Test Execution Guide

description: >
  This file contains commands to execute Playwright tests
  for multiple environments and configurations using the PROJECT environment variable.

prerequisites:
  - Node.js installed
  - Playwright installed (`npm install`)
  - Tests configured in playwright.config.js

commands:

### Full suite by product & environment

```bash
# BOB
npm run test:bob:qa        # Chrome, QA
npm run test:bob:uat       # Chrome, UAT
npm run test:bob:prod      # Chrome, PROD

# IDFC
npm run test:idfc:qa       # Chrome, QA
npm run test:idfc:uat      # Chrome, UAT
npm run test:idfc:prod     # Chrome, PROD
```

### Run with visible browser (headed)

```bash
npm run test:bob:qa:headed
npm run test:idfc:qa:headed
```

### Filter by tag

```bash
# BOB — QA
npm run test:bob:qa:tag:loginpage
npm run test:bob:qa:tag:homepage
npm run test:bob:qa:tag:checkout
npm run test:bob:qa:tag:payment
npm run test:bob:qa:tag:bookingconfirmation
npm run test:bob:qa:tag:giftcard
npm run test:bob:qa:tag:myaccount

# IDFC — QA
npm run test:idfc:qa:tag:loginpage
npm run test:idfc:qa:tag:homepage
npm run test:idfc:qa:tag:checkout
npm run test:idfc:qa:tag:payment
```

### Run a specific test file

```bash
npm run test:bob:loginpage           # BOB LoginPage (headless)
npm run test:bob:loginpage:headed    # BOB LoginPage (visible browser)

npm run test:idfc:loginpage          # IDFC LoginPage (headless)
npm run test:idfc:loginpage:headed   # IDFC LoginPage (visible browser)
```

### Mobile execution

```bash
npm run test:bob:qa:iphone13         # BOB — iPhone 13
npm run test:bob:qa:galaxys21        # BOB — Galaxy S21
npm run test:idfc:qa:iphone13        # IDFC — iPhone 13
```

Supported devices: iPhone 12/13/13 Pro Max/SE, Galaxy S20/S21, Pixel 4a/5, OnePlus 8/9.

### Run tests + send email report

```bash
npm run test:bob:loginpage:headed:mail   # BOB LoginPage headed → email
npm run test:bob:qa:mail                 # Full BOB QA suite → email
npm run test:idfc:qa:mail                # Full IDFC QA suite → email
```

### View HTML report

```bash
npm run report
```

---

## Writing New Tests

### 1. Add locators

Create or update a locator file under `locators/{product}/`:

```typescript
// locators/idfc/MyFeatureLocator.ts
export const MyFeatureLocator = {
  submitButton: `//button[@id="submit"]`,
  inputField: `//input[@name="search"]`,
};
```

### 2. Create a Page Object

Add actions and verifications in `pages/{product}/`:

```typescript
// pages/IDFC/MyFeaturePage.ts
import  from '@playwright/test';
import { MyFeaturePageLocators } from '../../locators/idfc/MyFeaturePageLocators';
import { ElementHelper } from '../../utils/elementHelper';

export class MyFeaturePage {
  static async clickSubmit(page: Page): Promise<void> {
    await ElementHelper.clickElement(page, MyFeatureLocator.submitButton);
  }

  static async enterSearchText(page: Page, text: string): Promise<void> {
    await ElementHelper.clearAndEnterInTextField(page, MyFeatureLocator.inputField, text);
  }
}
```

### 3. Write the test

Add a test file under `tests/{product}/`:

```typescript
import { test, Page, BrowserContext } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from '../../pages/IDFC/LoginPage';
import { MyFeaturePage } from '../../pages/IDFC/MyFeaturePage';

let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();
  await CommonHelper.navigateToHomePage(page);
  await LoginPage.loginWithValidCredentials(page);
});

test('SC_XX - My feature test @MYFEATURE', async () => {
  await test.step('Step 1: Perform action', async () => {
    await MyFeaturePage.enterSearchText(page, 'test');
  });

  await test.step('Step 2: Submit', async () => {
    await MyFeaturePage.clickSubmit(page);
  });
});
```

### 4. Add test data (optional)

Extend `testdata/idfctestdata.json` for shared credentials and inputs:

```json
{
  "mobileNumber": "8448661387",
  "otp": "2248"
}
```

Load in tests or page objects:

```typescript
const idfcTestData = require('../../testdata/idfctestdata.json');
```

---

## Utilities Reference

### `ElementHelper` — UI Interactions

| Method | Description |
|--------|-------------|
| `clickElement()` | Wait for element, then click |
| `clearAndEnterInTextField()` | Clear and type into an input |
| `waitForElementVisible()` | Wait until element is visible |
| `waitForElementClickable()` | Wait until element is clickable |
| `scrollToElement()` | Scroll element into view |
| `selectOptionByValue/Index/VisibleText()` | Dropdown selection |
| `dragAndDropElement()` | Drag and drop between elements |
| `clickElementWithRetry()` | Click with retry logic |

### `VerificationHelpers` — Assertions

Provides hard and soft assert variants (suffix `SoftAssert`) for most methods.

| Method | Description |
|--------|-------------|
| `elementIsVisible()` | Assert element is visible |
| `elementIsHidden()` | Assert element is hidden |
| `elementIsEnabled/Disabled()` | Assert enabled/disabled state |
| `elementIsChecked()` | Assert checkbox state |
| `elementContainsText()` | Assert element contains text |
| `elementHasAttribute()` | Assert attribute value |
| `elementHasClass()` | Assert CSS class |
| `elementHasCount()` | Assert element count |
| `checkUrlContainsKeyword()` | Assert URL contains text |

### `CommonHelper` — Navigation & General

| Method | Description |
|--------|-------------|
| `navigateToHomePage()` | Navigate to base URL from config |
| `verifyUrl()` | Assert current URL matches expected |
| `scrollAndClickElement()` | Scroll into view and click |
| `generateRandomPassword()` | Generate random password string |
| `performKeyboardAction()` | Press keyboard keys |

### `BrowserHelper` — Browser & Window Management

| Method | Description |
|--------|-------------|
| `switchToWindow()` / `switchToTab()` | Switch between tabs/windows |
| `switchToIframe()` | Switch into an iframe |
| `setGeolocation()` | Set browser geolocation |
| `takeScreenshot()` | Capture screenshot |
| `getCookies()` / `setCookie()` / `clearCookies()` | Cookie management |
| `refreshPage()` | Reload current page |

---

## Test Data

Test data is stored in JSON files under `testdata/`:

| File | Used By | Contents |
|------|---------|----------|
| `idfctestdata.json` | IDFC tests | Login credentials, cities, dates, traveller details, PAN, contact info |

Example usage in a Page Object:

```typescript
const idfcTestData = require('../../testdata/idfctestdata.json');

static async loginWithValidCredentials(page: Page): Promise<void> {
  await this.enterMobileNumber(page, idfcTestData.mobileNumber);
  await this.enterOtp(page, idfcTestData.otp);
}
```

---

## Reporting

The framework generates three report types after each run:

| Reporter | Output | Purpose |
|----------|--------|---------|
| List | Console | Real-time progress in terminal |
| JSON | `reports/test-results.json` | CI/CD integration, custom parsing |
| HTML | `playwright-report/` | Interactive visual report |

Open the HTML report:

```bash
npx playwright show-report
```

On failure, screenshots are saved automatically under `test-results/`.

---

## Email Reporting

After every test run, an HTML email report can be sent automatically to the configured recipients. The email includes total/passed/failed/skipped counts, duration, and top failure details.

### Recipients

| Recipient | Purpose |
|-----------|---------|
| `name@domain.com` | QA team |
| `213123.domain.com@in.teams.ms` | Microsoft Teams channel |

### Sender

Emails are sent via `name@domain.com` using Microsoft Office 365 SMTP (`smtp.office365.com:587`).

### Run tests and send email in one command

```bash
# BOB — LoginPage — headed browser + email after run
npm run test:bob:loginpage:headed:mail

# BOB — HomePage — headed browser + email after run
npm run test:bob:homepage:headed:mail

# IDFC — LoginPage — headed browser + email after run
npm run test:idfc:loginpage:headed:mail

# Full BOB QA suite + email
npm run test:bob:qa:mail

# Full IDFC QA suite + email
npm run test:idfc:qa:mail
```

### Send email from last run (without re-running tests)

```bash
npm run mail
```

### Regenerate summary and send email

```bash
npm run report:mail
```

### How it works

```
npm run test:bob:loginpage:headed:mail
  ├── 1. Runs tests          → reports/test-results.json
  ├── 2. report:generate     → reports/email-summary.txt
  └── 3. mail                → sends HTML email via Office 365 SMTP
```

The email script is located at `scripts/send-report-email.js`.

### CI / GitHub Actions

Email is also sent automatically after every CI run (push, scheduled, or manual dispatch). The workflow uses the same SMTP credentials and recipient list. See `.github/workflows/playwright-ci.yml` for the full configuration.

---

## Best Practices

1. **Keep locators separate** — Never hardcode selectors in tests or page objects. Always use locator files.

2. **Use Page Objects for actions** — Tests should read like scenarios; implementation details belong in page objects.

3. **Use `test.step()`** — Break tests into named steps for clearer reporting and debugging.

4. **Tag your tests** — Use `@TAG` in test titles (e.g., `@FLIGHT`, `@HOTEL`, `@LOGIN`) so they can be filtered via the `PROJECT` env variable.

5. **Reuse helpers** — Use `ElementHelper` for interactions and `VerificationHelpers` for assertions instead of raw Playwright calls.

6. **Use test data files** — Store credentials and reusable inputs in JSON, not in test code.

7. **Handle login in `beforeEach`** — IDFC tests create a fresh browser context and log in before each test:

   ```typescript
   test.beforeEach(async ({ browser }) => {
     context = await browser.newContext();
     page = await context.newPage();
     await CommonHelper.navigateToHomePage(page);
     await LoginPage.loginWithValidCredentials(page);
   });
   ```

8. **Add new products consistently** — When adding a new product (e.g., `XYZ`):
   - Create `config/XYZ.config.ts`
   - Add `tests/XYZ/` folder
   - Add `locators/xyz/` and `pages/XYZ/` as needed
   - Update `playwright.config.ts` to map the new product

---

## Current Test Coverage

### IDFC

| Test File | Scenarios |
|-----------|-----------|
| `LoginPage.test.ts` | Login with valid credentials |
| `FlightPage.test.ts` | Search, filters, travellers, booking flow (SC_02 – SC_08) |
| `HotelPage.test.ts` | Hotel search, filters, guest details, PAN (SC_15 – SC_18) |
| `CheckoutAndMyAccount.test.ts` | Checkout, payment, booking confirmation (SC_09 – SC_14) |

### BOB

| Test File | Scenarios |
|-----------|-----------|
| `homepage.test.ts` | Home page load verification |

---

## Quick Reference — Common Commands

```bash
# Install
npm install
npx playwright install

# Run IDFC Flight tests on UAT (Chrome, headless)
npm run test:idfc:uat

# Run BOB QA tests
npm run test:bob:qa

# Run headed (visible browser)
npm run test:bob:qa:headed

# Run specific file — headed
npm run test:bob:loginpage:headed
npm run test:idfc:loginpage:headed

# Run specific file — headed + send email after
npm run test:bob:loginpage:headed:mail
npm run test:idfc:loginpage:headed:mail

# Run full suite + send email
npm run test:bob:qa:mail
npm run test:idfc:qa:mail

# Send email from last run's results (no re-run)
npm run mail

# View HTML report
npm run report
```

---

