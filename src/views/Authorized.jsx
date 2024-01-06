import { Navigate, Outlet } from "react-router-dom"
import { NavBar } from "../components/nav/Navbar"

export const Authorized = ({
	userId,
	token,
	setToken,
	is_staff,
	setCurrentUserId,
	setAdminStatus,
	currentUser,
}) => {
	if (currentUser) {
		return (
			<>
				<NavBar
					userId={userId}
					setCurrentUserId={setCurrentUserId}
					token={token}
					setToken={setToken}
					setAdminStatus={setAdminStatus}
					is_staff={is_staff}
					currentUser={currentUser}
				/>
				<Outlet />
			</>
		)
	}
	return <Navigate to="/login" replace />
}
