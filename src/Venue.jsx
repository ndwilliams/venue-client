import { useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { BrowserRouter } from "react-router-dom"

export const Venue = () => {
	const [currentUser, setCurrentUser] = useState(() => {
		const storedUser = localStorage.getItem("current_user")
		return storedUser ? JSON.parse(storedUser) : null
	})

	const setUser = (userData) => {
		localStorage.setItem("current_user", JSON.stringify(userData))
		setCurrentUser(userData)
	}

	return (
		<BrowserRouter>
			<ApplicationViews setUser={setUser} currentUser={currentUser} />
		</BrowserRouter>
	)
}
