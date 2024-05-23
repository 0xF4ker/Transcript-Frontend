// collegeApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const rootApiSlice = createApi({
	reducerPath: "rootApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Colleges"],
	endpoints: (builder) => ({
		getRoot: builder.query({
			query: () => ({
				url: "/",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		getRootOutside: builder.query({
			query: () => ({
				url: "/",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
	}),
});

export const { useGetRootQuery, useGetRootOutsideQuery } = rootApiSlice;
