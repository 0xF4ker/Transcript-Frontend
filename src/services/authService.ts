// services/authService.js

import { url } from "./baseQueryWithReauth";

export const checkAuthStatus = async () => {
	const response = await fetch(url, {
		credentials: "include",
	});
	const data = await response.json();
	return data.valid;
};
