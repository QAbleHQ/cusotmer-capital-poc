# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\IDFC\CheckoutPage.test.ts >> SC_009: Checkout with and without Redeem Points (without redeem it should be an earning)
- Location: tests\IDFC\CheckoutPage.test.ts:17:5

# Error details

```
Test timeout of 540000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=e10]:
  - generic [ref=e11]: 
  - heading "Oops! That Room Rate Isn’t Available" [level=2] [ref=e12]
  - paragraph [ref=e13]: We’re sorry, but the rate you selected for this room is no longer available. Please choose another rate.
  - separator [ref=e14]
  - link "Go Back" [ref=e15] [cursor=pointer]:
    - /url: javascript:void(0)
```