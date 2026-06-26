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
  253 |     await FlightHomePage.VerifyFromAirpotDropdownVisible(page);
  254 |     await FlightHomePage.clickOnFirstSearchResultfromCityDropdown(page);
  255 |   })
  256 | 
  257 |   await test.step("Step 3: Enter City To Airport", async () => {
  258 |     await page.waitForTimeout(5000);
  259 |     await FlightHomePage.clickOnToAirport(page);
  260 |     await FlightHomePage.EnterCityToAirport(page, Data.flightPage.enterCityTo);
  261 |   })
  262 | 
  263 |   await test.step("Step 4: Verify To Airport Dropdown Visible", async () => {
  264 |     await FlightHomePage.VerifyToAirpotDropdownVisible(page);
  265 |     await FlightHomePage.clickOnfirstSearchResultToCityDropdown(page);
  266 |   })
  267 | 
  268 |   await test.step("Step 5: Enter date of departure", async () => {
  269 |     await page.waitForTimeout(5000);
  270 |     await FlightHomePage.clickOnDepartureDate(page);
  271 |     await FlightHomePage.selectTomorrowDateForDeparture(page);
  272 |   })
  273 | 
  274 |   await test.step("Step 6: Click and verify travellers and cabin class dropdown", async () => {
  275 |     await page.waitForTimeout(5000);
  276 |     await FlightHomePage.clickOntravellersAndCabinClass(page);
  277 |     await FlightHomePage.VerifytravellersAndCabinClassDropdownVisible(page);
  278 |     await FlightHomePage.clickOntravellersAndCabinClass(page);
  279 |     await FlightHomePage.clickOnCloseTravellersAndCabinClassDropdown(page);
  280 |     await page.waitForTimeout(3000);
  281 |   });
  282 | 
  283 |   await test.step("Step 7: Click search flights button", async () => {
  284 |     await FlightHomePage.clickOnSearchFlightsButton(page);
  285 |   });
  286 | 
  287 |   await test.step("Step 8: Verify first flight card visible", async () => {
  288 |     await FlightHomePage.VerifyFirstFlightCardVisible(page);
  289 |   });
  290 | 
  291 |   await test.step("Step 9: Click on Next Button On Flight Details Page", async () => {
  292 |     await FlightHomePage.clickOnNextButtonOnFlightDetailsPage(page);
  293 |   });
  294 |   await test.step("Step 10: Click on Book Button On Flight Details Page", async () => {
  295 |     await FlightHomePage.clickOnBookButtonOnFlightDetailsPage(page);
  296 |   });
  297 | 
  298 |   await test.step("Step 11: Click on Continue Button On Flight Details Page", async () => {
  299 |     await FlightHomePage.clickOnContinueButtonOnFlightDetailsPage(page);
  300 |   });
  301 |   await test.step("Step 12: Click on First Traveller Edit Button On Traveller Details Page", async () => {
  302 |     await FlightHomePage.clickOnFirstNameEditButton(page);
  303 |   });
  304 |   await test.step("Step 13: Enter First Name of Traveller", async () => {
  305 |     await FlightHomePage.EnterRandomFirstName(page);
  306 |   });
  307 | 
  308 |   await test.step("Step 14: Enter Last Name of Traveller", async () => {
  309 |     await FlightHomePage.EnterLastName(page, Data.travellername.lastName);
  310 |     await FlightHomePage.enterMobileNo(page, Data.travellername.mobileNo);
  311 |   });
  312 | 
  313 |   await test.step("Step 15: Click on Add Traveller Button On Traveller Details Page", async () => {
  314 |     const CLIENT = process.env.CLIENT?.toUpperCase();
  315 |     if (CLIENT === 'BOB') {
  316 |       await FlightHomePage.clickOnAddTravellerButton(page);
  317 |     } else if (CLIENT === 'IDFC') {
  318 |       await FlightHomePage.clickOnEditConfirmButtonPage(page);
  319 |     }
  320 |   });
  321 | 
  322 |   await test.step("Step 16: Click on first Traveller Name On Traveller Details Page", async () => {
  323 |     await FlightHomePage.clickOnFirstTravellerName(page);
  324 |   });
  325 | 
  326 |   await test.step("Step 17: Click on continue button On Traveller Details Page", async () => {
  327 |     await FlightHomePage.clickOncontinueButtonOnTravellerPage(page);
  328 |   });
  329 | 
  330 |   await test.step("Step 18: verify Seat Selection Option Visible", async () => {
  331 |     await FlightHomePage.verifySeatSelectionOptionVisible(page);
  332 |   });
  333 | 
  334 |   await test.step("Step 19: verify Baggage Selection Option Visible", async () => {
  335 |     await FlightHomePage.verifyBaggageSelectionOptionVisible(page);
  336 |   });
  337 |   await test.step("Step 20: verify Selecting available seat increase price", async () => {
  338 |     await FlightHomePage.verifyPriceIncreasesAfterSeatSelection(page);
  339 |   });
  340 |   await test.step("Step 21: Click on baggage Option", async () => {
  341 |     await FlightHomePage.clickOnbaggageOption(page);
  342 |   });
  343 |   await test.step("Step 22: verify increase the weight increase the price", async () => {
  344 |     await FlightHomePage.verifyPriceIncreasesAfterWeeightIncrease(page);
  345 |   });
  346 |   await test.step("Step 23: Click on Skip Option", async () => {
  347 |     await FlightHomePage.clickOnSkipButton(page);
  348 |   });
  349 |   await test.step("Step 24: verify traveller and add one ", async () => {
  350 |     await FlightHomePage.verifyTravellerAndAddOneHeadingVisible(page);
  351 |   });
  352 |   await test.step("Step 25: Click on Travellers and Addons Continue Button", async () => {
> 353 |     await page.waitForTimeout(5000);
      |                ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  354 |     await FlightHomePage.travellersAndAddonsContinueButton(page);
  355 |     await page.waitForTimeout(1000);
  356 |   });
  357 |   await test.step("Step 26: click On Promo Code And Enter Code", async () => {
  358 |     await PaymentPage.clickOnPromoCodeAndEnterCode(page, Data.promocode.invalidPromoCode);
  359 |   });
  360 |   await test.step("Step 27: Click On Apply PromoCode", async () => {
  361 |     await PaymentPage.clickOnApplyPromoCode(page);
  362 |   });
  363 |   await test.step("Step 28: verify Error Message Visible", async () => {
  364 |     await PaymentPage.verifyErrorMessageVisible(page);
  365 |   });
  366 | });
  367 | test('SC_011: Flight - Proceed with payment', { tag: ['@IDFC', '@BOB','@Flight', '@Common', '@Payment', '@Regression'] }, async () => {
  368 |   await test.step("Step 1: Enter City From Airport", async () => {
  369 |     await page.waitForTimeout(5000);
  370 |     await FlightHomePage.clickOnCityFromAirport(page);
  371 |     await FlightHomePage.EnterCityFromAirport(page, Data.flightPage.enterCityFrom);
  372 |   })
  373 | 
  374 |   await test.step("Step 2: Verify From Airport Dropdown Visible", async () => {
  375 |     await FlightHomePage.VerifyFromAirpotDropdownVisible(page);
  376 |     await FlightHomePage.clickOnFirstSearchResultfromCityDropdown(page);
  377 |   })
  378 | 
  379 |   await test.step("Step 3: Enter City To Airport", async () => {
  380 |     await page.waitForTimeout(5000);
  381 |     await FlightHomePage.clickOnToAirport(page);
  382 |     await FlightHomePage.EnterCityToAirport(page, Data.flightPage.enterCityTo);
  383 |   })
  384 | 
  385 |   await test.step("Step 4: Verify To Airport Dropdown Visible", async () => {
  386 |     await FlightHomePage.VerifyToAirpotDropdownVisible(page);
  387 |     await FlightHomePage.clickOnfirstSearchResultToCityDropdown(page);
  388 |   })
  389 | 
  390 |   await test.step("Step 5: Enter date of departure", async () => {
  391 |     await page.waitForTimeout(5000);
  392 |     await FlightHomePage.clickOnDepartureDate(page);
  393 |     await FlightHomePage.selectTomorrowDateForDeparture(page);
  394 |   })
  395 | 
  396 |   await test.step("Step 6: Click and verify travellers and cabin class dropdown", async () => {
  397 |     await page.waitForTimeout(5000);
  398 |     await FlightHomePage.clickOntravellersAndCabinClass(page);
  399 |     await FlightHomePage.VerifytravellersAndCabinClassDropdownVisible(page);
  400 |     await FlightHomePage.clickOntravellersAndCabinClass(page);
  401 |     await FlightHomePage.clickOnCloseTravellersAndCabinClassDropdown(page);
  402 |     await page.waitForTimeout(3000);
  403 |   });
  404 | 
  405 |   await test.step("Step 7: Click search flights button", async () => {
  406 |     await FlightHomePage.clickOnSearchFlightsButton(page);
  407 |   });
  408 | 
  409 |   await test.step("Step 8: Verify first flight card visible", async () => {
  410 |     await FlightHomePage.VerifyFirstFlightCardVisible(page);
  411 |   });
  412 | 
  413 |   await test.step("Step 9: Click on Next Button On Flight Details Page", async () => {
  414 |     await FlightHomePage.clickOnNextButtonOnFlightDetailsPage(page);
  415 |   });
  416 |   await test.step("Step 10: Click on Book Button On Flight Details Page", async () => {
  417 |     await FlightHomePage.clickOnBookButtonOnFlightDetailsPage(page);
  418 |   });
  419 | 
  420 |   await test.step("Step 11: Click on Continue Button On Flight Details Page", async () => {
  421 |     await FlightHomePage.clickOnContinueButtonOnFlightDetailsPage(page);
  422 |   });
  423 |   await test.step("Step 12: Click on First Traveller Edit Button On Traveller Details Page", async () => {
  424 |     await FlightHomePage.clickOnFirstNameEditButton(page);
  425 |   });
  426 |   await test.step("Step 13: Enter First Name of Traveller", async () => {
  427 |     await FlightHomePage.EnterRandomFirstName(page);
  428 |   });
  429 | 
  430 |   await test.step("Step 14: Enter Last Name of Traveller", async () => {
  431 |     await FlightHomePage.EnterLastName(page, Data.travellername.lastName);
  432 |     await FlightHomePage.enterMobileNo(page, Data.travellername.mobileNo);
  433 |   });
  434 | 
  435 |   await test.step("Step 15: Click on Add Traveller Button On Traveller Details Page", async () => {
  436 |     const CLIENT = process.env.CLIENT?.toUpperCase();
  437 |     if (CLIENT === 'BOB') {
  438 |       await FlightHomePage.clickOnAddTravellerButton(page);
  439 |     } else if (CLIENT === 'IDFC') {
  440 |       await FlightHomePage.clickOnEditConfirmButtonPage(page);
  441 |     }
  442 |   });
  443 | 
  444 |   await test.step("Step 16: Click on first Traveller Name On Traveller Details Page", async () => {
  445 |     await FlightHomePage.clickOnFirstTravellerName(page);
  446 |   });
  447 | 
  448 |   await test.step("Step 17: Click on continue button On Traveller Details Page", async () => {
  449 |     await FlightHomePage.clickOncontinueButtonOnTravellerPage(page);
  450 |   });
  451 | 
  452 |   await test.step("Step 18: verify Seat Selection Option Visible", async () => {
  453 |     await FlightHomePage.verifySeatSelectionOptionVisible(page);
```