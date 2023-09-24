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
												className="feather feather-map-pin me-3"
											>
												<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
												<circle cx="12" cy="10" r="3"></circle>
											</svg>
											New York, USA
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
												className="feather feather-phone me-3"
											>
												<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
											</svg>{" "}
											+1 (530) 555-12121
										</li>
									</ul>

									<ul className="list-inline mt-4">
										<li className="list-inline-item mb-0">
											<a
												className="btn btn-info btn-icon btn-rounded"
												href="javascript:void(0);"
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
													className="feather feather-twitter"
												>
													<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
												</svg>
											</a>
										</li>
										<li className="list-inline-item mb-0">
											<a
												className="btn btn-danger btn-icon btn-rounded"
												href="javascript:void(0);"
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
													className="feather feather-dribbble"
												>
													<circle cx="12" cy="12" r="10"></circle>
													<path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
												</svg>
											</a>
										</li>
										<li className="list-inline-item mb-0">
											<a
												className="btn btn-dark btn-icon btn-rounded"
												href="javascript:void(0);"
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
													className="feather feather-github"
												>
													<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
												</svg>
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
