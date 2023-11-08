import { useEffect, useRef, useState } from "react";
import {
	useGetDestinationsQuery,
	useGetTranscriptRequestsQuery,
	useGetTranscriptTypesQuery,
	useGetUserQuery,
	useSubmitTranscriptRequestMutation,
} from "../../features/api/Auth/authApiSlice";
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
import { PaystackButton } from "react-paystack";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const selector = (state: any) => state.user;
const RequestTranscript = () => {
	const navigate = useNavigate();
	const { handleSubmit, control, reset } = useForm();
	const [submitTranscriptRequest, { isLoading, isError, error, isSuccess }] =
		useSubmitTranscriptRequestMutation();
	const [hide, setHide] = useState(false);
	const submitForm = (data: any) => {
		console.log({ ...data, userId });
		reset();

		submitTranscriptRequest({ ...data, userId });
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
			if ((error as any)) {
				toast.error((error as any), { position: "top-right" });
			} else {
				toast.error("Transcript request failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	
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
		if (isSuccessUser) if (userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const dataTableRef = useRef(null);
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
							Request Transcript
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
													render={({ field }) => (
														<select
															className="form-select"
															id="inlineFormSelectPref"
															{...field}
														>
															<option value="">Select a transcript type</option>
															{transcriptTypesData?.map(
																(transcriptType: any) => (
																	<option
																		key={transcriptType?.id}
																		value={transcriptType?.name}
																	>
																		{transcriptType?.name}
																	</option>
																)
															)}
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
													value={userData?.college}
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
													value={userData?.department}
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
															render={({ field }) => (
																<>
																	<div className="col-md-6" key={index}>
																		<select
																			className="form-select"
																			id="inlineFormSelectPref"
																			{...field}
																		>
																			<option value="">
																				Select a destination
																			</option>
																			{destinationData?.map(
																				(destination: any) => (
																					<option
																						key={destination?.id}
																						value={destination?.id}
																					>
																						{destination?.name}
																					</option>
																				)
																			)}
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
													{
													isLoading ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("SUBMIT")
												}
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
												<td className="user-name">{transcriptRequest?.name}</td>
												<td className="">
													{transcriptRequest?.transcriptType}
												</td>
												<td>{transcriptRequest?.matricNo}</td>
												<td>{transcriptRequest?.totalFee}</td>
												<td>
													<div className="d-flex">
														<div className=" align-self-center d-m-success  mr-1 data-marker"></div>
														<span className="label label-success">
														<div className="td-content"><span className={`badge badge-${transcriptRequest?.status === "pending" ?"danger" : transcriptRequest?.status === "paid" ? "success" : transcriptRequest?.status === "shipped" ? "primary": "danger"}`}>{transcriptRequest?.status}</span></div>
														</span>
													</div>
												</td>
												<td className="text-center">
								
															{!transcriptRequest.isPaid && ( <PaystackButton
																className="dropdown-item"
																{...{
																	publicKey:
																		"pk_test_ca94a46bdb50763f37bafb6bce8a0d6623821a23",
																	email: userData?.email,
																	amount: transcriptRequest?.totalFee * 100,
																	metadata: {
																		transcriptRequstId: transcriptRequest.id,
																		custom_fields: [
																			{
																				display_name: "Invoice ID",

																				variable_name: "Invoice ID",

																				value: 209,
																			},

																			{
																				display_name: "Cart Items",

																				variable_name: "cart_items",

																				value: "3 bananas, 12 mangoes",
																			},
																		],
																	},
																}}
															>
																Checkout
															</PaystackButton>)}
												</td>
											</tr>
										))}
									{isLoadingRequests && (
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
export default RequestTranscript;
