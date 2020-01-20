import { 
  TOGGLE_CART_BAR, SHOW_CART_BAR, HIDE_CART_BAR,
  TOGGLE_REGISTRATION_BAR, SHOW_REGISTRATION_BAR, HIDE_REGISTRATION_BAR,
  HAS_LOGIN, TO_DISPLAY
} from "../actions/type";

const initialState = {
  isCartOpen: false,
  isRegOpen: false,
  hasLogin: false,
  toDisplay: "login"
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOGGLE_CART_BAR:
      return {
        ...state,
        isCartOpen: !state.isCartOpen
      };

    case SHOW_CART_BAR:
      return {
        ...state,
        isCartOpen: true
      };

    case HIDE_CART_BAR:
      return {
        ...state,
        isCartOpen: false
      };

    case TOGGLE_REGISTRATION_BAR:
      return {
        ...state,
        isRegOpen: !state.isRegOpen
      };

    case SHOW_REGISTRATION_BAR:
      return {
        ...state,
        isRegOpen: true
      };

    case HIDE_REGISTRATION_BAR:
      return {
        ...state,
        isRegOpen: false
      };

    case HAS_LOGIN:
      return {
        ...state,
        hasLogin: payload
      };

    case TO_DISPLAY:
      return {
        ...state,
        toDisplay: payload
      };

    default:
      return state;
  }
};
