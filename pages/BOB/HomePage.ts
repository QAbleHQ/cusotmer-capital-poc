import { expect, Page } from '@playwright/test';
import { HomePageLocators } from '../../locators/bob/HomePageLocators';
import { LoginPage } from '../../pages/BOB/LoginPage';
import { ElementHelper } from '../../utils/elementHelper';
import bobTestData from '../../testdata/bobtestdata.json';
import { PLPPageLocators } from '../../locators/bob/PLPPageLocators';

export class HomePage {

  static async verifyBannerSectionDisplayed(page: Page) {
    const banner = HomePageLocators.bannerSection;
    await ElementHelper.isElementDisplayed(page, banner);
    console.log('✅ Banner section is displayed');
  }

  static async imgInsideBannerIsVisible(page: Page) {
    const imgSelectors = await page.$$(HomePageLocators.imgInsideBanner);
    let displayedCount = 0;
    for (const imgElement of imgSelectors) {
      if (await imgElement.isVisible()) {
        displayedCount += 1;
      }
    }
    // Print to console the number of visible elements
    console.log(`Number of images displayed inside banner: ${displayedCount}`);
  }
  static async verifyCategorySectionDisplayed(page: Page) {
    const category = HomePageLocators.categorySection;
    await ElementHelper.isElementDisplayed(page, category);
    console.log('✅ Category section is displayed');
  }

  static async verifyTrendingSectionDisplayed(page: Page) {
    const locator = HomePageLocators.trendingSection;
    await ElementHelper.scrollToElement(page, locator);
    const isVisible = await ElementHelper.isElementDisplayed(page, locator);
    if (isVisible) {
      console.log('✅ Trending / Earn More Exclusive Deals section should be visible on scrolling');
    } else {
      console.log('❌ Trending / Earn More Exclusive Deals section is NOT visible on scrolling');
    }
  }
  static async verifyCategoryImagesAndTextsDisplayed(page: Page) {
    const imageLocators = await page.$$(HomePageLocators.imageInCategorySection);
    const textLocators = await page.$$(HomePageLocators.textInsideCategorySection);

    if (imageLocators.length !== textLocators.length) {
      console.log(`❌ Mismatch: number of images (${imageLocators.length}) vs texts (${textLocators.length}) in category section`);
    } else {
      console.log(`Number of category images and texts: ${imageLocators.length}`);
    }

    for (let i = 0; i < imageLocators.length; i++) {
      const imgVisible = await imageLocators[i].isVisible();
      const textVisible = await textLocators[i].isVisible();

      const categoryText = await textLocators[i].textContent();

      if (imgVisible && textVisible) {
        console.log(`✅ Category item ${i + 1}: image and text both visible`);
        console.log(`📌 Category Text: ${categoryText?.trim()}`);
      } else {
        if (!imgVisible) {
          console.log(`❌ Category item ${i + 1}: image NOT visible`);
        }
        if (!textVisible) {
          console.log(`❌ Category item ${i + 1}: text NOT visible`);
        }
      }
    }
  }

  static async verifyCategoryNavigationToProductPage(page: Page) {
    const totalCategories = await page.locator(HomePageLocators.imageInCategorySection).count();
    console.log(`Total Categories Found: ${totalCategories}`);
    const startIndex = Math.max(0, totalCategories - 4);
    for (let i = totalCategories - 1; i >= startIndex; i--) {
      const categoryText = (await page.locator(HomePageLocators.textInsideCategorySection).nth(i).textContent())?.trim() || '';
      console.log(`Clicking Category ${i + 1}`);
      //console.log ('Category Text ${categoryText}` );
      await page.locator(HomePageLocators.imageInCategorySection).nth(i).click();
      await page.waitForLoadState('networkidle');
      const currentUrl = page.url();
      if (currentUrl.toLowerCase().includes('product')) {
        console.log(`Category ${i + 1} redirected to Product Page`);
      } else {
        console.log(`Category ${i + 1} did NOT redirect to Product Page`);
      }
      console.log(`URL: ${currentUrl}`);
      const radioButtonText = (await page.locator(HomePageLocators.selectedRadioButton).textContent())?.trim() || '';
      console.log(`Selected Radio Button Text: ${radioButtonText}`);
      const normalizedCategoryText = categoryText.toLowerCase().replace(/&/g, 'and').trim();
      const normalizedRadioText = radioButtonText.toLowerCase().replace(/&/g, 'and').trim();

      if (
        normalizedCategoryText.includes(normalizedRadioText) ||
        normalizedRadioText.includes(normalizedCategoryText)
      ) {
        console.log(
          `✅ Result for "${categoryText}" are displayed according to "${radioButtonText}"`
        );

      } else {
        console.log(
          `Result for "${categoryText}" are NOT displayed according to "${radioButtonText}"`
        );
      }
      await page.goBack();
      await LoginPage.waitUntilDialogBoxDisplayed(page);
      await LoginPage.clickSkipButtonInsideDialogBox(page);
      await page.waitForLoadState('networkidle');
      console.log(`↩️ Returned back after validating Category ${i + 1}`);
    }
    console.log(`Successfully validated last 4 category navigations`);
  }

