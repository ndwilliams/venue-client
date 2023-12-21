import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { BrowserRouter } from "react-router-dom"

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
		<BrowserRouter>
			<ApplicationViews
				token={token}
				setToken={setToken}
				userId={userId}
				setCurrentUserId={setCurrentUserId}
			/>
		</BrowserRouter>
	)
}
