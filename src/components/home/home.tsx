import { Link } from "react-router-dom";
import "./carousel.css";
import images from "../../constants/image";
// import landingPageStyles from "../../global-styles/landing-page/plugins.css?inline";
import { Helmet, HelmetProvider } from "react-helmet-async";
import useScripts from "../../hooks/addscripts";
import { useEffect } from "react";
import "../../global-styles/landing-page/plugins.css";
// import { createGlobalStyle } from "styled-components";
// const GlobalStyle = createGlobalStyle`
//     ${landingPageStyles}
// `;

const Home = () => {
	const scriptUrls = [
		"/scripts/landing-page/mid-script.js",
		"/scripts/landing-page/js/main.js",
	];

	// Callback function to execute after all scripts are loaded
	const onScriptsLoaded = () => {
		console.log("All scripts loaded");
		// Any additional initialization code can go here
	};

	// Use the custom hook to add the scripts and call the callback after they are loaded
	useScripts(scriptUrls, onScriptsLoaded);
	useEffect(() => {
		console.log("MyComponent mounted");

		return () => {
			console.log("MyComponent unmounted");

			// Remove the 'magic-cursor' div added by the script
			const magicCursor = document.querySelector(".magic-cursor-wrapper");
			if (magicCursor) {
				document.body.removeChild(magicCursor);
				console.log("Removed magic-cursor element from the body");
			}
		};
	}, []);
	return (
		<>
			<HelmetProvider>
				<Helmet>
					<link rel="stylesheet" href="/styles/landing-page/plugins.css" />
				</Helmet>
			</HelmetProvider>

			<div className="box-layout">
				{/* start header */}
				<header>
					{/* start navigation */}
					<nav className="navbar navbar-expand-lg header-light bg-white disable-fixed">
						<div className="container-fluid">
							<div className="col-auto col-xl-3 col-lg-2 me-lg-0 me-auto">
								<Link className="navbar-brand" to="/">
									<img
										src={images.logo}
										data-at2x={images.logo}
										alt=""
										className="default-logo"
									/>
									<img
										src={images.logo}
										data-at2x={images.logo}
										alt=""
										className="alt-logo"
									/>
									<img
										src={images.logo}
										data-at2x={images.logo}
										alt=""
										className="mobile-logo"
									/>
								</Link>
							</div>
							<div className="col-auto col-xl-6 col-lg-8 menu-order position-static">
								<button
									className="navbar-toggler float-start"
									type="button"
									data-bs-toggle="collapse"
									data-bs-target="#navbarNav"
									aria-controls="navbarNav"
									aria-label="Toggle navigation"
								>
									<span className="navbar-toggler-line"></span>
									<span className="navbar-toggler-line"></span>
									<span className="navbar-toggler-line"></span>
									<span className="navbar-toggler-line"></span>
								</button>
								<div
									className="collapse navbar-collapse justify-content-center"
									id="navbarNav"
								>
									<ul className="navbar-nav">
										<li className="nav-item">
											<Link to="/" className="nav-link">
												Home
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/login" className="nav-link">
												Login
											</Link>
										</li>
										<li className="nav-item">
											<Link to="/signup" className="nav-link">
												Register
											</Link>
										</li>
										{/* <li className="nav-item dropdown dropdown-with-icon-style02">
											<Link to="/signup" className="nav-link">
												Register
											</Link>
											<i
												className="fa-solid fa-angle-down dropdown-toggle"
												id="navbarDropdownMenuLink"
												role="button"
												data-bs-toggle="dropdown"
												aria-expanded="false"
											></i>
											<ul
												className="dropdown-menu"
												aria-labelledby="navbarDropdownMenuLink"
											>
												<li>
													<a href="demo-corporate-services-details.html">
														<i className="line-icon-Medal-2"></i>Business planning
													</a>
												</li>
												<li>
													<a href="demo-corporate-services-details.html">
														<i className="line-icon-Archery-2"></i>Market research
													</a>
												</li>
												<li>
													<a href="demo-corporate-services-details.html">
														<i className="line-icon-Financial"></i>Business consulting
													</a>
												</li>
												<li>
													<a href="demo-corporate-services-details.html">
														<i className="line-icon-Money-Bag"></i>Audience analysis
													</a>
												</li>
											</ul>
										</li> */}
									</ul>
								</div>
							</div>
							<div className="col-auto col-xl-3 col-lg-2 text-end md-pe-0">
								<div className="header-icon">
									<div className="header-search-icon icon">
										<a href="#" className="search-form-icon header-search-form">
											<i className="feather icon-feather-search"></i>
										</a>
										{/* start search input */}
										<div className="search-form-wrapper">
											<button title="Close" type="button" className="search-close">
												×
											</button>
											<form
												id="search-form"
												role="search"
												method="get"
												className="search-form text-left"
												action="search-result.html"
											>
												<div className="search-form-box">
													<h2 className="text-dark-gray text-center fw-600 mb-4 ls-minus-1px">
														What are you looking for?
													</h2>
													<input
														className="search-input"
														id="search-form-input5e219ef164995"
														placeholder="Enter your keywords..."
														name="s"
														value=""
														type="text"
														autoComplete="off"
													/>
													<button type="submit" className="search-button">
														<i className="feather icon-feather-search" aria-hidden="true"></i>
													</button>
												</div>
											</form>
										</div>
										{/* end search input */}
									</div>
									<div className="header-button ms-20px d-none d-xl-inline-block">
										<Link
											to="/signup"
											className="btn btn-rounded btn-transparent-light-gray border-1 btn-medium btn-switch-text text-transform-none"
										>
											<span>
												<span className="btn-double-text fw-600" data-text="Sign Up">
													Sign Up
												</span>
											</span>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</nav>
					{/* end navigation */}
				</header>
				{/* end header */}
				{/* start slider */}
				<section id="slider" className="p-0 top-space-margin ">
					<div
						className="demo-corporate-slider_wrapper fullscreen-container"
						data-alias="portfolio-viewer"
						data-source="gallery"
						style={{ backgroundColor: "Background" }}
					>
						<div
							id="demo-corporate-slider"
							className="rev_slider bg-regal-blue fullscreenbanner"
							style={{ display: "none" }}
							data-version="5.3.1.6"
						>
							{/* begin slides list */}
							<ul>
								{/* minimum slide structure */}
								<li
									data-index="rs-01"
									data-transition="parallaxleft"
									data-slotamount="default"
									data-hideafterloop="0"
									data-hideslideonmobile="off"
									data-easein="default"
									data-easeout="default"
									data-masterspeed="1500"
									data-rotate="0"
									data-saveperformance="off"
									data-title="Crossfit"
									data-param1=""
									data-param2=""
									data-param3=""
									data-param4=""
									data-param5=""
									data-param6=""
									data-param7=""
									data-param8=""
									data-param9=""
									data-param10=""
									data-description=""
								>
									{/* slide's main background image */}
									<img
										src="/images/demo/demo-college-bg-01.png"
										alt="Image"
										data-bgposition="center center"
										data-bgfit="cover"
										data-bgrepeat="no-repeat"
										className="rev-slidebg"
										data-no-retina
									/>
									{/* start overlay layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper "
										id="slide-1-layer-01"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="full"
										data-height="full"
										data-whitespace="nowrap"
										data-type="shape"
										data-basealign="slide"
										data-responsive_offset="off"
										data-responsive="off"
										data-frames='[{"delay":0,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power4.easeInOut"},
                                     {"delay":"wait","speed":1000,"frame":"999","to":"opacity:0;","ease":"Power4.easeInOut"}]'
										style={{ background: "rgba(22,35,63,0.1)", zIndex: "0" }}
									></div>
									{/* end overlay layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-1-layer-02"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['900','700','700','600']"
										data-height="['900','700','700','600']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1000,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.5;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end shape layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-1-layer-03"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['1200','1000','900','800']"
										data-height="['1200','1000','900','800']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1300,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.3;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end shape layer */}
									{/* start row zone layer */}
									<div id="rrzm_638" className="rev_row_zone rev_row_zone_middle">
										{/* start row layer */}
										<div
											className="tp-caption  "
											id="slide-1-layer-04"
											data-x="['left','left','left','left']"
											data-hoffset="['0','0','0','0']"
											data-y="['middle','middle','middle','middle']"
											data-voffset="['-426','-426','-426','-426']"
											data-width="none"
											data-height="none"
											data-whitespace="nowrap"
											data-type="row"
											data-columnbreak="3"
											data-responsive_offset="on"
											data-responsive="off"
											data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
											data-textAlign="['inherit','inherit','inherit','inherit']"
											data-paddingtop="[0,0,0,0]"
											data-paddingright="[100,75,50,30]"
											data-paddingbottom="[0,0,0,0]"
											data-paddingleft="[100,75,50,30]"
										>
											{/* start column layer */}
											<div
												className="tp-caption"
												id="slide-1-layer-05"
												data-x="['left','left','left','left']"
												data-hoffset="['100','100','100','100']"
												data-y="['top','top','top','top']"
												data-voffset="['100','100','100','100']"
												data-width="none"
												data-height="none"
												data-whitespace="nowrap"
												data-type="column"
												data-responsive_offset="on"
												data-responsive="off"
												data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
												data-columnwidth="100%"
												data-verticalalign="top"
												data-textAlign="['center','center','center','center']"
											>
												{/* start subtitle layer */}
												<div
													className="tp-caption mx-auto text-uppercase"
													id="slide-1-layer-06"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['13','13','13','13']"
													data-lineheight="['20','20','20','20']"
													data-fontweight="['500','500','500','500']"
													data-letterspacing="['1','1','1','1']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['800','auto','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="off"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:-50px;opacity:0;fb:20px;","to":"o:1;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[25,25,10,10]"
													data-paddingleft="[0,0,0,0]"
													style={{ wordBreak: "initial" }}
												>
													<i className="bi bi-award pe-5px icon-small"></i>On demand live
													support
												</div>
												{/* end subtitle layer */}
												{/* start title layer */}
												<div
													className="tp-caption mx-auto"
													id="slide-1-layer-07"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['75','60','70','50']"
													data-lineheight="['70','65','75','55']"
													data-fontweight="['700','700','700','700']"
													data-letterspacing="['-2','-2','-2','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['700','600','600','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":"1500","split":"chars","splitdelay":0.03,"speed":800,"split_direction":"middletoedge","frame":"0","from":"x:50px;opacity:0;fb:10px;","to":"o:1;fb:0;","ease":"Power4.easeOut"},{"delay":"wait","speed":100,"frame":"999","to":"opacity:0;fb:0;","ease":"Power4.easeOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[33,28,35,25]"
													data-paddingleft="[0,0,0,0]"
													style={{
														wordBreak: "initial",
														textShadow: "#0b1236 3px 3px 15px",
													}}
												>
													Effortless Transcript Requests
												</div>
												{/* end title layer */}
												{/* start text layer */}
												<div
													className="tp-caption mx-auto"
													id="slide-1-layer-08"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['20','20','24','20']"
													data-lineheight="['36','36','40','30']"
													data-fontweight="['300','300','300','300']"
													data-letterspacing="['0','0','0','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['500','500','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:50px;opacity:0;fb:20px;","to":"o:0.6;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[36,36,60,40]"
													data-paddingleft="[0,0,0,0]"
												>
													Streamline the process with our user-friendly platform. Submit and
													track your transcript requests effortlessly.
												</div>
												{/* end text layer */}
												{/* start button layer */}
												<div
													className="tp-caption tp-resizeme"
													id="slide-1-layer-09"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['top','top','top','top']"
													data-voffset="['0','0','0','0']"
													data-width="auto"
													data-height="none"
													data-whitespace="nowrap"
													data-fontsize="['18','16','16','16']"
													data-lineheight="['70','55','55','55']"
													data-type="text"
													data-responsive_offset="off"
													data-responsive="off"
													data-frames='[{"delay":3000,"speed":1000,"frame":"0","from":"y:100px;opacity:0;","to":"o:1;","ease":"Power3.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
													data-textAlign="['inherit','inherit','inherit','inherit']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[75,70,65,60]"
													data-paddingbottom="[0,0,0,0]"
													data-paddingleft="[45,35,30,30]"
												>
													<Link
														to="/signup"
														className="btn btn-extra-large get-started-btn btn-rounded with-rounded btn-gradient-flamingo-amethyst-green btn-box-shadow"
													>
														Get started now
														<span className="bg-white text-base-color">
															<i className="fa-solid fa-arrow-right"></i>
														</span>
													</Link>
												</div>
												{/* end button layer */}
											</div>
											{/* end column layer */}
										</div>
										{/* end row layer */}
									</div>
									{/* end row zone layer */}
									{/* start beige background layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-base-color border-radius-50"
										id="slide-1-layer-10"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-320','-250','-250','0']"
										data-width="['122','122','120','120']"
										data-height="['122','122','120','120']"
										data-visibility="['on','on','off','off']"
										data-whitespace="nowrap"
										data-basealign="grid"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":3500,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end beige background layer */}
									{/* start beige text layer */}
									<div
										className="tp-caption d-inline-block"
										id="slide-1-layer-11"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-305','-250','-250','0']"
										data-visibility="['on','on','off','off']"
										data-fontsize="['13','13','13','13']"
										data-lineheight="['16','16','16','16']"
										data-fontweight="['500','600','600','600']"
										data-letterspacing="['0','0','0','0']"
										data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
										data-width="['100','100','100','100']"
										data-height="auto"
										data-whitespace="normal"
										data-basealign="grid"
										data-type="text"
										data-responsive_offset="on"
										data-verticalalign="middle"
										data-responsive="on"
										data-frames='[{"delay":3700,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['center','center','center','center']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[33,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ wordBreak: "initial" }}
									>
										<i className="bi bi-patch-check-fill icon-extra-medium d-block pb-10px"></i>{" "}
										<span className="d-block text-uppercase">Decided quality</span>
									</div>
									{/* end beige text layer */}
								</li>
								<li
									data-index="rs-02"
									data-transition="parallaxleft"
									data-slotamount="default"
									data-hideafterloop="0"
									data-hideslideonmobile="off"
									data-easein="default"
									data-easeout="default"
									data-masterspeed="1500"
									data-rotate="0"
									data-saveperformance="off"
									data-title="Crossfit"
									data-param1=""
									data-param2=""
									data-param3=""
									data-param4=""
									data-param5=""
									data-param6=""
									data-param7=""
									data-param8=""
									data-param9=""
									data-param10=""
									data-description=""
								>
									{/* slide's main background image */}
									<img
										src="/images/demo/demo-college-bg-02.webp"
										alt="Image"
										data-bgposition="center center"
										data-bgfit="cover"
										data-bgrepeat="no-repeat"
										className="rev-slidebg"
										data-no-retina
									/>
									{/* start overlay layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper "
										id="slide-2-layer-01"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="full"
										data-height="full"
										data-whitespace="nowrap"
										data-type="shape"
										data-basealign="slide"
										data-responsive_offset="off"
										data-responsive="off"
										data-frames='[{"delay":0,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power4.easeInOut"},
                                     {"delay":"wait","speed":1000,"frame":"999","to":"opacity:0;","ease":"Power4.easeInOut"}]'
										style={{ background: "rgba(22,35,63,0.1)", zIndex: "0" }}
									></div>
									{/* end overlay layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-2-layer-02"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['900','700','700','600']"
										data-height="['900','700','700','600']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1000,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.5;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end shape layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-2-layer-03"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['1200','1000','900','800']"
										data-height="['1200','1000','900','800']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1300,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.3;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end shape layer */}
									{/* start row zone layer */}
									<div id="rrzm_639" className="rev_row_zone rev_row_zone_middle">
										{/* start row layer */}
										<div
											className="tp-caption  "
											id="slide-2-layer-04"
											data-x="['left','left','left','left']"
											data-hoffset="['0','0','0','0']"
											data-y="['middle','middle','middle','middle']"
											data-voffset="['-426','-426','-426','-426']"
											data-width="none"
											data-height="none"
											data-whitespace="nowrap"
											data-type="row"
											data-columnbreak="3"
											data-responsive_offset="on"
											data-responsive="off"
											data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
											data-textAlign="['inherit','inherit','inherit','inherit']"
											data-paddingtop="[0,0,0,0]"
											data-paddingright="[100,75,50,30]"
											data-paddingbottom="[0,0,0,0]"
											data-paddingleft="[100,75,50,30]"
										>
											{/* start column layer */}
											<div
												className="tp-caption"
												id="slide-2-layer-05"
												data-x="['left','left','left','left']"
												data-hoffset="['100','100','100','100']"
												data-y="['top','top','top','top']"
												data-voffset="['100','100','100','100']"
												data-width="none"
												data-height="none"
												data-whitespace="nowrap"
												data-type="column"
												data-responsive_offset="on"
												data-responsive="off"
												data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
												data-columnwidth="100%"
												data-verticalalign="top"
												data-textAlign="['center','center','center','center']"
											>
												{/* start subtitle layer */}
												<div
													className="tp-caption mx-auto text-uppercase"
													id="slide-2-layer-06"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['13','13','13','13']"
													data-lineheight="['20','20','20','20']"
													data-fontweight="['500','500','500','500']"
													data-letterspacing="['1','1','1','1']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['800','auto','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="off"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:-50px;opacity:0;fb:20px;","to":"o:1;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[25,25,10,10]"
													data-paddingleft="[0,0,0,0]"
													style={{ wordBreak: "initial" }}
												>
													<i className="bi bi-award pe-5px icon-small"></i>On demand live
													support
												</div>
												{/* end subtitle layer */}
												{/* start title layer */}
												<div
													className="tp-caption mx-auto"
													id="slide-2-layer-07"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['75','60','70','50']"
													data-lineheight="['70','65','75','55']"
													data-fontweight="['700','700','700','700']"
													data-letterspacing="['-2','-2','-2','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['700','600','600','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":"1500","split":"chars","splitdelay":0.03,"speed":800,"split_direction":"middletoedge","frame":"0","from":"x:50px;opacity:0;fb:10px;","to":"o:1;fb:0;","ease":"Power4.easeOut"},{"delay":"wait","speed":100,"frame":"999","to":"opacity:0;fb:0;","ease":"Power4.easeOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[33,28,35,25]"
													data-paddingleft="[0,0,0,0]"
													style={{
														wordBreak: "initial",
														textShadow: "#0b1236 3px 3px 15px",
													}}
												>
													Secure and Fast Delivery
												</div>
												{/* end title layer */}
												{/* start text layer */}
												<div
													className="tp-caption mx-auto"
													id="slide-2-layer-08"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['20','20','24','20']"
													data-lineheight="['36','36','40','30']"
													data-fontweight="['300','300','300','300']"
													data-letterspacing="['0','0','0','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['500','500','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:50px;opacity:0;fb:20px;","to":"o:0.6;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[36,36,60,40]"
													data-paddingleft="[0,0,0,0]"
												>
													Experience reliable and speedy transcript delivery. We prioritize
													security to ensure your records are handled with care.
												</div>
												{/* end text layer */}
												{/* start button layer */}
												<div
													className="tp-caption tp-resizeme"
													id="slide-2-layer-09"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['top','top','top','top']"
													data-voffset="['0','0','0','0']"
													data-width="auto"
													data-height="none"
													data-whitespace="nowrap"
													data-fontsize="['18','16','16','16']"
													data-lineheight="['70','55','55','55']"
													data-type="text"
													data-responsive_offset="off"
													data-responsive="off"
													data-frames='[{"delay":3000,"speed":1000,"frame":"0","from":"y:100px;opacity:0;","to":"o:1;","ease":"Power3.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
													data-textAlign="['inherit','inherit','inherit','inherit']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[75,70,65,60]"
													data-paddingbottom="[0,0,0,0]"
													data-paddingleft="[45,35,30,30]"
												>
													<Link
														to="/signup"
														className="btn btn-extra-large get-started-btn btn-rounded with-rounded btn-gradient-flamingo-amethyst-green btn-box-shadow"
													>
														Get started now
														<span className="bg-white text-base-color">
															<i className="fa-solid fa-arrow-right"></i>
														</span>
													</Link>
												</div>
												{/* end button layer */}
											</div>
											{/* end column layer */}
										</div>
										{/* end row layer */}
									</div>
									{/* end row zone layer */}
									{/* start beige background layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-base-color border-radius-50"
										id="slide-2-layer-10"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-320','-250','-250','0']"
										data-width="['122','122','120','120']"
										data-height="['122','122','120','120']"
										data-visibility="['on','on','off','off']"
										data-whitespace="nowrap"
										data-basealign="grid"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":3500,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end beige background layer */}
									{/* start beige text layer */}
									<div
										className="tp-caption d-inline-block"
										id="slide-2-layer-11"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-305','-250','-250','0']"
										data-visibility="['on','on','off','off']"
										data-fontsize="['13','13','13','13']"
										data-lineheight="['16','16','16','16']"
										data-fontweight="['500','600','600','600']"
										data-letterspacing="['0','0','0','0']"
										data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
										data-width="['100','100','100','100']"
										data-height="auto"
										data-whitespace="normal"
										data-basealign="grid"
										data-type="text"
										data-responsive_offset="on"
										data-verticalalign="middle"
										data-responsive="on"
										data-frames='[{"delay":3700,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['center','center','center','center']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[33,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ wordBreak: "initial" }}
									>
										<i className="bi bi-patch-check-fill icon-extra-medium d-block pb-10px"></i>{" "}
										<span className="d-block text-uppercase">Decided quality</span>
									</div>
									{/* end beige text layer */}
								</li>
								<li
									data-index="rs-03"
									data-transition="parallaxleft"
									data-slotamount="default"
									data-hideafterloop="0"
									data-hideslideonmobile="off"
									data-easein="default"
									data-easeout="default"
									data-masterspeed="1500"
									data-rotate="0"
									data-saveperformance="off"
									data-title="Crossfit"
									data-param1=""
									data-param2=""
									data-param3=""
									data-param4=""
									data-param5=""
									data-param6=""
									data-param7=""
									data-param8=""
									data-param9=""
									data-param10=""
									data-description=""
								>
									{/* slide's main background image */}
									<img
										src="/images/demo/demo-college-bg-03.jpg"
										alt="Image"
										data-bgposition="center center"
										data-bgfit="cover"
										data-bgrepeat="no-repeat"
										className="rev-slidebg"
										data-no-retina
									/>
									{/* start overlay layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper "
										id="slide-3-layer-01"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="full"
										data-height="full"
										data-whitespace="nowrap"
										data-type="shape"
										data-basealign="slide"
										data-responsive_offset="off"
										data-responsive="off"
										data-frames='[{"delay":0,"speed":1000,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power4.easeInOut"},
                                     {"delay":"wait","speed":1000,"frame":"999","to":"opacity:0;","ease":"Power4.easeInOut"}]'
										style={{ background: "rgba(22,35,63,0.1)", zIndex: "0" }}
									></div>
									{/* end overlay layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-3-layer-02"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['900','700','700','600']"
										data-height="['900','700','700','600']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1000,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.5;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end shape layer */}
									{/* start shape layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-regal-blue border-radius-50"
										id="slide-3-layer-03"
										data-x="['center','center','center','center']"
										data-hoffset="['0','0','0','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['0','0','0','0']"
										data-width="['1200','1000','900','800']"
										data-height="['1200','1000','900','800']"
										data-whitespace="nowrap"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":1300,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:0.3;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									<div id="rrzm_640" className="rev_row_zone rev_row_zone_middle">
										<div
											className="tp-caption  "
											id="slide-3-layer-04"
											data-x="['left','left','left','left']"
											data-hoffset="['0','0','0','0']"
											data-y="['middle','middle','middle','middle']"
											data-voffset="['-426','-426','-426','-426']"
											data-width="none"
											data-height="none"
											data-whitespace="nowrap"
											data-type="row"
											data-columnbreak="3"
											data-responsive_offset="on"
											data-responsive="off"
											data-frames='[{"delay":10,"speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
											data-textAlign="['inherit','inherit','inherit','inherit']"
											data-paddingtop="[0,0,0,0]"
											data-paddingright="[100,75,50,30]"
											data-paddingbottom="[0,0,0,0]"
											data-paddingleft="[100,75,50,30]"
										>
											<div
												className="tp-caption"
												id="slide-3-layer-05"
												data-x="['left','left','left','left']"
												data-hoffset="['100','100','100','100']"
												data-y="['top','top','top','top']"
												data-voffset="['100','100','100','100']"
												data-width="none"
												data-height="none"
												data-whitespace="nowrap"
												data-type="column"
												data-responsive_offset="on"
												data-responsive="off"
												data-frames='[{"delay":"+0","speed":300,"frame":"0","from":"opacity:0;","to":"o:1;","ease":"Power3.easeInOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
												data-columnwidth="100%"
												data-verticalalign="top"
												data-textAlign="['center','center','center','center']"
											>
												<div
													className="tp-caption mx-auto text-uppercase"
													id="slide-3-layer-06"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['13','13','13','13']"
													data-lineheight="['20','20','20','20']"
													data-fontweight="['500','500','500','500']"
													data-letterspacing="['1','1','1','1']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['800','auto','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="off"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:-50px;opacity:0;fb:20px;","to":"o:1;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[25,25,10,10]"
													data-paddingleft="[0,0,0,0]"
													style={{ wordBreak: "initial" }}
												>
													<i className="bi bi-award pe-5px icon-small"></i>On demand live
													support
												</div>
												<div
													className="tp-caption mx-auto"
													id="slide-3-layer-07"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['75','60','70','50']"
													data-lineheight="['70','65','75','55']"
													data-fontweight="['700','700','700','700']"
													data-letterspacing="['-2','-2','-2','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['700','600','600','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":"1500","split":"chars","splitdelay":0.03,"speed":800,"split_direction":"middletoedge","frame":"0","from":"x:50px;opacity:0;fb:10px;","to":"o:1;fb:0;","ease":"Power4.easeOut"},{"delay":"wait","speed":100,"frame":"999","to":"opacity:0;fb:0;","ease":"Power4.easeOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[33,28,35,25]"
													data-paddingleft="[0,0,0,0]"
													style={{
														wordBreak: "initial",
														textShadow: "#0b1236 3px 3px 15px",
													}}
												>
													User-Friendly Interface
												</div>
												{/* end title layer */}
												{/* start text layer */}
												{/*  */}
												<div
													className="tp-caption mx-auto"
													id="slide-3-layer-08"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['middle','middle','middle','middle']"
													data-voffset="['0','0','0','0']"
													data-fontsize="['20','20','24','20']"
													data-lineheight="['36','36','40','30']"
													data-fontweight="['300','300','300','300']"
													data-letterspacing="['0','0','0','0']"
													data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
													data-width="['500','500','auto','auto']"
													data-height="auto"
													data-whitespace="normal"
													data-basealign="grid"
													data-type="text"
													data-responsive_offset="off"
													data-verticalalign="middle"
													data-responsive="on"
													data-frames='[{"delay":2500,"speed":800,"frame":"0","from":"y:50px;opacity:0;fb:20px;","to":"o:0.6;fb:0;","ease":"power3.inOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"power3.inOut"}]'
													data-textAlign="['center','center','center','center']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[0,0,0,0]"
													data-paddingbottom="[36,36,60,40]"
													data-paddingleft="[0,0,0,0]"
												>
													Navigate with ease through our intuitive interface. Our
													user-friendly design simplifies the transcript request process,
													making it accessible for everyone.z
												</div>
												{/* end text layer */}
												{/* start button layer */}
												<div
													className="tp-caption tp-resizeme"
													id="slide-3-layer-09"
													data-x="['center','center','center','center']"
													data-hoffset="['0','0','0','0']"
													data-y="['top','top','top','top']"
													data-voffset="['0','0','0','0']"
													data-width="auto"
													data-height="none"
													data-whitespace="nowrap"
													data-fontsize="['18','16','16','16']"
													data-lineheight="['70','55','55','55']"
													data-type="text"
													data-responsive_offset="off"
													data-responsive="off"
													data-frames='[{"delay":3000,"speed":1000,"frame":"0","from":"y:100px;opacity:0;","to":"o:1;","ease":"Power3.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
													data-textAlign="['inherit','inherit','inherit','inherit']"
													data-paddingtop="[0,0,0,0]"
													data-paddingright="[75,70,65,60]"
													data-paddingbottom="[0,0,0,0]"
													data-paddingleft="[45,35,30,30]"
												>
													<a
														href="#"
														className="btn btn-extra-large get-started-btn btn-rounded with-rounded btn-gradient-flamingo-amethyst-green btn-box-shadow"
													>
														Get started now
														<span className="bg-white text-base-color">
															<i className="fa-solid fa-arrow-right"></i>
														</span>
													</a>
												</div>
												{/* end button layer */}
											</div>
											{/* end column layer */}
										</div>
										{/* end row layer */}
									</div>
									{/* end row zone layer */}
									{/* start beige background layer */}
									<div
										className="tp-caption tp-shape tp-shapewrapper tp-resizeme bg-base-color border-radius-50"
										id="slide-3-layer-10"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-320','-250','-250','0']"
										data-width="['122','122','120','120']"
										data-height="['122','122','120','120']"
										data-visibility="['on','on','off','off']"
										data-whitespace="nowrap"
										data-basealign="grid"
										data-type="shape"
										data-responsive_offset="on"
										data-frames='[{"delay":3500,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['inherit','inherit','inherit','inherit']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[0,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ zIndex: "0" }}
									></div>
									{/* end beige background layer */}
									{/* start beige text layer */}
									<div
										className="tp-caption d-inline-block"
										id="slide-3-layer-11"
										data-x="['center','center','center','center']"
										data-hoffset="['510','410','310','0']"
										data-y="['middle','middle','middle','middle']"
										data-voffset="['-305','-250','-250','0']"
										data-visibility="['on','on','off','off']"
										data-fontsize="['13','13','13','13']"
										data-lineheight="['16','16','16','16']"
										data-fontweight="['500','600','600','600']"
										data-letterspacing="['0','0','0','0']"
										data-color="['#ffffff','#ffffff','#ffffff','#ffffff']"
										data-width="['100','100','100','100']"
										data-height="auto"
										data-whitespace="normal"
										data-basealign="grid"
										data-type="text"
										data-responsive_offset="on"
										data-verticalalign="middle"
										data-responsive="on"
										data-frames='[{"delay":3700,"speed":1000,"frame":"0","from":"x:0px;y:50px;rX:0deg;rY:0deg;rZ:0deg;sX:0.5;sY:0.5;opacity:0;","to":"o:1;","ease":"Back.easeOut"},{"delay":"wait","speed":300,"frame":"999","to":"opacity:0;","ease":"Power3.easeInOut"}]'
										data-textAlign="['center','center','center','center']"
										data-paddingtop="[0,0,0,0]"
										data-paddingright="[0,0,0,0]"
										data-paddingbottom="[33,0,0,0]"
										data-paddingleft="[0,0,0,0]"
										style={{ wordBreak: "initial" }}
									>
										<i className="bi bi-patch-check-fill icon-extra-medium d-block pb-10px"></i>{" "}
										<span className="d-block text-uppercase">Decided quality</span>
									</div>
									{/* end beige text layer */}
								</li>
							</ul>
							<div
								className="tp-bannertimer"
								style={{
									height: "10px",
									backgroundColor: "rgba(0, 0, 0, 0.10)",
									zIndex: "98",
								}}
							></div>
						</div>
					</div>
				</section>
				{/* end slider */}
				{/* start section */}
				<section className="p-0 border-bottom border-color-extra-medium-gray">
					<div className="container">
						<div
							className="row row-cols-1 row-cols-md-3 row-cols-sm-2 justify-content-center"
							data-anime='{ "el": "childs", "translateX": [50, 0], "opacity": [0,1], "duration": 800, "delay": 0, "staggervalue": 500, "easing": "easeOutQuad" }'
						>
							{/* start content box item */}
							<div className="col pt-35px pb-35px md-pb-0 text-dark-gray border-end border-color-extra-medium-gray sm-border-end-0">
								<div className="d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start">
									<div className="flex-shrink-0 me-15px md-me-0">
										<h2 className="mb-0 fw-800">
											99<sup className="fs-24">%</sup>
										</h2>
									</div>
									<div>
										<span className="lh-24 fw-600 d-block">
											Track and analyze <br />
											transcript requests.
										</span>
									</div>
								</div>
							</div>
							{/* end content box item */}
							{/* start content box item */}
							<div className="col pt-35px pb-35px md-pb-0 text-dark-gray border-end border-color-extra-medium-gray sm-border-end-0">
								<div className="d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start">
									<div className="flex-shrink-0 me-15px md-me-0">
										<h2 className="mb-0 fw-800 ls-minus-3px">4.98</h2>
									</div>
									<div>
										<div className="review-star-icon fs-20 d-inline-block text-gradient-orange-sky-blue">
											<i className="bi bi-star-fill"></i>
											<i className="bi bi-star-fill"></i>
											<i className="bi bi-star-fill"></i>
											<i className="bi bi-star-fill"></i>
											<i className="bi bi-star-fill"></i>
										</div>
										<span className="lh-24 fw-600 d-block">User Satisfaction</span>
									</div>
								</div>
							</div>
							{/* end content box item */}
							{/* start content box item */}
							<div className="col pt-35px pb-35px text-dark-gray">
								<div className="d-flex flex-column flex-lg-row align-items-center justify-content-center text-center text-lg-start">
									<div className="flex-shrink-0 me-15px md-me-0">
										<h2 className="mb-0 fw-800">
											98<sup className="fs-24">%</sup>
										</h2>
									</div>
									<div>
										<span className="lh-24 fw-600 d-block">
											Fast and <br /> Secure Algorithm
										</span>
									</div>
								</div>
							</div>
							{/* end content box item */}
						</div>
					</div>
				</section>
				{/* end section */}
				{/* start section */}
				{false && (
					<section>
						<div className="container">
							<div className="row justify-content-center align-items-center mb-6 sm-pb-9">
								<div
									className="col-lg-6 col-md-9 position-relative md-mb-15 text-center text-lg-start"
									data-anime='{ "el": "childs", "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 15, "easing": "easeOutQuad" }'
								>
									<div className="absolute-middle-center z-index-9 counter-style-02 text-center">
										<span className="fs-160 fw-800 text-dark-gray ls-minus-10px xs-ls-minus-5px position-relative lg-fs-130 xs-fs-75">
											28
											<sub className="align-top fs-80 lg-fs-70 text-dark-gray position-relative top-minus-3px">
												+
											</sub>
										</span>
										<span className="d-block mx-auto fs-20 fw-500 lh-26 w-70 text-center text-dark-gray xs-w-100">
											Years working experience
										</span>
									</div>
									<img src="images/demo-corporate-03.png" alt="" />
									<img
										src="/images/demo/demo-corporate-01.png"
										className="position-absolute top-50 left-minus-100px lg-left-minus-40px sm-left-minus-30px lg-w-50 sm-w-55"
										data-bottom-top="transform: translateY(50px)"
										data-top-bottom="transform: translateY(-220px)"
										alt=""
									/>
									<img
										src="images/demo-corporate-02.png"
										className="position-absolute top-0px xl-top-minus-10px w-170px right-20px md-right-40px xs-w-40"
										data-bottom-top="transform: translateY(-50px)"
										data-top-bottom="transform: translateY(50px)"
										alt=""
									/>
								</div>
								<div
									className="col-lg-6 ps-6 text-center text-lg-start lg-ps-15px"
									data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
								>
									<span className="ps-25px pe-25px mb-20px text-uppercase text-base-color fs-14 lh-42px fw-700 border-radius-100px bg-gradient-very-light-gray-transparent d-inline-block">
										Creative approach
									</span>
									<h3 className="text-dark-gray fw-700 ls-minus-1px">
										Powerful agency for corporate business.
									</h3>
									<p className="w-80 xl-w-90 lg-w-100 mb-40px sm-mb-25px">
										We strive to develop real-world web solutions that are ideal for small
										to large projects with bespoke project requirements. We create
										compelling web designs, which are the right-fit for your target groups
										and also deliver optimized.
									</p>
									<a
										href="demo-corporate-about.html"
										className="btn btn-large btn-dark-gray btn-hover-animation-switch btn-box-shadow btn-rounded me-25px xs-me-0"
									>
										<span>
											<span className="btn-text">Read about us</span>
											<span className="btn-icon">
												<i className="feather icon-feather-arrow-right"></i>
											</span>
											<span className="btn-icon">
												<i className="feather icon-feather-arrow-right"></i>
											</span>
										</span>
									</a>
									<span className="text-dark-gray fw-700 ls-minus-05px d-block d-sm-inline-block sm-mt-15px">
										<a href="tel:1800222000">
											<i className="feather icon-feather-phone-call me-10px"></i>1 800 222
											000
										</a>
									</span>
								</div>
							</div>
							<div
								className="row row-cols-1 row-cols-md-4 row-cols-sm-2 justify-content-center counter-style-07 ps-3 pe-3"
								data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
							>
								{/* start counter item */}
								<div className="col text-center sm-mb-30px">
									<h2
										className="vertical-counter d-inline-flex text-dark-gray fw-800 mb-0 ls-minus-3px position-relative z-index-0"
										data-to="4586"
									>
										<span className="text-highlight position-absolute bottom-9px w-100">
											<span className="bg-gradient-flamingo-amethyst-green h-10px opacity-2"></span>
										</span>
									</h2>
									<span className="d-block fs-14 fw-700 text-uppercase text-dark-gray">
										Telephonic talk
									</span>
								</div>
								{/* end counter item */}
								{/* start counter item */}
								<div className="col text-center sm-mb-30px">
									<h2
										className="vertical-counter d-inline-flex text-dark-gray fw-800 mb-0 ls-minus-3px position-relative z-index-0"
										data-to="583"
									>
										<span className="text-highlight position-absolute bottom-9px w-100">
											<span className="bg-gradient-flamingo-amethyst-green h-10px opacity-2"></span>
										</span>
									</h2>
									<span className="d-block fs-14 fw-700 text-uppercase text-dark-gray">
										Cases solved
									</span>
								</div>
								{/* end counter item */}
								{/* start counter item */}
								<div className="col text-center sm-mb-30px">
									<h2
										className="vertical-counter d-inline-flex text-dark-gray fw-800 mb-0 ls-minus-3px position-relative z-index-0"
										data-to="6548"
									>
										<span className="text-highlight position-absolute bottom-9px w-100">
											<span className="bg-gradient-flamingo-amethyst-green h-10px opacity-2"></span>
										</span>
									</h2>
									<span className="d-block fs-14 fw-700 text-uppercase text-dark-gray">
										Cofee cups
									</span>
								</div>
								{/* end counter item */}
								{/* start counter item */}
								<div className="col text-center">
									<h2
										className="vertical-counter d-inline-flex text-dark-gray fw-800 mb-0 ls-minus-3px position-relative z-index-0"
										data-to="836"
									>
										<span className="text-highlight position-absolute bottom-9px w-100">
											<span className="bg-gradient-flamingo-amethyst-green h-10px opacity-2"></span>
										</span>
									</h2>
									<span className="d-block fs-14 fw-700 text-uppercase text-dark-gray">
										Happy clients
									</span>
								</div>
								{/* end counter item */}
							</div>
						</div>
					</section>
				)}

				{/* end section */}
				{/* start section */}
				{false && (
					<section className="overflow-hidden bg-regal-blue position-relative border-radius-6px lg-border-radius-0px z-index-0">
						<img
							src="/images/demo/demo-corporate-bg-01.png"
							className="position-absolute top-minus-150px left-minus-30px z-index-minus-1"
							data-bottom-top="transform: rotate(0deg) translateY(0)"
							data-top-bottom="transform:rotate(-20deg) translateY(0)"
							alt=""
						/>
						<div className="container">
							<div className="row align-items-center mb-6 sm-mb-9 text-center text-lg-start">
								<div className="col-lg-5 md-mb-20px">
									<span className="ps-25px pe-25px mb-10px text-uppercase text-white fs-13 lh-42px fw-600 border-radius-100px bg-gradient-blue-whale-transparent d-inline-block">
										Creative approach
									</span>
									<h3 className="text-white fw-700 mb-0 ls-minus-1px">
										Corporate services
									</h3>
								</div>
								<div className="col-lg-5 last-paragraph-no-margin md-mb-20px">
									<p className="w-85 md-w-100">
										We strive to develop real-world web solutions that are ideal for small
										to large projects with bespoke your custom project requirements.
									</p>
								</div>
								<div className="col-lg-2 d-flex justify-content-center justify-content-lg-end">
									{/* start slider navigation */}
									<div className="slider-one-slide-prev-1 icon-extra-medium text-white swiper-button-prev slider-navigation-style-04 border border-1 border-color-transparent-white-light">
										<i className="feather icon-feather-chevron-left"></i>
									</div>
									<div className="slider-one-slide-next-1 icon-extra-medium text-white swiper-button-next slider-navigation-style-04 border border-1 border-color-transparent-white-light">
										<i className="feather icon-feather-chevron-right"></i>
									</div>
								</div>
							</div>
							<div className="row align-items-center mb-6">
								<div className="col-12">
									<div className="outside-box-right-25 sm-outside-box-right-0">
										<div
											className="swiper magic-cursor slider-one-slide"
											data-slider-options='{ "slidesPerView": 1, "spaceBetween": 30, "loop": true, "navigation": { "nextEl": ".slider-one-slide-next-1", "prevEl": ".slider-one-slide-prev-1" }, "autoplay": { "delay": 4000, "disableOnInteraction": false }, "keyboard": { "enabled": true, "onlyInViewport": true }, "breakpoints": { "1200": { "slidesPerView": 4 }, "992": { "slidesPerView": 3 }, "768": { "slidesPerView": 2 }, "320": { "slidesPerView": 1 } }, "effect": "slide" }'
										>
											<div className="swiper-wrapper">
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-01.jpg" alt="" />
														<div className="opacity-extra-medium bg-gradient-dark-transparent"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Creativity
																</div>
																<i className="line-icon-Medal-2 text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Business planning
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Innovative solutions
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												]
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-02.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Flexible
																</div>
																<i className="line-icon-Archery-2 text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">Market research</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Competitors research
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-03.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Discover
																</div>
																<i className="line-icon-Financial text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Business consulting
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Targeted growth
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-04.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Modern
																</div>
																<i className="line-icon-Money-Bag text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Audience analysis
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Competitors research
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-01.jpg" alt="" />
														<div className="opacity-extra-medium bg-gradient-dark-transparent"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Creativity
																</div>
																<i className="line-icon-Medal-2 text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Business planning
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Innovative solutions
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-02.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Flexible
																</div>
																<i className="line-icon-Archery-2 text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">Market research</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Competitors research
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-03.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Discover
																</div>
																<i className="line-icon-Financial text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Business consulting
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Targeted growth
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
												<div className="swiper-slide">
													<div className="interactive-banner-style-09 border-radius-6px overflow-hidden position-relative">
														<img src="/images/demo/demo-corporate-slider-img-04.jpg" alt="" />
														<div className="opacity-very-light bg-slate-blue"></div>
														<div className="image-content h-100 w-100 ps-15 pe-15 pt-13 pb-13 md-p-10 d-flex justify-content-bottom align-items-start flex-column">
															<div className="hover-label-icon position-relative z-index-9">
																<div className="label bg-base-color fw-600 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 ls-05px">
																	Modern
																</div>
																<i className="line-icon-Money-Bag text-white icon-extra-large"></i>
															</div>
															<div className="mt-auto d-flex align-items-start w-100 z-index-1 position-relative overflow-hidden flex-column">
																<span className="text-white fw-600 fs-20">
																	Audience analysis
																</span>
																<span className="content-title text-white fs-13 fw-500 text-uppercase ls-05px">
																	Competitors research
																</span>
																<a
																	href="demo-corporate-services-details.html"
																	className="content-title-hover fs-13 lh-24 fw-500 ls-05px text-uppercase text-white opacity-6 text-decoration-line-bottom"
																>
																	Explore services
																</a>
																<span className="content-arrow lh-42px rounded-circle bg-white w-50px h-50px ms-20px text-center">
																	<i className="fa-solid fa-chevron-right text-dark-gray fs-16"></i>
																</span>
															</div>
															<div className="position-absolute left-0px top-0px w-100 h-100 bg-gradient-regal-blue-transparent opacity-9"></div>
															<div className="box-overlay bg-gradient-base-color-transparent"></div>
															<a
																href="demo-corporate-services-details.html"
																className="position-absolute z-index-1 top-0px left-0px h-100 w-100"
															></a>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-12 text-center">
									<i className="bi bi-envelope text-white d-inline-block align-middle icon-extra-medium me-10px md-m-5px"></i>
									<div className="fs-18 text-white d-inline-block align-middle">
										Save your precious time and effort spent for finding a solution.{" "}
										<a
											href="demo-corporate-contact.html"
											className="text-white text-decoration-line-bottom"
										>
											Contact us now
										</a>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
				<section>
					<div className="container position-relative">
						<div className="row align-items-center mb-7">
							<div className="col-xxl-4 col-lg-5 md-mb-15 sm-mb-20 text-center text-lg-start">
								<span className="ps-25px pe-25px mb-20px text-uppercase text-base-color fs-14 lh-42px fw-700 border-radius-100px bg-gradient-very-light-gray-transparent d-inline-block">
									Simple process
								</span>
								<h3 className="text-dark-gray fw-700 ls-minus-2px mb-40px">
									Transcript Request Process
								</h3>
								<div
									className="row row-cols-1"
									data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
								>
									<div className="col-12 process-step-style-05 position-relative hover-box">
										<div className="process-step-item d-flex">
											<div className="process-step-icon-wrap position-relative">
												<div className="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-60px w-60px fs-14 bg-light-red fw-700 position-relative">
													<span className="number position-relative z-index-1 text-dark-gray">
														01
													</span>
													<div className="box-overlay bg-base-color rounded-circle"></div>
												</div>
												<span className="progress-step-separator bg-dark-gray opacity-1"></span>
											</div>
											<div className="process-content ps-30px last-paragraph-no-margin mb-30px">
												<span className="d-block fw-700 text-dark-gray mb-5px fs-18">
													Create Destination and Request
												</span>
												<p className="w-90 lg-w-100 lh-32">
													Start by creating a destination for your transcript. Fill out the
													request form with the necessary details including the location
													where you want the transcript to be shipped.
												</p>
											</div>
										</div>
									</div>
									<div className="col-12 process-step-style-05 position-relative hover-box">
										<div className="process-step-item d-flex">
											<div className="process-step-icon-wrap position-relative">
												<div className="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-60px w-60px fs-14 bg-light-red fw-700 position-relative">
													<span className="number position-relative z-index-1 text-dark-gray">
														02
													</span>
													<div className="box-overlay bg-base-color rounded-circle"></div>
												</div>
												<span className="progress-step-separator bg-dark-gray opacity-1"></span>
											</div>
											<div className="process-content ps-30px last-paragraph-no-margin mb-30px">
												<span className="d-block fw-700 text-dark-gray mb-5px fs-18">
													Fee Calculation and Payment
												</span>
												<p className="w-90 lg-w-100 lh-32">
													Once the request is submitted, the fee for processing and shipping
													your transcript will be calculated. You can securely make your
													payment through Paystack.
												</p>
											</div>
										</div>
									</div>
									<div className="col-12 process-step-style-05 position-relative hover-box xs-mb-30px">
										<div className="process-step-item d-flex">
											<div className="process-step-icon-wrap position-relative">
												<div className="process-step-icon d-flex justify-content-center align-items-center mx-auto rounded-circle h-60px w-60px fs-14 bg-light-red fw-700 position-relative">
													<span className="number position-relative z-index-1 text-dark-gray">
														03
													</span>
													<div className="box-overlay bg-base-color rounded-circle"></div>
												</div>
											</div>
											<div className="process-content ps-30px last-paragraph-no-margin">
												<span className="d-block fw-700 text-dark-gray mb-5px fs-18">
													Admin Review and Email Delivery
												</span>
												<p className="w-90 lg-w-100 lh-32">
													After your payment is confirmed, our administrators will review
													your request. Once approved, your transcript will be emailed to you
													at the provided email address.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div
								className="col-lg-7 offset-xxl-1 position-relative md-mb-30px sm-mb-15"
								data-anime='{ "translateX": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
							>
								<img
									src="/images/demo/demo-corporate-10.webp"
									className="position-relative z-index-9 top-40px"
									alt=""
								/>
								<img
									src="images/demo-corporate-03.png"
									className="absolute-middle-center xs-w-95"
									alt=""
								/>
								<img
									src="/images/demo/demo-corporate-05.png"
									className="position-absolute top-50px left-0px xs-left-15px"
									data-bottom-top="transform: translateY(-50px)"
									data-top-bottom="transform: translateY(50px)"
									alt=""
								/>
								<img
									src="/images/demo/demo-corporate-06.webp"
									className="position-absolute top-150px left-30"
									data-bottom-top="transform: translateY(30px)"
									data-top-bottom="transform: translateY(-30px)"
									alt=""
								/>
								<img
									src="/images/demo/demo-corporate-07.webp"
									className="position-absolute top-50px right-30"
									data-bottom-top="transform: translateY(-50px)"
									data-top-bottom="transform: translateY(50px)"
									alt=""
								/>
								<img
									src="/images/demo/demo-corporate-08.webp"
									className="position-absolute top-100px right-0px xs-right-15px"
									data-bottom-top="transform: translateY(30px)"
									data-top-bottom="transform: translateY(-30px)"
									alt=""
								/>
							</div>
						</div>
						{/* <div className="row justify-content-center align-items-center">
							<div
								className="col-12 text-center align-items-center"
								data-anime='{ "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
							>
								<div className="bg-base-color fw-700 text-white text-uppercase border-radius-30px ps-20px pe-20px fs-12 me-10px sm-m-5px d-inline-block align-middle">
									hurray
								</div>
								<div className="fs-18 fw-500 text-dark-gray d-inline-block align-middle">
									Let's make something great work together.{" "}
									<a
										href="/"
										className="text-dark-gray text-decoration-line-bottom fw-700"
									>
										Got a project in mind?
									</a>
								</div>
							</div>
						</div> */}
					</div>
				</section>
				{false && (
					<section className="bg-gradient-quartz-white border-radius-6px lg-border-radius-0px">
						<div
							className="container background-no-repeat background-position-top"
							style={{
								backgroundImage: "url('/images/demo/demo-corporate-bg-02.png')",
							}}
						>
							<div className="row justify-content-center mb-3">
								<div
									className="col-xxl-6 col-xl-7 col-lg-8 col-md-9 text-center"
									data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
								>
									<h3 className="text-dark-gray fw-700 ls-minus-1px">
										Trusted by the world's fastest growing companies
									</h3>
								</div>
							</div>
							<div
								className="row justify-content-center align-items-center mb-6 sm-mb-8"
								data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 100, "staggervalue": 150, "easing": "easeOutQuad" }'
							>
								<div className="col-12 position-relative ps-8 pe-8 lg-ps-15px lg-pe-15px">
									<div
										className="swiper magic-cursor testimonials-style-06"
										data-slider-options='{ "loop": true, "autoplay": { "delay": 4000, "disableOnInteraction": false }, "keyboard": { "enabled": true, "onlyInViewport": true }, "navigation": { "nextEl": ".swiper-button-next-nav", "prevEl": ".swiper-button-previous-nav", "effect": "fade" } }'
									>
										<div className="swiper-wrapper">
											<div className="swiper-slide">
												<div className="row align-items-center justify-content-center">
													<div className="col-8 col-md-4 col-sm-6 text-center md-mb-30px">
														<img
															alt=""
															src="/images/demo/demo-corporate-testimonials-01.webp"
														/>
													</div>
													<div className="col-lg-5 col-md-7 last-paragraph-no-margin text-center text-md-start">
														<a href="#" className="mb-15px d-block">
															<img
																src="images/logo-monday-dark-blue-01.svg"
																className="h-35px"
																alt=""
															/>
														</a>
														<span className="mb-5px d-table fs-18 lh-30 fw-500 text-dark-gray">
															Their team are easy to work with and helped me make amazing
															websites in a short amount of time. Thanks guys for all your hard
															work. Trust us we looked for a very long time.
														</span>
														<span className="fs-15 text-uppercase fw-800 text-base-color ls-1px">
															Herman miller, Monday
														</span>
													</div>
												</div>
											</div>
											<div className="swiper-slide">
												<div className="row align-items-center justify-content-center">
													<div className="col-8 col-md-4 col-sm-6 text-center md-mb-30px">
														<img
															alt=""
															src="/images/demo/demo-corporate-testimonials-02.png"
														/>
													</div>
													<div className="col-lg-5 col-md-7 last-paragraph-no-margin text-center text-md-start">
														<a href="#" className="mb-15px d-block">
															<img
																src="images/logo-loitech-dark-blue.svg"
																className="h-35px"
																alt=""
															/>
														</a>
														<span className="mb-5px d-table fs-18 lh-30 fw-500 text-dark-gray">
															Their team are easy to work with and helped me make amazing
															websites in a short amount of time. Thanks guys for all your hard
															work. Trust us we looked for a very long time.
														</span>
														<span className="fs-15 text-uppercase fw-800 text-base-color ls-1px">
															Leonel mooney, Logitech
														</span>
													</div>
												</div>
											</div>
											<div className="swiper-slide">
												<div className="row align-items-center justify-content-center">
													<div className="col-8 col-md-4 col-sm-6 text-center md-mb-30px">
														<img
															alt=""
															src="/images/demo/demo-corporate-testimonials-03.webp"
														/>
													</div>
													<div className="col-lg-5 col-md-7 last-paragraph-no-margin text-center text-md-start">
														<a href="#" className="mb-15px d-block">
															<img
																src="images/logo-invision-dark-blue.svg"
																className="h-35px"
																alt=""
															/>
														</a>
														<span className="mb-5px d-table fs-18 lh-30 fw-500 text-dark-gray">
															Their team are easy to work with and helped me make amazing
															websites in a short amount of time. Thanks guys for all your hard
															work. Trust us we looked for a very long time.
														</span>
														<span className="fs-15 text-uppercase fw-800 text-base-color ls-1px">
															Matthew taylor, invision
														</span>
													</div>
												</div>
											</div>
										</div>
										<div className="swiper-button-previous-nav swiper-button-prev md-left-0px">
											<i className="feather icon-feather-arrow-left icon-extra-medium text-dark-gray"></i>
										</div>
										<div className="swiper-button-next-nav swiper-button-next md-right-0px">
											<i className="feather icon-feather-arrow-right icon-extra-medium text-dark-gray"></i>
										</div>
									</div>
								</div>
							</div>
							<div
								className="row row-cols-1 row-cols-md-3 justify-content-center mb-6 md-mb-8 sm-mb-45px"
								data-anime='{ "el": "childs", "willchange": "transform", "perspective": [1200,1200], "translateY": [0, 0], "scale": [1.1, 1], "rotateX": [30, 0], "opacity": [0,1], "duration": 1000, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
							>
								<div className="col sm-mb-30px">
									<div className="bg-white h-100 border-radius-6px text-center box-shadow-quadruple-large box-shadow-quadruple-large-hover">
										<div className="pt-10 pb-10">
											<img
												src="images/logo-monday-dark-gray-02.svg"
												className="h-40px md-h-35px sm-h-40px"
												alt=""
											/>
										</div>
										<div className="border-top fs-16 p-15px last-paragraph-no-margin">
											<p>
												Project management -{" "}
												<span className="fw-600 text-dark-gray">275% Growth</span>
											</p>
										</div>
									</div>
								</div>
								<div className="col sm-mb-30px">
									<div className="bg-white h-100 border-radius-6px text-center box-shadow-quadruple-large box-shadow-quadruple-large-hover">
										<div className="pt-10 pb-10">
											<img
												src="images/logo-dropbox-dark-gray-02.svg"
												className="h-40px md-h-35px sm-h-40px"
												alt=""
											/>
										</div>
										<div className="border-top fs-16 border-1 border-color-extra-medium-gray p-15px last-paragraph-no-margin">
											<p>
												Team management -{" "}
												<span className="fw-600 text-dark-gray">195% Growth</span>
											</p>
										</div>
									</div>
								</div>
								<div className="col">
									<div className="bg-white h-100 border-radius-6px text-center box-shadow-quadruple-large box-shadow-quadruple-large-hover">
										<div className="pt-10 pb-10">
											<img
												src="images/logo-slack-dark-gray-02.svg"
												className="h-40px md-h-35px sm-h-40px"
												alt=""
											/>
										</div>
										<div className="border-top fs-16 border-1 border-color-extra-medium-gray p-15px last-paragraph-no-margin">
											<p>
												Secure storage -{" "}
												<span className="fw-600 text-dark-gray">235% Growth</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div
								className="row row-cols-1 row-cols-lg-5 row-cols-md-3 row-cols-sm-2 clients-style-06 justify-content-center ps-3 pe-3 xs-mt-40px"
								data-anime='{ "el": "childs", "translateX": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
							>
								<div className="col client-box text-center md-mb-40px">
									<a href="#">
										<img
											src="images/logo-walmart-dark-blue.svg"
											className="h-45px"
											alt=""
										/>
									</a>
								</div>
								<div className="col client-box text-center md-mb-40px">
									<a href="#">
										<img
											src="images/logo-netflix-dark-blue.svg"
											className="h-45px"
											alt=""
										/>
									</a>
								</div>
								<div className="col client-box text-center md-mb-40px">
									<a href="#">
										<img
											src="images/logo-invision-dark-blue.svg"
											className="h-45px"
											alt=""
										/>
									</a>
								</div>
								<div className="col client-box text-center sm-mb-40px">
									<a href="#">
										<img
											src="images/logo-yahoo-dark-blue.svg"
											className="h-45px"
											alt=""
										/>
									</a>
								</div>
								<div className="col client-box text-center">
									<a href="#">
										<img
											src="images/logo-amazon-dark-blue.svg"
											className="h-45px"
											alt=""
										/>
									</a>
								</div>
							</div>
						</div>
					</section>
				)}

				<section className="p-0">
					<div className="container">
						<div
							className="row justify-content-center"
							data-anime='{ "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
						>
							<div className="col-12">
								<div
									className="border-radius-6px h-450px md-h-350px sm-h-400px d-flex flex-wrap align-items-center justify-content-center overflow-hidden cover-background box-shadow-quadruple-large pt-15"
									style={{
										backgroundImage: "url('/images/demo/demo-college-bg-01.png')",
									}}
								>
									<div className="opacity-full-dark bg-gradient-regal-blue-transparent"></div>
									<div className="row justify-content-center m-0">
										<div className="col-lg-7 col-md-8 z-index-1 text-center text-md-start sm-mb-20px">
											<h3 className="text-white mb-0 fw-400 fancy-text-style-4">
												We make the creative solutions for{" "}
												<span
													className="fw-600"
													data-fancy-text='{ "effect": "rotate", "string": ["requests!", "problems!", "payments!"] }'
												></span>
											</h3>
										</div>
										<div className="col-md-2 position-relative z-index-1 text-center sm-mb-20px">
											<a
												href="/"
												className="position-relative d-inline-block text-center border border-2 border-color-white rounded-circle video-icon-box video-icon-large popup-youtube"
											>
												<span>
													<span className="video-icon">
														<i className="fa-solid fa-play fs-20 text-white"></i>
													</span>
												</span>
											</a>
										</div>
									</div>
									<div className="w-100 text-center position-relative mt-auto pt-20px pb-25px ps-15px pe-15px border-top border-color-transparent-white-light">
										{/* <div className="fs-14 text-uppercase text-white fw-600 ls-05px">
											Let's make something great work together.{" "}
											<a href="/" className="text-decoration-line-bottom text-white">
												Got a project in mind?
											</a>
										</div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				{false && (
					<section>
						<div className="container">
							<div className="row justify-content-center mb-3">
								<div
									className="col-xl-5 col-lg-6 col-md-7 text-center"
									data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
								>
									<span className="ps-25px pe-25px mb-20px text-uppercase text-base-color fs-14 lh-42px fw-700 border-radius-100px bg-gradient-very-light-gray-transparent d-inline-block">
										Predictable pricing
									</span>
									<h3 className="text-dark-gray fw-700 ls-minus-1px">
										Tailored pricing plans for everyone
									</h3>
								</div>
							</div>
							<div
								className="row align-items-end pricing-table-style-05 g-0 mb-6 background-position-center background-no-repeat justify-content-center"
								style={{
									backgroundImage: "url('/images/demo/demo-corporate-bg-03.png')",
								}}
							>
								<div
									className="col-lg-4 col-md-8 md-mb-30px"
									data-anime='{ "translateX": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
								>
									<div className="border-radius-6px position-relative overflow-hidden">
										<div className="pricing-header pt-45px pb-10px border-radius-6px text-center position-relative top-minus-3px">
											<span className="ps-25px pe-25px mb-15px text-uppercase text-base-color fs-13 lh-34 fw-700 border-radius-100px bg-solitude-blue d-inline-block">
												Starter
											</span>
											<h5 className="fw-700 mb-0 text-dark-gray alt-font">Individual</h5>
											<div className="pricing-body pt-35px">
												<ul className="p-0 m-0 list-style-02 fw-500">
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Marketing strategy
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Competitive work analysis
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-red h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-x align-self-center text-white fs-14 d-flex"></i>
														</span>
														Social media share audit
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-red h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-x align-self-center text-white fs-14 d-flex"></i>
														</span>
														Monthly management
													</li>
												</ul>
											</div>
										</div>
										<div className="row align-items-center pt-25px pb-25px">
											<div className="col text-center last-paragraph-no-margin d-flex align-items-center justify-content-center">
												<h3 className="alt-font text-dark-gray mb-0 me-15px fw-700 ls-minus-2px">
													$29
												</h3>
												<p className="w-120px fs-15 lh-22 text-start">
													Per user/month billed annually*
												</p>
											</div>
										</div>
										<div className="pricing-footer ps-12 pe-12 pb-8 text-center">
											<a
												href="demo-corporate-pricing.html"
												className="btn btn-large btn-dark-gray btn-box-shadow btn-hover-animation-switch btn-round-edge w-100 text-transform-none mb-15px"
											>
												<span>
													<span className="btn-text">Join this plan </span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
												</span>
											</a>
											<span className="fs-16">Cancel anytime</span>
										</div>
									</div>
								</div>
								<div
									className="col-lg-4 col-md-8 md-mb-30px"
									data-anime='{ "translateX": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
								>
									<div className="bg-dark-gray border-radius-6px overflow-hidden position-relative box-shadow-double-large z-index-9">
										<div className="p-10px fw-700 fs-14 text-white bg-gradient-flamingo-amethyst-green text-uppercase text-center">
											Popular
										</div>
										<div className="pricing-header pt-45px pb-10px bg-white border-radius-6px text-center position-relative top-minus-3px">
											<span className="ps-25px pe-25px mb-15px text-uppercase text-base-color fs-13 lh-34 fw-700 border-radius-100px bg-solitude-blue d-inline-block">
												Professional
											</span>
											<h5 className="fw-700 mb-0 text-dark-gray alt-font">Business</h5>
											<div className="pricing-body pt-35px">
												<ul className="p-0 m-0 list-style-02 fw-500 text-center text-md-start">
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Marketing strategy
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Competitive work analysis
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Social media share audit
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-red h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-x align-self-center text-white fs-14 d-flex"></i>
														</span>
														Monthly management
													</li>
												</ul>
											</div>
										</div>
										<div className="row align-items-center pt-25px pb-25px">
											<div className="col text-center last-paragraph-no-margin d-flex align-items-center justify-content-center">
												<h3 className="alt-font text-white mb-0 me-15px fw-700 ls-minus-2px">
													$39
												</h3>
												<p className="w-120px fs-15 lh-22 text-start">
													Per user/month billed annually*
												</p>
											</div>
										</div>
										<div className="pricing-footer ps-12 pe-12 pb-8 text-center">
											<a
												href="demo-corporate-pricing.html"
												className="btn btn-large btn-white btn-box-shadow btn-hover-animation-switch btn-round-edge w-100 text-transform-none mb-15px fw-700"
											>
												<span>
													<span className="btn-text">Join this plan </span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
												</span>
											</a>
											<span className="fs-16 text-white opacity-5 fw-300">
												Cancel anytime
											</span>
										</div>
									</div>
								</div>
								<div
									className="col-lg-4 col-md-8"
									data-anime='{ "translateX": [-50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
								>
									<div className="border-radius-6px position-relative overflow-hidden">
										<div className="pricing-header pt-45px pb-10px border-radius-6px text-center position-relative top-minus-3px">
											<span className="ps-25px pe-25px mb-15px text-uppercase text-base-color fs-13 lh-34 fw-700 border-radius-100px bg-solitude-blue d-inline-block">
												Enterprise
											</span>
											<h5 className="fw-700 mb-0 text-dark-gray alt-font">Corporate</h5>
											<div className="pricing-body pt-35px">
												<ul className="p-0 m-0 list-style-02 fw-500 text-center text-md-start">
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Marketing strategy
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Competitive work analysis
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Social media share audit
													</li>
													<li className="pt-15px pb-15px ps-12 pe-12 border-top border-color-extra-medium-gray text-dark-gray lg-ps-10 lg-pe-10">
														<span className="d-flex align-self-center justify-content-center bg-green h-20px w-20px border-radius-100 me-10px">
															<i className="bi bi-check align-self-center text-white fs-14 d-flex"></i>
														</span>
														Monthly management
													</li>
												</ul>
											</div>
										</div>
										<div className="row align-items-center pt-25px pb-25px">
											<div className="col text-center last-paragraph-no-margin d-flex align-items-center justify-content-center">
												<h3 className="alt-font text-dark-gray mb-0 me-15px fw-700 ls-minus-2px">
													$59
												</h3>
												<p className="w-120px fs-15 lh-22 text-start">
													Per user/month billed annually*
												</p>
											</div>
										</div>
										<div className="pricing-footer ps-12 pe-12 pb-8 text-center">
											<a
												href="demo-corporate-pricing.html"
												className="btn btn-large btn-dark-gray btn-box-shadow btn-hover-animation-switch btn-round-edge w-100 text-transform-none mb-15px"
											>
												<span>
													<span className="btn-text">Join this plan </span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
													<span className="btn-icon">
														<i className="feather icon-feather-arrow-right"></i>
													</span>
												</span>
											</a>
											<span className="fs-16">Cancel anytime</span>
										</div>
									</div>
								</div>
							</div>
							<div className="row row-cols-1 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-sm-2 justify-content-center align-items-center">
								<div className="col icon-with-text-style-08 sm-mb-25px text-center text-sm-start md-mb-30px">
									<div className="d-flex justify-content-center">
										<div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
											<div className="feature-box-icon me-10px">
												<i className="bi bi-calendar-check fs-20 text-dark-gray"></i>
											</div>
											<div className="feature-box-content">
												<span className="fw-600 text-dark-gray">Get 30 day free trial</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col icon-with-text-style-08 sm-mb-25px text-center text-sm-start md-mb-30px">
									<div className="d-flex justify-content-center">
										<div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
											<div className="feature-box-icon me-10px">
												<i className="bi bi-wallet2 fs-20 text-dark-gray"></i>
											</div>
											<div className="feature-box-content">
												<span className="fw-600 text-dark-gray">
													No any hidden fees pay
												</span>
											</div>
										</div>
									</div>
								</div>
								<div className="col icon-with-text-style-08 text-center text-sm-start">
									<div className="d-flex justify-content-center">
										<div className="feature-box feature-box-left-icon-middle d-inline-flex align-middle">
											<div className="feature-box-icon me-10px">
												<i className="bi bi-clock fs-20 text-dark-gray"></i>
											</div>
											<div className="feature-box-content">
												<span className="fw-600 text-dark-gray">
													You can cancel anytime
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}

				{false && (
					<section className="bg-gradient-quartz-white border-radius-6px lg-border-radius-0px pb-0">
						<div className="container">
							<div className="row justify-content-center mb-3">
								<div
									className="col-lg-7 text-center"
									data-anime='{ "el": "childs", "translateY": [30, 0], "opacity": [0,1], "duration": 600, "delay": 0, "staggervalue": 300, "easing": "easeOutQuad" }'
								>
									<h3 className="text-dark-gray fw-700 ls-minus-1px">
										Interesting articles
									</h3>
								</div>
							</div>
							<div className="row mb-5 sm-mb-7">
								<div className="col-12">
									<ul
										className="blog-grid blog-wrapper grid-loading grid grid-3col xl-grid-3col lg-grid-3col md-grid-2col sm-grid-2col xs-grid-1col gutter-extra-large"
										data-anime='{ "el": "childs", "translateY": [50, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
									>
										<li className="grid-sizer"></li>
										<li className="grid-item">
											<div className="card border-0 border-radius-5px box-shadow-quadruple-large box-shadow-quadruple-large-hover">
												<div className="blog-image">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="d-block"
													>
														<img src="/images/demo/demo-corporate-blog-01.jpg" alt="" />
													</a>
													<div className="blog-categories">
														<a
															href="demo-corporate-blog.html"
															className="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase fw-700"
														>
															Agency
														</a>
													</div>
												</div>
												<div className="card-body p-12 lg-p-10">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="card-title mb-15px fw-700 fs-19 text-dark-gray d-inline-block w-90 md-w-100"
													>
														Build up healthy habits and strong peaceful life.
													</a>
													<p>Lorem ipsum dolor consectetur adipiscing eiusmod tempor...</p>
													<div className="author d-flex justify-content-center align-items-center position-relative overflow-hidden fs-14 text-uppercase">
														<div className="me-auto">
															<span className="blog-date d-inline-block fw-700 text-dark-gray">
																30 August 2021
															</span>
															<div className="d-inline-block author-name fw-700 text-dark-gray">
																By{" "}
																<a
																	href="demo-corporate-blog.html"
																	className="text-dark-gray text-decoration-line-bottom"
																>
																	Den viliamson
																</a>
															</div>
														</div>
														<div className="like-count">
															<a href="#">
																<i className="fa-regular fa-heart text-red"></i>
																<span className="text-dark-gray align-middle fw-700">25</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										</li>
										<li className="grid-item">
											<div className="card border-0 border-radius-5px box-shadow-quadruple-large box-shadow-quadruple-large-hover">
												<div className="blog-image">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="d-block"
													>
														<img src="/images/demo/demo-corporate-blog-02.jpg" alt="" />
													</a>
													<div className="blog-categories">
														<a
															href="demo-corporate-blog.html"
															className="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase fw-700"
														>
															Luxurious
														</a>
													</div>
												</div>
												<div className="card-body p-12 lg-p-10">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="card-title mb-15px fw-700 fs-19 text-dark-gray d-inline-block w-90 md-w-100"
													>
														How to bring the season into your great marketing.
													</a>
													<p>Lorem ipsum dolor consectetur adipiscing eiusmod tempor...</p>
													<div className="author d-flex justify-content-center align-items-center position-relative overflow-hidden fs-14 text-uppercase">
														<div className="me-auto">
															<span className="blog-date d-inline-block fw-700 text-dark-gray">
																28 August 2021
															</span>
															<div className="d-inline-block author-name fw-700 text-dark-gray">
																By{" "}
																<a
																	href="demo-corporate-blog.html"
																	className="text-dark-gray text-decoration-line-bottom"
																>
																	Hugh macleod
																</a>
															</div>
														</div>
														<div className="like-count">
															<a href="#">
																<i className="fa-regular fa-heart text-red"></i>
																<span className="text-dark-gray align-middle fw-700">58</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										</li>
										<li className="grid-item">
											<div className="card border-0 border-radius-5px box-shadow-quadruple-large box-shadow-quadruple-large-hover">
												<div className="blog-image">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="d-block"
													>
														<img src="/images/demo/demo-corporate-blog-03.jpg" alt="" />
													</a>
													<div className="blog-categories">
														<a
															href="demo-corporate-blog.html"
															className="categories-btn bg-white text-dark-gray text-dark-gray-hover text-uppercase fw-700"
														>
															Business
														</a>
													</div>
												</div>
												<div className="card-body p-12 lg-p-10">
													<a
														href="demo-corporate-blog-single-clean.html"
														className="card-title mb-15px fw-700 fs-19 text-dark-gray d-inline-block w-90 md-w-100"
													>
														Be the strong willed one the public relationship.
													</a>
													<p>Lorem ipsum dolor consectetur adipiscing eiusmod tempor...</p>
													<div className="author d-flex justify-content-center align-items-center position-relative overflow-hidden fs-14 text-uppercase">
														<div className="me-auto">
															<span className="blog-date d-inline-block fw-700 text-dark-gray">
																26 August 2021
															</span>
															<div className="d-inline-block author-name fw-700 text-dark-gray">
																By{" "}
																<a
																	href="demo-corporate-blog.html"
																	className="text-dark-gray text-decoration-line-bottom"
																>
																	Walton smith
																</a>
															</div>
														</div>
														<div className="like-count">
															<a href="#">
																<i className="fa-regular fa-heart text-red"></i>
																<span className="text-dark-gray align-middle fw-700">75</span>
															</a>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div
								className="row mb-7 sm-mb-9"
								data-anime='{ "el": "childs", "translateY": [0, 0], "opacity": [0,1], "duration": 1200, "delay": 0, "staggervalue": 150, "easing": "easeOutQuad" }'
							>
								<div className="col text-center">
									<div className="fs-26 sm-fs-22 sm-lh-30 fw-600 ls-minus-1px text-dark-gray d-inline-block align-middle me-20px md-m-10px md-mt-0">
										What do people say about our services?
									</div>
									<Link to="/">
										<img
											src="/images/demo/demo-corporate-11.webp"
											className="d-inline-block align-middle"
											alt=""
										/>
									</Link>
								</div>
							</div>
						</div>
					</section>
				)}
				<footer className="p-0 fs-16 border-top border-color-extra-medium-gray">
					<div className="container">
						<div className="row justify-content-center pt-6 sm-pt-40px">
							<div className="col-6 col-xl-3 col-lg-12 col-sm-6 last-paragraph-no-margin text-xl-start text-lg-center order-sm-1 lg-mb-50px sm-mb-30px">
								<a
									href="demo-corporate.html"
									className="footer-logo mb-15px d-inline-block"
								>
									<img src={images.logo} data-at2x={images.logo} alt="" />
								</a>
								<p className="lh-30 w-90 xl-w-100 mx-lg-auto mx-xl-0">
									Delivering your transcripts swiftly and securely.
								</p>
								<div className="elements-social social-icon-style-02 mt-20px xs-mt-15px">
									<ul className="medium-icon dark">
										<li className="my-0">
											<a
												className="facebook"
												href="https://www.facebook.com/"
												target="_blank"
											>
												<i className="fa-brands fa-facebook-f"></i>
											</a>
										</li>
										<li className="my-0">
											<a
												className="dribbble"
												href="http://www.dribbble.com"
												target="_blank"
											>
												<i className="fa-brands fa-dribbble"></i>
											</a>
										</li>
										<li className="my-0">
											<a className="twitter" href="http://www.twitter.com" target="_blank">
												<i className="fa-brands fa-twitter"></i>
											</a>
										</li>
										<li className="my-0">
											<a
												className="instagram"
												href="http://www.instagram.com"
												target="_blank"
											>
												<i className="fa-brands fa-instagram"></i>
											</a>
										</li>
									</ul>
								</div>
							</div>
							{false && (
								<>
									<div className="col-6 col-xl-2 col-lg-3 col-sm-4 xs-mb-30px order-sm-3 order-lg-2">
										<span className="fs-17 fw-600 d-block text-dark-gray mb-5px">
											Company
										</span>
										<ul>
											<li>
												<a href="demo-corporate-about.html">Who we are</a>
											</li>
											<li>
												<a href="demo-corporate-services.html">Our services</a>
												<div className="bg-dark-gray fw-600 text-white lh-22 text-uppercase border-radius-30px ps-10px pe-10px fs-10 ms-10px d-inline-block align-middle">
													Hot
												</div>
											</li>
											<li>
												<a href="demo-corporate-customer-stories.html">Our clients</a>
											</li>
											<li>
												<a href="demo-corporate-contact.html">Contact us</a>
											</li>
										</ul>
									</div>
									<div className="col-6 col-xl-2 col-lg-3 col-sm-4 xs-mb-30px order-sm-4 order-lg-3">
										<span className="fs-17 fw-600 d-block text-dark-gray mb-5px">
											Services
										</span>
										<ul>
											<li>
												<a href="demo-corporate-services-details.html">Planning</a>
											</li>
											<li>
												<a href="demo-corporate-services-details.html">Research</a>
											</li>
											<li>
												<a href="demo-corporate-services-details.html">Consulting</a>
											</li>
											<li>
												<a href="demo-corporate-services-details.html">Analysis</a>
											</li>
										</ul>
									</div>
									<div className="col-6 col-xl-2 col-lg-3 col-sm-4 xs-mb-30px order-sm-5 order-lg-4">
										<span className="fs-17 fw-600 d-block text-dark-gray mb-5px">
											Customer
										</span>
										<ul>
											<li>
												<a href="demo-corporate-customer-stories.html">Client support</a>
											</li>
											<li>
												<a href="demo-corporate-customer-stories.html">Help center</a>
											</li>
											<li>
												<a href="demo-corporate-customer-stories.html">System status</a>
											</li>
											<li>
												<a href="demo-corporate-customer-stories.html">Feedback</a>
											</li>
										</ul>
									</div>
									<div className="col-xl-3 col-lg-3 col-sm-6 md-mb-50px sm-mb-30px xs-mb-0 order-sm-2 order-lg-5">
										<span className="fs-17 fw-600 d-block text-dark-gray mb-5px">
											Subscribe newsletter
										</span>
										<p className="lh-30 w-95 sm-w-100 mb-15px">
											Subscribe our newsletter to get the latest news and updates!
										</p>
										<div className="d-inline-block w-100 newsletter-style-02 position-relative">
											<form
												action="email-templates/subscribe-newsletter.php"
												method="post"
												className="position-relative"
											>
												<input
													className="border-color-extra-medium-gray bg-transparent border-radius-4px w-100 form-control input-small fs-15 pe-50px required"
													type="email"
													name="email"
													placeholder="Enter your email"
												/>
												<input type="hidden" name="redirect" value="" />
												<button className="btn pe-20px submit lh-16" aria-label="submit">
													<i className="feather icon-feather-mail icon-small text-dark-gray"></i>
												</button>
												<div className="form-results border-radius-4px pt-5px pb-5px ps-15px pe-15px fs-14 lh-22 mt-10px w-100 text-center position-absolute d-none"></div>
											</form>
										</div>
									</div>{" "}
								</>
							)}
						</div>
						<div className="row justify-content-center align-items-center pt-2">
							<div className="col-12">
								<div className="divider-style-03 divider-style-03-01 border-color-transparent-white-light"></div>
							</div>
							<div className="col-lg-5 pt-35px pb-35px md-pt-0 order-2 order-lg-1 text-center text-lg-start last-paragraph-no-margin">
								<p>
									&copy; 2024 Transcript is Proudly Powered by{" "}
									<a
										href="/"
										target="_blank"
										className="text-dark-gray fw-600 text-decoration-line-bottom"
									>
										Axript
									</a>
								</p>
							</div>
							<div className="col-lg-7 pt-35px pb-35px md-pt-25px md-pb-5px order-1 order-lg-2 text-center text-lg-end">
								<ul className="footer-navbar sm-lh-normal">
									<li>
										<a href="#" className="nav-link">
											Privacy policy
										</a>
									</li>
									<li>
										<a href="#" className="nav-link">
											Terms and conditions
										</a>
									</li>
									<li>
										<a href="#" className="nav-link">
											Copyright
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</footer>
				<div className="scroll-progress d-none d-xxl-block">
					<a href="#" className="scroll-top" aria-label="scroll">
						<span className="scroll-text">Scroll</span>
						<span className="scroll-line">
							<span className="scroll-point"></span>
						</span>
					</a>
				</div>
			</div>
		</>
	);
};

export default Home;
