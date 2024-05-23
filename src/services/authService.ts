// services/authService.js

export const checkAuthStatus = async () => {
	const response = await fetch(
		"https://api.transcript.adenibuyan.com/auth/status",
		{
			credentials: "include",
		}
	);
	const data = await response.json();
	return data.valid;
};
