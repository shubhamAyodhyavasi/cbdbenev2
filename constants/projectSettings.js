export const projectName           = "bene";
export const baseUrl               = "http://localhost:4000";
export const docMzUrl              = "http://localhost:3001";
export const serverUrl             = "https://admin.cbdbene.com/";
export const googleApiKey          = "AIzaSyBXxXfKy5wtHEO9XniOvGEKPME-_ldClVk"
export const shippingFreeAfter     = 75;
export const shippingExtraRate     = 5;
export const shippingStaticRate    = 5.95;
export const referralPresent       = 25;
export const defaultOrderStatus    = "Transaction completed - label generated";
export const defaultStatusInOrder  = "in process";
export const invoiceUrl            = "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/public/invoices/";
export const subsPercent           = 10
export const filePath              = "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/"
export const labSheetPath          = "https://admin.cbdbene.com/var/www/cbdbene_3rde/cbdbene/"
export const countryTax            = 15/100

export const enableCountry         = ["US", "USA", "United States"];
export const accountTypeOpt        = [
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
    labSheetPath,
    countryTax,
    docMzUrl
}