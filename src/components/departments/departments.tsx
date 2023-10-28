import { useEffect, useRef, useState } from "react";
import {
	useCreateDepartmentMutation,
	useDeleteDepartmentMutation,
	useEditDepartmentMutation,
	useGetCollegesQuery,
	useGetDepartmentsQuery,
	useGetUserQuery,
} from "../../features/api/Auth/authApiSlice";
import "./styles/datables.css";

import "./styles/dark/custom_dt_custom.css";
import "./styles/dark/dt-global_style.css";
import "./styles/dark/users.css";

import "./styles/light/custom_dt_custom.css";
import "./styles/light/dt-global_style.css";
import "./styles/light/users.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";
const selector = (state: any) => state.user;
const Departments = () => {
	const [isForceUpdate, setIsForceUpdate] = useState(false);
	const { userId } = useSelector(selector);
	const navigate = useNavigate();
	const {
		data: userData,
		isLoading: isLoadingUser,
		isSuccess: isSuccessUser,
	} = useGetUserQuery(userId);
	useEffect(() => {
		if (isSuccessUser) if (!userData?.isAdmin) navigate("/error");
	}, [isLoadingUser]);
	const { register, handleSubmit, control, reset } = useForm();
	const { register: registerEdit, handleSubmit: handleSubmitEdit, reset: resetEdit, setValue: setValueEdit, control: controlEdit } = useForm();
	const { register: registerDelete, setValue: setValueDelete, getValues: getValueDelete } = useForm();
	const [createDepartment, { isLoading, isError, error, isSuccess }] =
		useCreateDepartmentMutation();
	
		const [editDepartment, { isLoading: isLoadingEdit, isError: isErrorEdit, error: errorEdit, isSuccessEdit }] =
		useEditDepartmentMutation();

		const [deleteDepartment, { isLoading: isLoadingDelete, isError: isErrorDelete, error: errorDelete, isSuccess: isSuccessDelete }] =
		useDeleteDepartmentMutation();
		useEffect(() => {
			if (isSuccessDelete) {
				toast.success("Department deleted succesfully");
				setHide(false);
			}
			if (isErrorDelete) {
				console.log(errorDelete);
				if ((error as any)?.data) {
					toast.error((errorEdit as any)?.data.message, { position: "top-right" });
				} else {
					toast.error("Department delete failed", {
						position: "top-right",
					});
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isLoadingDelete]);

		const submitEditForm = (data: any) => {
			console.log(data);
			editDepartment(data);
			resetEdit();
		};
		useEffect(() => {
			if (isSuccessEdit) {
				toast.success("Department edited succesfully");
				setHide(false);
			}
			if (isErrorEdit) {
				console.log(errorEdit);
				if ((error as any)?.data) {
					toast.error((errorEdit as any)?.data.message, { position: "top-right" });
				} else {
					toast.error("Department edit failed", {
						position: "top-right",
					});
				}
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, [isLoadingEdit]);
	const [hide, setHide] = useState(false);
	const submitForm = (data: any) => {
		console.log(data);
		createDepartment(data);
		reset();
	};
	useEffect(() => {
		if (isSuccess) {
			toast.success("Department created succesfully");
			setHide(false);
		}
		if (isError) {
			console.log(error);
			if ((error as any)?.data?.message) {
				toast.error((error as any)?.data.message, { position: "top-right" });
			} else {
				toast.error("Department creation failed", {
					position: "top-right",
				});
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoading]);
	const { data, isLoading: isLoadingDepartments } = useGetDepartmentsQuery("");
	const { data: collegesData } = useGetCollegesQuery("");
	const dataTableRef = useRef(null);
	console.log(data);
	useEffect(() => {
		if (!dataTableRef.current) {
			// Create a script element
			const script = document.createElement("script");
			script.src = "/scripts/datatables.js"; // Replace with the path to your script
			script.async = true;

			// Append the script to the document
			document.body.appendChild(script);
		}
	}, []);
	useEffect(() => {
		// Initialize DataTable when the data is available and the component mounts
		if (data) {
			// Check if the DataTable container exists
			const dataTableContainer = document.getElementById("style-1");

			if (dataTableContainer) {
				// Initialize the DataTable if it hasn't been initialized yet
				if (!dataTableRef.current) {
					const c1 = ($("#style-1") as any)?.DataTable({
						headerCallback: function (e: any) {
							e.getElementsByTagName("th")[0].innerHTML = `
                        <div class="form-check form-check-primary d-block">
                            <input class="form-check-input chk-parent" type="checkbox" id="form-check-default">
                        </div>`;
						},
						columnDefs: [
							{
								targets: 0,
								width: "30px",
								className: "",
								orderable: !1,
								render: function () {
									return `
                            <div class="form-check form-check-primary d-block">
                                <input class="form-check-input child-chk" type="checkbox" id="form-check-default">
                            </div>`;
								},
							},
						],
						dom:
							"<'dt--top-section'<'row'<'col-12 col-sm-6 d-flex justify-content-sm-start justify-content-center'l><'col-12 col-sm-6 d-flex justify-content-sm-end justify-content-center mt-sm-0 mt-3'f>>>" +
							"<'table-responsive'tr>" +
							"<'dt--bottom-section d-sm-flex justify-content-sm-between text-center'<'dt--pages-count  mb-sm-0 mb-3'i><'dt--pagination'p>>",
						oLanguage: {
							oPaginate: {
								sPrevious:
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>',
								sNext:
									'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>',
							},
							sInfo: "Showing page _PAGE_ of _PAGES_",
							sSearch:
								'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
							sSearchPlaceholder: "Search...",
							sLengthMenu: "Results :  _MENU_",
						},
						lengthMenu: [5, 10, 20, 50],
						pageLength: 10,
					});

					// Store the DataTable instance in the ref
					dataTableRef.current = c1;
				}
			}
		}
	}, [data]);

	return (
		<div className="middle-content container-xxl p-0">
			<div className="page-meta">
				<nav className="breadcrumb-style-one" aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<a href="#">App</a>
						</li>
						<li className="breadcrumb-item active" aria-current="page">
							Departments
						</li>
					</ol>
				</nav>
			</div>
			<div className="row layout-top-spacing d-flex">
				<div className="col-lg-12">
					<button
						onClick={() => setHide((prev) => !prev)}
						className="btn btn-primary mb-2 me-4"
					>
						Create College
					</button>
					{hide === true ? (
						<div className="statbox widget box box-shadow layout-top-spacing">
							<div className="widget-content widget-content-area">
								<form
									className="row row-cols-lg-auto g-3 align-items-center"
									onSubmit={handleSubmit(submitForm)}
								>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormInputGroupDepartment"
										>
											Department
										</label>
										<div className="input-group">
											<div className="input-group-text">@</div>
											<input
												type="text"
												className="form-control"
												id="inlineFormInputGroupDepartment"
												placeholder="Department"
												{...register("name", { required: true })}
											/>
										</div>
									</div>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormSelectPref"
										>
											College
										</label>
										<Controller
											name="college"
											control={control}
											defaultValue=""
											render={({ field }) => (
												<select
													className="form-select"
													id="inlineFormSelectPref"
													{...field}
												>
													<option value="">Select a college</option>
													{collegesData?.map((college: any) => (
														<option key={college?.id} value={college?.name}>
															{college?.name}
														</option>
													))}
												</select>
											)}
										/>
									</div>

									<div className="col-12">
										<button type="submit" className="btn btn-primary">
										{
													isLoading ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("SUBMIT")
												}
										</button>
									</div>
								</form>
							</div>
						</div>
					) : (
						""
					)}
					<div className="statbox widget box box-shadow layout-top-spacing">
						<div className="widget-content widget-content-area">
							<table
								id="style-1"
								className="table style-1 dt-table-hover non-hover"
							>
								<thead>
									<tr>
										<th className="checkbox-column dt-no-sorting">
											{" "}
											Record no.{" "}
										</th>
										<th>Department Name</th>
										<th>College Name</th>
										<th className="text-center dt-no-sorting">Action</th>
									</tr>
								</thead>
								<tbody>
									{data?.map((department: any, id: number) => (
										<tr key={id}>
											<td className="checkbox-column"> {id} </td>
											<td className="user-name">{department?.name}</td>
											<td>{department?.collegeName}</td>
											<td className="text-center">
											<ul className="table-controls">
                                                        <li><a onClick={()=> {
															setValueEdit("name", department?.name);
															setValueEdit("id", department?.id);
															setValueEdit("college", department?.collegeName);
															setIsForceUpdate(!isForceUpdate)
														}} data-bs-toggle="modal" data-bs-target="#editDepartment" className="bs-tooltip" data-bs-placement="top" title="Edit" data-original-title="Edit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit-2 p-1 br-8 mb-1"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg></a></li>
                                                        <li><a onClick={()=> {
															setValueDelete("id", department?.id)
															setIsForceUpdate(!isForceUpdate)
															const {id} = getValueDelete()
															console.log(id)
														}} className="bs-tooltip" data-bs-toggle="modal" data-bs-target="#deleteCollege" data-bs-placement="top" title="Delete" data-original-title="Delete"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-trash p-1 br-8 mb-1"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg></a></li>
                                                    </ul>
													<div className="modal fade" id="editDepartment" tabIndex={-1} role="dialog" aria-labelledby="editDepartmentTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-xl" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="editDepartmentTitle">Edit Department</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
												<div className="statbox widget box box-shadow layout-top-spacing">
							<div className="widget-content widget-content-area">
							<form
									className="row row-cols-lg-auto g-3 align-items-center"
									onSubmit={handleSubmitEdit(submitEditForm)}
								>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormInputGroupDepartment"
										>
											Department
										</label>
										<div className="input-group">
											<div className="input-group-text">@</div>
											<input
												type="text"
												className="form-control"
												id="inlineFormInputGroupDepartment"
												placeholder="Department"
												{...registerEdit("name", { required: true })}
											/>
										</div>
									</div>
									<div className="col-12">
										<label
											className="visually-hidden"
											htmlFor="inlineFormSelectPref"
										>
											College
										</label>
										<Controller
											name="college"
											control={controlEdit}
											defaultValue=""
											render={({ field }) => (
												<select
													className="form-select"
													id="inlineFormSelectPref"
													{...field}
												>
													<option value="">Select a college</option>
													{collegesData?.map((college: any) => (
														<option key={college?.id} value={college?.name}>
															{college?.name}
														</option>
													))}
												</select>
											)}
										/>
									</div>

									<div className="col-12">
										<button type="submit" className="btn btn-primary">
										{
													isLoadingEdit ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("SUBMIT")
												}
										</button>
									</div>
								</form>
							</div>
						</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
									<div className="modal fade" id="deleteCollege" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered" role="document">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalCenterTitle">Delete Department</h5>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                                                      <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
													<input hidden {...registerDelete("id")}/>
                                                        <p className="modal-text">Do you confirm to delete?</p>
                                                </div>
                                                <div className="modal-footer">
                                                    <button className="btn btn-light-dark" data-bs-dismiss="modal">Discard</button>
                                                    <button type="button" onClick={()=>{
														const {id} = getValueDelete()
														console.log(id);
														deleteDepartment(id);
													}} className="btn btn-danger">{
													isLoadingDelete ? (<><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-loader spin me-2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg> </>): ("Delete")
												}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
											</td>
										</tr>
									))}
									{isLoadingDepartments && (
										<tr>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
											<td>
												<Skeleton
													variant="rectangular"
													width={"100%"}
													height={20}
												/>
											</td>
										</tr>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Departments;
