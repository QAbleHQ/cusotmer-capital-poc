export const PDPPageLocators = {
  productTitle: "//h1[contains(@class,'pro-name') or contains(@class,'product-title')]",
  productPrice: "//div[contains(@class,'product-price') or contains(@class,'price')]//p | //div[contains(@class,'prod-price')]",
  productImage: "//div[contains(@class,'img-cart') or contains(@class,'proimage')]//img | //img[contains(@class,'product-image')]",
  quantityInput: "//input[contains(@name,'qty') or contains(@name,'quantity') or @id='qty']",
  quantityIncreaseButton: "//a[contains(@class,'plus') or contains(@class,'qty-plus')]",
  quantityDecreaseButton: "//a[contains(@class,'minus') or contains(@class,'qty-minus')]",
  buyNowButton: "//a[contains(@class,'buy-detail') or contains(.,'Buy Now') or contains(@class,'buy-now')]",
  cardSelectionSection: "//div[contains(@class,'card') or contains(@class,'saved-card') or contains(@class,'payment')]",
  savedCardOption: "//label[contains(.,'Ashva')] | //button[contains(.,'Ashva')] | //a[contains(.,'Ashva')] | //div[contains(.,'Ashva')]",
  cardNumberField: "//input[contains(@name,'card') and contains(@name,'number') or @id='cardNumber' or @id='card-number' or @name='cardNumber']",
  cardExpiryField: "//input[contains(@name,'exp') or @id='cardExpiry' or @id='expiry' or @name='cardExpiry']",
  cardCvvField: "//input[contains(@name,'cvv') or @id='cardCvv' or @name='cardCvv']",
  checkoutBuyNowButton: "//a[contains(.,'Buy Now')] | //button[contains(.,'Buy Now')] | //input[@value='Buy Now'] | //button[contains(.,'Buy now with')] | //a[contains(.,'Buy now with')] | //button[contains(.,'Buy Now with')] | //a[contains(.,'Buy Now with')]"
};
