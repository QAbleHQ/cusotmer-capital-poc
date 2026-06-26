import { expect, Page } from '@playwright/test';
import { LoginPageLocators } from '../../TripStacc/locators/LoginPageLocators';
import { ElementHelper } from '../../utils/elementHelper';
import { Data } from '../../utils/dataProvider';
import { DeviceHelper } from '../../utils/deviceHelper';
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
      console.log('BOB: Card selected and homepage loaded');
      break;
      
    default:

  }
}

    static async handlePostLoginFlowForMobile(page: Page): Promise<void> {

        if(DeviceHelper.isMobile()) {
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
  }