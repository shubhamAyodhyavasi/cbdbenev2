import axios from 'axios'
import apiList from './apiList'

export const getAllCreatives                = ()         => axios.get(apiList.getAllCreatives);
export const getAmbassadorDetails           = id         => axios.get(apiList.getAmbassadorDetails+id);
export const updateAffBank                  = (id, bank) => axios.post(apiList.updateAff, {
    id,
    bank
});
export const updateAffData                  = (id, account) => axios.post(apiList.updateAff, {
    id,
    account
});
export const updateAffTax                   = (id, tax) => axios.post(apiList.updateAff, {
    id,
    tax
});
export const ambassadorPortalLogin          = (email, password) => axios.post(apiList.ambassadorPortalLogin, {
    email, password
});
export const ambassadorPortalRegistration   = body => axios.post(apiList.ambassadorPortalRegistration, body);
export const addAmbassador                  = body => axios.post(apiList.addAmbassador, body);
export const forgotPasswordAff              = body => axios.post(apiList.forgotPasswordAff, body);