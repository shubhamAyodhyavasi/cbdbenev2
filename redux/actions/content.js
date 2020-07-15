import Axios from "axios";
import { contentUrl } from "../../constants/projectSettings";

export const homeData = () => {
	console.log("called");
	return Axios.get(`${contentUrl}/Home/get`)
		.then((response) => {
			console.log("i got this", response);
			return response.data.data;
		})
		.catch((err) => {
			console.log("this is err", err);
		});
};

export const shopData = () =>{
	return Axios.get(`${contentUrl}/Shop/get`)
		.then((response) => {
			console.log("i got this", response);
			return response.data.data;
		})
		.catch((err) => {
			console.log("this is err", err);
		});
}

export const categoryData = () =>{
	return Axios.get(`${contentUrl}/Category/get`)
		.then((response) => {
			console.log("i got this", response);
			return response.data.data;
		})
		.catch((err) => {
			console.log("this is err", err);
		});
} 