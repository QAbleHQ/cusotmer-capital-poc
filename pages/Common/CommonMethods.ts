import { test, Page } from '@playwright/test';
import { CommonHelper } from '../../utils/commonHelper';
import { LoginPage as BobLoginPage } from '../BOB/LoginPage';
import { LoginPage as IdfcLoginPage } from '../IDFC/LoginPage';
 
export class BaseHelper {
 
  static async launchAndLogin (page: Page): Promise<void> {
    try {
      const projectName = test.info().project.name.toLowerCase();
      console.log(`Running setup for: ${projectName}`);
 
      await CommonHelper.navigateToHomePage(page);
 
      if (projectName.includes('bob')) {
        console.log('Executing BOB setup');
        await BobLoginPage.LoginCredEnterBeforeEach(page);
        await BobLoginPage.RestrictionPageBeforeEach(page);
      }
      else if (projectName.includes('idfc')) {
        console.log('Executing IDFC setup');
        await IdfcLoginPage.loginWithValidCredentials(page);
      }
 
    } catch (error) {
      console.error(`Setup failed: ${(error as Error).message}`);
    }
  }
}