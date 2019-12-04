import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    getAllProducts                  : `${baseUrl}/products/api/all/`,
    getAllCombos                    : `${baseUrl}/products/api/combos/all/`,
    getProductById                  : `${baseUrl}/products/api/getbyid/`,
    userRegistration                : `${baseUrl}/users/api/register/`,
    userLogin                       : `${baseUrl}/users/api/login/`,
    updateUserDetails               : `${baseUrl}/users/api/profile/`,
    getUserDetails                  : `${baseUrl}/users/api/profile/`,
    contact                         : `${baseUrl}/contact-us/`,
    getShippingRates                : `${baseUrl}/ship/shipment/`,
    confirmShipment                 : `${baseUrl}/ship/confirm/`,
    authorizeCharge                 : `${baseUrl}/authorize/charge/`,
    authorizeChargeProfile          : `${baseUrl}/authorize/chargeprofile/`,
    authorizeChargeBank             : `${baseUrl}/authorize/charge/bank/`,
    authorizeSubscription           : `${baseUrl}/authorize/create/subscription/`,
    authorizeSubscriptionProfile    : `${baseUrl}/authorize/create/subscription/profile/`,
    authorizeSubscriptionBank       : `${baseUrl}/authorize/create/subscription/bank/`,
    placeOrder                      : `${baseUrl}/order/add/`,
    placeOrderNew                   : `${baseUrl}/order/process/order/`,
}
export default apiList