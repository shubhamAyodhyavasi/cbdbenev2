import Axios from "axios";
import projectSettings from "../../constants/projectSettings";
const {baseUrl} = projectSettings
export const categoryList =async ()=>{
    try {
        const response = await Axios.get(`${baseUrl}/categories/getcategories`);
        console.log("i got this", response);
        return response.data.categories;
    }
    catch (err) {
        console.log("this is err", err);
    }
}