import { expect, Page } from '@playwright/test';
import { ElementHelper } from '../../utils/elementHelper';
import { PLPPageLocators } from '../../locators/bob/PLPPageLocators';

export class PLPPage {

    static async verifyGiftCardDetailsVisible(page: Page) {

        const giftCardTitle = PLPPageLocators.giftCardTitle;
        const quantitySelector = PLPPageLocators.quantityIncreaseButton;
        const buyNowButton = PLPPageLocators.buyNowButton;
        const description = PLPPageLocators.productDescriptionSection;
        const giftCardImage = PLPPageLocators.giftCardImage;

        await ElementHelper.waitForElementVisible(page, giftCardTitle);
        const titleText = await page.locator(giftCardTitle).innerText();
        console.log(`Gift card title is visible: ${titleText}`);

        await ElementHelper.waitForElementVisible(page, quantitySelector);
        console.log("Quantity selector is visible.");

        await ElementHelper.waitForElementVisible(page, buyNowButton);
        console.log("Buy Now button is visible.");

        await ElementHelper.waitForElementVisible(page, description);
        const descriptionText = await page.locator(description).innerText();
        console.log(`Description section is visible: ${descriptionText}`);

        await ElementHelper.waitForElementVisible(page, giftCardImage);
        console.log("Gift card image is visible.");

        console.log("All Gift Card detail elements are visible.");
    }

    static async clickQuantityIncreaseButton(page: Page) {
        const quantitySelector = PLPPageLocators.quantityIncreaseButton;
        await page.locator(quantitySelector).click();
        await page.waitForTimeout(2000);
         await page.locator(quantitySelector).click();
        console.log("Clicked on quantity increase button.");
    }

    static async clickBuyNowButton(page: Page) {
        const buyNowButton = PLPPageLocators.buyNowButton;
        await page.locator(buyNowButton).click();
        console.log("Clicked on Buy Now button.");
    }

}