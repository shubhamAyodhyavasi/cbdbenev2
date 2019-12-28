import axios from 'axios'
import apiList from './apiList'

export const getShippingRates = body => axios.post(apiList.getShippingRates, body)
export const confirmShipment  = body => axios.post(apiList.confirmShipment , body)


export const authorizeCharge                = body => axios.post(apiList.authorizeCharge, body)
export const authorizeChargeProfile         = body => axios.post(apiList.authorizeChargeProfile, body)
export const authorizeChargeBank            = body => axios.post(apiList.authorizeChargeBank, body)
export const authorizeSubscription          = body => axios.post(apiList.authorizeSubscription, body)
export const authorizeSubscriptionProfile   = body => axios.post(apiList.authorizeSubscriptionProfile, body)
export const authorizeSubscriptionBank      = body => axios.post(apiList.authorizeSubscriptionBank, body)
export const authorizeAddCard               = body => body.profileid ? axios.post(apiList.authorizeAddCard, body) : axios.post(apiList.authorizeSaveCard, body)
export const authorizeDeleteCard            = body => axios.post(apiList.authorizeDeleteCard, body)

export const placeOrder                     = body => axios.post(apiList.placeOrder, body);
export const placeOrderNew                  = body => axios.post(apiList.placeOrderNew, body);

export const getTaxValue                    = countryCode => axios.get(apiList.getTaxValue+countryCode);