import { useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useGetTranscriptRequestQuery } from "../../services/transcriptRequestApiSlice";
import image from "../../constants/image";

const selector = (state: any) => state.user;

const config = {
	reference: new Date().getTime().toString(),
	publicKey: "pk_test_ca94a46bdb50763f37bafb6bce8a0d6623821a23",
};

const TranscriptCheckout = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { userId } = useSelector(selector);
	const { data: userData, isSuccess: isSuccessUser } = useGetUserQuery(userId);

	useEffect(() => {
		if (isSuccessUser && userData?.isAdmin) {
			navigate("/error");
		}
	}, [isSuccessUser, userData, navigate]);

	const { data, isLoading: isLoadingRequest } = useGetTranscriptRequestQuery(id);

	const handlePaystackSuccessAction = (reference: any) => {
		// Implementation for whatever you want to do with reference and after success call.
		console.log(reference);
	};

	// you can call this function anything
	const handlePaystackCloseAction = () => {
		// implementation for  whatever you want to do when the Paystack dialog closed.
		console.log("closed");
	};

	const componentProps = {
		...config,
		email: userData?.email,
		amount: data?.total * 100,
		metadata: {
			transcriptRequestId: data?.id,
			userId: userId,
			custom_fields: [
				{
					display_name: "Invoice ID",
					variable_name: "invoice_id",
					value: 209,
				},
				{
					display_name: "Cart Items",
					variable_name: "cart_items",
					value: "3 bananas, 12 mangoes",
				},
			],
		},
		text: "Checkout",
		onSuccess: (reference: any) => handlePaystackSuccessAction(reference),
		onClose: handlePaystackCloseAction,
	};

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
								<h3>Transcript Checkout</h3>
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
									<span>English</span>
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
						<form
							className="row layout-top-spacing"
							onSubmit={(e) => e.preventDefault()}
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
													value={data?.matricNo}
													id="inputMatricNo"
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="fee" className="form-label">
													Fee
												</label>
												<input
													type="text"
													className="form-control"
													disabled
													value={data?.total}
													id="fee"
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputMethod" className="form-label">
													Transcript Type
												</label>
												<input
													type="text"
													className="form-control"
													disabled
													value={data?.TranscriptType?.name}
													id="inputMethod"
												/>
											</div>
											<div className="col-md-6">
												<label htmlFor="inputCollege" className="form-label">
													College
												</label>
												<input
													type="text"
													className="form-control"
													id="inputCollege"
													disabled
													value={data?.College?.name}
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
													value={data?.Department?.name}
												/>
											</div>
											<div className="col-12">
												<label>Destination Names</label>
												{data?.Destinations?.map((destination: any) => (
													<input
														type="text"
														className="form-control"
														disabled
														value={destination.name}
														key={destination.name}
													/>
												))}
											</div>
											<div className="col-12 layout-top-spacing">
												<PaystackButton
													className={`btn btn-primary ${isLoadingRequest && "disabled"}`}
													{...componentProps}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default TranscriptCheckout;
