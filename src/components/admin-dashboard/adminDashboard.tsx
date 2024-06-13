// import { useEffect } from "react";
import image from "../../constants/image";
import { useGetAdminDashboardQuery } from "../../services/adminDashboardApiSlice";
import "./styles/apexcharts.css";
import "./styles/dash_2.css";
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
	const { data } = useGetAdminDashboardQuery("");
	// const { data: dataRequests } = useGetTranscriptRequestsQuery("");
	// useEffect(() => {
	// 	const script = document.createElement("script");
	// 	script.src = "/scripts/dash_2.js";
	// 	script.async = true;
	// 	document.body.appendChild(script);
	// 	return () => {
	// 		document.body.removeChild(script);
	// 	};
	// }, []);
	// useEffect(() => {
	// 	// Initialize your app here
	// 	// Call your initialization functions
	// }, []);
	// const scriptUrls = ["/scripts/dash_2.js"];
	// // Use the custom hook to add the scripts
	// useScripts(scriptUrls);
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
				<div className="row">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-chart-one">
							<div className="widget-heading">
								<h5 className="">Revenue</h5>
								<div className="task-action">
									<div className="dropdown">
										<a
											className="dropdown-toggle"
											role="button"
											id="pendingTask"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
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
											className="dropdown-menu dropdown-menu-right"
											aria-labelledby="pendingTask"
											style={{ willChange: "transform" }}
										>
											<a className="dropdown-item" href="javascript:void(0);">
												Weekly
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Monthly
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Yearly
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="widget-content">
								<div id="revenueMonthly"></div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
						<div className="widget widget-three">
							<div className="widget-heading">
								<h5 className="">Summary</h5>

								<div className="task-action">
									<div className="dropdown">
										<a
											className="dropdown-toggle"
											href="#"
											role="button"
											id="pendingTask"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
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
											className="dropdown-menu dropdown-menu-right"
											aria-labelledby="pendingTask"
											style={{ willChange: "transform" }}
										>
											<a className="dropdown-item" href="javascript:void(0);">
												View Report
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Edit Report
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Mark as Done
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="widget-content">
								<div className="order-summary">
									<div className="summary-list summary-income">
										<div className="summery-info">
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
													className="feather feather-shopping-bag"
												>
													<path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
													<line x1="3" y1="6" x2="21" y2="6"></line>
													<path d="M16 10a4 4 0 0 1-8 0"></path>
												</svg>
											</div>

											<div className="w-summary-details">
												<div className="w-summary-info">
													<h6>
														Income{" "}
														<span className="summary-count">
															&#8358;{data?.summary?.totalRevenue}{" "}
														</span>
													</h6>
													{/* <p className="summary-average">90%</p> */}
												</div>
											</div>
										</div>
									</div>

									<div className="summary-list summary-profit">
										<div className="summery-info">
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
													className="feather feather-tag"
												>
													<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
													<line x1="7" y1="7" x2="7" y2="7"></line>
												</svg>
											</div>
											<div className="w-summary-details">
												<div className="w-summary-info">
													<h6>
														Profit{" "}
														<span className="summary-count">
															&#8358;{data?.summary?.profit}
														</span>
													</h6>
													{/* <p className="summary-average">65%</p> */}
												</div>
											</div>
										</div>
									</div>

									<div className="summary-list summary-expenses">
										<div className="summery-info">
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
													className="feather feather-credit-card"
												>
													<rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
													<line x1="1" y1="10" x2="23" y2="10"></line>
												</svg>
											</div>
											<div className="w-summary-details">
												<div className="w-summary-info">
													<h6>
														Expenses{" "}
														<span className="summary-count">
															&#8358;{data?.summary?.totalExpenses}
														</span>
													</h6>
													{/* <p className="summary-average">80%</p> */}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
						<div className="widget widget-table-one">
							<div className="widget-heading">
								<h5 className="">Transactions</h5>
								<div className="task-action">
									<div className="dropdown">
										<a
											className="dropdown-toggle"
											href="#"
											role="button"
											id="pendingTask"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
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
											className="dropdown-menu dropdown-menu-right"
											aria-labelledby="pendingTask"
											style={{ willChange: "transform" }}
										>
											<a className="dropdown-item" href="javascript:void(0);">
												View Report
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Edit Report
											</a>
											<a className="dropdown-item" href="javascript:void(0);">
												Mark as Done
											</a>
										</div>
									</div>
								</div>
							</div>

							<div className="widget-content">
								{data?.recentTransactions?.map((transaction: any) => (
									<div className="transactions-list t-info">
										<div className="t-item">
											<div className="t-company-name">
												<div className="t-icon">
													<div className="avatar avatar-xl">
														<span className="avatar-title">SP</span>
													</div>
												</div>
												<div className="t-name">
													<h4>{transaction?.name}</h4>
													<p className="meta-date">4 Aug 1:00PM</p>
												</div>
											</div>
											<div className="t-rate rate-inc">
												<p>
													<span>+${transaction.amount}</span>
												</p>
											</div>
										</div>
									</div>
								))}
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
										<span className="w-value">{data?.totalTranscriptRequests}</span>
										<span className="w-numeric-title">Total Requests</span>
									</div>
								</div>
								<div className="w-chart">
									<div id="total-requests"></div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12 layout-spacing">
						<div className="widget-two">
							<div className="widget-content">
								<div className="w-numeric-value">
									<div className="w-content">
										<span className="w-value">Daily sales</span>
										<span className="w-numeric-title">Go to columns for details.</span>
									</div>
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
											className="feather feather-dollar-sign"
										>
											<line x1="12" y1="1" x2="12" y2="23"></line>
											<path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
										</svg>
									</div>
								</div>
								<div className="w-chart">
									<div id="daily-sales"></div>
								</div>
							</div>
						</div>
					</div>

					{/* <div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-table-three">
							<div className="widget-heading">
								<h5 className="">Top Selling Product</h5>
							</div>

							<div className="widget-content">
								<div className="table-responsive">
									<table className="table table-scroll">
										<thead>
											<tr>
												<th>
													<div className="th-content">Product</div>
												</th>
												<th>
													<div className="th-content th-heading">Price</div>
												</th>
												<th>
													<div className="th-content th-heading">Discount</div>
												</th>
												<th>
													<div className="th-content">Sold</div>
												</th>
												<th>
													<div className="th-content">Source</div>
												</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<div className="td-content product-name">
														<img src={image.userImg} alt="product" />
														<div className="align-self-center">
															<p className="prd-name">Headphone</p>
															<p className="prd-category text-primary">Digital</p>
														</div>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="pricing">$168.09</span>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="discount-pricing">$60.09</span>
													</div>
												</td>
												<td>
													<div className="td-content">170</div>
												</td>
												<td>
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
												</td>
											</tr>
											<tr>
												<td>
													<div className="td-content product-name">
														<img src={image.userImg} alt="product" />
														<div className="align-self-center">
															<p className="prd-name">Shoes</p>
															<p className="prd-category text-warning">Faishon</p>
														</div>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="pricing">$108.09</span>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="discount-pricing">$47.09</span>
													</div>
												</td>
												<td>
													<div className="td-content">130</div>
												</td>
												<td>
													<div className="td-content">
														<a href="javascript:void(0);" className="text-primary">
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
															Google
														</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="td-content product-name">
														<img src={image.userImg} alt="product" />
														<div className="align-self-center">
															<p className="prd-name">Watch</p>
															<p className="prd-category text-danger">Accessories</p>
														</div>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="pricing">$88.00</span>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="discount-pricing">$20.00</span>
													</div>
												</td>
												<td>
													<div className="td-content">66</div>
												</td>
												<td>
													<div className="td-content">
														<a href="javascript:void(0);" className="text-warning">
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
															Ads
														</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="td-content product-name">
														<img src={image.userImg} alt="product" />
														<div className="align-self-center">
															<p className="prd-name">Laptop</p>
															<p className="prd-category text-primary">Digital</p>
														</div>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="pricing">$110.00</span>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="discount-pricing">$33.00</span>
													</div>
												</td>
												<td>
													<div className="td-content">35</div>
												</td>
												<td>
													<div className="td-content">
														<a href="javascript:void(0);" className="text-info">
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
															Email
														</a>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className="td-content product-name">
														<img src={image.userImg} alt="product" />
														<div className="align-self-center">
															<p className="prd-name">Camera</p>
															<p className="prd-category text-primary">Digital</p>
														</div>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="pricing">$126.04</span>
													</div>
												</td>
												<td>
													<div className="td-content">
														<span className="discount-pricing">$26.04</span>
													</div>
												</td>
												<td>
													<div className="td-content">30</div>
												</td>
												<td>
													<div className="td-content">
														<a href="javascript:void(0);" className="text-secondary">
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
															Referral
														</a>
													</div>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-account-invoice-three">
							<div className="widget-heading">
								<div className="wallet-usr-info">
									<div className="usr-name">
										<span>
											<img src={image.userImg} alt="admin-profile" className="img-fluid" />{" "}
											Alan Green
										</span>
									</div>
									<div className="add">
										<span>
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
												className="feather feather-plus"
											>
												<line x1="12" y1="5" x2="12" y2="19"></line>
												<line x1="5" y1="12" x2="19" y2="12"></line>
											</svg>
										</span>
									</div>
								</div>
								<div className="wallet-balance">
									<p>Wallet Balance</p>
									<h5 className="">
										<span className="w-currency">$</span>2953
									</h5>
								</div>
							</div>

							<div className="widget-amount">
								<div className="w-a-info funds-received">
									<span>
										Received{" "}
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
											className="feather feather-chevron-up"
										>
											<polyline points="18 15 12 9 6 15"></polyline>
										</svg>
									</span>
									<p>$97.99</p>
								</div>

								<div className="w-a-info funds-spent">
									<span>
										Spent{" "}
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
									</span>
									<p>$53.00</p>
								</div>
							</div>

							<div className="widget-content">
								<div className="bills-stats">
									<span>Pending</span>
								</div>

								<div className="invoice-list">
									<div className="inv-detail">
										<div className="info-detail-1">
											<p>Netflix</p>
											<p>
												<span className="w-currency">$</span>{" "}
												<span className="bill-amount">13.85</span>
											</p>
										</div>
										<div className="info-detail-2">
											<p>BlueHost VPN</p>
											<p>
												<span className="w-currency">$</span>{" "}
												<span className="bill-amount">15.66</span>
											</p>
										</div>
									</div>

									<div className="inv-action">
										<a
											href="javascript:void(0);"
											className="btn btn-outline-primary view-details"
										>
											View Details
										</a>
										<a
											href="javascript:void(0);"
											className="btn btn-outline-primary pay-now"
										>
											Pay Now $29.51
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-activity-four">
							<div className="widget-heading">
								<h5 className="">Recent Activities</h5>
								<div className="w-icon">
									<a className="btn btn-primary" href="javascript:void(0);">
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
											className="feather feather-arrow-right"
										>
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</a>
								</div>
							</div>

							<div className="widget-content">
								<div className="mt-container mx-auto">
									<div className="timeline-line">
										<div className="item-timeline timeline-primary">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													<span>Updated</span> Server Logs
												</p>
												<span className="badge">Pending</span>
												<p className="t-time">Just Now</p>
											</div>
										</div>

										<div className="item-timeline timeline-success">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Send Mail to <a href="javascript:void(0);">HR</a> and{" "}
													<a href="javascript:void(0);">Admin</a>
												</p>
												<span className="badge">Completed</span>
												<p className="t-time">2 min ago</p>
											</div>
										</div>

										<div className="item-timeline  timeline-danger">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Backup <span>Files EOD</span>
												</p>
												<span className="badge">Pending</span>
												<p className="t-time">14:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-dark">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Collect documents from <a href="javascript:void(0);">Sara</a>
												</p>
												<span className="badge">Completed</span>
												<p className="t-time">16:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-warning">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Conference call with{" "}
													<a href="javascript:void(0);">Marketing Manager</a>.
												</p>
												<span className="badge">In progress</span>
												<p className="t-time">17:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-secondary">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Rebooted Server</p>
												<span className="badge">Completed</span>
												<p className="t-time">17:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-warning">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Send contract details to Freelancer</p>
												<span className="badge">Pending</span>
												<p className="t-time">18:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-dark">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Kelly want to increase the time of the project.</p>
												<span className="badge">In Progress</span>
												<p className="t-time">19:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-success">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Server down for maintanence</p>
												<span className="badge">Completed</span>
												<p className="t-time">19:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-secondary">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Malicious link detected</p>
												<span className="badge">Block</span>
												<p className="t-time">20:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-warning">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>Rebooted Server</p>
												<span className="badge">Completed</span>
												<p className="t-time">23:00</p>
											</div>
										</div>

										<div className="item-timeline timeline-primary">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													<span>Updated</span> Server Logs
												</p>
												<span className="badge">Pending</span>
												<p className="t-time">Just Now</p>
											</div>
										</div>

										<div className="item-timeline timeline-success">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Send Mail to <a href="javascript:void(0);">HR</a> and{" "}
													<a href="javascript:void(0);">Admin</a>
												</p>
												<span className="badge">Completed</span>
												<p className="t-time">2 min ago</p>
											</div>
										</div>

										<div className="item-timeline  timeline-danger">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Backup <span>Files EOD</span>
												</p>
												<span className="badge">Pending</span>
												<p className="t-time">14:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-dark">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Collect documents from <a href="javascript:void(0);">Sara</a>
												</p>
												<span className="badge">Completed</span>
												<p className="t-time">16:00</p>
											</div>
										</div>

										<div className="item-timeline  timeline-warning">
											<div className="t-dot" data-original-title="" title=""></div>
											<div className="t-text">
												<p>
													Conference call with{" "}
													<a href="javascript:void(0);">Marketing Manager</a>.
												</p>
												<span className="badge">In progress</span>
												<p className="t-time">17:00</p>
											</div>
										</div>
									</div>
								</div>

								<div className="tm-action-btn">
									<button className="btn">
										<span>View All</span>{" "}
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
											className="feather feather-arrow-right"
										>
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>

					<div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
						<div className="widget widget-chart-two">
							<div className="widget-heading">
								<h5 className="">Sales by Category</h5>
								<div className="w-icon">
									<a className="btn btn-primary" href="javascript:void(0);">
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
											className="feather feather-arrow-right"
										>
											<line x1="5" y1="12" x2="19" y2="12"></line>
											<polyline points="12 5 19 12 12 19"></polyline>
										</svg>
									</a>
								</div>
							</div>
							<div className="widget-content">
								<div id="chart-2" className=""></div>
							</div>
						</div>
					</div> */}
				</div>
			</div>
			<Helmet>
				<script src="/scripts/dash_2.js"></script>
			</Helmet>
		</>
	);
};
export default AdminDashboard;
