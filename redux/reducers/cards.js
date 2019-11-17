import { SET_CARDS } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CARDS:
      return action.payload;

    default:
      return state;
  }
};
