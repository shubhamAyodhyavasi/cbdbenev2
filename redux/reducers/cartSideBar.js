import { TOGGLE_CART_BAR, SHOW_CART_BAR, HIDE_CART_BAR } from "../actions/type";

const initialState = {
  isOpen: false
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case TOGGLE_CART_BAR:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case SHOW_CART_BAR:
      return {
        ...state,
        isOpen: true
      };

    case HIDE_CART_BAR:
      return {
        ...state,
        isOpen: false
      };

    default:
      return state;
  }
};
