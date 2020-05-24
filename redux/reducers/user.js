import { SET_USER, UNSET_USER } from "../actions/type";

const initialState = {};

export default (state = initialState, action) => {
	const { payload, type } = action;
	console.log(action);
	switch (type) {
		case SET_USER:
			return payload;

		case UNSET_USER: {
			console.log("reducer");
			return payload;
		}

		default: {
			console.log("default");
			return state;
		}
	}
};
