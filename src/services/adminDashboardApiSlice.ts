// collegeApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const adminDashboardApiSlice = createApi({
	reducerPath: "adminDashboardApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["AdminDashboard"],
	endpoints: (builder) => ({
		getAdminDashboard: builder.query({
			query: () => "/admin-dashboard/admin-dashboard",
			providesTags: ["AdminDashboard"],
			// transformResponse: (response: any) => response?.data,
		}),
	}),
});

export const { useGetAdminDashboardQuery } = adminDashboardApiSlice;
