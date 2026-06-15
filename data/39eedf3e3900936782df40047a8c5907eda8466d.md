# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\IDFC\BookingConfirmation.test.ts >> SC_012: Booking Confirmation Page (Confirmed/Pending/Failed)
- Location: tests\IDFC\BookingConfirmation.test.ts:18:5

# Error details

```
Error: Element '//div[@class="inputcheckbox"]//label[@for="pax401"]' was not visible after two attempts (including page refresh).
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner:
      - generic [ref=e6]:
        - generic [ref=e7]:
          - link "Logo" [ref=e8] [cursor=pointer]:
            - /url: https://uat-sso.ai-loyalty.com/Login/CCLP-2024DE-IDF0110-TR87AASC-UAT2024102024
            - img "Logo" [ref=e9]
          - link [ref=e11] [cursor=pointer]:
            - /url: https://uat-travel-idfc.travel-loyalty.com/
        - generic [ref=e12]:
          - list [ref=e14]:
            - listitem [ref=e15]:
              - link "Flights" [ref=e16] [cursor=pointer]:
                - /url: https://uat-travel-idfc.travel-loyalty.com/general/index/flights?default_view=VHCID1420613784
                - img [ref=e18]
                - strong [ref=e19]: Flights
            - listitem [ref=e20]:
              - link "Hotels" [ref=e21] [cursor=pointer]:
                - /url: https://uat-travel-idfc.travel-loyalty.com/general/index/hotels?default_view=VHCID1420613748
                - img [ref=e23]
                - strong [ref=e24]: Hotels
          - generic [ref=e29] [cursor=pointer]: DK
    - generic:
      - generic:
        - generic [ref=e31]:
          - generic [ref=e34]:
            - heading "Flight details" [level=4] [ref=e35]
            - generic [ref=e37]:
              - generic [ref=e38]: "1"
              - generic [ref=e39]: "2"
              - generic [ref=e40]: ":"
              - generic [ref=e41]: "5"
              - generic [ref=e42]: "2"
          - generic [ref=e44]:
            - generic [ref=e45]:
              - generic [ref=e46]:
                - img "img" [ref=e48]
                - generic [ref=e49]:
                  - generic [ref=e50]:
                    - heading "BOM" [level=4] [ref=e51]
                    - img [ref=e52]
                    - heading "BLR" [level=4] [ref=e54]
                  - paragraph [ref=e56]:
                    - text: Wed, 17 Jun'26
                    - text: 1 Traveller
                    - text: Non-stop
              - generic [ref=e60]:
                - generic [ref=e62]:
                  - heading "Air India" [level=5] [ref=e63]
                  - paragraph [ref=e64]: AI-2812 | Economy
                - generic [ref=e65]:
                  - generic [ref=e66]:
                    - paragraph [ref=e67]: Wed, 17 Jun
                    - paragraph [ref=e68]: 02:05
                    - paragraph [ref=e69]: BOM
                    - paragraph [ref=e70]: Chhatrapati Shivaji International Airport
                    - paragraph [ref=e71]: "Terminal: T2"
                  - generic [ref=e72]:
                    - paragraph [ref=e73]: 2h 5m
                    - img [ref=e74]
                  - generic [ref=e76]:
                    - paragraph [ref=e77]: Wed, 17 Jun
                    - paragraph [ref=e78]: 04:10
                    - paragraph [ref=e79]: BLR
                    - paragraph [ref=e80]: Kempegowda International Airport
                    - paragraph [ref=e81]: "Terminal: T2"
                - generic [ref=e82]:
                  - generic [ref=e83]:
                    - 'heading "Fare type: ECO VALUE - SME" [level=4] [ref=e84]'
                    - button "Fare rules" [ref=e85] [cursor=pointer]
                  - generic [ref=e86]:
                    - generic [ref=e87]:
                      - img "img" [ref=e88]
                      - generic [ref=e89]: "Cabin:"
                      - text: 7 Kgs (1 Piece(s)) (1 Piece only)
                    - generic [ref=e90]:
                      - img "img" [ref=e91]
                      - generic [ref=e92]: "Check-in:"
                      - text: 15 Kgs (1 Piece only)
                  - paragraph [ref=e94]: "*The baggage info is indicative. Tripstacc does not guarantee the accuracy of the information. Please check the airline's website for accurate details, as allowances may vary with stopovers, connections, or airline policy changes."
            - generic [ref=e95]:
              - heading "Fare summary" [level=4] [ref=e96]
              - generic [ref=e97]:
                - generic [ref=e98]:
                  - generic [ref=e99]:
                    - heading "Base Fare" [level=5] [ref=e100]
                    - paragraph [ref=e101]: Adult (1 x ₹9,163)
                  - generic [ref=e102]:
                    - paragraph [ref=e103]: ₹9,163
                    - paragraph [ref=e104]: ₹9,163
                - generic [ref=e105]:
                  - heading "Taxes & Fees" [level=5] [ref=e107]
                  - paragraph [ref=e109]: ₹1,750
                - generic [ref=e110]:
                  - heading "Amount Payable" [level=5] [ref=e112]
                  - paragraph [ref=e114]: ₹10,913
        - generic [ref=e115]:
          - generic [ref=e117]:
            - img [ref=e118]
            - paragraph [ref=e120]: Only on FIRST Rewards Gallery
            - img [ref=e121]
          - generic [ref=e124]:
            - generic [ref=e125]:
              - heading "₹10,913" [level=4] [ref=e126]
              - paragraph [ref=e127]:
                - generic [ref=e128]:
                  - text: BONUS
                  - strong [ref=e129]: 1,091
                  - img [ref=e130]
            - button "Continue" [ref=e132] [cursor=pointer]
      - text:                          
  - text: 
```

