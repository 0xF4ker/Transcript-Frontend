// components/ProtectedRoute.js

import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuthStatus } from "../services/authService";

interface ProtectedRouteProps {
	children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const location = useLocation();

	useEffect(() => {
		const verifyAuth = async () => {
			const isAuthenticated = await checkAuthStatus();
			setIsAuthenticated(isAuthenticated);
		};

		verifyAuth();
	}, []);

	if (isAuthenticated === null) {
		return (
			<div className="loader">
				<div className="spinner"></div>
			</div>
		); // Or a spinner
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	return children;
};

export default ProtectedRoute;
