import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/Navbar"

export const Venue = () => {
	const [token, setTokenState] = useState(localStorage.getItem("auth_token"))
	const [userId, setUserId] = useState(localStorage.getItem("user_id"))

	const setCurrentUserId = (newUserId) => {
		localStorage.setItem("user_id", newUserId)
		setUserId(newUserId)
	}
	const setToken = (newToken) => {
		localStorage.setItem("auth_token", newToken)
		setTokenState(newToken)
	}

	return (
		<>
			<NavBar token={token} setToken={setToken} />
			<ApplicationViews
				token={token}
				setToken={setToken}
				userId={userId}
				setCurrentUserId={setCurrentUserId}
			/>
		</>
	)
}
