import rest from '../rest'
import projectSettings from "../../constants/projectSettings";
import axios from 'axios'

const {
    baseUrl
} = projectSettings
export const getProductById = id => rest.get("/products/api/getbyid/", id)

export const getAllProducts = () => axios.get(baseUrl+"/products/api/all/")