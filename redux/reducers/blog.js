import * as actionTypes from "../actions/type";
const initiaState = {
	article: [],
	currentTag: "",
	current: {},
	pageNo: 0,
};

const add = (state, action) => {
	console.log("in reducer", action.payload);
	if (state.tag !== action.tag) {
		return {
			...state,
			article: action.payload,
			pageNo: action.pageNo,
			tag: action.tag,
		};
	} else {
		let curValue = state.article;
		let value = curValue.concat(action.payload);
		return {
			...state,
			article: value,
			pageNo: action.pageNo,
		};
	}
};

const setCurrent = (state, action) => {
	console.log("blog state", state);
	return {
		...state,
		current: state.article[action.index],
	};
};
const reducer = (state = initiaState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL:
			return add(state, action);
		case actionTypes.GET_ARTICLE:
			return setCurrent(state, action);
		default:
			return state;
	}
};
export default reducer;
