import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import userReducer from "./features/User/userSlice";
import { userApiSlice } from "./services/userApiSlice";
import { departmentApiSlice } from "./services/departmentApiSlice";
import { collegeApiSlice } from "./services/collegeApiSlice";
import { authApiSlice } from "./services/authApiSlice";
import authReducer from "./features/Auth/authSlice";
import { destinationApiSlice } from "./services/destinatiionApiSlice";
import { privilegeApiSlice } from "./services/privilegeApiSlice";
import { roleApiSlice } from "./services/roleApiSlice";
import { transcriptTypeApiSlice } from "./services/transcriptTypeApiSlice";
import { transcriptRequestApiSlice } from "./services/transcriptRequestApiSlice";
import { rootApiSlice } from "./services/rootApiSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		[rootApiSlice.reducerPath]: rootApiSlice.reducer,
		[authApiSlice.reducerPath]: authApiSlice.reducer,
		[userApiSlice.reducerPath]: userApiSlice.reducer,
		[departmentApiSlice.reducerPath]: departmentApiSlice.reducer,
		[collegeApiSlice.reducerPath]: collegeApiSlice.reducer,
		[destinationApiSlice.reducerPath]: destinationApiSlice.reducer,
		[privilegeApiSlice.reducerPath]: privilegeApiSlice.reducer,
		[roleApiSlice.reducerPath]: roleApiSlice.reducer,
		[transcriptTypeApiSlice.reducerPath]: transcriptTypeApiSlice.reducer,
		[transcriptTypeApiSlice.reducerPath]: transcriptTypeApiSlice.reducer,
		[transcriptRequestApiSlice.reducerPath]: transcriptRequestApiSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(
			authApiSlice.middleware,
			userApiSlice.middleware,
			departmentApiSlice.middleware,
			collegeApiSlice.middleware,
			destinationApiSlice.middleware,
			privilegeApiSlice.middleware,
			roleApiSlice.middleware,
			transcriptTypeApiSlice.middleware,
			transcriptRequestApiSlice.middleware,
			rootApiSlice.middleware
		),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
