import axios from "axios";
import apiList from "./apiList";

export const getBlogs = (pageNo, tag) =>
	axios.post(apiList.getBlogs, { pageNo, tag });
