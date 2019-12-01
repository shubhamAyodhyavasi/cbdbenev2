import axios from 'axios'
import projectSettings from '../../constants/projectSettings'
export const searchAddress = address => axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address
    .split(" ")
    .join("+")}&key=${projectSettings.googleApiKey}`)