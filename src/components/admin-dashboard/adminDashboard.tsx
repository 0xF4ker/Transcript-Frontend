import { useGetTranscriptRequestsQuery, useGetUsersQuery } from "../../features/api/Auth/authApiSlice";
const AdminDashboard = () => {
	const { data }: {data: Array<any>} = useGetUsersQuery("");
    const { data: dataRequests }: {data: Array<any>} =
		useGetTranscriptRequestsQuery("");
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
								DashBoard
							</li>
						</ol>
					</nav>
				</div>
				<div className="row layout-top-spacing">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                                    <div className="widget widget-one_hybrid widget-referral">
                                        <div className="widget-heading">
                                            <div className="w-title">
                                                <div className="w-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                                                </div>
                                                <div className="">
                                                    <p className="w-value">{data?.length}</p>
                                                    <h5 className="">Total Users</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget-content">    
                                            <div className="w-chart">
                                                <div id="hybrid_followers1"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12 layout-spacing">
                                    <div className="widget widget-one_hybrid widget-engagement">
                                        <div className="widget-heading">
                                            <div className="w-title">
                                                <div className="w-icon">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-circle"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                                                </div>
                                                <div className="">
                                                    <p className="w-value">{dataRequests?.length}</p>
                                                    <h5 className="">Total Transcript Requests</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget-content">    
                                            <div className="w-chart">
                                                <div id="hybrid_followers3"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div><div className="col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 layout-spacing">
                            <div className="widget widget-table-two">
    
                                <div className="widget-heading">
                                    <h5 className="">Recent Transcript Requests</h5>
                                </div>
    
                                <div className="widget-content">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th><div className="th-content">Name</div></th>
                                                    <th><div className="th-content">Transcript Type</div></th>
                                                    <th><div className="th-content">Matric No</div></th>
                                                    <th><div className="th-content th-heading">Fee</div></th>
                                                    <th><div className="th-content">Status</div></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {dataRequests?.slice(-10)?.map((transcriptRequest: any, id: number) => (
                                                <tr key={id}>
                                                    <td><div className="td-content customer-name"><span>{transcriptRequest?.name}</span></div></td>
                                                    <td><div className="td-content product-brand text-primary">{transcriptRequest?.transcriptType}</div></td>
                                                    <td><div className="td-content product-invoice">{transcriptRequest?.matricNo}</div></td>
                                                    <td><div className="td-content pricing"><span className="">{transcriptRequest?.totalFee}</span></div></td>
                                                    <td><div className="td-content"><span className={`badge badge-${transcriptRequest?.status === "pending" ?"danger" : transcriptRequest?.status === "paid" ? "success" : transcriptRequest?.status === "shipped" ? "primary": "danger"}`}>{transcriptRequest?.status}</span></div></td>
                                                </tr>))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

				</div>
			</div>
		</>
	);
};
export default AdminDashboard;
