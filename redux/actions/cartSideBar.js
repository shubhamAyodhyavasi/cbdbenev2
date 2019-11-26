import { TOGGLE_CART_BAR, SHOW_CART_BAR, HIDE_CART_BAR } from "./type";

export const toggleCartBar = () => dispatch => {
  dispatch({
    type: TOGGLE_CART_BAR
  });
  document.body.classList.toggle("cart-open");
};
export const showCartBar = () => dispatch => {
  dispatch({
    type: SHOW_CART_BAR
  });
  document.body.classList.add("cart-open");
};
export const hideCartBar = () => dispatch => {
  dispatch({
    type: HIDE_CART_BAR
  });
  document.body.classList.remove("cart-open");
};
