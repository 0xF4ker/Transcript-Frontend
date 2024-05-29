import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useSubmitDestinationRequestMutation } from "../../services/destinationRequestApiSlice";
import image from "../../constants/image";

const RequestDestination = () => {
	const selector = (state: any) => state.user;
	const { userId } = useSelector(selector);
	const navigate = useNavigate();
	const { data: userData, isLoading: isLoadingUser } = useGetUserQuery(userId);
	useEffect(() => {
		if (userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { register, handleSubmit, reset } = useForm();
	const [submitDestinationRequest, { isLoading, isError, error, isSuccess }] =
		useSubmitDestinationRequestMutation();
	const submitForm = (data: any) => {
		console.log(data);
		submitDestinationRequest({ ...data, userId });
		reset();
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Destination requested succesfully");
		}
		if (isError) {
			console.log(error);
			if (error as any) {
				toast.error(error as any, { position: "top-right" });
			} else {
				toast.error("Destination request failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
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
								<h3>Request Destination</h3>
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
				<div id="flInlineForm" className="col-lg-12 layout-top-spacing">
					<div className="statbox widget box box-shadow">
						<div className="widget-content widget-content-area p-3">
							<form
								className="row row-cols-lg-auto g-3 align-items-center"
								onSubmit={handleSubmit(submitForm)}
							>
								<div className="col-12">
									<label
										className="visually-hidden"
										htmlFor="inlineFormInputGroupDestination"
									>
										Name
									</label>
									<div className="input-group">
										<div className="input-group-text">@</div>
										<input
											type="text"
											className="form-control"
											id="inlineFormInputGroupDestination"
											placeholder="Destination Name"
											{...register("name", { required: true })}
										/>
									</div>
								</div>

								<div className="col-12">
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
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default RequestDestination;
