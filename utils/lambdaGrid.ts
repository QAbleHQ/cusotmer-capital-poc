// Shared LambdaTest grid config/helpers — used by both playwright.config.ts
// (desktop + mobile-emulation grid runs) and utils/testBase.ts (real device
// runs, which need to build the same capabilities but connect via a
// different Playwright API — see testBase.ts for why).

export const GRID = {
  isGrid: process.env.IS_GRID === 'true',
  // Real physical Android/iOS hardware instead of desktop-browser emulation.
  realDevice: process.env.LAMBDA_REAL_DEVICE === 'true',
  provider: 'lambdatest',

  lambdatest: {
    user: process.env.LAMBDA_USER,
    key: process.env.LAMBDA_KEY,
    capabilities: {
      platform: process.env.LAMBDA_PLATFORM || 'Windows 10',
      resolution: '1920x1080',
      // Groups dashboard sessions — defaults to the PROJECT env var so runs
      // are identifiable (was hardcoded to 'Login Test' before, which made
      // every run land under the same generic, hard-to-find build).
      build: process.env.LAMBDA_BUILD_NAME || process.env.PROJECT || 'Playwright Grid Run',
      projectName: 'Web Framework',
      console: true,
      network: true,
      visual: true,
      video: true,
    },
    // '.*' lets LambdaTest pick any available match for device/version.
    realDeviceOptions: {
      platformName: process.env.LAMBDA_PLATFORM_NAME || 'android', // 'android' | 'ios'
      deviceName: process.env.LAMBDA_DEVICE_NAME || '.*',
      platformVersion: process.env.LAMBDA_PLATFORM_VERSION || '.*',
    },
  },
};

// Builds the LambdaTest CDP endpoint Playwright connects to instead of
// launching a local browser. `browserName`/`name` are set per-project so
// runs are identifiable in the LambdaTest dashboard. Desktop + emulated
// mobile only — real devices use getLambdaTestRealDeviceWsEndpoint below.
export function getLambdaTestWsEndpoint(browserName: string, name: string): string {
  const ltOptions = {
    ...GRID.lambdatest.capabilities,
    browserName,
    name,
    user: GRID.lambdatest.user,
    accessKey: GRID.lambdatest.key,
  };
  const capabilities = { 'LT:Options': ltOptions };
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;
}

// Real Android/iOS hardware capability shape (platformName + deviceName +
// isRealMobile) — used with Playwright's native `_android.connect()` API,
// NOT `browserType.connect()`. Real devices only expose a single browser
// context (the one already open on the device); the generic CDP
// `Target.createBrowserContext` command LambdaTest's proxy speaks for
// desktop/emulated `pw-chromium`/`pw-firefox`/`pw-webkit` isn't supported
// on real hardware, which is why this needs its own connection path (see
// utils/testBase.ts) instead of `connectOptions` in playwright.config.ts.
export function getLambdaTestRealDeviceWsEndpoint(name: string): string {
  const { platformName, deviceName, platformVersion } = GRID.lambdatest.realDeviceOptions;
  const playwrightClientVersion =
    process.env.LAMBDA_PLAYWRIGHT_VERSION || require('@playwright/test/package.json').version;
  const ltOptions = {
    platformName,
    deviceName,
    platformVersion,
    isRealMobile: true,
    build: GRID.lambdatest.capabilities.build,
    name,
    user: GRID.lambdatest.user,
    accessKey: GRID.lambdatest.key,
    network: true,
    video: true,
    console: true,
    playwrightClientVersion,
  };
  const capabilities = { 'LT:Options': ltOptions };
  return `wss://cdp.lambdatest.com/playwright?capabilities=${encodeURIComponent(
    JSON.stringify(capabilities)
  )}`;
}
