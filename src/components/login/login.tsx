import { useForm } from "react-hook-form";
import "./styles/dark/login.css";
import "./styles/light/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/User/userSlice";
import image from "../../constants/image";
import { useGetRootOutsideQuery } from "../../services/rootApiSlice";
import { useLoginUserMutation } from "../../services/authApiSlice";
const Login = () => {
	const { register, handleSubmit } = useForm();
	const [loginUser, { isLoading, isError, isSuccess, data, error }] =
		useLoginUserMutation();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const from = location.state?.from?.pathname || "/app/user-profile";
	const submitForm = (data: any) => {
		console.log(data);
		loginUser(data);
	};
	const { data: dataRoot } = useGetRootOutsideQuery("", {
		pollingInterval: 3000,
		refetchOnMountOrArgChange: true,
		skip: false,
	});

	useEffect(() => {
		if (dataRoot?.valid) {
			dispatch(setUserId(dataRoot?.userId));
			localStorage.setItem("transcript-uid", dataRoot?.userId);
			setTimeout(() => {
				navigate("/app/user-profile");
			}, 2000);
		} else {
			localStorage.removeItem("transcript-uid");
		}
	}, [dataRoot]);
	useEffect(() => {
		if (isSuccess) {
			toast.success("Sign in succesful");
			console.log(data);
			localStorage.setItem("transcript-uid", data?.id);
			dispatch(setUserId(data?.id));
			setTimeout(() => {
				navigate(from);
			}, 2000);
		}
		if (isError) {
			console.log(error);
			if (error as any) {
				toast.error((error as any)?.data?.error, { position: "top-right" });
			} else {
				toast.error("Login Error", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);

	return (
		<div className="auth-container d-flex">
			<div className="container mx-auto align-self-center">
				<div className="row">
					<div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
						<div className="card mt-3 mb-3">
							<div className="card-body">
								<form className="row" onSubmit={handleSubmit(submitForm)}>
									<div className="col-md-12 mb-3">
										<img src={image.logo} />
									</div>
									<div className="col-md-12">
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input
												type="email"
												className="form-control"
												{...register("email", { required: true })}
											/>
										</div>
									</div>
									<div className="col-12">
										<div className="mb-4">
											<label className="form-label">Password</label>
											<input
												type="password"
												className="form-control"
												{...register("password", { required: true })}
											/>
										</div>
									</div>
									<div className="col-12">
										<div className="mb-3">
											<div className="form-check form-check-primary form-check-inline">
												<input
													className="form-check-input me-3"
													type="checkbox"
													id="form-check-default"
												/>
												<label className="form-check-label" htmlFor="form-check-default">
													Remember me
												</label>
											</div>
										</div>
									</div>

									<div className="col-12">
										<div className="mb-4">
											<button className="btn btn-primary w-100">
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
													"SIGN IN"
												)}
											</button>
										</div>
									</div>

									{/* <div className="col-12 mb-4">
                                    <div className="">
                                        <div className="seperator">
                                            <hr/>
                                            <div className="seperator-text"> <span>Or continue with</span></div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="col-sm-4 col-12">
                                    <div className="mb-4">
                                        <button className="btn  btn-social-login w-100 ">
                                            <img src="../src/assets/img/google-gmail.svg" alt="" className="img-fluid"/>
                                            <span className="btn-text-inner">Google</span>
                                        </button>
                                    </div>
                                </div>
    
                                <div className="col-sm-4 col-12">
                                    <div className="mb-4">
                                        <button className="btn  btn-social-login w-100">
                                            <img src="../src/assets/img/github-icon.svg" alt="" className="img-fluid"/>
                                            <span className="btn-text-inner">Github</span>
                                        </button>
                                    </div>
                                </div>
    
                                <div className="col-sm-4 col-12">
                                    <div className="mb-4">
                                        <button className="btn  btn-social-login w-100">
                                            <img src="../src/assets/img/twitter.svg" alt="" className="img-fluid"/>
                                            <span className="btn-text-inner">Twitter</span>
                                        </button>
                                    </div>
                                </div> */}

									<div className="col-12">
										<div className="text-center">
											<p className="mb-0">
												Don't have an account ?{" "}
												<Link to="/signup" className="text-warning">
													Sign Up
												</Link>
											</p>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
