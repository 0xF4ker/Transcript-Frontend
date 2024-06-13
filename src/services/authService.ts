// services/authService.js

export const checkAuthStatus = async () => {
	const response = await fetch("https://transcript.api.adenibuyan.com", {
		credentials: "include",
	});
	const data = await response.json();
	return data.valid;
};
