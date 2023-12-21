import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/Navbar"

export const Authorized = ({ userId, token }) => {
	if (token) {
		return (
			<>
				<NavBar userId={userId} token={token} />
				<Outlet />
			</>
		)
	}
	return <Navigate to="/login" replace />
}
