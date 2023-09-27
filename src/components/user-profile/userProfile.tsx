import image from "../../constants/image";
import { useGetUserQuery } from "../../features/api/Auth/authApiSlice";
import "./styles/dark/user-profile.css";
import "./styles/light/user-profile.css";
import { useState } from "react";
const UserProfile = () => {
	const [userId] = useState(localStorage.getItem("transcript-uid"));
	const { data } = useGetUserQuery(userId);
	return (
		<>
			<div className="middle-content container-xxl p-0">
				<div className="page-meta">
					<nav className="breadcrumb-style-one" aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#">App</a>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								User
							</li>
						</ol>
					</nav>
				</div>
				<div className="mx-auto align-self-center col-xl-5 col-lg-12 col-md-12 col-sm-12 layout-top-spacing">
					<div className="user-profile">
						<div className="widget-content widget-content-area">
							<div className="d-flex justify-content-between">
								<h3 className="">Profile</h3>
								<a
									href="./user-account-settings.html"
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
											{data?.userType}
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
											<a href="mailto:example@mail.com">
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
												{data?.email}
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
