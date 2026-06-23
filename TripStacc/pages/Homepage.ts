import { expect, Page } from '@playwright/test';
import { LoginPageLocators } from '../../TripStacc/locators/LoginPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
import idfcTestData from '../../testdata/tripStacc.json';
import { Data } from '../../utils/dataProvider';
import { HotelHomePage } from './HotelHomePage';
import { FlightHomePage } from './FlightHomePage';

export class HomePage {

  static async handlePostLoginFlow(page: Page): Promise<void> {
  const CLIENT = process.env.CLIENT?.toUpperCase();
  switch (CLIENT) {
    case 'BOB':
      await page.waitForLoadState('domcontentloaded');
      await FlightHomePage.verifyCardSelectionPopupVisible(page);
      await FlightHomePage.selectCard(page);
      await FlightHomePage.verifyPopupClosed(page);
      await HotelHomePage.verifyHotelHomePageLoaded(page);
      console.log('✅ BOB: Card selected and homepage loaded');
      break;
      
    default:

  }
}
}