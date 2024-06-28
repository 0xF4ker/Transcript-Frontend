import { useEffect, useRef, useState } from "react";
import "./styles/datables.css";

import "./styles/dark/custom_dt_custom.css";
import "./styles/dark/dt-global_style.css";
import "./styles/dark/users.css";

import "./styles/light/custom_dt_custom.css";
import "./styles/light/dt-global_style.css";
import "./styles/light/users.css";
import { useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Skeleton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
	useGetTranscriptRequestsQuery,
	useSubmitTranscriptRequestMutation,
} from "../../services/transcriptRequestApiSlice";
import { useGetTranscriptTypesQuery } from "../../services/transcriptTypeApiSlice";
import { useGetDestinationsQuery } from "../../services/destinatiionApiSlice";
import { useGetUserQuery } from "../../services/userApiSlice";
import image from "../../constants/image";
const selector = (state: any) => state.user;
const RequestTranscript = () => {
	const navigate = useNavigate();
	const { handleSubmit, control, reset } = useForm();
	const [submitTranscriptRequest, { isLoading, isError, error, isSuccess }] =
		useSubmitTranscriptRequestMutation();
	const [hide, setHide] = useState(false);

	const submitForm = async (formData: any) => {
		console.log({ ...formData, userId });
		reset();

		try {
			const result = await submitTranscriptRequest({
				...formData,
				userId,
			}).unwrap();
			const id = result.id; // Assuming the ID is in the data object of the result
			navigate(`/app/transcript-checkout/${id}`);
		} catch (err) {
			console.error("Failed to submit transcript request:", err);
		}
	};

	const [destinations, setDestinations] = useState<string[]>([""]);
	const addDestination = () => {
		setDestinations([...destinations, ""]);
	};

	const removeDestination = (index: number) => {
		const updatedDestinations = [...destinations];
		updatedDestinations.splice(index, 1);
		setDestinations(updatedDestinations);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success("Transcript request submitted");
			setHide(false);
		}
		if (isError) {
			console.log(error);
			toast.error("Transcript request failed", {
				position: "top-right",
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading, isError, isSuccess]);

	const { data, isLoading: isLoadingRequests } =
		useGetTranscriptRequestsQuery("");
	const { data: destinationData } = useGetDestinationsQuery("");
	const { data: transcriptTypesData } = useGetTranscriptTypesQuery("");
	const { userId } = useSelector(selector);
	const {
		data: userData,
		isSuccess: isSuccessUser,
		isLoading: isLoadingUser,
	} = useGetUserQuery(userId);

	useEffect(() => {
		if (isSuccessUser && userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);

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
								<h3>Request Transcript</h3>
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
							Create Request
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
													<label htmlFor="matricNo" className="form-label">
														Matric No
													</label>
													<input
														type="text"
														className="form-control"
														disabled
														value={userData?.schoolId}
														id="inputMatricNo"
													/>
												</div>
												<div className="col-md-6">
													<label htmlFor="inputMethod" className="form-label">
														Transcript Type
													</label>
													<Controller
														name="transcriptType"
														control={control}
														defaultValue=""
														rules={{ required: "transcript type is required" }}
														render={({ field }) => (
															<select
																className="form-select"
																id="inlineFormSelectPref"
																{...field}
															>
																<option value="">Select a transcript type</option>
																{transcriptTypesData?.map((transcriptType: any) => (
																	<option key={transcriptType?.id} value={transcriptType?.name}>
																		{transcriptType?.name}
																	</option>
																))}
															</select>
														)}
													/>
												</div>
												<div className="col-md-6">
													<label htmlFor="inputCollege" className="form-label">
														College
													</label>
													<input
														type="text"
														className="form-control"
														id="inputColege"
														disabled
														value={userData?.College?.name}
													/>
												</div>
												<div className="col-md-6">
													<label htmlFor="inputDepartment" className="form-label">
														Department
													</label>
													<input
														type="text"
														className="form-control"
														id="inputDepartment"
														disabled
														value={userData?.Department?.name}
													/>
												</div>
												<>
													<label>Destination Names</label>
													{destinations?.map((_: any, index: number) => (
														<>
															<Controller
																name={`destinations[${index}]`}
																control={control}
																defaultValue=""
																rules={{ required: "Destination is required" }}
																render={({ field }) => (
																	<>
																		<div className="col-md-6" key={index}>
																			<select
																				className="form-select"
																				id="inlineFormSelectPref"
																				{...field}
																			>
																				<option value="">Select a destination</option>
																				{destinationData?.map((destination: any) => (
																					<option key={destination?.id} value={destination?.id}>
																						{destination?.name}
																					</option>
																				))}
																			</select>
																		</div>
																		<div className="col-md-6">
																			<button
																				type="button"
																				className="btn btn-danger"
																				onClick={() => removeDestination(index)}
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
															onClick={addDestination}
														>
															Add New Destination
														</button>
													</div>
													<div className="col-12 layout-top-spacing">
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
												</>
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
										{data
											?.filter((request: any) => request.userId === userId)
											?.map((transcriptRequest: any, id: number) => (
												<tr key={id}>
													<td className="checkbox-column"> {id} </td>
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
														{!transcriptRequest.isPaid && (
															<Link
																to={`/app/transcript-checkout/${transcriptRequest?.id}`}
																className="btn btn-primary"
															>
																Checkout
															</Link>
														)}
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
export default RequestTranscript;
