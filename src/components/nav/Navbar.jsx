import { NavLink, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
	const navigate = useNavigate()

	return (
		<nav className="navbar bg-white/90 custom-shadow custom-border-radius py-4 px-6 m-3">
			<ul className="flex justify-around items-center">
				<li>
					<NavLink
						to="/"
						className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium">
						Home
					</NavLink>
				</li>

				<li>
					<NavLink
						to="/venues"
						className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium">
						Venues
					</NavLink>
				</li>

				<li>
					<NavLink
						to="/myprofile"
						className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium">
						Profile
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/favoriteconcerts"
						className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium">
						Favorites
					</NavLink>
				</li>

				<li>
					<button
						className="text-gray-700 hover:text-purple-700 px-4 py-2 text-lg font-medium"
						onClick={() => {
							localStorage.removeItem("current_user")
							navigate("/login")
						}}>
						Logout
					</button>
				</li>
			</ul>
		</nav>
	)
}
