import "./styles/dark/alert.css";
import "./styles/light/alert.css";
import images from "../../constants/image";
import { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/User/userSlice";
import { useGetRootQuery } from "../../services/rootApiSlice";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useLogoutUserMutation } from "../../services/authApiSlice";
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
		// Create a script element
		const script = document.createElement("script");
		script.src = "/scripts/app.js"; // Replace with the path to your script
		script.async = true;

		// Append the script to the document
		document.body.appendChild(script);

		// Cleanup: Remove the script when the component unmounts
		return () => {
			document.body.removeChild(script);
		};
	}, []);
	const userId = localStorage.getItem("transcript-uid");
	const { data } = useGetUserQuery(userId);
	const [logoutUser] = useLogoutUserMutation();

	return (
		<>
			<div className="header-container container-xxl">
				<header className="header navbar navbar-expand-sm expand-header">
					<a className="sidebarCollapse">
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
							className="feather feather-menu"
						>
							<line x1="3" y1="12" x2="21" y2="12"></line>
							<line x1="3" y1="6" x2="21" y2="6"></line>
							<line x1="3" y1="18" x2="21" y2="18"></line>
						</svg>
					</a>

					<div className="search-animated toggle-search">
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
							className="feather feather-search"
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
									className="feather feather-x search-close"
								>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</div>
						</form>
						<span className="badge badge-secondary">Ctrl + /</span>
					</div>

					<ul className="navbar-item flex-row ms-lg-auto ms-0">
						<li className="nav-item theme-toggle-item">
							<a href="javascript:void(0);" className="nav-link theme-toggle">
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
									className="feather feather-moon dark-mode"
								>
									<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
								</svg>
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
									className="feather feather-sun light-mode"
								>
									<circle cx="12" cy="12" r="5"></circle>
									<line x1="12" y1="1" x2="12" y2="3"></line>
									<line x1="12" y1="21" x2="12" y2="23"></line>
									<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
									<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
									<line x1="1" y1="12" x2="3" y2="12"></line>
									<line x1="21" y1="12" x2="23" y2="12"></line>
									<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
									<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
								</svg>
							</a>
						</li>

						<li className="nav-item dropdown user-profile-dropdown  order-lg-0 order-1">
							<a
								href="javascript:void(0);"
								className="nav-link dropdown-toggle user"
								id="userProfileDropdown"
								data-bs-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								<div className="avatar-container">
									<div className="avatar avatar-sm avatar-indicators avatar-online">
										<img alt="avatar" src={images.pfp30} className="rounded-circle" />
									</div>
								</div>
							</a>

							<div
								className="dropdown-menu position-absolute"
								aria-labelledby="userProfileDropdown"
							>
								<div className="user-profile-section">
									<div className="media mx-auto">
										<div className="emoji me-2">&#x1F44B;</div>
										<div className="media-body">
											<h5>{data?.name}</h5>
											<p>{data?.userType}</p>
										</div>
									</div>
								</div>
								<div className="dropdown-item">
									<Link to="/app/user-profile">
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
										</svg>{" "}
										<span>Profile</span>
									</Link>
								</div>
								<div className="dropdown-item">
									<a
										onClick={() => {
											logoutUser("");
										}}
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
											className="feather feather-log-out"
										>
											<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
											<polyline points="16 17 21 12 16 7"></polyline>
											<line x1="21" y1="12" x2="9" y2="12"></line>
										</svg>{" "}
										<span>Log Out</span>
									</a>
								</div>
							</div>
						</li>
					</ul>
				</header>
			</div>
			<div className="main-container " id="container">
				<div className="overlay"></div>
				<div className="search-overlay"></div>
				<div className="sidebar-wrapper sidebar-theme">
					<nav id="sidebar">
						<div className="navbar-nav theme-brand flex-row  text-center">
							<div className="nav-logo">
								<div className="nav-item theme-logo">
									<Link to="/app">
										<img src={images.logo1} className="navbar-logo" alt="logo" />
									</Link>
								</div>
								<div className="nav-item theme-text">
									<Link to="/app" className="nav-link">
										{" "}
										Transcript{" "}
									</Link>
								</div>
							</div>
							<div className="nav-item sidebar-toggle">
								<div className="btn-toggle sidebarCollapse">
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
										className="feather feather-chevrons-left"
									>
										<polyline points="11 17 6 12 11 7"></polyline>
										<polyline points="18 17 13 12 18 7"></polyline>
									</svg>
								</div>
							</div>
						</div>

						<ul className="list-unstyled menu-categories" id="accordionExample">
							{data?.privileges?.map((item: any, index: number) => (
								<li
									key={index}
									className={location.pathname === item.path ? "menu active" : "menu"}
								>
									<Link to={item.path} className="dropdown-toggle">
										<div className="">
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
												className="feather feather-monitor"
											>
												<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
												<line x1="8" y1="21" x2="16" y2="21"></line>
												<line x1="12" y1="17" x2="12" y2="21"></line>
											</svg>
											<span>{`  ${item.name}`}</span>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
				<div id="content" className="main-content">
					<div className="layout-px-spacing">
						<Outlet />
					</div>

					<div className="footer-wrapper">
						<div className="footer-section f-section-1">
							<p className="">
								Copyright © <span className="dynamic-year">2022</span>{" "}
								<a
									target="_blank"
									href="https://my-portfolio-death-thekidd.vercel.app/"
								>
									Bells University of Technology, Ota
								</a>
								, All rights reserved.
							</p>
						</div>
						<div className="footer-section f-section-2">
							<p className="">
								Coded with{" "}
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
									className="feather feather-heart"
								>
									<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
								</svg>
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Root;
