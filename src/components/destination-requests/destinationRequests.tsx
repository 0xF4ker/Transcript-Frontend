import { useEffect, useRef } from "react";
import "./styles/datables.css";

import "./styles/dark/custom_dt_custom.css";
import "./styles/dark/dt-global_style.css";
import "./styles/dark/users.css";

import "./styles/light/custom_dt_custom.css";
import "./styles/light/dt-global_style.css";
import "./styles/light/users.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useGetDestinationRequestsQuery } from "../../services/destinationRequestApiSlice";
const selector = (state: any) => state.user;
const DestinationRequests = () => {
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
	const { data, isLoading: isLoadingDestinationRequests } =
		useGetDestinationRequestsQuery("");
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
		<div className="middle-content container-xxl p-0">
			<div className="page-meta">
				<nav className="breadcrumb-style-one" aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="#">App</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Destination Requests
						</li>
					</ol>
				</nav>
			</div>
			<div className="row layout-top-spacing d-flex">
				<div className="col-lg-12">
					<div className="statbox widget box box-shadow">
						<div className="widget-content widget-content-area">
							<table id="style-1" className="table style-1 dt-table-hover non-hover">
								<thead>
									<tr>
										<th className="checkbox-column dt-no-sorting"> Record no. </th>
										<th>Destination Name</th>
										<th>Request ID</th>
										<th>User ID</th>
										<th className="">Status</th>
										<th className="text-center dt-no-sorting">Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((destination: any, id: number) => (
										<tr key={id}>
											<td className="checkbox-column"> {id} </td>
											<td className="user-name">{destination?.name}</td>
											<td className="">{destination?.id}</td>
											<td>{destination?.userId}</td>
											<td>{destination?.status}</td>
											<td className="text-center">
												<ul className="table-controls">
													<li>
														<a
															href="javascript:void(0);"
															className="bs-tooltip"
															data-bs-toggle="tooltip"
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
															href="javascript:void(0);"
															className="bs-tooltip"
															data-bs-toggle="tooltip"
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
											</td>
										</tr>
									))}
									{isLoadingDestinationRequests && (
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
export default DestinationRequests;
