# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/CheckoutPage.test.ts >> SC_009.01: Flight - Checkout with and without Redeem Points (without redeem it should be an earning) 
- Location: TripStacc/tests/CheckoutPage.test.ts:116:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1217 | 
  1218 |   static async clickOnFirstTravellerName(page: any) {
  1219 |      const CLIENT = process.env.CLIENT?.toUpperCase();
  1220 |   switch (CLIENT) {
  1221 |     case 'BOB':
  1222 |     console.log('BOB: Skipping ');
  1223 |     break;
  1224 |     case 'IDFC':
  1225 |     await ElementHelper.clickElement(page, FlightPageLocators.FirstTravellerCheckbox);
  1226 |     await page.waitForTimeout(3000);
  1227 |     break;
  1228 |   }
  1229 | }
  1230 | 
  1231 | static async clickOncontinueButtonOnTravellerPage(page: any) {
  1232 |    const CLIENT = process.env.CLIENT?.toUpperCase();
  1233 |   switch (CLIENT) {
  1234 |     case 'BOB':
  1235 |     console.log('BOB: Skipping ');
  1236 |     break;
  1237 |     case 'IDFC':
  1238 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellerDetailsPageContinuebutton);
  1239 |     await ElementHelper.clickElement(page, FlightPageLocators.travellerDetailsPageContinuebutton);
  1240 |     await page.waitForTimeout(3000);
  1241 |     break;
  1242 |   }
  1243 | }
  1244 | 
  1245 | static async travellersAndAddonsContinueButton(page: any) {
  1246 |     if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellersAndAddonsContinueButton)) {
  1247 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellersAndAddonsContinueButton);
  1248 |       await ElementHelper.clickElement(page, FlightPageLocators.travellersAndAddonsContinueButton);
  1249 |   }
  1250 |     await page.waitForTimeout(3000); // Wait for navigation to complete
  1251 | }
  1252 | 
  1253 | 
  1254 | static async verifySeatSelectionOptionVisible(page: any) {
  1255 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatSelectionOption)) {
  1256 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatSelectionOption);
  1257 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatSelectionOption);
  1258 |   }
  1259 | }
  1260 | 
  1261 | static async verifyBaggageSelectionOptionVisible(page: any) {
  1262 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
  1263 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.baggageSelectionOption);
  1264 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.baggageSelectionOption);
  1265 |   }
  1266 | }
  1267 | 
  1268 | static async verifySeatMapVisible(page: any) {
  1269 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatMapContainer);
  1270 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatMapContainer);
  1271 | }
  1272 | 
  1273 | static async verifyPriceIncreasesAfterSeatSelection(page: any) {
  1274 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatPrice)) {
  1275 |     const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1276 |     const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
  1277 |     console.log(`Price Before Seat Selection: ${beforePrice}`);
  1278 |     await ElementHelper.clickElement(page, FlightPageLocators.availableSeat);
  1279 |     await page.waitForTimeout(2000);
  1280 |     const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1281 | 
  1282 |     const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
  1283 |     console.log(`Price After Seat Selection: ${afterPrice}`);
  1284 |     expect(afterPrice).toBeGreaterThan(beforePrice);
  1285 |     console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
  1286 |   }
  1287 | }
  1288 | 
  1289 | static async clickOnbaggageOption(page: any) {
  1290 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
  1291 |     await ElementHelper.clickElement(page, FlightPageLocators.baggageSelectionOption);
  1292 |     await page.waitForTimeout(3000); 
  1293 |   }
  1294 | }
  1295 | 
  1296 | static async verifyPriceIncreasesAfterWeeightIncrease(page: any) {
  1297 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatPrice)) {
  1298 |     const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1299 |     const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
  1300 |     console.log(`Price Before Seat Selection: ${beforePrice}`);
  1301 |     await ElementHelper.clickElement(page, FlightPageLocators.weightIncreasePlusButton);
  1302 |     await page.waitForTimeout(2000);
  1303 |     const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1304 | 
  1305 |     const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
  1306 |     console.log(`Price After Seat Selection: ${afterPrice}`);
  1307 |     expect(afterPrice).toBeGreaterThan(beforePrice);
  1308 | 
  1309 |     console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
  1310 |   }
  1311 | }
  1312 | 
  1313 | static async clickOnSkipButton(page: any) {
  1314 |     if(await ElementHelper.isElementDisplayed(page, FlightPageLocators.skipAndPayButton)) {
  1315 |       await ElementHelper.clickElement(page, FlightPageLocators.skipAndPayButton);
  1316 |     }
> 1317 |     await page.waitForTimeout(3000); // Wait for navigation to complete
       |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  1318 | }
  1319 | 
  1320 | static async verifyTravellerAndAddOneHeadingVisible(page: any) {
  1321 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1322 |   switch (CLIENT) {
  1323 |     case 'BOB':
  1324 |     console.log('BOB: Skipping ');
  1325 |     break;
  1326 |     case 'IDFC':
  1327 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellerAndAddoneHeading)) {
  1328 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerAndAddoneHeading);
  1329 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators .travellerAndAddoneHeading);
  1330 |   }
  1331 |   break;
  1332 | }
  1333 | }
  1334 | 
  1335 | static async reloadIfNoRecordFound(page: any) {
  1336 |     const noFlightsTextLocator = FlightPageLocators.noFlightsText;
  1337 |     while (await page.locator(noFlightsTextLocator).isVisible()) {
  1338 |         await page.reload();
  1339 |         await page.waitForTimeout(15000);
  1340 |         if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.firstFlightCard)) {
  1341 |           break;
  1342 |         }
  1343 |     }
  1344 | }
  1345 | 
  1346 | static async verifyTravellerCount(page: Page,expectedTravellerCount: string): Promise<void> {
  1347 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1348 |   switch (CLIENT) {
  1349 |     case 'BOB':
  1350 |       console.log('BOB: Skipping traveller count verification.');
  1351 |       break;
  1352 | 
  1353 |     case 'IDFC':
  1354 |       const summaryText = await page.locator(FlightPageLocators.travelsummaryCount).textContent();
  1355 |       const actualTravellerCount = summaryText?.match(/\d+(?=\s*Traveller)/i)?.[0];
  1356 | 
  1357 |       console.log(`Expected Count: ${expectedTravellerCount}`);
  1358 |       console.log(`Actual Count: ${actualTravellerCount}`);
  1359 | 
  1360 |       expect(actualTravellerCount).toBe(expectedTravellerCount);
  1361 |       break;
  1362 | 
  1363 |     default:
  1364 |       console.log(`No traveller count logic configured for client: ${CLIENT}`);
  1365 |       break;
  1366 |   }
  1367 | }
  1368 | 
  1369 | static async VerifyOneWayRoundTripCalendarVisible(page: any) {
  1370 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1371 |   switch (CLIENT) {
  1372 |     case 'BOB':
  1373 |       console.log('BOB: Skipping Verify One Way Round Trip Calendar verification.');
  1374 |       break;
  1375 |     case 'IDFC':  
  1376 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
  1377 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.VerifyOneWayRoundTripCalendar);
  1378 |     break;
  1379 |   }
  1380 | }
  1381 | 
  1382 | static async verifyTravelClass(page: Page): Promise<void> {
  1383 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1384 |   switch (CLIENT) {
  1385 |     case 'BOB':
  1386 |       console.log('BOB: Skipping Verify Travel Class verification.');
  1387 |       break;
  1388 |     case 'IDFC':  
  1389 |     const summaryText = await page.locator(FlightPageLocators.travelsummaryCount).textContent();
  1390 |     console.log(`Result Page Text: ${summaryText}`);
  1391 |     expect(summaryText).toContain(FlightHomePage.selectedTravelClass);
  1392 |     console.log(`Verified Class: ${FlightHomePage.selectedTravelClass}`);
  1393 |     break;
  1394 |   }
  1395 | }
  1396 | static async clickOnFilterListButton(page: any) {
  1397 |   await page.waitForTimeout(5000);
  1398 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1399 |   if(DeviceHelper.isMobile() && CLIENT === 'IDFC') {
  1400 |     await ElementHelper.clickElement(page, FlightPageLocators.filterIconMobile);
  1401 |   } else if(DeviceHelper.isMobile() && CLIENT === 'BOB') {
  1402 |     await ElementHelper.clickElement(page, FlightPageLocators.filterButtonMobileForBOB);
  1403 |   } else if(CLIENT === 'BOB'){
  1404 |     console.log('BOB: Skipping');
  1405 |   }
  1406 |   else{
  1407 |     await ElementHelper.clickElement(page, FlightPageLocators.flightListFilterButton);
  1408 |   }
  1409 |   }
  1410 | 
  1411 |   static async clickOnFilterApplyButton(page: any) {
  1412 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1413 |   switch (CLIENT) {
  1414 |     case 'BOB':
  1415 |       console.log('BOB: Skipping Filter Apply Button verification.');
  1416 |       break;
  1417 |     case 'IDFC': 
```