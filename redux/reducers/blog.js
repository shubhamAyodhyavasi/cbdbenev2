import * as actionTypes from "../actions/type";
const initiaState = {
	article: [],
	currentTag: "All",
	current: {},
	pageNo: 0,
};

const add = (state, action) => {
	
	if (state.currentTag !== action.tag) {
		return {
			...state,
			article: action.payload,
			pageNo: action.pageNo,
			currentTag: action.tag,
			current: {},
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

const clearCurrent = (state, action) => {
	console.log("clear reducr");
	return state;
};
const reducer = (state = initiaState, action) => {
	switch (action.type) {
		case actionTypes.GET_ALL:
			return add(state, action);
		case actionTypes.GET_ARTICLE:
			return setCurrent(state, action);
		case "CLEAR":
			return clearCurrent(state, action);
		default:
			return state;
	}
};
export default reducer;
