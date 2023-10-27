import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
	useGetCollegesQuery,
	useGetDepartmentsQuery,
	useRegisterUserMutation,
} from "../../features/api/Auth/authApiSlice";
import { useForm, Controller } from "react-hook-form";
import { setUserId } from "../../features/User/userSlice";
import { useDispatch } from "react-redux";
import image from "../../constants/image";

const SignUp = () => {
	const [userId] = useState(localStorage.getItem("transcript-uid"));
	const { register, handleSubmit, control } = useForm();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [registerUser, { isLoading, isError, error, isSuccess }] =
		useRegisterUserMutation();
	const { data: dataColleges = [] } = useGetCollegesQuery("");
	const { data: dataDepartments = [] } = useGetDepartmentsQuery("");
	const [filteredDepartments, setFilteredDepartments] = useState<any[]>([]);
	const from = "/login";
	const submitForm = (data: any) => {
		console.log(data);
		console.log({ ...data, role: "User", userType: "Student" });
		registerUser({ ...data, role: "User", userType: "Student" });
	};
	useEffect(() => {
		if (userId) {
			dispatch(setUserId(userId));
			setTimeout(() => {
				navigate("/dashboard/account");
			}, 2000);
		}
	}, [userId, navigate]);
	useEffect(() => {
		if (isSuccess) {
			toast.success("You succesfully registered");
			setTimeout(() => {
				navigate(from);
			}, 2000);
		}
		if (isError) {
			console.log(error);
			if (error as any) {
				toast.error(error as any, { position: "top-right" });
			} else {
				toast.error("Registration failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	return (
		<div className="auth-container d-flex">
			<div className="container mx-auto align-self-center">
				<form className="row" onSubmit={handleSubmit(submitForm)}>
					<div id="flLoginForm" className="col-lg-12 layout-spacing">
						<div className="statbox widget box box-shadow">
							<div className="widget-header">
								<div className="row">
									<div className="col-xl-12 col-md-12 col-sm-12 col-12">
										<img src={image.logo} />
									</div>
								</div>
							</div>
							<div className="widget-content widget-content-area">
								<div className="row g-3">
									<div className="col-md-6">
										<label htmlFor="inputEmail4" className="form-label">
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="inputEmail4"
											{...register("email", { required: true })}
										/>
									</div>
									<div className="col-md-6">
										<label htmlFor="inputPassword4" className="form-label">
											Password
										</label>
										<input
											type="password"
											className="form-control"
											id="inputPassword4"
											{...register("password", { required: true })}
										/>
									</div>
									<div className="col-md-6">
										<label htmlFor="inputName4" className="form-label">
											Full Name
										</label>
										<input
											type="full-name"
											className="form-control"
											id="inputName4"
											{...register("name", { required: true })}
										/>
									</div>
									<div className="col-md-6">
										<label htmlFor="inputSchoolId4" className="form-label">
											School ID
										</label>
										<input
											type="password"
											className="form-control"
											id="inputSchoolId4"
											{...register("schoolId", { required: true })}
										/>
									</div>
									<div className="col-md-6">
										<label htmlFor="inputCollege" className="form-label">
											Select College:
										</label>
										<Controller
											name="college"
											control={control}
											defaultValue="" // Set the default value here if needed
											render={({ field }) => (
												<select
													id="inputCollege"
													className="form-select"
													{...field}
													onChange={(e) => {
														const collegeName = e.target.value;
														console.log(collegeName);
														field.onChange(e);
														// Filter faculties based on the selected collegeId
														const filtered = dataDepartments?.filter(
															(department: any) =>
																department?.collegeName === collegeName
														);
														setFilteredDepartments(filtered);
													}}
												>
													<option value="">Select a college</option>
													{dataColleges?.map((college: any) => (
														<option key={college?.id} value={college?.name}>
															{college?.name}
														</option>
													))}
												</select>
											)}
										/>
									</div>

									<div className="col-md-6">
										<label htmlFor="inputFaculty" className="form-label">
											Select Department:
										</label>
										<Controller
											name="faculty"
											control={control}
											defaultValue=""
											render={({ field }) => (
												<select
													id="inputFaculty"
													className="form-select"
													{...field}
												>
													<option value="">Select a faculty</option>
													{filteredDepartments?.map((department: any) => (
														<option
															key={department?.id}
															value={department?.name}
														>
															{department?.name}
														</option>
													))}
												</select>
											)}
										/>
									</div>
									<div className="col-12">
										<div className="form-check">
											<input
												className="form-check-input"
												type="checkbox"
												id="gridCheck"
											/>
											<label className="form-check-label" htmlFor="gridCheck">
												I accept the terms and conditions
											</label>
										</div>
									</div>
									<div className="col-12">
										<button type="submit" className="btn btn-primary">
										{
													isLoading ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("SIGN UP")
												}
										</button>
									</div>
									<div className="col-12">
										<div className="text-center">
											<p className="mb-0">
												Already have an account ?{" "}
												<Link to="/login" className="text-warning">
													Sign In
												</Link>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
