import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
	reducerPath: "userApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://api.transcript.dtkapp.com.ng/`,
	}),
	tagTypes: ["User"],
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (payload) => ({
				url: payload,
				method: "GET",
				headers: {
					"Content-type": "application/json",
				},
			}),
			transformResponse: (result: any) => result.data,
		}),
	}),
});

export const { useGetUserQuery } = userApi;
