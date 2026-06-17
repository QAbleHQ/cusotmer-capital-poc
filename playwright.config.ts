import { defineConfig } from '@playwright/test';
import { BOB_TS, IDFC_TS, BOB_SS } from './config/ts.config';
 
const mobileDevices = require('./mobileDevices');
 
type BrowserName = 'chromium' | 'firefox' | 'webkit';
 
const projectEnv = process.env.PROJECT || '';
const parts = projectEnv.split('-');
 
// New format (preferred):
// tripstacc-chrome-UAT
// tripstacc-chrome-UAT-Loginpage
// tripstacc-chrome-UAT-mobile-iphone13
// shopstacc-chrome-UAT
// shopstacc-chrome-UAT-Loginpage

const product = parts[0]?.toLowerCase();
const browserEnv = parts[1]?.toLowerCase();
const environment = parts[2]?.toUpperCase();
 
let deviceName: string | undefined;
let tag: string | undefined;
 
// Mobile format
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
 
const mappedBrowser: BrowserName =
  browserEnv === 'firefox'
    ? 'firefox'
    : browserEnv === 'webkit' || browserEnv === 'safari'
      ? 'webkit'
      : 'chromium';
 
const testDir =
  product === 'tripstacc' ? './TripStacc/tests'
  : product === 'shopstacc' ? './ShopStacc/tests'
  : product === 'idfc' ? './TripStacc/tests'    // backward compat
  : `./tests/${product.toUpperCase()}`;

const baseURL =
  product === 'tripstacc' ? IDFC_TS[environment as keyof typeof IDFC_TS] || IDFC_TS.QA
  : product === 'shopstacc' ? BOB_SS[environment as keyof typeof BOB_SS] || BOB_SS.QA
  : product === 'idfc' ? IDFC_TS[environment as keyof typeof IDFC_TS] || IDFC_TS.QA
  : BOB_TS[environment as keyof typeof BOB_TS] || BOB_TS.QA;
 
const projects: any[] = [];
 
if (deviceName) {
  const selectedDevice = mobileDevices.find(
    (d: {
      name: string;
      viewport: { width: number; height: number };
      isMobile: boolean;
      hasTouch: boolean;
      userAgent: string;
    }) => d.name.toLowerCase() === deviceName!.toLowerCase()
  );
 
  if (selectedDevice) {
    projects.push({
      name: `${product}-${browserEnv}-${environment}-mobile-${selectedDevice.name.toLowerCase()}`,
      testDir,
      use: {
        baseURL,
        browserName: mappedBrowser,
        headless: process.env.HEADED !== 'true',
 
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
    name: `${product}-${browserEnv}-${environment}`,
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
 
      headless: process.env.HEADED !== 'true',
      viewport: null,
 
      screenshot: 'only-on-failure',
      video: 'off',
 
      launchOptions:
        mappedBrowser === 'chromium'
          ? { args: ['--start-maximized'] }
          : undefined,
    },
  });
}
 
export default defineConfig({
  projects,
 
  timeout: 540000,
  fullyParallel: true,
  workers: process.env.CI ? 4 : 2,
  retries: 2,

  reporter: [
    ['list'],
    ['json', { outputFile: 'playwright-report/test-results.json' }],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
  ],
 
  grep: tag ? new RegExp(`@${tag}`, 'i') : undefined,
});