  static async verifyGiftCardPLPPageVisible(page: Page) {
    const sectionTitle = HomePageLocators.exploreGiftCardTitle;
    await ElementHelper.waitForElementVisible(page, sectionTitle);
    console.log("Gift Card PLP page is visible.");
     await page.waitForTimeout(3000)
  }

  static async verifySectionTitleVisible(page: Page) {
    const sectionTitle = HomePageLocators.exploreGiftCardTitle;
    await ElementHelper.waitForElementVisible(page, sectionTitle);
    console.log("Section title is visible.");
     await page.waitForTimeout(3000)
  }
  static async clickGiftCard(page: Page) {
    const giftCards = page.locator(HomePageLocators.giftCardSectionCards);
    await ElementHelper.waitForElementVisible(page, HomePageLocators.giftCardSectionCards);
    const count = await giftCards.count();
    if (count > 1) {
      await giftCards.nth(1).click();
      console.log("Clicked on 2nd Gift Card.");
    } else {
      console.log("Less than 2 gift cards available.");
    }
  }

  static async verifyProductCardsVisible(page: Page) {
    const productCards = HomePageLocators.giftCardSectionCards;
    const count = await page.locator(productCards).count();
    console.log(` Product cards are visible. Count: ${count}`);
     await page.waitForTimeout(3000)
  }

  static async clickGiftCardOption(page: Page) {
    const giftCardOption = HomePageLocators.giftcardoption;
    await ElementHelper.waitForElementVisible(page, giftCardOption);
    await page.locator(giftCardOption).click();
    console.log("Clicked on Gift Card option.");
  }
  static async verifyProductTitleVisible(page: Page) {
    const productTitle = HomePageLocators.giftCardTitle;
    const titles = page.locator(productTitle);
    const count = await titles.count();
    console.log(`Total product titles: ${count}`);
    for (let i = 0; i < count; i++) {
      const text = await titles.nth(i).innerText();
      console.log(`Product ${i + 1}: ${text}`);
      
    }
  }

  static async verifyEarnPointsBadgeVisible(page: Page) {
    const earnPoints = HomePageLocators.earnPointsBadge;
    const badges = page.locator(earnPoints);
    const count = await badges.count();
    console.log(`Earn Points badge count: ${count}`);

    for (let i = 0; i < count; i++) {
      const text = await badges.nth(i).innerText();
      console.log(`Badge ${i + 1}: ${text}`);
    }
  }

  static async verifyPointsAndCashVisible(page: Page) {
    const pointsCash = HomePageLocators.pointsAndCashText;
    const pricing = page.locator(pointsCash);
    const count = await pricing.count();
    console.log(`✅ Points + Cash entries: ${count}`);
    for (let i = 0; i < count; i++) {
      const text = await pricing.nth(i).innerText();
      console.log(`${text}`);
    }
  }

  static async verifyGridLayout(page: Page) {
    const productCards = HomePageLocators.giftCardSectionCards;
    const count = await page.locator(productCards).count();
    console.log(`Grid layout verified. Total cards: ${count}`);
  }

}