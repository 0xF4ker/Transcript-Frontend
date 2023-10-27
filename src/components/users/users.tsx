import { useEffect, useRef, useState } from "react";
import {
	useGetCollegesQuery,
	useGetDepartmentsQuery,
	useGetUserQuery,
	useGetUsersQuery,
	useRegisterUserMutation,
} from "../../features/api/Auth/authApiSlice";
import "./styles/datables.css";

import "./styles/dark/custom_dt_custom.css";
import "./styles/dark/dt-global_style.css";
import "./styles/dark/users.css";

import "./styles/light/custom_dt_custom.css";
import "./styles/light/dt-global_style.css";
import "./styles/light/users.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
const selector = (state: any) => state.user;
const Users = () => {
	const { userId } = useSelector(selector);
	const navigate = useNavigate();
	const {
		data: userData,
		isSuccess: isSuccessUser,
		isLoading: isLoadingUser,
	} = useGetUserQuery(userId);
	useEffect(() => {
		if (isSuccessUser) if (!userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { register, handleSubmit, control, resetForm } = useForm();
	const [registerUser, { isLoading, isError, error, isSuccess }] =
		useRegisterUserMutation();
	const { data: dataColleges = [] } = useGetCollegesQuery("");
	const { data: dataDepartments = [] } = useGetDepartmentsQuery("");
	const userTypes = ["Staff", "Student"];
	const roles = ["User", "Admin"];
	const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
	const submitForm = (data: any) => {
		console.log(data);
		registerUser(data);
		resetForm();
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("User succesfully registered");
			setHide(false);
		}
		if (isError) {
			console.log(error);
			if (error as any) {
				toast.error(error as any, { position: "top-right" });
			} else {
				toast.error("Registration failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	const { data, isLoading: isLoadingUsers } = useGetUsersQuery("");
	const dataTableRef = useRef(null);
	const [hide, setHide] = useState(false);
	console.log(data);
	useEffect(() => {
		if (!dataTableRef.current) {
			console.log("agai");
			// Create a script element
			const script = document.createElement("script");
			script.src = "/scripts/datatables.js"; // Replace with the path to your script
			script.async = true;

			// Append the script to the document
			document.body.appendChild(script);
		}
	}, []);
	useEffect(() => {
		// Initialize DataTable when the data is available and the component mounts
		if (data) {
			// Check if the DataTable container exists
			const dataTableContainer = document.getElementById("style-1");

			if (dataTableContainer) {
				// Initialize the DataTable if it hasn't been initialized yet
				if (!dataTableRef.current) {
					const c1 = ($("#style-1") as any)?.DataTable({
						headerCallback: function (e: any) {
							e.getElementsByTagName("th")[0].innerHTML = `
                        <div class="form-check form-check-primary d-block">
                            <input class="form-check-input chk-parent" type="checkbox" id="form-check-default">
                        </div>`;
						},
						columnDefs: [
							{
								targets: 0,
								width: "30px",
								className: "",
								orderable: !1,
								render: function () {
									return `
                            <div class="form-check form-check-primary d-block">
                                <input class="form-check-input child-chk" type="checkbox" id="form-check-default">
                            </div>`;
								},
							},
						],
						dom:
							"<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>>" +
							"<'table-responsive'tr>" +
							"<'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
						oLanguage: {
							oPaginate: {
								sPrevious:
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
								sNext:
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
							},
							sInfo: "Showing page _PAGE_ of _PAGES_",
							sSearch:
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
							sSearchPlaceholder: "Search...",
							sLengthMenu: "Results :  _MENU_",
						},
						lengthMenu: [5, 10, 20, 50],
						pageLength: 10,
					});

					// Store the DataTable instance in the ref
					dataTableRef.current = c1;
				}
			}
		}
	}, [data]);

	return (
		<div className="middle-content container-xxl p-0">
			<div className="page-meta">
				<nav className="breadcrumb-style-one" aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="#">App</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Users
						</li>
					</ol>
				</nav>
			</div>
			<div className="row layout-top-spacing d-flex">
				<div className="col-lg-12">
					<button
						onClick={() => setHide((prev) => !prev)}
						className="btn btn-primary mb-2 me-4"
					>
						Create User/Staff
					</button>
					{hide === true ? (
						<form
							className="row layout-top-spacing"
							onSubmit={handleSubmit(submitForm)}
						>
							<div id="flLoginForm" className="col-lg-12 layout-spacing">
								<div className="statbox widget box box-shadow ">
									<div className="widget-content widget-content-area p-3">
										<div className="row g-3">
											<div className="col-md-6">
												<label htmlFor="inputEmail4" className="form-label">
													Email
												</label>
												<input
													type="email"
													className="form-control"
													id="inputEmail4"
													{...register("email", { required: true })}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputPassword4" className="form-label">
													Password
												</label>
												<input
													type="password"
													className="form-control"
													id="inputPassword4"
													{...register("password", { required: true })}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputName4" className="form-label">
													Full Name
												</label>
												<input
													type="full-name"
													className="form-control"
													id="inputName4"
													{...register("name", { required: true })}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputSchoolId4" className="form-label">
													School ID
												</label>
												<input
													type="password"
													className="form-control"
													id="inputSchoolId4"
													{...register("schoolId", { required: true })}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputCollege" className="form-label">
													Select College:
												</label>
												<Controller
													name="college"
													control={control}
													defaultValue="" // Set the default value here if needed
													render={({ field }) => (
														<select
															id="inputCollege"
															className="form-select"
															{...field}
															onChange={(e) => {
																const collegeName = e.target.value;
																console.log(collegeName);
																field.onChange(e);
																// Filter faculties based on the selected collegeId
																const filtered = dataDepartments?.filter(
																	(department: any) =>
																		department?.collegeName === collegeName
																);
																setFilteredDepartments(filtered);
															}}
														>
															<option value="">Select a college</option>
															{dataColleges?.map((college: any) => (
																<option key={college?.id} value={college?.name}>
																	{college?.name}
																</option>
															))}
														</select>
													)}
												/>
											</div>

											<div className="col-md-6">
												<label htmlFor="inputDepartment" className="form-label">
													Select Department:
												</label>
												<Controller
													name="department"
													control={control}
													defaultValue=""
													render={({ field }) => (
														<select
															id="inputDepartment"
															className="form-select"
															{...field}
														>
															<option value="">Select a department</option>
															{filteredDepartments?.map((department: any) => (
																<option
																	key={department?.id}
																	value={department?.name}
																>
																	{department?.name}
																</option>
															))}
														</select>
													)}
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputUserType" className="form-label">
													Select User Type:
												</label>
												<Controller
													name="userType"
													control={control}
													defaultValue="" // Set the default value here if needed
													render={({ field }) => (
														<select
															id="inputUserType"
															className="form-select"
															{...field}
															onChange={(e) => {
																const userType = e.target.value;
																console.log(userType);
																field.onChange(e);
															}}
														>
															<option value="">Select a user type</option>
															{userTypes?.map((userType: any, id: number) => (
																<option key={id} value={userType}>
																	{userType}
																</option>
															))}
														</select>
													)}
												/>
											</div>

											<div className="col-md-6">
												<label htmlFor="inputRole" className="form-label">
													Select Role:
												</label>
												<Controller
													name="role"
													control={control}
													defaultValue=""
													render={({ field }) => (
														<select
															id="inputRole"
															className="form-select"
															{...field}
														>
															<option value="">Select a role</option>
															{roles?.map((role: any, id: number) => (
																<option key={id} value={role}>
																	{role}
																</option>
															))}
														</select>
													)}
												/>
											</div>
											<div className="col-12">
												<button type="submit" className="btn btn-primary">
												{
													isLoading ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("SUBMIT")
												}
												</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					) : (
						""
					)}
					<div className="layout-top-spacing statbox widget box box-shadow">
						<div className="widget-content widget-content-area">
							<table
								id="style-1"
								className="table style-1 dt-table-hover non-hover"
							>
								<thead>
									<tr>
										<th className="checkbox-column dt-no-sorting">
											{" "}
											Record no.{" "}
										</th>
										<th>Name</th>
										<th>User Type</th>
										<th>Email</th>
										<th>School ID</th>
										<th className="">Role</th>
										<th className="text-center dt-no-sorting">Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((user: any, id: number) => (
										<tr key={id}>
											<td className="checkbox-column"> {id} </td>
											<td className="user-name">{user?.name}</td>
											<td className="">{user?.userType}</td>
											<td>{user?.email}</td>
											<td>{user?.schoolId}</td>
											<td>
												<div className="d-flex">
													<div className=" align-self-center d-m-success  mr-1 data-marker"></div>
													<span className="label label-success">
														{user?.isAdmin ? "Admin" : "User"}
													</span>
												</div>
											</td>
											<td className="text-center">
											<ul class="table-controls">
                                                        <li><a href="javascript:void(0);" class="bs-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" data-original-title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-2 p-1 br-8 mb-1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a></li>
                                                        <li><a href="javascript:void(0);" class="bs-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" data-original-title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash p-1 br-8 mb-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a></li>
                                                    </ul>
											</td>
										</tr>
									))}
									{isLoadingUsers && (
										<tr>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Users;
