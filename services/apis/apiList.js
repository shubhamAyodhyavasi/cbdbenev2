import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    getAllProducts: `${baseUrl}/products/api/all/`,
    getProductById: `${baseUrl}/products/api/getbyid/`,
    userRegistration: `${baseUrl}/users/api/register`,
}
export default apiList