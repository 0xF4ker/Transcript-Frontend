// services/authService.js

export const checkAuthStatus = async () => {
	const response = await fetch("http://localhost:3001/auth/status", {
		credentials: "include",
	});
	const data = await response.json();
	return data.valid;
};
