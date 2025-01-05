// services/authService.js

import { localUrl } from "./baseQueryWithReauth";

export const checkAuthStatus = async () => {
	const response = await fetch(localUrl, {
		credentials: "include",
	});
	const data = await response.json();
	return data.valid;
};
