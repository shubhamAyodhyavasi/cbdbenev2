import projectSettings from "../constants/projectSettings";
import fetch from 'isomorphic-unfetch';

const {
    baseUrl
} = projectSettings
const rest = {
    post: (url, body) => 
        fetch(`${baseUrl}${url}`, {
            method: "POST",
            mode: "cors",
            headers: {
            //Accept: "application/json",
            "Content-Type": "application/json",
            Accept: "text/html"
            },
            body: JSON.stringify(body)
        }),
    get: (url, body) => {
        if (body)
          return fetch(`${baseUrl}${url}${body}`, {
            method: "GET",
            mode: "cors"
          });
    
        return fetch(`${baseUrl}${url}`, {
          method: "GET",
          mode: "cors"
        });
    },
}
export default rest