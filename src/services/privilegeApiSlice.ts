// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const privilegeApiSlice = createApi({
	reducerPath: "privilegeApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Privileges"],
	endpoints: (builder) => ({
		getPrivileges: builder.query({
			query: () => ({
				url: "/privilege/privileges",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
	}),
});

export const { useGetPrivilegesQuery } = privilegeApiSlice;
