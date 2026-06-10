import { defineConfig } from '@playwright/test';
import { BOB_URLS } from './config/BOB.config';
import { IDFC_URLS } from './config/IDFC.config';
const mobileDevices = require('./mobileDevices');
 
type BrowserName = 'chromium' | 'firefox' | 'webkit';
 
const projectEnv = process.env.PROJECT || '';
const parts = projectEnv.split('-');
 
// Format examples:
// Desktop: "BOB-chrome-QA"
// Desktop with tag: "BOB-chrome-QA-TEST"
// Mobile: "BOB-chrome-QA-iPhone13"
// Mobile with tag: "BOB-chrome-QA-iPhone13-earn"
 
const product = parts[0]?.toUpperCase();        // BOB / IDFC
const browserEnv = parts[1]?.toLowerCase();     // chrome / firefox / webkit
const environment = parts[2]?.toUpperCase();    // QA / UAT / PROD
 
// Fourth part could be a device OR a tag
const deviceOrTag = parts[3];
let deviceName: string | undefined;
let tag: string | undefined;
 
const knownDevice = mobileDevices.find(
  (d: { name: string }) => d.name.toLowerCase() === deviceOrTag?.toLowerCase()
);
 
if (knownDevice) {
  deviceName = knownDevice.name;
  tag = parts[4]; // optional tag after device
} else {
  tag = deviceOrTag; // treat as tag if not a device
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
    console.log('Product:', product);
    console.log('Environment:', environment);
    console.log('BaseURL:', baseURL);
const projects: any[] = [];
 
if (deviceName) {
  const selectedDevice = mobileDevices.find(
    (d: { name: string; viewport: { width: number; height: number } }) =>
      d.name.toLowerCase() === deviceName.toLowerCase()
  );
 
  if (selectedDevice) {
    projects.push({
      name: `${product}-${browserEnv}-${environment}-${selectedDevice.name}`,
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
  // Desktop run
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
      viewport: null, // <-- Add this to disable default Playwright viewport for desktop as well
      screenshot: 'only-on-failure',
      video: 'off',
      launchOptions:
        mappedBrowser === 'chromium' ? { args: ['--start-maximized'] } : undefined,
    },
  });
}
 
export default defineConfig({
  projects,
  timeout: 540000,
  fullyParallel: true,
  workers: process.env.CI ? 4 : 2,
  reporter: [
    ['list'],
    ['json', { outputFile: `reports/test-results.json` }],
    ['html', { outputFolder: './playwright-report', open: 'never' }],
  ],
  // Only filter if a tag is provided, case-insensitive
  grep: tag ? new RegExp(`@${tag}`, 'i') : undefined,
});
 
 