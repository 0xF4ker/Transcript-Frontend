import { useEffect } from "react";
import { PaystackButton } from "react-paystack";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useGetTranscriptRequestQuery } from "../../services/transcriptRequestApiSlice";
const selector = (state: any) => state.user;
const TranscriptCheckout = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const { userId } = useSelector(selector);
	const {
		data: userData,
		isSuccess: isSuccessUser,
		isLoading: isLoadingUser,
	} = useGetUserQuery(userId);
	useEffect(() => {
		if (isSuccessUser) if (userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { data, isLoading: isLoadingRequest } = useGetTranscriptRequestQuery(id);
	return (
		<div className="middle-content container-xxl p-0">
			<div className="page-meta">
				<nav className="breadcrumb-style-one" aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="#">App</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Transcript Checkout
						</li>
					</ol>
				</nav>
			</div>
			<div className="row layout-top-spacing d-flex">
				<div className="col-lg-12">
					<form className="row layout-top-spacing">
						<div id="flLoginForm" className="col-lg-12 layout-spacing">
							<div className="statbox widget box box-shadow ">
								<div className="widget-content widget-content-area p-3">
									<div className="row g-3">
										<div className="col-md-6">
											<label htmlFor="matricNo" className="form-label">
												Matric No
											</label>
											x``{" "}
											<input
												type="text"
												className="form-control"
												disabled
												value={data?.matricNo}
												id="inputMatricNo"
											/>
										</div>
										<div className="col-md-6">
											<label htmlFor="matricNo" className="form-label">
												Fee
											</label>
											x``{" "}
											<input
												type="text"
												className="form-control"
												disabled
												value={data?.totalFee}
												id="inputMatricNo"
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
												value={data?.transcriptType}
												id="inputMatricNo"
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
												value={data?.college}
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
												value={data?.department}
											/>
										</div>
										<>
											<label>Destination Names</label>
											{data?.destinations?.map((destination: any) => (
												<input
													type="text"
													className="form-control"
													disabled
													value={destination.name}
													id="inputMatricNo"
												/>
											))}
											<div className="col-12 layout-top-spacing">
												<PaystackButton
													className={`btn btn-primary ${isLoadingRequest && "disabled"}`}
													{...{
														publicKey: "pk_test_ca94a46bdb50763f37bafb6bce8a0d6623821a23",
														email: userData?.email,
														amount: data?.totalFee * 100,
														metadata: {
															transcriptRequstId: data?.id,
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
												</PaystackButton>
											</div>
										</>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
export default TranscriptCheckout;
