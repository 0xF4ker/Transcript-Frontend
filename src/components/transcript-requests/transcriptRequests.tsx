import { useEffect, useRef, useState } from "react";
import "./styles/datables.css";

import "./styles/dark/custom_dt_custom.css";
import "./styles/dark/dt-global_style.css";
import "./styles/dark/users.css";

import "./styles/light/custom_dt_custom.css";
import "./styles/light/dt-global_style.css";
import "./styles/light/users.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	useDeleteTranscriptRequestMutation,
	useGetTranscriptRequestsQuery,
	useUpdateTranscriptRequestStatusMutation,
} from "../../services/transcriptRequestApiSlice";
import { useGetUserQuery } from "../../services/userApiSlice";
import image from "../../constants/image";
const selector = (state: any) => state.user;
const TranscriptRequests = () => {
	const [isForceUpdate, setIsForceUpdate] = useState(false);
	const { userId } = useSelector(selector);
	const navigate = useNavigate();

	const statuses = ["pending", "paid", "shipped"];
	const {
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
		updateTranscriptRequestStatus,
		{
			isLoading: isLoadingEdit,
			isError: isErrorEdit,
			error: errorEdit,
			isSuccess: isSuccessEdit,
		},
	] = useUpdateTranscriptRequestStatusMutation();

	const [
		deleteTranscriptRequest,
		{
			isLoading: isLoadingDelete,
			isError: isErrorDelete,
			error: errorDelete,
			isSuccess: isSuccessDelete,
		},
	] = useDeleteTranscriptRequestMutation();

	useEffect(() => {
		if (isSuccessDelete) {
			toast.success("Transcript request deleted succesfully");
		}
		if (isErrorDelete) {
			console.log(errorDelete);
			if ((errorDelete as any)?.data) {
				toast.error((errorEdit as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Transcript request delete failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingDelete]);

	const submitEditForm = (data: any) => {
		console.log(data);
		updateTranscriptRequestStatus(data);
		resetEdit();
	};
	useEffect(() => {
		if (isSuccessEdit) {
			toast.success("Transcript request updated succesfully");
		}
		if (isErrorEdit) {
			console.log(errorEdit);
			if ((errorEdit as any)?.data) {
				toast.error((errorEdit as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Transcript request update failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoadingEdit]);
	const {
		data: userData,
		isSuccess: isSuccessUser,
		isLoading: isLoadingUser,
	} = useGetUserQuery(userId);
	useEffect(() => {
		if (isSuccessUser) if (!userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { data, isLoading: isLoadingRequests } =
		useGetTranscriptRequestsQuery("");
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

								function format(d: string[]) {
									const transcript = (data as any[]).find((row) => row.id === d[0]);
									console.log(transcript, d[0]);
									const details = `
									<div class="row layout-top-spacing d-flex">
					<div class="col-lg-12">
						<div
							class="row layout-top-spacing"
						>
									<div id="flLoginForm" class="col-lg-12 layout-spacing">
									<div class="statbox widget box box-shadow ">
										<div class="widget-content widget-content-area p-3">
											<div class="row g-3">
												<div class="col-md-6">
													<label htmlFor="matricNo" class="form-label">
														Matric No
													</label>
													<input
														type="text"
														class="form-control"
														disabled
														value=${transcript?.matricNo}
														id="inputMatricNo"
													/>
												</div>
												<div class="col-md-6">
													<label htmlFor="fee" class="form-label">
														Fee
													</label>
													<input
														type="text"
														class="form-control"
														disabled
														value=&#8358;${transcript?.total}
														id="fee"
													/>
												</div>
												<div class="col-md-6">
													<label htmlFor="inputMethod" class="form-label">
														Transcript Type
													</label>
													<input
														type="text"
														class="form-control"
														disabled
														value=${transcript?.TranscriptType?.name}
														id="inputMethod"
													/>
												</div>
												<div class="col-md-6">
													<label htmlFor="inputCollege" class="form-label">
														College
													</label>
													<input
														type="text"
														class="form-control"
														id="inputCollege"
														disabled
														value=${transcript?.College?.name}
													/>
												</div>
												<div class="col-md-6">
													<label htmlFor="inputDepartment" className="form-label">
														Department
													</label>
													<input
														type="text"
														class="form-control"
														id="inputDepartment"
														disabled
														value=${transcript?.Department?.name}
													/>
												</div>
												<div class="col-12">
													<label>Destination Names</label>
													${transcript?.Destinations?.map(
														(destination: any) =>
															`<input
															type="text"
															class="form-control"
															disabled
															value=${destination?.name}
															key=${destination.name}
														/>`
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
								</div>
								</div>
								</div>
								`;
									return details;
								}

								c1.on(
									"click",
									"td.dt-control",
									function (this: HTMLTableCellElement, e: any) {
										let $button = $(this as any);
										let tr = e.target.closest("tr");
										let row = c1.row(tr);

										if (row.child.isShown()) {
											// This row is already open - close it
											row.child.hide();
											tr.removeClass("expanded");
											$button.removeClass("minus");
										} else {
											// Open this row
											row.child(format(row.data())).show();
											tr.addClass("expanded");
											$button.addClass("minus");
										}
									}
								);

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
								<h3>Transcript Requests</h3>
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
						<div className="statbox widget box box-shadow">
							<div className="widget-content widget-content-area">
								<table id="style-1" className="table style-1 dt-table-hover non-hover">
									<thead>
										<tr>
											<th className="checkbox-column dt-no-sorting"> Record no. </th>
											<th></th>
											<th>Name</th>
											<th>Transcript Type</th>
											<th>Matric No</th>
											<th>Fee</th>
											<th className="">Status</th>
											<th className="text-center dt-no-sorting">Action</th>
										</tr>
									</thead>
									<tbody>
										{data?.map((transcriptRequest: any, id: number) => (
											<tr key={id}>
												<td className="checkbox-column"> {transcriptRequest?.id} </td>
												<td className="dt-control">
													<button className="plus-btn"></button>
												</td>
												<td className="user-name">{transcriptRequest?.User?.name}</td>
												<td className="">{transcriptRequest?.TranscriptType?.name}</td>

												<td>{transcriptRequest?.matricNo}</td>
												<td>&#8358;{transcriptRequest?.total}</td>
												<td>
													<div className="d-flex">
														<div className=" align-self-center d-m-success  mr-1 data-marker"></div>
														<span className="label label-success">
															<div className="td-content">
																<span
																	className={`badge badge-${
																		transcriptRequest?.status === "pending"
																			? "danger"
																			: transcriptRequest?.status === "paid"
																			? "success"
																			: transcriptRequest?.status === "shipped"
																			? "primary"
																			: "danger"
																	}`}
																>
																	{transcriptRequest?.status}
																</span>
															</div>
														</span>
													</div>
												</td>
												<td className="text-center">
													<ul className="table-controls">
														<li>
															<a
																onClick={() => {
																	setValueEdit("status", transcriptRequest?.status);
																	setIsForceUpdate(!isForceUpdate);
																}}
																data-bs-toggle="modal"
																data-bs-target="#updateTranscriptRequest"
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
																	setValueDelete("id", transcriptRequest?.id);
																	setIsForceUpdate(!isForceUpdate);
																	const { id } = getValueDelete();
																	console.log(id);
																}}
																data-bs-toggle="modal"
																className="bs-tooltip"
																data-bs-target="#deleteTranscriptRequest"
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
														id="updateTranscriptRequest"
														tabIndex={-1}
														role="dialog"
														aria-labelledby="updateTranscriptRequestTitle"
														aria-hidden="true"
													>
														<div
															className="modal-dialog modal-dialog-centered modal-xl"
															role="document"
														>
															<div className="modal-content">
																<div className="modal-header">
																	<h5 className="modal-title" id="editDepartmentTitle">
																		Update Transcript Request Status
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
																		className="row row-cols-lg-auto g-3 align-items-center"
																		onSubmit={handleSubmitEdit(submitEditForm)}
																	>
																		<div className="col-12">
																			<label
																				className="visually-hidden"
																				htmlFor="inlineFormSelectPref"
																			>
																				Status
																			</label>
																			<Controller
																				name="status"
																				control={controlEdit}
																				defaultValue=""
																				render={({ field }) => (
																					<select
																						className="form-select"
																						id="inlineFormSelectPref"
																						{...field}
																					>
																						<option value="">Select a status</option>
																						{statuses?.map((status: any, id) => (
																							<option key={id} value={status}>
																								{status}
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
																	</form>
																</div>
															</div>
														</div>
													</div>
													<div
														className="modal fade"
														id="deleteTranscriptRequest"
														tabIndex={-1}
														role="dialog"
														aria-labelledby="exampleTranscriptRequestTitle"
														aria-hidden="true"
													>
														<div
															className="modal-dialog modal-dialog-centered"
															role="document"
														>
															<div className="modal-content">
																<div className="modal-header">
																	<h5 className="modal-title" id="exampleTranscriptRequestTitle">
																		Delete Transcript Request
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
																			deleteTranscriptRequest(id);
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
										{isLoadingRequests && (
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
export default TranscriptRequests;
