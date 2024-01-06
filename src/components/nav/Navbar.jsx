import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({ currentUser }) => {
	const navigate = useNavigate()
	const navbar = useRef()
	const hamburger = useRef()

	const showMobileNavbar = () => {
		hamburger.current.classList.toggle("is-active")
		navbar.current.classList.toggle("is-active")
	}

	return (
		<nav
			className="navbar is-success mb-3"
			role="navigation"
			aria-label="main navigation">
			<div className="navbar-brand">
				<a className="navbar-item" href="/">
					{/* <img src={Logo} height="3rem" alt="Rare Logo" />{" "} */}
					<h1 className="title is-4">Rare Publishing</h1>
				</a>

				<a
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="navbarBasicExample"
					onClick={showMobileNavbar}
					ref={hamburger}>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div className="navbar-menu" ref={navbar}>
				<div className="navbar-start">
					{currentUser.token ? (
						<>
							<Link to="/venues" className="navbar-item">
								Venues
							</Link>
						</>
					) : (
						""
					)}
				</div>
				<div className="navbar-start">
					{currentUser.token ? (
						<Link to="/myprofile" className="navbar-item">
							Profile
						</Link>
					) : (
						""
					)}
				</div>
				<div className="navbar-start">
					{currentUser.token ? (
						<Link to="/favoriteconcerts" className="navbar-item">
							Favorites
						</Link>
					) : (
						""
					)}
				</div>

				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							{currentUser.token ? (
								<button
									className="button is-outlined"
									onClick={() => {
										localStorage.removeItem("current_user")
										navigate("/login")
									}}>
									Logout
								</button>
							) : (
								<>
									<Link to="/register" className="button is-link">
										Register
									</Link>
									<Link to="/login" className="button is-outlined">
										Login
									</Link>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</nav>
	)
}
