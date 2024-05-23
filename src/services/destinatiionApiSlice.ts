// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const destinationApiSlice = createApi({
	reducerPath: "destinationApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Destinations"],
	endpoints: (builder) => ({
		getDestinations: builder.query({
			query: () => ({
				url: "/destination/destinations",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["Destinations"],
		}),
		getDestination: builder.query({
			query: (id) => ({
				url: `/destination/destination/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		createDestination: builder.mutation({
			query: (payload) => ({
				url: "/destination/create-destination",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
		}),
		deleteDestination: builder.mutation({
			query: (id) => ({
				url: `/destination/delete-destination/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
		}),
		editDestination: builder.mutation({
			query: (payload) => ({
				url: `/destination/edit-destination/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
		}),
	}),
});

export const {
	useGetDestinationQuery,
	useGetDestinationsQuery,
	useCreateDestinationMutation,
	useDeleteDestinationMutation,
	useEditDestinationMutation,
} = destinationApiSlice;
