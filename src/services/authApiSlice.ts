// userApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { logout } from "../features/Auth/authSlice";

export const authApiSlice = createApi({
	reducerPath: "authApi",
	baseQuery: baseQueryWithReauth,
	endpoints: (builder) => ({

		loginUser: builder.mutation({
			query: (payload) => ({
				url: "/auth/login",
				method: "POST",
				body: payload,
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: "/auth/logout",
				method: "POST",
			}),
			async onQueryStarted(_, { dispatch }) {
				localStorage.removeItem("transcript-uid");
				dispatch(logout());
			},
		}),
	}),
});

export const { useLoginUserMutation, useLogoutUserMutation } = authApiSlice;
