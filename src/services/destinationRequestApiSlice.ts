// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const destinationRequestApiSlice = createApi({
	reducerPath: "destinationRequestApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["DestinationRequests"],
	endpoints: (builder) => ({
		getDestinationRequests: builder.query({
			query: () => ({
				url: "/user-destination-request/destination-requests",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["DestinationRequests"],
		}),
		getDestinationRequest: builder.query({
			query: (id) => ({
				url: `/user-destination-request/destination-request/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		submitDestinationRequest: builder.mutation({
			query: (payload) => ({
				url: "/user-destination-request/submit-destination-request",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
			invalidatesTags: ["DestinationRequests"],
		}),
		acceptDestinationRequest: builder.mutation({
			query: () => ({
				url: "/user-destination-request/accept-destination-request/:id",
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			invalidatesTags: ["DestinationRequests"],
		}),
	}),
});

export const {
	useGetDestinationRequestQuery,
	useGetDestinationRequestsQuery,
	useSubmitDestinationRequestMutation,
	useAcceptDestinationRequestMutation,
} = destinationRequestApiSlice;
