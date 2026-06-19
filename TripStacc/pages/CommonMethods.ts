import { test, Page } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage } from './LoginPage';
import { HomePage } from './Homepage';
import { HotelHomePage } from './HotelHomePage';

export class BaseHelper {

  static async launchAndLogin(page: Page): Promise<void> {
    try {

      const projectName = test.info().project.name.toLowerCase();
      console.log(`✅ Running setup for: ${projectName}`);
      await CommonHelper.navigateToHomePage(page);
      await LoginPage.verifyMobileNumberFieldAcceptsInput(page);
      await LoginPage.clickGetOtpButton(page);
      await LoginPage.verifyOtpPageVisible(page);
      await LoginPage.verifyOtpFieldAcceptsInput(page);
      if (projectName.includes('bob')) {
        await LoginPage.verifyLoginButtonWorks(page);
        await page.waitForLoadState('domcontentloaded')
        await HomePage.handlePostLoginFlow(page); 

      } else if (projectName.includes('idfc')) {
        await LoginPage.verifyLoginButtonWorks(page);
        await HotelHomePage.verifyHotelHomePageLoaded(page);

      } else {
        console.warn('⚠️ Unknown client, running default flow');

        await LoginPage.verifyLoginButtonWorks(page);
      }

    } catch (error) {
      console.error(`❌ Setup failed: ${(error as Error).message}`);
      throw error;
    }
  }
}