export const FlightPageLocators = {

  // ---------------------------------------------------------------------------
  // Home page – flight tab navigation
  // ---------------------------------------------------------------------------
  flightTab: `//a[@id="flights_link"]`,

  // ---------------------------------------------------------------------------
  // Flight search form – trip type (one-way / round-trip)
  // ---------------------------------------------------------------------------
  onewaybox: `(//label[contains(@class,"wament hand-cursor")])[1]`,
  roundtripbox: `(//label[contains(@class,"wament hand-cursor")])[2]`,

  // ---------------------------------------------------------------------------
  // Flight search form – from / to city
  // ---------------------------------------------------------------------------
  fromCity: `//input[@placeholder="Select city or airport" and @name="from"]`,
  fromCityDropdown: `//ul[@id="ui-id-1"]`,
  firstSearchResultfromCityDropdown: `(//a[@class="ui-menu-item-wrapper"])[1]`,
  toCity: `//input[@placeholder="Select city or airport" and @name="to"]`,
  toCityDropdown: `//ul[@id="ui-id-2"]`,
  firstSearchResulttoCityDropdown: `(//ul[@id="ui-id-2"]//a[@class="ui-menu-item-wrapper"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search form – departure / return dates
  // ---------------------------------------------------------------------------
  departureDate: `//input[@id="flight_datepicker1"]`,
  returnDate: `//input[@id="flight_datepicker2"]`,
  currentMonth: `//span[@class='ui-datepicker-month']`,
  currentYear: `//span[@class='ui-datepicker-year']`,
  nextMonthButton: `//a[@data-handler='next']`,
  prevButton: `//a[@title='Prev']`,
  dateCell: (day: string) => `//td[@data-handler='selectDay']//a[text()='${day}']`,
  VerifyOneWayRoundTripCalendar: `//div[@id="fare_calendar_wrapper"]`,
  FlightRoundTripDetailsBox: `//li[contains(@class,"domestic_round_segment")]`,

  // ---------------------------------------------------------------------------
  // Flight search form – travellers & cabin class
  // ---------------------------------------------------------------------------
  travellersAndCabinClass: `//div[@class="totlall mainSearchbox newdes"]`,
  roomCountDropdown: `//div[contains(@class,"roomcountMob")] `,
  travellersAdultPlusButton: `//div[contains(@class,"adult_count_div")]//button[@data-type="plus"]`,
  travellersChildrenPlusButton: `//div[contains(@class,"child_count_div")]//button[@data-type="plus"]`,
  travellersInfantPlusButton: `//div[contains(@class,"infant_count_div")]//button[@data-type="plus"]`,
  travellersApplyButton: `//a[text()="Apply"]`,
  travellerCount: `//span[@class='total_pax_count']`,
  travelsummaryCount: `//div[@class="travell_info"]`,
  travelClassEconomyOption: `//a[text()="Economy"]`,
  travelClassPremiumEconomyOption: `//a[text()="Premium Economy"]`,
  travelClassText: `//span[@id="travelClass"]`,

  // ---------------------------------------------------------------------------
  // Flight search form – options & search CTA
  // ---------------------------------------------------------------------------
  nonStopCheckbox: `//label[text()="Non-stop"]`,
  searchFlightsButton: `//input[@id="flight-form-submit"]`,
  firstRecentSearch: `//div[@id="ga_search_view_flight_0"]`,
  travelAdvisoryText: `//span[text()="Travel Advisory"]`,
  phoneCopyButton: `//div[@class="calldatabox"]//span[@class="phone_copy"]`,
  emailCopyButton: `//div[@class="calldatabox"]//span[@class="email_copy"]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – flight cards
  // ---------------------------------------------------------------------------
  firstFlightCard: `(//div[@class="flightInfoCard"])[1]`,
  FligthStopDetails: `(//div[@class="stoDet stop_zero"])[1]`,
  FlightRefundableText: `(//span[@class="_refundable"])[1]`,
  FlightNonRefundableText: `(//span[@class="_nonrefundable"])[1]`,
  FlightAirlineName: `(//h4[@class="_airline_name"])[1]`,
  filterErrorMessage: `//div[@id="fliter_error_box"]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – sort & filter panel (open / tabs)
  // ---------------------------------------------------------------------------
  flightListFilterButton: `//span[text()="Sort & Filter"]`,
  filterTabStops: `(//a[text()="Stops "])[1]`,
  filterTabDepartureTime: `(//a[text()="Departure "])[1]`,
  filterTabArrivalTime: `(//a[text()="Arrival "])[1]`,
  filterTabFareType: `(//a[text()="Fare type "])[1]`,
  filterTabAirlines: `(//a[text()="Airline "])[1]`,
  filterTabLayoverAirports: `(//a[text()="Layover Airports "])[1]`,
  filterApplyButton: `(//button[text()="Apply"])[1]`,
  filterClearButton: `(//button[text()="Clear All"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (stops – onward)
  // ---------------------------------------------------------------------------
  filterNonStop: `(//div[@class="filterboxcontent"]//label[text()="Non-stop"])[1]`,
  filter1Stop: `(//div[@class="filterboxcontent"]//label[text()="1 Stop"])[1]`,
  filter1PlusStop: `(//div[@class="filterboxcontent"]//label[text()="1+ Stops"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (stops – return)
  // ---------------------------------------------------------------------------
  filterNonStopReturn: `(//div[@class="filterboxcontent stops_return"]//label[text()="Non-stop"])[1]`,
  filter1StopReturn: `(//div[@class="filterboxcontent stops_return"]//label[text()="1 Stop"])[1]`,
  filter1PlusStopReturn: `(//div[@class="filterboxcontent stops_return"]//label[text()="1+ Stops"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (departure time – onward)
  // ---------------------------------------------------------------------------
  filterDepartureTimeEarlyMorning: `(//div[@class="filterboxcontent"]//label[text()="Early Morning"])[1]`,
  filterDepartureTimeMorning: `(//div[@class="filterboxcontent"]//label[text()="Morning"])[1]`,
  filterDepartureTimeAfternoon: `(//div[@class="filterboxcontent"]//label[text()="Afternoon"])[1]`,
  filterDepartureTimeEvening: `(//div[@class="filterboxcontent"]//label[text()="Evening"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (departure time – return)
  // ---------------------------------------------------------------------------
  FilterDepartureTimeEarlyMorningReturn: `(//div[@class="filterboxcontent departure_return"]//label[text()="Early Morning"])[1]`,
  FilterDepartureTimeMorningReturn: `(//div[@class="filterboxcontent departure_return"]//label[text()="Morning"])[1]`,
  FilterDepartureTimeAfternoonReturn: `(//div[@class="filterboxcontent departure_return"]//label[text()="Afternoon"])[1]`,
  FilterDepartureTimeEveningReturn: `(//div[@class="filterboxcontent departure_return"]//label[text()="Evening"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (arrival time – onward)
  // ---------------------------------------------------------------------------
  filterArrivalTimeEarlyMorning: `(//div[@class="filterboxcontent"]//label[text()="Early Morning"])[2]`,
  filterArrivalTimeMorning: `(//div[@class="filterboxcontent"]//label[text()="Morning"])[2]`,
  filterArrivalTimeAfternoon: `(//div[@class="filterboxcontent"]//label[text()="Afternoon"])[2]`,
  filterArrivalTimeEvening: `(//div[@class="filterboxcontent"]//label[text()="Evening"])[2]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (arrival time – return)
  // ---------------------------------------------------------------------------
  FilterArrivalTimeEarlyMorningReturn: `(//div[@class="filterboxcontent arrival_return"]//label[text()="Early Morning"])[1]`,
  FilterArrivalTimeMorningReturn: `(//div[@class="filterboxcontent arrival_return"]//label[text()="Morning"])[1]`,
  FilterArrivalTimeAfternoonReturn: `(//div[@class="filterboxcontent arrival_return"]//label[text()="Afternoon"])[1]`,
  FilterArrivalTimeEveningReturn: `(//div[@class="filterboxcontent arrival_return"]//label[text()="Evening"])[1]`,

  // ---------------------------------------------------------------------------
  // Flight search results page – filter options (fare type & airlines)
  // ---------------------------------------------------------------------------
  filterTabFareTypeRefundable: `(//label[text()="Refundable"])[1]`,
  filterTabFareTypeNonRefundable: `(//label[text()="Non-Refundable"])[1]`,
  FilterAirlinesFirstFlight: `(//div[@class="airline_filter_class"]//div[@class="inputselct"]//label[@class="lbllbl"])[1]`,
  FilterAirlinesFirstFlightCheckbox: `(//div[@class="airline_filter_class"]//div[@class="inputselct"]//label)[1]`,
  filterFirstAirlineInList: `(//div[@class="airline_filter_class"]//label)[2]`,
  filterFirstAirlineCheckboxInList: `(//div[@class="airline_filter_class"]//label)[1]`,

  // ---------------------------------------------------------------------------
  // Flight details page – fare selection & booking CTA
  // ---------------------------------------------------------------------------
  nextButtonOnFlightDetailsPage: `//button[text()="Next"]`,
  bookButtonOnFairDetailsPage: `//div[@class="trip_body trip0  "]//button[text()="Book"]`,
  continueButtonOnFlightDetailsPage: `//button[@id="move_to_pax_details_section"]`,

  // ---------------------------------------------------------------------------
  // Travellers details page – add / edit traveller
  // ---------------------------------------------------------------------------
  addnewTravellerButton: `//button[@class="add_new_btn"]`,
  travellerGenderMR: `//label[text()="Mr."]`,
  FirstNameErrorMessage: `//p[text()="First name is required"]`,
  LastNameErrorMessage: `//p[text()="Last name is required"]`,
  firstNameInput: `//input[contains(@class,"first_name_input")]`,
  lastNameInput: `//input[contains(@class,"last_name_input")]`,
  FirstTravellerNameOnSummary: `(//div[@class="flduserbox"])[1]`,
  addTravellerButton: `//span[text()="Add Traveller"]`,
  FirstTravellerNameEditButton: `(//button[@class="fld_travel_edit"])[1]`,
  FirstOptionCheckbox: `//div[@class="inputcheckbox"]//label[@for="pax401"]`,
  firstTravellerNameEditConfirmButton: `//span[text()="Confirm"]`,

  // ---------------------------------------------------------------------------
  // Travellers details page – contact & GST
  // ---------------------------------------------------------------------------
  travellerEmail: `//h5[text()="Email"]`,
  travellerPhoneNumber: `//h5[text()="Phone"]`,
  defaultTavellerEmail: `//input[contains(@class,"email_text_input")]`,
  defaultTravellerPhone: `//input[contains(@class,"phone_text_text")]`,
  emailErrorMessage: `//p[text()="Email is required"]`,
  phoneErrorMessage: `//p[text()="Phone number is required"]`,
  GSTHeader: `//h4[text()="GST Information (Optional)"]`,
  defaultGSTNumber: `//input[contains(@class,"booking_gst_number")]`,
  gstErrorMessage: `//p[text()="GST number is required"]`,

  // ---------------------------------------------------------------------------
  // Travellers details page – passport (international)
  // ---------------------------------------------------------------------------
  passportDetailHeading: `//h4[text()="Passport information"]`,
  passportErrorMessage: `//p[text()="Passport number is required"]`,
  passportCountryErrorMessage: `//p[text()="Passport issuing country is required"]`,
  passportExpiryErrorMessage: `//p[text()="Passport expiry date is required"]`,
  defaultPassportNumber: `//input[contains(@class,"passport_number_input")]`,
  defualtpassportCountry: `//select[contains(@class,"passport_issuing_country_input")]`,
  expireDate: `//input[contains(@class,"expiry_datepicker ")]`,
  saveTravellInfo: `//label[text()="Save traveller info"]`,

  // ---------------------------------------------------------------------------
  // Footer links
  // ---------------------------------------------------------------------------
  flightTabFooter: `//a[@id="flights_link_footer"]`,
  hotelTabFooter: `//a[@id="hotels_link_footer"]`,
  contactUsFooter: `//div[@class="frtbest"]//a[contains(text(),"Contact")]`,
  aboutUsFooter: `//div[@class="frtbest"]//a[contains(text(),"About us")]`,
  refundPolicyFooter: `//div[@class="frtbest"]//a[contains(text(),"Refund Policy")]`,
  termsAndConditionsFooter: `//div[@class="frtbest"]//a[contains(text(),"Terms & Conditions")]`,
  privacyPolicyFooter: `//div[@class="frtbest"]//a[contains(text(),"Privacy Policy")]`,

  // Status

  bookingStatus: `//h4[@class='confm_txt']`, // Booking Confirmation Status
  confirmedVoucher: `//p[@class='earn']//span`, // Confirmed Voucher

  // Booking Details

  bookingId: `//span[@id='copy_ref']`, // Booking ID
  bookingDate: `//div[@class='travell_info']//p`, // Booking Date

  // Flight Details

  flightDropdown: `//div[@class='cnf_flt_top']`, // Flight Details Dropdown
  flightName: `(//div[@class='fltcod'])[1]`, // Flight Name
  departureCity: `(//p[@class='flt_cityname'])[1]`, // Departure City
  arrivalCity: `(//p[@class='flt_cityname'])[2]`, // Arrival City
  departureTime: `(//p[@class='flt_time'])[1]`, // Departure Time
  arrivalTime: `(//p[@class='flt_time'])[2]`, // Arrival Time

  // Hotel Details

  hotelName: `//div[@class='hotl_detls']//h4[1]`, // Hotel Name
  hotelAddress: `//div[@class='hotl_detls']//p`, // Hotel Address

  // Fare Summary

  fareSummaryDropdown: `//ul[@class='text-list']`, // Fare Summary Dropdown
  fareSummarySection: `//div[contains(@class,'expand-box')]`, // Fare Summary Section
  fareSummaryItems: `//ul[@class='text-list']//li`, // Fare Summary Items

  // Top Hotels Section

  topHotelsSection: `//a[@class='book_hotel_click']`, // Top Hotels Section
  topHotelCards: `//div[@class='hotal_crd_sec']`, // Top Hotel Cards
  hotelRedirectLink: `//ul[@class='star']`, // Hotel Redirect Link

  //
  //
  //filter options

FlightFromNameShotform: `//h4[text()="AMD"]`,
FlightToNameShotForm: `//h4[text()="BOM"]`,
FlightTOInternationalName: `//h4[text()="DXB"]`, 
FirstTravellerCheckbox: `(//div[@class="inputcheckbox"])[1]`,
travellerDetailsPageContinuebutton: `//button[@class="flbookbtn traveller_details_continue"]`,

seatSelectionOption: '//li[@class="seat_li active"]',
baggageSelectionOption: '//li[@class="baggage_li"]',
seatMapContainer: '(//div[@class="seatselaction_innerbox"])[1]',
availableSeat: '(//div[@class="columninnebox extrapayhigh"])[1]',
UnavailableSeat: '(//div[@class="columninnebox Unavailable"])[1]',
unvailableSeatErrorMessage: `(//p[text()="Sorry! This seat is taken"])[1]`,
seatPrice: `(//h4[contains(@class,'fl_det_footer') and contains(text(),'₹')])[3]`,
weightIncreasePlusButton: `(//span[@class="coplus"])[1]`,
skipAndPayButton: '//a[@class="skipbtn skipToCheckout"]',
travellerAndAddoneHeading: `//h4[text()="Travellers & Add-ons"]`,

// Travellers & Add-ons continue button
travellersAndAddonsContinueButton: `//button[@class="flbookbtn extra_service_cont_btn"]`,

noFlightsText: `//h5[@class="no_flts"]`, // No flight text



};
