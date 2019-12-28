const projectName           = "bene";
const baseUrl               = "http://localhost:4000";
const serverUrl             = "https://admin.cbdbene.com/";
const googleApiKey          = "AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk"
const shippingFreeAfter     = 75;
const shippingExtraRate     = 5;
const shippingStaticRate    = 5.95;
const referralPresent       = 25;
const defaultOrderStatus    = "Transaction completed - label generated";
const defaultStatusInOrder  = "in process";
const invoiceUrl            = "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/public/invoices/";
const subsPercent           = 10
const filePath              = "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/"
const countryTax            = 15

const enableCountry         = ["US", "USA", "United States"];
const accountTypeOpt        = [
    {
      label: "Checking",
      value: "checking"
    },
    {
      label: "Savings",
      value: "savings"
    },
    {
      label: "Business Checking",
      value: "businessChecking"
    }
];
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
    countryTax
}