# Test source

```ts
  93  |     // Check if element is enabled
  94  |     static async elementIsEnabled(page: Page, locator: string) {
  95  |         const selector = page.locator(locator);
  96  |         if (await selector.isEnabled()) {
  97  |             await expect(selector).toBeEnabled();
  98  |         } else {
  99  |             console.error(`Element is not enabled for locator: ${locator}`);
  100 |         }
  101 |     }
  102 |     static async elementIsEnabledSoftAssert(page: Page, locator: string) {
  103 |         const selector = page.locator(locator);
  104 |         if (await selector.isEnabled()) {
  105 |             await expect.soft(selector).toBeEnabled();
  106 |         } else {
  107 |             console.error(`Element is not enabled for locator: ${locator}`);
  108 |         }
  109 |     }
  110 |     // Check if element is focused
  111 |     static async elementIsFocused(page: Page, locator: string) {
  112 |         const selector = page.locator(locator);
  113 |         if (await selector.evaluate((el) => el === document.activeElement)) {
  114 |             await expect(selector).toBeFocused();
  115 |         } else {
  116 |             console.error(`Element is not focused for locator: ${locator}`);
  117 |         }
  118 |     }
  119 |     static async elementIsFocusedSoftAssert(page: Page, locator: string) {
  120 |         const selector = page.locator(locator);
  121 |         if (await selector.evaluate((el) => el === document.activeElement)) {
  122 |             await expect.soft(selector).toBeFocused();
  123 |         } else {
  124 |             console.error(`Element is not focused for locator: ${locator}`);
  125 |         }
  126 |     }
  127 | 
  128 |     // Check if element is hidden
  129 |     static async elementIsHidden(page: Page, locator: string) {
  130 |         const selector = page.locator(locator);
  131 |         if (await selector.isHidden()) {
  132 |             await expect(selector).toBeHidden();
  133 |         } else {
  134 |             console.error(`Element is visible for locator: ${locator}`);
  135 |         }
  136 |     }
  137 |     static async elementIsHiddenSoftAssert(page: Page, locator: string) {
  138 |         const selector = page.locator(locator);
  139 |         if (await selector.isHidden()) {
  140 |             await expect.soft(selector).toBeHidden();
  141 |         } else {
  142 |             console.error(`Element is visible for locator: ${locator}`);
  143 |         }
  144 |     }
  145 | 
  146 |     // Check if element is in the viewport
  147 |     static async elementIsInViewport(page: Page, locator: string) {
  148 |         const selector = page.locator(locator);
  149 |         if (await selector.isVisible()) {
  150 |             await expect(selector).toBeInViewport();
  151 |         } else {
  152 |             console.error(`Element is not in the viewport for locator: ${locator}`);
  153 |         }
  154 |     }
  155 |     static async elementIsInViewportSoftAssert(page: Page, locator: string) {
  156 |         const selector = page.locator(locator);
  157 |         if (await selector.isVisible()) {
  158 |             await expect.soft(selector).toBeInViewport();
  159 |         } else {
  160 |             console.error(`Element is not in the viewport for locator: ${locator}`);
  161 |         }
  162 |     }
  163 | 
  164 |     static async elementIsVisible(page: Page, locator: string, timeout: number = 30000): Promise<void> {
  165 |     await page.waitForLoadState('domcontentloaded');
  166 |     const attemptToCheckVisibility = async (attemptNumber: number): Promise<boolean> => {
  167 |         try {
  168 |             console.log(`Attempt ${attemptNumber}: Checking visibility for '${locator}'`);
  169 |             const element = page.locator(locator);
  170 |             await element.waitFor({ state: 'attached', timeout });
  171 |             await expect(element).toBeVisible({ timeout });
  172 |             console.log(`Element '${locator}' is visible on attempt ${attemptNumber}.`);
  173 |             return true;
  174 |         } catch (error) {
  175 |             console.warn(`Attempt ${attemptNumber}: Element '${locator}' not visible.`, error);
  176 |             return false;
  177 |         }
  178 |     };
  179 |  
  180 |     // 🔁 First attempt
  181 |     const isVisibleFirstTry = await attemptToCheckVisibility(1);
  182 |     if (isVisibleFirstTry) return;
  183 |  
  184 |     // 🔁 Refresh and retry
  185 |     console.warn(`Element '${locator}' not visible on first attempt. Refreshing page and retrying...`);
  186 |     await page.reload();
  187 |     await page.waitForTimeout(10000);
  188 |  
  189 |     const isVisibleSecondTry = await attemptToCheckVisibility(2);
  190 |     if (isVisibleSecondTry) return;
  191 |  
  192 |     // ❌ Final failure
> 193 |     throw new Error(`Element '${locator}' was not visible after two attempts (including page refresh).`);
      |           ^ Error: Element '//div[@class="inputcheckbox"]//label[@for="pax401"]' was not visible after two attempts (including page refresh).
  194 | }
  195 | 
  196 |     static async elementIsVisibleSoftAssert(page: Page, locator: string): Promise<boolean> {
  197 |         const selector = page.locator(locator);
  198 |         await selector.waitFor({ state: 'visible' });
  199 | 
  200 |         const isVisible = await selector.isVisible();
  201 | 
  202 |         if (isVisible) {
  203 |             console.log(`Element with locator '${locator}' is visible.`);
  204 |             await expect.soft(selector).toBeVisible();
  205 |         } else {
  206 |             console.error(`Element with locator '${locator}' is not visible.`);
  207 |             await expect.soft(selector).toBeHidden();
  208 |         }
  209 | 
  210 |         return isVisible;
  211 | 
  212 |     }
  213 |     // Check if element contains the expected text
  214 |     static async elementContainsText(page: Page, locator: string, text: string) {
  215 |         const selector = page.locator(locator);
  216 |         const actualText = await selector.textContent();
  217 |         if (actualText && actualText.includes(text)) {
  218 |             await expect(selector).toContainText(text);
  219 |             console.log(`Element contains the expected text: "${text}"`);
  220 |         } else {
  221 |             console.error(`Element does not contain the expected text: "${text}"`);
  222 |             await expect(selector).not.toContainText(text);
  223 |         }
  224 |     }
  225 |     static async elementContainsTextSoftAssert(page: Page, locator: string, text: string) {
  226 |         const selector = page.locator(locator);
  227 |         const actualText = await selector.textContent();
  228 |         if (actualText && actualText.includes(text)) {
  229 |             await expect.soft(selector).toContainText(text);
  230 |             console.log(`Element contains the expected text: "${text}"`);
  231 |         } else {
  232 |             console.error(`Element does not contain the expected text: "${text}"`);
  233 |             await expect.soft(selector).not.toContainText(text);
  234 |         }
  235 |     }
  236 | 
  237 |     static async checkUrlContainsKeyword(page: Page, keyword: string) {
  238 |         const currentUrl = page.url();
  239 |         await expect(currentUrl).toContain(keyword);
  240 |         console.log(`URL contains the expected keyword: "${keyword}"`);
  241 |     }
  242 |     static async checkUrlContainsKeywordSoftAssert(page: Page, keyword: string) {
  243 |         const currentUrl = page.url();
  244 |         await expect.soft(currentUrl).toContain(keyword);
  245 |         console.log(`URL contains the expected keyword: "${keyword}"`);
  246 |     }
  247 |     // Check if element has accessible description
  248 |     static async elementHasAccessibleDescription(page: Page, locator: string, description: string) {
  249 |         const selector = page.locator(locator);
  250 |         const actualDescription = await selector.getAttribute("aria-description");
  251 |         if (actualDescription === description) {
  252 |             await expect(selector).toHaveAccessibleDescription(description);
  253 |             console.error(`Accessible description does not match. Expected: "${description}"`);
  254 |         }
  255 |     }
  256 |     static async elementHasAccessibleDescriptionSoftAssert(page: Page, locator: string, description: string) {
  257 |         const selector = page.locator(locator);
  258 |         const actualDescription = await selector.getAttribute("aria-description");
  259 |         if (actualDescription === description) {
  260 |             await expect.soft(selector).toHaveAccessibleDescription(description);
  261 |             console.log(`Element has the expected accessible description: "${description}"`);
  262 |         } else {
  263 |             console.error(`Accessible description does not match. Expected: "${description}"`);
  264 |             await expect.soft(selector).not.toHaveAccessibleDescription(description);
  265 |         }
  266 |     }
  267 | 
  268 |     static async elementHasAccessibleName(page: Page, locator: string, name: string) {
  269 |         const selector = page.locator(locator);
  270 |         const actualName = await selector.getAttribute("aria-label");
  271 |         if (actualName === name) {
  272 |             await expect(selector).toHaveAccessibleName(name);
  273 |             console.log(`Element has the expected accessible name: "${name}"`);
  274 |         } else {
  275 |             console.error(`Accessible name does not match. Expected: "${name}"`);
  276 |             await expect(selector).not.toHaveAccessibleName(name);
  277 |         }
  278 |     }
  279 | 
  280 |     // assertion: Element has the expected accessible name
  281 |     static async elementHasAccessibleNameSoftAssert(page: Page, locator: string, name: string) {
  282 |         const selector = page.locator(locator);
  283 |         const actualName = await selector.getAttribute("aria-label");
  284 |         if (actualName === name) {
  285 |             await expect.soft(selector).toHaveAccessibleName(name);
  286 |             console.log(`Element has the expected accessible name: "${name}"`);
  287 |         } else {
  288 |             console.error(`Accessible name does not match. Expected: "${name}"`);
  289 |             await expect.soft(selector).not.toHaveAccessibleName(name);
  290 |         }
  291 |     }
  292 | 
  293 |     static async elementHasAttribute(page: Page, locator: string, attribute: string, value: string) {
```