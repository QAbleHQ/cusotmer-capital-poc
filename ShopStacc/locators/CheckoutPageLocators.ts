export const CheckoutpageLocators = {
  productName: "//h4[@class='check-name p-2']",
  productPrice: "(//span[@class='asaasa'])[1]",
  productQuantityText: "//p[@class='the-ree-head2 col-4 text-center']",
  productQuantityInput: "//input[@name='ctl00$ContentPlaceHolder1$repcart1$ctl00$txtqty1']",
  productImage: "//div[@class='img-cart text-center']",
  checkoutpagetitle: "//div[@class='col-6 back1']",
  buyNowWithButton: "//a[@id='ctl00_ContentPlaceHolder1_btncash']", 
  // Specific saved-card locators (preferred for stable selection)
  savedCardAshvaLabel: "//label[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'ashva')]",
  savedCardAshvaRadio: "//div[contains(@id,'_carddiv') and contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'ashva')]//input[@type='radio'] | //div[contains(@class,'pois2') and contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'ashva')]//input[@type='radio'] | //label[contains(translate(normalize-space(.),'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'ashva')]//preceding::input[@type='radio'][1] | //input[@type='radio' and contains(@id,'repcards') and contains(.,'ashva')]",
};
