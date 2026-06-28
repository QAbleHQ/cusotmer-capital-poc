# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/CheckoutPage.test.ts >> SC_010: Flight - Checkout with and without Promo Codes
- Location: TripStacc/tests/CheckoutPage.test.ts:245:5

# Error details

```
Test timeout of 120000ms exceeded.
```

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1150 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.passportExpiryErrorMessage);
  1151 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.passportExpiryErrorMessage);
  1152 |     break;
  1153 | 
  1154 |     case 'IDFC':
  1155 |     console.log('IDFC: Skipping ');
  1156 |     break;
  1157 |   }
  1158 |   }
  1159 | 
  1160 |   static async EnterNewTravellerPassportNumber(page: any, data: any) {
  1161 |     await ElementHelper.clearAndEnterInTextField(page, FlightPageLocators.defaultPassportNumber, data);
  1162 |     await VerificationHelpers.elementIsHidden(page, FlightPageLocators.passportErrorMessage);
  1163 |   }
  1164 | 
  1165 |   static async EnterNewTravellerPassportCounty(page: any, _data: any) {
  1166 |     await ElementHelper.selectOptionByVisibleText(page, FlightPageLocators.defualtpassportCountry, 'India');
  1167 |     await CommonHelper.performKeyboardAction(page, 'Enter');
  1168 |     await VerificationHelpers.elementIsHidden(page, FlightPageLocators.passportErrorMessage);
  1169 |   }
  1170 | 
  1171 |   static async selectExpireDateForPassport(page: any) {
  1172 |     const CLIENT = process.env.CLIENT?.toUpperCase();
  1173 |   switch (CLIENT) {
  1174 |     case 'BOB':
  1175 |     await ElementHelper.selectOptionByValue(page, FlightPageLocators.passportDay, "10")
  1176 |     await ElementHelper.selectOptionByValue(page, FlightPageLocators.passportMonth, "10")
  1177 |     await ElementHelper.selectOptionByValue(page, FlightPageLocators.passportYear, "2027")
  1178 |     break;
  1179 |  
  1180 |     case 'IDFC':
  1181 |     await ElementHelper.scrollToElement(page, FlightPageLocators.expireDate);
  1182 |     await ElementHelper.clickElement(page, FlightPageLocators.expireDate);
  1183 |     await ElementHelper.selectOptionByValue(page, FlightPageLocators.exprieYear, "2030")
  1184 |     const tomorrow = new Date();
  1185 |     tomorrow.setDate(tomorrow.getDate() + 2);
  1186 |     const targetDay = tomorrow.getDate().toString();
  1187 |     await page.locator(FlightPageLocators.dateCell(targetDay)).click();
  1188 |     break;
  1189 |   }  
  1190 |   }
  1191 |  
  1192 |   static async ScrolltosaveTravellInfo(page: any) {
  1193 |      const CLIENT = process.env.CLIENT?.toUpperCase();
  1194 |   switch (CLIENT) {
  1195 |     case 'BOB':
  1196 |     console.log('BOB: Skipping ');
  1197 |     break;
  1198 |     case 'IDFC':
  1199 |       await ElementHelper.scrollToElement(page, FlightPageLocators.saveTravellInfo);
  1200 |     break;
  1201 |   }  
  1202 |   }
  1203 | 
  1204 |   static async verifyFlightFromAndToShotFormVisible(page: any) {
  1205 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
  1206 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
  1207 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightToNameShotForm);
  1208 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightToNameShotForm);
  1209 | }
  1210 | 
  1211 |   static async verifyInternationalFlightFromAndToShotFormVisible(page: any) {
  1212 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightFromNameShotform);
  1213 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightFromNameShotform);
  1214 |     await ElementHelper.waitForElementVisible(page, FlightPageLocators.FlightTOInternationalName);
  1215 |     await VerificationHelpers.elementIsVisible(page, FlightPageLocators.FlightTOInternationalName);
  1216 |   }
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
> 1250 |     await page.waitForTimeout(3000); // Wait for navigation to complete
       |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
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
  1317 |     await page.waitForTimeout(3000); // Wait for navigation to complete
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
```