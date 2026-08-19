# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/FlightPage.test.ts >> SC_008: With and without Add-Ons Selection (Seat/Baggage/Meal) 
- Location: TripStacc/tests/FlightPage.test.ts:1063:5

# Error details

```
Error: expect(received).toBeGreaterThan(expected)

Expected: > 2516
Received:   2516
```

# Test source

```ts
  1302 |   switch (CLIENT) {
  1303 |     case 'BOB':
  1304 |     console.log('BOB: Skipping ');
  1305 |     break;
  1306 |     case 'IDFC':
  1307 |       await ElementHelper.scrollToElement(page, FlightPageLocators.saveTravellInfo);
  1308 |     break;
  1309 |   }  
  1310 |   }
  1311 | 
  1312 |   static async verifyFlightFromAndToShotFormVisible(page: any) {
  1313 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
  1314 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
  1315 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightToNameShotForm);
  1316 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightToNameShotForm);
  1317 | }
  1318 | 
  1319 |   static async verifyInternationalFlightFromAndToShotFormVisible(page: any) {
  1320 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
  1321 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
  1322 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightTOInternationalName);
  1323 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightTOInternationalName);
  1324 |   }
  1325 | 
  1326 |   static async clickOnFirstTravellerName(page: any) {
  1327 |      const CLIENT = process.env.CLIENT?.toUpperCase();
  1328 |   switch (CLIENT) {
  1329 |     case 'BOB':
  1330 |     console.log('BOB: Skipping ');
  1331 |     break;
  1332 |     case 'IDFC':
  1333 |    console.log('BOB: Skipping ');
  1334 |     break;
  1335 |   }
  1336 | }
  1337 | static async clickOnFirstTraveller(page: any) {
  1338 |      const CLIENT = process.env.CLIENT?.toUpperCase();
  1339 |   switch (CLIENT) {
  1340 |     case 'BOB':
  1341 |     console.log('BOB: Skipping ');
  1342 |     break;
  1343 |     case 'IDFC':
  1344 |   await page.click(`(//div[contains(@class,'inputcheckbox')]//label)[2]`)
  1345 |     break;
  1346 |   }
  1347 | }
  1348 | 
  1349 | static async clickOncontinueButtonOnTravellerPage(page: any) {
  1350 |    const CLIENT = process.env.CLIENT?.toUpperCase();
  1351 |   switch (CLIENT) {
  1352 |     case 'BOB':
  1353 |     console.log('BOB: Skipping ');
  1354 |     break;
  1355 |     case 'IDFC':
  1356 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellerDetailsPageContinuebutton);
  1357 |     await ElementHelper.clickElement(page, FlightPageLocators.travellerDetailsPageContinuebutton);
  1358 |     await page.waitForTimeout(3000);
  1359 |     break;
  1360 |   }
  1361 | }
  1362 | 
  1363 | static async travellersAndAddonsContinueButton(page: any) {
  1364 |     if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellersAndAddonsContinueButton)) {
  1365 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.travellersAndAddonsContinueButton);
  1366 |       await ElementHelper.clickElement(page, FlightPageLocators.travellersAndAddonsContinueButton);
  1367 |   }
  1368 |     await page.waitForTimeout(3000); // Wait for navigation to complete
  1369 | }
  1370 | 
  1371 | 
  1372 | static async verifySeatSelectionOptionVisible(page: any) {
  1373 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatSelectionOption)) {
  1374 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatSelectionOption);
  1375 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatSelectionOption);
  1376 |   }
  1377 | }
  1378 | 
  1379 | static async verifyBaggageSelectionOptionVisible(page: any) {
  1380 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
  1381 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.baggageSelectionOption);
  1382 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.baggageSelectionOption);
  1383 |   }
  1384 | }
  1385 | 
  1386 | static async verifySeatMapVisible(page: any) {
  1387 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.seatMapContainer);
  1388 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.seatMapContainer);
  1389 | }
  1390 | 
  1391 | static async verifyPriceIncreasesAfterSeatSelection(page: any) {
  1392 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.seatPrice)) {
  1393 |     const beforePriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1394 |     const beforePrice = Number(beforePriceText?.replace(/[₹,\s]/g, ''));
  1395 |     console.log(`Price Before Seat Selection: ${beforePrice}`);
  1396 |     await ElementHelper.clickElement(page, FlightPageLocators.availableSeat);
  1397 |     await page.waitForTimeout(2000);
  1398 |     const afterPriceText = await page.locator(FlightPageLocators.seatPrice).textContent();
  1399 | 
  1400 |     const afterPrice = Number(afterPriceText?.replace(/[₹,\s]/g, ''));
  1401 |     console.log(`Price After Seat Selection: ${afterPrice}`);
> 1402 |     expect(afterPrice).toBeGreaterThan(beforePrice);
       |                        ^ Error: expect(received).toBeGreaterThan(expected)
  1403 |     console.log(`Price Increased By ₹${afterPrice - beforePrice}`);
  1404 |   }
  1405 | }
  1406 | 
  1407 | static async clickOnbaggageOption(page: any) {
  1408 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.baggageSelectionOption)) {
  1409 |     await ElementHelper.clickElement(page, FlightPageLocators.baggageSelectionOption);
  1410 |     await page.waitForTimeout(3000); 
  1411 |   }
  1412 | }
  1413 | 
  1414 |   static async verifyPriceIncreasesAfterWeeightIncrease(page: any) {
  1415 |   const desktopBtn = page.locator(
  1416 |     FlightPageLocators.weightIncreasePlusButton
  1417 |   );
  1418 | 
  1419 |   const mobileBtn = page.locator(
  1420 |     FlightPageLocators.weightincreaseplusbuttonmob
  1421 |   );
  1422 | 
  1423 |   try {
  1424 |     const isDesktopVisible = await desktopBtn.isVisible();
  1425 | const isMobileVisible = await mobileBtn.isVisible();
  1426 | 
  1427 | if (!isDesktopVisible && !isMobileVisible) {
  1428 |   console.log('Weight increase button not visible');
  1429 |   return;
  1430 | }
  1431 | 
  1432 | const weightBtn = isDesktopVisible
  1433 |   ? desktopBtn
  1434 |   : mobileBtn;
  1435 | 
  1436 |     const beforePrice = Number(
  1437 |       (await page.locator(FlightPageLocators.seatPrice).textContent())
  1438 |         ?.replace(/[₹,\s]/g, '')
  1439 |     );
  1440 | 
  1441 |     await weightBtn.click();
  1442 |     await page.waitForTimeout(5000);
  1443 | 
  1444 |     const afterPrice = Number(
  1445 |       (await page.locator(FlightPageLocators.seatPrice).textContent())
  1446 |         ?.replace(/[₹,\s]/g, '')
  1447 |     );
  1448 | 
  1449 |     expect(afterPrice).toBeGreaterThan(beforePrice);
  1450 |   } catch {
  1451 |     console.log('Weight increase button not visible');
  1452 |   }
  1453 | }
  1454 | 
  1455 | static async clickOnSkipButton(page: any) {
  1456 |     if(await ElementHelper.isElementDisplayed(page, FlightPageLocators.skipAndPayButton)) {
  1457 |       await ElementHelper.clickElement(page, FlightPageLocators.skipAndPayButton);
  1458 |     }
  1459 |     await page.waitForTimeout(3000); // Wait for navigation to complete
  1460 | }
  1461 | 
  1462 | static async verifyTravellerAndAddOneHeadingVisible(page: any) {
  1463 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1464 |   switch (CLIENT) {
  1465 |     case 'BOB':
  1466 |     console.log('BOB: Skipping ');
  1467 |     break;
  1468 |     case 'IDFC':
  1469 |   if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.travellerAndAddoneHeading)) {
  1470 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.travellerAndAddoneHeading);
  1471 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators .travellerAndAddoneHeading);
  1472 |   }
  1473 |   break;
  1474 | }
  1475 | }
  1476 | 
  1477 | static async reloadIfNoRecordFound(page: any) {
  1478 |     const noFlightsTextLocator = FlightPageLocators.noFlightsText;
  1479 |     while (await page.locator(noFlightsTextLocator).isVisible()) {
  1480 |         await page.reload();
  1481 |         await page.waitForTimeout(15000);
  1482 |         if (await ElementHelper.isElementDisplayed(page, FlightPageLocators.firstFlightCard)) {
  1483 |           break;
  1484 |         }
  1485 |     }
  1486 | }
  1487 | 
  1488 | static async verifyTravellerCount(page: Page,expectedTravellerCount: string): Promise<void> {
  1489 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  1490 |   switch (CLIENT) {
  1491 |     case 'BOB':
  1492 |       console.log('BOB: Skipping traveller count verification.');
  1493 |       break;
  1494 | 
  1495 |     case 'IDFC':
  1496 |       const summaryText = await page.locator(FlightPageLocators.travelsummaryCount).textContent();
  1497 |       const actualTravellerCount = summaryText?.match(/\d+(?=\s*Traveller)/i)?.[0];
  1498 | 
  1499 |       console.log(`Expected Count: ${expectedTravellerCount}`);
  1500 |       console.log(`Actual Count: ${actualTravellerCount}`);
  1501 | 
  1502 |       expect(actualTravellerCount).toBe(expectedTravellerCount);
```