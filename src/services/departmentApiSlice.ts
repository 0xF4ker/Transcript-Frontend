// departmentApiSlice.ts
import { createApi } from "@reduxjs/toolkit/query/react";
import baseQueryWithReauth from "./baseQueryWithReauth";

export const departmentApiSlice = createApi({
	reducerPath: "departmentApi",
	baseQuery: baseQueryWithReauth,
	tagTypes: ["Departments"],
	endpoints: (builder) => ({
		getDepartments: builder.query({
			query: () => "/department/departments",
			providesTags: ["Departments"],
			transformResponse: (response: any) => response?.data,
		}),
		getDepartment: builder.query({
			query: (id) => `/department/department/${id}`,
			transformResponse: (response: any) => response?.data,
		}),
		createDepartment: builder.mutation({
			query: (payload) => ({
				url: "/department/create-department",
				method: "POST",
				body: payload,
			}),
			invalidatesTags: ["Departments"],
		}),
		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `/department/delete-department/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Departments"],
		}),
		editDepartment: builder.mutation({
			query: (payload) => ({
				url: `/department/edit-department/${payload.id}`,
				method: "PATCH",
				body: payload,
			}),
			invalidatesTags: ["Departments"],
		}),
	}),
});

export const {
	useGetDepartmentsQuery,
	useGetDepartmentQuery,
	useCreateDepartmentMutation,
	useDeleteDepartmentMutation,
	useEditDepartmentMutation,
} = departmentApiSlice;
