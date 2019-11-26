import projectSettings from "../../constants/projectSettings";
const {
    baseUrl
} = projectSettings
const apiList = {
    getAllProducts: `${baseUrl}/products/api/all/`,
    getProductById: `${baseUrl}/products/api/getbyid/`,
}
export default apiList