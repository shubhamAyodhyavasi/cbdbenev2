import { getBlogs } from "../../services/apis/blog";
import * as actionTypes from "./type";

export const get = (pageNo, tag) => {
	
	return (dispatch) => {
		return getBlogs(pageNo, tag)
			.then((result) => {
			
				dispatch({
					type: actionTypes.GET_ALL,
					payload: result.data.data,
					pageNo: pageNo,
					tag: tag,
				});
			})
			.catch((err) => {
				console.log("	I got error here", err);
				return Promise.reject(err);
			});
	};
};

export const getArticle = (index) => {
	return {
		type: actionTypes.GET_ARTICLE,
		index,
	};
};
