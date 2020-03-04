import axios from 'axios'
import apiList from "./apiList";

export const getProductById     = id    => axios.get(apiList.getProductById + id)
export const getProductByName   = name  => axios.get(apiList.getProductByName + name)

export const getAllProducts = ()    => axios.get(apiList.getAllProducts)
export const getAllCombos   = ()    => axios.get(apiList.getAllCombos)

export const addToWishList = (userid, productid, productmeta, productSlug)  => axios.post(apiList.addToWishList, {
    userid,
    productid,
    productmeta,
    productSlug
})
export const deleteWishList  = body   => axios.post(apiList.deleteWishList, body)
export const getWishList     = userid => axios.post(apiList.getWishList, {userid})

export const getReviews      = id     => axios.get(apiList.getReviews+id)
export const addReviews      = body   => axios.post(apiList.addReviews, body)