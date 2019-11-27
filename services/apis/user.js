import apiList from "./apiList";
import axios from "axios";


export const registerUser = body => axios.post(apiList.userRegistration, {...body, role: "customer"})