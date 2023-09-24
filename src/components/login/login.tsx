import { useForm } from "react-hook-form";
import { useLoginUserMutation } from "../../features/api/Auth/authApiSlice";
import "./styles/dark/login.css";
import "./styles/light/login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserId } from "../../features/User/userSlice";
import image from "../../constants/image";
const Login = () => {
	const [userId] = useState(localStorage.getItem("transcript-uid"));
	const { register, handleSubmit } = useForm();
	const [loginUser, { isLoading, isError, isSuccess, data, error }] =
		useLoginUserMutation();
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const from = location.state?.from?.pathname || "/app";
	const submitForm = (data: any) => {
		console.log(data);
		loginUser(data);
	};
	useEffect(() => {
		if (userId) {
			dispatch(setUserId(userId));
			setTimeout(() => {
				navigate("/app");
			}, 2000);
		}
	}, [userId, navigate]);
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
				toast.error(error as any, { position: "top-right" });
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
												<label
													className="form-check-label"
													htmlFor="form-check-default"
												>
													Remember me
												</label>
											</div>
										</div>
									</div>

									<div className="col-12">
										<div className="mb-4">
											<button className="btn btn-secondary w-100">
												SIGN IN
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
