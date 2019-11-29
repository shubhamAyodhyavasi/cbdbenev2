import axios from 'axios'
import apiList from './apiList'

export const contactUs = body => axios.post(apiList.contact, body)