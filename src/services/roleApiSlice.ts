// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const roleApiSlice = createApi({
	reducerPath: "roleApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Roles"],
	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => ({
				url: "/role/roles",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["Roles"],
		}),
		getRole: builder.query({
			query: (id) => ({
				url: `/role/role/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		createRole: builder.mutation({
			query: (payload) => ({
				url: "/role/create-role",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Roles"],
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
		}),
		deleteRole: builder.mutation({
			query: (id) => ({
				url: `/role/delete-role/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Roles"],
		}),
		editRole: builder.mutation({
			query: (payload) => ({
				url: `/role/edit-role/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Roles"],
		}),
	}),
});

export const {
	useGetRoleQuery,
	useGetRolesQuery,
	useCreateRoleMutation,
	useDeleteRoleMutation,
	useEditRoleMutation,
} = roleApiSlice;
