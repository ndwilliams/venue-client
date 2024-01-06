import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { BrowserRouter } from "react-router-dom"

export const Venue = () => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))
	const [userId, setUserId] = useState(localStorage.getItem("user_id"))
	const [is_staff, setIs_Staff] = useState(localStorage.getItem("is_staff"))
	const [currentUser, setCurrentUser] = useState(() => {
		const storedUser = localStorage.getItem("current_user")
		return storedUser ? JSON.parse(storedUser) : null
	})

	const setCurrentUserId = (newUserId) => {
		localStorage.setItem("user_id", newUserId)
		setUserId(newUserId)
	}
	const setToken = (newToken) => {
		localStorage.setItem("auth_token", newToken)
		setTokenState(newToken)
	}
	const setAdminStatus = (newStaffStatus) => {
		localStorage.setItem("is_staff", newStaffStatus)
		setIs_Staff(newStaffStatus)
	}

	const setUser = (userData) => {
		localStorage.setItem("current_user", JSON.stringify(userData))
		setCurrentUser(userData)
	}

	return (
		<BrowserRouter>
			<ApplicationViews
				setUser={setUser}
				currentUser={currentUser}
				token={token}
				setToken={setToken}
				userId={userId}
				setCurrentUserId={setCurrentUserId}
				is_staff={is_staff}
				setAdminStatus={setAdminStatus}
			/>
		</BrowserRouter>
	)
}
