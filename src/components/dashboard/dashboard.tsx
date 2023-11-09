import {
	useGetDestinationRequestsQuery,
	useGetTranscriptRequestsQuery,
} from "../../features/api/Auth/authApiSlice";
import { useState } from "react";
const Dashboard = () => {
	const [userId] = useState(localStorage.getItem("transcript-uid"));
	const { data: dataRequests }: { data: Array<any> } =
		useGetTranscriptRequestsQuery("");
	const { data: dataRequestss }: { data: Array<any> } =
		useGetDestinationRequestsQuery("");
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
											className="feather feather-link"
										>
											<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
											<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
										</svg>
									</div>
									<div className="">
										<p className="w-value">
											{
												dataRequestss?.filter((request: any) => request.userId === userId)
													.length
											}
										</p>
										<h5 className="">Total Destination Requests</h5>
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
											className="feather feather-message-circle"
										>
											<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
										</svg>
									</div>
									<div className="">
										<p className="w-value">
											{
												dataRequests?.filter((request: any) => request.userId === userId)
													.length
											}
										</p>
										<h5 className="">Total Transcript Request</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default Dashboard;
