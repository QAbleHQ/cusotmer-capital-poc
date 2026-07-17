import { Page } from '@playwright/test';
import { ElementHelper } from '../../utils/elementHelper';
import { PDPPageLocators } from '../locators/PDPPageLocators';

export class PdpPage {
  static async verifyPdpPageVisible(page: Page) {
    // Some environments render the product title with different tags/classes
    // (or lazy-load the image first). Wait for either the product title or
    // the main product image to become visible so the test is resilient.
    // First, check for Buy Now button — it's a reliable PDP indicator on many
    // templates and often appears faster than some headings/images.
    try {
      await page.locator(PDPPageLocators.buyNowButton).waitFor({ state: 'visible', timeout: 10000 });
      console.log('PDP page is visible (Buy Now button found).');
      return;
    } catch (err) {
      console.warn('Buy Now button not visible within 10s, falling back to title/image checks.');
    }

    try {
      await page.locator(PDPPageLocators.productTitle).waitFor({ state: 'visible', timeout: 10000 });
      console.log('PDP page is visible (title found).');
      return;
    } catch (err) {
      console.warn('Product title not visible within 10s, trying product image fallback.');
    }

    try {
      await page.locator(PDPPageLocators.productImage).waitFor({ state: 'visible', timeout: 10000 });
      console.log('PDP page is visible (image found).');
      return;
    } catch (err) {
      console.error('PDP product title, image and Buy Now button were not visible');
      console.error(`Current URL: ${page.url()}`);
      try {
        const screenshotPath = `test-results/pdp-missing-${Date.now()}.png`;
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.error(`Saved screenshot: ${screenshotPath}`);
      } catch {}
      throw new Error('PDP page did not load correctly: neither title nor image visible');
    }
  }

  static async increaseQuantityToMaximum(page: Page, maxQuantity: number) {
    // Choose the visible/enabled quantity input when multiple matches exist
    const qtyCandidates = page.locator(PDPPageLocators.quantityInput);
    const qtyCount = await qtyCandidates.count();
    let quantityLocator: any = null;
    for (let i = 0; i < qtyCount; i++) {
      const cand = qtyCandidates.nth(i);
      if (await cand.isVisible() && (await cand.isEnabled?.() ?? true)) {
        quantityLocator = cand;
        break;
      }
    }
    if (!quantityLocator && qtyCount > 0) quantityLocator = qtyCandidates.first();

    // Choose a visible increase button similarly
    const incCandidates = page.locator(PDPPageLocators.quantityIncreaseButton);
    const incCount = await incCandidates.count();
    let increaseLocator: any = null;
    for (let i = 0; i < incCount; i++) {
      const cand = incCandidates.nth(i);
      if (await cand.isVisible()) {
        increaseLocator = cand;
        break;
      }
    }
    if (!increaseLocator && incCount > 0) increaseLocator = incCandidates.first();

    if (quantityLocator) {
      const currentValue = parseInt((await quantityLocator.inputValue()).trim(), 10) || 1;
      const targetQty = Math.min(currentValue + 1, maxQuantity);
      for (let i = currentValue; i < targetQty; i++) {
        try {
          if (increaseLocator) {
            await increaseLocator.waitFor({ state: 'visible', timeout: 5000 });
            const btnHandle = await increaseLocator.elementHandle();
            if (btnHandle) {
              await btnHandle.evaluate((n: HTMLElement) => n.scrollIntoView({ block: 'center', inline: 'center' }));
              await btnHandle.evaluate((n: HTMLElement) => (n as HTMLElement).click());
            } else {
              await increaseLocator.click({ force: true });
            }
          } else {
            // No increase button available, try incrementing input directly if writable
            try {
              const val = parseInt((await quantityLocator.inputValue()).trim(), 10) || 1;
              await quantityLocator.fill(String(Math.min(val + 1, maxQuantity)));
            } catch (err) {}
          }
          await page.waitForTimeout(1000);
        } catch (err) {
          const msg = (err as Error).message || '';
          try {
            const path = `test-results/pdp-increase-error-${Date.now()}.png`;
            await page.screenshot({ path, fullPage: false });
            console.error(`Saved screenshot: ${path}`);
          } catch {}
          if (msg.includes('Target page, context or browser has been closed')) {
            throw err;
          }
          console.warn('Increase quantity click failed, continuing', err);
        }
      }
      console.log(`Quantity adjusted to ${Math.min(currentValue + 1, maxQuantity)}`);
    } else {
      // No quantity input found — try a best-effort click on any increase button
      try {
        if (increaseLocator) {
          const btnHandle = await increaseLocator.elementHandle();
          if (btnHandle) {
            await btnHandle.evaluate((n: HTMLElement) => n.scrollIntoView({ block: 'center', inline: 'center' }));
            await btnHandle.evaluate((n: HTMLElement) => (n as HTMLElement).click());
          } else {
            await increaseLocator.click({ force: true });
          }
        }
        await page.waitForTimeout(1000);
      } catch (err) {
        console.warn('Failed to increase quantity (no input found)', err);
      }
      console.log('Quantity increase attempted (no dedicated input found).');
    }
  }

  static async clickBuyNow(page: Page) {
    const locator = page.locator(PDPPageLocators.buyNowButton);
    if (await locator.count() === 0) {
      console.warn('Buy Now button not found on PDP');
      return;
    }

    const handle = await locator.first().elementHandle();
    if (handle) {
      try {
        await handle.evaluate((node: HTMLElement) => {
          node.scrollIntoView({ block: 'center', inline: 'center', behavior: 'auto' });
        });
        await page.waitForTimeout(300);

        // Click via DOM to ensure onclick handlers or inline javascript run.
        await handle.evaluate((node: HTMLElement) => (node as HTMLElement).click());

        // If clicking triggers navigation or a postback, wait for network to settle.
        try {
          await page.waitForLoadState('networkidle', { timeout: 10000 });
        } catch {
          // ignore timeout - click may trigger client-side updates only
        }

        console.log('Clicked Buy Now on PDP (via element.evaluate).');
        return;
      } catch (err) {
        console.warn('Click via element handle failed, attempting fallback.', err);
      }
    }

    // Fallback to a forced locator click
    try {
      await ElementHelper.clickElement(page, PDPPageLocators.buyNowButton);
      console.log('Clicked Buy Now on PDP (via ElementHelper fallback).');
    } catch (err) {
      console.error('Failed to click Buy Now on PDP', err);
      throw err;
    }
  }
}
