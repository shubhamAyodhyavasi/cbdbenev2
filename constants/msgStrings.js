import { projectName } from "./projectSettings";

const msgStrings = {
	LOGIN_ERROR: "Invalid username or password.",
	INVALID_ZIP: "Please enter a valid zip code.",
	NO_SHIPMENT: "We couldn't find a carrier. Please try again later",
	cancelOrder: "Are you sure you want to cancel this order?",
	myOrderPageFooterDetails: [
		{ details: "Find the estimated delivery date for your recent purchase" },
		{ details: "Track any returns for your order" },
		{ details: "See where the order is being shipped" },
	],
	warningText: "Warning",
	productDetailModalTitle: "Product Details",
	projectName: projectName,

	// validation error messages
	// registration
	//first name missing
	firstNameMissingErrMsg: "First Name is required",

	//last name missing
	lastNameMissingErrMsg: "Last Name is required",

	//email missing
	emailMissingErrMsg: "Email is required",
	//email valid
	emailNotValidErrMsg: "Email Id is not valid",

	//Phone missing
	phoneMissingErrMsg: "Phone is required",
	//Phone Valid
	phoneNotValidErrMsg: "Phone number is not valid",

	//Password missing
	passwordMissingErrMsg: "Password is required",

	//Password short
	passwordShortErrMsg: "Password should be 6 characters",

	//Password Valid
	passwordValidErrMsg:
		"A minimum 6 characters password contains a combination of uppercase and lowercase letter and number",

	//Password match
	onlyDigits: "Only Digits",

	//Password match
	passwordMatchErrMsg: "Passwords do not match.",

	//Confirm Password match
	confirmPasswordErrMsg: "Confirm Password is required",

	//Zip code error match
	zipMissingErrMsg: "Zip Code is required",
	zipValidErrMsg: "Zip Code Not Valid",

	// Website code error match
	websiteMissingErrMsg: "Website is required",
	websiteValidErrMsg: "Website Url is  Not Valid",

	// Instagram code error match
	instagramMissingErrMsg: "Instagram is required",
	instagramValidErrMsg: "Instagram Url is  Not Valid",

	// Facebook code error match
	faceBookMissingErrMsg: "Facebook is required",
	faceBookValidErrMsg: "Facebook Url is  Not Valid",

	// new password message
	newPasswordSuccessMsg: "Your password has been updated successfully",

	faxMissingErrMsg: "Fax Number is required",
	faxValidErrMsg: "Fax Number is  Not Valid",

	// something wrong
	someThingWrongTryAgain: "Something was wrong please try again",

	// something wrong
	wrongModalTitle: "Failed",
	someThingWrong: "Something went wrong",

	// invalid card details
	invalidCardDetail: "Invalid Card Details",

	//  invalid expiration date
	invalidExpiryDate: "Invalid Expiration date",

	// all field required
	allFieldReq: "All fields are require",

	// order placed successfully
	orderPlacedModalTitle: "Order Placed",
	orderPlacedSuccessfully: "Your order was placed successfully",
	addressAdded: "Your Address has been successfully updated.",
	addressAddedModalTitle: "Details Updated",

	// subscribe add fail
	subscribeFailMsg: "Failed to subscribe this product",

	//Old Password is required
	oldPasswordRequired: "Old Password is required",

	//Old Password is required
	noRatingMsg: "Please select a star rating",
	//---------------------------------------------------------------------------------------

	projectName: projectName,
	contactNumber: "+1.646.367.3725 (USA)",

	// login page message
	loginHeading: "Hello",
	loginMsg: ` Welcome to ${projectName}`,
	userNotActiveMsg: "Your Account is not yet Approved",

	// registration page
	regHeading: "Hello",
	regMsg: " You've been successfully registered",

	// forgot password page
	sendEmailHeading: "",
	sendEmailMsg: "We've emailed you a link to reset your password.",

	loginFailMSg: "Something's not right with your username or Password",
	passIncorrect: "Your password is incorrect",
	userNotFound: "We cannot find an account with that email address",

	problemTitle: "There was a problem",
	// product detail page
	addToCartMessage: "Added to your bag",
	addReviewMessage: "Review add successfully ",
	withoutLoginReviewMessage: "Please login before review ",
	productDetailModalTitle: "Product Details ",

	// my account page
	cancelOrder: "Are you sure you want to cancel this order?",
	cancelSuccess: "Order cancelled successfully.",
	cancelCancel: "Proceed Order Cancelled Successfully",

	warningText: "Warning",

	// Favourites page
	favouritesAlreadyProductIntoCartMessage:
		"Product already added in your cart.",

	emptyCart: "YOUR BAG IS EMPTY",

	// profile Update Page
	profileUpdateMessage: "Your account updated successfully . ",
	formErrorMessage: "Something's not right with this form details. ",

	// contact page
	msgSent: "Thank you for your message. It has been sent.",
	msgSentTitle: "Thank you",

	// my order page
	myOrderPageFooterDetails: [
		{ details: "Find the estimated delivery date for your recent purchase" },
		{ details: "Track any returns for your order" },
		{ details: "See where the order is being shipped" },
	],

	// payment method page
	cardDetailsSave: "Card details updated  successfully",
	cardDetailsfail: "Card details updated  failed",

	enableCheckoutCheckboxDetails:
		"Express checkout allows you to skip the regular checkout process and accelerate right to order review using your saved shipping and payment information.",
	shippingAddressDetails:
		"Saved address allow you to check out faster since you won't have to enter in your shipping information each time. You'll be able to select the express checkout option.",
	stripePaymentDetails:
		"Saved payment information allows you to check out faster - you won't have to enter in your credit card, gift card, or other payment information each time you checkout. This also allows you to use the express checkout option.",

	paymentMethodTollTippMessage:
		"Entering a default payment method here means you won't have to enter a payment method each time you check out . Make sure you fill in all required fields on your",
	shippingAddressTollTippMessage:
		"Entering a default shipping address here means you won't have to enter an address each time you check out",

	// footer

	footerSubscriptionDetails: `I would like to receive communications about ${projectName} products and services.`,
	footerSubscriptioSuccessHeadingMessage: "Thanks for subscribing",
	footerSubscriptioSuccessDetailsMessage:
		"We are always pleased to share our passionate interests with like-minded individuals.",
	footerSubModalTitle: "Subscribed",
	//checkout Header

	confirmLogout: "Confirm logout",
	checkoutHeaderRightSideIconWarranty: "60 days warranty",
	checkoutHeaderRightSideIcondelivery: "Global delivery",
	checkoutHeaderRightSideIconSecurepayment: "Secure payment",

	// ambassador-portal  Page
	ambassadorAccountUpdateMessage:
		"Your Ambassador Portal Account  updated  successfully . ",
	ambassadorBankUpdateMessage:
		"Your Ambassador Portal Bank Details  updated  successfully . ",
	ambassadorTaxUpdateMessage:
		"Your Ambassador Portal Tax Details  updated  successfully . ",

	nameMissingErrMsg: "Name is required",
	currencyMissingErrMsg: "Currency is required",
	currencyValidErrMsg: "Currency is not valid",
	accountNumberMissingMsg: "Checking account number is required",
	accountNumberValidMsg: "Checking account number is not valid",
	accountNumberConfirmMissingMsg: "Checking account number is required",
	accountNumberConfirmValidMsg: "Checking account numbers do not match.",
	accountHolderMissingMsg: "Account Holder Name is required",
	accountHolderNameValidMsg: "Account Holder Name is not valid",
	accountBankMissingMsg: "Bank Name is required",
	accountBankValidMsg: "Bank Name is not valid",
	businessTypeBankMissingMsg: "Business Type is required",
	invalidOldPass: "Incorrect Old Password",

	routingTypeMissingMsg: "Bank routing number is required.",
	routingTypeValidMsg: "Bank routing number must be exactly nine digits.",
	drivingLicenseMissingErr: "Driver's license number is required.",
	drivingLicenseValidMsg: "Driver's license number is not valid.",

	expireMonthInvalid: "Your card's expiration month is invalid.",
	expireYearInvalid: "Your card's expiration year is invalid.",
	cardNumberInvalid: "Your card number is incorrect.",
	cardDetailsNotMAtch: "Could not find payment information",
	cardExpireYearRequired: "Expire Year is required",
	cardExpireMonthRequired: "Expire Month is required",
	cardNumberRequired: "Card Number is required",
	cvvNumberRequired: "CvV Number is required",
	invalidCVVNumber: "Your CVV number is incorrect.",
	invaliddateNumber: "Your Expiration Date is incorrect.",

	//
	addressAddedMsg: "Address Successfully Saved.",

	//
	cardSubmitSuccessMsg: "Card Successfully Saved",

	// shipping
	shippingExtraRate: 5,
	shippingStaticRate: 5.95,
	shippingFreeAfter: 75,

	billingAddressMsg: "1. Billing Address",
	shippingAddressMsg: "Shipping Address",
	sameShippingMsg: "Bill to the same address",
	selectCarrierMsg: "2. Select your carrier",
	paymentMethodMsg: "3. Payment Method",
	reviewOrderMsg: "4. Review Your Order",

	checkoutPageTitle: "Checkout",
	checkoutPageSubTitle:
		"Please Enter Your Details Below to Complete Your Purchase.",

	//
	defaultOrderStatus: "Transaction completed - label generated",
	defaultStatusInOrder: "in process",

	wrongCardDetails: "Card details not valid",

	chooseProducts: "Choose a Product",
	writeReview: "We’d love to hear your feedback!",
	reviewSuccessMsg: "Thank you for being a customer.",

	headlineMissing: "Please add a Headline.",
	reviewMissing: "Please express your views.",

	//
	comboCatTitle: "Bundles",
	comboCatDesc: "Bundles",

	//
	trackPlaceHolder: "Enter Your Tracking ID.",
	trackLabel: "Track Your Order",

	//
	enterMsg:
		"You must be 18 years or older to order CBD products. If you are of legal age click Enter.",

	zipCodeInvalidShippingError: "Pelase enter a valid zip code .",
};

export default msgStrings;
