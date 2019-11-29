import projectSettings from "../../constants/projectSettings";
import axios from 'axios'

const {
    baseUrl
} = projectSettings
export const getProductById = id => axios.get("/products/api/getbyid/", id)

export const getAllProducts = () => axios.get(baseUrl+"/products/api/all/")