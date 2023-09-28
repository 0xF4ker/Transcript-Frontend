import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice: any = createApi({
	reducerPath: "userApiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.transcript.dtkapp.com.ng",
	}),
	tagTypes: [
		"User",
		"Users",
		"Colleges",
		"Departments",
		"Destinations",
		"TranscriptTypes",
		"TranscriptRequests",
		"DestinationRequests",
	],
	endpoints: (builder) => ({
		registerUser: builder.mutation({
			query: (payload) => ({
				url: "/signup",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json; charset=UTF-8",
				},
			}),
			// Pick out data and prevent nested properties in a hook or selector
			transformResponse: (response: any) => response.message,
			transformErrorResponse: (response: any) => response.data.error,
			invalidatesTags: ["Users"],
		}),
		getUsers: builder.query({
			query: () => ({
				url: "/users",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["Users"],
		}),
		getUser: builder.query({
			query: (id) => `/user/${id}`,
			transformResponse: (response: any) => response.data,
			providesTags: ["User"],
		}),
		loginUser: builder.mutation({
			query: (payload) => ({
				url: "/login",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.user,
			transformErrorResponse: (response: any) => response.data.error,
		}),
		getDepartments: builder.query({
			query: () => ({
				url: "/departments",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["Departments"],
		}),
		getDepartment: builder.query({
			query: (id) => ({
				url: `/department/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
		}),
		createDepartment: builder.mutation({
			query: (payload) => ({
				url: "/create-department",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Departments"],
			transformErrorResponse: (response: any) => response.data.error,
		}),
		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `/delete-department/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Departments"],
		}),
		editDepartment: builder.mutation({
			query: (id) => ({
				url: `/edit-department/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Departments"],
		}),
		getColleges: builder.query({
			query: () => ({
				url: "/colleges",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["Colleges"],
		}),
		getCollege: builder.query({
			query: (id) => ({
				url: `/college/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
		}),
		createCollege: builder.mutation({
			query: (payload) => ({
				url: "/create-college",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Colleges"],
			transformErrorResponse: (response: any) => response.data.error,
		}),
		deleteCollege: builder.mutation({
			query: (id) => ({
				url: `/delete-college/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Colleges"],
		}),
		editCollege: builder.mutation({
			query: (id) => ({
				url: `/edit-college/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Colleges"],
		}),
		getDestinations: builder.query({
			query: () => ({
				url: "/destinations",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["Destinations"],
		}),
		getDestination: builder.query({
			query: (id) => ({
				url: `/destination/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
		}),
		createDestination: builder.mutation({
			query: (payload) => ({
				url: "/create-destination",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
			transformErrorResponse: (response: any) => response.data.error,
		}),
		deleteDestination: builder.mutation({
			query: (id) => ({
				url: `/delete-destination/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
		}),
		editDestination: builder.mutation({
			query: (id) => ({
				url: `/edit-destination/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Destinations"],
		}),
		getTranscriptTypes: builder.query({
			query: () => ({
				url: "/transcript-types",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["TranscriptTypes"],
		}),
		getTranscriptType: builder.query({
			query: (id) => ({
				url: `/transcript-type/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
		}),
		createTranscriptType: builder.mutation({
			query: (payload) => ({
				url: "/create-transcript-type",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
			transformErrorResponse: (response: any) => response.data.error,
		}),
		deleteTranscriptType: builder.mutation({
			query: (id) => ({
				url: `/delete-transcript-type/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
		}),
		editTranscriptType: builder.mutation({
			query: (id) => ({
				url: `/edit-transcript-type/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
		}),
		getTranscriptRequests: builder.query({
			query: () => ({
				url: "/transcript-requests",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["TranscriptRequests"],
		}),
		getTranscriptRequest: builder.query({
			query: (id) => ({
				url: `/transcript-request/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["TranscriptRequests"],
		}),
		submitTranscriptRequest: builder.mutation({
			query: (payload) => ({
				url: "/submit-request",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			transformErrorResponse: (response: any) => response.data.error,
			invalidatesTags: ["TranscriptRequests"],
		}),
		getDestinationRequests: builder.query({
			query: () => ({
				url: "/destination-requests",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			providesTags: ["DestinationRequests"],
		}),
		getDestinationRequest: builder.query({
			query: (id) => ({
				url: `/destination-request/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
		}),
		submitDestinationRequest: builder.mutation({
			query: (payload) => ({
				url: "/submit-destination-request",
				method: "POST",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			transformErrorResponse: (response: any) => response.data.error,
			invalidatesTags: ["DestinationRequests"],
		}),
		acceptDestinationRequest: builder.mutation({
			query: () => ({
				url: "/accept-destination-request/:id",
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response.data,
			invalidatesTags: ["DestinationRequests"],
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: "/logout",
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			async onQueryStarted() {
				try {
					localStorage.removeItem("transcript-uid");
				} catch (error) {
					console.log(error);
				}
			},
		}),
	}),
});
export const {
	useRegisterUserMutation,
	useGetUsersQuery,
	useGetUserQuery,
	useGetCollegesQuery,
	useGetCollegeQuery,
	useCreateCollegeMutation,
	useDeleteCollegeMutation,
	useEditCollegeMutation,
	useGetDepartmentQuery,
	useGetDepartmentsQuery,
	useCreateDepartmentMutation,
	useDeleteDepartmentMutation,
	useEditDepartmentMutation,
	useGetDestinationQuery,
	useGetDestinationsQuery,
	useCreateDestinationMutation,
	useDeleteDestinationMutation,
	useEditDestinationMutation,
	useGetTranscripTypeQuery,
	useGetTranscriptTypesQuery,
	useCreateTranscriptTypeMutation,
	useDeleteTranscriptTypeMutation,
	useEditTranscriptTypeMutation,
	useGetTranscriptRequestQuery,
	useGetTranscriptRequestsQuery,
	useSubmitTranscriptRequestMutation,
	useGetDestinationRequestQuery,
	useGetDestinationRequestsQuery,
	useSubmitDestinationRequestMutation,
	useAcceptDestinationRequestMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApiSlice;
