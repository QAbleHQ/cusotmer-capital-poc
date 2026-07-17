const { chromium } = require('@playwright/test');

const BASE_URL = "https://uat-sso.ai-loyalty.com/Login/UYTC-IIU8D-FJHK89C-SH87AASRC-U20230306T";

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();

  try {
    console.log('Navigating...');
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });

    console.log('Filling mobile number...');
    await page.waitForSelector("#txtMobileNo", { state: 'visible', timeout: 30000 });
    await page.fill("#txtMobileNo", "8400119794");
    await page.click("#btnLogin");

    console.log('Waiting for OTP screen...');
    await page.waitForSelector("//div[@class='bodytext ']", { state: 'visible', timeout: 30000 });
    const otp = "2248";
    const otpInputs = page.locator("//div[@class='otp-warpper']//input");
    for (let i = 0; i < otp.length; i++) {
      await otpInputs.nth(i).fill(otp[i]);
    }
    await page.click("//button[@class='login-button logindown userorlogin ']");

    console.log('Waiting for homepage to settle...');
    await page.waitForTimeout(5000);
    await page.waitForLoadState('domcontentloaded');
    console.log('Current URL:', page.url());

    await page.screenshot({ path: 'C:\\Users\\urvas\\AppData\\Local\\Temp\\claude\\homepage.png', fullPage: true });

    const sectionInfo = await page.evaluate(() => {
      const results = [];
      // headings containing 'deal'
      const headings = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6'));
      headings.forEach(h => {
        const t = (h.textContent || '').trim();
        if (t.toLowerCase().includes('deal') || t.toLowerCase().includes('earn')) {
          results.push({ type: 'heading', tag: h.tagName, text: t, parentSectionId: h.closest('section')?.id || null });
        }
      });
      // sections with id containing spcl
      const spclSections = Array.from(document.querySelectorAll('section[id*="spcl"]')).map(s => ({ id: s.id, textSnippet: (s.textContent || '').trim().slice(0, 200) }));
      // all section ids on page
      const allSectionIds = Array.from(document.querySelectorAll('section[id]')).map(s => s.id);
      return { headings: results, spclSections, allSectionIds };
    });

    console.log(JSON.stringify(sectionInfo, null, 2));
  } catch (err) {
    console.error('ERROR:', err.message);
    try {
      await page.screenshot({ path: 'C:\\Users\\urvas\\AppData\\Local\\Temp\\claude\\error.png', fullPage: true });
      console.log('URL at error:', page.url());
    } catch {}
  } finally {
    await browser.close();
  }
})();
