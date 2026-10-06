# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/HotelPage.test.ts >> SC_017: Add Guest Details and Update Guest Details
- Location: TripStacc/tests/HotelPage.test.ts:534:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('//div[@id=\'user-information\']')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('//div[@id=\'user-information\']')
    14 × locator resolved to <div id="user-information" class="userInfomainSection">…</div>
       - unexpected value "hidden"

```

```yaml
- link:
  - /url: javascript:void(0);
  - img
- heading "Room 1" [level=3]
- paragraph: Enter full name as per Aadhaar or Passport.
- heading "Saved guests" [level=3]
- radio "Mr"
- text: DK Mr. Deepak Kumar SELF
- link:
  - /url: javascript:void(0)
  - img
- radio "Ms"
- text: AO Ms. Adult One IN TRAVEL CIRCLE
- link:
  - /url: javascript:void(0)
  - img
- radio "Ms"
- text: OU Ms. Other User IN TRAVEL CIRCLE
- link:
  - /url: javascript:void(0)
  - img
- radio "Ms"
- text: FM Ms. From My Account
- link:
  - /url: javascript:void(0)
  - img
- radio "Mr"
- text: JD Mr. John Doe
- link:
  - /url: javascript:void(0)
  - img
- link "Add New Guest":
  - /url: javascript:void(0)
- heading "Primary guest details" [level=3]
- radio " Mr." [checked]
- text:  Mr.
- radio "Ms."
- text: Ms.
- radio "Mrs."
- text: Mrs. First Name & Middle Name*
- textbox "Rahul": John
- img "img/svg"
- text: Last Name*
- textbox "Sharma": Doe
- img "img/svg"
- heading "Add to Travel Circle" [level=4]
- checkbox
- paragraph: Earn bonus points & unlock the best value on redemption
- button:
  - img
- link "Add":
  - /url: javascript:void(0)
