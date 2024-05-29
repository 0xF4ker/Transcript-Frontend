import { toast } from "react-toastify";
import image from "../../constants/image";
import "./styles/dark/user-profile.css";
import "./styles/light/user-profile.css";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
	useGetUserQuery,
	useUpdateUserMutation,
} from "../../services/userApiSlice";
import { useGetCollegesQuery } from "../../services/collegeApiSlice";
import { useGetDepartmentsQuery } from "../../services/departmentApiSlice";
const UserProfile = () => {
	const [isForceUpdate, setIsForceUpdate] = useState(false);
	const userId = localStorage.getItem("transcript-uid");
	const { data } = useGetUserQuery(userId);

	const {
		register: registerEdit,
		handleSubmit: handleSubmitEdit,
		reset: resetEdit,
		setValue: setValueEdit,
		control: controlEdit,
	} = useForm();
	const [
		updateUser,
		{
			isLoading: isLoadingEdit,
			isError: isErrorEdit,
			error: errorEdit,
			isSuccess: isSuccessEdit,
		},
	] = useUpdateUserMutation();

	const submitEditForm = (data: any) => {
		console.log(data);
		updateUser(data);
		resetEdit();
	};
	useEffect(() => {
		if (isSuccessEdit) {
			toast.success("User updated succesfully");
		}
		if (isErrorEdit) {
			console.log(errorEdit);
			if ((errorEdit as any)?.data) {
				toast.error((errorEdit as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("User update failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingEdit]);
	const { data: dataColleges = [] } = useGetCollegesQuery("");
	const { data: dataDepartments = [] } = useGetDepartmentsQuery("");
	const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
	return (
		<>
			<div className="header-container">
				<header className="header navbar navbar-expand-sm">
					<div className="d-flex">
						<a className="sidebarCollapse" data-placement="bottom">
							<div className="bt-menu-trigger">
								<span></span>
							</div>
						</a>
						<div className="page-header">
							<div className="page-title">
								<h3>User Profile</h3>
							</div>
						</div>
					</div>

					<div className="header-actions">
						<div className="nav-item dropdown language-dropdown more-dropdown">
							<div className="dropdown custom-dropdown-icon">
								<a
									className="dropdown-toggle btn"
									href="#"
									role="button"
									id="customDropdown"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<img src={image.flagca2} className="flag-width" alt="flag" />
									<span>English</span>{" "}
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
										className="feather feather-chevron-down"
									>
										<polyline points="6 9 12 15 18 9"></polyline>
									</svg>
								</a>

								<div
									className="dropdown-menu dropdown-menu-right"
									aria-labelledby="customDropdown"
								>
									<a
										className="dropdown-item"
										data-img-value="flag-de3"
										data-value="German"
										href="javascript:void(0);"
									>
										<img src={image.flagde3} className="flag-width" alt="flag" /> German
									</a>
									<a
										className="dropdown-item"
										data-img-value="flag-sp"
										data-value="Spanish"
										href="javascript:void(0);"
									>
										<img src={image.flagsp} className="flag-width" alt="flag" /> Spanish
									</a>
									<a
										className="dropdown-item"
										data-img-value="flag-fr3"
										data-value="French"
										href="javascript:void(0);"
									>
										<img src={image.flagfr} className="flag-width" alt="flag" /> French
									</a>
									<a
										className="dropdown-item"
										data-img-value="flag-ca2"
										data-value="English"
										href="javascript:void(0);"
									>
										<img src={image.flagca2} className="flag-width" alt="flag" /> English
									</a>
								</div>
							</div>
						</div>

						<div className="toggle-notification-bar">
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
								className="feather feather-bell"
							>
								<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
								<path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
							</svg>
						</div>
					</div>
				</header>
			</div>
			<div className="admin-data-content layout-top-spacing">
				<div className="mx-auto align-self-center col-xl-5 col-lg-12 col-md-12 col-sm-12 layout-top-spacing">
					<div className="user-profile layout-spacing">
						<div className="widget-content widget-content-area">
							<div className="d-flex justify-content-between">
								<h3 className="">Profile</h3>
								<a
									onClick={() => {
										setValueEdit("name", data?.name);
										setValueEdit("email", data?.email);
										setValueEdit("password", data?.password);
										setValueEdit("schoolId", data?.schoolId);
										setValueEdit("college", data?.college);
										setValueEdit("department", data?.department);
										setIsForceUpdate(!isForceUpdate);
									}}
									data-bs-toggle="modal"
									data-bs-target="#editUser"
									className="mt-2 edit-profile"
								>
									{" "}
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
										className="feather feather-edit-3"
									>
										<path d="M12 20h9"></path>
										<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
									</svg>
								</a>
								<div
									className="modal fade"
									id="editUser"
									tabIndex={-1}
									role="dialog"
									aria-labelledby="editUserTitle"
									aria-hidden="true"
								>
									<div
										className="modal-dialog modal-dialog-centered modal-xl"
										role="document"
									>
										<div className="modal-content">
											<div className="modal-header">
												<h5 className="modal-title" id="editDepartmentTitle">
													Edit User
												</h5>
												<button
													type="button"
													className="btn-close"
													data-bs-dismiss="modal"
													aria-label="Close"
												>
													<svg
														aria-hidden="true"
														xmlns="http://www.w3.org/2000/svg"
														width="24"
														height="24"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
														stroke-linecap="round"
														stroke-linejoin="round"
														className="feather feather-x"
													>
														<line x1="18" y1="6" x2="6" y2="18"></line>
														<line x1="6" y1="6" x2="18" y2="18"></line>
													</svg>
												</button>
											</div>
											<div className="modal-body">
												<form
													className="row layout-top-spacing"
													onSubmit={handleSubmitEdit(submitEditForm)}
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
																			{...registerEdit("email", { required: true })}
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
																			{...registerEdit("password", { required: true })}
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
																			{...registerEdit("name", { required: true })}
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
																			{...registerEdit("schoolId", { required: true })}
																		/>
																	</div>
																	<div className="col-md-6">
																		<label htmlFor="inputCollege" className="form-label">
																			Select College:
																		</label>
																		<Controller
																			name="college"
																			control={controlEdit}
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
																			control={controlEdit}
																			defaultValue=""
																			render={({ field }) => (
																				<select
																					id="inputDepartment"
																					className="form-select"
																					{...field}
																				>
																					<option value="">Select a department</option>
																					{filteredDepartments?.map((department: any) => (
																						<option key={department?.id} value={department?.name}>
																							{department?.name}
																						</option>
																					))}
																				</select>
																			)}
																		/>
																	</div>
																	<div className="col-12">
																		<button type="submit" className="btn btn-primary">
																			{isLoadingEdit ? (
																				<>
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
																						className="feather feather-loader spin me-2"
																					>
																						<line x1="12" y1="2" x2="12" y2="6"></line>
																						<line x1="12" y1="18" x2="12" y2="22"></line>
																						<line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
																						<line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
																						<line x1="2" y1="12" x2="6" y2="12"></line>
																						<line x1="18" y1="12" x2="22" y2="12"></line>
																						<line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
																						<line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
																					</svg>{" "}
																				</>
																			) : (
																				"SUBMIT"
																			)}
																		</button>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="text-center user-info">
								<img src={image.pfp0} alt="avatar" />
								<p className="">{data?.name}</p>
							</div>
							<div className="user-info-list">
								<div className="">
									<ul className="contacts-block list-unstyled">
										<li className="contacts-block__item">
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
												className="feather feather-coffee me-3"
											>
												<path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
												<path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
												<line x1="6" y1="1" x2="6" y2="4"></line>
												<line x1="10" y1="1" x2="10" y2="4"></line>
												<line x1="14" y1="1" x2="14" y2="4"></line>
											</svg>{" "}
											{data?.roles[0] === "User" ? "Student" : "Staff"}
										</li>
										<li className="contacts-block__item">
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
												className="feather feather-book me-3"
											>
												<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
												<path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
											</svg>
											{data?.schoolId}
										</li>
										<li className="contacts-block__item">
											<a href={`mailto:${data?.email}`}>
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
													className="feather feather-mail me-3"
												>
													<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
													<polyline points="22,6 12,13 2,6"></polyline>
												</svg>
												link@gmail.com
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default UserProfile;
