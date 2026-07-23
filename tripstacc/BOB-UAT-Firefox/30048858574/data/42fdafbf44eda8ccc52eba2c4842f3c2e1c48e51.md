# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: TripStacc/tests/CheckoutPage.test.ts >> SC_009.01: Flight - Checkout with and without Redeem Points (without redeem it should be an earning) 
- Location: TripStacc/tests/CheckoutPage.test.ts:120:5

# Error details

```
Error: locator.isVisible: Document.evaluate: The expression is not a legal expression
queryAll@debugger eval code:6136:25
_queryEngineAll@debugger eval code:6804:49
querySelectorAll@debugger eval code:6791:30
querySelector@debugger eval code:6703:25
@debugger eval code line 303 > eval:2:39
evaluate@debugger eval code:305:16
@debugger eval code:1:44
@debugger eval code:1:62

Call log:
    - checking visibility of locator('//h4[@class=\'err_title\'])[2]')

```