- img
- text: Duplicate guest details are not allowed.
- img
- text: ₹85,670
- paragraph: 5% cashback on EMI
- button "Next"
```

# Test source

```ts
  408 |         await page.locator(HotelPageLocators.emailField).fill(Data.hotelBookingDataFill.email);
  409 |         await page.waitForTimeout(2000);
  410 |         console.log('Guest details form contact information filled');
  411 |         break;
  412 |       }
  413 |   }
  414 | 
  415 |     static async fillGuestDetailsoutsideFormForBOB(page: Page) {
  416 |       const CLIENT = process.env.CLIENT?.toUpperCase();
  417 |       switch (CLIENT) {
  418 |         case 'BOB':
  419 |         await page.locator(HotelPageLocators.contactNumberField).fill(Data.hotelBookingDataFill.contactNumber);
  420 |         await page.waitForTimeout(2000);
  421 |           break;
  422 |     
  423 |         case 'IDFC':
  424 |         break;
  425 |       }
  426 |   }
  427 | 
  428 |   static async clickEditGuestButton(page: Page) {
  429 |       const CLIENT = process.env.CLIENT?.toUpperCase();
  430 |       switch (CLIENT) {
  431 |         case 'BOB':
  432 |         console.log('⏭️ BOB: Skipping ');
  433 |           break;
  434 |     
  435 |         case 'IDFC':
  436 |         const editGuestButtonLocator = HotelPageLocators.editGuestButton;
  437 |         await ElementHelper.clickElement(page, editGuestButtonLocator);
  438 |         console.log('Edit guest button clicked');
  439 |         break;
  440 |       }
  441 |   }
  442 | 
  443 |   static async updateFirstName(page: Page, firstName: string) {
  444 |     await page.locator(HotelPageLocators.firstNameField).clear();
  445 |     await page.locator(HotelPageLocators.firstNameField).fill(firstName);
  446 |     console.log('First name field updated');
  447 |   }
  448 | static async verifyBookingIdVisible(page: Page) {
  449 |   if (process.env.CLIENT?.toUpperCase() === 'BOB') {
  450 |     await ElementHelper.waitForElementVisible(page, HotelPageLocators.bookingidbob);
  451 |   } else {
  452 |     await ElementHelper.waitForElementVisible(page, HotelPageLocators.bookingId);
  453 |   }
  454 | 
  455 |   console.log("Booking ID is visible.");
  456 | }
  457 |   
  458 |  static async verifyBookingDateVisible(page: Page) {
  459 |   if (process.env.CLIENT?.toUpperCase() === 'BOB') {
  460 |     await ElementHelper.waitForElementVisible(page, HotelPageLocators.bookingdatebob);
  461 |   } else {
  462 |     await ElementHelper.waitForElementVisible(page, HotelPageLocators.bookingDate);
  463 |   }
  464 | 
  465 |   console.log("Booking date is visible.");
  466 | }
  467 | 
  468 |   static async verifyBookingLinksVisible(page: Page) {
  469 |     await ElementHelper.waitForElementVisible(
  470 |       page,
  471 |       HotelPageLocators.Downloadlogobooking
  472 |     );
  473 |     console.log("✅ Download Booking link is visible.");
  474 | 
  475 |     await ElementHelper.waitForElementVisible(
  476 |       page,
  477 |       HotelPageLocators.bookflightlogobooking
  478 |     );
  479 |   console.log("✅ Book Flight link is visible.");
  480 | }
  481 |   static async verifyFareSummaryVisible(page: Page) {
  482 |   const CLIENT = process.env.CLIENT?.toUpperCase();
  483 |   switch (CLIENT) {
  484 |   case 'BOB':
  485 |     const BOBfareSummarySection = HotelPageLocators.fareSummarySection;
  486 |     await ElementHelper.waitForElementVisible(page, BOBfareSummarySection);
  487 |     console.log("Fare summary section is visible.");
  488 |     break;
  489 |   case 'IDFC':
  490 |     const fareSummaryDropdown = HotelPageLocators.fareSummaryDropdown;
  491 |     const fareSummarySection = HotelPageLocators.fareSummarySection;
  492 |  
  493 |     await ElementHelper.clickElement(page, fareSummaryDropdown);
  494 |     await ElementHelper.waitForElementVisible(page, fareSummarySection);
  495 |  
  496 |     console.log("Fare summary section is visible.");
  497 |     break;
  498 |   }
  499 |   }
  500 |   static async verifyGuestDetailsFormVisible(page: Page) {
  501 |       const CLIENT = process.env.CLIENT?.toUpperCase();
  502 |   switch (CLIENT) {
  503 |     case 'BOB':
  504 | 		console.log('⏭️ BOB: Skipping ');
  505 |       break;
  506 |  
  507 |     case 'IDFC':
> 508 |     await expect(page.locator(HotelPageLocators.guestDetailsForm)).toBeVisible();
      |                                                                    ^ Error: expect(locator).toBeVisible() failed
  509 |     console.log('Guest details form is displayed');
  510 |     break;
  511 |   }
  512 |   }
  513 | 
  514 |   static async addButtonAfterAddingGuest(page: Page) {
  515 |     const addButtonLocator = HotelPageLocators.addButtonAfterAddingGuest;
  516 |     await ElementHelper.clickElement(page, addButtonLocator);
  517 |     console.log('Add button after adding guest clicked');
  518 |   }
  519 | 
  520 |     static async addButtonAfterAddingGuestForIdfc(page: Page) {
  521 | 
  522 |       const CLIENT = process.env.CLIENT?.toUpperCase();
  523 |   switch (CLIENT) {
  524 |     case 'BOB':
  525 | 		console.log('⏭️ BOB: Skipping ');
  526 |       break;
  527 |  
  528 |     case 'IDFC':
  529 |         const addButtonLocator = HotelPageLocators.addButtonAfterAddingGuest;
  530 |     await ElementHelper.clickElement(page, addButtonLocator);
  531 |     console.log('Add button after adding guest clicked');
  532 |     break;
  533 |   }
  534 |   }
  535 | 
  536 |   static async nextButtonAfterAddingGuest(page: Page) {
  537 |     const CLIENT = process.env.CLIENT?.toUpperCase();
  538 |     switch (CLIENT) {
  539 |       case 'BOB':
  540 |         const nextButtonLocator = HotelPageLocators.nextButtonAfterAddingGuest;
  541 |         await ElementHelper.clickElement(page, nextButtonLocator);
  542 |         console.log('Next button after adding guest clicked');
  543 |         break;
  544 | 
  545 |       case 'IDFC':
  546 |         console.log('⏭️ IDFC: Skipping ');
  547 |         break;
  548 |     }
  549 |   }
  550 | 
  551 |   static async verifyPanCardNotVisible(page: Page) {
  552 |     await expect(page.locator(HotelPageLocators.panCardText)).toHaveCount(0);
  553 |     console.log('PAN card field is not displayed for domestic bookings');
  554 |   }
  555 | 
  556 |   static async verifyPanCardVisibleAndRequired(page: Page) {
  557 |     await expect(page.locator(HotelPageLocators.panCardText)).toBeVisible();
  558 |     await page.locator(HotelPageLocators.panNumberField).getAttribute('required');
  559 |     console.log('PAN card field is displayed and required');
  560 |   }
  561 | 
  562 |   static async verifyValidPanNumberAccepted(page: Page) {
  563 |     await page.locator(HotelPageLocators.panNumberField).fill(Data.hotelBookingDataFill.panNumber);
  564 |     const value = await page.locator(HotelPageLocators.panNumberField).inputValue();
  565 |     if (value === Data.hotelBookingDataFill.panNumber) {
  566 |       console.log('Valid PAN number accepted successfully');
  567 |     }
  568 |   }
  569 | 
  570 | 
  571 |   static async verifySavedGuestTextVisible(page: Page) {
  572 |       const CLIENT = process.env.CLIENT?.toUpperCase();
  573 |       switch (CLIENT) {
  574 |         case 'BOB':
  575 |         console.log('⏭️ BOB: Skipping ');
  576 |           break;
  577 |     
  578 |         case 'IDFC':
  579 |             await expect(page.locator(HotelPageLocators.savedGuestText)).toBeVisible();
  580 |         console.log('Saved guest text is displayed');
  581 |         break;
  582 |       }
  583 |   }
  584 | 
  585 |     static async printSavedGuestList(page: Page) {
  586 |         const CLIENT = process.env.CLIENT?.toUpperCase();
  587 |         switch (CLIENT) {
  588 |           case 'BOB':
  589 |           console.log('⏭️ BOB: Skipping ');
  590 |             break;
  591 |       
  592 |           case 'IDFC':
  593 |               const guests = await page.$$(HotelPageLocators.savedGuestList);
  594 |           for (let i = 0; i < guests.length; i++) {
  595 | 
  596 |             if (await guests[i].textContent()) {
  597 |               console.log('Saved guest item displayed');
  598 |             }
  599 |           }
  600 |           break;
  601 |         }
  602 |     
  603 |     }
  604 | 
  605 |     static async getSavedGuestName(page: Page): Promise<string> {
  606 |         const CLIENT = process.env.CLIENT?.toUpperCase();
  607 | 
  608 |         switch (CLIENT) {
```