import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useReloadOnMajorNavigation = (paths: string[]) => {
	const location = useLocation();

	useEffect(() => {
		if (paths.includes(location.pathname)) {
			window.location.reload();
		}
	}, [location.pathname, paths]);
};

export default useReloadOnMajorNavigation;
