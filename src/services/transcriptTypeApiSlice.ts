// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const transcriptTypeApiSlice = createApi({
	reducerPath: "transcriptTypeApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["TranscriptTypes"],
	endpoints: (builder) => ({
		getTranscriptTypes: builder.query({
			query: () => ({
				url: "/transcript-type/transcript-types",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["TranscriptTypes"],
		}),
		getTranscriptType: builder.query({
			query: (id) => ({
				url: `/transcript-type/transcript-type/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		createTranscriptType: builder.mutation({
			query: (payload) => ({
				url: "/transcript-type/create-transcript-type",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
		}),
		deleteTranscriptType: builder.mutation({
			query: (id) => ({
				url: `/transcript-type/delete-transcript-type/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
		}),
		editTranscriptType: builder.mutation({
			query: (payload) => ({
				url: `/transcript-type/edit-transcript-type/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
		}),
	}),
});

export const {
	useGetTranscriptTypeQuery,
	useGetTranscriptTypesQuery,
	useCreateTranscriptTypeMutation,
	useDeleteTranscriptTypeMutation,
	useEditTranscriptTypeMutation,
} = transcriptTypeApiSlice;
