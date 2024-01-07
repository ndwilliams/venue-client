export const getCurrentUserProfile = () => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/users/${currentUser.user_id}`, {
			method: "GET",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
		}).then((res) => res.json())
	}
}

export const editUser = (updatedUser) => {
	const currentUser = JSON.parse(localStorage.getItem("current_user"))
	if (currentUser && currentUser.token) {
		return fetch(`http://localhost:8000/users/${currentUser.user_id}`, {
			method: "PUT",
			headers: {
				Authorization: `Token ${currentUser.token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedUser),
		}).then((res) => res.json())
	}
}
