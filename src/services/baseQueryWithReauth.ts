import {
	fetchBaseQuery,
	BaseQueryFn,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { logout } from "../features/Auth/authSlice";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
	baseUrl: "https://api.transcript.adenibuyan.com",
	credentials: "include",
});

const baseQueryWithReauth: BaseQueryFn<
	string | { url: string; method?: string; body?: any },
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	await mutex.waitForUnlock();

	let result = await baseQuery(args, api, extraOptions);

	if (result.error && result.error.status === 401) {
		api.dispatch(logout());
		// window.location.href = "/login";
	}

	return result;
};

export default baseQueryWithReauth;
