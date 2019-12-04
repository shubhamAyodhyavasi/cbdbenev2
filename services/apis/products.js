import projectSettings from "../../constants/projectSettings";
import axios from 'axios'
import apiList from "./apiList";

const {
    baseUrl
} = projectSettings
export const getProductById = id => axios.get("/products/api/getbyid/", id)

export const getAllProducts = () => axios.get(baseUrl+"/products/api/all/")
export const getAllCombos   = () => axios.get(apiList.getAllCombos)