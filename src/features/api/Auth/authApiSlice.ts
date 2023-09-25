import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice: any = createApi({
	reducerPath: "userApiSlice",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.transcript.dtkapp.com.ng",
	}),
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
		}),
		getUser: builder.query({
			query: (id) => `/user/${id}`,
			transformResponse: (response: any) => response.data,
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
		}),
		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `/delete-department/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		editDepartment: builder.mutation({
			query: (id) => ({
				url: `/edit-department/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
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
		}),
		deleteCollege: builder.mutation({
			query: (id) => ({
				url: `/delete-college/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		editCollege: builder.mutation({
			query: (id) => ({
				url: `/edit-college/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
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
		}),
		deleteDestination: builder.mutation({
			query: (id) => ({
				url: `/delete-destination/${id}`,
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		editDestination: builder.mutation({
			query: (id) => ({
				url: `/edit-destination/${id}`,
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: "/logout",
			}),
			async onQueryStarted({ queryFulfilled }) {
				try {
					await queryFulfilled;
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
	useLoginUserMutation,
	useLogoutUserMutation,
} = userApiSlice;
