export const HotelPageLocators = {

  // ---------------------------------------------------------------------------
  // Home page – header
  // ---------------------------------------------------------------------------
  profileIconButton: `//a[@class="sso_login_div topa logindown dropdown-toggle rounded_login"]`,

  // ---------------------------------------------------------------------------
  // Home page – hotel tab navigation
  // ---------------------------------------------------------------------------
  hotelTab: `//ul[@class="nav nav-tabs tabstab position_relative"]//li[@class=" t-hotel"]//a`,

  // ---------------------------------------------------------------------------
  // Hotel search form – location, dates, rooms & guests, search CTA
  // ---------------------------------------------------------------------------
  whereToTextBox: `//input[@id="location"]`,
  whereToDropdownSelectFirstOption: `(//li[@class="custom-auto-complete ui-menu-item"])[1]`,
  dateButton: `//input[@id="hotel_daterange"]`,
  roomsAndGuestButton: `//input[@class="form-control"]`,
  searchHotelButton: `//input[@value="Search Hotels"]`,

  // ---------------------------------------------------------------------------
  // Hotel search form – date picker (calendar navigation & date selection)
  // ---------------------------------------------------------------------------
  selectMonth: `//th[@class="month" and contains(normalize-space(),"{monthYear}")]`,
  selectDate: `//th[contains(normalize-space(),'{monthYear}')]/ancestor::table//td[contains(@class,'available') and not(contains(@class,'off')) and normalize-space()='{date}']`,
  nextButton: `//div[contains(@class,"drp-calendar right")]//th[contains(@class,"next") and contains(@class,"available")]`,

  // ---------------------------------------------------------------------------
  // Hotel search form – rooms & guests popup
  // ---------------------------------------------------------------------------
  addRoomButton: `//button[@id="add_room_button"]`,
  roomCount: `//input[@id="rooms"]`,
  adultPlusButton: `//input[contains(@onclick,"adults_{roomNo}") and @value="+"]`,
  adultCount: `//input[@id="adults_{roomNo}"]`,
  childrenPlusButton: `//input[contains(@onclick,"children_{roomNo}") and @value="+"]`,
  childrenCount: `//input[@id="children_{roomNo}"]`,
  childrenAgeDropdown: `(//div[contains(@class,'option_children_{roomNo}')]//select)[{childIndex}]`,
  doneButton: `//a[contains(@class,"room_done")]`,

  // ---------------------------------------------------------------------------
  // Hotel search results page – update search bar
  // ---------------------------------------------------------------------------
  updateCheckinCheckOutButton: `//input[@id="hotel_daterange"]`,
  updateSearchButton: `//input[@id="hotel_search_btn"]`,
  crossIconButton: `//i[@class="far fa-times remove_field"]`,
  getTextFromSearchResult: `//h5[@class=" fw-semibold "]`,

  // ---------------------------------------------------------------------------
  // Hotel search results page – hotel cards (left / main list)
  // ---------------------------------------------------------------------------
  resultLocations: `//p[@class="card-text mb-2"]`,
  getAmountFromResult: `//h4[@class="fw-semibold mb-0 pernight_price view_pernight_price_earn position-relative "]//strong`,
  getTaxPerNightText: `(//p[@class="mb-2 pernight_taxes view_pernight_price_earn "])[1]`,
  taxPerNightText: `(//p[@class="mb-2 pernight_taxes view_pernight_price_earn "])[1]`,
  getHotelNameText: `//h5[@class="card-title mb-1"]`,
  getHotelLocationText: `//p[@class="card-text mb-2"]`,
  getHotelLocationTextSecond: `(//p[@class="card-text mb-2"])[1]`,
  getRatingStar: `//div[@class="card-body pb-0 pt-2 pt-xl-3"]//ul`,
  allLocaliseButton: `//span[@class="all_lclty"]`,

  // ---------------------------------------------------------------------------
  // Hotel search results page – right side filters (sort, price, amenities, rating)
  // ---------------------------------------------------------------------------
  showingPropertiesText: `//span[contains(@class,'hotel_property_count')]`,
  resetButton: `//button[contains(@class,'reset')]`,
  sortBySection: `//h5[normalize-space()='Sort by']`,
  sortByPopularityButton: `//div[contains(@onclick,"priceFilter('popular'")]`,
  sortByPriceLowToHighButton: `//div[contains(@onclick,"low_to_high")]`,
  sortByPriceHighToLowButton: `//div[contains(@onclick,"high_to_low")]`,
  pricePerNightSection: `//h5[normalize-space()='Price per night']`,
  priceRangeSlider: `//div[@id='price_slider']`,
  priceRangeLeftHandle: `(//span[contains(@class,'ui-slider-handle')])[1]`,
  priceRangeRightHandle: `(//span[contains(@class,'ui-slider-handle')])[2]`,
  priceRangeText: `//input[@id='amount']`,
  freeCancellationToggle: `//input[@id='freeCancellation']`,
  freeCancellationText: `//label[@for='freeCancellation']`,
  breakfastAvailableToggle: `//input[@id='filter_breakfast']`,
  breakfastAvailableText: `//label[@for='filter_breakfast']`,
  starRating5Button: `//button[@onclick="starRatingFilter(5)"]`,
  starRating4Button: `//button[@onclick="starRatingFilter(4)"]`,
  starRating3Button: `//button[@onclick="starRatingFilter(3)"]`,
  starRating2Button: `//button[@onclick="starRatingFilter(2)"]`,
  starRating1Button: `//button[@onclick="starRatingFilter(1)"]`,
  locationSelectButton: `//button[@class="btn btn-primary px-2 mb-0 mb-xl-1 location_class"]`,
  categorySelectButton: `//button[@class="btn btn-primary me-1 px-2 mb-1 mb-xl-1 location_class"]`,

  // ---------------------------------------------------------------------------
  // Hotel detail page – room selection
  // ---------------------------------------------------------------------------
  hotelNameText: `//div[@class='carousel-item active']`,
  firstRoomSelectButton: `(//button[@class='seleactRoombtn'])[1]`,
  selectRoomButtonFirstPage: '//button[@class="seleactRoombtn"]',
  roomSelectionConfirmationButton: `//button[@class='btn btn-default rounded-25']`,
  firstTabNextButton: '//button[@class="btn btn-default rounded-25"]',

  // ---------------------------------------------------------------------------
  // Guest details page – header & saved guests
  // ---------------------------------------------------------------------------
  primaryGuestDetailsHeader: `//h3[@class='titleBox pb-0']`,
  savedGuestText: `//h3[text()='Saved guests']`,
  savedGuestList: `//div[@class='form-check d-flex']`,
  savedGuestCheckbox: `(//div[@class='form-check d-flex']//input)[1]`,
  savedGuestName: `(//div[@class='fhuserinfoboxContent'])[1]`,
  savedGuestDetails: `(//span[@class='form-check-label'])[1]`,
  verifysavedGuestList: `//div[@class="form-check d-flex"]`,
  clickFirstOptionFromsavedGuestList: `(//div[@class="form-check d-flex"]//input)[1]`,

  // ---------------------------------------------------------------------------
  // Guest details page – add / edit guest actions
  // ---------------------------------------------------------------------------
  addGuestButton: `//a[@class='addroombox']`,
  addNewGuestButton: `//a[@class="addroombox"]`,
  addGuestButtonPrimaryGuestDetails: '//a[@class="addroombox"]',
  addGuestBtn: `//a[@id='add_guest_btn']`,
  addbtn: `//a[@class='addbtnsec']`,
  addButtonAfterAddingGuest: `//a[@class='addbtnsec']`,
  editTravelerButton: `(//a[@id='edit-traveller'])[1]`,
  assignGuestToRoomButton: `//a[@id='assign_guest_to_room']`,
  nextButtonAfterAddingGuest: `//button[@class="nextbtn"]`,

  // ---------------------------------------------------------------------------
  // Guest details page – guest form fields
  // ---------------------------------------------------------------------------
  guestDetailsForm: `//div[@id='user-information']`,
  firstNameField: `//input[@id='first_name']`,
  lastNameField: `//input[@id='last_name']`,
  contactNumberField: `//input[@id='floatphone']`,
  emailField: `//input[@id='floatemail']`,
  panCardText: `//label[text()='PAN Number*']`,
  panNumberField: `//input[@id='pan_number']`,
  panCheckbox: `//input[@id='pan_checkbox']`,
  conditionsErrorMessage: `//div[contains(text(),'Please accept conditions')]`,
  editGuestButton: `//a[@id="guest-edit-btn"]`,

  // ---------------------------------------------------------------------------
  // Checkout page – search hotel & redeem points
  // ---------------------------------------------------------------------------
  searchForHotelInputButton: '//input[@class="form-control border rounded-end ps-4 ps-md-5"]',
  redeampointTogglebutton: `//span[@class="switchslider"]`,
  redeamPointInputField: `//input[@class="value-box"]`,
  savebuttonAfterRedeemEnter: `//button[@class="save_point"]`,
  editIconButtonForRedeem: `//button[@id="edit_redeem_pts"]`,
  getDiscountAmountText: `//span[@class="savepoint"]`,

  // ---------------------------------------------------------------------------
  // Checkout page – payment CTA
  // ---------------------------------------------------------------------------
  payButtonAfterDiscount: `//button[@id="rzp-payment-button"]`,
  payButtonBeforeText: `//button[@id="rzp-payment-button"]//span`,
  clickCheckboxAfterRedeam: `//input[@class="form-check-input"]`,

  // ---------------------------------------------------------------------------
  // Radio Button for Guest Details
  // ---------------------------------------------------------------------------
  radioButtonMr: `//label[@class="radio-custom-label" and @for="radio-1"]`,
  radioButtonMs: `//label[@class="radio-custom-label" and @for="radio-2"]`,
  radioButtonMrs: `//label[@class="radio-custom-label" and @for="radio-3"]`,
};
 