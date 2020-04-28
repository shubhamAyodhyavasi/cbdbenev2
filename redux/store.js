import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { createStateSyncMiddleware } from "redux-state-sync";

const SET_CLIENT_STATE = "SET_CLIENT_STATE";
const middlewares = [
	thunk,
	createStateSyncMiddleware({
		// blacklist: ["extras", "products"]
		whitelist: [
			"cart",
			"user",
			"wishList",
			"checkout",
			"firstSetting",
			"ambassadoruser",
		],
	}),
];

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["cart", "user", "firstSetting", "ambassadoruser"],
};

const sessionRedConfig = {
	key: "referrer",
	storage: sessionStorage,
};

const { referrer, ...otherReducer } = rootReducer;

const allReducers = combineReducers({
	...otherReducer,
	referrer: persistReducer(sessionRedConfig, referrer),
});

const persistedReducer = persistReducer(persistConfig, allReducers);

// const initialState = {
//   lastUpdate: 0,
//   light: false,
//   count: 0,
// }

// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'TICK':
//       return {
//         ...state,
//         lastUpdate: action.lastUpdate,
//         light: !!action.light,
//       }
//     case 'INCREMENT':
//       return {
//         ...state,
//         count: state.count + 1,
//       }
//     case 'DECREMENT':
//       return {
//         ...state,
//         count: state.count - 1,
//       }
//     case 'RESET':
//       return {
//         ...state,
//         count: initialState.count,
//       }
//     default:
//       return state
//   }
// }

// export const initializeStore = (preloadedState = initialState) => {
//   return createStore(
//     reducer,
//     preloadedState,
//     composeWithDevTools(applyMiddleware())
//   )
// }

const makeConfiguredStore = (reducer, initialState) =>
	createStore(reducer, initialState, applyMiddleware(...middlewares));

export const makeStore = (initialState, { isServer, req, debug, storeKey }) => {
	if (isServer) {
		initialState = initialState || { fromServer: "foo" };

		return makeConfiguredStore(allReducers, initialState);
	} else {
		// we need it only on client side

		const store = makeConfiguredStore(persistedReducer, initialState);

		store.__persistor = persistStore(store); // Nasty hack

		return store;
	}
};

export const setClientState = (clientState) => ({
	type: SET_CLIENT_STATE,
	payload: clientState,
});
// export default (preloadedState = undefined) => {
//   let store = createStore(
//     persistedReducer,
//     // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
//     preloadedState,
//     composeWithDevTools(applyMiddleware(...middlewares))
//   );
//   let persistor = persistStore(store);
//   // return { store, persistor };
//   return store
// };
