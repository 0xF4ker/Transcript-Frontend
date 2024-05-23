// userApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";
import { logout } from "../features/Auth/authSlice";

export const userApiSlice = createApi({
	reducerPath: "userApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["User", "Users"],
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (payload) => ({
				url: "/auth/signup",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
			}),
			// Pick out data and prevent nested properties in a hook or selector
			transformResponse: (response: any) => response?.message,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
			invalidatesTags: ["Users"],
		}),
		getUsers: builder.query({
			query: () => "/user/users",
			providesTags: ["Users"],
			transformResponse: (response: any) => response?.data,
		}),
		getUser: builder.query({
			query: (id) => `/user/user/${id}`,
			providesTags: ["User"],
			transformResponse: (response: any) => response?.data,
		}),
		updateUser: builder.mutation({
			query: (payload) => ({
				url: `/user/update-user/${payload.id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["Users"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/user/delete-user/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
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

export const {
	useRegisterUserMutation,
	useGetUsersQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApiSlice;
