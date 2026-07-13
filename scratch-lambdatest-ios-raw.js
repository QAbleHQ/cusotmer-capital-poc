// Minimal smoke test for real iOS devices on LambdaTest, following their
// documented Node.js pattern verbatim: `webkit.connect()` + the STANDARD
// `browser.newContext()` (unlike Android real devices, which require
// Playwright's native `_android` module — see utils/testBase.ts for why).
// Purpose: verify this standard pattern actually works against a real iOS
// device before wiring it into the test suite, the same way we verified
// the Android native-module approach before trusting it.
//
// Run:  node scratch-lambdatest-ios-raw.js
// Requires LAMBDA_USER / LAMBDA_KEY (picked up from .env via dotenv).

require('dotenv').config();
const { webkit } = require('playwright');

(async () => {
  const capabilities = {
    'LT:Options': {
      // Unlike Android, LambdaTest's iOS real-device endpoint rejects
      // wildcard/regex values ("Regex is not supported in platform
      // version. Please use version >=17") — needs concrete values.
      platformName: 'ios',
      deviceName: process.env.LAMBDA_DEVICE_NAME || 'iPhone 16',
      platformVersion: process.env.LAMBDA_PLATFORM_VERSION || '18',
      isRealMobile: true,
      build: 'Raw iOS Smoke Test (webkit.connect)',
      name: 'Raw iOS Smoke Test (webkit.connect)',
      user: process.env.LAMBDA_USER,
      accessKey: process.env.LAMBDA_KEY,
      network: true,
      video: true,
      console: true,
    },
  };

  const cdpUrl = `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;

  console.log('Connecting to LambdaTest iOS device (webkit.connect)...');
  const browser = await webkit.connect(cdpUrl);

  console.log('Connected. Existing contexts:', browser.contexts().length);
  const context = await browser.newContext();

  console.log('Got context via newContext(). Creating page...');
  const page = await context.newPage();

  console.log('Navigating to example.com...');
  await page.goto('https://example.com');
  console.log('Title:', await page.title());

  await browser.close();
  console.log('Done — no errors. Standard newContext() works for real iOS.');
})().catch((err) => {
  console.error('FAILED:', err);
  process.exit(1);
});
