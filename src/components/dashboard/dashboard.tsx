import { useState } from "react";
import {
	useGetRecentTranscriptRequestsQuery,
	useGetTranscriptRequestsQuery,
} from "../../services/transcriptRequestApiSlice";
import { useGetDestinationRequestsQuery } from "../../services/destinationRequestApiSlice";
import image from "../../constants/image";
const Dashboard = () => {
	const [userId] = useState(localStorage.getItem("transcript-uid"));
	const { data: dataRequests } = useGetTranscriptRequestsQuery("");
	const { data: dataRequestss } = useGetDestinationRequestsQuery("");
	const { data: dataRequestsss } = useGetRecentTranscriptRequestsQuery(userId);

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
								<h3>Dashboard</h3>
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
				<div className="row layout-top-spacing">
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
						<div className="widget-one widget">
							<div className="widget-content">
								<div className="w-numeric-value">
									<div className="w-icon">
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
											className="feather feather-shopping-cart"
										>
											<circle cx="9" cy="21" r="1"></circle>
											<circle cx="20" cy="21" r="1"></circle>
											<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
										</svg>
									</div>
									<div className="w-content">
										<span className="w-value">
											{
												dataRequests?.filter((request: any) => request.userId === userId)
													.length
											}
										</span>
										<span className="w-numeric-title">Total Transcript Requests</span>
									</div>
								</div>
								<div className="w-chart">
									<div id="total-requests"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
						<div className="widget-one widget">
							<div className="widget-content">
								<div className="w-numeric-value">
									<div className="w-icon">
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
											className="feather feather-shopping-cart"
										>
											<circle cx="9" cy="21" r="1"></circle>
											<circle cx="20" cy="21" r="1"></circle>
											<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
										</svg>
									</div>
									<div className="w-content">
										<span className="w-value">
											{
												dataRequestss?.filter((request: any) => request.userId === userId)
													.length
											}
										</span>
										<span className="w-numeric-title">Total Destination Requests</span>
									</div>
								</div>
								<div className="w-chart">
									<div id="total-requests"></div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-table-three">
							<div className="widget-heading">
								<h5 className="">Recent Transcript Requests</h5>
							</div>

							<div className="widget-content">
								<div className="table-responsive">
									<table className="table table-scroll">
										<thead>
											<tr>
												<th>
													<div className="th-content">Type</div>
												</th>
												<th>
													<div className="th-content th-heading">Matric No</div>
												</th>
												<th>
													<div className="th-content th-heading">Fee</div>
												</th>
												<th>
													<div className="th-content">Status</div>
												</th>
												{/* <th>
													<div className="th-content">Action</div>
												</th> */}
											</tr>
										</thead>
										<tbody>
											{dataRequestsss?.map((request: any) => (
												<tr>
													<td>
														<div className="td-content product-name">
															<div className="align-self-center">
																<p className="prd-name">{request?.type}</p>
															</div>
														</div>
													</td>
													<td>
														<div className="td-content">
															<span className="pricing">{request?.matricNo}</span>
														</div>
													</td>
													<td>
														<div className="td-content">
															<span className="discount-pricing">{request?.fee}</span>
														</div>
													</td>
													<td>
														<div className="td-content">{request?.fee}</div>
													</td>
													{/* <td>
														<div className="td-content">
															<a href="javascript:void(0);" className="text-danger">
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
																	className="feather feather-chevrons-right"
																>
																	<polyline points="13 17 18 12 13 7"></polyline>
																	<polyline points="6 17 11 12 6 7"></polyline>
																</svg>{" "}
																Direct
															</a>
														</div>
													</td> */}
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Dashboard;
