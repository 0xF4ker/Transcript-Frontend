// services/authService.js

export const checkAuthStatus = async () => {
	const response = await fetch("http://localhost:3001", {
		credentials: "include",
	});
	const data = await response.json();
	return data.valid;
};
