import { LOADING } from '../actions/type'

const initialState = {
    isLoading: false,
};

export default (state = initialState, action) => {
    const { payload, type } = action;

    switch (type) {
        case LOADING:
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    }
};

