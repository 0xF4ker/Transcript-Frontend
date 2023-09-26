import { useEffect } from "react";
import { useSubmitDestinationRequestMutation } from "../../features/api/Auth/authApiSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const RequestDestination = () => {
	const { register, handleSubmit, reset } = useForm();
	const [submitDestinationRequest, { isLoading, isError, error, isSuccess }] =
		useSubmitDestinationRequestMutation();
	const submitForm = (data: any) => {
		console.log(data);
		submitDestinationRequest(data);
		reset();
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Destination requested succesfully");
		}
		if (isError) {
			console.log(error);
			if ((error as any)?.data) {
				toast.error((error as any)?.data.message, { position: "top-right" });
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
											{...(register("name"), { required: true })}
										/>
									</div>
								</div>

								<div className="col-12">
									<button type="submit" className="btn btn-primary">
										Submit
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
