import { defineConfig } from '@playwright/test';
import { BOB_TS, IDFC_TS, BOBCard_SS } from './config/ts.config';
const mobileDevices = require('./mobileDevices');

// ─── SETTINGS ────────────────────────────────────────────────────────────────
const TIMEOUT = 600000;       
const RETRIES = 2;             // retries on failure
const WORKERS = { ci: 4, local: 2 };
const HEADED  = process.env.HEADED === 'true';
// ─────────────────────────────────────────────────────────────────────────────

type BrowserName = 'chromium' | 'firefox' | 'webkit';

// ✅ ENV + CLIENT
const projectEnv = process.env.PROJECT || '';
const CLIENT = process.env.CLIENT?.toUpperCase() || 'BOB';

const parts = projectEnv.split('-');

const product = parts[0]?.toLowerCase();
const browserEnv = parts[1]?.toLowerCase();
const environment = parts[2]?.toUpperCase();

// ✅ Device & Tag parsing
let deviceName: string | undefined;
let tag: string | undefined;

if (parts[3]?.toLowerCase() === 'mobile') {
  deviceName = parts[4];
  tag = parts[5];
} else {
  const deviceOrTag = parts[3];

  const knownDevice = mobileDevices.find(
    (d: { name: string }) =>
      d.name.toLowerCase() === deviceOrTag?.toLowerCase()
  );

  if (knownDevice) {
    deviceName = knownDevice.name;
    tag = parts[4];
  } else {
    tag = deviceOrTag;
  }
}

// ✅ Browser mapping
const mappedBrowser: BrowserName =
  browserEnv === 'firefox'
    ? 'firefox'
    : browserEnv === 'webkit' || browserEnv === 'safari'
    ? 'webkit'
    : 'chromium';

// ✅ Test directory
const testDir =
  product === 'tripstacc' ? './TripStacc/tests'
  : product === 'shopstacc' ? './ShopStacc/tests'
  : './tests';

// ✅ ✅ FINAL BASE URL LOGIC (KEY PART)
let baseURL: string;

if (product === 'tripstacc') {
  if (CLIENT === 'BOB') {
    baseURL = BOB_TS[environment as keyof typeof BOB_TS] || BOB_TS.QA;
  } else if (CLIENT === 'IDFC') {
    baseURL = IDFC_TS[environment as keyof typeof IDFC_TS] || IDFC_TS.QA;
  } else {
    throw new Error(`Invalid CLIENT: ${CLIENT}`);
  }

} else if (product === 'shopstacc') {

  // ✅ FIX: Force BOBCard for ShopStacc (ignore CLIENT)
  baseURL = BOBCard_SS[environment as keyof typeof BOBCard_SS] || BOBCard_SS.QA;

} else {
  baseURL = BOB_TS[environment as keyof typeof BOB_TS] || BOB_TS.QA;
}


// ✅ Projects
const projects: any[] = [];

if (deviceName) {
  const selectedDevice = mobileDevices.find(
    (d: any) =>
      d.name.toLowerCase() === deviceName!.toLowerCase()
  );

  if (selectedDevice) {
    projects.push({
      name: `${product}-${browserEnv}-${environment}-${CLIENT}-mobile-${selectedDevice.name.toLowerCase()}`,
      testDir,
      use: {
        baseURL,
        browserName: mappedBrowser,
        channel:
          browserEnv === 'chrome'
            ? 'chrome'
            : browserEnv === 'edge'
            ? 'msedge'
            : undefined,
        headless: !HEADED,

        viewport: selectedDevice.viewport,
        isMobile: selectedDevice.isMobile,
        hasTouch: selectedDevice.hasTouch,
        userAgent: selectedDevice.userAgent,

        screenshot: 'only-on-failure',
        video: 'off',
      },
    });
  }
} else {
  projects.push({
    name: `${product}-${browserEnv}-${environment}-${CLIENT}`,
    testDir,
    use: {
      baseURL,
      browserName: mappedBrowser,

      channel:
        browserEnv === 'chrome'
          ? 'chrome'
          : browserEnv === 'edge'
          ? 'msedge'
          : undefined,

      headless: !HEADED,
      viewport: HEADED
    ? null
    : {
       width: 1920,
       height: 1080,
},

      screenshot: 'only-on-failure',
      video: 'off',
      trace: "only-on-failure",

      launchOptions:
        mappedBrowser === 'chromium'
          ? { args: ['--start-maximized'] }
          : undefined,
    },
  });
}

// ✅ Final config export
export default defineConfig({
  projects,

  timeout: TIMEOUT,
  fullyParallel: true,
  workers: process.env.CI ? WORKERS.ci : WORKERS.local,
  retries: RETRIES,

  reporter: [
    ['list'],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
  ],

  grep: tag ? new RegExp(`@${tag}`, 'i') : undefined,
});