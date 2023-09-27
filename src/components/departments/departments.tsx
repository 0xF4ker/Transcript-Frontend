import { useEffect, useRef, useState } from "react";
import {
	useCreateDepartmentMutation,
	useGetCollegesQuery,
	useGetDepartmentsQuery,
	useGetUserQuery,
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
const Departments = () => {
	const { userId } = useSelector(selector);
	const navigate = useNavigate();
	const {
		data: userData,
		isLoading: isLoadingUser,
		isSuccess: isSuccessUser,
	} = useGetUserQuery(userId);
	useEffect(() => {
		if (isSuccessUser) if (!userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { register, handleSubmit, control } = useForm();
	const [createDepartment, { isLoading, isError, error, isSuccess }] =
		useCreateDepartmentMutation();
	const [hide, setHide] = useState(false);
	const submitForm = (data: any) => {
		console.log(data);
		createDepartment(data);
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Department created succesfully");
			setHide(false);
		}
		if (isError) {
			console.log(error);
			if ((error as any)?.data) {
				toast.error((error as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Department creation failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	const { data, isLoading: isLoadingDepartments } = useGetDepartmentsQuery("");
	const { data: collegesData } = useGetCollegesQuery("");
	const dataTableRef = useRef(null);
	console.log(data);
	useEffect(() => {
		if (!dataTableRef.current) {
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
							Departments
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
						Create College
					</button>
					{hide === true ? (
						<div className="statbox widget box box-shadow layout-top-spacing">
							<div className="widget-content widget-content-area">
								<form
									className="row row-cols-lg-auto g-3 align-items-center"
									onSubmit={handleSubmit(submitForm)}
								>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormInputGroupDepartment"
										>
											Department
										</label>
										<div className="input-group">
											<div className="input-group-text">@</div>
											<input
												type="text"
												className="form-control"
												id="inlineFormInputGroupDepartment"
												placeholder="Department"
												{...(register("name"), { required: true })}
											/>
										</div>
									</div>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormSelectPref"
										>
											College
										</label>
										<Controller
											name="college"
											control={control}
											defaultValue=""
											render={({ field }) => (
												<select
													className="form-select"
													id="inlineFormSelectPref"
													{...field}
												>
													<option value="">Select a college</option>
													{collegesData?.map((college: any) => (
														<option key={college?.id} value={college?.name}>
															{college?.name}
														</option>
													))}
												</select>
											)}
										/>
									</div>

									<div className="col-12">
										<button type="submit" className="btn btn-primary">
											Submit
										</button>
									</div>
								</form>
							</div>
						</div>
					) : (
						""
					)}
					<div className="statbox widget box box-shadow layout-top-spacing">
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
										<th>Department Name</th>
										<th>Department ID</th>
										<th>College Name</th>
										<th>College ID</th>
										<th className="text-center dt-no-sorting">Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((department: any, id: number) => (
										<tr key={id}>
											<td className="checkbox-column"> {id} </td>
											<td className="user-name">{department?.name}</td>
											<td>{department?.id}</td>
											<td>{department?.collegeName}</td>
											<td>{department?.collegeId}</td>
											<td className="text-center">
												<div className="dropdown">
													<a
														className="dropdown-toggle"
														href="#"
														role="button"
														id="dropdownMenuLink2"
														data-bs-toggle="dropdown"
														aria-haspopup="true"
														aria-expanded="true"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width="24"
															height="24"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															stroke-width="2"
															stroke-linecap="round"
															stroke-linejoin="round"
															className="feather feather-more-horizontal"
														>
															<circle cx="12" cy="12" r="1"></circle>
															<circle cx="19" cy="12" r="1"></circle>
															<circle cx="5" cy="12" r="1"></circle>
														</svg>
													</a>
													<div
														className="dropdown-menu"
														aria-labelledby="dropdownMenuLink2"
													>
														<a
															className="dropdown-item"
															href="javascript:void(0);"
														>
															View
														</a>
														<a
															className="dropdown-item"
															href="javascript:void(0);"
														>
															Edit
														</a>
														<a
															className="dropdown-item"
															href="javascript:void(0);"
														>
															Delete
														</a>
													</div>
												</div>
											</td>
										</tr>
									))}
									{isLoadingDepartments && (
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
export default Departments;
