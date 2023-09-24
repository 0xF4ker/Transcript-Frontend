import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./features/User/userSlice";
import { userApiSlice } from "./features/api/Auth/authApiSlice";

const reducers = combineReducers({
	user: userReducer,
	[userApiSlice.reducerPath]: userApiSlice.reducer,
});

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({}).concat([userApiSlice.middleware]),
});

setupListeners(store.dispatch);

export default store;
