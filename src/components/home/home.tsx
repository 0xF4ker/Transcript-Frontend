import { Link } from "react-router-dom";
import "./carousel.css";
import images from "../../constants/image";

const Home = () => {
	return (
		<>
			<header id="header">
				<div className="container-fluid">
					<nav className="navbar navbar-expand-lg navbar-light">
						<a className="navbar-brand" href="#">
							<img src={images.logo1} className="navbar-logo" alt="logo" /> Transcript
						</a>
						<button
							className="navbar-toggler"
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#navbarNav"
							aria-controls="navbarNav"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<Link className="nav-link" to="/login">
										Login
									</Link>
								</li>
								<li className="nav-item">
									<Link className="nav-link" to="/signup">
										Sign Up
									</Link>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</header>

			<main role="main">
				<section id="hero" style={{ paddingTop: 116 }} className="hero-block">
					<div id="myCarousel" className="carousel slide" data-bs-ride="carousel">
						<div className="carousel-inner">
							<div className="carousel-item active">
								<img
									src={images.hero1}
									alt="Image Description"
									width="1920"
									height="700"
								/>
								<div className="carousel-caption">
									<h2>Effortless Transcript Requests</h2>
									<p>
										Streamline the process with our user-friendly platform. Submit and
										track your transcript requests effortlessly.
									</p>
									<Link className="btn btn-primary" to="/signup">
										Sign Up <i className="fas fa-chevron-right"></i>
									</Link>
								</div>
							</div>
							<div className="carousel-item">
								<img
									src={images.hero1}
									alt="Image Description"
									width="1920"
									height="700"
								/>
								<div className="carousel-caption">
									<h2>Secure and Fast Delivery</h2>
									<p>
										Experience reliable and speedy transcript delivery. We prioritize
										security to ensure your records are handled with care.
									</p>
									<Link className="btn btn-primary" to="/signup">
										Sign Up <i className="fas fa-chevron-right"></i>
									</Link>
								</div>
							</div>
							<div className="carousel-item">
								<img
									src={images.hero1}
									alt="Image Description"
									width="1920"
									height="700"
								/>
								<div className="carousel-caption">
									<h2>24/7 Access Anywhere</h2>
									<p>
										Enjoy the convenience of accessing your transcripts anytime, anywhere.
										Our platform is available 24/7 for your convenience.
									</p>
									<Link className="btn btn-primary" to="/signup">
										Sign Up <i className="fas fa-chevron-right"></i>
									</Link>
								</div>
							</div>
						</div>
						<a
							className="carousel-control-prev"
							href="#myCarousel"
							role="button"
							data-bs-slide="prev"
						>
							<span className="carousel-control-prev-icon" aria-hidden="true"></span>
						</a>
						<a
							className="carousel-control-next"
							href="#myCarousel"
							role="button"
							data-bs-slide="next"
						>
							<span className="carousel-control-next-icon" aria-hidden="true"></span>
						</a>
					</div>
				</section>

				<div className="container marketing">
					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7">
							<h2 className="featurette-heading">
								Rapid <span className="text-muted">Processing.</span>
							</h2>
							<p className="lead">
								Experience swift transcript processing. Our advanced system ensures
								quick turnaround times, allowing you to access your records promptly.
							</p>
						</div>
						<div className="col-md-5">
							<img
								className="featurette-image img-fluid mx-auto"
								data-bs-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
								src={images.rapid}
							/>
						</div>
					</div>

					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7 order-md-2">
							<h2 className="featurette-heading">
								Secure <span className="text-muted"> Data Encryption</span>
							</h2>
							<p className="lead">
								Rest easy with our top-notch security measures. Your personal and
								academic information is encrypted and protected throughout the entire
								transcript request journey.
							</p>
						</div>
						<div className="col-md-5 order-md-1">
							<img
								className="featurette-image img-fluid mx-auto"
								data-bs-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
								src={images.secure}
							/>
						</div>
					</div>

					<hr className="featurette-divider" />

					<div className="row featurette">
						<div className="col-md-7">
							<h2 className="featurette-heading">
								User-Friendly <span className="text-muted">Interface</span>
							</h2>
							<p className="lead">
								Navigate with ease through our intuitive interface. Our user-friendly
								design simplifies the transcript request process, making it accessible
								for everyone.
							</p>
						</div>
						<div className="col-md-5">
							<img
								className="featurette-image img-fluid mx-auto"
								data-bs-src="holder.js/500x500/auto"
								alt="Generic placeholder image"
								src={images.userFriendly}
							/>
						</div>
					</div>

					<hr className="featurette-divider" />
				</div>
				<footer className="container">
					<p>
						&copy; 2023 Bells University of Technology, Ota. &middot;{" "}
						<a href="#">Privacy</a> &middot; <a href="#">Terms</a>
					</p>
				</footer>
			</main>
		</>
	);
};

export default Home;
