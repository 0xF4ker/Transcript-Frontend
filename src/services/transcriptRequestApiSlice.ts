// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const transcriptRequestApiSlice = createApi({
	reducerPath: "transcriptRequestApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["TranscriptRequests"],
	endpoints: (builder) => ({
		getTranscriptRequests: builder.query({
			query: () => ({
				url: "/transcript-request/transcript-requests",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["TranscriptRequests"],
		}),
		getRecentTranscriptRequests: builder.query({
			query: (id) => ({
				url: `/transcript-request/recent-transcript-requests/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["TranscriptRequests"],
		}),
		getTranscriptRequest: builder.query({
			query: (id) => ({
				url: `/transcript-request/transcript-request/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["TranscriptRequests"],
		}),
		updateTranscriptRequestStatus: builder.mutation({
			query: (payload) => ({
				url: `/transcript-request/update-transcript-request-status/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptRequests"],
		}),
		deleteTranscriptRequest: builder.mutation({
			query: (id) => ({
				url: `/transcript-request/delete-transcript-request/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptRequests"],
		}),
		submitTranscriptRequest: builder.mutation({
			query: (payload) => ({
				url: "/transcript-request/submit-request",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
			invalidatesTags: ["TranscriptRequests"],
		}),
	}),
});

export const {
	useGetTranscriptRequestQuery,
	useGetRecentTranscriptRequestsQuery,
	useGetTranscriptRequestsQuery,
	useSubmitTranscriptRequestMutation,
	useDeleteTranscriptRequestMutation,
	useUpdateTranscriptRequestStatusMutation,
} = transcriptRequestApiSlice;
