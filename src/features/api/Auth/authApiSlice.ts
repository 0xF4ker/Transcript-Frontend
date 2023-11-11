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
		"Roles",
	],
	endpoints: (builder) => ({
		getRoot: builder.query({
			query: () => ({
				url: "/",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
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
			transformResponse: (response: any) => response?.message,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			transformResponse: (response: any) => response?.data,
			providesTags: ["Users"],
		}),
		getUser: builder.query({
			query: (id) => `/user/${id}`,
			transformResponse: (response: any) => response?.data,
			providesTags: ["User"],
		}),
		updateUser: builder.mutation({
			query: (payload) => ({
				url: `/update-user/${payload?.id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Users"],
		}),
		deleteUser: builder.mutation({
			query: (payload) => ({
				url: `/delete-user/${payload?.id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Users"],
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
			transformResponse: (response: any) => response?.user,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
		}),
		getDepartments: builder.query({
			query: () => ({
				url: "/departments",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
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
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			query: (payload) => ({
				url: `/edit-department/${payload?.id}`,
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
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
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
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			query: (payload) => ({
				url: `/edit-college/${payload?.id}`,
				method: "PATCH",
				body: payload,
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
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
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
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			query: (payload) => ({
				url: `/edit-destination/${payload?.id}`,
				method: "PATCH",
				body: payload,
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
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
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
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			query: (payload) => ({
				url: `/edit-transcript-type/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptTypes"],
		}),
		getRoles: builder.query({
			query: () => ({
				url: "/roles",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
			providesTags: ["Roles"],
		}),
		getRole: builder.query({
			query: (id) => ({
				url: `/role/${id}`,
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		createRole: builder.mutation({
			query: (payload) => ({
				url: "/create-role",
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
		deleteRole: builder.mutation({
			query: (id) => ({
				url: `/delete-role/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Roles"],
		}),
		editRole: builder.mutation({
			query: (payload) => ({
				url: `/edit-role/${payload?.id}`,
				method: "PATCH",
				body: payload,
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["Roles"],
		}),
		getPrivileges: builder.query({
			query: () => ({
				url: "/privileges",
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			transformResponse: (response: any) => response?.data,
		}),
		getTranscriptRequests: builder.query({
			query: () => ({
				url: "/transcript-requests",
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
				url: `/transcript-request/${id}`,
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
				url: `/update-transcript-request-status/${payload?.id}`,
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
				url: `/delete-transcript-request/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
			invalidatesTags: ["TranscriptRequests"],
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
			transformResponse: (response: any) => response?.data,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
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
			transformResponse: (response: any) => response?.data,
			transformErrorResponse: (response: any) =>
				response?.data?.error || "Oops! something went wrong",
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
			transformResponse: (response: any) => response?.data,
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
	useGetRootQuery,
	useRegisterUserMutation,
	useGetUsersQuery,
	useGetUserQuery,
	useUpdateUserMutation,
	useDeleteUserMutation,
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
	useGetRoleQuery,
	useGetRolesQuery,
	useCreateRoleMutation,
	useDeleteRoleMutation,
	useEditRoleMutation,
	useGetPrivilegesQuery,
	useGetTranscriptRequestQuery,
	useGetTranscriptRequestsQuery,
	useSubmitTranscriptRequestMutation,
	useDeleteTranscriptRequestMutation,
	useUpdateTranscriptRequestStatusMutation,
	useGetDestinationRequestQuery,
	useGetDestinationRequestsQuery,
	useSubmitDestinationRequestMutation,
	useAcceptDestinationRequestMutation,
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApiSlice;
