import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useGetUserQuery } from "../../services/userApiSlice";
import {
	useCreateRoleMutation,
	useDeleteRoleMutation,
	useEditRoleMutation,
	useGetRolesQuery,
} from "../../services/roleApiSlice";
import { useGetPrivilegesQuery } from "../../services/privilegeApiSlice";
import image from "../../constants/image";
const selector = (state: any) => state.user;
const Roles = () => {
	const [isForceUpdate, setIsForceUpdate] = useState(false);
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
	const { register, handleSubmit, reset, control } = useForm();
	const {
		register: registerEdit,
		handleSubmit: handleSubmitEdit,
		reset: resetEdit,
		setValue: setValueEdit,
		control: controlEdit,
	} = useForm();
	const {
		register: registerDelete,
		setValue: setValueDelete,
		getValues: getValueDelete,
	} = useForm();
	const [
		editRole,
		{
			isLoading: isLoadingEdit,
			isError: isErrorEdit,
			error: errorEdit,
			isSuccess: isSuccessEdit,
		},
	] = useEditRoleMutation();

	const [
		deleteRole,
		{
			isLoading: isLoadingDelete,
			isError: isErrorDelete,
			error: errorDelete,
			isSuccess: isSuccessDelete,
		},
	] = useDeleteRoleMutation();

	useEffect(() => {
		if (isSuccessDelete) {
			toast.success("Role deleted succesfully");
		}
		if (isErrorDelete) {
			console.log(errorDelete);
			if ((errorDelete as any)?.data) {
				toast.error((errorEdit as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Role delete failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingDelete]);

	const submitEditForm = (data: any) => {
		console.log(data);
		editRole(data);
		resetEdit();
	};
	useEffect(() => {
		if (isSuccessEdit) {
			toast.success("Role updated succesfully");
		}
		if (isErrorEdit) {
			console.log(errorEdit);
			if ((errorEdit as any)?.data) {
				toast.error((errorEdit as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Role update failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingEdit]);

	const [privileges, setPrivileges] = useState<string[]>([""]);
	const addPrivilege = () => {
		console.log(privileges);
		setPrivileges([...privileges, ""]);
	};

	const removePrivilege = (index: number) => {
		const updatedPrivileges = [...privileges];
		updatedPrivileges.splice(index, 1);
		setPrivileges(updatedPrivileges);
	};

	const [createRole, { isLoading, isError, error, isSuccess }] =
		useCreateRoleMutation();
	const [hide, setHide] = useState(false);
	const submitForm = (data: any) => {
		console.log(data);
		createRole(data);
		reset();
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Role succesfully created");
			setHide(false);
		}
		if (isError) {
			console.log(error);
			if (error as any) {
				toast.error(error as any, { position: "top-right" });
			} else {
				toast.error("Role creation failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	const { data, isLoading: isLoadingRoles } = useGetRolesQuery("");
	const { data: privilegeData = [] } = useGetPrivilegesQuery("");
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

			// Initialize DataTable when the data is available and the component mounts
			const initializeDataTable = () => {
				if ((window as any)?.jQuery && (window as any)?.jQuery?.fn?.DataTable) {
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
				} else {
					// DataTables is not available yet, wait and try again
					setTimeout(initializeDataTable, 100);
				}
			};
			// Add an event listener to run the initialization function when the script loads
			script.onload = initializeDataTable;
		}
	}, [data]);

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
								<h3>Roles</h3>
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
			<div className="row layout-top-spacing d-flex">
				<div className="col-lg-12">
					<button
						onClick={() => setHide((prev) => !prev)}
						className="btn btn-primary mb-2 me-4"
					>
						Create Role
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
												<label htmlFor="inputName" className="form-label">
													Name
												</label>
												<input
													type="text"
													className="form-control"
													id="inputName"
													{...register("name", { required: true })}
												/>
											</div>
											<>
												<label>Privileges</label>
												{privileges?.map((_: any, index: number) => (
													<>
														<Controller
															name={`privileges[${index}]`}
															control={control}
															defaultValue=""
															rules={{ required: "Privilege is required" }}
															render={({ field }) => (
																<>
																	<div className="col-md-6" key={index}>
																		<select
																			className="form-select"
																			id="inlineFormSelectPref"
																			{...field}
																		>
																			<option value="">Select a Privilege</option>
																			{privilegeData?.map((privilege: any) => (
																				<option key={privilege?.id} value={privilege?.name}>
																					{privilege?.name}
																				</option>
																			))}
																		</select>
																	</div>
																	<div className="col-md-6">
																		<button
																			type="button"
																			className="btn btn-danger"
																			onClick={() => removePrivilege(index)}
																		>
																			Remove
																		</button>
																	</div>
																</>
															)}
														/>
													</>
												))}
												<div className="col-12">
													<button
														type="button"
														className="btn btn-primary"
														onClick={addPrivilege}
													>
														Add New Privilege
													</button>
												</div>
											</>
											<div className="col-12">
												<button type="submit" className="btn btn-primary">
													{isLoading ? (
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
					) : (
						""
					)}
					<div className="statbox widget box box-shadow layout-top-spacing">
						<div className="widget-content widget-content-area">
							<table id="style-1" className="table style-1 dt-table-hover non-hover">
								<thead>
									<tr>
										<th className="checkbox-column dt-no-sorting"> Record no. </th>
										<th>Name</th>
										<th>Privileges</th>
										<th className="text-center dt-no-sorting">Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((role: any, id: number) => (
										<tr key={id}>
											<td className="checkbox-column"> {id} </td>
											<td className="user-name">{role?.name}</td>
											<td>{role?.privileges?.length}</td>
											<td className="text-center">
												<ul className="table-controls">
													<li>
														<a
															onClick={() => {
																setValueEdit("name", role?.name);
																setPrivileges(role?.privileges);
																role.privileges?.map((privilege: any, index: number) => {
																	setValueEdit(`privileges[${index}]`, privilege);
																	console.log(privilege);
																});
																setIsForceUpdate(!isForceUpdate);
															}}
															data-bs-toggle="modal"
															data-bs-target="#editRole"
															className="bs-tooltip"
															data-bs-placement="top"
															title="Edit"
															data-original-title="Edit"
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
																className="feather feather-edit-2 p-1 br-8 mb-1"
															>
																<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
															</svg>
														</a>
													</li>
													<li>
														<a
															onClick={() => {
																setValueDelete("id", role?.id);
																setIsForceUpdate(!isForceUpdate);
																const { id } = getValueDelete();
																console.log(id);
															}}
															data-bs-toggle="modal"
															className="bs-tooltip"
															data-bs-target="#deleteRole"
															data-bs-placement="top"
															title="Delete"
															data-original-title="Delete"
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
																className="feather feather-trash p-1 br-8 mb-1"
															>
																<polyline points="3 6 5 6 21 6"></polyline>
																<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
															</svg>
														</a>
													</li>
												</ul>
												<div
													className="modal fade"
													id="editRole"
													tabIndex={-1}
													role="dialog"
													aria-labelledby="editRoleTitle"
													aria-hidden="true"
												>
													<div
														className="modal-dialog modal-dialog-centered modal-xl"
														role="document"
													>
														<div className="modal-content">
															<div className="modal-header">
																<h5 className="modal-title" id="editDepartmentTitle">
																	Edit Role
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
																						<label htmlFor="inputName" className="form-label">
																							Name
																						</label>
																						<input
																							type="text"
																							className="form-control"
																							id="inputName"
																							{...registerEdit("name", { required: true })}
																						/>
																					</div>
																					<>
																						<label>Privileges</label>
																						{privileges?.map((_: any, index: number) => (
																							<>
																								<Controller
																									name={`privileges[${index}]`}
																									control={controlEdit}
																									defaultValue=""
																									rules={{ required: "Privilege is required" }}
																									render={({ field }) => (
																										<>
																											<div className="col-md-6" key={index}>
																												<select
																													className="form-select"
																													id="inlineFormSelectPref"
																													{...field}
																												>
																													<option value="">Select a Privilege</option>
																													{privilegeData?.map((privilege: any) => (
																														<option
																															key={privilege?.id}
																															value={privilege?.name}
																														>
																															{privilege?.name}
																														</option>
																													))}
																												</select>
																											</div>
																											<div className="col-md-6">
																												<button
																													type="button"
																													className="btn btn-danger"
																													onClick={() => removePrivilege(index)}
																												>
																													Remove
																												</button>
																											</div>
																										</>
																									)}
																								/>
																							</>
																						))}
																						<div className="col-12">
																							<button
																								type="button"
																								className="btn btn-primary"
																								onClick={addPrivilege}
																							>
																								Add New Privilege
																							</button>
																						</div>
																					</>
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
																										<line
																											x1="16.24"
																											y1="16.24"
																											x2="19.07"
																											y2="19.07"
																										></line>
																										<line x1="2" y1="12" x2="6" y2="12"></line>
																										<line x1="18" y1="12" x2="22" y2="12"></line>
																										<line
																											x1="4.93"
																											y1="19.07"
																											x2="7.76"
																											y2="16.24"
																										></line>
																										<line
																											x1="16.24"
																											y1="7.76"
																											x2="19.07"
																											y2="4.93"
																										></line>
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
												<div
													className="modal fade"
													id="deleteRole"
													tabIndex={-1}
													role="dialog"
													aria-labelledby="exampleRoleTitle"
													aria-hidden="true"
												>
													<div
														className="modal-dialog modal-dialog-centered"
														role="document"
													>
														<div className="modal-content">
															<div className="modal-header">
																<h5 className="modal-title" id="exampleTranscriptRequestTitle">
																	Delete Role
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
																<input hidden {...registerDelete("id")} />
																<p className="modal-text">Do you confirm to delete?</p>
															</div>
															<div className="modal-footer">
																<button className="btn btn-light-dark" data-bs-dismiss="modal">
																	Discard
																</button>
																<button
																	type="button"
																	onClick={() => {
																		const { id } = getValueDelete();
																		console.log(id);
																		deleteRole(id);
																	}}
																	className="btn btn-danger"
																>
																	{isLoadingDelete ? (
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
																		"Delete"
																	)}
																</button>
															</div>
														</div>
													</div>
												</div>
											</td>
										</tr>
									))}
									{isLoadingRoles && (
										<tr>
											<td>
												<Skeleton variant="rectangular" width={"100%"} height={20} />
											</td>
											<td>
												<Skeleton variant="rectangular" width={"100%"} height={20} />
											</td>
											<td>
												<Skeleton variant="rectangular" width={"100%"} height={20} />
											</td>
											<td>
												<Skeleton variant="rectangular" width={"100%"} height={20} />
											</td>
											<td>
												<Skeleton variant="rectangular" width={"100%"} height={20} />
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
		</>
	);
};
export default Roles;
