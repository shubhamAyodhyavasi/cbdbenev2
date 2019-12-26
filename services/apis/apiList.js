import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    getAllProducts                  : `${baseUrl}/products/api/all/`,
    getAllCombos                    : `${baseUrl}/products/api/combos/all/`,
    getProductById                  : `${baseUrl}/products/api/getbyid/`,

    addToWishList                   : `${baseUrl}/wishlist/api/add/`,
    getWishList                     : `${baseUrl}/wishlist/api/byuser/`,
    deleteWishList                  : `${baseUrl}/wishlist/api/delete/`,
    
    userRegistration                : `${baseUrl}/users/api/register/`,
    userLogin                       : `${baseUrl}/users/api/login/`,
    updateUserDetails               : `${baseUrl}/users/api/profile/`,
    getUserDetails                  : `${baseUrl}/users/api/profile/`,
    updateUserPassword              : `${baseUrl}/users/api/profile/password/`,

    contact                         : `${baseUrl}/contact-us/`,

    getShippingRates                : `${baseUrl}/ship/shipment/`,
    confirmShipment                 : `${baseUrl}/ship/confirm/`,

    authorizeCharge                 : `${baseUrl}/authorize/charge/`,
    authorizeChargeProfile          : `${baseUrl}/authorize/chargeprofile/`,
    authorizeChargeBank             : `${baseUrl}/authorize/charge/bank/`,
    authorizeSubscription           : `${baseUrl}/authorize/create/subscription/`,
    authorizeSubscriptionProfile    : `${baseUrl}/authorize/create/subscription/profile/`,
    authorizeSubscriptionBank       : `${baseUrl}/authorize/create/subscription/bank/`,
    authorizeSubscriptionBank       : `${baseUrl}/authorize/create/subscription/bank/`,
    authorizeAddCard                : `${baseUrl}/authorize/addcard/`,
    authorizeSaveCard               : `${baseUrl}/authorize/savecard/`,
    authorizeDeleteCard             : `${baseUrl}/authorize/deletecard/`,

    placeOrder                      : `${baseUrl}/order/add/`,
    placeOrderNew                   : `${baseUrl}/order/process/order/`,
    allOrderList                    : `${baseUrl}/order/getorders/`,
    orderList                       : `${baseUrl}/order/api/getbyuser/`,
}
export default apiList