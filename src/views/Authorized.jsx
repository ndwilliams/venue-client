import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/Navbar"

export const Authorized = ({ userId, token, setToken }) => {
	if (token) {
		return (
			<>
				<NavBar userId={userId} token={token} setToken={setToken} />
				<Outlet />
			</>
		)
	}
	return <Navigate to="/login" replace />
}
