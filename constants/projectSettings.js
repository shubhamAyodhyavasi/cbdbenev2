export const projectName = "bene";
export const baseUrl = "http://localhost:4000";
export const docMzUrl = "http://localhost:3001";
export const serverUrl = "https://admin.cbdbene.com/";
export const imageUrl = "/images";
export const adminUrl = "http://localhost:5000";
export const googleApiKey = "AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk";
export const shippingFreeAfter = 75;
export const shippingExtraRate = 5;
export const shippingStaticRate = 5.95;
export const referralPresent = 25;
export const defaultOrderStatus = "Transaction completed - label generated";
export const defaultStatusInOrder = "in process";
export const invoiceUrl =
	"https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/public/invoices/";
export const subsPercent = 10;
export const filePath =
	"https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/";
export const labSheetPath =
	"https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/";
export const countryTax = 15 / 100;

export const chatTheme = {
	background: "#ffffff",
	// fontFamily: fonts.mainfont,
	headerBgColor: "#faf7f5",
	headerFontColor: "#1A1811",
	headerFontSize: "20px",
	botBubbleColor: "#eee9e3",
	botFontColor: "#202020",
	userBubbleColor: "#fff",
	userFontColor: "#4a4a4a",
};

export const enableCountry = ["US", "USA", "United States"];
export const accountTypeOpt = [
	{
		label: "Checking",
		value: "checking",
	},
	{
		label: "Savings",
		value: "savings",
	},
	{
		label: "Business Checking",
		value: "businessChecking",
	},
];
export const customRates = [
	{
		id: "rate_custom1",
		object: "Rate",
		created_at: "2020-02-10T10:54:03Z",
		updated_at: "2020-02-10T10:54:03Z",
		mode: "test",
		service: "Priority",
		carrier: "USPS",
		rate: "8.42",
		currency: "USD",
		retail_rate: "14.90",
		retail_currency: "USD",
		list_rate: "11.19",
		list_currency: "USD",
		delivery_days: 2,
		delivery_date: null,
		delivery_date_guaranteed: false,
		est_delivery_days: 2,
		shipment_id: "shp_2255eb7f0e8b4775abcfe009be9ba569",
		carrier_account_id: "ca_5cd23a24d9c3427780dcfde68fbb1c76",
		customName: "Standard",
		customRate: 15.89,
	},
	{
		id: "rate_custom2",
		object: "Rate",
		created_at: "2020-02-10T10:54:03Z",
		updated_at: "2020-02-10T10:54:03Z",
		mode: "test",
		service: "ParcelSelect",
		carrier: "USPS",
		rate: "10.89",
		currency: "USD",
		retail_rate: "10.89",
		retail_currency: "USD",
		list_rate: "10.89",
		list_currency: "USD",
		delivery_days: 7,
		delivery_date: null,
		delivery_date_guaranteed: false,
		est_delivery_days: 7,
		shipment_id: "shp_2255eb7f0e8b4775abcfe009be9ba569",
		carrier_account_id: "ca_5cd23a24d9c3427780dcfde68fbb1c76",
		customName: "Priority",
		customRate: 20.54,
	},
	{
		id: "rate_custom3",
		object: "Rate",
		created_at: "2020-02-10T10:54:03Z",
		updated_at: "2020-02-10T10:54:03Z",
		mode: "test",
		service: "Express",
		carrier: "USPS",
		rate: "43.60",
		currency: "USD",
		retail_rate: "50.85",
		retail_currency: "USD",
		list_rate: "43.60",
		list_currency: "USD",
		delivery_days: null,
		delivery_date: null,
		delivery_date_guaranteed: false,
		est_delivery_days: null,
		shipment_id: "shp_2255eb7f0e8b4775abcfe009be9ba569",
		carrier_account_id: "ca_5cd23a24d9c3427780dcfde68fbb1c76",
		customName: "Express",
		customRate: 48.6,
	},
];
export const topBarText = "Free shipping on all orders above $75."; // make it empty string ("") to hide tha bar
export default {
	projectName,
	baseUrl,
	serverUrl,
	googleApiKey,
	shippingFreeAfter,
	shippingExtraRate,
	shippingStaticRate,
	referralPresent,
	defaultOrderStatus,
	defaultStatusInOrder,
	invoiceUrl,
	enableCountry,
	subsPercent,
	accountTypeOpt,
	filePath,
	labSheetPath,
	countryTax,
	docMzUrl,
	customRates,
	chatTheme,
	topBarText,
};
