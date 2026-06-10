export const MyAccountPageLocators = {

  // ---------------------------------------------------------------------------
  // Home page – my account navigation
  // ---------------------------------------------------------------------------
  myAccountProfile: `//div[@id='side_login']`,
  myAccountSection: `//a[@id='my-account-li']`,
  myBookingSection: `//div[@class='menu_content']//div//p[text()='My Bookings']`,

  // ---------------------------------------------------------------------------
  // My bookings page – flight booking tabs
  // ---------------------------------------------------------------------------
  flightsUpcomingTab: `(//a[@class='fliterItem'])[1]`,
  flightsCompletedTab: `(//a[@class='fliterItem'])[2]`,
  flightsCancelledTab: `(//a[@class='fliterItem'])[3]`,

  // ---------------------------------------------------------------------------
  // My bookings page – hotel booking tabs
  // ---------------------------------------------------------------------------
  hotelTab: `//a[normalize-space()='Hotels']`,
  hotelsUpcomingTab: `//li[contains(@class,'upcoming')]//a`,
  hotelsCompletedTab: `//li[contains(@class,'completed')]//a`,
  hotelsCancelledTab: `//li[contains(@class,'cancelled')]//a`,

  // ---------------------------------------------------------------------------
  // My bookings page – booking card details (read-only text)
  // ---------------------------------------------------------------------------
  fromToText: `//h4[@class='bokrname']`,
  bookingIdText: `//div[@class='pnrnum']`,
  journeyDateText: `//h3[@class='shtlname']`,
  tripTypeText: `//div[@class='shtlname']`,
  passengerNameText: `(//div[contains(@class,'bokdby')]//strong)[1]`,
  bookingDateText: `(//div[contains(@class,'bokdby')]//strong)[1]`,
  statusText: `(//div[@class='pxconf Bconfirmed'])[1]`,
  amountText: `(//div[@class='sideprice'])[1]`,

  // ---------------------------------------------------------------------------
  // My bookings page – booking card actions (confirmed status)
  // ---------------------------------------------------------------------------
  viewButton: `//div[@class='actionButtonSection']//a[contains(text(),'View')]`,
  cancelButton: `(//a[normalize-space()='Cancel'])[1]`,
  modifyButton: `(//a[normalize-space()='Modify'])[1]`,
  invoiceButton: `(//a[normalize-space()='Invoice'])[1]`,

  // ---------------------------------------------------------------------------
  // My bookings page – booking card actions (pending status)
  // ---------------------------------------------------------------------------
  bookingpendingviewButton: `//a[@class='viwedetsb']`,

};
