import { SET_CURRENT_APPOINTMENT,
    UNSET_CURRENT_APPOINTMENT
} from "../actions/type";

const initialState = {
    currentAppointment: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_APPOINTMENT:
      return {
        ...state,
        currentAppointment: action.payload
      };
    case UNSET_CURRENT_APPOINTMENT:
      return {
        ...state,
        currentAppointment: null
      };
    default:
      return state;
  }
};
