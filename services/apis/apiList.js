import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    getAllProducts      : `${baseUrl}/products/api/all/`,
    getProductById      : `${baseUrl}/products/api/getbyid/`,
    userRegistration    : `${baseUrl}/users/api/register/`,
    userLogin           : `${baseUrl}/users/api/login/`,
    updateUserDetails   : `${baseUrl}/users/api/profile`,
    getUserDetails      : `${baseUrl}/users/api/profile/`,
    contact             : `${baseUrl}/contact-us/`,
}
export default apiList