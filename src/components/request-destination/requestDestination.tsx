import { useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../services/userApiSlice";
import { useSubmitDestinationRequestMutation } from "../../services/destinationRequestApiSlice";

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
			<div className="middle-content container-xxl p-0">
				<div className="page-meta">
					<nav className="breadcrumb-style-one" aria-label="breadcrumb">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<a href="#">App</a>
							</li>
							<li className="breadcrumb-item active" aria-current="page">
								Request Destination
							</li>
						</ol>
					</nav>
				</div>
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
