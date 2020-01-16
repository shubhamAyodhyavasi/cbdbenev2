import axios from 'axios'
import apiList from './apiList'

export const getDoctors     = () => axios.get(apiList.getDoctors)