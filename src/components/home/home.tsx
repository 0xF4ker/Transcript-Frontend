import { Link } from "react-router-dom";
import "./carousel.css";
import images from "../../constants/image";

const Home = () => {
	return (
		<>
			<header>
				<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
					<a className="navbar-brand" href="#">
						<img src={images.logo1} className="navbar-logo" alt="logo" />
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarCollapse"
						aria-controls="navbarCollapse"
						aria-expanded="false"
						aria-label="Toggle navigation"
						style={{ color: "grey" }}
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarCollapse">
						{/* I want the element to be on the extreme right of the navbar */}
						<ul className="navbar-nav ml-auto ">
							<li className="nav-item">
								<Link className="nav-link btn btn-dark" to="/login">
									Sign In
								</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link btn btn-dark" to="/signup">
									Sign Up
								</Link>
							</li>
						</ul>
					</div>
				</nav>
			</header>

			<main role="main">
				<div
					id="carouselExampleCaptions"
					className="carousel slide"
					data-bs-ride="carousel"
				>
					<ol className="carousel-indicators">
						<li
							data-bs-target="#carouselExampleCaptions"
							data-bs-slide-to="0"
							className="active"
						></li>
						<li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"></li>
						<li data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"></li>
					</ol>
					<div className="carousel-inner">
						<div className="carousel-item active">
							<img
								className="d-block w-100"
								src="../src/assets/img/1.jpeg"
								alt="First slide"
							/>
							<div className="carousel-caption text-right">
								<h1>Example headline.</h1>
								<p>
									Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id
									elit non mi porta gravida at eget metus. Nullam id dolor id nibh
									ultricies vehicula ut id elit.
								</p>
								<p>
									<Link className="btn btn-lg btn-dark" to="/signup" role="button">
										Sign up today
									</Link>
								</p>
							</div>
						</div>
						<div className="carousel-item">
							<img
								className="d-block w-100"
								src="../src/assets/img/3.jpeg"
								alt="Second slide"
							/>
							<div className="carousel-caption d-none d-sm-block">
								<h3>Second slide</h3>
								<h5>Lorem ipsum dolor sit amet, dolore magna aliqua.</h5>
							</div>
						</div>
						<div className="carousel-item">
							<img
								className="d-block w-100"
								src="../src/assets/img/2.jpg"
								alt="Third slide"
							/>
							<div className="carousel-caption d-none d-sm-block">
								<h3>Third slide</h3>
								<h5>Lorem ipsum dolor sit amet, dolore magna aliqua.</h5>
							</div>
						</div>
					</div>
					<a
						className="carousel-control-prev"
						href="#carouselExampleCaptions"
						role="button"
						data-bs-slide="prev"
					>
						<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Previous</span>
					</a>
					<a
						className="carousel-control-next"
						href="#carouselExampleCaptions"
						role="button"
						data-bs-slide="next"
					>
						<span className="carousel-control-next-icon" aria-hidden="true"></span>
						<span className="visually-hidden">Next</span>
					</a>
				</div>

				<div className="container marketing">
					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7">
							<h2 className="featurette-heading">
								First featurette heading.{" "}
								<span className="text-muted">It'll blow your mind.</span>
							</h2>
							<p className="lead">
								Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula
								porta felis euismod semper. Praesent commodo cursus magna, vel
								scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
							</p>
						</div>
						<div className="col-md-5">
							<img
								className="featurette-image img-fluid mx-auto"
								data-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
							/>
						</div>
					</div>

					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7 order-md-2">
							<h2 className="featurette-heading">
								Oh yeah, it's that good.{" "}
								<span className="text-muted">See for yourself.</span>
							</h2>
							<p className="lead">
								Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula
								porta felis euismod semper. Praesent commodo cursus magna, vel
								scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
							</p>
						</div>
						<div className="col-md-5 order-md-1">
							<img
								className="featurette-image img-fluid mx-auto"
								data-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
							/>
						</div>
					</div>

					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7">
							<h2 className="featurette-heading">
								And lastly, this one. <span className="text-muted">Checkmate.</span>
							</h2>
							<p className="lead">
								Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula
								porta felis euismod semper. Praesent commodo cursus magna, vel
								scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.
							</p>
						</div>
						<div className="col-md-5">
							<img
								className="featurette-image img-fluid mx-auto"
								data-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
							/>
						</div>
					</div>

					<hr className="featurette-divider" />
				</div>
				<footer className="container">
					<p className="float-right">
						<a href="#">Back to top</a>
					</p>
					<p>
						&copy; 2017-2018 Company, Inc. &middot; <a href="#">Privacy</a> &middot;{" "}
						<a href="#">Terms</a>
					</p>
				</footer>
			</main>
		</>
	);
};

export default Home;
