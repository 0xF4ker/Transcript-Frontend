// collegeApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const collegeApiSlice = createApi({
	reducerPath: "collegeApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Colleges"],
	endpoints: (builder) => ({
		getColleges: builder.query({
			query: () => "/college/colleges",
			providesTags: ["Colleges"],
		}),
		getCollege: builder.query({
			query: (id) => `/college/college/${id}`,
		}),
		createCollege: builder.mutation({
			query: (payload) => ({
				url: "/college/create-college",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Colleges"],
		}),
		deleteCollege: builder.mutation({
			query: (id) => ({
				url: `/college/delete-college/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Colleges"],
		}),
		editCollege: builder.mutation({
			query: (payload) => ({
				url: `/college/edit-college/${payload.id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["Colleges"],
		}),
	}),
});

export const {
	useGetCollegesQuery,
	useGetCollegeQuery,
	useCreateCollegeMutation,
	useDeleteCollegeMutation,
	useEditCollegeMutation,
} = collegeApiSlice;
