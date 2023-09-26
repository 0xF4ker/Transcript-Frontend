import { Link } from "react-router-dom";
import image from "../../constants/image";
import "./styles/dark/error.css";
import "./styles/light/error.css";

const Error_ = () => {
	return (
		<div className="body error text-center">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-4 mr-auto mt-5 text-md-left text-center">
						<a href="index.html" className="ml-md-5">
							<img
								alt="image-404"
								src={image.logo1}
								className="dark-element theme-logo"
							/>
							<img
								alt="image-404"
								src={image.logo1}
								className="light-element theme-logo"
							/>
						</a>
					</div>
				</div>
			</div>
			<div className="container-fluid error-content">
				<div className="">
					<h1 className="error-number">404</h1>
					<p className="mini-text">Ooops!</p>
					<p className="error-text mb-5 mt-1">
						The page you requested was not found!
					</p>
					<img
						src={image.errorsvg}
						alt="cork-admin-404"
						className="error-img"
					/>
					<Link to="/app" className="btn btn-dark mt-5">
						Go Back
					</Link>
				</div>
			</div>
		</div>
	);
};
export default Error_;
