import { 
  TOGGLE_CART_BAR, SHOW_CART_BAR, HIDE_CART_BAR,
  TOGGLE_REGISTRATION_BAR, SHOW_REGISTRATION_BAR, HIDE_REGISTRATION_BAR,
  HAS_LOGIN, TO_DISPLAY
} from "./type";

export const toggleCartBar = (a) => dispatch => {
  console.log({
    a
  })
  dispatch({
    type: TOGGLE_CART_BAR
  });
  document.body.classList.toggle("drawer-open");
};
export const showCartBar = () => dispatch => {
  dispatch({
    type: SHOW_CART_BAR
  });
  document.body.classList.add("drawer-open");
};
export const hideCartBar = () => dispatch => {
  dispatch({
    type: HIDE_CART_BAR
  });
  document.body.classList.remove("drawer-open");
};
export const toggleRegBar = () => dispatch => {
  dispatch({
    type: TOGGLE_REGISTRATION_BAR
  });
  document.body.classList.toggle("drawer-open");
};
export const showRegBar = () => dispatch => {
  dispatch({
    type: SHOW_REGISTRATION_BAR
  });
  document.body.classList.add("drawer-open");
};
export const hideRegBar = () => dispatch => {
  dispatch({
    type: HIDE_REGISTRATION_BAR
  });
  document.body.classList.remove("drawer-open");
};
export const hideHasLogin = () => ({
  type: HAS_LOGIN,
  payload: false
});
export const showHasLogin = () => ({
  type: HAS_LOGIN,
  payload: true
});
export const drawerToDisplay = payload => ({
  type: TO_DISPLAY,
  payload
})