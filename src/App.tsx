import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Root from "./components/root/root";
import { useEffect } from "react";
import SignUp from "./components/signup/signup";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import UserProfile from "./components/user-profile/userProfile";
import Users from "./components/users/users";
import Home from "./components/home/home";
import Colleges from "./components/colleges/colleges";
import Departments from "./components/departments/departments";
import Destinations from "./components/destinations/destinations";
import TranscriptRequests from "./components/transcript-requests/transcriptRequests";
import RequestTranscript from "./components/request-transcript/requestTranscript";

function App() {
	useEffect(() => {
		// Initialize your app here
		// Call your initialization functions
	}, []);

	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/login" element={<Login />}></Route>
				<Route path="/signup" element={<SignUp />}></Route>
				<Route path="/app" element={<Root />}>
					<Route index element={<UserProfile />} />
					<Route path="users" element={<Users />} />
					<Route path="colleges" element={<Colleges />} />
					<Route path="departments" element={<Departments />} />
					<Route path="destinations" element={<Destinations />} />
					<Route path="transcript-requests" element={<TranscriptRequests />} />
					<Route path="request-transcript" element={<RequestTranscript />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
