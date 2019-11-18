import { SET_PRODUCTS, SET_PRODUCT, CLEAR_PRODUCT } from "../actions/type";
// import {
//   getFeaturedProduct,
//   getVisibleProducts
//   // filteredAttr,
//   // getAttrListing
// } from "../services/extra/productHelpers";

import {getVisibleProducts, getFeaturedProduct, getCategoriesProducts} from '../../services/helpers/product'
const initialState = {
  products: [],
  product: null,
  featured: [],
  categories: []
};

export default (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: [
          ...getVisibleProducts(payload)
        ],
        featured: getFeaturedProduct(payload),
        categories: getCategoriesProducts(payload)
      };

    case SET_PRODUCT:
      return {
        ...state,
        product: payload
      };

    case CLEAR_PRODUCT:
      return {
        ...state,
        product: null
      };

    default:
      return state;
  }
};
