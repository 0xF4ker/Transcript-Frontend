import images from "../../constants/image";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/User/userSlice";
import { useGetRootQuery } from "../../services/rootApiSlice";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useLogoutUserMutation } from "../../services/authApiSlice";
// import webAppStyles from "../../global-styles/light/plugins.css?inline";
// import { createGlobalStyle } from "styled-components";
import { Helmet, HelmetProvider } from "react-helmet-async";
// const GlobalStyle = createGlobalStyle`
//     ${webAppStyles}
// `;
const Root = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const {
		data: dataRoot,
		isLoading: isLoadingRoot,
		isSuccess: isSuccess,
	} = useGetRootQuery("", {
		pollingInterval: 3000,
		refetchOnMountOrArgChange: true,
		skip: false,
	});

	useEffect(() => {
		if (isSuccess) {
			if (dataRoot?.valid) {
				dispatch(setUserId(dataRoot?.userId));
				localStorage.setItem("transcript-uid", dataRoot?.userId);
			} else {
				localStorage.removeItem("transcript-uid");
				navigate("/login");
			}
		}
	}, [dataRoot, isLoadingRoot]);

	useEffect(() => {
		// Ensure App is defined and initialized only once everything is loaded
		const initializeApp = () => {
			if (typeof App !== "undefined" && App.init) {
				App.init();
			} else {
				console.error("App is not defined or App.init is not available");
			}
		};

		// Call initializeApp when the component is mounted
		initializeApp();
	}, [location]);
	const userId = localStorage.getItem("transcript-uid");
	const { data } = useGetUserQuery(userId);
	const [logoutUser] = useLogoutUserMutation();

	return (
		<>
			<HelmetProvider>
				<Helmet>
					<link rel="stylesheet" href="/styles/light/plugins.css" />
				</Helmet>
			</HelmetProvider>
			<div id="container" className="main-container">
				<div className="overlay"></div>
				<div className="search-overlay"></div>
				<div className="sidebar-wrapper sidebar-theme">
					<div className="theme-logo">
						<Link style={{ textDecoration: "none" }} to="/app">
							<img src={images.logo1} className="navbar-logo" alt="logo" />
							<span className="admin-logo">
								Transcript<span></span>
							</span>
						</Link>
					</div>

					<div className="sidebarCollapseFixed">
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
							className="feather feather-arrow-left"
						>
							<line x1="19" y1="12" x2="5" y2="12"></line>
							<polyline points="12 19 5 12 12 5"></polyline>
						</svg>
					</div>

					<nav id="compactSidebar">
						<ul className="menu-categories">
							{data?.privileges?.map((item: any, index: number) => (
								<li
									key={index}
									className={location.pathname === item.path ? "menu active" : "menu"}
								>
									<Link
										data-active={location.pathname === item.path ? "true" : "false"}
										to={item.path}
										className="menu-toggle"
									>
										<div className="base-menu">
											<div className="base-icons">
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
													className="feather feather-cpu"
												>
													<rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
													<rect x="9" y="9" width="6" height="6"></rect>
													<line x1="9" y1="1" x2="9" y2="4"></line>
													<line x1="15" y1="1" x2="15" y2="4"></line>
													<line x1="9" y1="20" x2="9" y2="23"></line>
													<line x1="15" y1="20" x2="15" y2="23"></line>
													<line x1="20" y1="9" x2="23" y2="9"></line>
													<line x1="20" y1="14" x2="23" y2="14"></line>
													<line x1="1" y1="9" x2="4" y2="9"></line>
													<line x1="1" y1="14" x2="4" y2="14"></line>
												</svg>
											</div>
											<span>{`  ${item.name}`}</span>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div id="compact_submenuSidebar" className="submenu-sidebar"></div>
				</div>
				<div id="content" className="main-content">
					<div className="layout-px-spacing">
						<div className="content-container">
							<div className="col-left layout-top-spacing">
								<div className="col-left-content">
									<Outlet />
								</div>
							</div>
							<div className="col-right">
								<div className="col-right-content">
									<div className="navbar-item flex-row search-ul navbar-dropdown">
										<div className="nav-item align-self-center search-animated">
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
												className="feather feather-search toggle-search"
											>
												<circle cx="11" cy="11" r="8"></circle>
												<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
											</svg>
											<form
												className="form-inline search-full form-inline search"
												role="search"
											>
												<div className="search-bar">
													<input
														type="text"
														className="form-control search-form-control  ml-lg-auto"
														placeholder="Search..."
													/>
												</div>
											</form>
										</div>
									</div>

									<div className="col-right-content-container">
										<div className="activity-section">
											<div className="widget-profile">
												<div className="w-profile-view">
													<img
														src={images.userImg}
														alt="admin-profile"
														className="img-fluid"
													/>
													<div className="w-profile-content">
														<h6>{data?.name}</h6>
														<p>{data?.roles[0] === "User" ? "Student" : "Staff"}</p>
													</div>
												</div>

												<div className="w-profile-links">
													<Link to="/app/user-profile" className="w-p-link">
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
															className="feather feather-user"
														>
															<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
															<circle cx="12" cy="7" r="4"></circle>
														</svg>
														<p>My Profile</p>
													</Link>

													<a
														onClick={() => {
															logoutUser("");
															localStorage.removeItem("transcript-uid");
															navigate("/login");
														}}
														className="w-p-link"
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
															className="feather feather-inbox"
														>
															<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
															<path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path>
														</svg>
														<p>Logout</p>
													</a>
												</div>
											</div>

											{/* <div className="widget-todo">
												<div className="todo-content">
													<div className="todo-title">
														<h6>
															<span className="icon">
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
																	className="feather feather-edit"
																>
																	<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
																	<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
																</svg>
															</span>{" "}
															<span className="align-self-center">Todo</span>
														</h6>
													</div>
													<div className="todo-text">
														<a href="apps_todoList.html">
															<p>11 New Task</p>
														</a>
													</div>
												</div>
											</div>

											<div className="widget-message">
												<div className="widget-title">
													<h5>Messages</h5>
													<a href="apps_chat.html">
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
															className="feather feather-message-circle"
														>
															<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
														</svg>
													</a>
												</div>

												<div className="widget-messages">
													<a href="apps_chat.html" className="w-message">
														<img src={images.userImg} alt="" className="img-fluid" />
														<div className="msg-content">
															<h5 className="w-msg-username">Andy King</h5>
															<p className="w-msg-text">Work is delayed</p>
														</div>
													</a>

													<a href="apps_chat.html" className="w-message">
														<img src={images.userImg} alt="" className="img-fluid" />
														<div className="msg-content">
															<h5 className="w-msg-username">Alma Clark</h5>
															<p className="w-msg-text">It was a bit dramatic.</p>
														</div>
													</a>

													<a href="apps_chat.html" className="w-message">
														<img src={images.userImg} alt="" className="img-fluid" />
														<div className="msg-content">
															<h5 className="w-msg-username">Vincent</h5>
															<p className="w-msg-text">Coffee?</p>
														</div>
													</a>

													<a href="apps_chat.html" className="w-message">
														<img src={images.userImg} alt="" className="img-fluid" />
														<div className="msg-content">
															<h5 className="w-msg-username">Iris Hofman</h5>
															<p className="w-msg-text">Not comming to office today.</p>
														</div>
													</a>

													<a href="apps_chat.html" className="w-message">
														<img src={images.userImg} alt="" className="img-fluid" />
														<div className="msg-content">
															<h5 className="w-msg-username">Linda Nelson</h5>
															<p className="w-msg-text">Uploaded files to server.</p>
														</div>
													</a>
												</div>
											</div>

											<div className="widget-invoice">
												<div className="widget-title">
													<h5>New Invoice</h5>
													<a href="apps_invoice.html">
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
													</a>
												</div>

												<div className="widget-invoice-lists">
													<div className="w-invoice">
														<p className="w-inv-text">
															<a href="apps_invoice.html">
																<span className="inv-number">#002658</span>
															</a>{" "}
															is generated for <span className="usr-name">Laurie Fox</span>
														</p>
													</div>

													<div className="w-invoice">
														<p className="w-inv-text">
															<a href="apps_invoice.html">
																<span className="inv-number">#0036489</span>
															</a>{" "}
															is generated for <span className="usr-name">Ernest Reeves</span>
														</p>
													</div>

													<div className="w-invoice">
														<p className="w-inv-text">
															<a href="apps_invoice.html">
																<span className="inv-number">#014778</span>
															</a>{" "}
															is generated for <span className="usr-name">Sean Freeman</span>
														</p>
													</div>

													<div className="w-invoice">
														<p className="w-inv-text">
															<a href="apps_invoice.html">
																<span className="inv-number">#0165987</span>
															</a>{" "}
															is generated for <span className="usr-name">Nia Hillyer</span>
														</p>
													</div>

													<div className="w-invoice">
														<p className="w-inv-text">
															<a href="apps_invoice.html">
																<span className="inv-number">#0265998</span>
															</a>{" "}
															is generated for <span className="usr-name">Dale Butler</span>
														</p>
													</div>
												</div>
											</div>

											<div className="widget-taskBoard">
												<div className="widget-title">
													<h5>Task Board</h5>
													<a href="apps_scrumboard.html">
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
															className="feather feather-edit"
														>
															<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
															<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
														</svg>
													</a>
												</div>

												<div className="widget-taskBoard-lists">
													<div className="w-taskBoard">
														<p className="w-taskBoard-text">
															<a href="apps_scrumboard.html">
																<span className="taskBoard-number">
																	Launch New Seo Wordpress Theme
																</span>
															</a>{" "}
															has been moved to{" "}
															<span className="taskBoard-name">Completed</span> Board by{" "}
															<span className="usr-name">Alma Clark</span>
														</p>
													</div>

													<div className="w-taskBoard">
														<p className="w-taskBoard-text">
															<a href="apps_scrumboard.html">
																<span className="taskBoard-number">New Task</span>
															</a>{" "}
															is added by <span className="usr-name">Ernest Reeves</span>
														</p>
													</div>

													<div className="w-taskBoard">
														<p className="w-taskBoard-text">
															<a href="apps_scrumboard.html">
																<span className="taskBoard-number">
																	Dinner with Kelly Young
																</span>
															</a>{" "}
															has been moved to{" "}
															<span className="taskBoard-name">Completed</span> Board by{" "}
															<span className="usr-name">Dale Butler</span>
														</p>
													</div>
												</div>
											</div>

											<div className="widget-calendar">
												<div className="widget-title">
													<h5>Event Notifications</h5>

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
																style={{ willChange: "transform;" }}
															>
																<a className="dropdown-item" href="javascript:void(0);">
																	View All
																</a>
																<a className="dropdown-item" href="javascript:void(0);">
																	Mark as Read
																</a>
															</div>
														</div>
													</div>
												</div>

												<div className="widget-calendar-lists">
													<div className="widget-calendar-lists-scroll">
														<a href="apps_calendar.html" className="w-calendar w-calendar-c6">
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
																	className="feather feather-calendar"
																>
																	<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
																	<line x1="16" y1="2" x2="16" y2="6"></line>
																	<line x1="8" y1="2" x2="8" y2="6"></line>
																	<line x1="3" y1="10" x2="21" y2="10"></line>
																</svg>
															</div>
															<p className="w-calendar-text">
																<span className="calendar-number">New Event</span> has been
																added on <span className="calendar-name">15 Dec 2020</span>
															</p>
														</a>

														<a href="apps_calendar.html" className="w-calendar w-calendar-c3">
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
																	className="feather feather-users"
																>
																	<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
																	<circle cx="9" cy="7" r="4"></circle>
																	<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
																	<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
																</svg>
															</div>
															<p className="w-calendar-text">
																Collect <span className="calendar-number">documents</span> from{" "}
																<span className="calendar-number">Kelly</span> at the restaurant
																tommorrow.
															</p>
														</a>

														<a href="apps_calendar.html" className="w-calendar w-calendar-c1">
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
																	className="feather feather-users"
																>
																	<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
																	<circle cx="9" cy="7" r="4"></circle>
																	<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
																	<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
																</svg>
															</div>
															<p className="w-calendar-text">
																<span className="calendar-number">Meeting Event</span> on 12 Nov
																has been updated to 8 PM
															</p>
														</a>

														<a href="apps_calendar.html" className="w-calendar w-calendar-c5">
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
																	className="feather feather-calendar"
																>
																	<rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
																	<line x1="16" y1="2" x2="16" y2="6"></line>
																	<line x1="8" y1="2" x2="8" y2="6"></line>
																	<line x1="3" y1="10" x2="21" y2="10"></line>
																</svg>
															</div>
															<p className="w-calendar-text">
																<span className="calendar-number">New Event</span> Seminar
																organised by Design Reset will be held on 25 January
															</p>
														</a>

														<a href="apps_calendar.html" className="w-calendar w-calendar-c2">
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
																	className="feather feather-alert-triangle"
																>
																	<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
																	<line x1="12" y1="9" x2="12" y2="13"></line>
																	<line x1="12" y1="17" x2="12.01" y2="17"></line>
																</svg>
															</div>
															<p className="w-calendar-text">
																Today's <span className="calendar-number">Conference</span> is
																Cancelled.
															</p>
														</a>

														<a href="apps_calendar.html" className="w-calendar w-calendar-c4">
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
																	className="feather feather-users"
																>
																	<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
																	<circle cx="9" cy="7" r="4"></circle>
																	<path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
																	<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
																</svg>
															</div>
															<p className="w-calendar-text">
																Meeting with{" "}
																<span className="calendar-number">Project Lead</span> on 01 Jan
																has been updated to 15 Jan
															</p>
														</a>
													</div>
												</div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Root;
