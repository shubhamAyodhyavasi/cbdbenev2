import { SET_ADDRESS } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS:
      return action.payload;

    default:
      return state;
  }
};
