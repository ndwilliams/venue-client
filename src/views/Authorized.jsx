import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/Navbar"

export const Authorized = ({ currentUser }) => {
	if (currentUser) {
		return (
			<>
				<NavBar currentUser={currentUser} />
				<Outlet />
			</>
		)
	}
	return <Navigate to="/login" replace />
}
