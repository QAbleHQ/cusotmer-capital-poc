import { defineConfig } from '@playwright/test';
import { BOB_URLS } from './config/BOB.config';
import { IDFC_URLS } from './config/IDFC.config';
 
const mobileDevices = require('./mobileDevices');
 
type BrowserName = 'chromium' | 'firefox' | 'webkit';
 
const projectEnv = process.env.PROJECT || '';
const parts = projectEnv.split('-');
 
// Examples:
// IDFC-chrome-uat
// IDFC-chrome-uat-smoke
// IDFC-chrome-uat-mobile-iphone13
// IDFC-chrome-uat-mobile-iphone13-smoke
 
const product = parts[0]?.toUpperCase();
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
 
const baseURL =
  product === 'BOB'
    ? BOB_URLS[environment as keyof typeof BOB_URLS] || BOB_URLS.QA
    : IDFC_URLS[environment as keyof typeof IDFC_URLS] || IDFC_URLS.QA;
 
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
      testDir: `./tests/${product}`,
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
    testDir: `./tests/${product}`,
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
    ['json', { outputFile: 'reports/test-results.json' }],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
  ],
 
  grep: tag ? new RegExp(`@${tag}`, 'i') : undefined,
});